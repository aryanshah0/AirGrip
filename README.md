# AirGrip website

The website of AirGrip, Jamnagar (India): brass components made to drawing, plus a standard range of brass cable
glands and accessories.

| Environment | URL | Updated by |
|---|---|---|
| Prod | https://airgrip.co.in | `cd site && ./scripts/deploy.sh` (by hand, after checking dev) |
| Dev | https://aryanshah0.github.io/AirGrip/ | GitHub Actions on every push to `main` (not indexed, no analytics, forms send nothing) |

| Folder | What |
|---|---|
| `site/` | The website: React 19 + Vite + TypeScript, every page pre-rendered to static HTML; PHP form sender in `site/public/api/` |
| `site/tools/` | Checks (buyer flows, accessibility, live server, visual diff), share-image and drawing generators |
| `docs/` | Build and deploy (`BUILD.md`), design system, copy style, SEO plan |

Quick start: `cd site && npm install && npm run dev` (http://127.0.0.1:5175). `npm run build` makes the production
site in `site/dist/` and runs every check; `npm run build:dev` makes the dev copy in `site/dist-dev/`.
Details: [`docs/BUILD.md`](docs/BUILD.md).
