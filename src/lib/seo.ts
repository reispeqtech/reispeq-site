import type { Metadata } from "next";
import { site } from "./site";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { absoluteFor, type RouteKey } from "./routes";
import { liveVersion, type Version } from "./versions";

/** Absolute URL for a locale + route, used for canonical, hreflang and JSON-LD. */
export function absoluteUrl(version: Version, locale: Locale, key: RouteKey): string {
  return absoluteFor(version, locale, key);
}

/**
 * Only the live version may be indexed. The archived build carries
 * near-identical copy, which is exactly the duplicate-content case that gets a
 * site filtered, so it is kept out of the index rather than left to compete
 * with the pages it was replaced by.
 */
export function robotsFor(version: Version): Metadata["robots"] {
  if (version === liveVersion) {
    return {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    };
  }
  return { index: false, follow: false, nocache: true };
}

export function buildMetadata({
  version,
  locale,
  route,
  title,
  description,
  keywords,
}: {
  version: Version;
  locale: Locale;
  route: RouteKey;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(version, locale, route);
  // A committed asset rather than a generated route: static hosts serve
  // extension-less files as application/octet-stream, which breaks previews.
  // Regenerate public/og.png only if the brand line changes.
  const ogImage = {
    url: `${site.url}/og.png`,
    width: 1200,
    height: 630,
    alt: `${site.name} \u2014 ${title}`,
  };

  const languages: Record<string, string> = {};
  for (const code of locales) {
    languages[localeMeta[code].htmlLang] = absoluteUrl(version, code, route);
  }
  languages["x-default"] = absoluteUrl(version, "en", route);

  return {
    title,
    description,
    keywords,
    robots: robotsFor(version),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

/** Keyword sets are deliberately regional — this site sells into the GCC. */
export const keywordSets: Record<string, { en: string[]; ar: string[] }> = {
  home: {
    en: [
      "software development Oman",
      "compliance software UAE",
      "API Q1 audit support",
      "API Q2 audit",
      "equipment inspection Oman",
      "oilfield inspection services UAE",
      "certification tracking software",
      "quality assurance services GCC",
    ],
    ar: [
      "تطوير برمجيات عمان",
      "برمجيات الامتثال الإمارات",
      "دعم تدقيق API Q1",
      "تدقيق API Q2",
      "فحص المعدات عمان",
      "خدمات الفحص النفطي الإمارات",
      "برنامج تتبع الشهادات",
    ],
  },
  auditing: {
    en: ["API Spec Q1 gap assessment", "API Q2 readiness", "internal audit services Oman", "supplier audit UAE", "ISO 9001 internal audit GCC"],
    ar: ["تقييم فجوات API Spec Q1", "جاهزية API Q2", "خدمات التدقيق الداخلي عمان", "تدقيق الموردين الإمارات"],
  },
  inspection: {
    en: ["rig inspection Oman", "workover unit inspection", "third party equipment inspection UAE", "lifting equipment certification verification", "pre-mobilisation inspection"],
    ar: ["فحص الحفارات عمان", "فحص وحدات الصيانة", "فحص المعدات طرف ثالث الإمارات", "التحقق من شهادات معدات الرفع"],
  },
  investigations: {
    en: ["damage beyond repair investigation", "DBR report oilfield", "equipment failure investigation UAE", "root cause analysis drilling equipment"],
    ar: ["تحقيق التلف غير القابل للإصلاح", "تقرير DBR", "تحقيق أعطال المعدات الإمارات", "تحليل السبب الجذري"],
  },
  certitrack: {
    en: ["certification tracking software oilfield", "equipment certificate expiry alerts", "CertiTrack Plus", "compliance management software GCC", "inspection management system"],
    ar: ["برنامج تتبع شهادات المعدات", "تنبيهات انتهاء الشهادات", "سيرتي تراك بلس", "نظام إدارة الفحص"],
  },
  software: {
    en: ["custom software development Oman", "workflow automation UAE", "document control software", "compliance dashboard development", "enterprise application development GCC"],
    ar: ["تطوير برمجيات مخصصة عمان", "أتمتة سير العمل الإمارات", "برنامج ضبط المستندات", "تطوير تطبيقات المؤسسات"],
  },
  services: {
    en: ["oilfield quality assurance services", "industrial inspection GCC", "compliance consultancy Oman", "QA QC services UAE"],
    ar: ["خدمات ضمان الجودة النفطية", "الفحص الصناعي الخليج", "استشارات الامتثال عمان"],
  },
  about: { en: ["Reispeq Technologies", "technology company Oman", "quality assurance company UAE"], ar: ["ريسبيك للتقنيات", "شركة تقنية عمان"] },
  contact: { en: ["contact Reispeq", "inspection quote Oman", "audit support enquiry UAE"], ar: ["اتصل بريسبيك", "طلب عرض فحص عمان"] },
};
