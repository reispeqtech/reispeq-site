"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/en";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The site is a static export, so there is no server of ours to post to.
 * Enquiries go straight to a form endpoint you own:
 *
 *   NEXT_PUBLIC_CONTACT_ENDPOINT   e.g. https://formspree.io/f/xxxxxxx
 *                                  or   https://api.web3forms.com/submit
 *   NEXT_PUBLIC_CONTACT_ACCESS_KEY optional — Web3Forms requires this
 *
 * With neither set, the form composes a pre-filled email in the visitor's mail
 * client instead of failing silently.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || undefined;
const ACCESS_KEY = process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY?.trim() || undefined;

function mailtoFallback(data: Record<string, string>) {
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

const field =
  "w-full rounded-sm border border-line bg-white px-3.5 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/60 focus:border-brand-400 focus:outline-none focus-visible:outline-none";
const label = "block text-[13px] font-semibold text-ink-soft";

export function ContactForm({ t, locale }: { t: Dictionary["contact"]["form"]; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    if (!data.name?.trim()) nextErrors.name = t.required;
    if (!data.company?.trim()) nextErrors.company = t.required;
    if (!data.email?.trim()) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) nextErrors.email = t.invalidEmail;
    if (!data.message?.trim()) nextErrors.message = t.required;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot: a real person never fills this in.
    if (data.company_website) {
      setStatus("success");
      return;
    }

    if (!ENDPOINT) {
      window.location.href = mailtoFallback(data);
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
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
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-md border border-signal-500/30 bg-signal-50 p-8"
      >
        <h3 className="text-lg font-semibold text-ink">{t.successTitle}</h3>
        <p className="u-pretty mt-3 text-[15px] leading-relaxed text-ink-soft">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company-website">Company website</label>
        <input id="company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} error={errors.name}>
          <input id="name" name="name" autoComplete="name" required className={field} />
        </Field>
        <Field id="company" label={t.company} error={errors.company}>
          <input id="company" name="company" autoComplete="organization" required className={field} />
        </Field>
        <Field id="email" label={t.email} error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required dir="ltr" className={field} />
        </Field>
        <Field id="phone" label={t.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" className={field} />
        </Field>
        <Field id="country" label={t.country}>
          <select id="country" name="country" defaultValue={t.countries[0]} className={field}>
            {t.countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </Field>
        <Field id="interest" label={t.interest}>
          <select id="interest" name="interest" defaultValue={t.interestOptions[0]} className={field}>
            {t.interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label={t.message} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
          className={`${field} resize-y`}
        />
      </Field>

      <label className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded-xs border-line accent-[#2f318c]"
        />
        <span className="u-pretty">{t.consent}</span>
      </label>

      {status === "error" ? (
        <div role="alert" className="rounded-sm border border-alert-500/30 bg-alert-50 p-4">
          <p className="text-[14px] font-semibold text-ink">{t.errorTitle}</p>
          <p className="mt-1 text-[13.5px] text-ink-soft">
            {t.errorBody}{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
              <bdi dir="ltr">{site.email}</bdi>
            </a>
          </p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-sm bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label: labelText,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-1.5 text-[12.5px] font-medium text-alert-500">{error}</p>
      ) : null}
    </div>
  );
}
