import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Section header set as an editorial masthead: a hairline that spans the
 * measure, the statement on the left, its qualifier on the right. No labels,
 * no ornament — the heading is expected to carry the section on its own.
 */
export function SectionHead({
  title,
  lead,
  tone = "dark",
  as: As = "h2",
  className = "",
}: {
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const rule = tone === "light" ? "border-white/15" : "border-line";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const leadColor = tone === "light" ? "text-white/65" : "text-ink-soft";

  return (
    <div className={`border-t ${rule} pt-9 ${className}`}>
      <div className="grid gap-x-14 gap-y-5 lg:grid-cols-12">
        <As
          className={`u-balance text-[1.9rem] font-semibold sm:text-[2.35rem] lg:text-[2.6rem] ${titleColor} ${
            lead ? "lg:col-span-6" : "lg:col-span-8"
          }`}
        >
          {title}
        </As>
        {lead ? (
          <p className={`u-pretty text-[16.5px] leading-relaxed lg:col-span-5 lg:col-start-8 lg:pt-2.5 ${leadColor}`}>
            {lead}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`u-dir-flip h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
  external?: boolean;
};

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-colors duration-150";

export function Button({ href, children, variant = "primary", className = "", external }: ButtonProps) {
  const styles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-brand-500 text-white hover:bg-brand-600",
    secondary: "border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-600",
    ghost: "text-brand-600 hover:text-brand-700 px-0",
    onDark: "bg-white text-brand-700 hover:bg-azure-50",
  };
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${buttonBase} ${styles[variant]} ${className}`} {...props}>
      {children}
      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 underline-offset-4 hover:text-brand-700 hover:underline ${className}`}
      {...props}
    >
      {children}
      <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}

/** Numbered list used for capabilities and principles — hairline separated, no cards. */
export function NumberedGrid({
  items,
  columns = 2,
  tone = "dark",
  start = 1,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
  tone?: "dark" | "light";
  start?: number;
}) {
  const border = tone === "light" ? "border-white/12" : "border-line";
  const num = tone === "light" ? "text-azure-300" : "text-brand-300";
  const titleColor = tone === "light" ? "text-white" : "text-ink";
  const bodyColor = tone === "light" ? "text-white/65" : "text-muted";
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="overflow-hidden">
      <ul className={`-me-px grid ${cols} border-t ${border}`}>
        {items.map((item, i) => (
          <li key={item.title} className={`border-b border-e ${border} py-7 pe-7`}>
            <div className="flex gap-4">
              <span className={`mt-0.5 shrink-0 font-mono text-[15px] font-medium tabular-nums ${num}`}>
                {String(start + i).padStart(2, "0")}
              </span>
              <div>
                <h3 className={`text-base font-semibold ${titleColor}`}>{item.title}</h3>
                <p className={`u-pretty mt-2 text-[15px] leading-relaxed ${bodyColor}`}>{item.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CheckList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "light";
}) {
  const iconColor = tone === "light" ? "text-azure-300" : "text-signal-500";
  const textColor = tone === "light" ? "text-white/75" : "text-ink-soft";
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`mt-1 h-4 w-4 shrink-0 ${iconColor}`}>
            <path
              d="m3 8.4 3.2 3.1L13 4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`u-pretty text-[15px] leading-relaxed ${textColor}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "brand";
  id?: string;
}) {
  const bg =
    tone === "brand" ? "bg-brand-900 text-white" : tone === "surface" ? "bg-surface" : "bg-paper";
  return (
    <section id={id} className={`${bg} py-18 sm:py-24 lg:py-28 ${className}`}>
      <div className="u-shell">{children}</div>
    </section>
  );
}
