import type { SVGProps } from "react";

/**
 * Line icons, drawn on a 24×24 grid at 1.5 stroke.
 *
 * One shared grid and one stroke weight is the whole discipline here — a set
 * that mixes weights reads as clip-art no matter how good the individual
 * drawings are. Everything is `currentColor` and `fill="none"`, so an icon
 * takes the colour of whatever surface it lands on.
 *
 * These replace the numbered captions the sections used to carry: a numeral
 * implies a sequence, and most of these lists are not sequences.
 */
export type IconName =
  | "code"
  | "workflow"
  | "certificate"
  | "chart"
  | "checklist"
  | "transfer"
  | "clipboard"
  | "inspect"
  | "alert"
  | "wrench"
  | "derrick"
  | "link"
  | "target"
  | "route"
  | "bell"
  | "history"
  | "shield"
  | "factory"
  | "cycle"
  | "crate"
  | "camera"
  | "document"
  | "scales"
  | "lock"
  | "ruler"
  | "gauge"
  | "globe"
  | "layers";

const paths: Record<IconName, React.ReactNode> = {
  /* Software development — angle brackets. */
  code: (
    <>
      <path d="M8.5 7 3.5 12l5 5" />
      <path d="m15.5 7 5 5-5 5" />
      <path d="m13.5 4-3 16" />
    </>
  ),
  /* Workflow automation — two nodes and a routed connection. */
  workflow: (
    <>
      <rect x="3" y="4" width="7" height="5" rx="0.5" />
      <rect x="14" y="15" width="7" height="5" rx="0.5" />
      <path d="M6.5 9v5.5a2 2 0 0 0 2 2H14" />
    </>
  ),
  /* Certificate — a document with a seal. */
  certificate: (
    <>
      <path d="M19 10.5V4.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5H11" />
      <path d="M8 8h8M8 11.5h5" />
      <circle cx="16.5" cy="16" r="3" />
      <path d="m14.6 18.4-.6 3 2.5-1.3 2.5 1.3-.6-3" />
    </>
  ),
  /* Dashboard reporting — bars on a baseline. */
  chart: (
    <>
      <path d="M3.5 20h17" />
      <path d="M6.5 20v-5.5M11 20V8M15.5 20v-8.5M20 20V5" />
    </>
  ),
  /* Action tracking — ticked lines. */
  checklist: (
    <>
      <path d="m3 6.5 1.6 1.6L7.8 5" />
      <path d="m3 13.5 1.6 1.6L7.8 12" />
      <path d="m3 20.5 1.6 1.6L7.8 19" />
      <path d="M11 7h10M11 14h10M11 21h7" />
    </>
  ),
  /* Integration and migration — two directions. */
  transfer: (
    <>
      <path d="M4 8h13m0 0-3.2-3.2M17 8l-3.2 3.2" />
      <path d="M20 16H7m0 0 3.2 3.2M7 16l3.2-3.2" />
    </>
  ),
  /* Auditing — clipboard with a tick. */
  clipboard: (
    <>
      <path d="M9 4.5H6.5a.5.5 0 0 0-.5.5v14.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H15" />
      <rect x="9" y="2.8" width="6" height="3.4" rx="0.5" />
      <path d="m9 13.2 2 2 4-4.4" />
    </>
  ),
  /* Inspection — magnifier over a checked item. */
  inspect: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.4 15.4 5.1 5.1" />
      <path d="m7.8 10.6 1.9 1.9 3.5-3.9" />
    </>
  ),
  /* Investigations — attention on a failure. */
  alert: (
    <>
      <path d="M12 4.2 2.8 20h18.4L12 4.2Z" />
      <path d="M12 10v4.2" />
      <path d="M12 17.2h.01" />
    </>
  ),
  /* Practical solutions. */
  wrench: (
    <>
      <path d="M15.6 3.4a5 5 0 0 0-5.9 6.5L3.6 16a2.1 2.1 0 0 0 3 3l6.1-6.1a5 5 0 0 0 6.5-5.9l-3 3-2.6-2.6 3-3Z" />
    </>
  ),
  /* Industry understanding — a derrick. */
  derrick: (
    <>
      <path d="M12 2.5 5.5 20.5M12 2.5 18.5 20.5" />
      <path d="M3.5 20.5h17" />
      <path d="M8.4 12h7.2M7.1 16h9.8M9.7 8h4.6" />
    </>
  ),
  /* Digital and technical capability — two halves joined. */
  link: (
    <>
      <path d="M10 14a3.7 3.7 0 0 0 5.5.4l2.7-2.7a3.7 3.7 0 0 0-5.2-5.2l-1.5 1.5" />
      <path d="M14 10a3.7 3.7 0 0 0-5.5-.4l-2.7 2.7a3.7 3.7 0 0 0 5.2 5.2l1.5-1.5" />
    </>
  ),
  /* Customer-focused. */
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  /* Traceability — waypoints on a path. */
  route: (
    <>
      <circle cx="5.5" cy="6" r="2.2" />
      <circle cx="18.5" cy="18" r="2.2" />
      <path d="M7.7 6h6.6a3.3 3.3 0 0 1 0 6.6H9.7a3.3 3.3 0 0 0 0 6.6h6.6" />
    </>
  ),
  /* Expiry alerts. */
  bell: (
    <>
      <path d="M18 16.5V11a6 6 0 1 0-12 0v5.5L4.3 19h15.4L18 16.5Z" />
      <path d="M10 22h4" />
      <path d="M12 8v3.2l2 1.2" />
    </>
  ),
  /* Inspection history. */
  history: (
    <>
      <path d="M3.6 12a8.4 8.4 0 1 0 2.6-6" />
      <path d="M3.2 3.6v4h4" />
      <path d="M12 7.6V12l3 1.8" />
    </>
  ),
  /* Controlled access. */
  shield: (
    <>
      <path d="M12 2.8 4.5 5.8v6c0 4.2 3 8 7.5 9.4 4.5-1.4 7.5-5.2 7.5-9.4v-6L12 2.8Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  /* Supplier and vendor assessment. */
  factory: (
    <>
      <path d="M3 20.5h18" />
      <path d="M5 20.5V8.2l6-3.4v15.7" />
      <path d="m11 11.6 7.5 2.6v6.3" />
      <path d="M7.8 11.4v.01M7.8 15.2v.01M14.6 16.4v.01" />
    </>
  ),
  /* Corrective action follow-up — round and verify. */
  cycle: (
    <>
      <path d="M20.4 12a8.4 8.4 0 1 1-2.6-6" />
      <path d="M20.8 3.6v4h-4" />
      <path d="m8.6 12 2.2 2.2 4.6-4.8" />
    </>
  ),
  /* Pre-mobilisation and acceptance. */
  crate: (
    <>
      <path d="M12 2.9 3.4 7.2v9.6L12 21.1l8.6-4.3V7.2L12 2.9Z" />
      <path d="M3.4 7.2 12 11.5l8.6-4.3M12 11.5v9.6" />
    </>
  ),
  /* Evidence collection. */
  camera: (
    <>
      <path d="M3.4 8.4h3.4l1.6-2.5h7.2l1.6 2.5h3.4v10.2H3.4V8.4Z" />
      <circle cx="12" cy="13.2" r="3.4" />
    </>
  ),
  /* Documentation review / technical report. */
  document: (
    <>
      <path d="M13.5 3H6.5a.5.5 0 0 0-.5.5v17a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7.6L13.5 3Z" />
      <path d="M13.4 3.1v4.4h4.5" />
      <path d="M9 12.5h6M9 16h6" />
    </>
  ),
  /* Independence and objective evidence. */
  scales: (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M4 7.5h16" />
      <path d="M4 7.5 1.6 13a2.7 2.7 0 0 0 4.8 0L4 7.5Z" />
      <path d="M20 7.5 17.6 13a2.7 2.7 0 0 0 4.8 0L20 7.5Z" />
    </>
  ),
  /* Confidentiality. */
  lock: (
    <>
      <rect x="4.4" y="10.2" width="15.2" height="10.4" rx="0.5" />
      <path d="M8 10.2V7.5a4 4 0 0 1 8 0v2.7" />
      <path d="M12 14v3" />
    </>
  ),
  /* Clear scope. */
  ruler: (
    <>
      <path d="m3 16.2 13.2-13.2 4.8 4.8L7.8 21 3 16.2Z" />
      <path d="m7.2 12 2.1 2.1M10.5 8.7l2.1 2.1M13.8 5.4l2.1 2.1" />
    </>
  ),
  /* Readiness and performance. */
  gauge: (
    <>
      <path d="M3.4 18a9 9 0 1 1 17.2 0" />
      <path d="m12 13.8 4-4.4" />
      <circle cx="12" cy="15.4" r="1.6" />
    </>
  ),
  /* Regions served. */
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 9.6h17.6M3.2 14.4h17.6" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </>
  ),
  /* Document control / revisions. */
  layers: (
    <>
      <path d="m12 3 8.6 4.4L12 11.8 3.4 7.4 12 3Z" />
      <path d="m3.4 12 8.6 4.4 8.6-4.4" />
      <path d="m3.4 16.6 8.6 4.4 8.6-4.4" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
