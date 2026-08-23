"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { themeDetectSchema, type ThemeDetectFormValues } from "@/lib/validation";
import type { ThemeDetectionResult } from "@/lib/theme-detector";
import { Button } from "@/components/ui/button";
import { ThemeDetectorResult } from "./theme-detector-result";

export function ThemeDetectorForm() {
  const [result, setResult] = useState<ThemeDetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ThemeDetectFormValues>({ resolver: zodResolver(themeDetectSchema) });

  async function onSubmit(data: ThemeDetectFormValues) {
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/detect-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(typeof body.error === "string" ? body.error : "Couldn't check that store. Please try again.");
        return;
      }
      setResult(body.result);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <input
            {...register("url")}
            className="input"
            placeholder="e.g. allbirds.com"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.url && <span className="mt-1 block text-xs text-red-500">{errors.url.message}</span>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} /> Scanning...
            </>
          ) : (
            <>
              <Search size={16} /> Check Theme
            </>
          )}
        </Button>
      </form>

      {error && (
        <p className="rounded-[var(--radius-sm)] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {result && <ThemeDetectorResult result={result} />}
    </div>
  );
}
