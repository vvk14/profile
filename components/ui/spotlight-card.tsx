"use client";

import { useRef } from "react";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a mouse-follow gold glow on the border, the "magic card"
 * hover pattern popularized by 21st.dev / Magic UI component galleries.
 * Pure CSS custom properties — no extra animation library needed.
 */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("glass group/spotlight relative rounded-[var(--radius-lg)]", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-lg)] opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(201,163,90,0.15), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
