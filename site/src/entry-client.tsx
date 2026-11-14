import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/layout.css";
import { App } from "./App";
import { routes } from "./routes.gen";

export function findRoute(pathname: string) {
  // /rfq/index.html is the same page as /rfq/ (the server 301s it, but never show the 404 page for it)
  const q = pathname.replace(/\/index\.html$/, "/");
  const p = q.endsWith("/") || q.endsWith(".html") ? q : q + "/";
  return routes.find((r) => r.path === p) ?? routes.find((r) => r.name === "404")!;
}

async function start() {
  const route = findRoute(location.pathname);
  const { default: Page } = await route.load();
  const root = document.getElementById("root")!;
  const app = <App route={route} Page={Page} />;
  if (root.firstElementChild) hydrateRoot(root, app);
  else {
    // dev server: no pre-rendered HTML, render on the client
    document.title = route.title;
    if (route.bodyClass) document.body.className = route.bodyClass;
    createRoot(root).render(app);
  }
}
start();
