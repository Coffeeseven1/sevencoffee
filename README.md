# SEVEN Cafe & Games V9 — Admin Password + Math CAPTCHA

- `/admin` requires the Cloudflare Worker Secret `ADMIN_PASSWORD` and redirects unauthenticated visitors to `/admin/login`.
- Login includes a random arithmetic CAPTCHA. The answer is encrypted in a short-lived token and is not sent to the browser in plain text.
- Successful login creates an 8-hour signed `HttpOnly; Secure; SameSite=Strict` cookie session.
- The admin screen includes a secure logout button.

## Deploy
1. Cloudflare Workers & Pages → `sevencoffee` → Settings → Variables and Secrets: ensure `ADMIN_PASSWORD` is set as a **Secret** for **Production**. Never commit the password to GitHub.
2. Keep `wrangler.toml`, `src/`, and `public/` together. Deploy with `npx wrangler deploy`.
3. Visit `/admin`, enter the exact Secret value and solve the math question.

Product data and uploaded photos remain in browser localStorage in this version, so they are not shared between devices. For production hardening, add Cloudflare rate limiting to `/api/admin/login` and a shared database/API for menu data.
