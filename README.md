# SEVEN Cafe & Games — V5 fixed for Cloudflare Workers

## Fix for deployment error
The Pages `_redirects` file was removed because its wildcard rule triggered an infinite-loop error in the deployment flow. This project is configured for Cloudflare Workers static assets using `wrangler.toml` and SPA fallback, so `/admin` can serve `index.html` without `_redirects`.

## Files
- `index.html` — site UI
- `css/style.css` — styles
- `js/script.js` — menu and admin behavior
- `assets/images/` — local SVG artwork
- `wrangler.toml` — Cloudflare Workers static assets configuration

## Deploy
Deploy from this directory using Wrangler (`npx wrangler deploy`) or use the same Worker deployment flow configured to read this `wrangler.toml`. Keep the folder structure intact. The configured worker name is `sevencoffee`; change it if your existing Worker has a different name.

## Important limitations
The `/admin` path is not authentication. This front-end-only version stores data in browser `localStorage`; it does not sync across devices. Add server-side authentication and a database before using it for real admin access.
