import type { Locale } from "@/i18n/config";
import { absoluteFor, hrefFor, type RouteKey } from "../routes";

/**
 * Route helpers bound to the archived v1 build, so a component under
 * `components/v1` cannot link into the live site by accident.
 */
export const href = (locale: Locale, key: RouteKey) => hrefFor("v1", locale, key);
export const absolute = (locale: Locale, key: RouteKey) => absoluteFor("v1", locale, key);
