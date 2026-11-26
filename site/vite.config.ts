import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Local stand-in for the form endpoint (dev server and `npm run preview` only, never deployed): accepts the multipart POST and answers OK, so the quote and contact
// forms can be tried end to end locally. Production uses VITE_FORM_ENDPOINT (see docs/BUILD.md).
function mockForm(): Plugin {
  return {
    name: "airgrip-mock-form",
    configurePreviewServer(server) { server.middlewares.use("/api/form", handler(server.config.logger)); },
    configureServer(server) { server.middlewares.use("/api/form", handler(server.config.logger)); },
  };
  function handler(logger: { info: (m: string) => void }) {
    return (req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) => {
        if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
        let size = 0;
        req.on("data", (c: Buffer) => { size += c.length; });
        req.on("end", () => {
          logger.info(`[mock form] received ${(size / 1024).toFixed(1)} kB`);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        });
    };
  }
}

// Dev copy on GitHub Pages (npm run build:dev): the site is served from a sub-folder (AG_BASE=/AirGrip/), so every
// root-relative href/src in the JSX gets that prefix (src/lib/jsx-base.ts). The production build (AG_BASE unset) uses
// React's own JSX runtime and is unchanged.
const BASE = process.env.AG_BASE || "/";

export default defineConfig({
  base: BASE,
  plugins: [react(BASE === "/" ? {} : { jsxImportSource: "ag-base" }), mockForm()],
  resolve: BASE === "/" ? {} : {
    alias: {
      "ag-base/jsx-runtime": path.resolve(__dirname, "src/lib/jsx-base.ts"),
      "ag-base/jsx-dev-runtime": path.resolve(__dirname, "src/lib/jsx-base.ts"),
    },
  },
  build: { manifest: true, sourcemap: false, cssCodeSplit: true },
  server: { port: 5175, host: "127.0.0.1" },
});
