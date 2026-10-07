import React, { useState } from 'react';
import { ExternalLink, Database, Monitor, BookOpen, Briefcase, Rocket, Search, CheckCircle2, ArrowRight } from 'lucide-react';

interface ToolScenario {
  id: string;
  userNeed: string;
  recommendedTool: string;
  actionExplanation: string;
  urlPlaceholder: string;
}

const TOOL_SCENARIOS: ToolScenario[] = [
  {
    id: 's1',
    userNeed: 'Necesito descargar de inmediato mi certificado oficial o constancia de matrícula con código QR',
    recommendedTool: 'SofiaPlus (Portal de Certificados)',
    actionExplanation: 'Ingresa a senasofiaplus.edu.co con tu tipo de documento y contraseña. Selecciona el rol "Aprendiz", ve al menú "Certificación" y descarga el PDF firmado digitalmente.',
    urlPlaceholder: 'https://senasofiaplus.edu.co'
  },
  {
    id: 's2',
    userNeed: 'Debo entregar una evidencia en PDF y participar en el foro de dudas de mi instructor',
    recommendedTool: 'Zajuna (Campus Virtual LMS)',
    actionExplanation: 'Ingresa a zajuna.sena.edu.co con tus credenciales institucionales. Ubica tu ficha formativa, ingresa al menú "Contenido del Programa" o "Evidencias" y carga tu archivo antes del cierre de fecha.',
    urlPlaceholder: 'https://zajuna.sena.edu.co'
  },
  {
    id: 's3',
    userNeed: 'Busco libros técnicos, normas ICONTEC o artículos indexados de Scopus e IEEE para mi proyecto formativo',
    recommendedTool: 'Sistema de Bibliotecas SENA (SBS)',
    actionExplanation: 'Accede a bibliotecas.sena.edu.co. Todos los aprendices tienen acceso gratuito a más de 30 bases de datos científicas internacionales con su documento de identidad.',
    urlPlaceholder: 'https://biblioteca.sena.edu.co'
  },
  {
    id: 's4',
    userNeed: 'Estoy en etapa lectiva avanzada y quiero postularme a empresas que ofrecen Contrato de Aprendizaje',
    recommendedTool: 'SGVA en SofiaPlus (Gestión de Aprendices)',
    actionExplanation: 'En SofiaPlus, con el rol "Aprendiz", ingresa al módulo SGVA para consultar empresas patrocinadoras autorizadas y registrar tu hoja de vida para entrevistas.',
    urlPlaceholder: 'https://caprendizaje.sena.edu.co'
  },
  {
    id: 's5',
    userNeed: 'Tengo una idea de negocio innovadora y requiero capital semilla no reembolsable para crear empresa',
    recommendedTool: 'Fondo Emprender SENA',
    actionExplanation: 'Acércate al Centro de Desarrollo Empresarial (SBDC) de tu centro de formación. Un gestor te guiará para formular tu plan de negocio y postularte a las convocatorias nacionales.',
    urlPlaceholder: 'https://www.fondoemprender.com'
  },
  {
    id: 's6',
    userNeed: 'Deseo prototipar un dispositivo electrónico, software o bioinsumo en laboratorios de última generación',
    recommendedTool: 'SENNOVA & Red Tecnoparque',
    actionExplanation: 'Tecnoparque es un acelerador gratuito de proyectos tecnológicos para aprendices y colombianos. Te prestan equipos de impresión 3D, laboratorios de realidad virtual y biotecnología sin costo.',
    urlPlaceholder: 'https://tecnoparque.sena.edu.co'
  }
];

export const EcosystemTools: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<ToolScenario>(TOOL_SCENARIOS[0]);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredScenarios = TOOL_SCENARIOS.filter(s =>
    s.userNeed.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.recommendedTool.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] uppercase tracking-wider mb-1">
          <span>Transformación Digital</span>
          <span aria-hidden="true">·</span>
          <span>Herramientas al Servicio del Aprendiz</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
          Ecosistema Tecnológico SENA
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl">
          El SENA dispone de un ecosistema interconectado de plataformas web para tu formación, investigación, empleo y emprendimiento. Aprende a navegar cada herramienta con fluidez.
        </p>
      </div>

      {/* Grid of Main 4 Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* SofiaPlus */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">Gestión Misional</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">SofiaPlus</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            El sistema de registro académico donde consultas tus juicios evaluativos (A o D), descargas constancias oficiales gratuitas y actualizas tus datos de contacto.
          </p>
          <div className="pt-2 text-[11px] font-mono text-emerald-800 dark:text-[#48cf00] font-medium">
            senasofiaplus.edu.co
          </div>
        </div>

        {/* Zajuna LMS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">Campus Virtual</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Zajuna LMS</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            El aula virtual moderna del SENA. Aquí consultas las guías de aprendizaje, participas en foros con tus instructores y cargas las evidencias de tus proyectos.
          </p>
          <div className="pt-2 text-[11px] font-mono text-blue-700 dark:text-blue-400 font-medium">
            zajuna.sena.edu.co
          </div>
        </div>

        {/* Sistema de Bibliotecas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">Investigación</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Biblioteca Digital</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Más de 30 bases de datos científicas internacionales (ScienceDirect, eLibro, EBSCO, IEEE) disponibles 100% gratis para todos los aprendices matriculados.
          </p>
          <div className="pt-2 text-[11px] font-mono text-purple-700 dark:text-purple-400 font-medium">
            biblioteca.sena.edu.co
          </div>
        </div>

        {/* APE & Fondo Emprender */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase">Empleo & Empresa</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">APE & Fondo Emprender</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Agencia Pública de Empleo para colocación laboral formal sin intermediarios, y capital semilla condonable para proyectos productivos de aprendices.
          </p>
          <div className="pt-2 text-[11px] font-mono text-amber-700 dark:text-amber-400 font-medium">
            fondoemprender.com
          </div>
        </div>

      </div>

      {/* Interactive Tool Finder ("¿Qué necesito hacer?") */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">
              Orientador Práctico
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              ¿Qué trámite o necesidad tienes como aprendiz hoy?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Selecciona tu caso y conoce el paso a paso exacto para resolverlo sin rodeos.
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar trámite..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Scenarios List */}
          <div className="lg:col-span-5 space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-colors ${
                  selectedScenario.id === sc.id
                    ? 'border-[#39A900] bg-slate-800 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="font-semibold text-sm line-clamp-2">{sc.userNeed}</div>
                <div className="mt-1 text-[11px] text-emerald-400 font-mono">
                  → {sc.recommendedTool}
                </div>
              </button>
            ))}
          </div>

          {/* Solution & Action Card */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono uppercase">
              <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
              <span>Plataforma Indicada:</span>
            </div>

            <h4 className="text-xl font-bold text-white font-display">
              {selectedScenario.recommendedTool}
            </h4>

            <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-700/80 space-y-2">
              <div className="text-xs font-semibold text-slate-300">Paso a paso recomendado:</div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedScenario.actionExplanation}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Enlace de acceso oficial: {selectedScenario.urlPlaceholder}
              </span>
              <a
                href={selectedScenario.urlPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Acceder al Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
