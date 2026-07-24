import { techTicker } from "@/content/skills";

export function TechMarquee() {
  const items = [...techTicker, ...techTicker];

  return (
    <div className="group relative overflow-hidden border-y border-[var(--border)] py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />

      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="whitespace-nowrap text-sm font-medium text-[var(--fg-muted)]">
            {item}
            <span className="ml-10 text-[var(--gold)]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
