import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/lib/routes";

export function Breadcrumbs({
  locale,
  trail,
}: {
  locale: Locale;
  trail: { label: string; route: RouteKey }[];
}) {
  const t = getDictionary(locale);
  return (
    <nav aria-label={t.common.breadcrumb} className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
        {trail.map((item, i) => (
          <li key={item.route} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden className="text-line">
                /
              </span>
            ) : null}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-ink-soft">
                {item.label}
              </span>
            ) : (
              <Link href={href(locale, item.route)} className="underline-offset-4 hover:text-brand-600 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  locale,
  trail,
  title,
  lead,
  note,
  children,
}: {
  locale: Locale;
  trail: { label: string; route: RouteKey }[];
  title: string;
  lead: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div aria-hidden className="u-grid-paper pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface/70 to-surface"
      />
      <div className="u-shell relative py-14 lg:py-20">
        <Breadcrumbs locale={locale} trail={trail} />
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-12">
          <h1 className="u-balance text-[2.15rem] font-semibold text-ink sm:text-[2.75rem] lg:col-span-7 lg:text-[3.15rem]">
            {title}
          </h1>
          <p className="u-pretty text-[16.5px] leading-relaxed text-ink-soft lg:col-span-5 lg:pt-3">{lead}</p>
        </div>
        {note ? (
          <p className="mt-6 max-w-2xl border-s-2 border-brand-200 ps-4 text-[14px] leading-relaxed text-muted">
            {note}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
