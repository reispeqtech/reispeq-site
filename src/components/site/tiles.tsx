import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./ui";
import { Icon, type IconName } from "../icons";
import { Photo } from "../photo";
import { type MediaKey } from "@/lib/media";
import type { Locale } from "@/i18n/config";

/**
 * The metro tile.
 *
 * One component with three surfaces rather than three components, because the
 * hover behaviour, the focus ring and the arrow alignment have to stay
 * identical across a grid that mixes them — the grid only reads as one object
 * if a photograph tile and a flat tile respond the same way.
 *
 * The whole tile is the link. That means the title cannot also be a link (two
 * targets for one destination is a screen-reader annoyance), so the heading
 * carries the text and the anchor is stretched over the tile with an inset
 * pseudo-element.
 */
export type TileVariant = "photo" | "solid" | "accent" | "plain";

export function Tile({
  href,
  external,
  icon,
  title,
  body,
  image,
  locale,
  variant = "plain",
  className = "",
  /** Taller tiles carry a photograph better; the grid decides, not the tile. */
  minHeight = "min-h-[16rem]",
  footer,
}: {
  href: string;
  external?: boolean;
  /** Marks the tile in place of a serial number. */
  icon?: IconName;
  title: string;
  body?: string;
  image?: MediaKey;
  locale: Locale;
  variant?: TileVariant;
  className?: string;
  minHeight?: string;
  footer?: ReactNode;
}) {
  const dark = variant !== "plain";

  const surface =
    variant === "solid"
      ? "bg-brand-500 text-white"
      : variant === "accent"
        ? "bg-azure-500 text-white"
        : variant === "photo"
          ? "bg-brand-950 text-white"
          : "bg-paper text-ink";

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <article
      className={`group relative isolate flex flex-col justify-end overflow-hidden ${surface} ${minHeight} ${className}`}
    >
      {variant === "photo" && image ? (
        <>
          <Photo
            image={image}
            locale={locale}
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70 transition-transform duration-[600ms] ease-out group-hover:scale-[1.045]"
          />
          <span aria-hidden className="u-scrim-b absolute inset-0 -z-10" />
        </>
      ) : null}

      <div className="p-7 lg:p-8">
        {icon ? (
          <Icon
            name={icon}
            className={`h-7 w-7 ${variant === "plain" ? "text-brand-500" : "text-white/85"}`}
          />
        ) : null}

        <h3
          className={`u-balance mt-5 text-[1.3rem] font-semibold sm:text-[1.45rem] ${
            variant === "plain" ? "text-ink group-hover:text-brand-600" : "text-white"
          } transition-colors`}
        >
          <Link href={href} className="after:absolute after:inset-0 focus:outline-none" {...linkProps}>
            {title}
          </Link>
        </h3>

        {body ? (
          <p
            className={`u-pretty mt-3.5 text-[14.5px] leading-relaxed ${
              dark ? "text-white/70" : "text-muted"
            }`}
          >
            {body}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4">
          {footer ?? <span />}
          <span
            aria-hidden
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center transition-colors ${
              variant === "plain"
                ? "border border-line text-brand-500 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"
                : "border border-white/30 text-white group-hover:border-white group-hover:bg-white group-hover:text-brand-700"
            }`}
          >
            <Arrow />
          </span>
        </div>
      </div>

      {/* Focus is invisible otherwise: the anchor itself is a zero-size box
          behind the stretched pseudo-element. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-inset ring-azure-400 group-focus-within:ring-2"
      />
    </article>
  );
}

/**
 * The grid the tiles sit in. Hairlines are the 1px gaps showing the background
 * through — see `u-metro` in globals.css.
 */
export function TileGrid({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={`u-metro ${tone === "dark" ? "bg-white/12" : "bg-line"} ${className}`}>{children}</div>
  );
}
