import type { Dictionary } from "@/i18n/en";
import { site } from "./site";

/**
 * Enquiry delivery for a static site.
 *
 * There is no server of ours to post to, so submissions go straight to a form
 * endpoint the client owns:
 *
 *   NEXT_PUBLIC_CONTACT_ENDPOINT    e.g. https://formspree.io/f/xxxxxxx
 *                                   or   https://api.web3forms.com/submit
 *   NEXT_PUBLIC_CONTACT_ACCESS_KEY  optional — Web3Forms requires this
 *
 * With neither set the form opens a pre-filled message in the visitor's own
 * mail client rather than failing silently, so an enquiry is never lost while
 * the endpoint is still being set up.
 *
 * The logic lives here rather than in a component because each design
 * iteration renders its own form markup, and the delivery path must not drift
 * between them.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || undefined;
const ACCESS_KEY = process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY?.trim() || undefined;

export type EnquiryData = Record<string, string>;
type FormCopy = Dictionary["contact"]["form"];

export function mailtoFallback(data: EnquiryData): string {
  const body = [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    `Country: ${data.country}`,
    `Interest: ${data.interest}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Website enquiry — ${data.company || data.name}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function validateEnquiry(data: EnquiryData, t: FormCopy): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = t.required;
  if (!data.company?.trim()) errors.company = t.required;
  if (!data.email?.trim()) errors.email = t.required;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = t.invalidEmail;
  if (!data.message?.trim()) errors.message = t.required;
  return errors;
}

/** True when a bot filled the hidden field. A real person never sees it. */
export function isHoneypotTripped(data: EnquiryData): boolean {
  return Boolean(data.company_website);
}

export type SendResult = "sent" | "mailto";

/**
 * Delivers the enquiry. Throws on a non-2xx response so the caller can show
 * the error state with the direct address as a way out.
 */
export async function sendEnquiry(data: EnquiryData, locale: string): Promise<SendResult> {
  if (!ENDPOINT) {
    window.location.href = mailtoFallback(data);
    return "mailto";
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...data,
      locale,
      source: site.domain,
      subject: `Website enquiry — ${data.company || data.name}`,
      ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
    }),
  });
  if (!response.ok) throw new Error(String(response.status));
  return "sent";
}
