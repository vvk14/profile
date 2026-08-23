import type { Metadata } from "next";
import { siteConfig } from "./site";

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}/images/og-default.svg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Escapes `<` so JSON-LD can't be used for script-injection when embedded via dangerouslySetInnerHTML. */
export function jsonLdScript(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.social),
    image: `${siteConfig.url}/images/vvk-dev-logo.png`,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/vvk-dev-logo.png`,
    founder: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: siteConfig.fullName },
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/images/vvk-dev-logo.png` },
    },
  };
}

export function projectJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  coverImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: `${siteConfig.url}${project.coverImage}`,
    creator: { "@type": "Person", name: siteConfig.fullName },
  };
}

export function serviceJsonLd(service: { title: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@type": "Person", name: siteConfig.fullName, url: siteConfig.url },
    areaServed: "Worldwide",
  };
}

export function softwareApplicationJsonLd(app: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    url: `${siteConfig.url}${app.path}`,
    applicationCategory: "SEO Application",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Person", name: siteConfig.fullName },
  };
}

export function reviewsJsonLd(
  reviews: { name: string; message: string; rating: number }[]
) {
  if (reviews.length === 0) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.message,
    })),
  };
}
