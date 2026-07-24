export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
}

/**
 * Static fallback testimonials shown until the Google Sheets-backed
 * review system (see /reviews/submit and SETUP.md) has approved entries.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Founder, M2M Store (AU)",
    quote:
      "Vivek transformed our store completely. The speed improvements and clean code made a huge difference to our conversions. Very professional throughout.",
    rating: 5,
  },
  {
    name: "Raj K.",
    role: "Project Lead, Alian Software",
    quote:
      "Excellent Shopify knowledge, especially with metafields and Liquid. Delivered exactly what we needed and was easy to communicate with. Would hire again.",
    rating: 5,
  },
  {
    name: "BabyOrgano Team",
    role: "Ahmedabad",
    quote:
      "Our store went from sluggish to lightning fast after Vivek took over. He understands both the technical and business side of ecommerce very well.",
    rating: 5,
  },
];
