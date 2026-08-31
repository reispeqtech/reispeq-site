import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import { hrefFor } from "@/lib/routes";
import { liveVersion } from "@/lib/versions";
import { site } from "@/lib/site";

export const metadata = {
  title: `Page not found — ${site.name}`,
  robots: { index: false, follow: false },
};

/**
 * Root-level 404. It is what a static host serves for any path outside the
 * exported tree, so it must stand on its own: no locale in the URL to read, and
 * no site chrome to inherit.
 */
export default function RootNotFound() {
  const home = hrefFor(liveVersion, defaultLocale, "home");
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14162e",
          color: "#fff",
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "34rem" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.55 }}>
            404
          </p>
          <h1 style={{ fontSize: "2rem", margin: "0.75rem 0 0", lineHeight: 1.15 }}>This page does not exist.</h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>The link may be out of date, or the page may have moved.</p>
          <p style={{ marginTop: "1.75rem" }}>
            <Link href={home} style={{ color: "#fff", fontWeight: 600 }}>
              Return to {site.shortName} →
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
