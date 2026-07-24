import type { Metadata } from "next";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "@/components/forms/contact-form";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start Your Shopify Project",
  description: "Get in touch to discuss your Shopify development or custom website project. Free 30-minute consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <Reveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--gold)]">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">Let's Build Something Great</h1>
        <p className="mx-auto mt-4 max-w-xl text-[var(--fg-muted)]">
          Tell me about your project — I'll reply within 1-2 business days with next steps.
        </p>
      </Reveal>

      <div className="mt-8 md:mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          <GlassPanel className="p-6">
            <Mail className="text-[var(--gold)]" size={20} />
            <p className="mt-3 font-medium">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-[var(--fg-muted)] hover:text-[var(--gold)]">
              {siteConfig.email}
            </a>
          </GlassPanel>
          <GlassPanel className="p-6">
            <Clock className="text-[var(--gold)]" size={20} />
            <p className="mt-3 font-medium">Response Time</p>
            <p className="text-sm text-[var(--fg-muted)]">Within 1-2 business days</p>
          </GlassPanel>
          <GlassPanel className="p-6">
            <MessageSquare className="text-[var(--gold)]" size={20} />
            <p className="mt-3 font-medium">Free Consultation</p>
            <p className="text-sm text-[var(--fg-muted)]">30-minute call, no obligation</p>
          </GlassPanel>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassPanel className="p-6 md:p-8">
            <ContactForm />
          </GlassPanel>
        </Reveal>
      </div>
    </div>
  );
}
