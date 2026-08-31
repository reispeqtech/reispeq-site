"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, isLocale, type Locale } from "@/i18n/config";

/**
 * Swaps only the locale segment of the current path so the visitor stays on the
 * same page. Rendered as real anchors — crawlable, and works without JS.
 *
 * The locale is found by scanning rather than by index, because a path may or
 * may not carry a design-iteration prefix (/v2/en/… vs /en/…). Promoting an
 * iteration to the root therefore does not break the switch.
 */
export function LanguageSwitch({
  locale,
  tone = "dark",
  className = "",
}: {
  locale: Locale;
  tone?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;

  function swap(target: Locale) {
    const segments = pathname.split("/");
    const at = segments.findIndex((s) => isLocale(s));
    if (at === -1) return `/${target}`;
    segments[at] = target;
    return segments.join("/") || `/${target}`;
  }

  const idle = tone === "light" ? "text-white/55 hover:text-white" : "text-muted hover:text-brand-600";
  const active = tone === "light" ? "text-white" : "text-brand-600";
  const divider = tone === "light" ? "bg-white/20" : "bg-line";

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label={locale === "ar" ? "اللغة" : "Language"}
    >
      {locales.map((code, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden className={`h-3 w-px ${divider}`} /> : null}
          <Link
            href={swap(code)}
            hrefLang={localeMeta[code].htmlLang}
            lang={localeMeta[code].htmlLang}
            aria-current={code === locale ? "true" : undefined}
            className={`text-[13px] font-medium transition-colors ${code === locale ? active : idle}`}
          >
            {localeMeta[code].label}
          </Link>
        </span>
      ))}
    </div>
  );
}
