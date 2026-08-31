/**
 * The live site, and the first build kept alongside it.
 *
 *   /en/…      the site (the "Metro" design)
 *   /v1/en/…   the original build, kept reachable for reference
 *
 * v1 is unlisted: nothing links to it, it is not in the sitemap, and it is
 * `noindex, nofollow`. It stays in the tree so the earlier design can still be
 * opened by URL; delete `src/app/v1`, `src/components/v1` and
 * `src/lib/links/v1.ts` when it is no longer wanted and the type checker will
 * point at anything left behind.
 */
export const versions = ["main", "v1"] as const;

export type Version = (typeof versions)[number];

/** The only version that is canonical, indexed and in the sitemap. */
export const liveVersion: Version = "main";

/** URL prefix per version. The live one has none — it is served at the root. */
export const versionPrefix: Record<Version, string> = {
  main: "",
  v1: "/v1",
};
