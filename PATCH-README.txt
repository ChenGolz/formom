Patch ל-V24 Security — Fragment Key + Missing Key UX

להחליף ב-GitHub רק:
index.html
boindex.html
patient.html

אין צורך לשנות Code.gs אם כבר העלית את Security Access Key Patch הקודם.

מה השתנה:
- קישורים חדשים משתמשים ב-#key=... במקום ?key=...
- האתר קורא את המפתח מה-hash, שומר אותו ב-localStorage, ואז מנקה את ה-hash מהכתובת עם history.replaceState.
- ה-?board=... נשאר בכתובת כדי ש-refresh ימשיך לדעת איזה לוח לטעון.
- אם localStorage נמחק ואין key, מופיעה הודעה עדינה שמבקשת לפתוח שוב את הקישור המקורי או להדביק מפתח ידנית.
- כדי לא לשבור לוחות ישנים, עדיין יש תמיכה גם ב-?key=... אם קיים.

בדיקה:
Ctrl+U לחפש:
V24_SECURITY_FRAGMENT_KEY_UX_PATCH_INDEX
V24_SECURITY_FRAGMENT_KEY_UX_PATCH_BOINDEX
V24_SECURITY_FRAGMENT_KEY_UX_PATCH_PATIENT

בדיקה ידנית:
1. ליצור לוח חדש.
2. לוודא שהקישור נראה בערך:
   ?board=...#key=...
3. לפתוח אותו.
4. לוודא שהכתובת מתנקה ל:
   ?board=...
5. לוודא שהלוח עדיין נטען.
