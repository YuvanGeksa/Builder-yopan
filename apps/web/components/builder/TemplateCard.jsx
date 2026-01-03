import Link from "next/link";
import GlassCard from "../glass/GlassCard";

export default function TemplateCard({ t, tier="free" }) {
  const thumb = tier === "premium" ? t.thumbnails.premium : t.thumbnails.free;
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{t.name}</div>
          <div className="text-sm text-white/70 mt-1">{t.description}</div>
        </div>
        <span className={[
          "text-xs px-2 py-1 rounded-full border",
          tier === "premium" ? "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200"
                             : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
        ].join(" ")}>
          {tier === "premium" ? "PREMIUM" : "FREE"}
        </span>
      </div>

      <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
        {/* If you don't have images yet, it will just show broken; replace files in /public/img/templates/... */}
        <img src={thumb} alt={`${t.name} ${tier}`} className="w-full h-44 object-cover" />
      </div>

      <div className="mt-4 flex gap-2">
        <Link href={`/create?template=${t.key}&tier=free`} className="flex-1 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-center">
          Use Free
        </Link>
        <Link href={`/create?template=${t.key}&tier=premium`} className="flex-1 rounded-2xl border border-fuchsia-400/25 bg-fuchsia-400/10 hover:bg-fuchsia-400/15 px-4 py-2 text-center">
          Use Premium
        </Link>
      </div>
    </GlassCard>
  );
}
