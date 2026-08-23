import type { Metadata } from "next";
import { Search } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Link from "next/link";

const TITLE = "Free Shopify Tools";
const DESCRIPTION = "Free tools for Shopify merchants and developers: theme detection, SEO health checks, and more.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tools",
});

const tools = [
  {
    title: "Shopify Theme Detector",
    description: "Find any Shopify store's theme, schema version, and a quick SEO health check.",
    href: "/tools/shopify-theme-detector",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Free Tools</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{TITLE}</h1>
        <p className="mt-4 text-[var(--fg-muted)]">{DESCRIPTION}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Reveal key={tool.href}>
            <Link href={tool.href}>
              <SpotlightCard className="h-full p-6">
                <Search className="text-[var(--gold)]" size={22} />
                <h2 className="mt-3 font-display text-lg font-semibold">{tool.title}</h2>
                <p className="mt-1.5 text-sm text-[var(--fg-muted)]">{tool.description}</p>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
