/**
 * Service for Google Sheets and Google Drive integration
 * Manages the apprentice induction log spreadsheet in the user's Google Drive.
 */

import { LearnerProfile } from '../types/induction';

export interface SyncedApprenticeRow {
  registroId: string;
  fecha: string;
  documento: string;
  nombre: string;
  ficha: string;
  programa: string;
  nivel: string;
  centro: string;
  regional: string;
  modulos: string;
  porcentaje: string;
  estado: string;
  normativa: string;
}

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink: string;
}

const SPREADSHEET_TITLE = 'Registro de Inducción SENA 2026';
const SHEET_TAB_NAME = 'Aprendices Inducción';

const HEADERS = [
  'ID Registro',
  'Fecha y Hora',
  'Documento de Identidad',
  'Nombre Completo del Aprendiz',
  'Número de Ficha',
  'Programa de Formación',
  'Nivel Formativo',
  'Centro de Formación',
  'Regional SENA',
  'Módulos Completados',
  'Porcentaje de Avance',
  'Estado de Inducción',
  'Normativa Aplicada'
];

/**
 * Searches for an existing induction spreadsheet or creates a new one in the user's Google Drive.
 */
export async function getOrCreateInductionSpreadsheet(accessToken: string): Promise<SpreadsheetInfo> {
  // 1. Search for existing spreadsheet in Drive
  try {
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(SPREADSHEET_TITLE)}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id,name,webViewLink)`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.files && searchData.files.length > 0) {
        const file = searchData.files[0];
        return {
          id: file.id,
          name: file.name,
          webViewLink: file.webViewLink || `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
        };
      }
    }
  } catch (err) {
    console.warn('Error checking existing file in Drive, proceeding to create:', err);
  }

  // 2. Create new Google Sheets spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: SHEET_TAB_NAME,
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Error al crear la hoja de cálculo en Drive: ${errorText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const webViewLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 3. Populate header row with formatted styling
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_TAB_NAME)}!A1:M1?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [HEADERS],
      }),
    });
  } catch (headerErr) {
    console.error('Error setting headers on new sheet:', headerErr);
  }

  return {
    id: spreadsheetId,
    name: SPREADSHEET_TITLE,
    webViewLink,
  };
}

/**
 * Appends an apprentice's induction completion record to the Google Sheet.
 */
export async function appendLearnerToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  profile: LearnerProfile,
  completedCount: number,
  totalCount: number
): Promise<SyncedApprenticeRow> {
  const now = new Date();
  const fechaStr = now.toLocaleString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const percent = Math.round((completedCount / totalCount) * 100);
  const estado = completedCount >= totalCount ? 'Inducción Concluida y Aprobada' : 'En Proceso Formativo';
  const registroId = `SENA-${profile.fichaNumber}-${profile.documentNumber.slice(-4)}-${now.getTime().toString().slice(-4)}`;

  const newRow: SyncedApprenticeRow = {
    registroId,
    fecha: fechaStr,
    documento: profile.documentNumber,
    nombre: profile.fullName,
    ficha: profile.fichaNumber,
    programa: profile.programName,
    nivel: profile.programType,
    centro: profile.centerName,
    regional: profile.regional,
    modulos: `${completedCount} de ${totalCount}`,
    porcentaje: `${percent}%`,
    estado,
    normativa: 'Acuerdo 0009 de 2024 (Consejo Directivo Nacional)',
  };

  const valuesPayload = [
    [
      newRow.registroId,
      newRow.fecha,
      newRow.documento,
      newRow.nombre,
      newRow.ficha,
      newRow.programa,
      newRow.nivel,
      newRow.centro,
      newRow.regional,
      newRow.modulos,
      newRow.porcentaje,
      newRow.estado,
      newRow.normativa,
    ],
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_TAB_NAME)}!A:M:append?valueInputOption=USER_ENTERED`;
  const res = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: valuesPayload,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al registrar fila en Google Sheets: ${errorText}`);
  }

  return newRow;
}

/**
 * Reads existing rows from the Google Sheet.
 */
export async function readLearnersFromSpreadsheet(
  accessToken: string,
  spreadsheetId: string
): Promise<SyncedApprenticeRow[]> {
  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(SHEET_TAB_NAME)}!A2:M`;
  const res = await fetch(readUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  if (!data.values || data.values.length === 0) {
    return [];
  }

  return data.values.map((row: string[]) => ({
    registroId: row[0] || '',
    fecha: row[1] || '',
    documento: row[2] || '',
    nombre: row[3] || '',
    ficha: row[4] || '',
    programa: row[5] || '',
    nivel: row[6] || '',
    centro: row[7] || '',
    regional: row[8] || '',
    modulos: row[9] || '',
    porcentaje: row[10] || '',
    estado: row[11] || '',
    normativa: row[12] || '',
  }));
}
