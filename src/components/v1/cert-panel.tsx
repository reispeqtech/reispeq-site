import type { Locale } from "@/i18n/config";

/**
 * Sample register data, held here rather than in the shared dictionary.
 *
 * The live site shows real screenshots of CertiTrack Plus now, so this drawn
 * panel exists only inside the archived v1 build. Keeping its copy local means
 * the archive cannot pin down wording that the live site has moved on from.
 */
const panel = {
  en: {
    title: "Certification register",
    subtitle: "CertiTrack Plus · sample view",
    columns: { asset: "Asset", cert: "Certificate", due: "Expiry", status: "Status" },
    statuses: { valid: "Valid", due: "Due soon", expired: "Expired" },
    footnote: "Expiry alerts, inspection history and evidence in one controlled register.",
  },
  ar: {
    title: "سجلّ الشهادات",
    subtitle: "سيرتي‑تراك بلس · عرض توضيحي",
    columns: { asset: "الأصل", cert: "الشهادة", due: "الانتهاء", status: "الحالة" },
    statuses: { valid: "سارية", due: "تقترب من الانتهاء", expired: "منتهية" },
    footnote: "تنبيهات الانتهاء وسجل الفحوصات والأدلة في سجل واحد مضبوط.",
  },
} as const;

const rows = [
  { asset: { en: "Elevator 150 T", ar: "رافعة 150 طن" }, cert: "LEEA-0442", due: { en: "18 Nov", ar: "18 نوفمبر" }, status: "valid" },
  { asset: { en: "Tong — power", ar: "مفتاح ربط آلي" }, cert: "API-7K-1187", due: { en: "02 Sep", ar: "02 سبتمبر" }, status: "due" },
  { asset: { en: "Sling set 4-leg", ar: "طقم حبال 4 أفرع" }, cert: "LG-2231", due: { en: "11 Aug", ar: "11 أغسطس" }, status: "expired" },
  { asset: { en: "BOP ram 13-5/8", ar: "مانع انفجار 13-5/8" }, cert: "API-16A-0067", due: { en: "27 Jan", ar: "27 يناير" }, status: "valid" },
] as const;

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
  const p = panel[locale];
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
            {rows.map((row) => (
              <tr key={row.cert}>
                <td className="px-5 py-3.5 font-medium text-ink">{row.asset[locale]}</td>
                <td className="px-5 py-3.5 font-mono text-[12.5px] text-muted">
                  <bdi dir="ltr">{row.cert}</bdi>
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{row.due[locale]}</td>
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
