/**
 * לוח בית חכם למחלות שכחה — Google Sheets backend
 * --------------------------------------------------
 * מדביקים את כל הקובץ הזה בתוך Google Apps Script שמחובר ל-Google Sheet.
 *
 * איך מתקינים:
 * 1. פותחים Google Sheet חדש.
 * 2. Extensions > Apps Script.
 * 3. מוחקים את הקוד הקיים ומדביקים את הקובץ הזה.
 * 4. Save.
 * 5. Deploy > New deployment > Web app.
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. מעתיקים את Web App URL ומדביקים ב-index.html וב-backoffice/index.html:
 *    const OWNER_APPS_SCRIPT_URL="..."
 */

const BOARDS_SHEET = 'לוחות';
const LOG_SHEET = 'לוג';
const READABLE_PREFIX = 'טבלה_';

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = params.action || 'load';
  const callback = params.callback || '';

  let result;
  try {
    if (action === 'load') {
      result = loadBoard_(params.board || 'grandma-home-board');
    } else if (action === 'health') {
      result = { ok: true, message: 'החיבור תקין', time: new Date().toISOString() };
    } else {
      result = { ok: false, error: 'פעולה לא מוכרת' };
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message ? err.message : err) };
  }

  return output_(result, callback);
}

function doPost(e) {
  let result;
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const body = JSON.parse(raw);

    if (body.action === 'save') {
      result = saveBoard_(body.boardId || body.board || 'grandma-home-board', body.value || {});
    } else {
      result = { ok: false, error: 'פעולה לא מוכרת' };
    }
  } catch (err) {
    result = { ok: false, error: String(err && err.message ? err.message : err) };
  }

  return output_(result, '');
}

function output_(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error('הסקריפט חייב להיות מחובר ל-Google Sheet. פתחי Google Sheet ואז Extensions > Apps Script.');
  }
  return ss;
}

function getOrCreateSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (headers && headers.length) {
    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const isEmpty = firstRow.every(v => !v);
    if (isEmpty) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.autoResizeColumns(1, headers.length);
    }
  }

  return sheet;
}

function ensureSheets_() {
  getOrCreateSheet_(BOARDS_SHEET, ['board_id', 'json', 'updated_at']);
  getOrCreateSheet_(LOG_SHEET, ['time', 'board_id', 'action', 'note']);
}

function loadBoard_(boardId) {
  ensureSheets_();
  const sheet = getOrCreateSheet_(BOARDS_SHEET, ['board_id', 'json', 'updated_at']);
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(boardId)) {
      const json = values[i][1] || '{}';
      let value = {};
      try {
        value = JSON.parse(json);
      } catch (err) {
        value = {};
      }
      return {
        ok: true,
        exists: true,
        boardId: boardId,
        value: value,
        updated_at: values[i][2] || ''
      };
    }
  }

  return {
    ok: true,
    exists: false,
    boardId: boardId,
    value: null,
    updated_at: ''
  };
}

function saveBoard_(boardId, value) {
  ensureSheets_();
  const sheet = getOrCreateSheet_(BOARDS_SHEET, ['board_id', 'json', 'updated_at']);
  const values = sheet.getDataRange().getValues();
  const json = JSON.stringify(value || {});
  const now = new Date();

  let row = -1;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(boardId)) {
      row = i + 1;
      break;
    }
  }

  if (row === -1) {
    row = sheet.getLastRow() + 1;
  }

  sheet.getRange(row, 1, 1, 3).setValues([[boardId, json, now]]);
  writeReadableSheets_(boardId, value || {});
  log_(boardId, 'save', 'נשמר מהלוח/Backoffice');

  return {
    ok: true,
    boardId: boardId,
    updated_at: now.toISOString()
  };
}

/**
 * יוצר גם טבלאות קריאות בתוך הגוגל שיט.
 * העריכה המומלצת עדיין דרך ה-Backoffice, אבל כך אפשר לראות את הנתונים בצורה נוחה.
 */
