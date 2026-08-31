import { Band } from "./ui";
import { Tile, TileGrid } from "./tiles";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, serviceKeys, type RouteKey } from "@/lib/routes";
import { serviceArt, serviceIcons } from "@/lib/service-art";

/**
 * Cross-links at the foot of a service page. Shows every service except the
 * one being read — a visitor who has got this far and is not convinced needs
 * the neighbouring service, not a repeat of this one.
 */
export function RelatedServices({ locale, current }: { locale: Locale; current: RouteKey }) {
  const t = getDictionary(locale);
  const others = serviceKeys
    .map((key, i) => ({ key, body: t.servicesIndex.cards[i].body }))
    .filter((s) => s.key !== current);

  return (
    <Band tone="surface">
      <h2 className="u-balance text-[1.8rem] font-semibold text-ink sm:text-[2.2rem]">
        {t.common.relatedServices}
      </h2>
      <TileGrid className="mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((service, i) => (
          <Tile
            key={service.key}
            href={href(locale, service.key)}
            title={t.nav[service.key]}
            body={service.body}
            locale={locale}
            icon={serviceIcons[service.key]}
            variant={i === 0 ? "photo" : "plain"}
            image={i === 0 ? serviceArt[service.key] : undefined}
            minHeight="min-h-[17rem]"
          />
        ))}
      </TileGrid>
    </Band>
  );
}
