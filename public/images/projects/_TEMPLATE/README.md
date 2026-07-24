# Adding a new project — image checklist

1. Duplicate this folder: `public/images/projects/_TEMPLATE/` → `public/images/projects/<your-slug>/`
2. Drop in:
   - `cover.png` — 1600×1000px (16:10), under 300KB, WebP or PNG
   - `gallery-1.png`, `gallery-2.png`, `gallery-3.png` — 1920×1200px, same aspect ratio
   - `before.png` / `after.png` — only if you have a before/after performance or redesign comparison
3. Open `content/projects.ts` and copy an existing entry, changing:
   - `slug` → must match the folder name you created above
   - `coverImage` → `/images/projects/<your-slug>/cover.png`
   - `gallery` → array of the gallery image paths
   - all the text fields (title, summary, problem, solution, techStack, performance, seoResults)
4. Set `featured: true` if it should appear on the homepage (max 3 recommended).

That's it — no other code changes needed. The listing page, case-study page, and related-projects section all read from this one file.
