Patch ל-V24 — Performance + Accessibility

להחליף ב-GitHub רק:
index.html
boindex.html
patient.html
sw.js

תיקונים:
- sw.js נקי ל-PWA + cache אופציונלי להקלטות Drive אחרי שהושמעו אונליין.
- boindex.html משתמש ב-./sw.js בלבד.
- index.html טוען ניהול דרך ./boindex.html ומעדכן URL עם history.pushState.
- patient.html מצמצם full render כל שנייה, מוסיף fade לתמונות, aria-live להודעות משפחה, רקע פחות רועש ו-passive flash מיידי.

אחרי העלאה:
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
ואז לפתוח מחדש.

בדיקות:
Ctrl+U:
V24_PERFORMANCE_ACCESSIBILITY_PATCH_INDEX
V24_PERFORMANCE_ACCESSIBILITY_PATCH_BOINDEX
V24_PERFORMANCE_ACCESSIBILITY_PATCH_PATIENT
וב-sw.js:
V24_PERFORMANCE_ACCESSIBILITY_PATCH_SW
