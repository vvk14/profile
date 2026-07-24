import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <SpotlightCard className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <Badge>{post.category}</Badge>
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-[var(--gold)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-[var(--fg-muted)]">{post.description}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-[var(--fg-muted)]">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
