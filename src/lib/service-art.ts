import type { IconName } from "@/components/icons";
import type { MediaKey } from "./media";
import type { serviceKeys } from "./routes";

type ServiceKey = (typeof serviceKeys)[number];

/**
 * The photograph and the icon that stand for each service, declared once.
 *
 * They appear on the homepage grid, the services index and the related-services
 * strip at the foot of every service page; keeping them here is what stops
 * auditing being a clipboard in one place and a magnifier in another.
 */
export const serviceArt: Record<ServiceKey, MediaKey> = {
  software: "codeScreen",
  certitrack: "analytics",
  auditing: "engineerHelmet",
  inspection: "factoryCheck",
  investigations: "welding",
};

export const serviceIcons: Record<ServiceKey, IconName> = {
  software: "code",
  certitrack: "certificate",
  auditing: "clipboard",
  inspection: "inspect",
  investigations: "alert",
};
