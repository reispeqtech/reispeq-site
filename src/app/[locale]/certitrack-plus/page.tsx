import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductShot } from "@/components/site/product-shot";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { RelatedServices } from "@/components/site/related";
import { ArrowLink, Band, Btn, IconMetro, Statement, Ticks } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema, softwareSchema } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/routes";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const featureIcons = ["certificate", "bell", "history", "checklist", "chart", "shield"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
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
  const page = t.certitrack;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("main", locale, [
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
        title={page.hero.title}
        lead={page.hero.lead}
        image="tabletReview"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Btn href={href(locale, "contact")} variant="accent">
            {page.hero.primaryCta}
          </Btn>
          {/* The application itself lives on its own domain. This is the only
              CTA on the site that deliberately leaves it. */}
          <Btn href={site.products.certiTrack.url} variant="outline" external>
            {page.hero.secondaryCta}
          </Btn>
        </div>
      </PageHero>

      <Band>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold text-ink sm:text-[2.4rem]">
              {page.problem.title}
            </h2>
            <div className="mt-7 space-y-5">
              {page.problem.body.map((para) => (
                <p key={para.slice(0, 24)} className="u-pretty text-[16.5px] leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:ps-8">
            <ProductShot
              name="dashboard"
              title={t.ui.product.screens.dashboard.title}
              caption={t.ui.product.screens.dashboard.caption}
              priority
            />
          </div>
        </div>
      </Band>

      <Band tone="surface">
        <Statement title={page.features.title} tone="surface" />
        <div className="mt-14">
          <IconMetro items={page.features.items} icons={featureIcons} columns={3} tone="surface" />
        </div>
      </Band>

      <Band>
        <ProductShot
          name="expiry"
          title={t.ui.product.screens.expiry.title}
          caption={t.ui.product.screens.expiry.caption}
        />
        <div className="mt-10">
          <ProductShot
            name="work-units"
            title={t.ui.product.screens.workUnits.title}
            caption={t.ui.product.screens.workUnits.caption}
          />
        </div>
      </Band>

      <Band tone="navy">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold sm:text-[2.3rem]">
              {page.audience.title}
            </h2>
            <div className="mt-9">
              <Ticks items={page.audience.items} tone="navy" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full border border-white/15 bg-white/[0.04] p-8 lg:p-10">
              <h3 className="text-[1.35rem] font-semibold">{page.outcome.title}</h3>
              <p className="u-pretty mt-5 text-[16px] leading-relaxed text-white/70">{page.outcome.body}</p>

              <div className="mt-9 border-t border-white/15 pt-7">
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <ArrowLink href={site.products.certiTrack.url} tone="navy" external>
                    {t.ui.product.visit}
                  </ArrowLink>
                  <ArrowLink href={href(locale, "software")} tone="navy">
                    {t.nav.software}
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Band>

      <RelatedServices locale={locale} current="certitrack" />
      <CtaBand locale={locale} />
    </>
  );
}
