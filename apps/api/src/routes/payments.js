import express from "express";
import { nanoid } from "nanoid";
import { Payment } from "../models/Payment.js";
import { Site } from "../models/Site.js";
import { getPrice } from "@yopandelreyz/shared";
import { pakasirCreateTransaction, pakasirGetTransactionDetail } from "../services/pakasir.service.js";

export const payments = express.Router();

/**
 * Create a Pakasir QRIS transaction for a site (premium)
 * Body: { siteSlug }
 * Returns: { orderId, amount, qrisText, expired_at, payment_number, raw }
 */
payments.post("/payments/create", async (req, res) => {
  try {
    const { siteSlug } = req.body || {};
    if (!siteSlug) return res.status(400).json({ error: "missing_siteSlug" });

    const site = await Site.findOne({ slug: siteSlug });
    if (!site) return res.status(404).json({ error: "site_not_found" });

    const amount = getPrice(site.templateKey);
    const orderId = `${Date.now()}-${nanoid(10)}`;

    const raw = await pakasirCreateTransaction({ orderId, amount, method: "qris" });

    await Payment.create({
      siteSlug,
      templateKey: site.templateKey,
      amount,
      orderId,
      status: "pending",
      raw
    });

    site.tier = "premium";
    site.paymentStatus = "pending";
    await site.save();

    // Pakasir often returns payment_number for QRIS; we send whatever we got.
    res.json({
      orderId,
      amount,
      payment_number: raw.payment_number || "",
      expired_at: raw.expired_at || raw.expired || "",
      raw
    });
  } catch (e) {
    res.status(500).json({ error: "server_error", detail: String(e?.message || e) });
  }
});

/**
 * Webhook endpoint (Pakasir -> your server)
 * Verify via transactiondetail then mark paid.
 */
payments.post("/payments/webhook", async (req, res) => {
  try {
    const payload = req.body || {};
    const { order_id: orderId, amount, status } = payload;

    if (!orderId) return res.status(400).json({ error: "missing_order_id" });

    const pay = await Payment.findOne({ orderId });
    if (!pay) return res.status(404).json({ error: "unknown_order" });

    // Verify with Pakasir detail API (recommended)
    const detail = await pakasirGetTransactionDetail({ orderId, amount: pay.amount });

    const finalStatus = String(detail.status || status || "").toLowerCase();
    if (finalStatus === "completed" || finalStatus === "paid") {
      pay.status = "paid";
      pay.raw = { ...pay.raw, webhook: payload, detail };
      await pay.save();

      await Site.updateOne(
        { slug: pay.siteSlug },
        { $set: { tier: "premium", paymentStatus: "paid" } }
      );
    }

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "server_error", detail: String(e?.message || e) });
  }
});

/**
 * Client polling: check if paid
 * GET /payments/status?orderId=...
 */
payments.get("/payments/status", async (req, res) => {
  const orderId = String(req.query.orderId || "");
  if (!orderId) return res.status(400).json({ error: "missing_orderId" });

  const pay = await Payment.findOne({ orderId }).lean();
  if (!pay) return res.status(404).json({ error: "not_found" });

  res.json({ status: pay.status, siteSlug: pay.siteSlug });
});
