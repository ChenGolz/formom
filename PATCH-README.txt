Patch ל-V24 Security — Access Key Manager

להחליף ב-GitHub:
boindex.html

ולהחליף ב-Apps Script:
apps-script/Code.gs

אחרי החלפת Code.gs:
Deploy → Manage deployments → Edit → New version → Deploy

מה נוסף:
- במסך הניהול נוסף אזור “מפתח גישה משפחתי”.
- אפשר לראות את המפתח הנוכחי.
- אפשר להעתיק את המפתח.
- אפשר ליצור מפתח חדש.
- יצירת מפתח חדש מעדכנת גם את Apps Script, כלומר ה-hash בשרת מתחלף.
- אחרי יצירת מפתח חדש צריך לשלוח מחדש את הקישורים למשפחה.

למה זה חשוב:
אם localStorage נמחק בדפדפן מסוים, אפשר לפתוח שוב את הקישור המקורי.
אם רוצים להחליף גישה למשפחה, אפשר ליצור מפתח חדש.

בדיקה:
Ctrl+U לחפש:
V24_ACCESS_KEY_MANAGER_PATCH_BOINDEX

ב-Code.gs לחפש:
V24_ACCESS_KEY_MANAGER_PATCH_APPS_SCRIPT
