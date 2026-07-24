export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Shopify",
    items: ["Liquid", "OS 2.0 Themes", "Shopify Plus", "Custom Sections", "Metafields", "Theme Architecture"],
  },
  {
    category: "Frontend",
    items: ["JavaScript", "HTML5", "CSS3", "Responsive Design", "jQuery", "Alpine.js"],
  },
  {
    category: "Performance & SEO",
    items: ["Core Web Vitals", "Page Speed Optimization", "Technical SEO", "Structured Data", "Image Optimization"],
  },
  {
    category: "Workflow",
    items: ["Figma to Shopify", "Ecommerce UX", "Git", "Cross-browser QA", "A/B Testing"],
  },
];

export const techTicker = [
  "Liquid",
  "Shopify OS 2.0",
  "Shopify Plus",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Core Web Vitals",
  "SEO",
  "Figma",
  "GitHub",
  "Metafields",
  "Ecommerce UX",
];
