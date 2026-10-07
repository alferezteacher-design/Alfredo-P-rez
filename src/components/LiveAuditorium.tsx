import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Users,
  Calendar,
  MessageSquare,
  Send,
  Sparkles,
  MapPin,
  Clock,
  Maximize2,
  Monitor,
  Share2,
  CheckCircle2,
  ChevronRight,
  Layers,
  Award,
  Video
} from 'lucide-react';
import { LearnerProfile } from '../types/induction';

interface LiveAuditoriumProps {
  learnerProfile: LearnerProfile;
  onExploreModules: () => void;
}

interface Attendee {
  id: string;
  name: string;
  city: string;
  regional: string;
  program: string;
  avatarColor: string;
  greeting: string;
  initials: string;
}

const LIVE_ATTENDEES: Attendee[] = [
  {
    id: 'att-1',
    name: 'Valentina Restrepo',
    city: 'Medellín',
    regional: 'Regional Antioquia',
    program: 'ADSO - Ficha 2874192',
    avatarColor: 'from-emerald-500 to-teal-700',
    greeting: '¡Listos para transformar el país desde el desarrollo de software! Orgullo SENA.',
    initials: 'VR',
  },
  {
    id: 'att-2',
    name: 'Mateo Cárdenas',
    city: 'Bogotá D.C.',
    regional: 'Regional D.C.',
    program: 'Mecatrónica Industrial',
    avatarColor: 'from-blue-500 to-indigo-700',
    greeting: 'Conectado desde el Complejo Paloquemao. ¡Excelente energía en esta inducción!',
    initials: 'MC',
  },
  {
    id: 'att-3',
    name: 'Danna Sofía Moreno',
    city: 'Cali',
    regional: 'Regional Valle',
    program: 'Biotecnología y Alimentos',
    avatarColor: 'from-purple-500 to-pink-700',
    greeting: 'Aprovechando cada oportunidad del centro formativo. ¡Saludos Valle del Cauca!',
    initials: 'DM',
  },
  {
    id: 'att-4',
    name: 'Julián David Parra',
    city: 'Bucaramanga',
    regional: 'Regional Santander',
    program: 'Energías Renovables',
    avatarColor: 'from-amber-500 to-orange-700',
    greeting: 'Comprometidos con la transición energética limpia en Colombia.',
    initials: 'JP',
  },
  {
    id: 'att-5',
    name: 'Camila Andrea Ospina',
    city: 'Barranquilla',
    regional: 'Regional Atlántico',
    program: 'Logística Portuaria',
    avatarColor: 'from-cyan-500 to-blue-700',
    greeting: 'La Costa Caribe presente en esta jornada nacional de aprendices.',
    initials: 'CO',
  },
  {
    id: 'att-6',
    name: 'Santiago Morales',
    city: 'Manizales',
    regional: 'Regional Caldas',
    program: 'Gestión Agroempresarial',
    avatarColor: 'from-lime-500 to-emerald-700',
    greeting: 'El campo colombiano tiene en el SENA su mayor aliado para innovar.',
    initials: 'SM',
  },
  {
    id: 'att-7',
    name: 'Laura Jimena Pardo',
    city: 'Neiva',
    regional: 'Regional Huila',
    program: 'Animación Digital 3D',
    avatarColor: 'from-fuchsia-500 to-rose-700',
    greeting: 'Creando arte y narrativa digital con las herramientas de los ambientes SENA.',
    initials: 'LP',
  },
  {
    id: 'att-8',
    name: 'Andrés Felipe Ramos',
    city: 'Pasto',
    regional: 'Regional Nariño',
    program: 'Redes de Datos y Ciberseguridad',
    avatarColor: 'from-sky-500 to-indigo-700',
    greeting: 'Protegiendo la infraestructura tecnológica de nuestras comunidades.',
    initials: 'AR',
  },
  {
    id: 'att-9',
    name: 'Gabriela Silva',
    city: 'Villavicencio',
    regional: 'Regional Meta',
    program: 'Producción Pecuaria Sostenible',
    avatarColor: 'from-emerald-600 to-green-800',
    greeting: '¡Los Llanos Orientales construyendo soberanía alimentaria con el SENA!',
    initials: 'GS',
  },
  {
    id: 'att-10',
    name: 'Esteban Cuero',
    city: 'Quibdó',
    regional: 'Regional Chocó',
    program: 'Construcción y Obras Civiles',
    avatarColor: 'from-teal-600 to-cyan-800',
    greeting: 'Edificando progreso territorial con calidad y trabajo en equipo.',
    initials: 'EC',
  },
  {
    id: 'att-11',
    name: 'Mariana Duque',
    city: 'Pereira',
    regional: 'Regional Risaralda',
    program: 'Turismo Sostenible y Guianza',
    avatarColor: 'from-amber-600 to-yellow-700',
    greeting: 'Mostrando la riqueza de nuestro Paisaje Cultural Cafetero al mundo.',
    initials: 'MD',
  },
  {
    id: 'att-12',
    name: 'Nicolás Bernal',
    city: 'Ibagué',
    regional: 'Regional Tolima',
    program: 'Producción de Medios Audiovisuales',
    avatarColor: 'from-violet-600 to-purple-800',
    greeting: 'Contando las historias que inspiran a nuestra Colombia profunda.',
    initials: 'NB',
  },
];

