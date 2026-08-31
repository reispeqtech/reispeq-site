import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/lib/routes";
import { Photo } from "../photo";
import { type MediaKey } from "@/lib/media";

export function Breadcrumbs({
  locale,
  trail,
}: {
  locale: Locale;
  trail: { label: string; route: RouteKey }[];
}) {
  const t = getDictionary(locale);
  return (
    <nav aria-label={t.common.breadcrumb}>
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-white/50">
        {trail.map((item, i) => (
          <li key={item.route} className="flex items-center gap-2.5">
            {i > 0 ? (
              <span aria-hidden className="text-white/25">
                /
              </span>
            ) : null}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-white/85">
                {item.label}
              </span>
            ) : (
              <Link href={href(locale, item.route)} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Inner-page hero: a photograph band, sized so the page below starts above the
 * fold on a laptop. Shorter than the homepage hero on purpose — the visitor
 * arriving here has already chosen a subject and wants the content, not
 * another full-screen picture.
 */
export function PageHero({
  locale,
  trail,
  title,
  lead,
  note,
  image,
  children,
}: {
  locale: Locale;
  trail: { label: string; route: RouteKey }[];
  title: string;
  lead: string;
  note?: string;
  image: MediaKey;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a0b20] text-white">
      <Photo
        image={image}
        locale={locale}
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
      />
      {/* Two layers: the side scrim anchors the headline, the flat wash keeps
          the lead readable where it sits over the bright part of the picture. */}
      <span aria-hidden className="u-scrim-s absolute inset-0 -z-10" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[#0a0b20]/35" />

      <div className="u-shell-wide relative py-12 lg:py-20">
        <Breadcrumbs locale={locale} trail={trail} />

        <div className="mt-10 grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <h1 className="u-balance text-[2.2rem] font-semibold sm:text-[2.9rem] lg:col-span-7 lg:text-[3.3rem]">
            {title}
          </h1>
          <p className="u-pretty text-[16.5px] leading-relaxed text-white/70 lg:col-span-5 lg:pt-3">{lead}</p>
        </div>

        {note ? (
          <p className="mt-9 max-w-2xl border-s-2 border-azure-400/60 ps-5 text-[14px] leading-relaxed text-white/55">
            {note}
          </p>
        ) : null}

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
