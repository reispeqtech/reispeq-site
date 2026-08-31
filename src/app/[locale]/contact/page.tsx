import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/site/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Band } from "@/components/site/ui";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildMetadata, keywordSets } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return buildMetadata({
    version: "main",
    locale,
    route: "contact",
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    keywords: keywordSets.contact[locale],
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getDictionary(locale);

  const details = [
    { label: t.contact.direct.emailLabel, value: site.email, href: `mailto:${site.email}`, isolate: true },
    { label: t.contact.direct.hoursLabel, value: t.contact.direct.hours },
    { label: t.contact.direct.responseLabel, value: t.contact.direct.response },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema("main", locale, [
            { name: t.nav.home, route: "home" },
            { name: t.nav.contact, route: "contact" },
          ]),
          faqSchema(t.contact.faq.items),
        ]}
      />

      <PageHero
        locale={locale}
        trail={[
          { label: t.nav.home, route: "home" },
          { label: t.nav.contact, route: "contact" },
        ]}
        title={t.contact.hero.title}
        lead={t.contact.hero.lead}
        image="hardHat"
      />

      <Band>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mt-10">
              <ContactForm t={t.contact.form} locale={locale} />
            </div>
          </div>

          <aside className="lg:col-span-5 lg:ps-8">
            <div className="bg-brand-900 p-8 text-white lg:p-9">
              <h2 className="text-[1.2rem] font-semibold">{t.contact.direct.title}</h2>
              <dl className="mt-8 space-y-6">
                {details.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11.5px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-[15.5px] font-medium">
                      {item.href ? (
                        <a href={item.href} className="underline-offset-4 hover:underline">
                          {item.isolate ? <bdi dir="ltr">{item.value}</bdi> : item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-[11.5px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                    {t.contact.direct.officesLabel}
                  </dt>
                  <dd className="mt-2 space-y-1 text-[15.5px] text-white/85">
                    {site.addresses.map((address) => (
                      <p key={address.id}>{address.lines.join(", ")}</p>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-12">
              <h2 className="text-[11.5px] font-semibold tracking-[0.16em] text-brand-500 uppercase">
                {t.contact.faq.title}
              </h2>
              <dl className="mt-6 divide-y divide-line border-t border-line">
                {t.contact.faq.items.map((item) => (
                  <div key={item.q} className="py-6">
                    <dt className="text-[15.5px] font-semibold text-ink">{item.q}</dt>
                    <dd className="u-pretty mt-2.5 text-[14.5px] leading-relaxed text-muted">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Band>
    </>
  );
}
