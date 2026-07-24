"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { formatDate } from "@/lib/utils";

interface ApprovedComment {
  name: string;
  comment: string;
  date: string;
}

export function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<ApprovedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({ resolver: zodResolver(commentSchema), defaultValues: { slug } });

  useEffect(() => {
    fetch(`/api/blog/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data.comments ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [slug]);

  async function onSubmit(data: CommentFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset({ slug });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-10 md:mt-20">
      <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
        <MessageCircle size={22} className="text-[var(--gold)]" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {!loading && comments.length > 0 && (
        <div className="mt-6 space-y-4">
          {comments.map((c, i) => (
            <GlassPanel key={i} className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-[var(--fg-muted)]">{formatDate(c.date)}</p>
              </div>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{c.comment}</p>
            </GlassPanel>
          ))}
        </div>
      )}

      {!loading && comments.length === 0 && (
        <p className="mt-6 text-sm text-[var(--fg-muted)]">Be the first to comment.</p>
      )}

      <div className="mt-8">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass flex items-center gap-3 rounded-[var(--radius-md)] p-5"
          >
            <CheckCircle2 className="shrink-0 text-[var(--gold)]" size={24} />
            <p className="text-sm text-[var(--fg-muted)]">
              Thanks! Your comment is pending a quick review before it appears here.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <input type="hidden" {...register("slug")} value={slug} />
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company_website")} />

            <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input {...register("name")} className="input mt-1.5" placeholder="Your name" />
                {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name.message}</span>}
              </label>
              <label className="block">
                <span className="text-sm font-medium">Comment</span>
                <input {...register("comment")} className="input mt-1.5" placeholder="Share your thoughts..." />
                {errors.comment && <span className="mt-1 block text-xs text-red-500">{errors.comment.message}</span>}
              </label>
            </div>

            <Button type="submit" disabled={status === "submitting"} size="sm">
              {status === "submitting" ? (
                <>
                  <Loader2 className="animate-spin" size={14} /> Posting...
                </>
              ) : (
                "Post Comment"
              )}
            </Button>

            {status === "error" && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
