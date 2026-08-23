import type { RecentThemeCheck } from "@/lib/apps-script";

export function RecentThemeChecks({ checks }: { checks: RecentThemeCheck[] }) {
  if (checks.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-display text-xl font-semibold">Recently checked stores</h2>
      <div className="mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)]">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[var(--bg-elevated)] text-xs uppercase tracking-wider text-[var(--fg-muted)]">
            <tr>
              <th className="px-4 py-3">Shop</th>
              <th className="px-4 py-3">Theme</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check, i) => (
              <tr key={i} className="border-t border-[var(--border)]">
                <td className="px-4 py-3 font-medium">{check.shopHandle || "—"}</td>
                <td className="px-4 py-3 text-[var(--fg-muted)]">{check.schemaName || check.themeName || "—"}</td>
                <td className="px-4 py-3 text-[var(--fg-muted)]">{check.isThemeStore ? "Theme Store" : "Custom"}</td>
                <td className="px-4 py-3 text-[var(--fg-muted)]">{check.country || "—"}</td>
                <td className="px-4 py-3 font-medium text-[var(--gold)]">{check.seoScore}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
