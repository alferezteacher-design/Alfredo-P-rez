import React, { useState, useEffect, useRef } from 'react';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldAlert,
  Award,
  FileText,
  ChevronRight,
  BookOpen,
  Users,
  AlertCircle,
  FileCheck,
  Building,
  UserCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Timer,
  RefreshCw,
  Trophy,
  Medal,
  Check,
  Star,
  Play,
  X
} from 'lucide-react';
import { REGULATION_CASES, REGIONAL_LIST } from '../data/senaData';
import { EVALUATION_QUESTIONS, EVALUATION_SECTIONS, EvaluationQuestion } from '../data/evaluationQuestions';
import { RegulationCase, LearnerProfile } from '../types/induction';

interface RegulationsSimulatorProps {
  learnerProfile: LearnerProfile;
  onSaveProfile: (profile: LearnerProfile) => void;
}

// Synth Web Audio API Sound System
const playSound = (type: 'correct' | 'incorrect' | 'fanfare') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'correct') {
      // Pleasant ascending double chime
      const osc1 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.35);
      osc1.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.35);
    } else if (type === 'incorrect') {
      // Soft low warnings buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'fanfare') {
      // Triumph chord arpeggio
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + i * 0.07 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + 0.75);
      });
    }
  } catch (e) {
    console.warn('Audio system blocked by browser auto-play policy', e);
  }
};

