import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { serviceArt, serviceIcons } from "@/lib/service-art";
import { Tile, TileGrid } from "@/components/site/tiles";
import { Band } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
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
    version: "main",
    locale,
    route: "services",
    title: t.seo.services.title,
    description: t.seo.services.description,
    keywords: keywordSets.services[locale],
  });
}

/**
 * Which tiles carry a photograph, and how they fill the 3-column grid.
 * 2 + 1 on the first row, then three singles — the counts have to add up to
 * whole rows or the grid leaves a hole where its own background shows through.
 */
const layout = [
  { photo: true, className: "lg:col-span-2", minHeight: "min-h-[22rem]" },
  { photo: false, className: "", minHeight: "min-h-[22rem]" },
  { photo: false, className: "", minHeight: "min-h-[20rem]" },
  { photo: true, className: "", minHeight: "min-h-[20rem]" },
  { photo: true, className: "", minHeight: "min-h-[20rem]" },
] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema("main", locale, [
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
        image="rigWork"
      />

      <Band>
        <TileGrid className="lg:grid-cols-3">
          {serviceKeys.map((key, i) => (
            <Tile
              key={key}
              href={href(locale, key)}
              title={t.servicesIndex.cards[i].title}
              body={t.servicesIndex.cards[i].body}
              locale={locale}
              icon={serviceIcons[key]}
              variant={layout[i].photo ? "photo" : key === "certitrack" ? "accent" : "plain"}
              image={layout[i].photo ? serviceArt[key] : undefined}
              minHeight={layout[i].minHeight}
              className={layout[i].className}
            />
          ))}
        </TileGrid>
      </Band>

      <Band tone="navy">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold sm:text-[2.4rem]">
              {t.servicesIndex.combined.title}
            </h2>
          </div>
          <p className="u-pretty text-[17px] leading-relaxed text-white/70 lg:col-span-7">
            {t.servicesIndex.combined.body}
          </p>
        </div>
      </Band>

      <CtaBand locale={locale} />
    </>
  );
}
