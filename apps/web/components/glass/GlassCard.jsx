export default function GlassCard({ children, className="" }) {
  return (
    <div className={[
      "relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glass",
      "overflow-hidden",
      className
    ].join(" ")}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-60" />
      <div className="relative">{children}</div>
    </div>
  );
}
