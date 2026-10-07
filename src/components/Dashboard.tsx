import React, { useState } from 'react';
import {
  TrendingUp,
  User,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  BarChart2,
  PieChart as PieIcon,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { LearnerProfile, InductionModule } from '../types/induction';
import { INDUCTION_MODULES } from '../data/senaData';

interface DashboardProps {
  completedModules: string[];
  learnerProfile: LearnerProfile;
  onNavigateToTab: (tab: string) => void;
  onNavigateToModule: (index: number) => void;
  onOpenCertificate: () => void;
}

type ComparativeScope = 'ficha' | 'regional' | 'nacional';

export const Dashboard: React.FC<DashboardProps> = ({
  completedModules,
  learnerProfile,
  onNavigateToTab,
  onNavigateToModule,
  onOpenCertificate,
}) => {
  const [scope, setScope] = useState<ComparativeScope>('ficha');

  // Simulated peer data based on the chosen scope
  const peerAverages: Record<ComparativeScope, Record<string, number>> = {
    ficha: {
      'modulo-1': 92, // High completion for early module
      'modulo-2': 84,
      'modulo-3': 75,
      'modulo-4': 60,
      'modulo-5': 48,
    },
    regional: {
      'modulo-1': 88,
      'modulo-2': 79,
      'modulo-3': 68,
      'modulo-4': 54,
      'modulo-5': 41,
    },
    nacional: {
      'modulo-1': 85,
      'modulo-2': 74,
      'modulo-3': 62,
      'modulo-4': 48,
      'modulo-5': 35,
    },
  };

  // Convert modules into chart data
  const chartData = INDUCTION_MODULES.map((mod) => {
    const isCompleted = completedModules.includes(mod.id);
    const myProgress = isCompleted ? 100 : 0;
    const classmatesAvg = peerAverages[scope][mod.id] || 50;

    return {
      subject: mod.shortTitle,
      shortName: `Mód. ${mod.number}`,
      'Tu Progreso (%)': myProgress,
      'Promedio Compañeros (%)': classmatesAvg,
    };
  });

  // Calculate high-level summary metrics
  const totalModules = INDUCTION_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  // Simulated peer rank based on progress
  let percentile = 15; // default low
  if (progressPercent === 100) percentile = 98;
  else if (progressPercent >= 80) percentile = 85;
  else if (progressPercent >= 60) percentile = 72;
  else if (progressPercent >= 40) percentile = 54;
  else if (progressPercent >= 20) percentile = 35;

  const getScopeLabel = () => {
    switch (scope) {
      case 'ficha':
        return `Ficha ${learnerProfile.fichaNumber} - ${learnerProfile.programName}`;
      case 'regional':
        return `${learnerProfile.regional}`;
      case 'nacional':
        return 'Promedio Nacional SENA';
    }
  };

  // Safe colors that represent SENA and its secondary brand palette
  const brandGreen = '#39A900';
  const peerAmber = '#4b5563'; // Neutral gray-slate for classmates
  const brandAccent = '#0284c7'; // Sky-blue accent

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header with Metadata Section (Zero-Pill Compliance) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#39A900] dark:text-[#48cf00] uppercase font-semibold">
            <span>Analítica de Aprendizaje</span>
            <span aria-hidden="true">·</span>
            <span>Estadísticas de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Ficha {learnerProfile.fichaNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mt-1">
            Panel de Rendimiento: {learnerProfile.fullName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compara tu avance actual con la comunidad del SENA en tiempo real.
          </p>
        </div>

        {/* Scope selector tabs (Segmented button control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800/60 self-start md:self-center shrink-0">
          <button
            onClick={() => setScope('ficha')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              scope === 'ficha'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mi Ficha
          </button>
          <button
            onClick={() => setScope('regional')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              scope === 'regional'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Regional
          </button>
          <button
            onClick={() => setScope('nacional')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
              scope === 'nacional'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Nacional
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Grid (Mono & Tabular numerals enforcement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Completitud */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-mono font-semibold">Completitud</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
              {progressPercent}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {completedCount} de {totalModules} módulos listos
            </div>
          </div>
        </div>

        {/* Comparación Directa */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-mono font-semibold">Percentil Ficha</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
              {percentile}%
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Superas al {percentile}% de la cohorte
            </div>
          </div>
        </div>

        {/* Insignias Acumuladas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/45 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-mono font-semibold">Insignias</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
              {completedCount} / 5
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Acreditadas en tu pasaporte
            </div>
          </div>
        </div>

        {/* Tiempo Restante */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-mono font-semibold">Estudio Estimado</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-1 tabular-nums">
              {Math.max(0, (5 - completedCount) * 15)} Min
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Para lograr el 100% de la ruta
            </div>
          </div>
        </div>

      </div>

      {/* Acreditación y Certificado Oficial */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
        progressPercent === 100
          ? 'bg-linear-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-500/30 dark:border-emerald-500/20 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
            progressPercent === 100
              ? 'bg-[#39A900]/10 border-[#39A900]/20 text-[#39A900] dark:text-[#48cf00]'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
          }`}>
            <Award className={`w-6 h-6 ${progressPercent === 100 ? 'animate-bounce' : ''}`} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#39A900] dark:text-[#48cf00] uppercase font-bold tracking-wider">
                Acreditación Profesional SENA
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className={`text-[10px] font-mono font-bold uppercase ${progressPercent === 100 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                {progressPercent === 100 ? 'Aprobado' : 'En Curso'}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">
              Certificado Oficial de Apropiación e Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {progressPercent === 100
                ? '¡Felicitaciones! Has completado con éxito todos los módulos de inducción del SENA. Tu certificado de portafolio oficial ha sido firmado digitalmente y se encuentra listo para descargar e imprimir.'
                : `Has completado el ${progressPercent}% del programa formativo. Recuerda que es obligatorio culminar todas las etapas y superar la evaluación del reglamento para habilitar la firma de tu certificado.`}
            </p>
          </div>
        </div>

        <div className="shrink-0 self-end md:self-center">
          {progressPercent === 100 ? (
            <button
              onClick={onOpenCertificate}
              className="w-full md:w-auto px-5 py-2.5 bg-[#39A900] hover:bg-[#329200] text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Generar Certificado</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onNavigateToTab('modules');
              }}
              className="w-full md:w-auto px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Completar Módulos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Recharts Graphics Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart A: Radar Chart comparing Apprentice Progress vs Peer Averages */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Análisis Multidimensional de Apropiación
              </h3>
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                Radar de Competencias
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Visualiza en qué áreas te encuentras al día frente al promedio de: <span className="font-semibold text-slate-700 dark:text-slate-300">{getScopeLabel()}</span>.
            </p>
          </div>

          <div className="h-72 sm:h-80 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 9 }}
                />
                <Radar
                  name="Tu Avance"
                  dataKey="Tu Progreso (%)"
                  stroke={brandGreen}
                  fill={brandGreen}
                  fillOpacity={0.2}
                />
                <Radar
                  name="Promedio Grupo"
                  dataKey="Promedio Compañeros (%)"
                  stroke={peerAmber}
                  fill={peerAmber}
                  fillOpacity={0.08}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  iconSize={10}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Bar Chart comparing module status vs peer status */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Estado por Módulo Formativo
              </h3>
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-sm">
                Barras Comparativas
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Comparativa porcentual del estatus de completación por cada módulo de inducción.
            </p>
          </div>

          <div className="h-72 sm:h-80 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="shortName"
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(148, 163, 184, 0.05)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                  formatter={(value) => [`${value}%`]}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  iconSize={10}
                />
                <Bar
                  name="Tu Avance"
                  dataKey="Tu Progreso (%)"
                  fill={brandGreen}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  name="Promedio Compañeros"
                  dataKey="Promedio Compañeros (%)"
                  fill={peerAmber}
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Actionable recommendations based on apprentice's progress */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display mb-4">
          Recomendaciones Pedagógicas Personalizadas
        </h3>

        <div className="space-y-4">
          {INDUCTION_MODULES.map((mod, index) => {
            const isCompleted = completedModules.includes(mod.id);
            const isActive = !isCompleted && completedModules.length === index;

            return (
              <div
                key={mod.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border transition-all ${
                  isCompleted
                    ? 'border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/20 dark:bg-emerald-950/5'
                    : isActive
                    ? 'border-sky-200 dark:border-sky-950/65 bg-sky-50/20 dark:bg-sky-950/5'
                    : 'border-slate-100 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-900/40 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#39A900] dark:text-[#48cf00]" />
                    ) : isActive ? (
                      <Sparkles className="w-5 h-5 text-sky-500 animate-pulse" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">MOD {mod.number}</span>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {mod.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {isCompleted
                        ? '¡Dominado perfectamente! Has acreditado esta competencia e insignia.'
                        : isActive
                        ? 'Este es tu siguiente paso recomendado. Avanza para nivelarte con tus compañeros.'
                        : 'Módulo pendiente por iniciar una vez que completes el actual.'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 self-end sm:self-center shrink-0">
                  {isCompleted ? (
                    <span className="text-xs font-mono font-bold text-[#39A900] dark:text-[#48cf00] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Acreditado
                    </span>
                  ) : isActive ? (
                    <button
                      onClick={() => {
                        onNavigateToTab('modules');
                        onNavigateToModule(index);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Comenzar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-slate-400">Bloqueado</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
