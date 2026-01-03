"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GlassCard from "../../components/glass/GlassCard";
import GlassDivider from "../../components/glass/GlassDivider";
import { apiPost } from "../../lib/apiClient";
import { defaultContent, getPrice } from "@yopandelreyz/shared";

export default function CreatePage() {
  const sp = useSearchParams();
  const router = useRouter();

  const templateKey = sp.get("template") || "bio-links";
  const tier = sp.get("tier") || "free";

  const price = useMemo(() => {
    try { return getPrice(templateKey); } catch { return 0; }
  }, [templateKey]);

  const [slug, setSlug] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit() {
    setErr("");
    setBusy(true);
    try {
      const content = defaultContent(templateKey);
      content.profile.displayName = displayName;
      content.profile.description = description;
      content.profile.avatarUrl = avatarUrl;

      const data = await apiPost("/api/sites", { slug, templateKey, tier, content });

      // Store admin token locally (MVP). You can show it once in UI.
      localStorage.setItem(`adminToken:${data.slug}`, data.adminToken);

      if (tier === "premium") {
        router.push(`/checkout?site=${data.slug}`);
      } else {
        router.push(`/s/${data.slug}`);
      }
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-2xl font-bold">Create {templateKey} ({tier})</div>
      <div className="text-white/70 mt-1">
        {tier === "premium" ? `Premium price: Rp ${price.toLocaleString("id-ID")}` : "Free tier (simple design)."}
      </div>

      <div className="mt-6">
        <GlassCard className="p-6">
          <div className="text-lg font-semibold">Basic info</div>
          <div className="text-sm text-white/70 mt-1">Slug will become your subdomain later.</div>

          <div className="mt-4 grid gap-3">
            <label className="text-sm">
              Website slug
              <input value={slug} onChange={e=>setSlug(e.target.value)} className="mt-1 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400/30" placeholder="contoh: kopihitam" />
            </label>

            <label className="text-sm">
              Display name
              <input value={displayName} onChange={e=>setDisplayName(e.target.value)} className="mt-1 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400/30" placeholder="Nama kamu / brand" />
            </label>

            <label className="text-sm">
              Description / bio
              <textarea value={description} onChange={e=>setDescription(e.target.value)} rows={3} className="mt-1 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400/30" placeholder="Bio singkat..." />
            </label>

            <label className="text-sm">
              Avatar URL (for MVP)
              <input value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} className="mt-1 w-full rounded-2xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-fuchsia-400/30" placeholder="https://..." />
            </label>
          </div>

          <div className="mt-5">
            <GlassDivider />
          </div>

          {err ? <div className="mt-4 text-sm text-red-300">Error: {err}</div> : null}

          <button disabled={busy} onClick={onSubmit} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3 font-semibold disabled:opacity-60">
            {busy ? "Creating..." : (tier === "premium" ? "Continue to Payment" : "Create (Free)")}
          </button>

          <div className="mt-3 text-xs text-white/60">
            Admin token will be stored in your browser localStorage for this MVP.
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
