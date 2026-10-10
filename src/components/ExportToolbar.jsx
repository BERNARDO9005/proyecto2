import React, { useState } from 'react';
import {
  FileText,
  GraduationCap,
  Code2,
  Terminal,
  Cpu,
  Download,
  Share2
} from 'lucide-react';
import AcademicReportModal from './AcademicReportModal';
import CodeExportModal from './CodeExportModal';

/**
 * Barra de Herramientas de Exportación y Utilidad Académica.
 * Integra:
 * 1. Botón "Exportar Informe Formal" (LaTeX / PDF listo para imprimir con fórmulas y gráficos vectoriales)
 * 2. Botón "Ver en Python (SciPy/NumPy)"
 * 3. Botón "Ver en MATLAB"
 * 4. Botón "Ver en C++"
 *
 * @param {{
 *   exportData: Object,
 *   className?: string
 * }} props
 */
export default function ExportToolbar({ exportData, className = '' }) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeInitialTab, setCodeInitialTab] = useState('python');

  if (!exportData) return null;

  const handleOpenReport = () => {
    setReportModalOpen(true);
  };

  const handleOpenCode = (tab = 'python') => {
    setCodeInitialTab(tab);
    setCodeModalOpen(true);
  };

  return (
    <>
      <div
        className={`p-3.5 bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-lg flex flex-wrap items-center justify-between gap-3 ${className}`}
      >
        {/* Etiqueta / Título */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">
              Exportación & Utilidad Académica
            </div>
            <div className="text-[11px] text-slate-400">
              Genera informes formales en PDF/LaTeX o scripts equivalentes de código.
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Botón 1: Exportar Informe Formal */}
          <button
            type="button"
            onClick={handleOpenReport}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Exportar Informe Formal</span>
          </button>

          {/* Botón 2: Ver en Python (SciPy/NumPy) */}
          <button
            type="button"
            onClick={() => handleOpenCode('python')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver en Python (SciPy/NumPy)</span>
          </button>

          {/* Botón 3: Ver en MATLAB */}
          <button
            type="button"
            onClick={() => handleOpenCode('matlab')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-orange-300 hover:text-orange-200 border border-orange-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-orange-400" />
            <span>Ver en MATLAB</span>
          </button>

          {/* Botón 4: Ver en C++ */}
          <button
            type="button"
            onClick={() => handleOpenCode('cpp')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ver en C++</span>
          </button>
        </div>
      </div>

      {/* Modal de Informe Técnico Formal (PDF / LaTeX) */}
      <AcademicReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        data={exportData}
      />

      {/* Modal de Generador de Código Científico */}
      <CodeExportModal
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
        data={exportData}
        initialTab={codeInitialTab}
      />
    </>
  );
}
