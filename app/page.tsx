import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesSection } from "@/components/sections/services-section";
import { Process } from "@/components/sections/process";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ClientLogos />
      <FeaturedProjects />
      <ServicesSection />
      <Process />
      <TestimonialsSection />
      <BlogPreview />
      <Cta />
    </>
  );
}
