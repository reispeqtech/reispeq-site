import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons";

/**
 * v2 "Metro" primitives.
 *
 * Two rules run through all of it. Nothing is rounded — every edge is a
 * rectangle, because the whole layout is a grid of flat blocks and a radius
 * anywhere makes the seams between them visible. And every surface declares
 * its own tone rather than inheriting one, so a block can be lifted into a
 * different section without silently changing colour.
 */

export type Tone = "paper" | "surface" | "navy" | "ink";

const bg: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  navy: "bg-brand-900 text-white",
  ink: "bg-[#0a0b20] text-white",
};

const isDark = (tone: Tone) => tone === "navy" || tone === "ink";

/* ------------------------------------------------------------------ */

export function Band({
  children,
  tone = "paper",
  className = "",
  id,
  wide = true,
  flush = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  /** Use the wider metro measure. Off for long-form prose. */
  wide?: boolean;
  /** Skip the vertical rhythm — for bands that manage their own. */
  flush?: boolean;
}) {
  return (
    <section id={id} className={`${bg[tone]} ${flush ? "" : "py-16 sm:py-20 lg:py-28"} ${className}`}>
      <div className={wide ? "u-shell-wide" : "u-shell"}>{children}</div>
    </section>
  );
}

/**
 * Section head: the statement, and an optional qualifier off to the side.
 *
 * No kicker label above it. A section that needs "What we do" printed over the
 * heading has a heading that is not doing its job, and four of them down one
 * page reads as filler.
 */
export function Statement({
  title,
  lead,
  tone = "paper",
  as: As = "h2",
  action,
  className = "",
}: {
  title: string;
  lead?: string;
  tone?: Tone;
  as?: "h1" | "h2" | "h3";
  action?: ReactNode;
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <div className={className}>
      <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
        <As
          className={`u-balance text-[2rem] font-semibold sm:text-[2.5rem] lg:text-[2.9rem] ${
            dark ? "text-white" : "text-ink"
          } ${lead ? "lg:col-span-7" : "lg:col-span-9"}`}
        >
          {title}
        </As>
        {lead ? (
          <div className="lg:col-span-5 lg:pt-2">
            <p className={`u-pretty text-[16.5px] leading-relaxed ${dark ? "text-white/65" : "text-ink-soft"}`}>
              {lead}
            </p>
            {action ? <div className="mt-6">{action}</div> : null}
          </div>
        ) : null}
      </div>
      {!lead && action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={`u-dir-flip h-4 w-4 ${className}`}>
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={`h-3 w-3 ${className}`}>
      <path d="M4 2h6v6M10 2 2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonVariant = "solid" | "outline" | "light" | "accent";

const buttonStyles: Record<ButtonVariant, string> = {
  solid: "bg-brand-500 text-white hover:bg-brand-600",
  accent: "bg-azure-400 text-white hover:bg-azure-500",
  outline: "border border-white/30 text-white hover:border-white hover:bg-white/5",
  light: "border border-line bg-white text-ink hover:border-brand-400 hover:text-brand-600",
};

export function Btn({
  href,
  children,
  variant = "solid",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      {external ? (
        <ExternalGlyph />
      ) : (
        <Arrow className="transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      )}
    </>
  );
  const cls = `group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14px] font-semibold transition-colors duration-150 ${buttonStyles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  tone = "paper",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  external?: boolean;
  className?: string;
}) {
  const dark = isDark(tone);
  const cls = `group inline-flex items-center gap-2 text-[14.5px] font-semibold transition-colors ${
    dark ? "text-white hover:text-azure-300" : "text-brand-600 hover:text-brand-700"
  } ${className}`;
  const inner = (
    <>
      <span className="underline-offset-[6px] group-hover:underline">{children}</span>
      {external ? (
        <ExternalGlyph />
      ) : (
        <Arrow className="transition-transform duration-150 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */

/** Ticked list. On dark tones the tick carries the accent, not the text. */
export function Ticks({ items, tone = "paper" }: { items: readonly string[]; tone?: Tone }) {
  const dark = isDark(tone);
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3.5">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className={`mt-[3px] h-4 w-4 shrink-0 ${dark ? "text-azure-300" : "text-signal-500"}`}
          >
            <path d="m3 8.4 3.2 3.1L13 4.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`u-pretty text-[15.5px] leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Numbered blocks laid out as a metro grid: 1px gaps over a coloured
 * background, so the rules are the gaps rather than borders on each cell.
 */
/*
 * Static span classes. Tailwind scans source text, so these have to be written
 * out rather than assembled from a template.
 */
const SM_SPAN = "sm:col-span-2";
const LG_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

/**
 * What the last item must span so the final row has no gap in it.
 *
 * A short last row leaves the grid's own background showing as an empty cell,
 * which reads as a broken tile rather than as whitespace. The count has to be
 * worked out **per breakpoint**: every variant of this grid is two columns from
 * `sm` up and only widens at `lg`, so five items in a three-column grid are
 * short by one cell at tablet width and by one at desktop — different amounts,
 * needing different spans.
 *
 * The `lg:col-span-1` case matters too: when the desktop row happens to be
 * exact, the `sm:col-span-2` set for tablet would otherwise carry up into it
 * and stretch a cell that did not need stretching.
 */
function fillLastRow(count: number, columns: 2 | 3 | 4): string {
  const classes: string[] = [];

  const smRemainder = count % 2;
  if (smRemainder !== 0) classes.push(SM_SPAN);

  if (columns > 2) {
    const lgRemainder = count % columns;
    if (lgRemainder !== 0) classes.push(LG_SPAN[columns - lgRemainder + 1]);
    else if (smRemainder !== 0) classes.push(LG_SPAN[1]);
  }

  return classes.join(" ");
}

export function IconMetro({
  items,
  icons,
  columns = 2,
  tone = "paper",
}: {
  items: readonly { title: string; body: string }[];
  /** One per item, in the same order. */
  icons: readonly IconName[];
  columns?: 2 | 3 | 4;
  tone?: Tone;
}) {
  const dark = isDark(tone);
  const cols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  const stretch = fillLastRow(items.length, columns);

  return (
    <ul className={`u-metro ${cols} ${dark ? "bg-white/12" : "bg-line"}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`${dark ? "bg-brand-900" : "bg-paper"} p-7 lg:p-8 ${
            i === items.length - 1 ? stretch : ""
          }`.trimEnd()}
        >
          <Icon
            name={icons[i] ?? "checklist"}
            className={`h-7 w-7 ${dark ? "text-azure-300" : "text-brand-500"}`}
          />
          <h3 className={`mt-6 text-[17px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
            {item.title}
          </h3>
          <p className={`u-pretty mt-3 text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-muted"}`}>
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
