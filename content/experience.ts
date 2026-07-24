export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  logo?: string;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "BabyOrgano",
    role: "Shopify Frontend Developer",
    period: "2024 — Present",
    logo: "/images/company_logo/babyorgano.png",
    points: [
      "Maintain and optimize a Shopify OS 2.0 storefront for fast load times and minimal downtime",
      "Implement responsive, user-centric designs to enhance engagement and conversions",
      "Develop and customize Shopify themes and sections aligned with brand identity",
      "Run performance audits — speed optimization and SEO ranking improvements",
      "Bug fixing and rigorous QA testing across all devices before deployment",
      "Collaborate with product, marketing, and design teams on campaign launches",
    ],
  },
  {
    company: "Alian Software",
    role: "Shopify Developer",
    period: "2023 — 2024",
    logo: "/images/company_logo/alian_software_logo.webp",
    points: [
      "Trained in HTML5, CSS3, jQuery, JavaScript and Shopify Liquid (Jan 2023)",
      "Customized the Dawn theme extensively per individual client requirements",
      "Built custom sections with schema settings for full backend customizability",
      "Created and managed metafields for product pages with custom structured data",
      "Integrated third-party apps and improved store functionality",
      "Implemented interactive UI features and page speed optimizations",
    ],
  },
];

export const education = [
  {
    title: "Shopify Theme Development & Liquid",
    org: "Professional Training",
    period: "2023",
    detail: "Hands-on training in Shopify OS 2.0 architecture, Liquid templating, and theme customization.",
  },
  {
    title: "Web Development Fundamentals",
    org: "HTML5, CSS3, JavaScript, jQuery",
    period: "2022 — 2023",
    detail: "Core front-end foundations that underpin all custom Shopify and website work.",
  },
];
