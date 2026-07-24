"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === "1");
    fetch(`/api/blog/${slug}/like`)
      .then((res) => res.json())
      .then((data) => setCount(data.count ?? 0))
      .catch(() => setCount(0));
  }, [slug]);

  async function handleLike() {
    if (liked || pending) return;
    setPending(true);
    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setCount(data.count);
      setLiked(true);
      localStorage.setItem(`liked:${slug}`, "1");
    } catch {
      // silently ignore — liking is a nice-to-have, not critical
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={liked || pending}
      aria-pressed={liked}
      aria-label={liked ? "You liked this article" : "Like this article"}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-default",
        liked
          ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
          : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
      )}
    >
      <motion.span animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
        <Heart size={16} fill={liked ? "currentColor" : "none"} />
      </motion.span>
      {count === null ? "..." : count} {count === 1 ? "Like" : "Likes"}
    </button>
  );
}
