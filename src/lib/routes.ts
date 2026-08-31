import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { versionPrefix, type Version } from "./versions";
import { site } from "./site";

/** Every indexable page on the site. Drives the nav, the footer and the sitemap. */
export const routes = [
  { key: "home", path: "", priority: 1.0, changeFrequency: "monthly" },
  { key: "about", path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { key: "services", path: "/services", priority: 0.85, changeFrequency: "monthly" },
  { key: "software", path: "/software-development", priority: 0.9, changeFrequency: "monthly" },
  { key: "certitrack", path: "/certitrack-plus", priority: 0.9, changeFrequency: "monthly" },
  { key: "auditing", path: "/auditing", priority: 0.9, changeFrequency: "monthly" },
  { key: "inspection", path: "/inspection", priority: 0.9, changeFrequency: "monthly" },
  { key: "investigations", path: "/investigations", priority: 0.8, changeFrequency: "monthly" },
  { key: "contact", path: "/contact", priority: 0.7, changeFrequency: "yearly" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];

const byKey = new Map(routes.map((r) => [r.key, r]));

export const pathFor = (key: RouteKey) => byKey.get(key)!.path;

/** Root-relative URL for a page. */
export function href(locale: Locale, key: RouteKey): string {
  return hrefFor("main", locale, key);
}

/**
 * The same, for a specific version. Only the archived v1 build needs this —
 * its components import a pre-bound `href` from `@/lib/links/v1`, which is what
 * stops an archived page from linking into the live site.
 */
export function hrefFor(version: Version, locale: Locale, key: RouteKey): string {
  return `${versionPrefix[version]}${localePath(locale, pathFor(key))}`;
}

/** Absolute URL, used for canonical, hreflang, sitemap and JSON-LD. */
export function absoluteFor(version: Version, locale: Locale, key: RouteKey): string {
  // `trailingSlash: true` in next.config means the exported page is served at
  // /en/auditing/ — canonical, hreflang and sitemap must agree with that.
  return `${site.url}${hrefFor(version, locale, key)}/`;
}

/** Service pages, in the order they are presented across the site. */
export const serviceKeys = [
  "software",
  "certitrack",
  "auditing",
  "inspection",
  "investigations",
] as const satisfies readonly RouteKey[];
