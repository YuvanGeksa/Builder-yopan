"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GlassCard from "../../components/glass/GlassCard";
import GlassDivider from "../../components/glass/GlassDivider";
import { apiPost, apiGet } from "../../lib/apiClient";
import QRCode from "qrcode.react";

export default function Checkout() {
  const sp = useSearchParams();
  const router = useRouter();
  const site = sp.get("site") || "";

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);
  const [qrisText, setQrisText] = useState("");
  const [expiredAt, setExpiredAt] = useState("");
  const [status, setStatus] = useState("pending");
  const [err, setErr] = useState("");

  useEffect(() => {
    async function run() {
      try {
        const data = await apiPost("/api/payments/create", { siteSlug: site });
        setOrderId(data.orderId);
        setAmount(data.amount);
        // Pakasir returns payment_number for QRIS (often an EMVCo string). We render QR from it.
        setQrisText(data.payment_number || "");
        setExpiredAt(data.expired_at || "");
      } catch (e) {
        setErr(String(e?.message || e));
      }
    }
    if (site) run();
  }, [site]);

  useEffect(() => {
    if (!orderId) return;

    const t = setInterval(async () => {
      try {
        const s = await apiGet(`/api/payments/status?orderId=${encodeURIComponent(orderId)}`);
        setStatus(s.status);
        if (s.status === "paid") {
          clearInterval(t);
          router.push(`/s/${site}`);
        }
      } catch {
        // ignore polling errors
      }
    }, 2500);

    return () => clearInterval(t);
  }, [orderId, site, router]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-2xl font-bold">Payment (QRIS) — in-app</div>
      <div className="text-white/70 mt-1">Scan QR below. After paid, we will continue automatically.</div>

      <div className="mt-6">
        <GlassCard className="p-6">
          {err ? <div className="text-sm text-red-300">Error: {err}</div> : null}

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="text-sm text-white/70">
              <div>Site: <b className="text-white">{site}</b></div>
              <div>Order: <b className="text-white">{orderId || "-"}</b></div>
              <div>Amount: <b className="text-white">Rp {amount.toLocaleString("id-ID")}</b></div>
              <div className="text-xs mt-1">Expire: {expiredAt || "-"}</div>
            </div>
            <span className={[
              "text-xs px-2 py-1 rounded-full border",
              status === "paid" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                               : "border-white/10 bg-white/5 text-white/70"
            ].join(" ")}>
              {status.toUpperCase()}
            </span>
          </div>

          <div className="mt-5">
            <GlassDivider />
          </div>

          <div className="mt-5 flex justify-center">
            {qrisText ? (
              <div className="rounded-2xl border border-white/10 bg-white p-4">
                <QRCode value={qrisText} size={220} />
              </div>
            ) : (
              <div className="text-sm text-white/60">Waiting QR from Pakasir...</div>
            )}
          </div>

          <div className="mt-5 text-xs text-white/60">
            If you are testing, you can use Pakasir sandbox payment simulation to trigger webhook.
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
