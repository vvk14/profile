"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[var(--radius-lg)]"
      onMouseMove={(e) => e.buttons === 1 && updateFromClientX(e.clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      <Image src={after} alt={`${alt} — after`} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={before} alt={`${alt} — before`} fill sizes="100vw" className="object-cover" />
      </div>
      <div
        className="absolute inset-y-0 flex w-1 -translate-x-1/2 cursor-ew-resize items-center justify-center bg-[var(--gold)]"
        style={{ left: `${position}%` }}
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-[var(--gold)] text-black text-xs font-bold shadow-lg">
          ↔
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">Before</span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white">After</span>
    </div>
  );
}
