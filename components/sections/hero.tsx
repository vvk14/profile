"use client";

import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden px-4 pb-8 pt-4 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--fg-muted)]"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--gold)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--gold)]" />
          </span>
          <span className="hidden sm:inline">{siteConfig.role} · Available for select projects</span>
          <span className="sm:hidden">Available for select projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:mt-6 md:text-6xl md:leading-[1.1]"
        >
          Premium Shopify storefronts that{" "}
          <span className="text-gradient-gold">load fast &amp; convert</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-sm text-[var(--fg-muted)] md:mt-6 md:text-lg"
        >
          I'm {siteConfig.fullName} — a Shopify theme developer crafting pixel-perfect Liquid
          storefronts, custom sections, and Core Web Vitals-optimized experiences for DTC brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8"
        >
          <LinkButton href="/projects">View My Work</LinkButton>
          <LinkButton href="/contact" variant="outline">
            Start a Project
          </LinkButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6"
        >
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-xl font-semibold md:text-3xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-[11px] text-[var(--fg-muted)] md:text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
