#!/usr/bin/env bash
# Build, check and upload the site to airgrip.co.in (Hostinger), then check the live server.
#   cd site && ./scripts/deploy.sh
# Needs an SSH host alias "airgrip-hostinger" in ~/.ssh/config (host, port, user and key stay on the deploying
# machine, never in this public repo). The previous public_html is kept in ~/backups/ on the server.
set -euo pipefail
cd "$(dirname "$0")/.."
HOST=airgrip-hostinger
WEB=domains/airgrip.co.in/public_html

npm ci --silent
npm run build
node scripts/check-dist.mjs --launch

stamp=$(date -u +%Y%m%d-%H%M%S)
ssh -o BatchMode=yes "$HOST" "mkdir -p backups && tar -czf backups/public_html-$stamp.tgz -C $WEB . && ls -1t backups/public_html-*.tgz | tail -n +6 | xargs -r rm -f"
rsync -az --delete --exclude .vite -e "ssh -o BatchMode=yes" dist/ "$HOST:$WEB/"
node tools/server-check.mjs https://airgrip.co.in
echo "Deployed. Previous version: ~/backups/public_html-$stamp.tgz on the server."
