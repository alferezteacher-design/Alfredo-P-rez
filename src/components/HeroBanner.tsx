import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import heroCampusImg from '../assets/images/sena_campus_modern_1791322494337.jpg';

interface HeroBannerProps {
  onStartInduction: () => void;
  onExploreSymbols: () => void;
  onOpenAuditorium?: () => void;
  completedPercent: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartInduction,
  onExploreSymbols,
  onOpenAuditorium,
  completedPercent,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      {/* Background Image with Measured Scrim for contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="Campus moderno del Servicio Nacional de Aprendizaje SENA"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-45 brightness-90 transition-opacity duration-500"
          onError={(e) => {
            // Graceful fallback to styled deep emerald gradient mesh
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl space-y-6">
          
          {/* Metadata line without pill enclosures */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 tracking-wide uppercase">
            <span>Proceso de Inducción Institucional</span>
            <span aria-hidden="true">·</span>
            <span>República de Colombia</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Vigencia 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance font-display leading-[1.1]">
            Bienvenido a tu camino de transformación con el{' '}
            <span className="text-[#48cf00]">SENA</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            La institución más querida por los colombianos abre sus puertas para tu Formación Profesional Integral. 
            Aprende sobre nuestra historia, símbolos sagrados, el reglamento del aprendiz, y las plataformas digitales que impulsarán tu futuro productivo.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartInduction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg shadow-lg shadow-[#39A900]/25 transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4" />
              <span>{completedPercent > 0 ? 'Continuar Ruta Formativa' : 'Iniciar Proceso de Inducción'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreSymbols}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Explorar Símbolos & Historia</span>
            </button>

            {onOpenAuditorium && (
              <button
                onClick={onOpenAuditorium}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-white bg-sky-600/90 hover:bg-sky-500 border border-sky-400/40 rounded-lg shadow-lg shadow-sky-600/20 transition-all hover:-translate-y-0.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span>Auditorio en Vivo (42.810+)</span>
              </button>
            )}
          </div>

          {/* Quantitative Rigor Proof Strip */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">1957</div>
              <div className="text-xs text-slate-400 mt-0.5">Fundado por Rodolfo Martínez Tono</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">33</div>
              <div className="text-xs text-slate-400 mt-0.5">Regionales en todo el país</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">118+</div>
              <div className="text-xs text-slate-400 mt-0.5">Centros de Formación Integral</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Público y gratuito</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
