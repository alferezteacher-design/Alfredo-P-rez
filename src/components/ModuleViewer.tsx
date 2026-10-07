import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Award, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InductionModule } from '../types/induction';

interface ModuleViewerProps {
  module: InductionModule;
  isCompleted: boolean;
  onCompleteModule: (moduleId: string) => void;
  onNextModule?: () => void;
  onPrevModule?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  isCompleted,
  onCompleteModule,
  onNextModule,
  onPrevModule,
  hasNext,
  hasPrev,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeQuizStep, setActiveQuizStep] = useState(0);

  const activeSection = module.sections[activeSectionIndex];
  const isAtQuiz = activeSectionIndex === module.sections.length;

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    module.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    const score = calculateScore();
    const passed = score >= Math.ceil(module.quiz.length * 0.66);

    if (passed) {
      onCompleteModule(module.id);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas is not ready
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setActiveQuizStep(0);
  };

  const currentQuizQuestion = module.quiz[activeQuizStep];
  const score = calculateScore();
  const passed = score >= Math.ceil(module.quiz.length * 0.66);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs transition-colors">
      
      {/* Module Top Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 p-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-semibold text-[#2f8802] dark:text-[#48cf00]">MÓDULO {module.number}</span>
              <span aria-hidden="true">·</span>
              <span>{module.estimatedMinutes} min lectura estimada</span>
              {isCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 dark:text-[#48cf00] font-semibold inline-flex items-center gap-1 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              {module.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {module.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasPrev && (
              <button
                onClick={onPrevModule}
                className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1"
                title="Módulo anterior"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNextModule}
                className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1"
                title="Siguiente módulo"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Section Tabs / Stepper */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-200/80 dark:border-slate-800 pt-4">
          {module.sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionIndex(idx)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSectionIndex === idx
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">{idx + 1}.</span>
              <span>{section.title}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveSectionIndex(module.sections.length)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              isAtQuiz
                ? 'bg-[#39A900] text-white shadow-xs'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#1f6b00] dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Reto de Afianzamiento ({module.quiz.length} preguntas)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8">
        {!isAtQuiz && activeSection ? (
          <div className="max-w-3xl space-y-6">
            <div>
              <div className="text-xs font-semibold text-emerald-800 dark:text-[#48cf00] uppercase tracking-wider mb-1 font-mono">
                Sección {activeSectionIndex + 1} de {module.sections.length}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {activeSection.title}
              </h3>
            </div>

            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
              {activeSection.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Takeaway box */}
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border-l-4 border-[#39A900] dark:border-[#48cf00] rounded-r-lg">
              <div className="text-xs font-bold text-[#1f6b00] dark:text-[#48cf00] uppercase tracking-wider mb-1">
                Conclusión Clave para el Aprendiz
              </div>
              <p className="text-sm text-emerald-950 dark:text-emerald-200 font-medium">
                {activeSection.keyTakeaway}
              </p>
            </div>

            {/* Step navigation bottom controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex(prev => prev - 1)}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors inline-flex items-center gap-1 ${
                  activeSectionIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sección Anterior</span>
              </button>

              <button
                onClick={() => setActiveSectionIndex(prev => prev + 1)}
                className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#39A900] text-white hover:bg-[#329200] transition-colors inline-flex items-center gap-1 shadow-xs"
              >
                <span>{activeSectionIndex === module.sections.length - 1 ? 'Ir al Reto del Módulo' : 'Siguiente Sección'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* Interactive Quiz Sandbox */
          <div className="max-w-3xl space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-800 dark:text-[#48cf00] uppercase tracking-wider mb-1 font-mono">
                    Evaluación Formativa
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Reto de Validación: {module.shortTitle}
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Pregunta {activeQuizStep + 1} de {module.quiz.length}
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Responde las preguntas para desbloquear la insignia institucional y certificar el módulo.
              </p>
            </div>

            {/* Quiz Progress Pips */}
            <div className="grid grid-cols-3 gap-2">
              {module.quiz.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCorrect = selectedAnswers[q.id] === q.correctIndex;
                let bgStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';

                if (quizSubmitted) {
                  bgStyle = isCorrect ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold' : 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300';
                } else if (activeQuizStep === qIndex) {
                  bgStyle = 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold';
                } else if (isAnswered) {
                  bgStyle = 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuizStep(qIndex)}
                    className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 ${bgStyle}`}
                  >
                    <span>Pregunta {qIndex + 1}</span>
                    {quizSubmitted && (
                      isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#48cf00]" /> : <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Question Box */}
            {currentQuizQuestion && (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {currentQuizQuestion.question}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {currentQuizQuestion.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQuizQuestion.id] === optIdx;
                    const isTheCorrectOne = currentQuizQuestion.correctIndex === optIdx;
                    
                    let buttonStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-750';
                    
                    if (quizSubmitted) {
                      if (isTheCorrectOne) {
                        buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 dark:border-[#48cf00] text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
                      } else if (isSelected && !isTheCorrectOne) {
                        buttonStyle = 'bg-red-50 dark:bg-red-950/50 border-red-400 dark:border-red-600 text-red-950 dark:text-red-200';
                      } else {
                        buttonStyle = 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] dark:border-[#48cf00] text-emerald-950 dark:text-white ring-2 ring-[#39A900]/20 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(currentQuizQuestion.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${buttonStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 text-xs font-mono font-semibold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="pt-0.5">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Pedagogical Explanation when submitted */}
                {quizSubmitted && (
                  <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">Fundamento Institucional:</span>
                    {currentQuizQuestion.explanation}
                  </div>
                )}
              </div>
            )}

            {/* Quiz Navigation & Submit Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeQuizStep === 0}
                  onClick={() => setActiveQuizStep(prev => prev - 1)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                    activeQuizStep === 0 ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Anterior
                </button>
                <button
                  disabled={activeQuizStep === module.quiz.length - 1}
                  onClick={() => setActiveQuizStep(prev => prev + 1)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                    activeQuizStep === module.quiz.length - 1 ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Siguiente
                </button>
              </div>

              <div className="flex items-center gap-3">
                {!quizSubmitted ? (
                  <button
                    disabled={Object.keys(selectedAnswers).length < module.quiz.length}
                    onClick={handleGradeQuiz}
                    className={`px-5 py-2.5 text-xs font-semibold rounded-lg text-white transition-all shadow-xs ${
                      Object.keys(selectedAnswers).length < module.quiz.length
                        ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed'
                        : 'bg-[#39A900] hover:bg-[#329200]'
                    }`}
                  >
                    Calificar Reto ({Object.keys(selectedAnswers).length}/{module.quiz.length} respondidas)
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleResetQuiz}
                      className="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg inline-flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reintentar</span>
                    </button>

                    {passed ? (
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-2 rounded-lg border border-emerald-300 dark:border-emerald-800 text-xs font-semibold">
                        <Award className="w-4 h-4 text-[#39A900] dark:text-[#48cf00]" />
                        <span>¡Aprobado! Has ganado la insignia: {module.badgeName}</span>
                      </div>
                    ) : (
                      <div className="text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-xs font-medium">
                        Obtuviste {score}/{module.quiz.length}. Necesitas al menos 2 correctas para aprobar.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Next module jump if passed */}
            {quizSubmitted && passed && hasNext && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">¡Excelente desempeño, Aprendiz!</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Continúa con el siguiente módulo en tu ruta de inducción.</div>
                </div>
                <button
                  onClick={onNextModule}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continuar al Siguiente Módulo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  );
};
