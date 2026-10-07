import React, { useState } from 'react';
import { Heart, Activity, Palette, Users, ShieldCheck, DollarSign, Smile, CheckCircle2, AlertCircle } from 'lucide-react';

const WELFARE_DIMENSIONS = [
  {
    id: 'salud',
    title: '1. Salud y Prevención',
    icon: Activity,
    color: 'text-red-600 bg-red-50 border-red-200',
    description: 'Jornadas de vacunación, brigadas de salud visual y oral, ergonomía postural en talleres, y programas de prevención en salud sexual y reproductiva.'
  },
  {
    id: 'deporte',
    title: '2. Deporte y Recreación',
    icon: Heart,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    description: 'Torneos intercentros de fútbol sala, baloncesto, voleibol, atletismo, ajedrez y los Juegos Nacionales de la Confraternidad de Aprendices SENA.'
  },
  {
    id: 'cultura',
    title: '3. Arte y Cultura',
    icon: Palette,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description: 'Grupos representativos de danzas folclóricas, teatro, ensambles de música andina, llanera y caribeña, talleres de pintura y festivales de la canción.'
  },
  {
    id: 'liderazgo',
    title: '4. Liderazgo y Participación',
    icon: Users,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Elección democrática de Voceros de Ficha, Representantes de Centro de Aprendices ante el Consejo Directivo y formación en liderazgo transformador.'
  },
  {
    id: 'socioemocional',
    title: '5. Habilidades Socioemocionales',
    icon: Smile,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    description: 'Talleres de resiliencia, manejo de la ansiedad académica, comunicación asertiva, resolución pacífica de conflictos y construcción de proyecto de vida.'
  },
  {
    id: 'psicosocial',
    title: '6. Acompañamiento Psicosocial',
    icon: ShieldCheck,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    description: 'Orientación psicológica individual confidencial, tutorías pedagógicas personalizadas y estrategias para mitigar el riesgo de deserción formativa.'
  },
  {
    id: 'apoyos',
    title: '7. Apoyos Socioeconómicos',
    icon: DollarSign,
    color: 'text-green-700 bg-green-50 border-green-200',
    description: 'Convocatorias públicas anuales de subsidio de sostenimiento mensual (regular y FIC para construcción), monitorías remuneradas y apoyos de alimentación y transporte.'
  }
];

export const WelfareSection: React.FC = () => {
  // Eligibility Simulator state for Apoyo de Sostenimiento
  const [estrato, setEstrato] = useState<'1' | '2' | '3+'>('1');
  const [hasContract, setHasContract] = useState<boolean>(false);
  const [hasSanctions, setHasSanctions] = useState<boolean>(false);
  const [isRapsCurrent, setIsRapsCurrent] = useState<boolean>(true);

  // Compute eligibility
  const isEligible = (estrato === '1' || estrato === '2') && !hasContract && !hasSanctions && isRapsCurrent;

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] uppercase tracking-wider mb-1">
          <span>Plan Nacional de Bienestar</span>
          <span aria-hidden="true">·</span>
          <span>Desarrollo Humano Integral</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
          Bienestar al Aprendiz y Oportunidades
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl">
          El SENA te acompaña en cada aspecto de tu vida. Conoce las 7 dimensiones creadas para potenciar tu salud física, mental, tus talentos artísticos y apoyarte económicamente.
        </p>
      </div>

      {/* 7 Dimensions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WELFARE_DIMENSIONS.map((dim) => {
          const IconComp = dim.icon;
          return (
            <div
              key={dim.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${dim.color} dark:bg-opacity-20`}>
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {dim.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {dim.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Eligibility Simulator */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="text-xs font-mono text-emerald-800 dark:text-[#48cf00] font-semibold uppercase">
            Simulador de Requisitos
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-0.5">
            ¿Cumples con el perfil para postularte al Apoyo de Sostenimiento del SENA?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Verifica al instante si cumples los criterios base para la próxima convocatoria pública nacional de subsidio monetario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Criterion 1 */}
          <div className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              1. Estrato socioeconómico de tu vivienda:
            </label>
            <select
              value={estrato}
              onChange={(e) => setEstrato(e.target.value as '1' | '2' | '3+')}
              className="w-full text-xs p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-750 text-slate-900 dark:text-slate-100"
            >
              <option value="1">Estrato 1 (Prioritario)</option>
              <option value="2">Estrato 2 (Prioritario)</option>
              <option value="3+">Estrato 3 o superior</option>
            </select>
          </div>

          {/* Criterion 2 */}
          <div className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              2. ¿Tienes contrato de aprendizaje o empleo formal?
            </label>
            <select
              value={hasContract ? 'yes' : 'no'}
              onChange={(e) => setHasContract(e.target.value === 'yes')}
              className="w-full text-xs p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-750 text-slate-900 dark:text-slate-100"
            >
              <option value="no">No tengo contrato ni sueldo</option>
              <option value="yes">Sí, ya cuento con contrato</option>
            </select>
          </div>

          {/* Criterion 3 */}
          <div className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              3. ¿Has tenido sanciones disciplinarias en el SENA?
            </label>
            <select
              value={hasSanctions ? 'yes' : 'no'}
              onChange={(e) => setHasSanctions(e.target.value === 'yes')}
              className="w-full text-xs p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-750 text-slate-900 dark:text-slate-100"
            >
              <option value="no">Hoja de vida limpia (Sin faltas)</option>
              <option value="yes">Tengo sanción registrada</option>
            </select>
          </div>

          {/* Criterion 4 */}
          <div className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-200 block">
              4. ¿Estás al día con los Resultados de Aprendizaje (RAP)?
            </label>
            <select
              value={isRapsCurrent ? 'yes' : 'no'}
              onChange={(e) => setIsRapsCurrent(e.target.value === 'yes')}
              className="w-full text-xs p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-750 text-slate-900 dark:text-slate-100"
            >
              <option value="yes">Sí, 100% de juicios Aprobados (A)</option>
              <option value="no">Tengo pendientes o juicios "D"</option>
            </select>
          </div>

        </div>

        {/* Result Callout */}
        <div className={`p-5 rounded-xl border flex items-start gap-4 ${
          isEligible
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
        }`}>
          {isEligible ? (
            <CheckCircle2 className="w-5 h-5 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <div className="font-bold text-sm">
              {isEligible
                ? '¡Cumples los criterios para postularte al Apoyo de Sostenimiento!'
                : 'Condición pendiente para acceder al Apoyo de Sostenimiento'}
            </div>
            <p className="text-xs leading-relaxed">
              {isEligible
                ? 'Debes estar atento a la publicación de la convocatoria en la cartelera de Bienestar de tu Centro o en SofiaPlus. Alista tu fotocopia de documento, recibo de servicio público reciente y certificación bancaria a tu nombre.'
                : 'Recuerda que los apoyos de sostenimiento priorizan a aprendices sin ingresos formales, estratos 1 y 2, con excelente rendimiento académico y sin sanciones en el Comité de Evaluación.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