const SCHEDULE_ITEMS = [
  {
    time: '08:00 AM',
    stage: 'Escenario Central',
    title: 'Apertura Oficial: Historia y Mística Institucional SENA',
    speaker: 'Dirección General & Subdirectores',
    status: 'completado',
  },
  {
    time: '09:30 AM',
    stage: 'Plenaria VDS+',
    title: 'El Modelo FPI: Competencias para la Vida y el Empleo',
    speaker: 'Equipo Pedagógico Nacional',
    status: 'en_vivo',
  },
  {
    time: '11:15 AM',
    stage: 'Sala Ética',
    title: 'Tribunal de Casos: Reglamento del Aprendiz y Liderazgo',
    speaker: 'Comité de Convivencia y Voceros',
    status: 'proximo',
  },
  {
    time: '02:00 PM',
    stage: 'Tech Stage',
    title: 'Ecosistema Digital: Dominando SofiaPlus, Zajuna y Bibliotecas',
    speaker: 'Coordinación de Tecnologías Formativas',
    status: 'proximo',
  },
  {
    time: '04:00 PM',
    stage: 'Auditorio Bienestar',
    title: 'Oportunidades de Bienestar, Subsidios y Emprendimiento',
    speaker: 'Líderes de Bienestar al Aprendiz',
    status: 'proximo',
  },
];

const KEYNOTE_CHANNELS = [
  {
    id: 'ch-1',
    title: 'Canal 1: Plenaria Magistral VDS+ en Vivo',
    subtitle: 'Auditorio Central de Innovación Nacional',
    speakerName: 'Dr. Jorge Eduardo Londoño Ulloa',
    speakerRole: 'Director General del SENA',
    topic: 'La formación técnica como motor de dignidad, paz y progreso para la juventud',
    liveBadge: 'TRANSMISIÓN PRINCIPAL',
  },
  {
    id: 'ch-2',
    title: 'Canal 2: Ecosistema Tecnológico & SENNOVA',
    subtitle: 'Laboratorios de Inteligencia Artificial y Tecnoparque',
    speakerName: 'Ing. Carlos Alberto Morales',
    speakerRole: 'Líder de Investigación Aplicada SENNOVA',
    topic: 'Cómo financiar y prototipar tu proyecto formativo con apoyo institucional',
    liveBadge: 'SALA TECNOLÓGICA',
  },
  {
    id: 'ch-3',
    title: 'Canal 3: Panel de Egresados y Empleo APE',
    subtitle: 'Casos de Éxito y Contrato de Aprendizaje',
    speakerName: 'Laura Marcela Rengifo',
    speakerRole: 'Egresada ADSO · Desarrolladora Cloud en Europa',
    topic: 'Del centro de formación al mercado global: mi ruta con el SENA',
    liveBadge: 'PANEL VOCEROS',
  },
];

