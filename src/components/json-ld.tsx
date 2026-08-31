import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";
import type { RouteKey } from "@/lib/routes";
import type { Version } from "@/lib/versions";

/**
 * Emits JSON-LD. Kept as a component so each page declares only the schema it
 * genuinely represents, rather than one global blob.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Schema is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * `areaServed` for the whole site: the named countries as schema.org Country
 * entries, plus the African regions as plain Places. Regions rather than
 * countries there because that is the level the site itself claims.
 */
function areaServed() {
  return [
    ...site.regions.countries.map((code) => ({ "@type": "Country", identifier: code })),
    ...site.regions.areas.map((name) => ({ "@type": "Place", name })),
  ];
}

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/logo-reispeq.svg`,
    image: `${site.url}/opengraph-image`,
    email: site.email,
    foundingDate: site.founded,
    knowsLanguage: ["en", "ar"],
    address: site.addresses.map((a) => ({
      "@type": "PostalAddress",
      addressLocality: a.city,
      addressCountry: a.countryCode,
    })),
    areaServed: areaServed(),
    sameAs: [site.social.linkedin, site.products.certiTrack.url],
    inLanguage: locale,
    knowsAbout: [
      "API Spec Q1",
      "API Spec Q2",
      "Equipment certification management",
      "Oilfield equipment inspection",
      "Rig and workover unit inspection",
      "Damage beyond repair investigation",
      "Custom software development",
    ],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function serviceSchema({
  version,
  locale,
  route,
  name,
  description,
  serviceType,
}: {
  version: Version;
  locale: Locale;
  route: RouteKey;
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(version, locale, route),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: areaServed(),
    availableLanguage: ["en", "ar"],
  };
}

export function softwareSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.products.certiTrack.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: site.products.certiTrack.url,
    description,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
    offers: { "@type": "Offer", availability: "https://schema.org/InStock", priceCurrency: "USD" },
  };
}

export function breadcrumbSchema(
  version: Version,
  locale: Locale,
  trail: { name: string; route: RouteKey }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(version, locale, item.route),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
