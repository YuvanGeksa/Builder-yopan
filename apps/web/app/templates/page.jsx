import { TEMPLATES } from "@yopandelreyz/shared";
import TemplateCard from "../../components/builder/TemplateCard";

export default function Templates() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-2xl font-bold">Choose a template</div>
          <div className="text-white/70 mt-1">Free or Premium (better design). QRIS payment in-app.</div>
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map(t => (
          <div key={t.key} className="space-y-3">
            <TemplateCard t={t} tier="free" />
          </div>
        ))}
      </div>

      <div className="mt-10 text-sm text-white/60">
        Thumbnails are expected at <code className="bg-black/30 px-2 py-1 rounded-lg border border-white/10">apps/web/public/img/templates/*</code>.
      </div>
    </main>
  );
}
