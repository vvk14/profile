const FETCH_TIMEOUT_MS = 8000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url.replace(/\/+$/, "");
}

interface FetchResult {
  html: string;
  finalUrl: string;
}

class DetectorError extends Error {
  constructor(public code: "unreachable" | "not_shopify" | "blocked", message: string) {
    super(message);
  }
}

async function fetchHtml(url: string): Promise<FetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (res.status === 403 || res.status === 429) {
      throw new DetectorError("blocked", "The store's bot protection blocked this request.");
    }
    if (!res.ok) {
      throw new DetectorError("unreachable", `Site responded with HTTP ${res.status}.`);
    }

    const html = await res.text();
    return { html, finalUrl: res.url || url };
  } catch (err) {
    if (err instanceof DetectorError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new DetectorError("unreachable", "The site took too long to respond.");
    }
    throw new DetectorError("unreachable", "Couldn't reach that URL. Check it's correct and publicly accessible.");
  } finally {
    clearTimeout(timeout);
  }
}

function isShopifyStore(html: string): boolean {
  return html.includes("Shopify.shop") || html.includes("cdn.shopify.com") || html.includes("/cdn/shop/");
}

interface ThemeInfo {
  name: string | null;
  id: number | null;
  schemaName: string | null;
  schemaVersion: string | null;
  themeStoreId: number | null;
  role: string | null;
}

function escapeDots(varPath: string): string {
  return varPath.replace(/\./g, "\\.");
}

function extractJsonAssignment(html: string, varPath: string): unknown {
  // Not every theme terminates this statement with a semicolon (some rely on
  // ASI / a trailing newline instead), so match on the closing brace alone.
  const regex = new RegExp(`${escapeDots(varPath)}\\s*=\\s*(\\{.*?\\})`, "s");
  const match = html.match(regex);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function extractStringAssignment(html: string, varPath: string): string | null {
  const regex = new RegExp(`${escapeDots(varPath)}\\s*=\\s*"([^"]*)"`);
  return html.match(regex)?.[1] ?? null;
}

function extractThemeInfo(html: string): ThemeInfo {
  const theme = extractJsonAssignment(html, "Shopify.theme") as Record<string, unknown> | null;
  return {
    name: (theme?.name as string) ?? null,
    id: (theme?.id as number) ?? null,
    schemaName: (theme?.schema_name as string) ?? null,
    schemaVersion: (theme?.schema_version as string) ?? null,
    themeStoreId: (theme?.theme_store_id as number) ?? null,
    role: (theme?.role as string) ?? null,
  };
}

interface ShopInfo {
  shopHandle: string | null;
  locale: string | null;
  currency: string | null;
  country: string | null;
}

function extractShopInfo(html: string): ShopInfo {
  const currencyObj = extractJsonAssignment(html, "Shopify.currency") as Record<string, unknown> | null;
  return {
    shopHandle: extractStringAssignment(html, "Shopify.shop"),
    locale: extractStringAssignment(html, "Shopify.locale"),
    currency: (currencyObj?.active as string) ?? null,
    country: extractStringAssignment(html, "Shopify.country"),
  };
}

export interface SeoCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  learnMoreAnchor: string;
}

async function isUrlReachable(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { signal: controller.signal, headers: { "User-Agent": USER_AGENT } });
    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

function extractJsonLdTypes(html: string): string[] {
  const types = new Set<string>();
  const blocks = html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);

  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      const entries = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const entry of entries) {
        if (entry?.["@type"]) {
          const t = entry["@type"];
          if (Array.isArray(t)) t.forEach((x) => types.add(x));
          else types.add(t);
        }
      }
    } catch {
      // Skip malformed JSON-LD blocks rather than failing the whole scan.
    }
  }

  return Array.from(types);
}

function imageAltCoverage(html: string): { total: number; withAlt: number } {
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const withAlt = imgs.filter((tag) => /alt=["'][^"']+["']/i.test(tag)).length;
  return { total: imgs.length, withAlt };
}

