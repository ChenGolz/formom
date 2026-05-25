Patch ל-V24 — Best Final Patch

להחליף ב-GitHub רק את הקבצים האלה:
1. index.html
2. boindex.html
3. patient.html
4. sw.js

מה הפאץ׳ מתקן:
- sw.js: CORE_FILES כולל רק קבצים שקיימים בשורש, כולל boindex.html, בלי backoffice ובלי קובץ עברי.
- boindex.html: Service Worker נרשם עם ./sw.js בלבד.
- index.html: הניהול נטען דרך ./boindex.html וה-URL של הדפדפן מתעדכן עם history.pushState.
- patient.html: Fade עדין לתמונות הזיכרון / שומר המסך.
- boindex.html: תיקיית Drive מנוסחת כאופציונלית, כדי שהחבר/ה יצטרכו בעיקר Apps Script URL.

אחרי העלאה:
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
ואז לפתוח מחדש.

בדיקות:
Ctrl+U ולחפש:
V24_BEST_FINAL_PATCH_INDEX
V24_BEST_FINAL_PATCH_BOINDEX
V24_BEST_FINAL_PATCH_PATIENT

בקובץ sw.js לחפש:
V24_BEST_FINAL_PATCH_SW
