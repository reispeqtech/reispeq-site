import type { MetadataRoute } from "next";

// Required by `output: "export"` — these routes are generated at build time.
export const dynamic = "force-static";
import { routes, absoluteFor } from "@/lib/routes";
import { locales, localeMeta } from "@/i18n/config";
import { liveVersion } from "@/lib/versions";

/**
 * Only the live iteration is listed. The others are noindex previews — putting
 * them in the sitemap would ask a crawler to index pages that then tell it not
 * to, which is a wasted crawl budget at best and a duplicate-content signal at
 * worst.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: absoluteFor(liveVersion, locale, route.key),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((alt) => [localeMeta[alt].htmlLang, absoluteFor(liveVersion, alt, route.key)]),
          ),
          "x-default": absoluteFor(liveVersion, "en", route.key),
        },
      },
    })),
  );
}
