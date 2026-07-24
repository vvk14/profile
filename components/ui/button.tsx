import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black font-medium hover:brightness-110 shadow-[0_8px_30px_rgba(201,163,90,0.25)]",
  outline: "border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--bg-elevated)]",
  ghost: "text-[var(--fg-muted)] hover:text-[var(--fg)]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
};

function classes(variant: Variant = "primary", size: "sm" | "md" = "md", className?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant,
  size,
  className,
  children,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}