function writeReadableSheets_(boardId, data) {
  writeKeyValue_(READABLE_PREFIX + 'פרופיל', boardId, data.person || {}, [
    ['stage', data.stage || ''],
    ['firstName', data.person && data.person.firstName || ''],
    ['fullName', data.person && data.person.fullName || ''],
    ['address', data.person && data.person.address || ''],
    ['city', data.person && data.person.city || ''],
    ['safeMessage', data.person && data.person.safeMessage || ''],
    ['identityNote', data.person && data.person.identityNote || ''],
    ['calmingTips', data.person && data.person.calmingTips || ''],
    ['riskNotes', data.person && data.person.riskNotes || '']
  ]);

  writeArray_(READABLE_PREFIX + 'שגרה', boardId, data.schedule || [], ['id', 'time', 'text', 'image', 'days', 'forPatient', 'done']);
  writeArray_(READABLE_PREFIX + 'טלפונים', boardId, data.contacts || [], ['id', 'relation', 'name', 'phone', 'note', 'photo', 'videoLink']);
  writeArray_(READABLE_PREFIX + 'משפחה', boardId, data.family || [], ['id', 'relation', 'name', 'city', 'note', 'emoji', 'photo']);
  writeArray_(READABLE_PREFIX + 'תרופות', boardId, data.medications || [], ['id', 'time', 'name', 'dose', 'instructions', 'taken', 'givenBy', 'notes']);
  writeArray_(READABLE_PREFIX + 'יומן', boardId, data.symptoms || [], ['id', 'date', 'time', 'type', 'what', 'before', 'helped']);
  writeArray_(READABLE_PREFIX + 'חודשי', boardId, data.monthly || [], ['id', 'date', 'title']);
}

function writeKeyValue_(sheetName, boardId, obj, rows) {
  const sheet = getOrCreateSheet_(sheetName, ['board_id', 'field', 'value']);
  removeBoardRows_(sheet, boardId);
  if (!rows || !rows.length) return;
  const output = rows.map(r => [boardId, r[0], stringifyCell_(r[1])]);
  sheet.getRange(sheet.getLastRow() + 1, 1, output.length, 3).setValues(output);
  sheet.autoResizeColumns(1, 3);
}

function writeArray_(sheetName, boardId, arr, fields) {
  const headers = ['board_id'].concat(fields);
  const sheet = getOrCreateSheet_(sheetName, headers);
  removeBoardRows_(sheet, boardId);
  if (!arr || !arr.length) return;

  const output = arr.map(item => {
    return [boardId].concat(fields.map(f => stringifyCell_(item && item[f])));
  });

  sheet.getRange(sheet.getLastRow() + 1, 1, output.length, headers.length).setValues(output);
  sheet.autoResizeColumns(1, headers.length);
}

function removeBoardRows_(sheet, boardId) {
  const last = sheet.getLastRow();
  if (last <= 1) return;

  const values = sheet.getRange(2, 1, last - 1, 1).getValues();
  for (let i = values.length - 1; i >= 0; i--) {
    if (String(values[i][0]) === String(boardId)) {
      sheet.deleteRow(i + 2);
    }
  }
}

function stringifyCell_(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.join(',');
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function log_(boardId, action, note) {
  const sheet = getOrCreateSheet_(LOG_SHEET, ['time', 'board_id', 'action', 'note']);
  sheet.appendRow([new Date(), boardId, action, note || '']);
}

/**
 * תפריט נוח בתוך Google Sheets.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('לוח בית חכם')
    .addItem('הכנת גיליונות', 'ensureSheets_')
    .addItem('בדיקת חיבור', 'showHealth_')
    .addToUi();
}

function showHealth_() {
  SpreadsheetApp.getUi().alert('הכול תקין. עכשיו צריך לפרוס כ-Web App ולהעתיק את ה-URL.');
}
