export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  period: string;
  summary: string;
  coverImage: string;
  gallery: string[];
  techStack: string[];
  problem: string;
  solution: string;
  performance: { label: string; before: string; after: string }[];
  seoResults: string[];
  results: { label: string; value: string }[];
  liveUrl?: string;
  featured: boolean;
  beforeImage?: string;
  afterImage?: string;
}

/**
 * Placeholder / real-title project data — see
 * public/images/projects/_TEMPLATE/README.md for how to add or replace
 * a project without touching any component code.
 */
export const projects: Project[] = [
  {
    slug: "m2m-store",
    title: "M2M Store — Full Theme Redevelopment",
    client: "Missionary to Madame (AU)",
    category: "Shopify Redevelopment",
    period: "Dec 2023",
    summary:
      "Full store redevelopment on Shopify Dawn — brand-aligned customization, complete product & metafield migration, and cross-browser QA.",
    coverImage: "/images/projects/m2m-store/cover.png",
    gallery: ["/images/projects/m2m-store/cover.png"],
    techStack: ["Shopify", "Dawn Theme", "Liquid", "Metafields", "Data Migration"],
    problem:
      "The client's existing store was on a dated theme with inconsistent branding, no structured product data, and layout bugs across devices.",
    solution:
      "Audited the existing theme, rebuilt brand-critical sections on top of Dawn/OS 2.0, migrated all products, media, and metafields with zero data loss, then ran a full responsive QA pass before launch.",
    performance: [
      { label: "Data Migration", before: "Manual / inconsistent", after: "100% automated & verified" },
      { label: "Device Coverage", before: "Desktop-first, buggy mobile", after: "Fully responsive, all devices" },
    ],
    seoResults: [
      "Cleaned up heading hierarchy and metadata across templates",
      "Preserved and improved existing URL structure to protect SEO equity",
    ],
    results: [
      { label: "Migration Accuracy", value: "100%" },
      { label: "Device Support", value: "All" },
      { label: "Delivery", value: "On Time" },
    ],
    featured: true,
  },
  {
    slug: "habibi-ny",
    title: "Habibi NY — DTC Storefront Build",
    client: "DTC Garage",
    category: "Shopify DTC Build",
    period: "Feb – Apr 2024",
    summary:
      "Built a DTC-focused Shopify store with client-specific features, seamless UX, and full performance optimization across devices.",
    coverImage: "/images/projects/habibi-ny/cover.png",
    gallery: ["/images/projects/habibi-ny/cover.png"],
    techStack: ["Shopify", "Liquid", "Custom UX", "Performance Optimization"],
    problem:
      "The client needed a distinct, conversion-focused DTC experience beyond what stock themes could offer, on an aggressive timeline.",
    solution:
      "Collaborated closely with the design and product team to implement custom UX patterns, then optimized every template for load speed ahead of launch.",
    performance: [
      { label: "Load Time", before: "Unoptimized theme baseline", after: "Fast, Core Web Vitals-friendly" },
    ],
    seoResults: ["Implemented semantic markup across product and collection templates"],
    results: [
      { label: "Load Time", value: "Fast" },
      { label: "Focus", value: "DTC" },
      { label: "Responsive", value: "✓" },
    ],
    featured: true,
  },
  {
    slug: "your-next-project",
    title: "Your Next Project",
    client: "Add client name",
    category: "Shopify / Custom Website",
    period: "2026",
    summary: "Replace this placeholder — see public/images/projects/_TEMPLATE/README.md for the exact steps.",
    coverImage: "/images/projects/_TEMPLATE/cover-placeholder.svg",
    gallery: [],
    techStack: ["Shopify", "Liquid"],
    problem: "Describe the client's problem here.",
    solution: "Describe your solution here.",
    performance: [],
    seoResults: [],
    results: [],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getRelatedProjects(slug: string, limit = 2) {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
}
