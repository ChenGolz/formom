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


---

# תיקון V5 — כפתור קול משפחתי ושמירת הקלטות

בגרסה זו תוקנו שני דברים:

## כפתור קול משפחתי
הכפתור העליון `🎙️ קול משפחתי` הוא עכשיו גם קישור אמיתי, לא רק JavaScript.
אם JavaScript של הכפתור נתקע, הקישור עדיין פותח:
`mode=backoffice&tab=voice`

בדיקה:
`Ctrl+U` ולחפש:
`TOP_VOICE_LINK_FIX_V5`

## שמירת הקלטות
שמירת הקלטות ל-Google Drive עוברת עכשיו דרך טופס נסתר ל-Apps Script.
זה יציב יותר מול redirect/CORS של Google.

חשוב מאוד:
צריך לעדכן Apps Script עם הקוד החדש:
`apps-script/Code.gs`

ואז:
Deploy → Manage deployments → Edit → New version → Deploy

בדיקה ב-Apps Script:
לחפש בקוד:
`FORM_PAYLOAD_FIX_V5`


---

# תיקון V6 — השמעת הקלטות Drive

בגרסה זו כפתור `השמעה לבדיקה` כבר לא מנסה לטעון את קובץ הקול דרך Apps Script כ-Base64.
במקום זה הוא משתמש בקישור ישיר לקובץ Google Drive:

```txt
https://drive.google.com/uc?export=download&id=FILE_ID
```

בנוסף, מיד אחרי הקלטה נשמר עותק זמני מקומי בדפדפן, כך שאפשר לבדוק את ההקלטה גם לפני שהסנכרון חזר מהענן.

צריך להעלות את הקבצים החדשים וגם לעדכן Apps Script עם `apps-script/Code.gs`, ואז:
Deploy → Manage deployments → Edit → New version → Deploy

בדיקה באתר:
Ctrl+U ולחפש:
`DRIVE_PLAYBACK_FIX_V6`


---

# תיקון V7 — שגיאת drive: ERR_UNKNOWN_URL_SCHEME

אם בקונסול הופיעה שגיאה כמו:

```txt
Failed to load resource: drive:...
ERR_UNKNOWN_URL_SCHEME
```

זה אומר שהדפדפן קיבל `drive:FILE_ID` במקום URL אמיתי.

בגרסה זו כל `drive:FILE_ID` מומר לפני ההשמעה לכתובת תקינה:

```txt
https://drive.google.com/uc?export=download&id=FILE_ID
```

בדיקה באתר:
Ctrl+U ולחפש:
`DRIVE_URL_SCHEME_FIX_V7`


---

# תיקיית Drive מוגדרת מראש להקלטות

בגרסה זו תיקיית ברירת המחדל להקלטות היא:

```txt
https://drive.google.com/drive/folders/1q861AukKjnvhTPYz0BG1bL8bh9MGoJH_?usp=drive_link
```

Folder ID:

```txt
1q861AukKjnvhTPYz0BG1bL8bh9MGoJH_
```

ב-Backoffice → קול משפחתי נוסף כפתור:

```txt
פתיחת תיקיית ההקלטות בדרייב
```

חשוב: התיקייה צריכה להיות משותפת עם חשבון Google שמריץ את Apps Script, כלומר החשבון שבחרת בו ב-Deploy כ-Execute as: Me.


---

# תיקון V9 — כפתור קול משפחתי בתפריט העליון

בגרסה זו כפתור `🎙️ קול משפחתי` עושה ניווט קשיח של הדפדפן לכתובת:

```txt
?board=...&mode=backoffice&tab=voice
```

כך גם אם המעבר הפנימי נתקע, הדף נטען מחדש ישירות בלשונית קול משפחתי.

בדיקה:
`Ctrl+U` ולחפש:
`TOP_VOICE_HARD_FIX_V9`

בגלל Service Worker, אחרי העלאה מומלץ לפתוח פעם אחת ב-Incognito או לנקות cache לאתר.
