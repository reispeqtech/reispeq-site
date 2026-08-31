/**
 * Single source of truth for company facts that appear in metadata,
 * structured data, the footer and the contact page.
 *
 * NOTE FOR REISPEQ: the office locations below are placeholders. Replace them
 * here once and every page, footer and schema.org block updates.
 *
 * No phone number is published on the site by choice — add `phone` here and a
 * row in the contact page details if that changes.
 */
/**
 * Reads a base URL from the environment defensively.
 *
 * CI systems substitute an EMPTY STRING for an undefined variable rather than
 * leaving it unset — GitHub Actions does this with `${{ vars.X }}` — and `??`
 * does not catch `""`. An empty value reaching `new URL()` throws during
 * `generateMetadata`, which surfaces as an opaque digest-masked prerender
 * error on a random page. So: treat blank as absent, tolerate a missing
 * scheme, and drop any trailing slash.
 */
function resolveSiteUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim();
  if (!raw) return fallback;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    const path = url.pathname.replace(/\/+$/, "");
    return `${url.origin}${path}`;
  } catch {
    console.warn(`[site] NEXT_PUBLIC_SITE_URL is not a valid URL (${raw}); falling back to ${fallback}`);
    return fallback;
  }
}

export const site = {
  name: "Reispeq Technologies LLC",
  shortName: "Reispeq",
  domain: "reispeq.com",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://www.reispeq.com"),
  email: "hello@reispeq.com",
  salesEmail: "sales@reispeq.com",
  founded: "2025",
  legalForm: "LLC",
  addresses: [
    {
      id: "om",
      country: "Oman",
      countryCode: "OM",
      city: "Muscat",
      lines: ["Muscat", "Sultanate of Oman"],
    },
    {
      id: "ae",
      country: "United Arab Emirates",
      countryCode: "AE",
      city: "Dubai",
      lines: ["Dubai", "United Arab Emirates"],
    },
  ],
  /**
   * Markets the company sells into — drives `areaServed` in structured data.
   *
   * `countries` are ISO 3166-1 alpha-2 and become schema.org Country entries.
   * `areas` are named regions rather than countries, because the African
   * coverage is stated regionally on the site and structured data should not
   * claim more precision than the copy does. Name specific African countries
   * here once they are confirmed.
   */
  regions: {
    countries: ["OM", "AE", "SA", "QA", "KW", "BH", "IQ"],
    areas: ["North Africa", "West Africa", "East Africa"],
  },
  products: {
    certiTrack: {
      name: "CertiTrack Plus",
      url: "https://certitrackplus.com",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/reispeq",
  },
} as const;

export type SiteConfig = typeof site;
