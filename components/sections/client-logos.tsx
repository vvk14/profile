import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const logos = [
  { src: "/images/company_logo/babyorgano.png", alt: "BabyOrgano" },
  { src: "/images/company_logo/alian_software_logo.webp", alt: "Alian Software" },
];

export function ClientLogos() {
  return (
    <Reveal className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-center text-xs uppercase tracking-wider text-[var(--fg-muted)]">
        Trusted by teams building on Shopify
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-10 opacity-80 grayscale">
        {logos.map((logo) => (
          <Image key={logo.alt} src={logo.src} alt={logo.alt} width={130} height={44} className="h-9 w-auto object-contain" />
        ))}
      </div>
    </Reveal>
  );
}
