/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Award,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Scale,
  Monitor,
  Heart,
  FileCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { Header, SENA_LOGO_SVG } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { LiveAuditorium } from './components/LiveAuditorium';
import { ModuleViewer } from './components/ModuleViewer';
import { SymbolsExplorer } from './components/SymbolsExplorer';
import { RegulationsSimulator } from './components/RegulationsSimulator';
import { EcosystemTools } from './components/EcosystemTools';
import { WelfareSection } from './components/WelfareSection';
import { CertificateModal } from './components/CertificateModal';
import { LearnerProfileModal } from './components/LearnerProfileModal';
import { GlossaryModal } from './components/GlossaryModal';
import { DriveSheetSyncModal } from './components/DriveSheetSyncModal';
import { Dashboard } from './components/Dashboard';
import { INDUCTION_MODULES, DEFAULT_PROFILE, INITIAL_BADGES } from './data/senaData';
import { LearnerProfile } from './types/induction';

export default function App() {
  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('modules');
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<string>('etapas');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isDriveSyncOpen, setIsDriveSyncOpen] = useState<boolean>(false);

  // Security states for Admin Mode
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_admin_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [adminPinError, setAdminPinError] = useState<string | null>(null);

  const handleToggleAdminMode = (state: boolean) => {
    setIsAdminMode(state);
    try {
      localStorage.setItem('sena_admin_mode', state ? 'true' : 'false');
    } catch {
      // Ignore
    }
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPinError(null);
    if (adminPinInput === '1957') {
      handleToggleAdminMode(true);
      setIsAdminLoginOpen(false);
      setAdminPinInput('');
    } else {
      setAdminPinError('PIN de seguridad incorrecto. Intenta nuevamente.');
    }
  };

  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('sena_theme_mode');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Blur transition effect state when switching themes
  const [isBlurring, setIsBlurring] = useState<boolean>(false);

  // Sync dark class on mount and changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle toggle dark mode with sensory blur effect
  const handleToggleDarkMode = () => {
    setIsBlurring(true);
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    
    if (nextMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('sena_theme_mode', nextMode ? 'dark' : 'light');
    } catch {
      // Ignore
    }

    // Smoothly clear the blur effect after theme transition settles
    window.setTimeout(() => {
      setIsBlurring(false);
    }, 380);
  };

  // Learner profile state with localStorage persistence
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem('sena_learner_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Completed module IDs with localStorage persistence
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sena_completed_modules');
      return saved ? JSON.parse(saved) : ['modulo-1']; // Seed modulo-1 for immediate gratification
    } catch {
      return ['modulo-1'];
    }
  });

  // Save profile changes
  const handleSaveProfile = (newProfile: LearnerProfile) => {
    setLearnerProfile(newProfile);
    try {
      localStorage.setItem('sena_learner_profile', JSON.stringify(newProfile));
    } catch {
      // Ignore localStorage errors
    }
  };

  // Synchronize and log current apprentice's details & progress to local queue
  useEffect(() => {
    if (!learnerProfile.fullName || learnerProfile.fullName.trim() === '' || learnerProfile.fullName === 'Aprendiz SENA') {
      return; // Skip logging for empty or default profile
    }

    try {
      const savedStr = localStorage.getItem('sena_local_submissions');
      const submissions = savedStr ? JSON.parse(savedStr) : [];
      
      const doc = learnerProfile.documentNumber || 'SIN-DOC';
      const percent = Math.round((completedModules.length / INDUCTION_MODULES.length) * 100);
      const estado = completedModules.length >= INDUCTION_MODULES.length ? 'Inducción Concluida y Aprobada' : 'En Proceso Formativo';
      const now = new Date();
      const fechaStr = now.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      const existingIdx = submissions.findIndex((s: any) => s.documento === doc);
      const currentSubmission = {
        registroId: existingIdx !== -1 ? submissions[existingIdx].registroId : `SENA-${learnerProfile.fichaNumber || '0000'}-${doc.slice(-4)}-${now.getTime().toString().slice(-4)}`,
        fecha: fechaStr,
        documento: doc,
        nombre: learnerProfile.fullName,
        ficha: learnerProfile.fichaNumber || '0000',
        programa: learnerProfile.programName || 'No especificado',
        nivel: learnerProfile.programType || 'No especificado',
        centro: learnerProfile.centerName || 'No especificado',
        regional: learnerProfile.regional || 'No especificado',
        startedAt: learnerProfile.startedAt || '',
        modulos: `${completedModules.length} de ${INDUCTION_MODULES.length}`,
        porcentaje: `${percent}%`,
        estado: estado,
        normativa: 'Acuerdo 0009 de 2024 (Consejo Directivo Nacional)',
        synced: existingIdx !== -1 ? submissions[existingIdx].synced : false,
      };

      if (existingIdx !== -1) {
        // Update if progress changed or basic details updated
        submissions[existingIdx] = currentSubmission;
      } else {
        submissions.unshift(currentSubmission);
      }

      localStorage.setItem('sena_local_submissions', JSON.stringify(submissions));
    } catch (err) {
      console.error('Error saving local submissions:', err);
    }
  }, [learnerProfile, completedModules]);

  // Complete a module & earn badge
  const handleCompleteModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const updated = [...completedModules, moduleId];
      setCompletedModules(updated);
      try {
        localStorage.setItem('sena_completed_modules', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  };

  const completedCount = completedModules.length;
  const totalCount = INDUCTION_MODULES.length;
  const progressRatio = Math.round((completedCount / totalCount) * 100);

  const activeModule = INDUCTION_MODULES[activeModuleIndex];

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative w-full max-w-full overflow-x-hidden`}>
      
      {/* Dynamic Blur Transition Overlay when changing theme */}
      {isBlurring && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-950/20 dark:bg-slate-900/30 transition-all duration-300 animate-in fade-in"
        />
      )}

      {/* Admin Quick Control Bar */}
      {isAdminMode && (
        <div className="bg-emerald-900 text-white px-4 py-2.5 text-xs flex flex-col sm:flex-row items-center justify-between shadow-md gap-2 select-none no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider uppercase font-mono bg-emerald-800 px-2 py-0.5 rounded border border-emerald-700 text-[10px]">
              MODO ADMINISTRADOR ACTIVO
            </span>
            <span className="text-emerald-100 font-medium">
              Libro de calificaciones y registros de Drive asegurados y ocultos para los aprendices.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsDriveSyncOpen(true)}
              className="px-2.5 py-1 bg-emerald-850 hover:bg-emerald-700 border border-emerald-600 rounded font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Abrir Gestor Drive
            </button>
            <button
              onClick={() => handleToggleAdminMode(false)}
              className="px-2.5 py-1 bg-red-700 hover:bg-red-600 rounded font-bold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              Salir de Modo Admin
            </button>
          </div>
        </div>
      )}

      {/* 3-Zone Header Contract */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setShowCertificate(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        learnerProfile={learnerProfile}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenDriveSync={() => setIsDriveSyncOpen(true)}
        completedModulesCount={completedCount}
        totalModulesCount={totalCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isAdminMode={isAdminMode}
      />

      {/* Content wrapper with smooth blur transition class */}
      <div className={`flex-1 flex flex-col ${isBlurring ? 'theme-blur-active' : 'theme-blur-idle'}`}>
        {/* Hero section on modules overview */}
        {currentTab === 'modules' && (
          <HeroBanner
            onStartInduction={() => {
              setActiveSubTab('etapas');
              const firstIncompleteIdx = INDUCTION_MODULES.findIndex(m => !completedModules.includes(m.id));
              if (firstIncompleteIdx !== -1) {
                setActiveModuleIndex(firstIncompleteIdx);
              }
              const el = document.getElementById('induction-stage');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreSymbols={() => {
              setActiveSubTab('symbols');
              const el = document.getElementById('induction-stage');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenAuditorium={() => {
              setCurrentTab('auditorio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedPercent={progressRatio}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
          
          {/* TAB 1: RUTA DE FORMACIÓN & SECCIONES ACADÉMICAS */}
          {currentTab === 'modules' && (
            <div id="induction-stage" className="space-y-8 animate-in fade-in duration-300">
              
              {/* Unified Segmented Sub-Navigation Strip */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setActiveSubTab('etapas');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`flex-1 min-w-[120px] text-center px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeSubTab === 'etapas'
                      ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  📖 5 Etapas de la Ruta
                </button>
                <button
                  onClick={() => {
                    setActiveSubTab('symbols');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`flex-1 min-w-[120px] text-center px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeSubTab === 'symbols'
                      ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🛡️ Símbolos & Raíces
                </button>
                <button
                  onClick={() => {
                    setActiveSubTab('ecosystem');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`flex-1 min-w-[120px] text-center px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeSubTab === 'ecosystem'
                      ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🌐 Ecosistema Digital
                </button>
                <button
                  onClick={() => {
                    setActiveSubTab('welfare');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`flex-1 min-w-[120px] text-center px-4 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    activeSubTab === 'welfare'
                      ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  💚 Bienestar al Aprendiz
                </button>
              </div>

              {/* Dynamic Content Rendering based on subtab */}
              {activeSubTab === 'etapas' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  {/* Modules Pathway Selector Strip */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#39A900] dark:text-[#48cf00] uppercase font-semibold">
                          <span>Ruta Formativa</span>
                          <span aria-hidden="true">·</span>
                          <span>5 Etapas de Inducción</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                          Pasaporte del Aprendiz: {progressRatio}% Completado
                        </h2>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-40 sm:w-48 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#39A900] dark:bg-[#48cf00] h-full transition-all duration-500"
                            style={{ width: `${progressRatio}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                          {completedCount}/{totalCount} Módulos
                        </span>
                      </div>
                    </div>

                    {/* 5 Modules Navigation Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {INDUCTION_MODULES.map((mod, idx) => {
                        const isDone = completedModules.includes(mod.id);
                        const isCurrent = activeModuleIndex === idx;

                        return (
                          <button
                            key={mod.id}
                            onClick={() => setActiveModuleIndex(idx)}
                            className={`text-left p-3 rounded-lg border text-xs transition-all relative ${
                              isCurrent
                                ? 'border-slate-900 dark:border-[#48cf00] bg-slate-900 dark:bg-slate-800 text-white shadow-xs'
                                : isDone
                                ? 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-300 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/40'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1 font-mono text-[10px]">
                              <span className="opacity-75">MÓDULO {mod.number}</span>
                              {isDone && (
                                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-emerald-400' : 'text-emerald-600 dark:text-[#48cf00]'}`} />
                              )}
                            </div>
                            <div className="font-semibold line-clamp-1">{mod.shortTitle}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Module Stage */}
                  <ModuleViewer
                    module={activeModule}
                    isCompleted={completedModules.includes(activeModule.id)}
                    onCompleteModule={handleCompleteModule}
                    onNextModule={() => {
                      if (activeModuleIndex < INDUCTION_MODULES.length - 1) {
                        setActiveModuleIndex(prev => prev + 1);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }
                    }}
                    onPrevModule={() => {
                      if (activeModuleIndex > 0) {
                        setActiveModuleIndex(prev => prev - 1);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }
                    }}
                    hasNext={activeModuleIndex < INDUCTION_MODULES.length - 1}
                    hasPrev={activeModuleIndex > 0}
                  />

                  {/* Earned Badges Showcase */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                          Insignias de Competencia Institucional
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Reconocimientos que acreditan tu apropiación de los valores y normas del SENA
                        </p>
                      </div>
                      <div className="text-xs font-mono text-[#39A900] dark:text-[#48cf00] font-bold">
                        {completedCount} de 5 Desbloqueadas
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {INITIAL_BADGES.map((b) => {
                        const isUnlocked = completedModules.some(mId => {
                          const mod = INDUCTION_MODULES.find(m => m.id === mId);
                          return mod?.badgeId === b.id;
                        });

                        return (
                          <div
                            key={b.id}
                            className={`p-4 rounded-xl border text-center transition-all ${
                              isUnlocked
                                ? 'bg-white dark:bg-slate-800 border-emerald-300 dark:border-emerald-700/60 shadow-xs'
                                : 'bg-slate-100/80 dark:bg-slate-850/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                            }`}
                          >
                            <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                              isUnlocked ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48cf00]' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                            }`}>
                              <Award className="w-5 h-5" />
                            </div>
                            <div className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight">
                              {b.name}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {b.description}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'symbols' && (
                <div className="animate-in fade-in duration-200">
                  <SymbolsExplorer />
                </div>
              )}

              {activeSubTab === 'ecosystem' && (
                <div className="animate-in fade-in duration-200">
                  <EcosystemTools />
                </div>
              )}

              {activeSubTab === 'welfare' && (
                <div className="animate-in fade-in duration-200">
                  <WelfareSection />
                </div>
              )}

            </div>
          )}

          {/* TAB 2: REGLAMENTO & EVALUACIÓN (SIMULADOR Y PRUEBAS) */}
          {currentTab === 'regulations' && (
            <RegulationsSimulator
              learnerProfile={learnerProfile}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {/* TAB 3: PROGRESO, METRICAS Y CERTIFICADO DE APROPIACIÓN */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              {showCertificate && progressRatio === 100 ? (
                <div className="animate-in zoom-in-95 duration-300">
                  <CertificateModal
                    profile={learnerProfile}
                    completedModulesCount={completedCount}
                    totalModulesCount={totalCount}
                    onOpenModules={() => {
                      setCurrentTab('modules');
                      setActiveSubTab('etapas');
                      setShowCertificate(false);
                    }}
                    onOpenDriveSync={isAdminMode ? () => setIsDriveSyncOpen(true) : undefined}
                    onBackToDashboard={() => setShowCertificate(false)}
                  />
                </div>
              ) : (
                <Dashboard
                  completedModules={completedModules}
                  learnerProfile={learnerProfile}
                  onNavigateToTab={(tab) => {
                    setCurrentTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onNavigateToModule={(idx) => {
                    setActiveSubTab('etapas');
                    setActiveModuleIndex(idx);
                    const el = document.getElementById('induction-stage');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenCertificate={() => setShowCertificate(true)}
                />
              )}
            </div>
          )}

          {/* TAB 4: AUDITORIO EN VIVO */}
          {currentTab === 'auditorio' && (
            <LiveAuditorium
              learnerProfile={learnerProfile}
              onExploreModules={() => {
                setCurrentTab('modules');
                setActiveSubTab('etapas');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

        </main>

        {/* Institutional Footer */}
        <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={SENA_LOGO_SVG}
                alt="Logo Oficial SENA"
                className="w-6 h-6 object-contain"
              />
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Servicio Nacional de Aprendizaje SENA</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>Ministerio del Trabajo · Colombia</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
              {isAdminMode ? (
                <>
                  <button
                    onClick={() => setIsDriveSyncOpen(true)}
                    className="text-emerald-700 dark:text-[#48cf00] font-semibold hover:underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Registro Drive (Sheets)</span>
                  </button>
                  <button
                    onClick={() => handleToggleAdminMode(false)}
                    className="text-red-600 font-semibold hover:underline underline-offset-2 cursor-pointer"
                  >
                    Cerrar Modo Admin
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold hover:underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>Acceso Administrador</span>
                </button>
              )}
              <button
                onClick={() => setIsGlossaryOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Glosario Institucional
              </button>
              <button
                onClick={() => setCurrentTab('regulations')}
                className="hover:text-slate-900 dark:hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Reglamento del Aprendiz
              </button>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="hover:text-slate-900 dark:hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Ficha del Aprendiz
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Profile Config Modal */}
      <LearnerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={learnerProfile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Glossary Search Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Google Sheets / Drive Sync Modal */}
      <DriveSheetSyncModal
        isOpen={isDriveSyncOpen}
        onClose={() => setIsDriveSyncOpen(false)}
        learnerProfile={learnerProfile}
        completedModulesCount={completedCount}
        totalModulesCount={totalCount}
      />

      {/* Admin PIN Login Modal */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#39A900]/10 dark:bg-[#39A900]/20 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center mx-auto border border-[#39A900]/20 dark:border-[#39A900]/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Verificación de Administrador
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ingresa el PIN de seguridad para acceder al libro de calificaciones y al historial de respuestas.
              </p>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                  PIN de Seguridad:
                </label>
                <input
                  type="password"
                  placeholder="••••"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  className="w-full text-center tracking-[0.5em] text-lg font-bold py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#39A900] placeholder:tracking-normal"
                  autoFocus
                />
                {adminPinError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 font-semibold text-center animate-in shake-in">
                    {adminPinError}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-2.5 font-mono">
                  Sugerencia: El PIN predeterminado es el año de fundación del SENA (1957).
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLoginOpen(false);
                    setAdminPinInput('');
                    setAdminPinError(null);
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Verificar PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
