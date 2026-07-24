"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Renders the real final value in the initial markup (so crawlers and
 * no-JS users always see the correct number), then — only after mount —
 * resets to 0 and animates back up as a purely visual enhancement.
 */
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      if (ref.current) ref.current.textContent = `0${suffix}`;
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, suffix]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [springValue, suffix]);

  return <span ref={ref}>{value}{suffix}</span>;
}
