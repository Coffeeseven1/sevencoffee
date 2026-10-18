# SEVEN Cafe & Games V11 — Espresso Subcategories

- در پنل مدیریت، با انتخاب بخش «منوی کافه» گزینه «اسپرسو» به دسته‌ها اضافه شده است.
- برای اسپرسو، نوع سرو «تک/دوبل» و ترکیب «80/20، 70/30، 90/10، 50/50، 100» قابل انتخاب است.
- هر ترکیب را به‌صورت یک محصول جدا با نام، قیمت و تصویر ذخیره کنید.
- در سایت مشتری، داخل «نوشیدنی گرم» یک کارت جدا برای «اسپرسو» نمایش داده می‌شود. با کلیک، اول تک/دوبل و سپس ترکیب قهوه انتخاب می‌شود و قیمت ثبت‌شده نشان داده می‌شود.
- قابلیت‌های قبلی Worker login/CAPTCHA و بازی‌ها حفظ شده‌اند.

## Deploy
همه فایل‌ها را با حفظ ساختار در مخزن قرار بده و از پوشه‌ای که `wrangler.toml` دارد `npx wrangler deploy` اجرا کن.

## نکته ذخیره‌سازی
اطلاعات منو همچنان در localStorage همان مرورگر ذخیره می‌شود؛ برای مشترک شدن قیمت‌ها بین دستگاه‌ها به پایگاه داده مشترک نیاز است.


## V12 footer credit
# SEVEN Cafe & Games V12 — Footer credit

Added footer text: «طراحی و توسعه توسط Abolfazl». Clicking Abolfazl opens https://abolfazlwebsite.ir/ in a new tab with `noopener noreferrer`.

The footer update is included in both `index.html` and `public/index.html`, with styling in both CSS copies. Existing features and Worker configuration are preserved.

Deploy from the folder containing `wrangler.toml` using `npx wrangler deploy`.


## V13 category descriptions
- نوشیدنی گرم: هدیه ای گرم برای خودت
- دسر: کامت رو شیرین کن
- غذا: خودت رو شارژ کن
- توضیح نوشیدنی سرد عمداً بدون تغییر باقی مانده است.
