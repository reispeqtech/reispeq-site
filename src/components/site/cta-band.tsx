import { Btn } from "./ui";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import { Photo } from "../photo";

import { site } from "@/lib/site";

/**
 * The closing band: text on one half, a photograph bleeding to the viewport
 * edge on the other.
 *
 * The split is done at section level rather than inside the shell, because a
 * photograph that stops at the shell's 48px gutter reads as a mistake. The
 * text half then re-creates the shell alignment on its own: the inner block is
 * capped at half the shell measure and pushed to the column's inner edge, so
 * its leading edge lands exactly where every other section's text starts, at
 * any viewport width.
 *
 * `justify-end` and the logical padding do the mirroring for Arabic without a
 * second layout: in RTL the text column is the right-hand one and the
 * photograph bleeds off the left.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="bg-[#0a0b20] text-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex justify-end">
          <div className="w-full max-w-[calc(var(--shell-wide)/2)] px-5 py-16 md:px-8 lg:ps-12 lg:pe-16 lg:py-24">
            <h2 className="u-balance max-w-[16ch] text-[2.1rem] font-semibold sm:text-[2.75rem]">
              {t.home.cta.title}
            </h2>
            <p className="u-pretty mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/65">
              {t.home.cta.body}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Btn href={href(locale, "contact")} variant="accent">
                {t.home.cta.primary}
              </Btn>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 border border-white/30 px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                {t.home.cta.secondary}
              </a>
            </div>

            <dl className="u-metro mt-12 max-w-lg bg-white/12 sm:grid-cols-2">
              <div className="bg-[#0a0b20] pt-5 pe-6 pb-2">
                <dt className="text-[11.5px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                  {t.ui.contactPrompt.email}
                </dt>
                <dd className="mt-2 text-[15px]">
                  <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                    <bdi dir="ltr">{site.email}</bdi>
                  </a>
                </dd>
              </div>
              <div className="bg-[#0a0b20] px-6 pt-5 pb-2">
                <dt className="text-[11.5px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                  {t.ui.contactPrompt.response}
                </dt>
                <dd className="mt-2 text-[15px] text-white/75">{t.contact.direct.response}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative min-h-[18rem] lg:min-h-0">
          <Photo
            image="crewBrief"
            locale={locale}
            className="absolute inset-0 h-full w-full object-cover opacity-75"
          />
          <span aria-hidden className="absolute inset-0 bg-brand-950/30" />
        </div>
      </div>
    </section>
  );
}
