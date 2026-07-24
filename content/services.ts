export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  icon: string;
  features: string[];
  process: string[];
}

export const services: Service[] = [
  {
    slug: "shopify-development",
    title: "Shopify Theme Development",
    shortTitle: "Shopify Development",
    summary:
      "Custom Shopify OS 2.0 themes and sections built for Shopify Plus and standard stores — fast, flexible, and merchant-friendly.",
    icon: "shopping-bag",
    features: [
      "Custom Liquid theme development from scratch",
      "Dawn / OS 2.0 theme customization",
      "Custom sections with full schema-driven settings",
      "Metafields & metaobjects for structured product data",
      "Third-party app integration",
      "Shopify Plus checkout customization",
    ],
    process: [
      "Discovery — understand brand, catalog, and conversion goals",
      "Design handoff — Figma to pixel-accurate Liquid",
      "Build — modular, reusable sections and blocks",
      "QA — cross-device, cross-browser testing",
      "Launch — performance and SEO validation before go-live",
    ],
  },
  {
    slug: "custom-websites",
    title: "Custom Website Development",
    shortTitle: "Custom Websites",
    summary:
      "Hand-built, framework-grade marketing and product sites for brands that need more than a template.",
    icon: "code",
    features: [
      "Pixel-perfect Figma to code implementation",
      "Semantic, accessible HTML/CSS/JS",
      "Modern animation and micro-interactions",
      "SEO-first architecture from day one",
      "Headless / API-driven builds where needed",
      "Ongoing performance monitoring",
    ],
    process: [
      "Scope — define pages, content model, and integrations",
      "Architecture — choose the right stack for the goal",
      "Build — component-driven, production-quality code",
      "Optimize — Core Web Vitals and accessibility pass",
      "Ship — deploy, monitor, iterate",
    ],
  },
];

export const otherServices = [
  {
    title: "Performance Optimization",
    summary: "Audit and fix render-blocking assets, image weight, and third-party scripts to push Core Web Vitals into the green.",
  },
  {
    title: "SEO Optimization",
    summary: "Technical SEO, structured data, and on-page improvements that help storefronts actually get found.",
  },
  {
    title: "Figma to Shopify",
    summary: "Turn static design files into a fully functional, editable Shopify theme — no fidelity lost.",
  },
  {
    title: "Ecommerce UX",
    summary: "Conversion-focused UX audits and improvements across product, collection, and checkout flows.",
  },
];
