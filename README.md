# Reispeq Technologies LLC — website

Bilingual (English / Arabic) marketing site for Reispeq Technologies LLC.
Built with Next.js 15 and Tailwind CSS v4, and exported as **plain static
files** — there is no server to run, so it hosts anywhere.

```bash
npm install
npm run dev      # http://localhost:3100
npm run build    # writes the whole site to ./out
```

---

## The site, and the archived first build

| Path | What it is |
| --- | --- |
| `/en/…`, `/ar/…` | The site. Hard-edged tile grid over full-bleed photography, in the vein of slb.com. |
| `/v1/en/…`, `/v1/ar/…` | The original build, kept reachable for reference. Unlisted: nothing links to it, it is not in the sitemap, and it is `noindex, nofollow`. |

Every page of the archive is exported, so once deployed it is reachable by
typing the URL — there is no link to it anywhere on the site and no login:

```
https://<your-domain>/v1/en/            https://<your-domain>/v1/ar/
https://<your-domain>/v1/en/about/      …and every other page, same slugs
```

On the current GitHub project page that is
`https://alamgirqazi.github.io/reispeq-site/v1/en/`. With a custom domain it is
`https://www.reispeq.com/v1/en/`. "Hidden" here means unlinked and unindexed,
not access-controlled — a static export cannot authenticate. If it needs to be
genuinely private, either delete it before going live or put it behind the
host's access control (Cloudflare Pages has Access; GitHub Pages does not).

Only the live tree is indexed — two trees carrying near-identical copy is the
textbook duplicate-content case. That is enforced in one place, `robotsFor()`
in `src/lib/seo.ts`, rather than repeated per page.

To delete the archive when it is no longer wanted: remove `src/app/v1`,
`src/components/v1` and `src/lib/links/v1.ts`, then drop `"v1"` from
`src/lib/versions.ts`. The type checker will point at anything left behind.

---

## Where the copy comes from

The text on this site is taken from the client's own write-up,
`_brief/Reispeq_Technologies_LLC_Website_Writeup.docx` — the positioning
statement, the service descriptions, the five reasons to choose Reispeq and the
call to action are used close to verbatim rather than rewritten into something
more quotable. `src/i18n/en.ts` carries a note to that effect; keep it true
when editing.

Two things are deliberately absent, because they read as filler:

- **Section kickers.** No "What we do" / "Focus" / "Our product" label printed
  above a heading. A heading that needs one is not doing its job.
- **Numbered captions.** Lists are marked with an icon from
  `src/components/icons.tsx`, not "01 / 02 / 03" — most of these lists are sets,
  not sequences, and numbering implied an order that was never there.

---

## Product screenshots

`public/screens/*.png` are real captures of the CertiTrack Plus application,
copied from the CertiTrack Plus repository (`npm run screens` there). They are
rendered by `src/components/site/product-shot.tsx`, which reads each PNG's
intrinsic size at build time so the page does not jump as the image loads, and
renders nothing at all if a file is missing.

> **The demo data in these captures is unflattering** — the dashboard reports a
> 2% compliance rate, 135 non-compliant items and a "Critical" banner, and the
> work-unit list shows three rigs all marked non-compliant. That is the state of
> the demo tenant, not a limitation of the product, but it is the first thing a
> prospect reads. Re-seed the demo data with a healthier mix and re-run
> `npm run screens` in the CertiTrack Plus repository, then copy the PNGs back
> into `public/screens/`.

---

## Deploying

`npm run build` produces `./out`. That folder *is* the website. Upload it
anywhere, or use one of the two paths below.

### Cloudflare Pages (recommended)

Connect the repository in the Cloudflare dashboard and set:

| Setting | Value |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` — or `None` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` |

Add the environment variables from the table further down. Cloudflare handles
the custom domain, TLS and CDN. Nothing else to configure.

### GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Enable it once: **Settings → Pages → Source → GitHub Actions**.

- **Custom domain** (e.g. `reispeq.com`): leave `NEXT_PUBLIC_BASE_PATH` empty
  and add the domain under Settings → Pages.
- **Project page** (`username.github.io/reispeq-site`): set the repository
  variable `NEXT_PUBLIC_BASE_PATH` to `/reispeq-site`, otherwise CSS and links
  resolve to the wrong paths.

`public/.nojekyll` is committed because GitHub Pages would otherwise ignore the
`_next` directory.

### Environment variables

All are optional. Blank, missing or malformed values fall back to sane defaults
rather than breaking the build — CI systems pass undefined variables through as
empty strings, and that must not take the site down.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Absolute base for canonicals, hreflang, sitemap and JSON-LD. Defaults to `https://www.reispeq.com`. **Set this before going live.** A missing `https://` is added for you. |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for GitHub project pages only. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Where the contact form posts (see below). |
| `NEXT_PUBLIC_CONTACT_ACCESS_KEY` | Only for Web3Forms. |

---

## The contact form

A static site has no backend, so the form posts JSON directly to a form
endpoint you own. Two options that need no code:

**Formspree** — create a form at formspree.io, then set
`NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx`.

**Web3Forms** — free, no account required. Set
`NEXT_PUBLIC_CONTACT_ENDPOINT=https://api.web3forms.com/submit` and
`NEXT_PUBLIC_CONTACT_ACCESS_KEY=<your key>`.

