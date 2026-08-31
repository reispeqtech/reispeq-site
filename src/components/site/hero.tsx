import { Btn } from "./ui";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import { Photo } from "../photo";

/**
 * The homepage hero.
 *
 * The photograph is a plain <img> rather than a CSS background so it can be
 * `fetchPriority="high"` and carry real alt text — it is the largest paint on
 * the page and the thing that decides the LCP score. `sizes` is omitted on
 * purpose: there is one source at one width, and lying to the browser about
 * having others is worse than saying nothing.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0b20] text-white">
      <Photo
        image="rigNight"
        locale={locale}
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"
      />
      <span aria-hidden className="u-scrim-s absolute inset-0 -z-10" />

      <div className="u-shell-wide relative flex min-h-[34rem] flex-col justify-end pt-24 pb-0 sm:min-h-[38rem] lg:min-h-[42rem] lg:pt-32">
        <h1 className="u-balance max-w-[19ch] text-[2.5rem] font-semibold sm:text-[3.4rem] lg:text-[4.2rem]">
          {t.home.hero.title}
        </h1>

        <p className="u-pretty mt-7 max-w-2xl text-[17px] leading-relaxed text-white/72">
          {t.home.hero.lead}
        </p>

        <div className="mt-10 flex flex-wrap gap-3 pb-14 lg:pb-20">
          <Btn href={href(locale, "contact")} variant="accent">
            {t.home.hero.primaryCta}
          </Btn>
          <Btn href={href(locale, "certitrack")} variant="outline">
            {t.home.hero.secondaryCta}
          </Btn>
        </div>
      </div>

      {/* Stat rail. Sits inside the hero band on its own hairline so the
          photograph is never interrupted by a floating card. */}
      <div className="relative border-t border-white/15 bg-[#0a0b20]/72 backdrop-blur-[2px]">
        <dl className="u-shell-wide grid sm:grid-cols-3">
          {t.home.hero.stats.map((stat, i) => (
            <div
              key={stat.value}
              /* Hairlines are borders here rather than grid gaps: the rail is
                 translucent, so a coloured gap would wash the whole cell. */
              className={`border-white/15 py-7 sm:px-7 sm:first:ps-0 sm:last:pe-0 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-s" : ""
              }`}
            >
              <dt className="text-[15.5px] font-semibold text-azure-300">{stat.value}</dt>
              <dd className="u-pretty mt-2 text-[14px] leading-snug text-white/60">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
