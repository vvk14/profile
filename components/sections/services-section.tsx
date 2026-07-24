import Link from "next/link";
import { ShoppingBag, Code, Gauge, Search as SearchIcon, PenTool, Users } from "lucide-react";
import { services, otherServices } from "@/content/services";
import { Reveal } from "@/components/ui/reveal";
import { GlassPanel } from "@/components/ui/glass-panel";

const otherIcons = [Gauge, SearchIcon, PenTool, Users];
const serviceIcons = { "shopping-bag": ShoppingBag, code: Code } as const;

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Services</p>
        <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">What I Can Build For You</h2>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Code;
          return (
            <Reveal key={service.slug} delay={i * 0.1}>
              <Link href={`/services/${service.slug}`}>
                <GlassPanel className="h-full p-8 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-black">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-[var(--fg-muted)]">{service.summary}</p>
                </GlassPanel>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {otherServices.map((service, i) => {
          const Icon = otherIcons[i % otherIcons.length];
          return (
            <Reveal key={service.title} delay={i * 0.08}>
              <GlassPanel className="h-full p-6">
                <Icon size={18} className="text-[var(--gold)]" />
                <h3 className="mt-3 font-medium">{service.title}</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)]">{service.summary}</p>
              </GlassPanel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
