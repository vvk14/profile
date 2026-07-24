"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { BlogCard } from "./blog-card";
import { cn } from "@/lib/utils";

export function BlogListing({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery = query.trim().length === 0 || post.title.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || post.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              !activeCategory ? "border-[var(--gold)] text-[var(--gold)]" : "border-[var(--border)] text-[var(--fg-muted)]"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                activeCategory === category
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-[var(--border)] text-[var(--fg-muted)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-[var(--fg-muted)]">No articles match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
