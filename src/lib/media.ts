import { asset } from "./base-path";
import type { Locale } from "@/i18n/config";

/**
 * Photography manifest.
 *
 * Every image is from Pexels (https://www.pexels.com/license/) and is used
 * under the Pexels licence: free for commercial use, no attribution required,
 * modification allowed. The id and photographer are recorded anyway, so a
 * photograph can be traced back, re-downloaded at a different size, or swapped
 * for a client-owned photograph later — which is what should happen before
 * launch wherever the picture is doing real work.
 *
 * Two licence terms bear on how these are used here, and both are respected by
 * the current copy: identifiable people may not be shown in a bad light, and
 * their presence must not imply that they endorse anything. So the alt text
 * describes what a person is doing and never names them as Reispeq staff, and
 * no caption presents a stock photograph as a Reispeq project or customer
 * site. Keep that true if the captions change.
 *
 * `alt` is written per locale because these are content images, not decoration:
 * a screen reader user in Arabic should not be handed English.
 */
type MediaEntry = {
  /** Pexels photo id — https://www.pexels.com/photo/<id>/ */
  id: number;
  /**
   * The photographer, as credited on Pexels. Attribution is not required by
   * the Pexels licence; this is recorded so a photograph can be traced back to
   * a person, which is what makes the licence claim checkable later.
   */
  credit: string;
  file: string;
  alt: Record<Locale, string>;
};

const media = {
  rigNight: {
    id: 30475899,
    credit: "Saul Bandera Brotheridge",
    file: "rig-night.jpg",
    alt: {
      en: "An offshore drilling platform lit up against the night sky",
      ar: "منصة حفر بحرية مضاءة في سماء الليل",
    },
  },
  platformDawn: {
    id: 1716008,
    credit: "Johannes Havn",
    file: "platform-dawn.jpg",
    alt: {
      en: "A drilling platform structure at first light",
      ar: "هيكل منصة حفر عند أول ضوء النهار",
    },
  },
  offshoreSunset: {
    id: 15973758,
    credit: "Ganesh Ramsumair",
    file: "offshore-sunset.jpg",
    alt: {
      en: "A jack-up rig on open water at sunset",
      ar: "حفارة قاطرة في المياه المفتوحة عند الغروب",
    },
  },
  rigWork: {
    id: 416365,
    credit: "",
    file: "rig-work.jpg",
    alt: {
      en: "Deck equipment on an offshore production platform",
      ar: "معدات السطح على منصة إنتاج بحرية",
    },
  },
  refineryMono: {
    id: 3229014,
    credit: "Edoardo Colombo",
    file: "refinery-mono.jpg",
    alt: {
      en: "Process plant pipework and vessels",
      ar: "أنابيب وأوعية في منشأة معالجة",
    },
  },
  welding: {
    id: 5846247,
    credit: "Tima Miroshnichenko",
    file: "welding.jpg",
    alt: {
      en: "A welder working on a steel assembly in a workshop",
      ar: "لحّام يعمل على مجموعة فولاذية في ورشة",
    },
  },
  component: {
    id: 2760241,
    credit: "Kateryna Babaieva",
    file: "component.jpg",
    alt: {
      en: "A heavy machined component held for examination",
      ar: "مكوّن ثقيل مُصنَّع مُمسَك للفحص",
    },
  },
  factoryCheck: {
    id: 19895915,
    credit: "ThisIsEngineering",
    file: "factory-check.jpg",
    alt: {
      en: "A technician inspecting machinery on a plant floor",
      ar: "فني يفحص آلة في صالة الإنتاج",
    },
  },
  hardHat: {
    id: 28196526,
    credit: "Ihsan Adityawarman",
    file: "hard-hat.jpg",
    alt: {
      en: "A worker in a high-visibility vest holding a hard hat",
      ar: "عامل يرتدي سترة عاكسة ويحمل خوذة",
    },
  },
  engineerHelmet: {
    id: 7937365,
    credit: "Pavel Danilyuk",
    file: "engineer-helmet.jpg",
    alt: {
      en: "An engineer in a safety helmet reviewing an audit file",
      ar: "مهندسة ترتدي خوذة أمان تراجع ملف تدقيق",
    },
  },
  crewBrief: {
    id: 1216589,
    credit: "Anamul Rezwan",
    file: "crew-brief.jpg",
    alt: {
      en: "Two engineers discussing work at an industrial site",
      ar: "مهندسان يناقشان العمل في موقع صناعي",
    },
  },
  codeScreen: {
    id: 16592498,
    credit: "Саша Алалыкин",
    file: "code-screen.jpg",
    alt: {
      en: "Application source code on a monitor",
      ar: "الشفرة المصدرية لتطبيق على الشاشة",
    },
  },
  analytics: {
    id: 3861957,
    credit: "ThisIsEngineering",
    file: "analytics.jpg",
    alt: {
      en: "A reporting dashboard open on a laptop",
      ar: "لوحة تقارير مفتوحة على حاسوب محمول",
    },
  },
  tabletReview: {
    id: 36598855,
    credit: "Jakub Zerdzicki",
    file: "tablet-review.jpg",
    alt: {
      en: "An engineer reviewing records on a tablet",
      ar: "مهندس يراجع السجلات على جهاز لوحي",
    },
  },
} as const satisfies Record<string, MediaEntry>;

export type MediaKey = keyof typeof media;

/** Root-relative URL for an image, base-path aware. */
export function img(key: MediaKey): string {
  return asset(`/media/${media[key].file}`);
}

export function alt(key: MediaKey, locale: Locale): string {
  return media[key].alt[locale];
}

/** Everything needed for an <img>, in one call. */
export function picture(key: MediaKey, locale: Locale): { src: string; alt: string } {
  return { src: img(key), alt: alt(key, locale) };
}

export { media };
