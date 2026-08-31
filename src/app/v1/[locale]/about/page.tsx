import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { NumberedGrid, Section, SectionHead } from "@/components/ui";
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
    route: "about",
    title: t.seo.about.title,
    description: t.seo.about.description,
    keywords: keywordSets.about[locale],
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t.nav.home, route: "home" },
          { name: t.nav.about, route: "about" },
        ])}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.about, route: "about" },
        ]}
        title={t.about.hero.title}
        lead={t.about.hero.lead}
      />

      <Section>
        <div className="space-y-16 lg:space-y-20">
          {t.about.body.map((block, i) => (
            <article key={block.title} className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <span className="font-mono text-[15px] font-medium tabular-nums text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="u-balance mt-4 text-2xl font-semibold text-ink sm:text-[1.75rem]">
                  {block.title}
                </h2>
              </div>
              <div className="space-y-5 lg:col-span-7">
                {block.paragraphs.map((para) => (
                  <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead title={t.about.values.title} />
        <div className="mt-14">
          <NumberedGrid items={t.about.values.items} columns={2} />
        </div>
      </Section>

      <CtaBand locale={locale} />
    </>
  );
}
