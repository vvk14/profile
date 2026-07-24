import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";

export async function generateStaticParams() {
  return getCategories().map((category) => ({ category: encodeURIComponent(category) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return buildMetadata({
    title: `${name} Articles — Blog`,
    description: `Articles about ${name} on the VVKDEV blog.`,
    path: `/blog/category/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const posts = getAllPosts().filter((p) => p.category === name);

  if (posts.length === 0) notFound();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Category</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">{name}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
