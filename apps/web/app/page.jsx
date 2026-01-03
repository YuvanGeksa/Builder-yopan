import Link from "next/link";
import GlassCard from "../components/glass/GlassCard";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Yopandelreyz</div>
        <Link href="/templates" className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2">
          Get Started
        </Link>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="text-xl font-semibold">Build instantly</div>
          <div className="text-white/70 mt-2">
            Choose a template (Bio Links / Portfolio / CV / Business), fill your name, bio, avatar, and links.
          </div>
          <div className="text-white/70 mt-2">
            Upgrade for premium iOS-glass “Nebula” design and deploy.
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xl font-semibold">No login</div>
          <div className="text-white/70 mt-2">
            We generate an admin token once, so you can edit later without accounts.
          </div>
          <div className="text-white/70 mt-2">
            Payment uses Pakasir and shows QRIS inside this app.
          </div>
        </GlassCard>
      </div>

      <div className="mt-10">
        <Link href="/templates" className="inline-block rounded-2xl border border-fuchsia-400/25 bg-fuchsia-400/10 hover:bg-fuchsia-400/15 px-5 py-3 font-semibold">
          Pick a Template
        </Link>
      </div>
    </main>
  );
}
