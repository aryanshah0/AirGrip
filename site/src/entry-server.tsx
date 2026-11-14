// Used only at build time by scripts/prerender.mjs: renders one route to static HTML.
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { routes } from "./routes.gen";

export { routes };

export async function render(path: string): Promise<string> {
  const route = routes.find((r) => r.path === path);
  if (!route) throw new Error("no route " + path);
  const { default: Page } = await route.load();
  return renderToString(<App route={route} Page={Page} />);
}
