import type { ComponentType } from "react";

export interface RouteDef {
  name: string;          // design file name (home, glands, …)
  path: string;          // site URL, always with a trailing slash ("/404" is the error page)
  title: string;
  description: string;
  nav: string;           // header item marked as current
  bodyClass: string;
  noindex: boolean;
  file: string;          // page module, used to find its CSS and JS in the build manifest
  load: () => Promise<{ default: ComponentType }>;
}
