import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CertPanel } from "@/components/cert-panel";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema, softwareSchema } from "@/components/json-ld";
import { ArrowIcon, CheckList, NumberedGrid, Section, SectionHead } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    route: "certitrack",
    title: t.seo.certitrack.title,
    description: t.seo.certitrack.description,
    keywords: keywordSets.certitrack[locale],
  });
}

export default async function CertiTrackPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.services, route: "services" },
            { name: t.nav.certitrack, route: "certitrack" },
          ]),
          softwareSchema(locale, t.seo.certitrack.description),
        ]}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.services, route: "services" },
          { label: t.nav.certitrack, route: "certitrack" },
        ]}
        title={t.certitrack.hero.title}
        lead={t.certitrack.hero.lead}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={href(locale, "contact")}
            className="group inline-flex items-center gap-2 rounded-sm bg-azure-400 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-azure-500"
          >
            {t.certitrack.hero.primaryCta}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
          <a
            href={site.products.certiTrack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-line bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-600"
          >
            <bdi dir="ltr">{t.certitrack.hero.secondaryCta}</bdi>
            <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-3 w-3">
              <path d="M4 2h6v6M10 2 2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-[1.9rem] font-semibold text-ink sm:text-[2.35rem]">
              {t.certitrack.problem.title}
            </h2>
            <div className="mt-6 space-y-5">
              {t.certitrack.problem.body.map((para) => (
                <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:ps-8">
            <CertPanel locale={locale} />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead title={t.certitrack.features.title} />
        <div className="mt-14">
          <NumberedGrid items={t.certitrack.features.items} columns={3} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="u-balance text-2xl font-semibold text-ink sm:text-[1.85rem]">
              {t.certitrack.audience.title}
            </h2>
            <div className="mt-8">
              <CheckList items={t.certitrack.audience.items} />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="h-full rounded-md border border-azure-200 bg-azure-50/60 p-8">
              <h3 className="text-lg font-semibold text-brand-700">{t.certitrack.outcome.title}</h3>
              <p className="u-pretty mt-4 text-[16px] leading-relaxed text-ink-soft">
                {t.certitrack.outcome.body}
              </p>
              <div className="mt-8 border-t border-azure-200 pt-6">
                <Link
                  href={href(locale, "software")}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-azure-600 hover:text-brand-700"
                >
                  {t.nav.software}
                  <ArrowIcon className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