export const LiveAuditorium: React.FC<LiveAuditoriumProps> = ({
  learnerProfile,
  onExploreModules,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeChannelIdx, setActiveChannelIdx] = useState<number>(0);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee>(LIVE_ATTENDEES[0]);
  const [viewMode, setViewMode] = useState<'videoWall' | 'fullStage'>('videoWall');
  const [attendeesList, setAttendeesList] = useState<Attendee[]>(LIVE_ATTENDEES);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [sentNotice, setSentNotice] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(42810);

  // Gentle realistic live counter fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentChannel = KEYNOTE_CHANNELS[activeChannelIdx];

  const handleSendGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newAttendee: Attendee = {
      id: `att-user-${Date.now()}`,
      name: learnerProfile.fullName,
      city: learnerProfile.regional.replace('Regional ', ''),
      regional: learnerProfile.regional,
      program: `${learnerProfile.programName} · Ficha ${learnerProfile.fichaNumber}`,
      avatarColor: 'from-[#39A900] to-emerald-800',
      greeting: chatMessage.trim(),
      initials: learnerProfile.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join(''),
    };

    setAttendeesList([newAttendee, ...attendeesList]);
    setSelectedAttendee(newAttendee);
    setChatMessage('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Stage Header Info / Lighting Truss inspiration */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-red-500 -ml-3.5" />
              EN VIVO
            </span>
            <span className="text-slate-400 dark:text-slate-500" aria-hidden="true">·</span>
            <span className="text-sky-700 dark:text-sky-400 font-semibold tracking-wide">
              AUDITORIO NACIONAL DIGITAL VDS+
            </span>
            <span className="text-slate-400 dark:text-slate-500" aria-hidden="true">·</span>
            <span className="text-slate-600 dark:text-slate-300">
              Vigencia Formativa 2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Gran Pantalla de Inducción & Conferencia Nacional
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl mt-1">
            Inspirada en los auditorios de innovación del SENA: una experiencia panorámica interactiva que conecta en tiempo real a los aprendices de las 33 regionales de Colombia.
          </p>
        </div>

        {/* View Switcher & Global stats */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <Users className="w-3.5 h-3.5 text-[#39A900] dark:text-[#48cf00]" />
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">
              {onlineCount.toLocaleString('es-CO')}
            </span>
            <span className="text-slate-500 dark:text-slate-400">conectados</span>
          </div>

          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('videoWall')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'videoWall'
                  ? 'bg-slate-900 dark:bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Gran Pantalla LED</span>
            </button>
            <button
              onClick={() => setViewMode('fullStage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'fullStage'
                  ? 'bg-slate-900 dark:bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Vista Escenario 360°</span>
            </button>
          </div>
        </div>
      </div>

      {/* THE GIANT PANORAMIC LED SCREEN (Centerpiece inspired by user image) */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-slate-800 bg-[#070d19] shadow-2xl shadow-sky-950/40 text-white transition-all">
        
        {/* Top Truss / Video Wall Header Bar */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-slate-950 via-[#0b1528] to-[#07132e] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-sky-400 tracking-wider">
                SENA DIGITAL STAGE · VDS+ 2026
              </span>
            </div>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">
              Regional Host: 33 Sedes Interconectadas
            </span>
          </div>

          {/* Channel selector on the screen */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {KEYNOTE_CHANNELS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannelIdx(idx)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-colors ${
                  activeChannelIdx === idx
                    ? 'bg-sky-600 text-white ring-1 ring-sky-300'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Canal {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* ULTRA-WIDE PANORAMIC 3-SECTION DISPLAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          
          {/* SECTION 1: SCHEDULE & REGIONAL NETWORK (Left Column - 3 cols) */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#091122]/95 to-[#060b17]/95 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-mono text-xs font-bold text-sky-300 uppercase tracking-wider">
                    Cronograma en Vivo
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">Hoy</span>
              </div>

              <div className="space-y-2.5">
                {SCHEDULE_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs transition-colors ${
                      item.status === 'en_vivo'
                        ? 'bg-sky-950/70 border-sky-500/80 shadow-md shadow-sky-500/10'
                        : item.status === 'completado'
                        ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="font-semibold text-slate-300">{item.time}</span>
                      {item.status === 'en_vivo' && (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/30 text-[9px] animate-pulse">
                          EN VIVO
                        </span>
                      )}
                      {item.status === 'completado' && (
                        <span className="text-emerald-400 flex items-center gap-0.5 text-[9px]">
                          <CheckCircle2 className="w-3 h-3" /> Concluido
                        </span>
                      )}
                      {item.status === 'proximo' && (
                        <span className="text-slate-400 text-[9px]">Siguiente</span>
                      )}
                    </div>
                    <div className="font-bold text-white text-xs leading-snug line-clamp-2">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {item.speaker}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro network stats widget */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
                <span>Red de Aprendices SENA:</span>
                <span className="text-emerald-400 font-bold">100% Online</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="text-sky-400 font-bold text-sm">33 / 33</div>
                  <div className="text-[9px] text-slate-400">Regionales</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="text-[#48cf00] font-bold text-sm">118+</div>
                  <div className="text-[9px] text-slate-400">Centros</div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: ATTENDEE MOSAIC GRID ("Wall of Faces" - Center 4 cols) */}
          <div className="lg:col-span-4 bg-[#081020]/90 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Mosaico de Aprendices ({attendeesList.length})
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Clic para interactuar</span>
              </div>

              {/* The Face Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
                {attendeesList.slice(0, 12).map((att) => {
                  const isSelected = selectedAttendee.id === att.id;
                  return (
                    <button
                      key={att.id}
                      onClick={() => setSelectedAttendee(att)}
                      title={`${att.name} (${att.regional})`}
                      className={`relative aspect-square rounded-xl overflow-hidden p-1 flex flex-col items-center justify-center transition-all group ${
                        isSelected
                          ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 scale-105 shadow-lg shadow-emerald-500/20'
                          : 'hover:scale-102 hover:ring-1 hover:ring-slate-500 bg-slate-900/60 border border-slate-800'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr ${att.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-inner`}
                      >
                        {att.initials}
                      </div>
                      <span className="text-[9px] font-medium text-slate-300 truncate w-full text-center mt-1 group-hover:text-white">
                        {att.name.split(' ')[0]}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Highlight Card for the Selected Attendee */}
              <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-sky-950/60 border border-sky-500/30 text-xs space-y-1.5 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sky-200">{selectedAttendee.name}</div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {selectedAttendee.city}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {selectedAttendee.program} · {selectedAttendee.regional}
                </div>
                <p className="text-[11px] text-slate-200 italic bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  "{selectedAttendee.greeting}"
                </p>
              </div>
            </div>

            {/* Quick Greeting Input for the Apprentice */}
            <form onSubmit={handleSendGreeting} className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Tu saludo a la Gran Pantalla:</span>
                {sentNotice && <span className="text-emerald-400 font-bold">¡Publicado con éxito!</span>}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje institucional..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#39A900] hover:bg-[#329200] text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: CENTRAL BROADCAST & LIVE KEYNOTE (Right Column - 5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#060c18] via-[#09152e] to-[#040813] p-4 sm:p-6 flex flex-col justify-between space-y-5">
            
            {/* Live Stream Viewport */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-950 border border-sky-500/30 group shadow-xl">
                
                {/* Simulated Conference Video Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 mb-3 backdrop-blur-xs group-hover:scale-110 transition-transform">
                    {isPlaying ? <Video className="w-8 h-8 text-sky-400 animate-pulse" /> : <Play className="w-8 h-8 text-slate-400 ml-1" />}
                  </div>

                  <div className="space-y-1 z-10">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600/90 text-white font-bold tracking-wider uppercase inline-block shadow-xs">
                      {currentChannel.liveBadge}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white font-display line-clamp-2">
                      {currentChannel.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-1 max-w-sm mx-auto">
                      {currentChannel.subtitle}
                    </p>
                  </div>

                  {/* High-tech audio visualizer wave animation */}
                  {isPlaying && (
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-center gap-1 opacity-70">
                      {[30, 60, 40, 80, 50, 90, 70, 45, 85, 60, 40, 95, 55, 75, 40, 65].map((h, i) => (
                        <div
                          key={i}
                          className="w-1 bg-sky-400 rounded-full animate-pulse"
                          style={{
                            height: `${h * 0.25}px`,
                            animationDelay: `${(i * 0.1) % 1}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Video HUD Overlays */}
                <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-950/80 text-white border border-slate-700">
                    HD · 1080p
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-sky-900/80 text-sky-200 border border-sky-700/60">
                    SENA PLAY
                  </span>
                </div>

                {/* Player Interactive Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-sky-400 transition-colors p-1"
                      title={isPlaying ? 'Pausar transmisión' : 'Reanudar transmisión'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-sky-400 transition-colors p-1"
                      title={isMuted ? 'Activar audio' : 'Silenciar'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                      {isPlaying ? '01:24:18 / EN DIRECTO' : 'PAUSADO'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const el = document.getElementById('induction-stage');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] font-mono text-sky-300 hover:text-white underline underline-offset-2"
                    >
                      Ver Módulos
                    </button>
                  </div>
                </div>

              </div>

              {/* Speaker Card & Key Takeaways ("What's going on") */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-sky-400 font-semibold">
                      Ponente Invitado:
                    </div>
                    <div className="text-sm font-bold text-white font-display">
                      {currentChannel.speakerName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {currentChannel.speakerRole}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-700 text-white font-bold flex items-center justify-center shrink-0 border border-sky-400/40 text-xs shadow-md">
                    {currentChannel.speakerName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">Eje temático: </span>
                  {currentChannel.topic}
                </div>
              </div>

            </div>

            {/* Quick Action Button to continue induction */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                ¿Listo para validar tus conocimientos?
              </span>
              <button
                onClick={onExploreModules}
                className="px-4 py-2 bg-gradient-to-r from-[#39A900] to-emerald-600 hover:from-[#329200] hover:to-emerald-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-[#39A900]/25 transition-all inline-flex items-center gap-1.5"
              >
                <span>Ir a la Ruta Formativa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* AUDITORIUM LOUNGE EXPERIENCE (Foreground Seating & Stage Presence inspired by photo) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Transmisión Tripartita Nacional
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Las sesiones de inducción conectan a aprendices, empresarios patrocinadores y directivos. Cada encuentro refuerza el pacto social establecido desde 1957.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-[#48cf00] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Voz del Aprendiz & Participación
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Interactúa en vivo con voceros de otras fichas y regionales. Comparte tus aspiraciones formativas y conoce cómo postularte a representante de centro.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Certificación de Asistencia Digital
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Tu asistencia a la plenaria se registra automáticamente en tu expediente de SofiaPlus y se computa como evidencia válida para tu inducción.
          </p>
        </div>
      </div>
    </div>
  );
};
