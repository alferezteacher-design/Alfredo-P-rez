import React, { useState } from 'react';
import { X, CheckCircle2, User, Building, MapPin, Hash, BookMarked } from 'lucide-react';
import { LearnerProfile } from '../types/induction';
import { REGIONAL_LIST } from '../data/senaData';

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile;
  onSaveProfile: (profile: LearnerProfile) => void;
}

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<LearnerProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Perfil del Aprendiz SENA
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>Datos para Pasaporte y Certificado Oficial</span>
              <span aria-hidden="true">·</span>
              <span>Vigencia Formativa</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Nombres y Apellidos Completos
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
              placeholder="Ej. Laura Marcela Gómez Morales"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                Documento de Identidad
              </label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
                placeholder="1098234567"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                Número de Ficha
              </label>
              <input
                type="text"
                required
                value={formData.fichaNumber}
                onChange={(e) => setFormData({ ...formData, fichaNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
                placeholder="2874192"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                Programa de Formación
              </label>
              <input
                type="text"
                required
                value={formData.programName}
                onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
                placeholder="Análisis y Desarrollo de Software (ADSO)"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Nivel
              </label>
              <select
                value={formData.programType}
                onChange={(e) => setFormData({ ...formData, programType: e.target.value as LearnerProfile['programType'] })}
                className="w-full px-2.5 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Operario">Operario</option>
                <option value="Auxiliar">Auxiliar</option>
                <option value="Especialización Tecnológica">Especialización</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Centro de Formación SENA
            </label>
            <input
              type="text"
              required
              value={formData.centerName}
              onChange={(e) => setFormData({ ...formData, centerName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
              placeholder="Centro de Servicios y Gestión Empresarial"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Regional SENA
            </label>
            <select
              value={formData.regional}
              onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#39A900]/30 focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-colors"
            >
              {REGIONAL_LIST.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {savedSuccess ? (
                <span className="text-emerald-700 dark:text-[#48cf00] font-medium inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Cambios guardados correctamente
                </span>
              ) : (
                'Los datos se guardan de forma local en tu navegador.'
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-[#39A900] hover:bg-[#329200] rounded-lg transition-colors shadow-xs"
              >
                Actualizar Ficha
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
