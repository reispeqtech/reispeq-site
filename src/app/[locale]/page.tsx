import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { ProductShot } from "@/components/site/product-shot";
import { Tile, TileGrid, type TileVariant } from "@/components/site/tiles";
import { ArrowLink, Band, Btn, IconMetro, Statement, Ticks } from "@/components/site/ui";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";
import { Photo } from "@/components/photo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { serviceArt, serviceIcons } from "@/lib/service-art";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    ...buildMetadata({
      version: "main",
      locale,
      route: "home",
      title: t.seo.home.title,
      description: t.seo.home.description,
      keywords: keywordSets.home[locale],
    }),
    title: `${site.name} — ${t.seo.home.title}`,
  };
}

/**
 * How the five service tiles sit in the 3-column grid, in `serviceKeys` order.
 * The first takes a 2×2 block, so the remaining four fill around it and the
 * grid closes without a hole.
 */
const tileLayout = [
  { variant: "photo", minHeight: "min-h-[20rem] lg:min-h-0", className: "lg:col-span-2 lg:row-span-2" },
  { variant: "accent", minHeight: "min-h-[16rem]", className: "" },
  { variant: "plain", minHeight: "min-h-[16rem]", className: "" },
  { variant: "photo", minHeight: "min-h-[19rem]", className: "" },
  { variant: "solid", minHeight: "min-h-[16rem]", className: "lg:col-span-2" },
] as const satisfies readonly { variant: TileVariant; minHeight: string; className: string }[];

const methodIcons = ["document", "gauge", "crate", "cycle"] as const;
const whyIcons = ["wrench", "derrick", "link", "target", "route"] as const;

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const services = serviceKeys.map((key, i) => ({
    key,
    href: href(locale, key),
    label: t.nav[key],
    body: t.servicesIndex.cards[i].body,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema("main", locale, [{ name: t.nav.home, route: "home" }])} />

      <Hero locale={locale} />

      {/* ---------- Positioning ---------- */}
      <Band>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-[2rem] font-semibold text-ink sm:text-[2.5rem]">
              {t.home.intro.title}
            </h2>
            <div className="mt-8">
              <ArrowLink href={href(locale, "about")}>{t.nav.about}</ArrowLink>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-7">
            {t.home.intro.body.map((para) => (
              <p key={para.slice(0, 24)} className="u-pretty text-[17px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>
      </Band>

      {/* ---------- Services ---------- */}
      <Band tone="surface">
        <Statement
          title={t.home.services.title}
          lead={t.home.services.lead}
          tone="surface"
          action={<ArrowLink href={href(locale, "services")}>{t.ui.actions.viewAll}</ArrowLink>}
        />

        {/* Asymmetric on purpose: an even 5-up row would read as a list of
            equals, and the first two — the software practice and the product —
            are what the rest of the page is arguing for. */}
        <TileGrid className="mt-14 lg:grid-cols-3">
          {services.map((service, i) => (
            <Tile
              key={service.key}
              href={service.href}
              title={service.label}
              body={service.body}
              locale={locale}
              icon={serviceIcons[service.key]}
              variant={tileLayout[i].variant}
              image={tileLayout[i].variant === "photo" ? serviceArt[service.key] : undefined}
              minHeight={tileLayout[i].minHeight}
              className={tileLayout[i].className}
            />
          ))}
        </TileGrid>
      </Band>

      {/* ---------- Product ---------- */}
      <Band tone="navy">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance text-[2.1rem] font-semibold sm:text-[2.75rem]">
              {t.home.product.title}
            </h2>
            <p className="u-pretty mt-6 text-[16.5px] leading-relaxed text-white/70">
              {t.home.product.lead}
            </p>
            <div className="mt-9">
              <Ticks items={t.home.product.bullets} tone="navy" />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Btn href={href(locale, "certitrack")} variant="accent">
                {t.home.product.cta}
              </Btn>
              <Btn href={site.products.certiTrack.url} variant="outline" external>
                {t.ui.product.visit}
              </Btn>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ProductShot
              name="dashboard"
              title={t.ui.product.screens.dashboard.title}
              caption={t.ui.product.screens.dashboard.caption}
            />
          </div>
        </div>
      </Band>

      {/* ---------- Method ---------- */}
      <Band>
        <Statement title={t.home.method.title} />
        <div className="mt-14">
          <IconMetro items={t.home.method.steps} icons={methodIcons} columns={4} />
        </div>
      </Band>

      {/* ---------- Why ---------- */}
      <Band tone="surface">
        <Statement title={t.home.why.title} tone="surface" />
        <div className="mt-14">
          <IconMetro items={t.home.why.items} icons={whyIcons} columns={3} tone="surface" />
        </div>
      </Band>

      {/* ---------- Regions ---------- */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Photo
          image="refineryMono"
          locale={locale}
          decorative
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-brand-950/70" />
        <div className="u-shell-wide grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Icon name="globe" className="h-8 w-8 text-azure-300" />
            <h2 className="u-balance mt-6 text-[2rem] font-semibold sm:text-[2.5rem]">
              {t.ui.regions.title}
            </h2>
            <p className="u-pretty mt-6 max-w-md text-[16px] leading-relaxed text-white/65">
              {t.ui.regions.lead}
            </p>
          </div>

          <div className="u-metro self-start bg-white/12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {t.ui.regions.groups.map((group) => (
              <div key={group.label} className="bg-brand-950 p-7">
                <h3 className="text-[11.5px] font-semibold tracking-[0.16em] text-azure-300 uppercase">
                  {group.label}
                </h3>
                <ul className="mt-5 space-y-2.5 text-[15.5px] text-white/85">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
