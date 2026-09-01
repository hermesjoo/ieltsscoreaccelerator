# IELTS Score Accelerator — Platform v2 Implementation Plan

> **For Hermes:** Execute phase-by-phase; each phase = separate commits + push after user approval.
> **Date:** 2026-08-31 · **Status:** awaiting user go

**Goal:** تبدیل سایت استاتیک IELTS به پلتفرم آموزشی کامل — پکیج‌های ویدیویی قفل‌شده، آزمون‌های واژگان/گرامر/تعیین‌سطح/mock، پروفایل کاربری با آنالیتیکس، چت‌روم، تصحیح Writing (AI رایگان + انسانی پولی)، پرداخت کریپتو، کتابخانهٔ E-book، بلاگ اخبار.

**Architecture:** سایت استاتیک (همان HTML/CSS/JS فعلی، dark theme) + **Supabase** (auth موجود + جدول‌های جدید + Realtime برای چت) + **Flask API سبک** روی همین سرور (تستی؛ بعداً VPS کاربر) برای: امضای ویدیو، پروکسی AI تصحیح، وب‌هوک/تأیید پرداخت، آپلود ادمین.

**Tech Stack:** vanilla JS + Chart.js (آنالیتیکس) + Supabase JS v2 + Flask + empero glm-5.3-flash (AI رایگان موجود) + USDT-TRC20 (پرداخت).

---

## تصمیم‌های معماری (با گزینه‌ها — انتخاب پیش‌فرض ⭐)

### ۱. میزبانی ویدیو پکیج‌ها (گزینه‌ها)
| گزینه | هزینه | محافظت | سختی |
|---|---|---|---|
| ⭐ **فاز تستی: سلف‌هاست** روی سرور (لینک امضاشدهٔ ۱ساعته + referer check + بدون دکمهٔ دانلود) | ۰ | متوسط | کم |
| **Bunny Stream** (پس از VPS) — token auth + embed-only + domain lock + watermark ایمیل کاربر + DRM (Widevine) آپشن | ~$1/50GB | بالا | کم |
| Vimeo Pro — domain lock | ~$20/mo | بالا | کم |
| YouTube unlisted | ۰ | ❌ ضعیف | صفر |

⚠️ صادقانه: هیچ پلیری ۱۰۰٪ ضد دانلود نیست (هرچی نمایش داده بشه ضبط میشه). محافظت واقعی = DRM (Bunny) + watermark per-user. لینک خام هرگز تو کد نمیاد.

### ۲. پرداخت کریپتو (گزینه‌ها)
| گزینه | KYC | ایران | کارمزد |
|---|---|---|---|
| ⭐ **کیف پول مستقیم USDT-TRC20 + تأیید** — سفارش با مبلغ یکتا (مثلاً 4.97$)، کاربر txid میفرستد، تو در ادمین تأیید میکنی (بعداً خودکار با Tronscan API) | ❌ | ✅ | صفر |
| NOWPayments — KYC دارد، احتمال رد ایران | ✅ | ❌ احتمالاً | ~0.5% |
| BTCPay self-host | ❌ | ✅ | صفر ولی نگهداری سنگین |
| Coinbase Commerce | ✅ | ❌ | ~1% |

### ۳. چت‌روم و Speaking Partners (گزینه‌ها)
- ⭐ **A (MVP): Supabase Realtime** — اتاق‌ها داخل خود سایت، بدون زیرساخت جدید، VIP = چک عضویت، مودریشن از ادمین.
- B: افزودن اتاق صوتی WebRTC — نیاز به TURN server، پیچیده؛ فاز بعدی.
- C: فقط لینک گروه تلگرام/دیسکورد — ساده‌ترین، ولی خارج از سایت.

### ۴. تصحیح Writing (تأیید شده توسط کاربر)
- **AI: کاملاً رایگان** — پروکسی از طریق Flask API → empero glm-5.3-flash (رایگان موجود در پروژه دیتا). خروجی: band estimate + نقاط ضعف + پیشنهاد.
- **انسانی: خود کاربر** در **صف تصحیح ادمین** — دیدن متن، دادن نمرهٔ ۴مهارته و **کامنت پولی** (کاربر اول سفارش+پرداخت، بعد انسانی مینویسد).

