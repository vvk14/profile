"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { footerLinks, siteConfig } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { LinkButton } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close automatically whenever the route changes (link click, back/forward nav)
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open, and let Escape close it
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg)] transition-colors hover:bg-[var(--bg-elevated)]"
      >
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[var(--bg)]/80 backdrop-blur-sm md:hidden"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="glass absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto rounded-b-[28px] px-5 pb-8 pt-5"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
                  <Image src="/images/vvk-dev-logo.png" alt="VVKDEV logo" width={26} height={26} className="rounded-full" />
                  VVKDEV
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] hover:bg-[var(--bg-elevated)]"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <nav aria-label="All pages" className="mt-8 space-y-7">
                {Object.entries(footerLinks).map(([heading, links]) => (
                  <div key={heading}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">{heading}</p>
                    <ul className="mt-3 space-y-1">
                      {links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-xl px-2 py-2.5 text-lg font-medium hover:bg-[var(--bg-elevated)] hover:text-[var(--gold)]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <LinkButton href="/contact" className="w-full">
                  Let's Talk
                </LinkButton>
                <a href={`mailto:${siteConfig.email}`} className="text-center text-sm text-[var(--fg-muted)]">
                  {siteConfig.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
