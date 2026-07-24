"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${siteConfig.url}/blog/${slug}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-[var(--fg-muted)]">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold hover:bg-[var(--bg-elevated)]"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold hover:bg-[var(--bg-elevated)]"
      >
        in
      </a>
      <button
        type="button"
        aria-label="Copy link"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--bg-elevated)]"
      >
        <Link2 size={14} />
      </button>
      {copied && <span className="text-xs text-[var(--gold)]">Copied!</span>}
    </div>
  );
}