### ۵. محتوا و کپی‌رایت آزمون‌ها
- **هیچ متریالی** از Cambridge/ETS/Pearson/GMAC کپی نمیشود — من آزمون‌های **اورجینال در فرمت رسمی** تولید میکنم (فرمت قابل کپی‌رایت نیست، متن است).
- منبع هر آزمون در جدول ثبت میشود (content_provenance).
- پاساژهای Reading: نوشتهٔ اورجینال دربارهٔ موضوعات عمومی آکادمیک (ترافیک، اکولوژی، تاریخ علم و…).

---

## مدل داده (Supabase — جدول‌های جدید)

```sql
packages(id, level A1|A2|B1|B2, title, description, video_ids[], price, is_published)
videos(id, package_id, title, file_path, duration, is_free_preview)
vq_banks(id, skill vocab|grammar, level, items jsonb)           -- آزمون واژگان/گرامر
placement_results(id, user_id, exam general|ielts, score, level, details jsonb, created_at)
mock_results(id, user_id, exam ielts, L,R,W,S scores, total, details jsonb, created_at)
writing_submissions(id, user_id, task, text, ai_analysis jsonb, human_score, human_comments, status pending_ai|ai_done|paid|human_done, order_id)
chat_rooms(id, name, is_vip, description)
chat_messages(id, room_id, user_id, text, created_at)           -- Realtime
orders(id, user_id, item_type package|ebook|writing_review, item_id, amount_usdt, unique_cents, txid, status waiting_tx|verifying|paid|rejected, created_at)
ebooks(id, title, description, cover, file_path, price, is_free)
news(id, slug, title, body_md, published_at, tags[])
profiles_ext(user_id, vip_until, streak_days, stats jsonb)      -- آنالیتیکس aggregate
```

Storage buckets: `videos/` (private), `ebooks/` (free public / paid gated), `covers/`.

---

## فازها

### فاز A — زیرساخت تستی (سرور فعلی)
- [ ] A1. Flask `ielts_api.py` (:8878) — CORS, /health, BasicAuth admin، تانل اختصاصی
- [ ] A2. مایگریشن SQL جدول‌ها در Supabase (اعمال دستی یا via SQL editor — کاربر اجرا کند)
- [ ] A3. `js/site-config.js` — ایمیل‌ها، تلفن، شبکه‌های اجتماعی، آدرس API (تک نقطهٔ ویرایش)
- [ ] A4. درست‌کردن footer همهٔ صفحات: Contact / About / Library / News / Packages

### فاز B — صفحات محتوایی (بدون بک‌اند سنگین)
- [ ] B1. `pages/contact.html` — support@ieltsacc.org، تلفن placeholder، Instagram/LinkedIn/Facebook
- [ ] B2. `pages/about.html` — bio و «Why IELTS Score Accelerator»
- [ ] B3. `pages/packages.html` — کارت‌های A1-A2-B1-B2 + سکشن **Coming Soon** (TOEFL/PTE/GRE/E-books)
- [ ] B4. `pages/vocabulary.html` — تست واژگان: بانک ۳ سطح، MCQ + معنی، نتیجه سطح‌بندی‌شده
- [ ] B5. `pages/grammar.html` — تست گرامر: ۲۵۰+ سوال اورجینال در ۱۲ تاپیک (tense, articles, conditionals…)
- [ ] B6. `pages/placement.html` — تعیین سطح عمومی A1-B2 (۲۵ سوال adaptive سبک → سطح + توصیه پکیج)
- [ ] B7. `pages/library.html` — E-books رایگان (دانلود مستقیم) + E-books/books پولی (دکمهٔ خرید → فاز G)
- [ ] B8. `pages/news.html` — بلاگ اخبار آزمون‌ها (لیست + صفحهٔ پست؛ محتوا اولیه: ۵ پست اورجینال)

### فاز C — پکیج‌های ویدیویی + قفل
- [ ] C1. آپلود تستی ۲-۳ ویدیو کوتاه به Supabase Storage (private bucket)
- [ ] C2. `pages/package.html?id=` — پلیر با URL امضاشده از API (TTL 1h)، بدون دانلود، watermark ایمیل کاربر روی ویدیو (overlay CSS)
- [ ] C3. ادمین: فرم آپلود ویدیو + ساخت پکیج (همان «برای آپلود چیزهایی که لازم دارم»)
- [ ] C4. Paywall سبک: پیش‌نمایش رایگان ۲ دقیقه اول، ادامه فقط با خرید (یا باز، تا تصمیم قیمتی)

