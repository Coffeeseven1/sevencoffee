# SEVEN Cafe & Games — Cloudflare Workers Fix

## ساختار
- `wrangler.toml`: پیکربندی Worker همراه با Assets binding
- `src/index.js`: اسکریپت Worker؛ مسیر `/admin` را به `index.html` سرو می‌کند
- `public/index.html`: صفحه اصلی سایت
- `public/css/style.css`: استایل‌ها
- `public/js/script.js`: عملکرد سایت و پنل مدیریت
- `public/assets/images/`: تصاویر محلی

## انتشار
از ریشه این پوشه اجرا کن:

```bash
npx wrangler deploy
```

این پروژه اکنون یک Worker script واقعی دارد و دیگر از حالت assets-only Worker با binding استفاده نمی‌کند. فایل `_redirects` حذف شده تا خطای حلقه بی‌نهایت Pages ایجاد نشود.

## مسیرها
- `/` صفحه مشتری
- `/admin` پنل مدیریت

**امنیت:** مسیر `/admin` فقط مسیر پنل را باز می‌کند و به‌تنهایی ورود امن نیست. قبل از استفاده واقعی باید احراز هویت مدیر و ذخیره‌سازی سمت سرور اضافه شود. داده‌های فعلی localStorage مرورگر هستند و بین دستگاه‌ها همگام نمی‌شوند.
