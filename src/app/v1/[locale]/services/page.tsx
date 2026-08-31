import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { ArrowIcon, Section } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { buildMetadata, keywordSets } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    route: "services",
    title: t.seo.services.title,
    description: t.seo.services.description,
    keywords: keywordSets.services[locale],
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.home, route: "home" },
          { name: t.nav.services, route: "services" },
        ])}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.services, route: "services" },
        ]}
        title={t.servicesIndex.hero.title}
        lead={t.servicesIndex.hero.lead}
      />

      <Section>
        <ul className="grid gap-px border-t border-line sm:grid-cols-2">
          {serviceKeys.map((key, i) => (
            <li key={key} className="border-b border-line sm:[&:nth-child(odd)]:border-e">
              <Link href={href(locale, key)} className="group flex h-full flex-col p-7 sm:p-9">
                <span className="font-mono text-[15px] font-medium tabular-nums text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="u-balance mt-4 text-xl font-semibold text-ink transition-colors group-hover:text-brand-600 sm:text-[1.4rem]">
                  {t.servicesIndex.cards[i].title}
                </h2>
                <p className="u-pretty mt-4 grow text-[15.5px] leading-relaxed text-muted">
                  {t.servicesIndex.cards[i].body}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  {t.common.exploreService}
                  <ArrowIcon className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-3xl font-semibold text-ink sm:text-4xl">
              {t.servicesIndex.combined.title}
            </h2>
          </div>
          <p className="u-pretty text-[16.5px] leading-relaxed text-ink-soft lg:col-span-7">
            {t.servicesIndex.combined.body}
          </p>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
