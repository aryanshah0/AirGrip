# AirGrip website

The website of AirGrip, Jamnagar (India): brass components made to drawing, plus a standard range of brass cable
glands and accessories.

| Branch | Environment | URL | Deployed |
|---|---|---|---|
| `develop` | Dev | https://aryanshah0.github.io/AirGrip/ | automatically on every push (not indexed, no analytics, forms send nothing) |
| `main` | Prod | https://airgrip.co.in | on push or merge, after checks and a one-click approval in GitHub |

Changes go to `develop` first; `main` only accepts commits that passed CI. Details: [`docs/BUILD.md`](docs/BUILD.md).

| Folder | What |
|---|---|
| `site/` | The website: React 19 + Vite + TypeScript, every page pre-rendered to static HTML; PHP form sender in `site/public/api/` |
| `site/tools/` | Checks (buyer flows, accessibility, live server, visual diff), share-image and drawing generators |
| `docs/` | Build and deploy (`BUILD.md`), design system, copy style, SEO plan |

Quick start: `cd site && npm install && npm run dev` (http://127.0.0.1:5175). `npm run build` makes the production
site in `site/dist/` and runs every check; `npm run build:dev` makes the dev copy in `site/dist-dev/`.
