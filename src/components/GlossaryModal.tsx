import React, { useState } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { SENA_GLOSSARY } from '../data/senaData';
import { GlossaryItem } from '../types/induction';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', 'Pedagógico', 'Institucional', 'Plataformas', 'Reglamento', 'Bienestar'];

  const filteredItems = SENA_GLOSSARY.filter((item: GlossaryItem) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#39A900]/15 dark:bg-[#39A900]/25 text-[#216700] dark:text-[#48cf00] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Glosario de Términos Institucionales SENA
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Léxico oficial, siglas y conceptos de la comunidad formativa
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar término (ej. RAP, FPI, SofiaPlus, Vocero, Zajuna)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Todos los términos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Items List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100 dark:divide-slate-800 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">
              No se encontraron términos que coincidan con "{searchTerm}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-[#48cf00] uppercase font-semibold">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{filteredItems.length} términos disponibles</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Cerrar Glosario
          </button>
        </div>

      </div>
    </div>
  );
};
