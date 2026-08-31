import Link from "next/link";
import { ArrowIcon } from "./ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { site } from "@/lib/site";

export function CtaBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden className="u-grid-paper-dark pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-azure-400/12 blur-3xl"
      />
      <div className="u-shell relative grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:py-20">
        <div className="lg:col-span-7">
          <h2 className="u-balance text-[2.1rem] font-semibold sm:text-[2.6rem]">{t.home.cta.title}</h2>
          <p className="u-pretty mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/65">
            {t.home.cta.body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
          <Link
            href={href(locale, "contact")}
            className="group inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-azure-50"
          >
            {t.home.cta.primary}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
          >
            {t.home.cta.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
