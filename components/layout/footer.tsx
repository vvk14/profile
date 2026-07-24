import Link from "next/link";
import Image from "next/image";
import { footerLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] px-4 pb-28 pt-16 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold">
              <Image src="/images/vvk-dev-logo.png" alt="VVKDEV logo" width={32} height={32} className="rounded-full" />
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--fg-muted)]">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm text-[var(--gold)] hover:underline"
            >
              {siteConfig.email}
            </a>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vivek Patel on LinkedIn"
                className="flex size-8 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                in
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vivek Patel on GitHub"
                className="flex size-8 items-center justify-center rounded-full border border-[var(--border)] text-xs font-semibold hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                gh
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">{heading}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[var(--fg)] opacity-80 hover:opacity-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--fg-muted)] md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Designed & built by {siteConfig.name}</p>
        </div>
      </div>
    </footer>
  );
}
