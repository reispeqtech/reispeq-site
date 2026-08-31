import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { RelatedServices } from "@/components/site/related";
import { Band, IconMetro, Ticks } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const scopeIcons = ["clipboard", "document", "checklist", "factory", "workflow", "cycle"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
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
          breadcrumbSchema("main", locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.services, route: "services" },
            { name: t.nav.auditing, route: "auditing" },
          ]),
          serviceSchema({
            version: "main",
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
        image="engineerHelmet"
        note={page.scopeNote}
      />

      <Band>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold text-ink sm:text-[2.4rem]">
              {page.services.title}
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-7">
            {page.intro.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[17px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <IconMetro items={page.services.items} icons={scopeIcons} columns={3} />
        </div>
      </Band>

      <Band tone="navy">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold sm:text-[2.4rem]">
              {page.deliverables.title}
            </h2>
            <p className="u-pretty mt-7 text-[15.5px] leading-relaxed text-white/55">{t.common.scopeNote}</p>
          </div>
          <div className="lg:col-span-7">
            <Ticks items={page.deliverables.items} tone="navy" />
          </div>
        </div>
      </Band>

      <RelatedServices locale={locale} current="auditing" />
      <CtaBand locale={locale} />
    </>
  );
}
