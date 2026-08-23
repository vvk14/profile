import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, jsonLdScript, softwareApplicationJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getRecentThemeChecks } from "@/lib/apps-script";
import { Reveal } from "@/components/ui/reveal";
import { LinkButton } from "@/components/ui/button";
import { ThemeDetectorForm } from "@/components/tools/theme-detector-form";
import { RecentThemeChecks } from "@/components/tools/recent-theme-checks";

const TITLE = "Shopify Theme Detector";
const SEO_TITLE = "Shopify Theme Detector (Free) | Find Any Store's Theme & SEO Score";
const DESCRIPTION =
  "Free Shopify theme detector: paste any store URL to instantly find its theme name, schema version, and a quick SEO health check, canonical tags, structured data, image alt coverage, and more.";

const FAQS = [
  {
    question: "How do I find out what theme a Shopify store is using?",
    answer:
      "Paste the store's URL into the tool above. It reads the store's public page source for Shopify's own theme metadata (the same data your browser already loads) and returns the theme name, schema version, and whether it's a paid Theme Store theme or a custom build. You can also do this manually by viewing page source and searching for \"Shopify.theme\", though that only works on classic Liquid themes, not headless/Hydrogen storefronts.",
  },
  {
    question: "Does this work on every Shopify store?",
    answer:
      "It works on any store using a classic Liquid theme (the vast majority of Shopify stores). It won't return theme details for headless storefronts built on the Storefront API (Hydrogen), since those don't expose the same theme metadata, though the SEO checklist still runs. A small number of stores also block automated requests with bot protection.",
  },
  {
    question: "Is Shopify's free Dawn theme bad for SEO?",
    answer:
      "No. Dawn ships with clean semantic HTML, fast defaults, and no bloat, which is a solid technical foundation. SEO problems on Shopify stores come far more often from missing structured data, poor image alt text, and lazy-loaded hero images, none of which are specific to any one theme. See our full write-up: I Checked 17 Real Shopify Stores' Themes.",
  },
  {
    question: "What does \"Theme Store\" vs \"Custom\" mean in the results?",
    answer:
      "A Theme Store theme was purchased or installed from Shopify's official Theme Store (free or paid) and still carries its original theme_store_id. \"Custom\" means the store is running a heavily modified, forked, or fully bespoke theme, common among larger brands that customize a base theme until it's no longer tied to a Theme Store listing.",
  },
  {
    question: "Is this tool free, and is my data safe?",
    answer:
      "Yes, it's completely free with no signup. We log the store handle, detected theme, and SEO score to improve the tool and to power the \"recently checked\" list, never your personal information, and never anything beyond what's already publicly visible on the page you submitted.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: SEO_TITLE,
  description: DESCRIPTION,
  path: "/tools/shopify-theme-detector",
});

export default async function ShopifyThemeDetectorPage() {
  const recentChecks = await getRecentThemeChecks();

  const jsonLd = [
    softwareApplicationJsonLd({ name: TITLE, description: DESCRIPTION, path: "/tools/shopify-theme-detector" }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools/shopify-theme-detector" },
      { name: TITLE, path: "/tools/shopify-theme-detector" },
    ]),
    faqJsonLd(FAQS),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />
      ))}

      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Free Tool</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Shopify Theme Detector</h1>
        <p className="mt-4 text-[var(--fg-muted)]">
          Paste any Shopify store URL to see what theme it&apos;s running and get a quick SEO health check.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <ThemeDetectorForm />
      </Reveal>

      <p className="mt-6 text-center text-xs text-[var(--fg-muted)]">
        Submitted URLs may be logged (store handle, theme, and SEO score) to improve this tool and as anonymized
        social proof below. No personal data is collected.
      </p>

      <RecentThemeChecks checks={recentChecks} />

      <Reveal delay={0.1} className="mt-16">
        <h2 className="font-display text-xl font-semibold">What This Tool Checks</h2>
        <p className="mt-3 text-[var(--fg-muted)]">
          Paste a Shopify store URL and the detector reads its public page source, the same data your browser
          already loads, to identify:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--fg-muted)]">
          <li>The theme name, schema name, and schema version currently installed</li>
          <li>Whether it&apos;s an official Shopify Theme Store theme (paid or free) or a custom/private build</li>
          <li>The store&apos;s handle, currency, country, and locale</li>
          <li>JSON-LD structured data types present (Product, Organization, FAQPage, BreadcrumbList, etc.)</li>
          <li>Whether a self-referencing canonical tag and meta description are present</li>
          <li>Image alt text coverage across the page</li>
          <li>Whether the above-fold hero image is lazy-loaded (a common Core Web Vitals mistake)</li>
          <li>Whether <code className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[13px]">robots.txt</code> and <code className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[13px]">sitemap.xml</code> are reachable</li>
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="font-display text-xl font-semibold">How to Find Your Shopify Theme Manually</h2>
        <p className="mt-3 text-[var(--fg-muted)]">
          If you&apos;d rather check yourself: open the storefront, right-click and choose &quot;View Page Source&quot;
          (or press Ctrl+U), then search the page for <code className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[13px]">Shopify.theme</code>.
          On classic Liquid themes, you&apos;ll find a small JavaScript object with the theme&apos;s name, ID, and
          schema version. This only works on standard themes though, stores running a headless storefront (built on
          Shopify&apos;s Storefront API) won&apos;t expose this data at all. The tool above automates this and adds
          the SEO checks on top.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="font-display text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-5">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <p className="font-medium">{faq.question}</p>
              <p className="mt-1.5 text-[var(--fg-muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[var(--fg-muted)]">
          Curious what this looked like across real stores?{" "}
          <Link
            href="/blog/i-checked-17-shopify-stores-themes"
            className="text-[var(--gold)] underline underline-offset-2"
          >
            Read: I Checked 17 Real Shopify Stores&apos; Themes →
          </Link>
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 text-center">
        <div className="glass rounded-[var(--radius-lg)] p-8">
          <h2 className="font-display text-xl font-semibold">Want a full manual audit?</h2>
          <p className="mx-auto mt-2 max-w-md text-[var(--fg-muted)]">
            This tool catches the basics automatically. For a deeper technical, speed, and Core Web Vitals audit of
            your Shopify store, let&apos;s talk.
          </p>
          <LinkButton href="/contact" className="mt-5">
            Get a Full Audit
          </LinkButton>
        </div>
      </Reveal>
    </div>
  );
}
