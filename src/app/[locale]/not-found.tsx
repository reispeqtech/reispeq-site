import Link from "next/link";
import { Btn } from "@/components/site/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";
import { href } from "@/lib/routes";

export default function LocaleNotFound() {
  const t = getDictionary(defaultLocale);
  return (
    <section className="u-shell-wide flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-[14px] font-medium text-brand-400">{t.notFound.code}</p>
      <h1 className="u-balance mt-5 max-w-2xl text-3xl font-semibold text-ink sm:text-[2.75rem]">
        {t.notFound.title}
      </h1>
      <p className="u-pretty mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{t.notFound.body}</p>
      <div className="mt-9">
        <Btn href={href(defaultLocale, "home")}>{t.notFound.cta}</Btn>
      </div>
      <p className="mt-10 text-sm text-muted">
        <Link href={href("ar", "home")} lang="ar" dir="rtl" className="underline underline-offset-4">
          العربية
        </Link>
      </p>
    </section>
  );
}
