import React from 'react';
import { Award, Printer, CheckCircle2, Download, ShieldCheck, Lock, FileSpreadsheet } from 'lucide-react';
import { LearnerProfile } from '../types/induction';

interface CertificateModalProps {
  profile: LearnerProfile;
  completedModulesCount: number;
  totalModulesCount: number;
  onOpenModules: () => void;
  onOpenDriveSync?: () => void;
  onBackToDashboard?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  profile,
  completedModulesCount,
  totalModulesCount,
  onOpenModules,
  onOpenDriveSync,
  onBackToDashboard,
}) => {
  const isAllCompleted = completedModulesCount >= totalModulesCount;
  const progressRatio = Math.round((completedModulesCount / totalModulesCount) * 100);
  const verificationHash = `SENA-${profile.fichaNumber}-${profile.documentNumber.slice(-4)}-IND2026`;
  const issueDate = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header (No print) */}
      <div className="no-print bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-[#48cf00] uppercase font-semibold">
            <span>Acreditación Formativa</span>
            <span aria-hidden="true">·</span>
            <span>Documento de Portafolio</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Certificado Oficial de Inducción Institucional
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isAllCompleted
              ? 'Has culminado con éxito todos los módulos. Tu certificado está listo para imprimir o anexar a tu portafolio de evidencias en Zajuna.'
              : `Has completado ${completedModulesCount} de ${totalModulesCount} módulos (${progressRatio}%). Completa todos los retos para certificar el proceso.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-250 dark:hover:bg-slate-755 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Volver a Progreso</span>
            </button>
          )}

          {onOpenDriveSync && (
            <button
              onClick={onOpenDriveSync}
              className="px-3.5 py-2.5 text-xs font-semibold text-emerald-800 dark:text-[#48cf00] bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
              title="Registrar estado de inducción en Google Sheets y Drive"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-[#48cf00]" />
              <span>Registrar en Google Drive</span>
            </button>
          )}

          {isAllCompleted ? (
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
          ) : (
            <button
              onClick={onOpenModules}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Continuar Módulos Pendientes</span>
            </button>
          )}
        </div>
      </div>

      {/* The Printable Certificate Container */}
      <div className="relative mx-auto max-w-4xl bg-white border-8 border-double border-slate-300 dark:border-slate-700 p-8 sm:p-12 md:p-16 rounded-lg shadow-lg text-slate-900 print:border-none print:shadow-none print:p-8">
        
        {/* Subtle Watermark Overlay if not fully completed */}
        {!isAllCompleted && (
          <div className="no-print absolute inset-0 bg-white/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-display">
              Certificado en Trámite de Inducción
            </h3>
            <p className="text-xs text-slate-600 max-w-md mt-1 mb-4">
              Debes culminar la evaluación de los 5 módulos formativos ({completedModulesCount}/{totalModulesCount} completados) para desbloquear la firma y sello digital.
            </p>
            <button
              onClick={onOpenModules}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#329200] rounded-lg shadow-xs"
            >
              Ir a la Ruta de Aprendizaje
            </button>
          </div>
        )}

        {/* Certificate Border Decoration */}
        <div className="border-2 border-[#39A900]/40 p-6 sm:p-10 space-y-8 relative">
          
          {/* Institutional Top Header */}
          <div className="text-center space-y-1.5 border-b border-slate-200 pb-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#39A900] text-white font-extrabold text-2xl flex items-center justify-center shadow-xs">
              S
            </div>
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase pt-2">
              REPÚBLICA DE COLOMBIA
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wide text-slate-900 font-display uppercase">
              SERVICIO NACIONAL DE APRENDIZAJE · SENA
            </h1>
            <div className="text-xs font-semibold text-[#297d02] tracking-wider uppercase font-mono">
              DIRECCIÓN GENERAL · DIRECCIÓN DE FORMACIÓN PROFESIONAL
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
              HACE CONSTAR QUE EL APRENDIZ
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight uppercase">
                {profile.fullName}
              </h2>
              <div className="text-xs font-mono text-slate-600">
                Documento de Identidad No. <span className="font-bold">{profile.documentNumber}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Ha culminado satisfactoriamente el proceso de <span className="font-bold text-slate-900">INDUCCIÓN INSTITUCIONAL Y APROPIACIÓN DE VALORES SENA</span>,
              comprendiendo la misión y visión del Servicio Nacional de Aprendizaje, los símbolos de la identidad nacional, el modelo pedagógico de la <span className="font-semibold">Formación Profesional Integral (FPI)</span>, las plataformas digitales misionales y los deberes y derechos consagrados en el <span className="font-semibold">Reglamento del Aprendiz (Acuerdo 0009 de 2024)</span>.
            </p>

            {/* Academic details box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Programa de Formación:</span>
                <span className="font-bold text-slate-900">{profile.programName}</span> ({profile.programType})
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Ficha de Caracterización:</span>
                <span className="font-mono font-bold text-slate-900">{profile.fichaNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Centro de Formación:</span>
                <span className="font-semibold text-slate-800">{profile.centerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Regional:</span>
                <span className="font-semibold text-slate-800">{profile.regional}</span>
              </div>
            </div>

          </div>

          {/* Signatures & Verification Stamp */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
            
            {/* Signature 1 */}
            <div className="space-y-2">
              <div className="h-10 border-b border-slate-400 mx-auto w-3/4 flex items-end justify-center pb-1">
                <span className="font-serif italic text-sm text-slate-600">Firma Autorizada</span>
              </div>
              <div className="text-xs font-bold text-slate-900 uppercase">Subdirección de Centro</div>
              <div className="text-[10px] text-slate-500">{profile.centerName}</div>
            </div>

            {/* Official Seal in the center */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#39A900] flex flex-col items-center justify-center p-1 text-center bg-emerald-50/50">
                <ShieldCheck className="w-6 h-6 text-[#39A900]" />
                <span className="text-[8px] font-bold text-emerald-950 uppercase leading-none mt-1">
                  INDUCCIÓN<br />VALIDADA
                </span>
                <span className="text-[7px] font-mono text-emerald-700">2026</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Expedido el {issueDate}</div>
            </div>

            {/* Signature 2 */}
            <div className="space-y-2">
              <div className="h-10 border-b border-slate-400 mx-auto w-3/4 flex items-end justify-center pb-1">
                <span className="font-serif italic text-sm text-slate-600">Coordinación Misional</span>
              </div>
              <div className="text-xs font-bold text-slate-900 uppercase">Coordinación Académica</div>
              <div className="text-[10px] text-slate-500">Formación Profesional Integral</div>
            </div>

          </div>

          {/* Bottom Security Hash */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-slate-400 gap-2">
            <span>CÓDIGO ÚNICO DE VERIFICACIÓN: <span className="font-bold text-slate-600">{verificationHash}</span></span>
            <span>SISTEMA DE GESTIÓN ACADÉMICA · SENA COLOMBIA</span>
          </div>

        </div>

      </div>

    </div>
  );
};
