import Link from "next/link";
import { ReispeqLogo } from "./logo";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t.footer.company,
      links: [
        { href: href(locale, "about"), label: t.nav.about },
        { href: href(locale, "services"), label: t.nav.services },
        { href: href(locale, "contact"), label: t.nav.contact },
      ],
    },
    {
      title: t.footer.servicesCol,
      links: serviceKeys
        .filter((k) => k !== "certitrack")
        .map((k) => ({ href: href(locale, k), label: t.nav[k] })),
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-brand-950 text-white">
      <div className="u-shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ReispeqLogo tone="light" />
            <p className="u-pretty mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>
            <p className="mt-8 text-[13px] font-semibold text-white">{t.footer.regionsTitle}</p>
            <ul className="mt-3 flex max-w-sm flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-white/60">
              {t.regions.items.map((region) => (
                <li key={region}>{region}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[13px] font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14.5px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="text-[13px] font-semibold text-white">{t.footer.productCol}</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href={href(locale, "certitrack")}
                    className="text-[14.5px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {t.nav.certitrack}
                  </Link>
                </li>
                <li>
                  <a
                    href={site.products.certiTrack.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14.5px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    <bdi dir="ltr">{t.footer.productExternal}</bdi>
                    <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-2.5 w-2.5">
                      <path d="M4 2h6v6M10 2 2.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-[13px] font-semibold text-white">{t.footer.contactCol}</p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[14.5px] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    <bdi dir="ltr">{site.email}</bdi>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p className="u-pretty max-w-xl sm:text-end">{t.footer.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
