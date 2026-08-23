// Bump this only if the actual start date of Vivek's Shopify experience changes.
// Years Experience below is derived from it so it advances automatically every January.
const CAREER_START_YEAR = 2023;

export const siteConfig = {
  name: "VVKDEV",
  fullName: "Vivek Patel",
  title: "VVKDEV: Shopify Developer & Ecommerce Frontend Engineer",
  role: "Shopify Frontend Developer",
  tagline: "I build premium Shopify storefronts that load fast, rank well, and convert.",
  description:
    "Vivek Patel (VVKDEV) is a Shopify Theme Developer building fast, SEO-optimized Shopify Plus storefronts that convert for DTC brands.",
  url: "https://vvkdev.in",
  email: "vikupatel2001@gmail.com",
  locale: "en_US",
  keywords: [
    "Shopify Developer",
    "Shopify Theme Development",
    "Shopify Liquid Developer",
    "Shopify Plus Developer",
    "Custom Shopify Sections",
    "Ecommerce Frontend Engineer",
    "Core Web Vitals Optimization",
    "Figma to Shopify",
    "Shopify SEO",
  ],
  social: {
    github: "https://github.com/vvk14",
    linkedin: "https://www.linkedin.com/in/vivek-patel-shopify/",
  },
  stats: [
    { label: "Years Experience", value: new Date().getFullYear() - CAREER_START_YEAR, suffix: "+" },
    { label: "Stores Delivered", value: 10, suffix: "+" },
    { label: "Avg. PageSpeed Score", value: 95, suffix: "" },
    { label: "Companies", value: 2, suffix: "" },
  ],
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools/shopify-theme-detector" },
  { label: "Contact", href: "/contact" },
];

export const mobileNavLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Projects", href: "/projects", icon: "layers" },
  { label: "Services", href: "/services", icon: "sparkles" },
  { label: "Blog", href: "/blog", icon: "notebook" },
  { label: "Contact", href: "/contact", icon: "mail" },
] as const;

export const footerLinks = {
  Explore: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Shopify Theme Detector", href: "/tools/shopify-theme-detector" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Leave a Review", href: "/reviews/submit" },
    { label: "Resume", href: "/resume" },
    { label: "FAQ", href: "/services#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};
