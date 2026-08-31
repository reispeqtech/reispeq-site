import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CertPanel } from "@/components/cert-panel";
import { CtaBand } from "@/components/cta-band";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { ArrowIcon, Button, CheckList, NumberedGrid, Section, SectionHead } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    ...buildMetadata({
      locale,
      route: "home",
      title: t.seo.home.title,
      description: t.seo.home.description,
      keywords: keywordSets.home[locale],
    }),
    title: `${site.name} — ${t.seo.home.title}`,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const services = serviceKeys.map((key, i) => ({
    key,
    href: href(locale, key),
    label: t.nav[key],
    body: t.servicesIndex.cards[i].body,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t.nav.home, route: "home" }])} />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden className="u-grid-paper pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface"
        />
        <div className="u-shell relative grid gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="min-w-0 lg:col-span-6 xl:col-span-6">
            <h1 className="u-balance text-[2.35rem] font-semibold text-ink sm:text-[3rem] lg:text-[3.4rem]">
              {t.home.hero.title}
            </h1>
            <p className="u-pretty mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft">
              {t.home.hero.lead}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={href(locale, "contact")}>{t.home.hero.primaryCta}</Button>
              <Button href={href(locale, "certitrack")} variant="secondary">
                {t.home.hero.secondaryCta}
              </Button>
            </div>

            <dl className="mt-12 grid gap-px border-t border-line sm:grid-cols-3">
              {t.home.hero.stats.map((stat) => (
                <div key={stat.value} className="border-b border-line py-5 sm:pe-5">
                  <dt className="text-[15px] font-semibold text-brand-600">{stat.value}</dt>
                  <dd className="u-pretty mt-1.5 text-[13.5px] leading-snug text-muted">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0 lg:col-span-6 lg:ps-6 xl:ps-12">
            <CertPanel locale={locale} />
          </div>
        </div>
      </section>

      {/* ---------- Positioning ---------- */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-[1.9rem] font-semibold text-ink sm:text-[2.35rem]">
              {t.home.intro.title}
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-7">
            {t.home.intro.body.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------- Services ---------- */}
      <Section tone="surface">
        <SectionHead title={t.home.services.title} lead={t.home.services.lead} />
        <ul className="mt-14 border-t border-line">
          {services.map((service, i) => (
            <li key={service.key} className="border-b border-line">
              <Link
                href={service.href}
                className="group grid gap-4 py-8 transition-colors sm:grid-cols-12 sm:gap-8"
              >
                <div className="flex items-start gap-4 sm:col-span-5">
                  <span className="mt-1.5 shrink-0 font-mono text-[15px] font-medium tabular-nums text-brand-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-brand-600 sm:text-[1.375rem]">
                    {service.label}
                  </h3>
                </div>
                <p className="u-pretty text-[15.5px] leading-relaxed text-muted sm:col-span-6">
                  {service.body}
                </p>
                <div className="flex items-start justify-start sm:col-span-1 sm:justify-end">
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-brand-400 transition-colors group-hover:border-brand-400 group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Product ---------- */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="u-grid-paper-dark pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -start-32 top-1/3 h-96 w-96 rounded-full bg-azure-400/10 blur-3xl"
        />
        <div className="u-shell relative grid gap-14 py-18 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
          <div className="lg:col-span-6">
            <h2 className="u-balance text-[2.1rem] font-semibold sm:text-[2.6rem]">{t.home.product.title}</h2>
            <p className="u-pretty mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/70">
              {t.home.product.lead}
            </p>
            <div className="mt-9">
              <CheckList items={t.home.product.bullets} tone="light" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={href(locale, "certitrack")}
                className="group inline-flex items-center gap-2 rounded-sm bg-azure-400 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-azure-500"
              >
                {t.home.product.cta}
                <ArrowIcon className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
              <a
                href={site.products.certiTrack.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
              >
                <bdi dir="ltr">{t.home.product.externalCta}</bdi>
                <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-3 w-3">
                  <path d="M4 2h6v6M10 2 2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-6">
            <CertPanel locale={locale} />
          </div>
        </div>
      </section>

      {/* ---------- Method ---------- */}
      <Section>
        <SectionHead title={t.home.method.title} />
        <div className="mt-14">
          <NumberedGrid items={t.home.method.steps} columns={2} />
        </div>
      </Section>

      {/* ---------- Why ---------- */}
      <Section tone="surface">
        <SectionHead title={t.home.why.title} />
        <div className="mt-14">
          <NumberedGrid items={t.home.why.items} columns={3} />
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
