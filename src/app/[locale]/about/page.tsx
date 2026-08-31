import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Band, IconMetro, Statement } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { Photo } from "@/components/photo";

type Props = { params: Promise<{ locale: string }> };

const valueIcons = ["document", "workflow", "gauge", "wrench"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
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
        data={breadcrumbSchema("main", locale, [
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
        image="offshoreSunset"
      />

      {/* Each block is a heading and its prose, split across the measure so a
          long section never runs as one uninterrupted column. */}
      {t.about.body.map((block, i) => (
        <Band key={block.title} tone={i % 2 === 1 ? "surface" : "paper"}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="u-balance mt-6 text-[1.9rem] font-semibold text-ink sm:text-[2.4rem]">
                {block.title}
              </h2>
            </div>
            <div className="space-y-6 lg:col-span-7">
              {block.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="u-pretty text-[17px] leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Band>
      ))}

      {/* One full-bleed plate to break up three blocks of prose. */}
      <figure className="relative">
        <div className="relative aspect-[21/9] max-h-[26rem] w-full overflow-hidden bg-brand-950">
          <Photo
            image="platformDawn"
            locale={locale}
            className="h-full w-full object-cover"
          />
        </div>
      </figure>

      <Band>
        <Statement title={t.about.values.title} />
        <div className="mt-14">
          <IconMetro items={t.about.values.items} icons={valueIcons} columns={2} />
        </div>
      </Band>

      <CtaBand locale={locale} />
    </>
  );
}