function firstImageIsLazy(html: string): boolean | null {
  const firstImg = html.match(/<img\b[^>]*>/i)?.[0];
  if (!firstImg) return null;
  return /loading=["']lazy["']/i.test(firstImg);
}

async function runSeoChecks(html: string, baseUrl: string): Promise<SeoCheck[]> {
  const origin = new URL(baseUrl).origin;
  const jsonLdTypes = extractJsonLdTypes(html);
  const altCoverage = imageAltCoverage(html);
  const altPassed = altCoverage.total === 0 || altCoverage.withAlt / altCoverage.total >= 0.9;
  const aboveFoldLazy = firstImageIsLazy(html);

  const [robotsOk, sitemapOk] = await Promise.all([
    isUrlReachable(`${origin}/robots.txt`),
    isUrlReachable(`${origin}/sitemap.xml`),
  ]);

  return [
    {
      id: "jsonld",
      label: "Structured data (JSON-LD) present",
      passed: jsonLdTypes.length > 0,
      detail: jsonLdTypes.length > 0 ? `Found: ${jsonLdTypes.join(", ")}` : "No JSON-LD schema found on the page.",
      learnMoreAnchor: "schema-markup",
    },
    {
      id: "canonical",
      label: "Self-referencing canonical tag",
      passed: /<link[^>]+rel=["']canonical["']/i.test(html),
      detail: /<link[^>]+rel=["']canonical["']/i.test(html) ? "Canonical tag found." : "No canonical tag found.",
      learnMoreAnchor: "technical-seo-checklist",
    },
    {
      id: "meta-description",
      label: "Meta description present",
      passed: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html),
      detail: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html)
        ? "Meta description found."
        : "No meta description found.",
      learnMoreAnchor: "technical-seo-checklist",
    },
    {
      id: "image-alt",
      label: "Image alt text coverage",
      passed: altPassed,
      detail:
        altCoverage.total === 0
          ? "No images found on the page."
          : `${altCoverage.withAlt}/${altCoverage.total} images have alt text.`,
      learnMoreAnchor: "image-seo",
    },
    {
      id: "above-fold-lazy",
      label: "Above-fold image not lazy-loaded",
      passed: aboveFoldLazy === null ? true : !aboveFoldLazy,
      detail:
        aboveFoldLazy === null
          ? "Couldn't find an above-fold image to check."
          : aboveFoldLazy
            ? "The first image on the page is lazy-loaded, which can delay your LCP."
            : "The first image loads eagerly, good for LCP.",
      learnMoreAnchor: "site-speed-checklist",
    },
    {
      id: "robots",
      label: "robots.txt reachable",
      passed: robotsOk,
      detail: robotsOk ? "robots.txt is reachable." : "robots.txt could not be reached.",
      learnMoreAnchor: "technical-seo-checklist",
    },
    {
      id: "sitemap",
      label: "sitemap.xml reachable",
      passed: sitemapOk,
      detail: sitemapOk ? "sitemap.xml is reachable." : "sitemap.xml could not be reached.",
      learnMoreAnchor: "technical-seo-checklist",
    },
  ];
}

export interface ThemeDetectionResult {
  submittedUrl: string;
  finalUrl: string;
  shop: ShopInfo;
  theme: ThemeInfo;
  isThemeStoreTheme: boolean;
  seoChecks: SeoCheck[];
  seoScore: number;
}

export type DetectionError =
  | { type: "unreachable"; message: string }
  | { type: "not_shopify"; message: string }
  | { type: "blocked"; message: string };

export async function detectShopifyTheme(
  submittedUrl: string
): Promise<{ ok: true; result: ThemeDetectionResult } | { ok: false; error: DetectionError }> {
  const normalized = normalizeUrl(submittedUrl);

  let html: string;
  let finalUrl: string;
  try {
    const fetched = await fetchHtml(normalized);
    html = fetched.html;
    finalUrl = fetched.finalUrl;
  } catch (err) {
    const code = err instanceof DetectorError ? err.code : "unreachable";
    const message = err instanceof DetectorError ? err.message : "Couldn't reach that URL.";
    return { ok: false, error: { type: code, message } };
  }

  if (!isShopifyStore(html)) {
    return {
      ok: false,
      error: { type: "not_shopify", message: "This doesn't look like a Shopify store, no Shopify signals found on the page." },
    };
  }

  const theme = extractThemeInfo(html);
  const shop = extractShopInfo(html);
  const seoChecks = await runSeoChecks(html, finalUrl);
  const seoScore = Math.round((seoChecks.filter((c) => c.passed).length / seoChecks.length) * 10);

  return {
    ok: true,
    result: {
      submittedUrl: normalized,
      finalUrl,
      shop,
      theme,
      isThemeStoreTheme: theme.themeStoreId !== null,
      seoChecks,
      seoScore,
    },
  };
}
