import { useEffect, type ComponentType } from "react";
import { Layout } from "./components/Layout";
import { enhance } from "./lib/enhance";
import { trackLinks } from "./lib/analytics";
import type { RouteDef } from "./lib/types";

// Pages with "+ Add" buttons get the sticky quote bar (as in the design).
const QUOTE_BAR = new Set(["product", "clamping-jaw", "favorit", "accessory", "thread-adapters", "stop-plugs", "earth-tags", "conduit-parts"]);

export function App({ route, Page }: { route: RouteDef; Page: ComponentType }) {
  useEffect(() => {
    enhance();
    trackLinks();
  }, []);
  return (
    <Layout nav={route.nav} quoteBar={QUOTE_BAR.has(route.name)} consent={route.name !== "rfq-thanks"}>
      <Page />
    </Layout>
  );
}
