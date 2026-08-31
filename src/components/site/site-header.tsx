import Link from "next/link";
import { ReispeqLogo } from "../logo";
import { LanguageSwitch } from "../language-switch";
import { MetroNav } from "./mobile-nav";
import { Arrow } from "./ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { site } from "@/lib/site";
import { Photo } from "../photo";

/**
 * Two-tier header, in the shape the large engineering firms settled on: a thin
 * utility strip carrying the things a visitor needs at most once (region,
 * address, language), and below it the bar that actually navigates.
 *
 * Only the second tier is sticky. Keeping both would cost 104px of a phone's
 * viewport for the sake of a language switch nobody uses twice.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  // The strip has room for three before it starts wrapping into the email
  // address; the full list lives in the footer and the regions band.
  const utilityRegions = [
    ...t.ui.regions.groups[0].items.slice(0, 2),
    t.ui.regions.groups[1].label,
  ];

  const services = serviceKeys.map((key, i) => ({
    key,
    href: href(locale, key),
    label: t.nav[key],
    body: t.servicesIndex.cards[i].body,
  }));

  const primary = [
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "services"), label: t.nav.services, mega: true },
    { href: href(locale, "certitrack"), label: t.nav.certitrack },
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  const mobileItems = [
    { href: href(locale, "home"), label: t.nav.home },
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "services"), label: t.nav.services },
    ...services.map((s) => ({ href: s.href, label: s.label, indent: true })),
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  return (
    /*
     * The two tiers are siblings rather than parent-and-child: `position:
     * sticky` is confined to its own parent's box, so a bar nested inside a
     * 105px-tall <header> can only travel 33px before scrolling away with it.
     * As siblings of <body>'s flex column, the strip scrolls off and the bar
     * pins for the whole page.
     */
    <>
      {/* ---- utility strip ---- */}
      <div className="hidden bg-brand-950 text-white/60 lg:block">
        <div className="u-shell-wide flex h-8 items-center justify-between gap-6 text-[12px]">
          <p className="flex items-center gap-2.5">
            {utilityRegions.map((region, i) => (
              <span key={region} className="flex items-center gap-2.5">
                {i > 0 ? <span aria-hidden className="h-2.5 w-px bg-white/20" /> : null}
                {region}
              </span>
            ))}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-white"
            >
              <bdi dir="ltr">{site.email}</bdi>
            </a>
            <span aria-hidden className="h-2.5 w-px bg-white/20" />
            <LanguageSwitch locale={locale} tone="light" />
          </div>
        </div>
      </div>

      {/* ---- main bar ---- */}
      <header className="sticky top-0 z-50 border-b border-line bg-white">
        <div className="u-shell-wide flex h-[var(--header-metro)] items-center justify-between gap-6">
          <Link href={href(locale, "home")} aria-label={site.name} className="shrink-0">
            <ReispeqLogo />
          </Link>

          <nav aria-label={t.nav.services} className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch">
              {primary.map((item) => (
                <li key={item.href} className={item.mega ? "group static flex" : "flex"}>
                  <Link
                    href={item.href}
                    className="relative inline-flex items-center gap-1.5 px-4 text-[14.5px] font-medium text-ink-soft transition-colors hover:text-brand-600 after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:bg-brand-500 after:opacity-0 after:transition-opacity hover:after:opacity-100"
                  >
                    {item.label}
                    {item.mega ? (
                      <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-2.5 w-2.5 text-brand-300">
                        <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : null}
                  </Link>

                  {/* Full-bleed mega panel. `static` on the <li> makes the
                      absolute panel resolve against the bar, not the item. */}
                  {item.mega ? (
                    <div className="invisible absolute inset-x-0 top-full z-50 border-b border-line bg-white opacity-0 shadow-[0_24px_48px_-32px_rgba(20,22,46,0.5)] transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="u-shell-wide grid gap-10 py-10 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                          {/* An odd number of services in two columns leaves
                              the grid's own background showing as an empty
                              cell, which reads as a broken tile rather than as
                              whitespace. The last one takes the whole row. */}
                          <ul className="u-metro bg-line sm:grid-cols-2">
                            {services.map((s, i) => (
                              <li
                                key={s.key}
                                className={`bg-white ${
                                  i === services.length - 1 && services.length % 2 === 1
                                    ? "sm:col-span-2"
                                    : ""
                                }`}
                              >
                                <Link href={s.href} className="group/item block p-5 transition-colors hover:bg-surface">
                                  <span className="flex items-center justify-between gap-3">
                                    <span className="text-[15px] font-semibold text-ink transition-colors group-hover/item:text-brand-600">
                                      {s.label}
                                    </span>
                                    <Arrow className="shrink-0 text-brand-300 transition-transform group-hover/item:translate-x-0.5 rtl:group-hover/item:-translate-x-0.5" />
                                  </span>
                                  <span className="u-pretty mt-2 block text-[13.5px] leading-relaxed text-muted">
                                    {s.body}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="hidden lg:col-span-4 lg:block">
                          <Link href={href(locale, "services")} className="group/all block">
                            <span className="relative block aspect-[4/3] overflow-hidden bg-brand-950">
                              <Photo
                                image="crewBrief"
                                locale={locale}
                                className="h-full w-full object-cover opacity-65 transition-transform duration-500 group-hover/all:scale-[1.04]"
                              />
                              <span aria-hidden className="u-scrim-b absolute inset-0" />
                              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 text-white">
                                <span className="text-[15px] font-semibold">{t.ui.actions.viewAll}</span>
                                <Arrow className="transition-transform group-hover/all:translate-x-0.5 rtl:group-hover/all:-translate-x-0.5" />
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={href(locale, "contact")}
              className="hidden bg-brand-500 px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-600 sm:inline-flex"
            >
              {t.nav.cta}
            </Link>
            <MetroNav
              items={mobileItems}
              ctaHref={href(locale, "contact")}
              ctaLabel={t.nav.cta}
              openLabel={t.nav.openMenu}
              closeLabel={t.nav.closeMenu}
              locale={locale}
              email={site.email}
            />
          </div>
        </div>
      </header>
    </>
  );
}
