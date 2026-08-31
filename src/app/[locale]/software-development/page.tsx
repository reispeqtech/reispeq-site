import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { RelatedServices } from "@/components/site/related";
import { Band, Btn, IconMetro, Statement, Ticks } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/routes";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { Photo } from "@/components/photo";

type Props = { params: Promise<{ locale: string }> };

const processIcons = ["document", "layers", "code", "cycle"] as const;
const capabilityIcons = ["code", "workflow", "certificate", "chart", "checklist", "derrick"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
    locale,
    route: "software",
    title: t.seo.software.title,
    description: t.seo.software.description,
    keywords: keywordSets.software[locale],
  });
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);
  const page = t.software;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("main", locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.services, route: "services" },
            { name: t.nav.software, route: "software" },
          ]),
          serviceSchema({
            version: "main",
            locale,
            route: "software",
            name: page.hero.title,
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
        title={page.hero.title}
        lead={page.hero.lead}
        image="codeScreen"
      />

      <Band>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold text-ink sm:text-[2.4rem]">
              {page.capabilities.title}
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
          <IconMetro items={page.capabilities.items} icons={capabilityIcons} columns={3} />
        </div>
      </Band>

      <Band tone="navy">
        <Statement title={page.process.title} tone="navy" />
        <div className="mt-14">
          <IconMetro items={page.process.steps} icons={processIcons} columns={4} tone="navy" />
        </div>
      </Band>

      <Band tone="surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="u-balance mt-6 text-[1.9rem] font-semibold text-ink sm:text-[2.4rem]">
              {page.outcomes.title}
            </h2>
            <p className="u-pretty mt-7 text-[15.5px] leading-relaxed text-muted">{t.common.scopeNote}</p>
          </div>
          <div className="lg:col-span-7">
            <Ticks items={page.outcomes.items} tone="surface" />
          </div>
        </div>
      </Band>

      {/* The proof band. A worked example carries more than another claim, so
          it gets a photograph and the page's only outbound CTA. */}
      <section className="relative isolate overflow-hidden bg-[#0a0b20] text-white">
        <Photo
          image="analytics"
          locale={locale}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        />
        <span aria-hidden className="u-scrim-s absolute inset-0 -z-10" />
        <div className="u-shell-wide py-16 lg:py-24">
          <h2 className="u-balance mt-6 max-w-[18ch] text-[1.9rem] font-semibold sm:text-[2.4rem]">
            {page.proof.title}
          </h2>
          <p className="u-pretty mt-6 max-w-2xl text-[16.5px] leading-relaxed text-white/70">
            {page.proof.body}
          </p>
          <div className="mt-9">
            <Btn href={href(locale, "certitrack")} variant="accent">
              {page.proof.cta}
            </Btn>
          </div>
        </div>
      </section>

      <RelatedServices locale={locale} current="software" />
      <CtaBand locale={locale} />
    </>
  );
}
