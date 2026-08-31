import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/json-ld";
import { Button, CheckList, NumberedGrid, Section, SectionHead } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { buildMetadata, keywordSets } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    locale,
    route: "software",
    title: t.seo.software.title,
    description: t.seo.software.description,
    keywords: keywordSets.software[locale],
  });
}

export default async function SoftwarePage({ params }: Props) {
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
            { name: t.nav.software, route: "software" },
          ]),
          serviceSchema({
            locale,
            route: "software",
            name: t.software.hero.title,
            description: t.seo.software.description,
            serviceType: "Custom software development",
          }),
        ]}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.services, route: "services" },
          { label: t.nav.software, route: "software" },
        ]}
        title={t.software.hero.title}
        lead={t.software.hero.lead}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-3xl font-semibold text-ink sm:text-[2.25rem]">
              {t.software.capabilities.title}
            </h2>
            <p className="u-pretty mt-6 text-[15.5px] leading-relaxed text-muted">
              {t.common.scopeNote}
            </p>
          </div>
          <div className="space-y-5 lg:col-span-7">
            {t.software.intro.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <NumberedGrid items={t.software.capabilities.items} columns={3} />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead title={t.software.process.title} />
        <div className="mt-12">
          <NumberedGrid items={t.software.process.steps} columns={2} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="u-balance text-2xl font-semibold text-ink sm:text-[1.85rem]">
              {t.software.outcomes.title}
            </h2>
            <div className="mt-8">
              <CheckList items={t.software.outcomes.items} />
            </div>
          </div>
          <aside className="lg:col-span-6">
            <div className="rounded-md border border-line bg-surface p-8">
              <h3 className="text-lg font-semibold text-ink">{t.software.proof.title}</h3>
              <p className="u-pretty mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                {t.software.proof.body}
              </p>
              <div className="mt-7">
                <Button href={href(locale, "certitrack")} variant="secondary">
                  {t.software.proof.cta}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
