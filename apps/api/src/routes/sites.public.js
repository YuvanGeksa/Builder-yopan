import express from "express";
import { nanoid } from "nanoid";
import { Site } from "../models/Site.js";
import { defaultContent } from "@yopandelreyz/shared";

export const sitesPublic = express.Router();

function cleanSlug(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

sitesPublic.post("/sites", async (req, res) => {
  try {
    const { slug, templateKey, tier = "free", content } = req.body || {};
    const finalSlug = cleanSlug(slug);
    if (!finalSlug || finalSlug.length < 3) return res.status(400).json({ error: "slug_invalid" });

    const exists = await Site.findOne({ slug: finalSlug }).lean();
    if (exists) return res.status(409).json({ error: "slug_taken" });

    const adminToken = nanoid(32); // shown once to user
    // TODO: hash token; for MVP we store raw (NOT recommended) — replace soon
    const doc = await Site.create({
      slug: finalSlug,
      templateKey,
      tier,
      paymentStatus: tier === "premium" ? "pending" : "free",
      adminTokenHash: adminToken,
      content: content || defaultContent(templateKey),
      status: "draft"
    });

    res.json({
      slug: doc.slug,
      adminToken,
      paymentStatus: doc.paymentStatus
    });
  } catch (e) {
    res.status(500).json({ error: "server_error", detail: String(e?.message || e) });
  }
});

sitesPublic.get("/sites/:slug", async (req, res) => {
  const slug = req.params.slug;
  const site = await Site.findOne({ slug }).lean();
  if (!site) return res.status(404).json({ error: "not_found" });
  // public view: do NOT expose adminTokenHash
  const { adminTokenHash, ...safe } = site;
  res.json(safe);
});
