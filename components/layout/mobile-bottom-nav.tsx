"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Layers, Sparkles, NotebookText, Mail } from "lucide-react";
import { mobileNavLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useHideOnScroll } from "@/lib/use-hide-on-scroll";

const icons = {
  home: Home,
  layers: Layers,
  sparkles: Sparkles,
  notebook: NotebookText,
  mail: Mail,
} as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const hidden = useHideOnScroll();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "glass fixed inset-x-3 bottom-3 z-50 flex items-center justify-between rounded-[28px] px-2 py-2 transition-transform duration-300 md:hidden",
        hidden ? "translate-y-[calc(100%+24px)]" : "translate-y-0"
      )}
    >
      {mobileNavLinks.map((link) => {
        const Icon = icons[link.icon];
        const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium"
          >
            {active && (
              <motion.span
                layoutId="mobile-nav-active"
                className="absolute inset-0 rounded-2xl bg-[var(--bg-elevated)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={cn("relative z-10", active ? "text-[var(--gold)]" : "text-[var(--fg-muted)]")}>
              <Icon size={20} />
            </span>
            <span className={cn("relative z-10", active ? "text-[var(--fg)]" : "text-[var(--fg-muted)]")}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
