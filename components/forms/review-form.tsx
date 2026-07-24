"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Star, CheckCircle2, Loader2 } from "lucide-react";
import { reviewSchema, type ReviewFormValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ReviewForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({ resolver: zodResolver(reviewSchema), defaultValues: { rating: 5 } });

  async function onSubmit(data: ReviewFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass flex flex-col items-center rounded-[var(--radius-lg)] p-10 text-center"
      >
        <CheckCircle2 className="text-[var(--gold)]" size={40} />
        <h3 className="mt-4 font-display text-xl font-semibold">Thank you!</h3>
        <p className="mt-2 text-[var(--fg-muted)]">
          Your review has been submitted and is pending a quick approval before it appears on the site.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company_website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input {...register("name")} className="input mt-1.5" placeholder="Your name" />
          {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name.message}</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium">Company (optional)</span>
          <input {...register("company")} className="input mt-1.5" placeholder="Company name" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium">Email (optional — for a thank-you reply)</span>
        <input {...register("email")} type="email" className="input mt-1.5" placeholder="you@company.com" />
        {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email.message}</span>}
      </label>

      <div>
        <span className="text-sm font-medium">Rating</span>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => field.onChange(n)}
                  className="cursor-pointer p-0.5"
                >
                  <Star
                    size={26}
                    className={cn(field.value >= n ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--border)]")}
                  />
                </button>
              ))}
            </div>
          )}
        />
      </div>

      <label className="block">
        <span className="text-sm font-medium">Your Review</span>
        <textarea
          {...register("message")}
          rows={5}
          className="input mt-1.5 resize-none"
          placeholder="Share your experience working together..."
        />
        {errors.message && <span className="mt-1 block text-xs text-red-500">{errors.message.message}</span>}
      </label>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>

      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