export const RegulationsSimulator: React.FC<RegulationsSimulatorProps> = ({
  learnerProfile,
  onSaveProfile
}) => {
  // General Tab Navigation
  const [activeTab, setActiveTab] = useState<'evaluacion' | 'simulador' | 'derechos' | 'deberes' | 'permanencia' | 'faltas' | 'acuerdo'>('evaluacion');
  
  // Classic Case Simulator State
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [userDecisions, setUserDecisions] = useState<Record<string, number>>({});
  
  // Gamified Evaluation Game States
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'summary'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<boolean[]>([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30); // 30-sec limit per question or just timer
  
  // Profile pre-evaluation form state
  const [editName, setEditName] = useState(learnerProfile.fullName);
  const [editDoc, setEditDoc] = useState(learnerProfile.documentNumber);
  const [editFicha, setEditFicha] = useState(learnerProfile.fichaNumber || '');
  const [editProgram, setEditProgram] = useState(learnerProfile.programName || '');
  const [editLevel, setEditLevel] = useState<LearnerProfile['programType']>(learnerProfile.programType || 'Tecnólogo');
  const [editCenter, setEditCenter] = useState(learnerProfile.centerName || '');
  const [editRegional, setEditRegional] = useState(learnerProfile.regional || 'Regional Distrito Capital');

  // Timers and references
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  // Sync edits if learnerProfile changes externally
  useEffect(() => {
    setEditName(learnerProfile.fullName);
    setEditDoc(learnerProfile.documentNumber);
    setEditFicha(learnerProfile.fichaNumber || '');
    setEditProgram(learnerProfile.programName || '');
    setEditLevel(learnerProfile.programType || 'Tecnólogo');
    setEditCenter(learnerProfile.centerName || '');
    setEditRegional(learnerProfile.regional || 'Regional Distrito Capital');
  }, [learnerProfile]);

  // Game timer control
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Track start of each question
  useEffect(() => {
    if (gameState === 'playing') {
      questionStartTimeRef.current = Date.now();
    }
  }, [currentQuestionIdx, gameState]);

  // Classic Case Simulator handlers
  const currentCase: RegulationCase = REGULATION_CASES[selectedCaseIndex] || REGULATION_CASES[0];
  const chosenOptionIndex = userDecisions[currentCase.id];
  const hasAnsweredCurrentCase = chosenOptionIndex !== undefined;

  const handleSelectCaseOption = (caseId: string, optionIdx: number) => {
    setUserDecisions(prev => ({ ...prev, [caseId]: optionIdx }));
    const opt = currentCase.options[optionIdx];
    if (opt.isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  const totalCasesResolved = Object.keys(userDecisions).length;

  // Gamified Quiz action handlers
  const handleStartEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editDoc.trim() || !editFicha.trim() || !editProgram.trim() || !editCenter.trim()) {
      alert('Por favor, completa todos los campos del perfil antes de iniciar la evaluación.');
      return;
    }

    // Save profile to sync across parent app
    const updatedProfile: LearnerProfile = {
      ...learnerProfile,
      fullName: editName.trim(),
      documentNumber: editDoc.trim(),
      fichaNumber: editFicha.trim(),
      programName: editProgram.trim(),
      programType: editLevel,
      centerName: editCenter.trim(),
      regional: editRegional,
    };
    onSaveProfile(updatedProfile);

    // Initialize/Reset evaluation game state
    setGameState('playing');
    setCurrentQuestionIdx(0);
    setSelectedOptIdx(null);
    setHasSubmittedAnswer(false);
    setElapsedSeconds(0);
    setTotalScore(0);
    setCorrectCount(0);
    setCurrentStreak(0);
    setAnswersHistory([]);
  };

  const currentQuestion: EvaluationQuestion = EVALUATION_QUESTIONS[currentQuestionIdx];

  const handleSubmitAnswer = () => {
    if (selectedOptIdx === null || hasSubmittedAnswer) return;

    const isCorrect = selectedOptIdx === currentQuestion.correctIndex;
    const timeTaken = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    
    // Play synthesis sounds based on correctness
    if (isCorrect) {
      playSound('correct');
    } else {
      playSound('incorrect');
    }

    // Compute gamified scoring
    let earnedPoints = 0;
    if (isCorrect) {
      // Base score
      earnedPoints += 100;

      // Speed bonus: <= 8s gets 50 pts, <= 15s gets 25 pts
      if (timeTaken <= 8) {
        earnedPoints += 50;
      } else if (timeTaken <= 15) {
        earnedPoints += 25;
      }

      // Streak bonus: 15 pts extra per streak multiplier
      const nextStreak = currentStreak + 1;
      earnedPoints += currentStreak * 15;
      
      setCorrectCount(prev => prev + 1);
      setCurrentStreak(nextStreak);
    } else {
      setCurrentStreak(0);
    }

    setTotalScore(prev => prev + earnedPoints);
    setAnswersHistory(prev => [...prev, isCorrect]);
    setHasSubmittedAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < EVALUATION_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptIdx(null);
      setHasSubmittedAnswer(false);
    } else {
      // Finished all 25 questions! Save results into Google Sheets / Local queue
      setGameState('summary');
      playSound('fanfare');
      saveEvaluationSubmission();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Save the evaluation results directly to the local submissions queue so the administrator can sync them
  const saveEvaluationSubmission = () => {
    try {
      const savedStr = localStorage.getItem('sena_local_submissions');
      const submissions = savedStr ? JSON.parse(savedStr) : [];
      
      const doc = editDoc.trim() || 'SIN-DOC';
      const scorePercentage = Math.round((correctCount / EVALUATION_QUESTIONS.length) * 100);
      const now = new Date();
      const fechaStr = now.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      const existingIdx = submissions.findIndex((s: any) => s.documento === doc);
      
      const evaluationState = `Aprobó con ${totalScore} pts (${correctCount}/25 aciertos)`;
      const durationStr = formatTime(elapsedSeconds);

      const currentSubmission = {
        registroId: existingIdx !== -1 ? submissions[existingIdx].registroId : `SENA-${editFicha}-${doc.slice(-4)}-${now.getTime().toString().slice(-4)}`,
        fecha: fechaStr,
        documento: doc,
        nombre: editName.trim(),
        ficha: editFicha || '0000',
        programa: editProgram || 'No especificado',
        nivel: editLevel || 'No especificado',
        centro: editCenter || 'No especificado',
        regional: editRegional || 'No especificado',
        startedAt: now.toISOString().split('T')[0],
        modulos: `Evaluación de Reglamento`,
        porcentaje: `${scorePercentage}%`,
        estado: evaluationState,
        normativa: `Acuerdo 0009 de 2024 (Tiempo: ${durationStr})`,
        synced: false, // Mark as unsynced so Admin can upload to Google Sheet
      };

      if (existingIdx !== -1) {
        submissions[existingIdx] = currentSubmission;
      } else {
        submissions.unshift(currentSubmission);
      }

      localStorage.setItem('sena_local_submissions', JSON.stringify(submissions));
    } catch (err) {
      console.error('Error saving evaluation submission:', err);
    }
  };

  // Rank determination helper
  const getRankData = (score: number) => {
    if (score >= 2300) {
      return {
        title: 'Leyenda del Reglamento (Diamante)',
        color: 'text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        badge: '👑💎',
        desc: '¡Rendimiento legendario! Has respondido de manera perfecta o casi perfecta con asombrosa velocidad.'
      };
    } else if (score >= 1800) {
      return {
        title: 'Guardián del Reglamento (Oro)',
        color: 'text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
        badge: '🏆🥇',
        desc: '¡Excelente! Dominio integral y ético de la normativa del aprendiz con excelente racha y tiempos.'
      };
    } else if (score >= 1400) {
      return {
        title: 'Defensor del Reglamento (Plata)',
        color: 'text-slate-400 dark:text-slate-300 bg-slate-400/10 border-slate-400/30',
        badge: '🛡️🥈',
        desc: '¡Muy bien! Demuestras una apropiación clara y robusta de las directrices y el debido proceso del SENA.'
      };
    } else if (score >= 1000) {
      return {
        title: 'Conductor Ético (Bronce)',
        color: 'text-amber-700 dark:text-amber-600 bg-amber-700/10 border-amber-700/30',
        badge: '🎯🥉',
        desc: '¡Aprobado! Conoces lo esencial del reglamento de convivencia, derechos y deberes.'
      };
    } else {
      return {
        title: 'Aprendiz en Formación',
        color: 'text-slate-600 dark:text-slate-400 bg-slate-600/10 border-slate-600/30',
        badge: '🌱📚',
        desc: 'Estás en camino de apropiación. Te invitamos a leer los resúmenes de capítulos y volver a intentarlo.'
      };
    }
  };

  const rank = getRankData(totalScore);

  // High score leaderboard simulated data merged with current player
  const getLeaderboard = () => {
    const list = [
      { name: 'Juan Sebastián Gómez', ficha: '2874192', score: 2450, time: '01:54', correct: 25, isCurrentPlayer: false },
      { name: 'María Camila Restrepo', ficha: '2874192', score: 2280, time: '02:10', correct: 24, isCurrentPlayer: false },
      { name: 'Andrés Felipe Tobón', ficha: '2874192', score: 1980, time: '02:35', correct: 21, isCurrentPlayer: false },
      { name: 'Diana Marcela Ruiz', ficha: '2874192', score: 1820, time: '02:48', correct: 19, isCurrentPlayer: false },
    ];

    // Insert current player dynamically
    const player = {
      name: editName.trim() || 'Tú',
      ficha: editFicha || '0000',
      score: totalScore,
      time: formatTime(elapsedSeconds),
      correct: correctCount,
      isCurrentPlayer: true
    };

    // Merge and sort
    const merged = [...list, player].sort((a, b) => b.score - a.score);
    return merged;
  };

  return (
    <div className="space-y-8">
      
      {/* Intro Header con Norma Oficial Vigente */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-[#39A900]/15 text-[#216700] dark:text-[#48cf00] font-bold border border-[#39A900]/30 uppercase tracking-wider">
            Acuerdo 0009 de 2024 (5 de Noviembre)
          </span>
          <span className="text-slate-400" aria-hidden="true">·</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">
            Consejo Directivo Nacional · SENA Colombia
          </span>
          <span className="text-slate-400" aria-hidden="true">·</span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold">
            Nuevo Reglamento del Aprendiz
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Reglamento & Evaluación de Certificación
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-4xl leading-relaxed">
          Pacto social y ético formativo bajo principios de inclusión, dignidad y enfoque diferencial. 
          Estudia los capítulos de referencia, entrena con el simulador de casos reales, y presenta la evaluación de certificación para registrar tus resultados.
        </p>

        {/* Grouped Responsive Tab Controls */}
        <div className="mt-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
            Selecciona tu actividad formativa:
          </span>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Gamified Evaluation Priority Button */}
            <button
              onClick={() => {
                setActiveTab('evaluacion');
                setGameState('intro');
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm relative overflow-hidden active:scale-95 ${
                activeTab === 'evaluacion'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white ring-2 ring-emerald-400/40'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>Evaluación de Certificación (25 Preguntas)</span>
              <span className="text-[8px] bg-red-500 text-white font-mono px-1.5 py-0.2 rounded-full absolute -top-1 -right-1 tracking-normal uppercase">
                Oficial
              </span>
            </button>

            {/* General Simulation Button */}
            <button
              onClick={() => setActiveTab('simulador')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'simulador'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-[#39A900] dark:text-[#48cf00]" />
              <span>Simulador de Casos ({totalCasesResolved}/{REGULATION_CASES.length})</span>
            </button>

            {/* Reference Chapters Group */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[9px] font-mono text-slate-400 px-2 font-bold select-none">LEER CAPÍTULOS:</span>
              
              <button
                onClick={() => setActiveTab('derechos')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeTab === 'derechos'
                    ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3 h-3 text-blue-500" />
                <span>Derechos (Cap. II)</span>
              </button>

              <button
                onClick={() => setActiveTab('deberes')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeTab === 'deberes'
                    ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Deberes (Cap. III)</span>
              </button>

              <button
                onClick={() => setActiveTab('permanencia')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeTab === 'permanencia'
                    ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-3 h-3 text-purple-500" />
                <span>Permanencia (Cap. IV)</span>
              </button>

              <button
                onClick={() => setActiveTab('faltas')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeTab === 'faltas'
                    ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3 h-3 text-amber-500" />
                <span>Faltas (Cap. V)</span>
              </button>

              <button
                onClick={() => setActiveTab('acuerdo')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeTab === 'acuerdo'
                    ? 'bg-white dark:bg-slate-800 text-[#39A900] dark:text-[#48cf00] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3 h-3 text-sky-500" />
                <span>Estructura</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== TAB: EVALUACIÓN GAMIFICADA ==================== */}
      {activeTab === 'evaluacion' && (
        <div className="space-y-6">
          
          {/* INTRO: Confirmación de Datos del Aprendiz */}
          {gameState === 'intro' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm max-w-3xl mx-auto overflow-hidden animate-in fade-in duration-200">
              <div className="bg-linear-to-r from-[#39A900] to-emerald-700 text-white p-6 sm:p-8 space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                  Evaluación de Certificación de Aprendiz SENA
                </h3>
                <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
                  Bajo la vigencia del Acuerdo 0009 del 5 de noviembre de 2024. Responde correctamente a las 25 preguntas (5 secciones) para ganar tu insignia de honor y registrar tu puntaje oficial en el libro de calificaciones.
                </p>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                    <UserCheck className="w-4 h-4 text-[#39A900]" />
                    <span>Verifica y Registra tus Datos de Aprendiz</span>
                  </div>

                  <form onSubmit={handleStartEvaluation} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nombre Completo */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Nombre Completo del Aprendiz:
                      </label>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Ej: Carlos Andrés Montoya"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    {/* Documento de Identidad */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Documento de Identidad:
                      </label>
                      <input
                        type="text"
                        required
                        value={editDoc}
                        onChange={(e) => setEditDoc(e.target.value)}
                        placeholder="Ej: 1098234567"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    {/* Número de Ficha */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Número de Ficha de Caracterización:
                      </label>
                      <input
                        type="text"
                        required
                        value={editFicha}
                        onChange={(e) => setEditFicha(e.target.value)}
                        placeholder="Ej: 2874192"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    {/* Programa de Formación */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Programa de Formación:
                      </label>
                      <input
                        type="text"
                        required
                        value={editProgram}
                        onChange={(e) => setEditProgram(e.target.value)}
                        placeholder="Ej: Análisis y Desarrollo de Software (ADSO)"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    {/* Nivel Formativo */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Nivel Formativo:
                      </label>
                      <select
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value as LearnerProfile['programType'])}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-[#39A900]"
                      >
                        <option value="Auxiliar">Auxiliar</option>
                        <option value="Operario">Operario</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                      </select>
                    </div>

                    {/* Regional SENA */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Regional SENA:
                      </label>
                      <select
                        value={editRegional}
                        onChange={(e) => setEditRegional(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-[#39A900]"
                      >
                        {REGIONAL_LIST.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    {/* Centro de Formación */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                        Centro de Formación Profesional:
                      </label>
                      <input
                        type="text"
                        required
                        value={editCenter}
                        onChange={(e) => setEditCenter(e.target.value)}
                        placeholder="Ej: Centro de Servicios y Gestión Empresarial"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-[#39A900]"
                      />
                    </div>

                    <div className="sm:col-span-2 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 flex items-start gap-2">
                        <Timer className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block text-slate-700 dark:text-slate-300">Reglas de Gamificación:</span>
                          • Obtienes 100 puntos por respuesta correcta.<br />
                          • Bono de Velocidad: +50 puntos si respondes en menos de 8 segundos, o +25 puntos en menos de 15 segundos.<br />
                          • Bono de Racha: +15 puntos extra multiplicados por tu racha consecutiva.
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Iniciar Evaluación</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* PLAYING: Preguntas de la Evaluación */}
          {gameState === 'playing' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Gamified Sticky Status Bar */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Category Indicator */}
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-emerald-800 dark:text-[#48cf00] font-bold uppercase tracking-wider">
                      Sección {Math.floor(currentQuestionIdx / 5) + 1} de 5 · {currentQuestion.sectionTitle}
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Pregunta {currentQuestionIdx + 1} de 25
                    </div>
                  </div>

                  {/* Visual Stats Indicators */}
                  <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    {/* Time Stopwatch */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                      <span>{formatTime(elapsedSeconds)}</span>
                    </div>

                    {/* Streak (🔥) */}
                    {currentStreak > 0 && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg animate-bounce">
                        <span>🔥</span>
                        <span>Racha x{currentStreak} (+{currentStreak * 15} pts)</span>
                      </div>
                    )}

                    {/* Current Points (🎯) */}
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-[#216700] dark:text-[#48cf00] rounded-lg">
                      <span>🎯</span>
                      <span>{totalScore.toLocaleString()} pts</span>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    {EVALUATION_QUESTIONS.map((_, idx) => {
                      const isCompleted = idx < currentQuestionIdx;
                      const isCurrent = idx === currentQuestionIdx;
                      const isCorrect = isCompleted && answersHistory[idx];
                      const isIncorrect = isCompleted && !answersHistory[idx];

                      let color = 'bg-slate-200 dark:bg-slate-700';
                      if (isCurrent) {
                        color = 'bg-blue-500 ring-2 ring-blue-300';
                      } else if (isCorrect) {
                        color = 'bg-[#39A900] dark:bg-[#48cf00]';
                      } else if (isIncorrect) {
                        color = 'bg-red-500';
                      }

                      return (
                        <div
                          key={idx}
                          className={`flex-1 h-full border-r border-white dark:border-slate-900 transition-all ${color}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-400">
                    <span>Inicio (Secc. 1)</span>
                    <span>Secc. 3</span>
                    <span>Meta (Preg. 25)</span>
                  </div>
                </div>
              </div>

              {/* Main Question Display Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Question Text */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-bold">
                    PREGUNTA #{currentQuestionIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Interactive Options list */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt, oIdx) => {
                    const isSelected = selectedOptIdx === oIdx;
                    
                    // Style states
                    let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200';
                    
                    if (hasSubmittedAnswer) {
                      if (oIdx === currentQuestion.correctIndex) {
                        // The correct option gets bold green
                        btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-[#39A900] dark:border-[#48cf00] text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500/30';
                      } else if (isSelected && !isSelected === (currentQuestion.correctIndex === oIdx)) {
                        // The user's incorrect option gets red
                        btnStyle = 'bg-red-50 dark:bg-red-950/40 border-red-400 dark:border-red-800 text-red-950 dark:text-red-200';
                      } else {
                        // Unselected other options fade
                        btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 opacity-40 text-slate-400';
                      }
                    } else if (isSelected) {
                      // Active selected option
                      btnStyle = 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-400/20';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={hasSubmittedAnswer}
                        onClick={() => setSelectedOptIdx(oIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5 ${
                          isSelected ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Confirm / Continue Button Zone */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  {!hasSubmittedAnswer ? (
                    <button
                      disabled={selectedOptIdx === null}
                      onClick={handleSubmitAnswer}
                      className={`px-5 py-2.5 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 ${
                        selectedOptIdx !== null
                          ? 'bg-[#39A900] hover:bg-[#329200] text-white cursor-pointer'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Confirmar y Someter Respuesta
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1"
                    >
                      <span>
                        {currentQuestionIdx < EVALUATION_QUESTIONS.length - 1
                          ? 'Siguiente Pregunta'
                          : 'Ver Resultados Finales'
                        }
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* FEEDBACK: Reinforcements and references displayed upon submission */}
              {hasSubmittedAnswer && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm animate-in slide-in-from-bottom duration-350 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOptIdx === currentQuestion.correctIndex ? (
                      <span className="text-[#216700] dark:text-[#48cf00] flex items-center gap-1.5 animate-bounce">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#48cf00]" />
                        ¡Excelente! Refuerzo Positivo
                      </span>
                    ) : (
                      <span className="text-red-700 dark:text-red-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Identifica en qué fallaste (Análisis Correctivo)
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                    <p className="font-medium">
                      {selectedOptIdx === currentQuestion.correctIndex
                        ? '¡Sensacional! Has respondido de forma correcta. Conoces perfectamente la disposición oficial sobre esta materia del SENA.'
                        : `Tu respuesta seleccionada no fue correcta. Recuerda que no debes cometer equivocaciones en el reglamento real.`
                      }
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Fundamento de la Norma:</span>
                      <p className="text-[11px] font-medium italic">"{currentQuestion.explanation}"</p>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-800 dark:text-[#48cf00] font-semibold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Referencia Oficial: {currentQuestion.reference}</span>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SUMMARY: Resultados y Cuadro de Honor */}
          {gameState === 'summary' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-350">
              
              {/* Animated Main Scoreboard Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-700" />
                
                {/* Score and Rank */}
                <div className="space-y-3">
                  <div className="text-5xl sm:text-6xl mx-auto animate-bounce">{rank.badge}</div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                      Tu Calificación de Reglamento SENA:
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
                      {totalScore.toLocaleString()} pts
                    </h3>
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${rank.color}`}>
                      {rank.title}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">
                    {rank.desc}
                  </p>
                </div>

                {/* Primary Stats Panel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Respuestas Correctas</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{correctCount}/25</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Porcentaje de Avance</span>
                    <span className="text-lg font-black text-[#39A900] dark:text-[#48cf00] font-mono">{Math.round((correctCount / 25) * 100)}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Tiempo Demorado</span>
                    <span className="text-lg font-black text-blue-500 dark:text-blue-400 font-mono">{formatTime(elapsedSeconds)}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Promedio por Pregunta</span>
                    <span className="text-lg font-black text-purple-500 dark:text-purple-400 font-mono">{Math.round(elapsedSeconds / 25)}s</span>
                  </div>
                </div>

                {/* Notification about Sheet Persistence */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-left text-xs text-emerald-950 dark:text-emerald-200 max-w-2xl mx-auto space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    ¡Sincronización de Calificaciones Asegurada!
                  </span>
                  <p className="leading-relaxed">
                    Tus resultados y datos personales (Ficha <strong>{editFicha}</strong>, Documento <strong>{editDoc}</strong>) han sido guardados localmente. El administrador los sincronizará de forma segura en la hoja de cálculo en el próximo inicio de sesión, manteniendo el enlace reservado fuera del acceso público.
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setGameState('intro')}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold rounded-xl text-xs cursor-pointer transition-all"
                  >
                    Repetir Evaluación para Mejorar Score
                  </button>
                </div>
              </div>

              {/* GAMIFIED RANKING: Cuadro de Honor del Centro */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                    <h4 className="text-base font-black text-slate-900 dark:text-white font-display">
                      Cuadro de Honor de la Ficha
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Ficha: {editFicha}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                        <th className="py-2.5 pl-3">Puesto</th>
                        <th className="py-2.5">Aprendiz</th>
                        <th className="py-2.5 text-center">Correctas</th>
                        <th className="py-2.5 text-center">Tiempo</th>
                        <th className="py-2.5 text-right pr-3">Puntaje Oficial</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-850 font-medium">
                      {getLeaderboard().map((row, index) => {
                        const isPlayer = row.isCurrentPlayer;
                        let rowStyle = 'text-slate-700 dark:text-slate-300';
                        let medal = `${index + 1}.º`;
                        if (index === 0) medal = '🥇 1.º';
                        if (index === 1) medal = '🥈 2.º';
                        if (index === 2) medal = '🥉 3.º';

                        if (isPlayer) {
                          rowStyle = 'bg-amber-500/10 dark:bg-amber-500/10 text-slate-900 dark:text-amber-300 font-bold border-y border-amber-500/20';
                        }

                        return (
                          <tr key={index} className={`transition-colors ${rowStyle}`}>
                            <td className="py-3 pl-3 font-mono font-bold whitespace-nowrap">{medal}</td>
                            <td className="py-3 max-w-[180px] truncate">
                              <span className="flex items-center gap-1">
                                {row.name}
                                {isPlayer && (
                                  <span className="px-1.5 py-0.2 bg-amber-500 text-white font-mono rounded text-[8px] uppercase tracking-normal">
                                    Tú
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="py-3 text-center font-mono">{row.correct}/25</td>
                            <td className="py-3 text-center font-mono">{row.time}</td>
                            <td className="py-3 text-right pr-3 font-mono text-emerald-700 dark:text-[#48cf00] font-black">
                              {row.score.toLocaleString()} pts
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ==================== TAB: SIMULADOR DE CASOS (Classic) ==================== */}
      {activeTab === 'simulador' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          
          {/* Case Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span>Dilemas Reales del Aprendiz:</span>
              <span className="font-mono text-emerald-700 dark:text-[#48cf00]">{totalCasesResolved}/{REGULATION_CASES.length} resueltos</span>
            </div>
            
            {/* Elegant case list buttons stack */}
            <div className="space-y-2">
              {REGULATION_CASES.map((c, idx) => {
                const isResolved = userDecisions[c.id] !== undefined;
                const isCorrect = isResolved && c.options[userDecisions[c.id]].isCorrect;

                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      selectedCaseIndex === idx
                        ? 'border-slate-900 dark:border-[#48cf00] bg-slate-900 dark:bg-slate-800 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10px] opacity-75 mb-0.5 uppercase">
                        CASO #{idx + 1} · {c.category}
                      </div>
                      <div className="font-semibold text-sm line-clamp-1">{c.title}</div>
                    </div>
                    <div>
                      {isResolved && (
                        <span className={`inline-flex p-1 rounded-full ${
                          isCorrect ? 'text-emerald-400 bg-emerald-950/60' : 'text-amber-400 bg-amber-950/60'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 mt-4 space-y-1 leading-relaxed">
              <span className="font-bold block">Principio Orientador del Acuerdo 0009:</span>
              <p>
                La formación profesional integral es humanista y formativa. El debido proceso salvaguarda el derecho a la defensa y a la aplicación de la norma más favorable.
              </p>
            </div>
          </div>

          {/* Active Case Stage */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-2">
                <span className="text-emerald-800 dark:text-[#48cf00] font-semibold">{currentCase.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 dark:text-slate-400">Tipificación: {currentCase.severity}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {currentCase.title}
              </h3>
            </div>

            {/* Situation Box */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Situación Observada en el Ambiente de Aprendizaje:
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                "{currentCase.situation}"
              </p>
              <div className="text-[11px] font-mono text-emerald-800 dark:text-[#48cf00] pt-2 border-t border-slate-200 dark:border-slate-700 font-semibold">
                Normativa de referencia: {currentCase.normativeReference}
              </div>
            </div>

            {/* Decision Prompt */}
            <div>
              <div className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider mb-3">
                ¿Qué conducta o decisión corresponde según el Reglamento del Aprendiz (Acuerdo 0009 de 2024)?
              </div>

              <div className="space-y-3">
                {currentCase.options.map((option, optIdx) => {
                  const isSelected = chosenOptionIndex === optIdx;

                  let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200';
                  if (hasAnsweredCurrentCase) {
                    if (option.isCorrect) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-[#48cf00] text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !option.isCorrect) {
                      style = 'bg-red-50 dark:bg-red-950/50 border-red-400 dark:border-red-600 text-red-950 dark:text-red-200';
                    } else {
                      style = 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    style = 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] dark:border-[#48cf00] text-emerald-950 dark:text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnsweredCurrentCase}
                      onClick={() => handleSelectCaseOption(currentCase.id, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 cursor-pointer ${style}`}
                    >
                      <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback Deck when answered */}
            {hasAnsweredCurrentCase && (
              <div className="p-5 rounded-xl border animate-in fade-in space-y-2 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold">
                  {currentCase.options[chosenOptionIndex].isCorrect ? (
                    <span className="text-emerald-700 dark:text-[#48cf00] inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#48cf00]" />
                      Decisión Ética Correcta según Acuerdo 0009 de 2024
                    </span>
                  ) : (
                    <span className="text-red-700 dark:text-red-400 inline-flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      Medida Contraria al Reglamento del Aprendiz
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentCase.options[chosenOptionIndex].feedback}
                </p>

                {selectedCaseIndex < REGULATION_CASES.length - 1 && (
                  <div className="pt-3">
                    <button
                      onClick={() => setSelectedCaseIndex(prev => prev + 1)}
                      className="px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Analizar Siguiente Caso</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* ==================== TAB: DERECHOS Y REPRESENTATIVIDAD ==================== */}
      {activeTab === 'derechos' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Rights Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] font-semibold uppercase">
                <span>Capítulo II · Artículos 5 y 6</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-[#39A900] dark:text-[#48cf00]" />
                Derechos Destacados del Aprendiz SENA
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Formación Integral y Oportuna:</strong> Recibir inducción completa y formación profesional de calidad acorde con el programa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Evaluación Objetiva y Rápida:</strong> Ser evaluado con criterios pedagógicos y <em>conocer los resultados en un plazo máximo de ocho (8) días hábiles</em>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Entrega Oportuna de EPP:</strong> Recibir los Elementos de Protección Personal reglamentarios para talleres y prácticas de riesgo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Ajustes Razonables por Discapacidad:</strong> Reconocimiento formal de discapacidad y adaptación pedagógica e infraestructural de los ambientes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Debido Proceso:</strong> Derecho irrenunciable a la defensa, contradicción y presunción de inocencia en cualquier trámite disciplinario o académico.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-[#48cf00] shrink-0 mt-0.5" />
                  <span><strong>Reconocimientos y Estímulos:</strong> Mención de honor por desempeño sobresaliente, monitorías remuneradas y representación en eventos y pasantías internacionales.</span>
                </li>
              </ul>
            </div>

            {/* Representatividad Inclusiva Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-700 dark:text-sky-400 font-semibold uppercase">
                <span>Capítulo II · Artículo 7</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                Estructura de Representatividad Democrática
              </h3>
              
              <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white">Representantes de Centro por Jornada:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Jornada Diurna</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Jornada Nocturna</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Jornada Madrugada</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Jornada Mixta</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Fin de Semana</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">1 por Modalidad Virtual</span>
                    <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 col-span-2">1 por Modalidad a Distancia</span>
                  </div>
                </div>

                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="font-bold text-emerald-950 dark:text-emerald-200">Voceros de Grupo y con Enfoque Diferencial:</div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-emerald-900 dark:text-emerald-100">
                    <div>• 1 Vocero por grupo de formación</div>
                    <div>• 1 Vocero Indígena</div>
                    <div>• 1 Vocero NARP (Afro/Palenquero/Raizal)</div>
                    <div>• 1 Vocero Campesino</div>
                    <div>• 1 Vocera Mujer</div>
                    <div>• 1 Vocero LGTBIQ+</div>
                    <div className="col-span-2">• 1 Vocero de Aprendices con Discapacidad</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB: DEBERES Y PROHIBICIONES ==================== */}
      {activeTab === 'deberes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
          
          {/* Duties Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] font-semibold uppercase">
              <span>Capítulo III · Artículo 8</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#39A900] dark:text-[#48cf00]" />
              Deberes Clave del Aprendiz SENA
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Suscribir el acta de compromiso al momento de formalizar la matrícula.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Mantener actualizados permanentemente sus datos personales en las plataformas (SofiaPlus / Zajuna).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Asistir con puntualidad y presentar las evidencias pedagógicas en los plazos fijados por los instructores.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Justificar oportunamente las inasistencias en los términos establecidos por el reglamento.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Hacer uso adecuado y ético de la infraestructura, maquinaria y responder por daños patrimoniales culposos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Respetar de forma rigurosa los derechos de autor y la propiedad intelectual en todas las investigaciones.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-[#48cf00] shrink-0 mt-2" />
                <span>Usar obligatoriamente la indumentaria y los EPP de bioseguridad en talleres, obras y laboratorios.</span>
              </li>
            </ul>
          </div>

          {/* Prohibitions Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-red-700 dark:text-red-400 font-semibold uppercase">
              <span>Capítulo III · Artículo 9</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
              Prohibiciones Expresas del Reglamento
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Aportar información falsa o alterar documentos públicos o privados ante la entidad.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Suplantar identidad en trámites, firmas de asistencia o evidencias de aprendizaje presenciales o virtuales.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Plagiar trabajos, investigaciones, código de software o exámenes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Consumir, portar o comercializar bebidas alcohólicas o sustancias psychoactivas en centros de formación.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Portar armas de fuego u objetos cortopunzantes en las sedes o eventos institucionales.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Cometer o ser cómplice de conductas delictivas o causar daños intencionales a los bienes del SENA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0 mt-2" />
                <span>Realizar cualquier acto de discriminación, hostigamiento o acoso por razones de género, raza, credo u orientación.</span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* ==================== TAB: PERMANENCIA Y NOVEDADES ==================== */}
      {activeTab === 'permanencia' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Academic Novelties */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-700 dark:text-purple-400 font-semibold uppercase">
                <span>Capítulo IV · Artículos 16 a 25</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Novedades Académicas del Aprendiz
              </h3>
              
              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">1. Traslado de Programa / Sede / Jornada:</div>
                  <p className="mt-1">Permite cambiar de grupo, centro o modalidad una vez aprobado mínimo el primer trimestre de formación.</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">2. Aplazamiento Justificado:</div>
                  <p className="mt-1">Suspensión temporal del proceso por motivos de fuerza mayor, calamidad o servicio militar, <em>por un periodo de hasta tres (3) meses, prorrogables por tres (3) meses más</em>.</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">3. Reintegro Formal:</div>
                  <p className="mt-1">Retorno oficial a la formación antes de vencerse el término de aplazamiento otorgado.</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">4. Retiro Voluntario y Reingreso:</div>
                  <p className="mt-1">Manifestación voluntaria de desvinculación y procedimiento reglamentario para retornar a la institución.</p>
                </div>
              </div>
            </div>

            {/* Desertion Causes */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold uppercase">
                <span>Capítulo IV · Artículos 26 a 31</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                Causales Expresas de Deserción
              </h3>
              
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Formación Presencial:</strong> Inasistencia injustificada de tres (3) días continuos o cinco (5) días discontinuos durante el trimestre.</span>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Formación Virtual:</strong> No ingresar a la plataforma LMS (Zajuna) durante veinte (20) días consecutivos sin justificación, o desatender tres (3) citaciones.</span>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Etapa Productiva:</strong> Inasistencia injustificada durante tres (3) días consecutivos en la empresa copatrocinadora.</span>
                </li>

                <li className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Formación Complementaria:</strong> Inasistencia superior al 10% del total de horas del programa presencial.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* ==================== TAB: FALTAS Y DEBIDO PROCESO ==================== */}
      {activeTab === 'faltas' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="text-xs font-mono text-emerald-700 dark:text-[#48cf00] font-bold mb-2">CLASIFICACIÓN 1</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display">Faltas Leves</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Incumplimientos menores que no afectan gravemente la convivencia ni la integridad institucional (olvido ocasional de carné, impuntualidad justificada tardíamente, uso no autorizado de celular en explicaciones pedagógicas).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-800 dark:text-[#48cf00]">
                Medida: Llamado de atención verbal y compromiso pedagógico.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold mb-2">CLASIFICACIÓN 2</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display">Faltas Graves</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Conductas que vulneran los deberes o atentan contra el proceso formativo (plagio comprobado de evidencias, no uso reiterado de EPP en áreas de riesgo, desacato a directrices de seguridad o inasistencia no justificada).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-800 dark:text-amber-400">
                Medidas Formativas: Llamado escrito (máx. 2 por fase) y Plan de Mejoramiento (hasta 20 días).
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="text-xs font-mono text-red-700 dark:text-red-400 font-bold mb-2">CLASIFICACIÓN 3</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 font-display">Faltas Gravísimas</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hechos que transgreden la ley penal y la convivencia (agresión física, porte de armas, comercialización de estupefacientes, falsificación de documentos públicos o suplantación en pruebas virtuales).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-red-800 dark:text-red-400">
                Medidas Sancionatorias: Condicionamiento o Cancelación definitiva de matrícula.
              </div>
            </div>

          </div>

          {/* Due process and Instances */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Instancias Procesales y Garantías del Debido Proceso (Arts. 47 a 53):
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Informe y Notificación</span>
                Radicación de queja formal y traslado inmediato al aprendiz con plenas garantías de contradicción.
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Audiencia de Descargos</span>
                Presentación de testimonios, pruebas y alegatos ante el Comité de Evaluación y Seguimiento.
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Primera Instancia</span>
                Decisión motivada emitida por la <strong>Subdirección del Centro de Formación</strong>.
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">4. Segunda Instancia</span>
                Recurso de apelación resuelto por la <strong>Dirección Regional del SENA</strong> correspondiente.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB: ESTRUCTURA DEL ACUERDO ==================== */}
      {activeTab === 'acuerdo' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono text-emerald-800 dark:text-[#48cf00] font-semibold uppercase">
              Ficha Técnica del Documento
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
              Acuerdo Número 0009 de 2024 · Consejo Directivo Nacional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Aprobado el 5 de noviembre de 2024 en Bogotá D.C. Deroga expresamente los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600 dark:text-[#48cf00]" />
                Principios Orientadores (Artículo 3):
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">1. Autonomía</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">2. Dignidad Humana</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">3. Inclusión Social</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">4. Enfoque Diferencial</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">5. Enfoque Territorial</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">6. Participación</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">7. Desarrollo Sostenible</div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">8. Solidaridad</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Articulado de Adopción y Transición:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong>Artículo 1 (Adopción):</strong> Aplica a todas las personas matriculadas en los programas de formación profesional de la entidad.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong>Artículo 2 (Transición):</strong> Aplica a matriculados a partir de su publicación. En materia disciplinaria rige el principio de favorabilidad.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <strong>Artículo 3 y 4 (Vigencia y Divulgación):</strong> Publicación oficial en el Diario Oficial y en la página web institucional del SENA.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
