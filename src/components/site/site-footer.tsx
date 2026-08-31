import Link from "next/link";
import { ReispeqLogo } from "../logo";
import { LanguageSwitch } from "../language-switch";
import { ArrowLink, ExternalGlyph } from "./ui";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { href, serviceKeys } from "@/lib/routes";
import { site } from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Rendered at build time, so this is the date of the last deploy rather than
  // of the visit. Close enough for a copyright line, and it keeps the footer a
  // server component.
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
    {
      title: t.footer.productCol,
      links: [{ href: href(locale, "certitrack"), label: t.nav.certitrack }],
    },
  ];

  return (
    <footer className="bg-[#0a0b20] text-white">
      {/* ---- masthead ---- */}
      <div className="u-shell-wide grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <ReispeqLogo tone="light" />
          <p className="u-pretty mt-7 max-w-sm text-[15.5px] leading-relaxed text-white/60">
            {t.footer.tagline}
          </p>
          <div className="mt-8">
            <ArrowLink href={href(locale, "contact")} tone="ink">
              {t.nav.cta}
            </ArrowLink>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-[11.5px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                {col.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14.5px] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === t.footer.productCol ? (
                  <li>
                    <a
                      href={site.products.certiTrack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14.5px] text-azure-300 underline-offset-4 transition-colors hover:text-azure-200 hover:underline"
                    >
                      <bdi dir="ltr">{t.footer.productExternal}</bdi>
                      <ExternalGlyph />
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---- regions + contact ---- */}
      <div className="u-shell-wide grid gap-10 border-b border-white/10 py-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-[11.5px] font-semibold tracking-[0.16em] text-white/40 uppercase">
            {t.footer.regionsTitle}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-white/70">
            {t.ui.regions.groups.flatMap((group) => group.items).map((region) => (
              <li key={region}>{region}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-[11.5px] font-semibold tracking-[0.16em] text-white/40 uppercase">
            {t.footer.contactCol}
          </h2>
          <ul className="mt-4 space-y-2 text-[14.5px] text-white/70">
            <li>
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:text-white hover:underline">
                <bdi dir="ltr">{site.email}</bdi>
              </a>
            </li>
            {site.addresses.map((address) => (
              <li key={address.id}>{address.lines.join(", ")}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- legal ---- */}
      <div className="u-shell-wide flex flex-col gap-6 py-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-[13px] text-white/45">
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p className="u-pretty text-[13px] leading-relaxed text-white/35">{t.footer.legalNote}</p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-white/45 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            LinkedIn
          </a>
          <span aria-hidden className="h-3 w-px bg-white/15" />
          <LanguageSwitch locale={locale} tone="light" />
        </div>
      </div>
    </footer>
  );
}
