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
import { Photo } from "@/components/photo";

type Props = { params: Promise<{ locale: string }> };

const scopeIcons = ["camera", "layers", "inspect", "document"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
    locale,
    route: "investigations",
    title: t.seo.investigations.title,
    description: t.seo.investigations.description,
    keywords: keywordSets.investigations[locale],
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const page = t.investigations;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("main", locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.services, route: "services" },
            { name: t.nav.investigations, route: "investigations" },
          ]),
          serviceSchema({
            version: "main",
            locale,
            route: "investigations",
            name: page.hero.title,
            description: t.seo.investigations.description,
            serviceType: "Equipment failure investigation",
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
        title={page.hero.title}
        lead={page.hero.lead}
        image="welding"
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
          <IconMetro items={page.services.items} icons={scopeIcons} columns={4} />
        </div>
      </Band>

      {/* Where the report is used, over the failed-component photograph — the
          one place on the site where the subject is the damage itself. */}
      <section className="relative isolate overflow-hidden bg-[#0a0b20] text-white">
        <Photo
          image="component"
          locale={locale}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
        />
        <span aria-hidden className="u-scrim-s absolute inset-0 -z-10" />
        <div className="u-shell-wide grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold sm:text-[2.4rem]">
              {page.uses.title}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <Ticks items={page.uses.items} tone="ink" />
            <p className="u-pretty mt-10 border-s-2 border-azure-400/60 ps-5 text-[15px] leading-relaxed text-white/60">
              {page.note}
            </p>
          </div>
        </div>
      </section>

      <RelatedServices locale={locale} current="investigations" />
      <CtaBand locale={locale} />
    </>
  );
}
