/**
 * AI Malaysia Takeover university leaderboard endpoint.
 *
 * Add this file to the Apps Script project attached to the Google Form's
 * response spreadsheet, then deploy it as a web app.
 */

const CONFIG = {
  responseSheetName: "Form Responses 1",
  personalEmailHeader: "Personal Email",
  studentEmailHeader: "Student Email",
  universityHeader: "Which university are you from?",
  universities: [
    "Universiti Malaya (UM)",
    "Taylor's University",
    "Sunway University",
    "Monash University Malaysia",
    "Asia Pacific University (APU)",
    "Multimedia University (MMU)",
    "Universiti Teknologi MARA (UiTM)",
    "Universiti Sains Malaysia (USM)",
    "Universiti Tunku Abdul Rahman (UTAR)",
  ],
};

function doGet() {
  try {
    const payload = buildLeaderboard_();
    return ContentService.createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: String(error && error.message ? error.message : error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function buildLeaderboard_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(CONFIG.responseSheetName);
  if (!sheet) throw new Error(`Sheet not found: ${CONFIG.responseSheetName}`);

  const values = sheet.getDataRange().getDisplayValues();
  if (values.length === 0) throw new Error("The response sheet is empty");

  const headers = values[0].map((header) => header.trim());
  const personalEmailIndex = findHeader_(headers, CONFIG.personalEmailHeader);
  const studentEmailIndex = findHeader_(headers, CONFIG.studentEmailHeader);
  const universityIndex = findHeader_(headers, CONFIG.universityHeader);

  const canonicalNames = new Map(
    CONFIG.universities.map((name) => [normalize_(name), name]),
  );
  const counts = new Map(CONFIG.universities.map((name) => [name, 0]));
  const seenEmails = new Set();

  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const row = values[rowIndex];
    const email = normalizeEmail_(
      row[studentEmailIndex] || row[personalEmailIndex],
    );
    const rawUniversity = String(row[universityIndex] || "").trim();

    if (!email || !rawUniversity || seenEmails.has(email)) continue;
    seenEmails.add(email);

    const normalizedUniversity = normalize_(rawUniversity);
    const university = canonicalNames.get(normalizedUniversity) || rawUniversity;
    canonicalNames.set(normalizedUniversity, university);
    counts.set(university, (counts.get(university) || 0) + 1);
  }

  const universities = Array.from(counts.keys()).map((name) => ({
    name,
    signups: counts.get(name),
  }));

  universities.sort(
    (a, b) => b.signups - a.signups || a.name.localeCompare(b.name),
  );

  return {
    updatedAt: new Date().toISOString(),
    universities,
  };
}

function findHeader_(headers, expectedHeader) {
  const index = headers.findIndex(
    (header) => normalize_(header) === normalize_(expectedHeader),
  );
  if (index === -1) throw new Error(`Column not found: ${expectedHeader}`);
  return index;
}

function normalize_(value) {
  return String(value || "")
    .normalize("NFKC")
    .trim()
    .toLocaleLowerCase("en");
}

function normalizeEmail_(value) {
  return normalize_(value).replace(/\s+/g, "");
}