### فاز D — Mock IELTS کامل
- [ ] D1. `pages/mock.html` — ۴ مهارت با تایمر واقعی (L:30m, R:60m, W:60m, S:11-14m ضبط صدا)
- [ ] D2. بانک آزمون اورجینال (۱ آزمون کامل، بعداً بیشتر) در vq_banks
- [ ] D3. تصحیح خودکار L/R + ذخیرهٔ نتیجه + band رسمی mapping (جدول موجود از listening را تعمیم بده)
- [ ] D4. Writing mock → به صف AI/انسانی (فاز F) وصل میشود

### فاز E — پروفایل + آنالیتیکس
- [ ] E1. Chart.js در dashboard — نمودار: تاریخچهٔ نمرات (line)، مهارت‌ها (radar)، فعالیت هفتگی (bar)، streak
- [ ] E2. ثبت خودکار همهٔ نتایج (vocab/grammar/placement/mock) در جدول‌ها
- [ ] E3. ادمین: جدول کاربران + تعداد آزمون + میانگین + درآمد + اشتراک VIP

### فاز F — Writing Analysis
- [ ] F1. `pages/writing-check.html` — ورود متن Task1/Task2 → AI band + feedback (رایگان، بدون سقف)
- [ ] F2. API: `/api/writing/ai` — پروکسی empero (کلید فقط سمت سرور)
- [ ] F3. سفارش تصحیح انسانی (پولی) → order → صف ادمین → تو نمره+کامنت میدهی → کاربر در پروفایلش میبیند

### فاز G — پرداخت کریپتو (wallet مستقیم)
- [ ] G1. آدرس TRC20 در site-config + صفحهٔ checkout (مبلغ یکتا + QR)
- [ ] G2. کاربر txid ثبت میکند → ادمین تأیید/رد میکند → دسترسی خودکار باز میشود
- [ ] G3. (بعداً) تأیید خودکار با Tronscan API polling

### فاز H — چت‌روم + VIP Partners
- [ ] H1. `pages/chat.html` — اتاق‌ها: General / Find Partner / Exam Q&A (Supabase Realtime)
- [ ] H2. مودریشن: rate limit، report دکمه، بن در ادمین
- [ ] H3. اتاق VIP (سطح بالا): دسترسی با پرداخت/سطح placement بالای B2 + بِج سطح تأییدشده + برد scheduling

### فاز I — پروداکشن (بعداً، با VPS کاربر + دامنه)
- [ ] انتقال API به VPS + دامنه + HTTPS + Bunny Stream + ایمیل واقعی (Zoho/Cloudflare routing)
- [ ] CDN برای فایل‌های استاتیک یا نگه‌داشتن GitHub Pages

---

## Risks / Trade-offs
1. **سرور تستی = پهنای باند کم** — ویدیو تستی فقط ۲-۳ کلیپ کوتاه؛ پروداکشن حتماً Bunny.
2. **Supabase free tier** — Realtime محدودیت اتصال همزمان دارد؛ برای چت MVP کافی است.
3. **AI رایگان (empero) گاهی down است** → fallback: surplus glm-5.2 (موجود) — همان زنجیرهٔ پروژهٔ دیتا.
4. **پرداخت دستی** — تا وقتی تأیید خودکار نیامده، تأخیر تأیید تا چند ساعت طبیعی است (در UI اطلاع داده شود).
5. GitHub Pages فقط استاتیک است — هر قابلیتی که API میخواهد باید با `API_BASE` از site-config به سرور اشاره کند.

## Open Questions → پیش‌فرض‌ها (کاربر میتواند عوض کند)
- قیمت پکیج‌ها/review انسانی: placeholder در site-config؛ خودت بعداً ست میکنی.
- Paywall ویدیو: فاز C پیش‌نمایش ۲ دقیقه + ادامه آزاد (تا تصمیم قیمت) ⭐ قابل تغییر به full-lock.
- نام دامنهٔ نهایی: بعداً (domain مال کاربر).
