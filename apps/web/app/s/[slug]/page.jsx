import GlassCard from "../../../components/glass/GlassCard";
import GlassDivider from "../../../components/glass/GlassDivider";

async function getSite(slug) {
  const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
  const res = await fetch(`${API}/api/sites/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function SitePage({ params }) {
  const site = await getSite(params.slug);
  if (!site) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <GlassCard className="p-6">Not found</GlassCard>
      </main>
    );
  }

  const { content, templateKey, tier, paymentStatus } = site;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <GlassCard className="p-6">
        <div className="flex items-center gap-4">
          {content?.profile?.avatarUrl ? (
            <img src={content.profile.avatarUrl} alt="avatar" className="w-16 h-16 rounded-2xl border border-white/10 object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5" />
          )}
          <div>
            <div className="text-xl font-bold">{content?.profile?.displayName || "Untitled"}</div>
            <div className="text-white/70">{content?.profile?.description || ""}</div>
            <div className="text-xs text-white/60 mt-1">{templateKey} • {tier} • payment: {paymentStatus}</div>
          </div>
        </div>

        <div className="mt-5"><GlassDivider /></div>

        <div className="mt-4 space-y-2">
          {(content?.links || []).map((l, i) => (
            <a key={i} href={l.url || "#"} className="block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-3">
              <div className="font-semibold">{l.label || "Link"}</div>
              <div className="text-xs text-white/60 break-all">{l.url || ""}</div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-xs text-white/60">
          Powered by <b>Yopandelreyz</b>
        </div>
      </GlassCard>
    </main>
  );
}
