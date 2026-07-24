import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 id={slugify(props.children)} className="mt-10 scroll-mt-32 font-display text-2xl font-semibold" {...props} />
  ),
  h3: (props) => (
    <h3 id={slugify(props.children)} className="mt-8 scroll-mt-32 font-display text-xl font-semibold" {...props} />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-[var(--fg-muted)]" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--fg-muted)]" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[var(--fg-muted)]" {...props} />,
  a: (props) => <a className="text-[var(--gold)] underline underline-offset-2" {...props} />,
  code: (props) => (
    <code className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 text-[13px]" {...props} />
  ),
  pre: (props) => (
    <pre className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-4 border-l-2 border-[var(--gold)] pl-4 italic text-[var(--fg-muted)]" {...props} />
  ),
};

function slugify(children: unknown): string {
  return String(children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
