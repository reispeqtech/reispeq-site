import Link from "next/link";
import { ReispeqLogo } from "./logo";
import { LanguageSwitch } from "./language-switch";
import { MobileNav } from "./mobile-nav";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { site } from "@/lib/site";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const serviceItems = serviceKeys.map((key) => ({
    href: href(locale, key),
    label: t.nav[key],
  }));

  const primary = [
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "services"), label: t.nav.services },
    { href: href(locale, "certitrack"), label: t.nav.certitrack },
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  const mobileItems = [
    { href: href(locale, "home"), label: t.nav.home },
    { href: href(locale, "about"), label: t.nav.about },
    { href: href(locale, "services"), label: t.nav.services },
    ...serviceItems,
    { href: href(locale, "contact"), label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/92 backdrop-blur-md">
      {/* main bar */}
      <div className="u-shell flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={href(locale, "home")} aria-label={site.name} className="shrink-0">
          <ReispeqLogo />
        </Link>

        <nav aria-label={t.nav.services} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primary.map((item) => (
              <li
                key={item.href}
                className={item.label === t.nav.services ? "group relative" : undefined}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2 text-[14.5px] font-medium text-ink-soft transition-colors hover:text-brand-600"
                >
                  {item.label}
                  {item.label === t.nav.services ? (
                    <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-2.5 w-2.5 text-brand-300">
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </Link>

                {item.label === t.nav.services ? (
                  <div className="invisible absolute start-0 top-full z-50 w-[22rem] pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="rounded-sm border border-line bg-white p-2 shadow-[0_18px_40px_-24px_rgba(20,22,46,0.45)]">
                      {serviceItems.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="block rounded-xs px-3 py-2.5 text-[14.5px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-brand-600"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitch locale={locale} />
          <Link
            href={href(locale, "contact")}
            className="hidden rounded-sm bg-brand-500 px-4.5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600 sm:inline-flex"
          >
            {t.nav.cta}
          </Link>
          <MobileNav
            items={mobileItems}
            ctaHref={href(locale, "contact")}
            ctaLabel={t.nav.cta}
            openLabel={t.nav.openMenu}
            closeLabel={t.nav.closeMenu}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}
