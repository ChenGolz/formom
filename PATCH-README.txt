Patch ל-V24 — Hotfix tabs + manifest

להחליף ב-GitHub רק:
boindex.html
sw.js

מה תוקן:
- ב-boindex.html נוספה מחדש הפונקציה tabs(), כי render() קרא לה והיא הייתה חסרה.
- תוקן manifest path:
  ../manifest.json -> ./manifest.json
  כדי שלא ינסה לטעון https://chengolz.github.io/manifest.json
- sw.js קיבל CACHE_NAME חדש כדי לשבור cache ישן.

אחרי העלאה:
F12 → Application → Service Workers → Unregister
Application → Storage → Clear site data
ואז לפתוח מחדש.

בדיקה:
Ctrl+U ולחפש:
V24_HOTFIX_TABS_MANIFEST_BOINDEX

וב-sw.js:
V24_HOTFIX_TABS_MANIFEST_SW
