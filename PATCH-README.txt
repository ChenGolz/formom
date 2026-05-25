Patch ל-V24 — final PWA/router

להחליף ב-GitHub רק את הקבצים האלה:
1. index.html
2. boindex.html
3. sw.js

מה הפאץ׳ מתקן:
- sw.js: CORE_FILES כולל רק קבצים שקיימים בשורש, כולל boindex.html, בלי backoffice ובלי קובץ עברי.
- boindex.html: Service Worker נרשם עם ./sw.js בלבד.
- index.html: הניווט מעדכן את URL הדפדפן עם history.pushState, והניהול נטען דרך ./boindex.html.

אחרי העלאה:
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
ואז לפתוח מחדש.

בדיקות:
Ctrl+U ולחפש:
V24_FINAL_PWA_ROUTER_PATCH_INDEX
V24_FINAL_PWA_ROUTER_PATCH_BOINDEX

בקובץ sw.js לחפש:
V24_FINAL_PWA_ROUTER_PATCH_SW
