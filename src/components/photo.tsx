/* eslint-disable @next/next/no-img-element --
 * The site is a static export with `images: { unoptimized: true }`, so
 * next/image would render this same <img> after shipping its runtime and its
 * wrapper markup — no resizing, no format negotiation, no benefit. One plain
 * element, declared here once, is the honest version.
 */
import { picture, type MediaKey } from "@/lib/media";
import type { Locale } from "@/i18n/config";

/**
 * A photograph from the media manifest.
 *
 * Exists so alt text cannot be forgotten: the text lives beside the file in
 * `lib/media.ts` and is looked up per locale, rather than being retyped (or
 * quietly omitted) at each of the two dozen call sites.
 */
export function Photo({
  image,
  locale,
  className = "",
  /** Above the fold — skips lazy loading and asks for early fetch. */
  priority = false,
  /**
   * True when the picture adds nothing a screen reader needs: the heading over
   * it already says what it is. Renders alt="" so it is skipped rather than
   * announced twice.
   */
  decorative = false,
}: {
  image: MediaKey;
  locale: Locale;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  const { src, alt } = picture(image, locale);
  return (
    <img
      src={src}
      alt={decorative ? "" : alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
