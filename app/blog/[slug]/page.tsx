import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { extractToc } from "@/lib/toc";
import { buildMetadata, jsonLdScript, blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareButtons } from "@/components/blog/share-buttons";
import { BlogCard } from "@/components/blog/blog-card";
import { LikeButton } from "@/components/blog/like-button";
import { CommentsSection } from "@/components/blog/comments-section";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const meta = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.coverImage.startsWith("http") ? post.coverImage : `${siteConfig.url}${post.coverImage}`,
  });

  // A pillar-style post already ships a fully SEO-crafted title, so skip the
  // "- VVKDEV" site suffix; it would push the title past Google's ~60-char cutoff.
  if (post.seoTitle) {
    meta.title = { absolute: post.seoTitle };
  }

  return meta;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const related = getRelatedPosts(post.slug, post.category);

  const jsonLd = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    ...(post.faqs && post.faqs.length > 0 ? [faqJsonLd(post.faqs)] : []),
  ];

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <ReadingProgress />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }} />
      ))}

      <nav aria-label="Breadcrumb" className="text-sm text-[var(--fg-muted)]">
        <Link href="/blog" className="hover:text-[var(--gold)]">Blog</Link> / {post.category}
      </nav>

      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-[var(--fg-muted)]">{post.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-[var(--fg-muted)]">
            <span>{siteConfig.fullName}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex items-center gap-3">
            <LikeButton slug={post.slug} />
            <ShareButtons slug={post.slug} title={post.title} />
          </div>
        </div>
      </header>

      <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-[var(--radius-lg)]">
        <Image src={post.coverImage} alt={post.coverImageAlt} fill sizes="100vw" className="object-cover" priority />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="max-w-3xl">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "github-dark" }]],
              },
            }}
          />
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <TableOfContents items={toc} />
        </aside>
      </div>

      <CommentsSection slug={post.slug} />

      {related.length > 0 && (
        <div className="mt-10 md:mt-20">
          <h2 className="font-display text-2xl font-semibold">Related articles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((r) => (
              <BlogCard key={r.slug} post={r} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
