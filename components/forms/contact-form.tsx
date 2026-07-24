"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { Button } from "@/components/ui/button";

const budgetOptions = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $8,000", "$8,000+"];
const timelineOptions = ["ASAP", "Within 1 month", "1–3 months", "Flexible"];
const projectTypeOptions = ["Shopify Build", "Shopify Optimization", "Custom Website", "Other"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
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
        <h3 className="mt-4 font-display text-xl font-semibold">Message sent!</h3>
        <p className="mt-2 text-[var(--fg-muted)]">
          Thanks for reaching out. I'll get back to you within 1-2 business days.
        </p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: hidden from real users, bots tend to fill every field */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company_website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className="input" placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" className="input" placeholder="you@company.com" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input {...register("phone")} className="input" placeholder="+1 555 000 0000" />
        </Field>
        <Field label="Company (optional)" error={errors.company?.message}>
          <input {...register("company")} className="input" placeholder="Company name" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Project Type" error={errors.projectType?.message}>
          <select {...register("projectType")} className="input">
            <option value="">Select...</option>
            {projectTypeOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <select {...register("budget")} className="input">
            <option value="">Select...</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <select {...register("timeline")} className="input">
            <option value="">Select...</option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} rows={5} className="input resize-none" placeholder="Tell me about your project..." />
      </Field>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-500"
          >
            Something went wrong. Please try again or email me directly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
