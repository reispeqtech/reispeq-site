"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Where the sticky header actually ends, in viewport pixels.
 *
 * A full-screen menu panel has to start below the header, and the obvious way
 * to do that — `top: var(--header-h)` — assumes the header begins at y=0. It
 * does not always: anything stacked above it (the design-review bar, and in
 * production a cookie or announcement strip would do the same) pushes it down,
 * and the panel then opens *underneath* the header with its first item hidden.
 *
 * Measuring costs one layout read on open and is correct in every case. Body
 * scroll is locked while the panel is up, so the value cannot go stale; a
 * resize is the only thing that can move it.
 */
export function useHeaderOffset(open: boolean, anchor: RefObject<HTMLElement | null>): number | null {
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const header = anchor.current?.closest("header");
    if (!header) return;

    const measure = () => setTop(Math.max(0, Math.round(header.getBoundingClientRect().bottom)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, anchor]);

  return top;
}
