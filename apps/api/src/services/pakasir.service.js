import fetch from "node-fetch";
import { KEYS } from "../config/keys.js";

/**
 * Create transaction (QRIS) via Pakasir API
 * Docs: https://app.pakasir.com/api/transactioncreate/{method}
 */
export async function pakasirCreateTransaction({ orderId, amount, method = "qris" }) {
  const url = `https://app.pakasir.com/api/transactioncreate/${method}`;
  const body = {
    project: KEYS.pakasir.projectSlug,
    order_id: orderId,
    amount,
    api_key: KEYS.pakasir.apiKey
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Pakasir create failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

/**
 * Verify transaction via transactiondetail (recommended)
 * GET https://app.pakasir.com/api/transactiondetail?project=...&amount=...&order_id=...&api_key=...
 */
export async function pakasirGetTransactionDetail({ orderId, amount }) {
  const qs = new URLSearchParams({
    project: KEYS.pakasir.projectSlug,
    amount: String(amount),
    order_id: orderId,
    api_key: KEYS.pakasir.apiKey
  });

  const url = `https://app.pakasir.com/api/transactiondetail?${qs.toString()}`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Pakasir detail failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}
