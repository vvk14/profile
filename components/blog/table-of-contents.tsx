import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="glass hidden rounded-[var(--radius-md)] p-5 lg:block">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">On this page</p>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
            <a href={`#${item.id}`} className="text-[var(--fg-muted)] hover:text-[var(--gold)]">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
