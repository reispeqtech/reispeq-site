import { locales, localeMeta, defaultLocale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { site } from "@/lib/site";

/**
 * Static entry point.
 *
 * A static host cannot negotiate Accept-Language, so `/` is a thin routing
 * document: it links to both locales for crawlers, redirects immediately for
 * people, and points its canonical at the English edition. The <meta refresh>
 * fires even with JavaScript disabled; the inline script just gets there
 * sooner and honours the visitor's browser language.
 */
export const metadata = {
  title: site.name,
  description:
    "Reispeq Technologies LLC — software development, auditing and inspection services for oilfield and industrial operations across the Middle East and Africa.",
  alternates: {
    canonical: `${site.url}${href(defaultLocale, "home")}/`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${site.url}${href(l, "home")}/`])),
      "x-default": `${site.url}${href(defaultLocale, "home")}/`,
    },
  },
  robots: { index: false, follow: true },
};

const REDIRECT = `(function(){try{var s=(navigator.languages&&navigator.languages[0]||navigator.language||"en").toLowerCase();var l=s.indexOf("ar")===0?"ar":"en";location.replace(l+"/"+location.search+location.hash)}catch(e){location.replace("en/")}})();`;

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=./${defaultLocale}/`} />
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif", padding: "2rem" }}>
        <p>{site.name}</p>
        <ul>
          {locales.map((code) => (
            <li key={code}>
              <a href={`./${code}/`} hrefLang={code} lang={code} dir={localeMeta[code].dir}>
                {localeMeta[code].label}
              </a>
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
}
