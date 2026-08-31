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
    route: "auditing",
    title: t.seo.auditing.title,
    description: t.seo.auditing.description,
    keywords: keywordSets.auditing[locale],
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const page = t.auditing;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.services, route: "services" },
            { name: t.nav.auditing, route: "auditing" },
          ]),
          serviceSchema({
            locale,
            route: "auditing",
            name: page.hero.title,
            description: t.seo.auditing.description,
            serviceType: "Quality management system auditing",
          }),
        ]}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.services, route: "services" },
          { label: t.nav.auditing, route: "auditing" },
        ]}
        title={page.hero.title}
        lead={page.hero.lead}
        note={page.scopeNote}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-3xl font-semibold text-ink sm:text-[2.25rem]">
              {page.services.title}
            </h2>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {page.intro.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <NumberedGrid items={page.services.items} columns={3} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead title={page.deliverables.title} />
            <p className="u-pretty mt-6 text-[15.5px] leading-relaxed text-muted">{t.common.scopeNote}</p>
          </div>
          <div className="lg:col-span-7">
            <CheckList items={page.deliverables.items} />
          </div>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
