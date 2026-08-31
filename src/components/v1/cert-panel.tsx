import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

const statusStyle: Record<string, string> = {
  valid: "bg-signal-50 text-[#1a8f4e] ring-signal-500/25",
  due: "bg-caution-50 text-[#b56a12] ring-caution-500/30",
  expired: "bg-alert-50 text-[#c72b30] ring-alert-500/25",
};

const statusDot: Record<string, string> = {
  valid: "bg-signal-500",
  due: "bg-caution-500",
  expired: "bg-alert-500",
};

/**
 * A representative view of the CertiTrack Plus register. Illustrative sample
 * data — it is not a live feed, and is labelled as a product view.
 */
export function CertPanel({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.home.panel;
  const statuses = p.statuses as Record<string, string>;

  return (
    <figure className="overflow-hidden rounded-md border border-line bg-white shadow-[0_28px_60px_-38px_rgba(20,22,46,0.5)]">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-surface px-5 py-4">
        <div>
          <p className="text-[14px] font-semibold text-ink">{p.title}</p>
          <p className="mt-1 font-mono text-[11.5px] text-azure-500">{p.subtitle}</p>
        </div>
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-alert-500/45" />
          <span className="h-2 w-2 rounded-full bg-caution-500/45" />
          <span className="h-2 w-2 rounded-full bg-signal-500/45" />
        </div>
      </figcaption>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[24rem] text-start text-[13.5px]">
          <thead>
            <tr className="border-b border-line-soft text-muted">
              <th scope="col" className="px-5 py-3 text-start text-[12px] font-semibold text-muted">{p.columns.asset}</th>
              <th scope="col" className="px-5 py-3 text-start text-[12px] font-semibold text-muted">{p.columns.cert}</th>
              <th scope="col" className="px-5 py-3 text-start text-[12px] font-semibold text-muted">{p.columns.due}</th>
              <th scope="col" className="px-5 py-3 text-end text-[12px] font-semibold text-muted">{p.columns.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {p.rows.map((row) => (
              <tr key={row.cert}>
                <td className="px-5 py-3.5 font-medium text-ink">{row.asset}</td>
                <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">
                  <bdi dir="ltr">{row.cert}</bdi>
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{row.due}</td>
                <td className="px-5 py-3.5 text-end">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ring-1 ring-inset ${statusStyle[row.status]}`}
                  >
                    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${statusDot[row.status]}`} />
                    {statuses[row.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-line-soft bg-surface px-5 py-3.5 text-[12.5px] leading-relaxed text-muted">
        {p.footnote}
      </p>
    </figure>
  );
}
