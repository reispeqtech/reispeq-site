/* eslint-disable @next/next/no-img-element -- see components/photo.tsx */
import { screen, type ScreenName } from "@/lib/screens";

/**
 * A screenshot of the CertiTrack Plus application.
 *
 * These are captures of the real product, not drawn mock-ups, which is the
 * point: a prospect in this market has seen enough illustrated dashboards.
 * `width`/`height` come from the PNG header at build time so the browser
 * reserves the right box and the page does not jump as the image decodes.
 *
 * Renders nothing when the file is absent — a missing screenshot should cost a
 * section, not break the page.
 */
export function ProductShot({
  name,
  caption,
  title,
  className = "",
  priority = false,
}: {
  name: ScreenName;
  /** Describes what the screen shows; also serves as the alt text. */
  caption: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  const shot = screen(name);
  if (!shot) return null;

  return (
    <figure className={`border border-line bg-white ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-5 py-3.5">
        <span aria-hidden className="flex gap-1">
          <span className="h-2 w-2 bg-alert-500/40" />
          <span className="h-2 w-2 bg-caution-500/40" />
          <span className="h-2 w-2 bg-signal-500/40" />
        </span>
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="ms-auto font-mono text-[11px] text-azure-500">
          <bdi dir="ltr">certitrackplus.com</bdi>
        </p>
      </div>

      {/* The capture is far wider than the column it sits in, so it is scaled
          to width and its own ratio decides the height. */}
      <img
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={caption}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full"
      />

      <figcaption className="border-t border-line-soft bg-surface px-5 py-3.5 text-[12.5px] leading-relaxed text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
