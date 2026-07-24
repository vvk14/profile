import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogListing } from "@/components/blog/blog-listing";

export const metadata: Metadata = buildMetadata({
  title: "Blog — Shopify Development, Performance & SEO",
  description: "Practical, field-tested articles on Shopify theme development, Core Web Vitals, and ecommerce SEO.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="mb-8 text-center md:mb-12">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Blog</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
          Notes on Shopify, performance & SEO
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
          Practical write-ups from real client work — not theory.
        </p>
      </div>
      <BlogListing posts={posts} categories={categories} />
    </section>
  );
}
