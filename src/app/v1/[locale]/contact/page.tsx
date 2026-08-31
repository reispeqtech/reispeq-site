import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/json-ld";
import { Section } from "@/components/ui";
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
          breadcrumbSchema(locale, [
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
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold text-ink">{t.contact.form.title}</h2>
            <div className="mt-8">
              <ContactForm t={t.contact.form} locale={locale} />
            </div>
          </div>

          <aside className="lg:col-span-5 lg:ps-8">
            <div className="rounded-md border border-line bg-surface p-8">
              <h2 className="text-lg font-semibold text-ink">{t.contact.direct.title}</h2>
              <dl className="mt-6 space-y-5">
                {details.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[13px] font-semibold text-muted">{item.label}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium text-ink">
                      {item.href ? (
                        <a href={item.href} className="underline-offset-4 hover:text-brand-600 hover:underline">
                          {item.isolate ? <bdi dir="ltr">{item.value}</bdi> : item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-[13px] font-semibold text-muted">{t.contact.direct.officesLabel}</dt>
                  <dd className="mt-1.5 space-y-1 text-[15px] text-ink">
                    {site.addresses.map((address) => (
                      <p key={address.id}>{address.lines.join(", ")}</p>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold text-ink">{t.contact.faq.title}</h2>
              <dl className="mt-6 divide-y divide-line border-t border-line">
                {t.contact.faq.items.map((item) => (
                  <div key={item.q} className="py-5">
                    <dt className="text-[15px] font-semibold text-ink">{item.q}</dt>
                    <dd className="u-pretty mt-2 text-[14.5px] leading-relaxed text-muted">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
