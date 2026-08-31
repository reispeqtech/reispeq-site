"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitch } from "../language-switch";
import { useHeaderOffset } from "../use-header-offset";
import type { Locale } from "@/i18n/config";

type Item = { href: string; label: string; indent?: boolean };

/**
 * The small-screen menu.
 *
 * Portalled to <body>: the header bar is `sticky`, which makes it a containing
 * block for fixed-position descendants, so a panel rendered inside it would
 * measure `top`/`bottom` against the 72px bar and collapse.
 */
export function MetroNav({
  items,
  ctaHref,
  ctaLabel,
  openLabel,
  closeLabel,
  locale,
  email,
}: {
  items: Item[];
  ctaHref: string;
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
  locale: Locale;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const headerBottom = useHeaderOffset(open, trigger);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const panel = (
    <div
      id="metro-nav-panel"
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={{ top: headerBottom ?? undefined }}
      className="fixed inset-x-0 bottom-0 top-[var(--header-metro)] z-40 flex flex-col overflow-y-auto overscroll-contain bg-[#0a0b20] text-white lg:hidden"
    >
      <nav className="u-shell-wide flex-1 py-4" aria-label={openLabel}>
        <ul className="divide-y divide-white/10">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between gap-4 py-4 text-[17px] font-medium transition-colors hover:text-azure-300 ${
                  item.indent ? "ps-5 text-[15.5px] text-white/65" : "text-white"
                }`}
              >
                {item.label}
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="u-dir-flip h-4 w-4 shrink-0 text-white/35">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={ctaHref}
          className="mt-7 flex w-full items-center justify-center bg-azure-400 px-5 py-4 text-[15px] font-semibold text-white"
        >
          {ctaLabel}
        </Link>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6 pb-8">
          <a href={`mailto:${email}`} className="text-[14px] text-white/60 hover:text-white">
            <bdi dir="ltr">{email}</bdi>
          </a>
          <LanguageSwitch locale={locale} tone="light" />
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="metro-nav-panel"
        aria-label={open ? closeLabel : openLabel}
        className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-brand-400 lg:hidden"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-5 w-5">
          {open ? (
            <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {mounted && open ? createPortal(panel, document.body) : null}
    </>
  );
}
