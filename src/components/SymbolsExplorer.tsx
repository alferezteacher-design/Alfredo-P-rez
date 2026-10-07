import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles, Shield, Flag, Compass, Award, Music, BookOpen } from 'lucide-react';
import { anthemSynthesizer } from '../utils/audioSynth';
import { ANTHEM_STANZA_DATA } from '../data/senaData';

export const SymbolsExplorer: React.FC = () => {
  const [activeSymbolTab, setActiveSymbolTab] = useState<'escudo' | 'bandera' | 'logotipo' | 'himno'>('escudo');
  const [activeEscudoHotspot, setActiveEscudoHotspot] = useState<'rueda' | 'caduceo' | 'ramas'>('rueda');

  // Anthem Audio State
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [anthemProgress, setAnthemProgress] = useState(0);
  const [activeAnthemLineIndex, setActiveAnthemLineIndex] = useState(0);

  const handlePlayAnthem = () => {
    if (isPlayingAnthem) {
      anthemSynthesizer.stop();
      setIsPlayingAnthem(false);
      setAnthemProgress(0);
    } else {
      setIsPlayingAnthem(true);
      anthemSynthesizer.play(
        (noteIndex, progressRatio) => {
          setAnthemProgress(Math.round(progressRatio * 100));
          // Approximate sync with lyrics lines
          const line = Math.min(Math.floor(progressRatio * 4), 3);
          setActiveAnthemLineIndex(line);
        },
        () => {
          setIsPlayingAnthem(false);
          setAnthemProgress(0);
        }
      );
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-[#287b01] dark:text-[#48cf00] uppercase tracking-wider mb-1">
          <span>Identidad Institucional</span>
          <span aria-hidden="true">·</span>
          <span>Patrimonio Nacional</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
          Símbolos, Raíces y Filosofía del SENA
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-3xl">
          Cada símbolo del Servicio Nacional de Aprendizaje fue concebido para honrar a los trabajadores, la paz de Colombia y la dignificación del ser humano mediante el estudio y la técnica.
        </p>

        {/* Symbol Selector Tabs (Interactive button controls) */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveSymbolTab('escudo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeSymbolTab === 'escudo'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#39A900] dark:text-[#48cf00]" />
            <span>El Escudo & Sectores</span>
          </button>
          <button
            onClick={() => setActiveSymbolTab('bandera')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeSymbolTab === 'bandera'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-blue-500" />
            <span>La Bandera Institucional</span>
          </button>
          <button
            onClick={() => setActiveSymbolTab('logotipo')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeSymbolTab === 'logotipo'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>El Logotipo del Aprendiz</span>
          </button>
          <button
            onClick={() => setActiveSymbolTab('himno')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeSymbolTab === 'himno'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-purple-500" />
            <span>El Himno & Audio Marcial</span>
          </button>
        </div>
      </div>

      {/* Symbol 1: El Escudo */}
      {activeSymbolTab === 'escudo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Escudo Visual Stage */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/20 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center relative flex flex-col items-center justify-center min-h-[380px]">
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Outer Gear Simulation */}
              <div
                onClick={() => setActiveEscudoHotspot('rueda')}
                className={`cursor-pointer transition-all duration-300 w-52 h-52 rounded-full border-4 flex items-center justify-center relative ${
                  activeEscudoHotspot === 'rueda'
                    ? 'border-[#39A900] shadow-xl shadow-[#39A900]/20 scale-105 bg-white dark:bg-slate-800'
                    : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 bg-white/80 dark:bg-slate-850'
                }`}
                title="Haz clic para inspeccionar la Rueda Dentada"
              >
                {/* Gear teeth notches */}
                <div className="absolute inset-0 border-2 border-dashed border-slate-400/50 dark:border-slate-500/50 rounded-full animate-spin-slow pointer-events-none" />

                {/* Caduceus Center */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEscudoHotspot('caduceo');
                  }}
                  className={`cursor-pointer transition-all w-28 h-28 rounded-full flex flex-col items-center justify-center ${
                    activeEscudoHotspot === 'caduceo'
                      ? 'bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 ring-4 ring-amber-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Haz clic para inspeccionar el Caduceo"
                >
                  <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-tight">Caduceo</span>
                </div>

                {/* Branches at the bottom */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEscudoHotspot('ramas');
                  }}
                  className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs cursor-pointer ${
                    activeEscudoHotspot === 'ramas'
                      ? 'bg-emerald-700 text-white ring-2 ring-emerald-400'
                      : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  🌿 Ramas & Espiga
                </div>
              </div>

            </div>

            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Haz clic en cualquiera de las 3 partes para conocer su significado productivo.
            </div>
          </div>

          {/* Details Deck */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg inline-flex">
              <button
                onClick={() => setActiveEscudoHotspot('rueda')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeEscudoHotspot === 'rueda' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                1. Rueda Dentada
              </button>
              <button
                onClick={() => setActiveEscudoHotspot('caduceo')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeEscudoHotspot === 'caduceo' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2. El Caduceo Alado
              </button>
              <button
                onClick={() => setActiveEscudoHotspot('ramas')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeEscudoHotspot === 'ramas' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                3. Las Ramas y Espiga
              </button>
            </div>

            {activeEscudoHotspot === 'rueda' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] uppercase font-semibold">
                  <span>Sector Secundario</span>
                  <span aria-hidden="true">·</span>
                  <span>Industria y Construcción</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">La Rueda Dentada (El Piñón Industrial)</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Representa la fuerza motriz, la mecanización, la tecnología aplicada y el empuje de la industria manufacturera y de la construcción en Colombia. 
                  Simboliza cómo cada engranaje del conocimiento técnico se articula para hacer girar la economía nacional con precisión y progreso constante.
                </p>
                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <strong>Programas afines:</strong> Mecánica industrial, Mecatrónica, Automatización, Obras civiles, Soldadura, Electricidad y Energías Renovables.
                </div>
              </div>
            )}

            {activeEscudoHotspot === 'caduceo' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-400 uppercase font-semibold">
                  <span>Sector Terciario</span>
                  <span aria-hidden="true">·</span>
                  <span>Comercio y Servicios</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">El Caduceo con Alas</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Históricamente asociado al dios Mercurio, en la heráldica institucional del SENA representa la actividad comercial, el intercambio ético de bienes, la logística y la prestación de servicios modernos.
                  Las dos serpientes entrelazadas simbolizan la prudencia, el equilibrio de intereses y el acuerdo justo entre empresarios y trabajadores.
                </p>
                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <strong>Programas afines:</strong> Gestión empresarial, Mercadeo, Software (ADSO), Contabilidad y Finanzas, Logística, Turismo y Gastronomía.
                </div>
              </div>
            )}

            {activeEscudoHotspot === 'ramas' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] uppercase font-semibold">
                  <span>Sector Primario</span>
                  <span aria-hidden="true">·</span>
                  <span>Agropecuario, Minero y Ambiental</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ramas de Café y Espigas de Trigo</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Rinde tributo a los campesinos y productores rurales de Colombia. El café, producto insignia de nuestra identidad, y la espiga de cereal representan la fertilidad del suelo, la seguridad alimentaria, la biodiversidad y el respeto por los recursos naturales de nuestra tierra.
                </p>
                <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                  <strong>Programas afines:</strong> Gestión agroempresarial, Producción agrícola, Ganadería regenerativa, Biotecnología, Recursos naturales y Forestal.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Symbol 2: La Bandera */}
      {activeSymbolTab === 'bandera' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center min-h-[340px]">
            {/* Visual Flag Representation */}
            <div className="w-full max-w-[320px] aspect-3/2 bg-white rounded-md shadow-md border border-slate-200 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/60 to-transparent pointer-events-none" />
              <div className="w-20 h-20 rounded-full border-2 border-[#39A900] flex flex-col items-center justify-center text-center p-2 bg-white shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#39A900] text-white font-bold flex items-center justify-center text-xs">
                  S
                </div>
                <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase">SENA</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Bandera Oficial: Lienzo blanco con el escudo en el centro
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              El Lienzo Blanco de la Paz y la Libertad
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              La bandera del SENA se distingue por su fondo blanco inmaculado. A diferencia de enseñas de combate, el color blanco encarna la tranquilidad, la rectitud moral, la transparencia en la gestión de los recursos públicos y, sobre todo, el compromiso permanente del SENA como constructor de paz territorial en Colombia.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-900 dark:text-white">Protocolo Institucional:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Se iza junto a la Bandera de la República de Colombia y la bandera del departamento o municipio en todos los actos solemnes.</li>
                <li>Permanecerá siempre en perfecto estado de limpieza y dignidad en los despachos de los centros de formación.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Symbol 3: El Logotipo / Isotipo */}
      {activeSymbolTab === 'logotipo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-950 p-8 rounded-2xl border border-slate-800 text-white flex flex-col items-center justify-center min-h-[340px]">
            {/* SVG stylized silhouette */}
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-36 h-36 fill-current text-white drop-shadow-md">
                {/* Stylized head */}
                <circle cx="50" cy="18" r="9" />
                {/* Stylized torso & outstretched arms reaching forward */}
                <path d="M50 32 L50 62 M25 44 L50 38 L75 44" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                {/* Legs walking forward */}
                <path d="M50 62 L34 90 M50 62 L66 90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-xs text-emerald-300 font-mono tracking-wide">
              ISOTIPO: EL APRENDIZ EN MARCHA
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              El Aprendiz que Camina Hacia el Futuro
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              El logotipo característico del SENA sintetiza la silueta estilizada de un ser humano —el aprendiz— que camina con paso firme y los brazos abiertos hacia el porvenir. 
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              El sendero que recorre representa el camino del conocimiento, la disciplina técnica y la formación humana que transforma la vida del estudiante y la de su familia. Los brazos abiertos simbolizan la receptividad a las nuevas ideas, el espíritu colaborativo y el abrazo fraternal a la patria.
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
              "El centro del SENA no son las máquinas ni los edificios: es la persona que se supera cada día."
            </div>
          </div>
        </div>
      )}

      {/* Symbol 4: El Himno */}
      {activeSymbolTab === 'himno' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-mono text-purple-700 dark:text-purple-400 uppercase font-semibold">
                Composición Oficial (1957)
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Himno del Servicio Nacional de Aprendizaje
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>Letra: Luis Alfredo Sánchez</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>Música: Daniel Marlez</span>
              </div>
            </div>

            {/* Interactive Audio Synthesizer Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayAnthem}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
                  isPlayingAnthem
                    ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400/40 animate-pulse'
                    : 'bg-[#39A900] hover:bg-[#329200] text-white'
                }`}
              >
                {isPlayingAnthem ? (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Detener Melodía</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Reproducir Melodía Marcial</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Synth Audio Progress Bar */}
          {isPlayingAnthem && (
            <div className="space-y-1.5 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-purple-900 dark:text-purple-200 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-bounce" />
                  Sintetizador Web Audio: Marcha triunfal en reproducción
                </span>
                <span className="font-mono tabular-nums">{anthemProgress}%</span>
              </div>
              <div className="w-full bg-purple-200 dark:bg-purple-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-600 dark:bg-purple-400 h-full transition-all duration-300"
                  style={{ width: `${anthemProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Stanzas Display with Karaoke Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ANTHEM_STANZA_DATA.map((stanza, sIdx) => (
              <div
                key={sIdx}
                className={`p-5 rounded-xl border transition-all ${
                  sIdx === 0 && isPlayingAnthem
                    ? 'border-purple-300 dark:border-purple-600 bg-purple-50/40 dark:bg-purple-950/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/60'
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#2c7f02] dark:text-[#48cf00] mb-3 uppercase tracking-wider">
                  {stanza.type}
                </div>
                <div className="space-y-1 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic">
                  {stanza.lyrics.map((line, lIdx) => {
                    const isHighlighted = sIdx === 0 && isPlayingAnthem && activeAnthemLineIndex === lIdx;
                    return (
                      <p
                        key={lIdx}
                        className={`transition-colors px-1 rounded-sm ${
                          isHighlighted ? 'bg-purple-200/80 dark:bg-purple-800/80 text-purple-950 dark:text-purple-100 font-bold not-italic' : ''
                        }`}
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-normal not-italic">
                  {stanza.meaning}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Historical Milestones Timeline */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-4">
          Línea del Tiempo: Hitos Fundamentales del SENA
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-base font-bold font-mono text-[#39A900] dark:text-[#48cf00] tabular-nums">1957</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Nacimiento del SENA</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Decreto Ley 118. Rodolfo Martínez Tono funda la institución con apoyo tripartito (Gobierno, ANDI, Sindicatos).
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-base font-bold font-mono text-[#39A900] dark:text-[#48cf00] tabular-nums">1960-70</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Expansión Nacional</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Apertura de centros de formación fija y móvil en todos los departamentos y puertos marítimos.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-base font-bold font-mono text-[#39A900] dark:text-[#48cf00] tabular-nums">1990s</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Enfoque por Competencias</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Adopción del modelo pedagógico por competencias laborales y creación del Fondo Emprender.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-base font-bold font-mono text-[#39A900] dark:text-[#48cf00] tabular-nums">2000s</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Revolución SofiaPlus</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Sistematización integral de matrículas, certificados y formación virtual para millones de colombianos.
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-base font-bold font-mono text-[#39A900] dark:text-[#48cf00] tabular-nums">HOY</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white mt-1">Industria 4.0 & Zajuna</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Nuevo LMS Zajuna, inteligencia artificial, bioeconomía y transición energética en toda Colombia.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
