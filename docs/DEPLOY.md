# SEVEN Cafe & Games V9.1 — Admin login route fix

IMPORTANT: This ZIP is FLAT. `wrangler.toml`, `src/`, and `public/` are directly at the ZIP root. Do NOT upload the outer folder as a nested directory in your repository.

## Why /admin/login showed the customer homepage
That page indicates the deployed Worker did not run the new login-routing code, and/or Cloudflare deployed the wrong directory as static assets. The login HTML is `public/admin-login.html`; `src/index.js` must be the Worker entrypoint.

## Deploy correctly
1. Extract this ZIP.
2. Open the extracted folder. Confirm these are directly inside it: `wrangler.toml`, `src/index.js`, `public/index.html`, `public/admin-login.html`.
3. Open a terminal in that exact folder and run: `npx wrangler deploy`
4. Make sure Wrangler reports deployment of Worker `sevencoffee`.
5. In Cloudflare dashboard, confirm this is the same Worker whose URL is `https://sevencoffee.coffeeseven.workers.dev`.
6. Confirm the Production Secret `ADMIN_PASSWORD` is set on that Worker.
7. Open `https://sevencoffee.coffeeseven.workers.dev/admin/login`. You should see the login form, not the cafe homepage.

If you deploy from Git integration rather than Wrangler CLI, set the root directory to the folder containing `wrangler.toml`, and configure the build/deploy command to use Wrangler. Do not deploy only the `public` directory as an assets-only site.

## Security behavior
- `/admin` requires a valid signed session and redirects to `/admin/login`.
- `/api/admin/login` verifies the ADMIN_PASSWORD Secret and a short-lived encrypted random arithmetic CAPTCHA.
- Successful login sets an HttpOnly, Secure, SameSite=Strict cookie for 8 hours.
- Existing menu data remains browser-local; this login does not create shared storage.