Both deliver submissions to your inbox and keep a dashboard copy.

**With neither set**, the form falls back to opening a pre-filled message in the
visitor's own mail client addressed to `site.email` — so no enquiry is ever
lost silently, but you should configure an endpoint before launch.

If you would rather own the delivery path, a Cloudflare Pages Function or Worker
posting to Resend/SES works the same way — point the endpoint at it.

---

## Editing the site

| What | Where |
| --- | --- |
| All English copy | `src/i18n/en.ts` |
| All Arabic copy | `src/i18n/ar.ts` |
| Company details (email, offices, regions, product links) | `src/lib/site.ts` |
| Pages, navigation and sitemap entries | `src/lib/routes.ts` |
| The live tree and the archived one | `src/lib/versions.ts` |
| Which icon and photograph stand for each service | `src/lib/service-art.ts` |
| Photographs — filenames, sources, alt text per locale | `src/lib/media.ts` |
| Colours, type scale, shared utilities | `src/app/globals.css` |
| Enquiry delivery (shared by every iteration's form) | `src/lib/contact.ts` |

`en.ts` and `ar.ts` are type-checked against each other: if you add a key to one
and forget the other, `npm run build` fails rather than shipping a gap.

### Adding a page

1. Add an entry to `routes.ts` (this feeds the nav, footer and sitemap).
2. Add its copy to `en.ts` and `ar.ts`, including a `seo` entry.
3. Create `src/app/[locale]/<slug>/page.tsx`, copying an existing service page.

Live pages import `href` from `@/lib/routes`. The archived build imports it from
`@/lib/links/v1` instead — the same function pre-bound to the `/v1` prefix,
which is what stops an archived page from linking into the live site.

### Photography and licensing

Images live in `public/media/` and are declared once in `src/lib/media.ts` —
filename, Pexels photo id, photographer, and alt text in both languages.
Components take a key (`<Photo image="rigNight" locale={locale} />`), never a
path, so alt text cannot be forgotten and a photograph can be swapped in one
line.

All of them come from [Pexels](https://www.pexels.com/license/) and are used
under the Pexels licence: free to use, free for commercial use, no attribution
required, modification allowed. `public/media/CREDITS.md` records the photo id
and photographer for every file — not because attribution is required, but so
the claim stays checkable.

One licence term bears on how they are used: **identifiable people may not be
shown in a bad light, and imagery must not imply that the people or brands in it
endorse anything.** Several of these photographs show identifiable people, so
alt text describes them generically and no caption presents a stock photograph
as a Reispeq project, employee or customer site. Keep that true if the captions
change — and replacing the load-bearing photographs with Reispeq's own site
photography before launch retires the question entirely.

---

## Bilingual behaviour

- Routes are `/en/...` and `/ar/...`; slugs stay the same in both languages.
- `/` is a small routing document that sends visitors to the locale matching
  their browser, and carries `noindex` plus a canonical to `/en/`.
- Arabic renders with `dir="rtl"` and IBM Plex Sans Arabic. Layout uses CSS
  logical properties throughout, so it mirrors rather than being re-authored.
- Email addresses and certificate codes are wrapped in `<bdi>` so they stay
  left-to-right inside Arabic text without breaking paragraph alignment.

> The Arabic copy is Modern Standard Arabic written for a Gulf B2B audience.
> Have a native speaker review it before launch — particularly the technical
> terms (`مانع انفجار`, `وحدات الصيانة`, `عدم المطابقة`).

---

## SEO

Per page and per language: title, meta description, canonical, `hreflang`
(including `x-default`), Open Graph and Twitter cards. `sitemap.xml` lists both
locales with alternates; `robots.txt` points at it. Structured data covers
`Organization`, `WebSite`, `Service`, `SoftwareApplication`, `BreadcrumbList`
and `FAQPage`.

Regional keyword sets (Oman, UAE, Saudi, Qatar, Kuwait, Bahrain) live in
`src/lib/seo.ts`.

---

## Before launch

- [ ] Re-seed the CertiTrack Plus demo data and re-capture `public/screens/`
      (see above) — the current captures report 2% compliance.
- [ ] Replace the stock photography in `public/media/` with Reispeq's own.
- [ ] Confirm the African coverage: the site says North / West / East Africa
      rather than naming countries. Name them in `src/i18n/*.ts` (`ui.regions`)
      and `src/lib/site.ts` once they are decided.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Configure the contact form endpoint.
- [ ] Replace the placeholder office locations in `src/lib/site.ts`.
- [ ] Confirm the LinkedIn URL in `src/lib/site.ts`, or remove it.
- [ ] Delete `src/app/v1` and friends once the archive is no longer wanted.
- [ ] Have the Arabic reviewed.
- [ ] Regenerate `public/og.png` if the hero line changes (1200×630).
- [ ] Submit `sitemap.xml` in Google Search Console for both locales.

## Source material

`_brief/` holds the original write-up and logo supplied for this build. The mark
in `public/logo-reispeq.svg` and `src/components/logo.tsx` is a vector redraw of
`_brief/logo.jpeg`.
