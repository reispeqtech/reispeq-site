import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/json-ld";
import { CheckList, NumberedGrid, Section, SectionHead } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    route: "investigations",
    title: t.seo.investigations.title,
    description: t.seo.investigations.description,
    keywords: keywordSets.investigations[locale],
  });
}

export default async function InvestigationsPage({ params }: Props) {
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
            { name: t.nav.investigations, route: "investigations" },
          ]),
          serviceSchema({
            locale,
            route: "investigations",
            name: t.investigations.hero.title,
            description: t.seo.investigations.description,
            serviceType: "Technical failure investigation",
          }),
        ]}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.services, route: "services" },
          { label: t.nav.investigations, route: "investigations" },
        ]}
        title={t.investigations.hero.title}
        lead={t.investigations.hero.lead}
        note={t.investigations.note}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-3xl font-semibold text-ink sm:text-[2.25rem]">
              {t.investigations.services.title}
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {t.investigations.intro.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <NumberedGrid items={t.investigations.services.items} columns={2} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead title={t.investigations.uses.title} />
          </div>
          <div className="lg:col-span-7">
            <CheckList items={t.investigations.uses.items} />
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
