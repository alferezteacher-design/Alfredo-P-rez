import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  RefreshCw,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Building,
  Hash,
  Award,
  Search,
  Check,
  FolderOpen
} from 'lucide-react';
import { User } from 'firebase/auth';
import { LearnerProfile } from '../types/induction';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken,
  setAccessTokenInMemory
} from '../services/googleAuth';
import {
  getOrCreateInductionSpreadsheet,
  appendLearnerToSpreadsheet,
  readLearnersFromSpreadsheet,
  SpreadsheetInfo,
  SyncedApprenticeRow
} from '../services/googleSheetsService';

interface DriveSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnerProfile: LearnerProfile;
  completedModulesCount: number;
  totalModulesCount: number;
}

export const DriveSheetSyncModal: React.FC<DriveSheetSyncModalProps> = ({
  isOpen,
  onClose,
  learnerProfile,
  completedModulesCount,
  totalModulesCount,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(false);
  const [spreadsheetInfo, setSpreadsheetInfo] = useState<SpreadsheetInfo | null>(null);
  const [records, setRecords] = useState<SyncedApprenticeRow[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'drive' | 'local'>('local');
  const [localSubmissions, setLocalSubmissions] = useState<any[]>([]);

  // Load local submissions from localStorage
  const loadLocalSubmissions = () => {
    try {
      const saved = localStorage.getItem('sena_local_submissions');
      setLocalSubmissions(saved ? JSON.parse(saved) : []);
    } catch (err) {
      console.error('Error loading local submissions:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLocalSubmissions();
    }
  }, [isOpen]);

  const handleSyncSingleLocalRow = async (row: any) => {
    if (!token || !spreadsheetInfo) {
      setErrorMessage('Primero debes conectarte con Google en la sección de arriba.');
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const profileMock: LearnerProfile = {
        fullName: row.nombre,
        documentNumber: row.documento,
        fichaNumber: row.ficha,
        programName: row.programa,
        programType: row.nivel,
        centerName: row.centro,
        regional: row.regional,
        startedAt: row.startedAt || '',
      };

      const [compStr, totStr] = row.modulos.split(' de ');
      const comp = parseInt(compStr) || 0;
      const tot = parseInt(totStr) || 5;

      const newSyncedRow = await appendLearnerToSpreadsheet(
        token,
        spreadsheetInfo.id,
        profileMock,
        comp,
        tot
      );

      // Mark as synced in local array and storage
      const updated = localSubmissions.map(s => {
        if (s.documento === row.documento) {
          return { ...s, synced: true };
        }
        return s;
      });
      localStorage.setItem('sena_local_submissions', JSON.stringify(updated));
      setLocalSubmissions(updated);

      setRecords(prev => [newSyncedRow, ...prev]);
      setSuccessMessage(`¡Registro de ${row.nombre} sincronizado con éxito!`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al sincronizar el registro.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSyncAllLocalRows = async () => {
    if (!token || !spreadsheetInfo) {
      setErrorMessage('Primero debes conectarte con Google en la sección de arriba.');
      return;
    }
    const unsynced = localSubmissions.filter(s => !s.synced);
    if (unsynced.length === 0) {
      setSuccessMessage('No hay registros locales pendientes por sincronizar.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    let successCount = 0;
    const updatedSubmissions = [...localSubmissions];

    try {
      for (const row of unsynced) {
        try {
          const profileMock: LearnerProfile = {
            fullName: row.nombre,
            documentNumber: row.documento,
            fichaNumber: row.ficha,
            programName: row.programa,
            programType: row.nivel,
            centerName: row.centro,
            regional: row.regional,
            startedAt: row.startedAt || '',
          };

          const [compStr, totStr] = row.modulos.split(' de ');
          const comp = parseInt(compStr) || 0;
          const tot = parseInt(totStr) || 5;

          await appendLearnerToSpreadsheet(
            token,
            spreadsheetInfo.id,
            profileMock,
            comp,
            tot
          );

          // Mark as synced
          const idx = updatedSubmissions.findIndex(s => s.documento === row.documento);
          if (idx !== -1) {
            updatedSubmissions[idx].synced = true;
          }
          successCount++;
        } catch (individualErr) {
          console.error(`Error syncing row for ${row.nombre}:`, individualErr);
        }
      }

      localStorage.setItem('sena_local_submissions', JSON.stringify(updatedSubmissions));
      setLocalSubmissions(updatedSubmissions);

      // Reload spreadsheet data
      const rows = await readLearnersFromSpreadsheet(token, spreadsheetInfo.id);
      setRecords(rows);

      if (successCount > 0) {
        setSuccessMessage(`Se sincronizaron con éxito ${successCount} registros a tu Google Drive.`);
      } else {
        setErrorMessage('Ocurrieron errores al sincronizar los registros.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error general en la sincronización masiva.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setAccessTokenInMemory(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setAccessTokenInMemory(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // When token is available, get or create the spreadsheet and load records
  useEffect(() => {
    if (token && isOpen) {
      loadSpreadsheetAndData(token);
    }
  }, [token, isOpen]);

  const loadSpreadsheetAndData = async (accessToken: string) => {
    setIsLoadingRecords(true);
    setErrorMessage(null);
    try {
      const sheet = await getOrCreateInductionSpreadsheet(accessToken);
      setSpreadsheetInfo(sheet);
      const rows = await readLearnersFromSpreadsheet(accessToken, sheet.id);
      setRecords(rows);
    } catch (err: any) {
      console.error('Error loading Google Sheet:', err);
      setErrorMessage(err.message || 'No se pudo conectar con Google Sheets');
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleGoogleConnect = async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadSpreadsheetAndData(result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setErrorMessage('No se completó la autenticación con Google. Por favor, intenta de nuevo.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await logoutGoogle();
      setUser(null);
      setToken(null);
      setSpreadsheetInfo(null);
      setRecords([]);
      setSuccessMessage(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Trigger confirmation dialog for recording apprentice
  const handleInitiateSync = () => {
    if (!token || !spreadsheetInfo) {
      setErrorMessage('Primero debes conectarte con Google para registrar en Drive.');
      return;
    }
    setShowConfirmDialog(true);
  };

  // Execute append operation upon explicit user confirmation
  const handleConfirmSync = async () => {
    if (!token || !spreadsheetInfo) return;
    setShowConfirmDialog(false);
    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const newRow = await appendLearnerToSpreadsheet(
        token,
        spreadsheetInfo.id,
        learnerProfile,
        completedModulesCount,
        totalModulesCount
      );

      setRecords(prev => [newRow, ...prev]);
      setSuccessMessage(`¡Aprendiz ${learnerProfile.fullName} registrado con éxito en tu Google Drive!`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error('Error syncing row:', err);
      setErrorMessage(err.message || 'Ocurrió un error al guardar el registro en Google Sheets.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter(r =>
    r.nombre.toLowerCase().includes(searchFilter.toLowerCase()) ||
    r.documento.includes(searchFilter) ||
    r.ficha.includes(searchFilter) ||
    r.programa.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center border border-emerald-300 dark:border-emerald-800 shrink-0">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#267701] dark:text-[#48cf00] font-bold">
                <span>Google Workspace Integration</span>
                <span aria-hidden="true">·</span>
                <span>Google Sheets & Drive</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Libro de Calificaciones & Registro de Inducción
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Connection Status Banner */}
          {!user ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 dark:from-slate-850 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 dark:text-[#48cf00] font-semibold">
                  <FolderOpen className="w-4 h-4" />
                  <span>Almacenamiento en la Nube de Google Drive</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Conecta tu cuenta de Google para crear tu hoja de cálculo
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                  Crea y actualiza automáticamente el archivo <strong>"Registro de Inducción SENA 2026"</strong> en tu propio Google Drive para auditar a los aprendices matriculados y sus evidencias.
                </p>
              </div>

              {/* Official Google Sign-In Styled Button */}
              <button
                onClick={handleGoogleConnect}
                disabled={isConnecting}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shadow-xs transition-all shrink-0 hover:shadow-md cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isConnecting ? 'Conectando...' : 'Conectar con Google'}</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Google User'} className="w-10 h-10 rounded-full border border-emerald-400" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{user.displayName || 'Usuario Google'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-[#48cf00] font-semibold">
                      Conectado
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {spreadsheetInfo && (
                  <a
                    href={spreadsheetInfo.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold bg-white dark:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Abrir en Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={handleDisconnect}
                  className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Desconectar cuenta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-900 dark:text-red-200 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Synchronize Current Apprentice Action Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="text-[10px] font-mono text-emerald-800 dark:text-[#48cf00] uppercase font-bold">
                  Aprendiz en Sesión Activa
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {learnerProfile.fullName}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  Doc: {learnerProfile.documentNumber} · Ficha: {learnerProfile.fichaNumber} · {learnerProfile.regional}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Avance: {completedModulesCount}/{totalModulesCount} Módulos
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {Math.round((completedModulesCount / totalModulesCount) * 100)}% Completado
                  </div>
                </div>

                <button
                  onClick={handleInitiateSync}
                  disabled={!user || isProcessing}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] disabled:bg-slate-300 dark:disabled:bg-slate-700 rounded-lg shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isProcessing ? 'Registrando fila...' : 'Registrar Aprendiz en Drive'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Programa:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{learnerProfile.programName}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Nivel:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{learnerProfile.programType}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Centro:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{learnerProfile.centerName}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Normativa:</span>
                <span className="font-semibold text-emerald-800 dark:text-[#48cf00]">Acuerdo 0009 de 2024</span>
              </div>
            </div>
          </div>

          {/* Selector de Bases de Datos */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('local')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg text-center transition-all cursor-pointer ${
                activeTab === 'local'
                  ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              📊 Base de Datos de la Máquina (Kiosk Local: {localSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('drive')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg text-center transition-all cursor-pointer ${
                activeTab === 'drive'
                  ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              ☁️ Libro de Calificaciones en Drive (Google Sheets: {records.length})
            </button>
          </div>

          {/* TAB 1: Base de Datos de la Máquina (Local) */}
          {activeTab === 'local' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Registros de Pruebas Recibidas en este Dispositivo
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Historial de respuestas de aprendices guardado de forma segura en local. Los aprendices NO pueden ver el archivo Drive.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {user && localSubmissions.some(s => !s.synced) && (
                    <button
                      onClick={handleSyncAllLocalRows}
                      disabled={isProcessing}
                      className="px-3 py-1.5 bg-[#39A900] hover:bg-[#329200] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                      <span>Sincronizar Pendientes ({localSubmissions.filter(s => !s.synced).length})</span>
                    </button>
                  )}

                  <div className="relative min-w-[180px]">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filtrar local..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#39A900]"
                    />
                  </div>
                </div>
              </div>

              {/* Local Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-[300px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 text-[10px] font-mono text-slate-600 dark:text-slate-300 uppercase">
                      <tr>
                        <th className="p-3 font-semibold">Fecha y Hora</th>
                        <th className="p-3 font-semibold">Aprendiz</th>
                        <th className="p-3 font-semibold">Documento</th>
                        <th className="p-3 font-semibold">Ficha</th>
                        <th className="p-3 font-semibold">Programa / Regional</th>
                        <th className="p-3 font-semibold">Avance</th>
                        <th className="p-3 font-semibold">Sincronizado</th>
                        <th className="p-3 font-semibold text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {localSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-400">
                            Aún no hay respuestas guardadas localmente en este navegador. Las pruebas de los aprendices aparecerán aquí automáticamente.
                          </td>
                        </tr>
                      ) : (
                        localSubmissions
                          .filter(row =>
                            row.nombre.toLowerCase().includes(searchFilter.toLowerCase()) ||
                            row.documento.includes(searchFilter) ||
                            row.ficha.includes(searchFilter)
                          )
                          .map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                              <td className="p-3 whitespace-nowrap font-mono text-[11px] text-slate-500">{row.fecha}</td>
                              <td className="p-3 font-bold whitespace-nowrap">{row.nombre}</td>
                              <td className="p-3 font-mono">{row.documento}</td>
                              <td className="p-3 font-mono">{row.ficha}</td>
                              <td className="p-3 max-w-[160px] truncate" title={`${row.programa} - ${row.regional}`}>
                                <span className="font-semibold block truncate">{row.programa}</span>
                                <span className="text-[10px] text-slate-400 block truncate">{row.regional}</span>
                              </td>
                              <td className="p-3 font-mono font-bold text-emerald-700 dark:text-[#48cf00]">{row.porcentaje}</td>
                              <td className="p-3 whitespace-nowrap">
                                {row.synced ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#48cf00] border border-emerald-200 dark:border-emerald-800">
                                    <Check className="w-3 h-3" /> Sí, en Drive
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                    Pendiente
                                  </span>
                                )}
                              </td>
                              <td className="p-3 whitespace-nowrap text-center">
                                {row.synced ? (
                                  <span className="text-slate-400 text-xs">Sincronizado</span>
                                ) : (
                                  <button
                                    onClick={() => handleSyncSingleLocalRow(row)}
                                    disabled={!user || isProcessing}
                                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#39A900] dark:bg-emerald-950/30 dark:hover:bg-emerald-950/60 text-xs font-semibold rounded-md border border-emerald-200 dark:border-emerald-850 cursor-pointer disabled:opacity-50"
                                  >
                                    Subir a Sheets
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Libro de Calificaciones en Google Sheets (Online) */}
          {activeTab === 'drive' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    Historial de Aprendices en la Hoja de Drive ({records.length})
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {spreadsheetInfo ? `Archivo: ${spreadsheetInfo.name} · Pestaña: Aprendices Inducción` : 'Conecta con Google para visualizar los registros.'}
                  </div>
                </div>

                {user && (
                  <div className="flex items-center gap-2">
                    <div className="relative min-w-[200px]">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, doc o ficha..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    <button
                      onClick={() => token && loadSpreadsheetAndData(token)}
                      disabled={isLoadingRecords}
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Actualizar datos de Google Sheets"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingRecords ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto max-h-[300px]">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 text-[10px] font-mono text-slate-600 dark:text-slate-300 uppercase">
                      <tr>
                        <th className="p-3 font-semibold">ID Registro</th>
                        <th className="p-3 font-semibold">Fecha</th>
                        <th className="p-3 font-semibold">Aprendiz</th>
                        <th className="p-3 font-semibold">Documento</th>
                        <th className="p-3 font-semibold">Ficha</th>
                        <th className="p-3 font-semibold">Programa</th>
                        <th className="p-3 font-semibold">Regional</th>
                        <th className="p-3 font-semibold">Avance</th>
                        <th className="p-3 font-semibold">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {!user ? (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-400">
                            Inicia sesión con Google para consultar y gestionar el libro de calificaciones en Google Sheets.
                          </td>
                        </tr>
                      ) : isLoadingRecords ? (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-400">
                            <RefreshCw className="w-5 h-5 mx-auto animate-spin mb-2 text-[#39A900]" />
                            Cargando datos desde Google Drive...
                          </td>
                        </tr>
                      ) : filteredRecords.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-400">
                            Aún no hay registros en la hoja de cálculo. Haz clic en "Registrar Aprendiz en Drive" para guardar el primer registro.
                          </td>
                        </tr>
                      ) : (
                        filteredRecords.map((r, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="p-3 font-mono text-[10px] text-slate-500 whitespace-nowrap">{r.registroId}</td>
                            <td className="p-3 whitespace-nowrap font-mono text-[11px] text-slate-500">{r.fecha}</td>
                            <td className="p-3 font-bold whitespace-nowrap">{r.nombre}</td>
                            <td className="p-3 font-mono">{r.documento}</td>
                            <td className="p-3 font-mono">{r.ficha}</td>
                            <td className="p-3 max-w-[180px] truncate" title={r.programa}>{r.programa}</td>
                            <td className="p-3 whitespace-nowrap">{r.regional}</td>
                            <td className="p-3 font-mono font-semibold text-emerald-700 dark:text-[#48cf00]">{r.porcentaje}</td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-[#48cf00] border border-emerald-200 dark:border-emerald-800">
                                {r.estado}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39A900] dark:text-[#48cf00]" />
            <span>Datos protegidos con autenticación oficial de Google Workspace</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cerrar Panel
          </button>
        </div>

      </div>

      {/* USER CONFIRMATION DIALOG (Mandatory for mutating operations on Drive) */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in zoom-in-95">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                ¿Confirmar registro en tu Google Drive?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Se agregará una nueva fila a la hoja de cálculo <strong>"{spreadsheetInfo?.name}"</strong> con los siguientes datos del aprendiz:
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Aprendiz:</span>
                <span className="font-bold text-slate-900 dark:text-white">{learnerProfile.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Documento:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{learnerProfile.documentNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Ficha:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{learnerProfile.fichaNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Avance:</span>
                <span className="font-bold text-emerald-700 dark:text-[#48cf00]">
                  {completedModulesCount}/{totalModulesCount} ({Math.round((completedModulesCount / totalModulesCount) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-mono">Normativa:</span>
                <span className="text-slate-700 dark:text-slate-300">Acuerdo 0009 de 2024</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSync}
                className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs"
              >
                Confirmar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
