"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden justify-center px-4 pt-4 md:flex">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5"
      >
        <Link href="/" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
          <Image src="/images/vvk-dev-logo.png" alt="VVKDEV logo" width={28} height={28} className="rounded-full" />
          VVKDEV
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  active ? "text-[var(--fg)] bg-[var(--bg-elevated)]" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LinkButton href="/contact" size="sm">
            Let's Talk
          </LinkButton>
        </div>
      </motion.div>
    </header>
  );
}
