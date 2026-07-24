import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Blog</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">From the Blog</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <LinkButton href="/blog" variant="outline">
          Read All Articles
        </LinkButton>
      </Reveal>
    </section>
  );
}
