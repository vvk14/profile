import { Search } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function ToolEmbed() {
  return (
    <div className="glass mt-6 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] p-8 text-center">
      <Search className="text-[var(--gold)]" size={28} />
      <div>
        <h3 className="font-display text-lg font-semibold">Check your own store&apos;s score</h3>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Free tool: paste your Shopify URL and get your theme + SEO score in seconds.
        </p>
      </div>
      <LinkButton href="/tools/shopify-theme-detector">Try the Shopify Theme Detector</LinkButton>
    </div>
  );
}
