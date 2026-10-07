import React from 'react';
import { Award, UserCheck, BookOpen, Sun, Moon, FileSpreadsheet } from 'lucide-react';
import { LearnerProfile } from '../types/induction';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  learnerProfile: LearnerProfile;
  onOpenProfile: () => void;
  onOpenGlossary: () => void;
  onOpenDriveSync: () => void;
  completedModulesCount: number;
  totalModulesCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isAdminMode: boolean;
}

export const SENA_LOGO_SVG = "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  learnerProfile,
  onOpenProfile,
  onOpenGlossary,
  onOpenDriveSync,
  completedModulesCount,
  totalModulesCount,
  isDarkMode,
  onToggleDarkMode,
  isAdminMode,
}) => {
  const progressPercent = Math.round((completedModulesCount / totalModulesCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center shrink-0">
            <img
              src={SENA_LOGO_SVG}
              alt="Logo Oficial SENA"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => onSelectTab('modules')}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:text-[#39A900] dark:hover:text-[#48cf00] transition-colors text-left font-display"
          >
            SENA Inducción
          </button>
        </div>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('modules')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
              currentTab === 'modules'
                ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ruta de Formación
          </button>
          <button
            onClick={() => onSelectTab('regulations')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
              currentTab === 'regulations'
                ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Evaluación & Reglamento
          </button>
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors pb-1 border-b-2 whitespace-nowrap cursor-pointer ${
              currentTab === 'dashboard'
                ? 'border-[#39A900] text-[#39A900] dark:text-[#48cf00] font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Progreso & Certificado
          </button>
          <button
            onClick={() => onSelectTab('auditorio')}
            className={`transition-colors pb-1 border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              currentTab === 'auditorio'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Auditorio en Vivo</span>
          </button>
        </nav>

        {/* Zone 3: Primary actions (Top Right) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Grupo de Herramientas (Glosario & Drive Sync) */}
          <div className="flex items-center -space-x-px">
            <button
              onClick={onOpenGlossary}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-l-lg hover:z-10 transition-colors cursor-pointer ${
                isAdminMode ? '' : 'rounded-r-lg'
              }`}
              title="Ver Glosario de términos del SENA"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <span className="hidden sm:inline">Glosario</span>
            </button>

            {isAdminMode && (
              <button
                onClick={onOpenDriveSync}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-[#48cf00] bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-slate-200 dark:border-slate-700 rounded-r-lg hover:z-10 transition-colors cursor-pointer"
                title="Libro de Calificaciones & Registro en Google Drive"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900] dark:text-[#48cf00] shrink-0" />
                <span className="hidden sm:inline">Registro Drive</span>
              </button>
            )}
          </div>

          {/* Grupo de Perfil de Aprendiz y Apariencia */}
          <div className="flex items-center -space-x-px">
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-l-lg hover:z-10 transition-colors text-left cursor-pointer"
              title="Configurar y visualizar ficha del aprendiz"
            >
              <div className="w-5 h-5 rounded-full bg-[#39A900]/15 dark:bg-[#39A900]/25 text-[#246e00] dark:text-[#48cf00] flex items-center justify-center font-bold text-[10px] shrink-0">
                <UserCheck className="w-3 h-3" />
              </div>
              <div className="hidden xs:block text-left leading-none">
                <div className="font-bold text-slate-900 dark:text-white truncate max-w-[65px] sm:max-w-[100px]">
                  {learnerProfile.fullName.split(' ')[0]}
                </div>
              </div>
              <div className="ml-1 pl-1.5 border-l border-slate-200 dark:border-slate-700 flex items-center gap-0.5 font-mono text-[10px] font-bold text-[#2b7e02] dark:text-[#48cf00] tabular-nums shrink-0">
                <Award className="w-2.5 h-2.5 text-[#39A900]" />
                <span>{progressPercent}%</span>
              </div>
            </button>

            <button
              onClick={onToggleDarkMode}
              className="flex items-center justify-center p-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-r-lg hover:z-10 transition-all cursor-pointer transform active:scale-95"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar modo de tema"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 dark:border-slate-800 px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onSelectTab('modules')}
          className={`whitespace-nowrap cursor-pointer ${currentTab === 'modules' ? 'text-[#39A900] dark:text-[#48cf00] font-semibold' : ''}`}
        >
          Ruta
        </button>
        <button
          onClick={() => onSelectTab('regulations')}
          className={`whitespace-nowrap cursor-pointer ${currentTab === 'regulations' ? 'text-[#39A900] dark:text-[#48cf00] font-semibold' : ''}`}
        >
          Pruebas
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`whitespace-nowrap cursor-pointer ${currentTab === 'dashboard' ? 'text-[#39A900] dark:text-[#48cf00] font-semibold' : ''}`}
        >
          Progreso
        </button>
        <button
          onClick={() => onSelectTab('auditorio')}
          className={`whitespace-nowrap flex items-center gap-1 cursor-pointer ${currentTab === 'auditorio' ? 'text-sky-500 font-semibold' : ''}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span>Auditorio</span>
        </button>
        {isAdminMode && (
          <button
            onClick={onOpenDriveSync}
            className="whitespace-nowrap flex items-center gap-1 text-emerald-700 dark:text-[#48cf00] font-semibold cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Drive</span>
          </button>
        )}
      </div>
    </header>
  );
};

