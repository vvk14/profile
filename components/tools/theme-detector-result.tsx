import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ThemeDetectionResult } from "@/lib/theme-detector";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/utils";

export function ThemeDetectorResult({ result }: { result: ThemeDetectionResult }) {
  const { theme, shop, seoChecks, seoScore, finalUrl } = result;

  return (
    <GlassPanel className="p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--fg-muted)]">{finalUrl}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">
            {theme.schemaName ?? theme.name ?? "Unknown theme"}
          </h2>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            {theme.schemaVersion && `v${theme.schemaVersion} · `}
            {result.isThemeStoreTheme ? "Shopify Theme Store theme" : "Custom / private theme"}
          </p>
        </div>
        <div className="flex flex-col items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-3 text-center">
          <span className="font-display text-3xl font-semibold text-[var(--gold)]">{seoScore}/10</span>
          <span className="text-xs text-[var(--fg-muted)]">SEO Score</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <InfoRow label="Shop handle" value={shop.shopHandle ?? "—"} />
        <InfoRow label="Currency / Country" value={[shop.currency, shop.country].filter(Boolean).join(" / ") || "—"} />
        <InfoRow label="Locale" value={shop.locale ?? "—"} />
        <InfoRow label="Theme role" value={theme.role ?? "—"} />
      </div>

      {seoChecks.some((c) => c.id === "jsonld" && c.passed) && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">Schema types found</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {seoChecks
              .find((c) => c.id === "jsonld")
              ?.detail.replace("Found: ", "")
              .split(", ")
              .map((type) => <Badge key={type}>{type}</Badge>)}
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">SEO checklist</p>
        <ul className="mt-3 space-y-2">
          {seoChecks.map((check) => (
            <li
              key={check.id}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--border)] px-3 py-2.5 text-sm",
                check.passed ? "bg-[var(--bg-elevated)]/50" : "bg-[var(--bg-elevated)]"
              )}
            >
              {check.passed ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
              ) : (
                <XCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
              )}
              <div>
                <p className="font-medium">{check.label}</p>
                <p className="text-[var(--fg-muted)]">
                  {check.detail}
                  {!check.passed && (
                    <>
                      {" "}
                      <Link
                        href={`/blog/shopify-seo-checklist#${check.learnMoreAnchor}`}
                        className="text-[var(--gold)] underline underline-offset-2"
                      >
                        How to fix this →
                      </Link>
                    </>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GlassPanel>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
      <p className="text-xs text-[var(--fg-muted)]">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}
