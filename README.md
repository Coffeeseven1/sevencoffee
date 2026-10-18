# SEVEN Cafe & Games V9.2 — Admin route fix

## Fix for `/admin/login` showing the unstyled customer homepage
Cloudflare's SPA asset fallback was serving `public/index.html` before the Worker handled `/admin/login`. The `run_worker_first` setting now routes `/admin`, `/admin/*`, and `/api/*` through `src/index.js` first.

## Deploy the Worker configuration, not only static files
1. Extract this ZIP.
2. Open a terminal in this exact extracted folder. It must directly contain `wrangler.toml`, `src/index.js`, and `public/`.
3. Run `npx wrangler deploy`.
4. Confirm the deploy output names Worker `sevencoffee` and succeeds.
5. Confirm the Production Secret `ADMIN_PASSWORD` exists on this same Worker.
6. Open `https://sevencoffee.coffeeseven.workers.dev/admin/login`. Expected: branded login form, password field, and random math question.
7. If it still shows the homepage, Cloudflare is deploying a different Worker or only static assets. Confirm the deployment is for the `sevencoffee` Worker URL and that `wrangler.toml` is used.

## Config
- `main = "src/index.js"` is required so the Worker script runs.
- Assets directory is `./public`, binding is `ASSETS`.
- `run_worker_first` prevents SPA fallback from bypassing protected admin/API routes.
- Keep `ADMIN_PASSWORD` as a Cloudflare Secret; never hardcode it.

Menu data remains browser-local; shared data across devices requires a database.
