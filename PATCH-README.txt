Patch ל-V24 — Security Access Key Foundation

להחליף ב-GitHub:
index.html
patient.html
boindex.html

ולהחליף ב-Apps Script:
apps-script/Code.gs

אחרי החלפת Code.gs:
Deploy → Manage deployments → Edit → New version → Deploy

מה הפאץ׳ עושה:
- מוסיף access key משפחתי לקישורים החדשים.
- ה-key נשמר בפרמטר הקישור כ-key=...
- Apps Script שומר hash של המפתח בגיליון חדש: לוחות_אבטחה.
- אחרי שלוח נרשם עם key, קריאה בלי key או עם key שגוי נחסמת.
- לוחות ישנים בלי key עדיין עובדים כדי לא לשבור משפחות קיימות; השמירה הראשונה עם key מפעילה הגנה.
- קריאות load/audio/save/saveAudio/deleteAudio שולחות את המפתח.
- תוקן גם כפילות const קטנה ב-Code.gs.

חשוב:
זה לא התחברות משתמשים מלאה ולא מחליף הרשאות Google אמיתיות.
זה כן משפר משמעותית את המצב לעומת board_id בלבד.

לגבי פירוק styles.css/main.js:
זה ריפקטור גדול יותר ועדיף לעשות אותו כ-V25, לא כ-patch קטן, כדי לא לשבור את הלוח שעובד עכשיו.

בדיקה:
Ctrl+U לחפש:
V24_SECURITY_ACCESS_KEY_PATCH_INDEX
V24_SECURITY_ACCESS_KEY_PATCH_BOINDEX
V24_SECURITY_ACCESS_KEY_PATCH_PATIENT

ב-Code.gs לחפש:
V24_SECURITY_ACCESS_KEY_PATCH_APPS_SCRIPT
