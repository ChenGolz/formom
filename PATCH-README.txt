Patch ל-V24 — Mobile UX Polish

להחליף ב-GitHub רק:
index.html
boindex.html
patient.html
sw.js

מה נכנס:
- Responsiveness: מניעת גלילה אופקית, התאמות למסכים קטנים, טקסט שלא נשפך.
- Tap targets: כפתורים/קישורים בגודל נוח למגע.
- Typography: Assistant נטען דרך Google Fonts, fallback בטוח.
- Contrast + dark mode: תמיכה ב-prefers-color-scheme, ומצב תאורה קטן ב-Backoffice.
- Micro-interactions: מעברים עדינים לכפתורים וכרטיסים.
- Sharing: meta tags ל-WhatsApp/social preview + theme-color.
- Patient view: טיפוגרפיה גדולה יותר במובייל, fade לתמונות, אלמנטים שלא נשברים במסך קטן.
- sw.js: cache-first + network update, CORE_FILES נקי, ו-cache אופציונלי להקלטות Drive.

אחרי העלאה:
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
ואז לפתוח מחדש.

בדיקה:
Ctrl+U ולחפש:
V24_MOBILE_UX_POLISH_INDEX
V24_MOBILE_UX_POLISH_BOINDEX
V24_MOBILE_UX_POLISH_PATIENT

בקובץ sw.js:
V24_BEST_POSSIBLE_PATCH_SW
