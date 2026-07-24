import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <p className="font-display text-7xl font-bold text-gradient-gold">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
      <p className="mt-3 text-[var(--fg-muted)]">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <LinkButton href="/">Back Home</LinkButton>
        <LinkButton href="/contact" variant="outline">Contact Me</LinkButton>
      </div>
    </div>
  );
}
