# השעון המשפחתי — גרסה מלאה

גרסה זו כוללת:

- קישור אחד למשפחה.
- תצוגת מטופל/ת רגועה.
- Backoffice לניהול.
- קול משפחתי מוקלט.
- שמירת הקלטות ב-Google Drive במקום Google Sheets.
- בחירה אם לשמור הקלטות בדרייב של מנהלת האתר או בתיקיית Drive משותפת של המשפחה.
- קישור לפלייליסט YouTube.
- תמונות משפחה בהעלאה פשוטה מהמחשב/טלפון.
- PWA: manifest + service worker + אייקונים.
- מזג אוויר לפי עיר/יישוב המטופל/ת.
- רקע עדין ומרגיע, לא תמונות עמוסות.

## חשוב מאוד אחרי העלאה

צריך להעלות ל-GitHub:

```txt
index.html
patient.html
backoffice/index.html
manifest.json
sw.js
favicon.ico
icons/
assets/
README.md
```

## חשוב מאוד ב-Google Apps Script

כדי שהקלטות יישמרו ב-Google Drive, חייבים לעדכן את Apps Script:

1. לפתוח את Google Sheet.
2. Extensions → Apps Script.
3. להחליף את כל הקוד בקובץ:
   `apps-script/Code.gs`
4. ללחוץ Save.
5. Deploy → Manage deployments → Edit.
6. לבחור New version.
7. ללחוץ Deploy.

## שמירת הקלטות

ב-Backoffice → קול משפחתי:

אפשר לבחור:

```txt
בדרייב של מנהלת האתר — הכי קל
```

או:

```txt
בתיקיית Drive משותפת של המשפחה
```

אם בוחרים תיקייה משפחתית:
1. המשפחה יוצרת תיקייה ב-Google Drive.
2. משתפת אותה עם חשבון Google של מנהלת האתר.
3. מדביקה ב-Backoffice את הקישור לתיקייה או את ה-Folder ID.

## פלייליסט YouTube

ב-Backoffice → הגדרות חכמות:

אפשר להדביק קישור לפלייליסט YouTube, למשל:

```txt
https://www.youtube.com/playlist?list=...
```

במסך המטופל/ת יופיע כפתור מוזיקה פשוט.

## רקעים מרגיעים

נוסף רקע עדין מאוד ב-SVG. לא הוספתי תמונות מפורטות או מתחלפות מאחורי טקסט, כי אצל חולי שכחה רקע עמוס עלול לבלבל ולהפחית קריאות. עדיף רקע שקט, בהיר, קבוע ועדין.

## בדיקת גרסה

באתר עצמו אפשר ללחוץ Ctrl+U ולחפש:

```txt
FULL_VOICE_FIX_V4
```

וב-Apps Script החדש יש:

```txt
saveAudio
קבצי_קול
```
