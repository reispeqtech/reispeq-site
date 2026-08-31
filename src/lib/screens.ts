/**
 * Build-time discovery of the CertiTrack Plus screenshots.
 *
 * SERVER ONLY. This module reads the filesystem, so it must only ever be
 * imported from a server component — which is fine, because the whole site
 * renders at build time under `output: "export"`.
 *
 * The PNGs are captured from the live application by the CertiTrack Plus
 * repository (`npm run screens` there) and copied into `public/screens/`.
 * Replace a file and the next build picks it up; delete it and the component
 * that asked for it renders nothing rather than a broken image.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { asset } from "./base-path";

export type Screen = { src: string; width: number; height: number };

/**
 * Intrinsic pixel size from the PNG header.
 *
 * A PNG is an 8-byte signature followed by the IHDR chunk: 4-byte length,
 * 4-byte type, then width and height as big-endian uint32 at offsets 16 and 20.
 * Reading it here avoids both a dependency and hard-coded dimensions that would
 * silently go wrong the next time the capture viewport changes — and the
 * correct intrinsic ratio is what stops the page jumping as the image loads.
 */
function pngSize(file: string): { width: number; height: number } | null {
  try {
    const buf = readFileSync(file);
    if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR") return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

export type ScreenName = "dashboard" | "expiry" | "work-units" | "charts" | "templates";

/** Returns the screenshot if it is present and readable, otherwise null. */
export function screen(name: ScreenName): Screen | null {
  const file = path.join(process.cwd(), "public", "screens", `${name}.png`);
  if (!existsSync(file)) {
    console.warn(`[screens] ${name}.png is missing — the product shot will be omitted`);
    return null;
  }
  const size = pngSize(file);
  if (!size) {
    console.warn(`[screens] ${name}.png is not a readable PNG — the product shot will be omitted`);
    return null;
  }
  return { src: asset(`/screens/${name}.png`), ...size };
}
