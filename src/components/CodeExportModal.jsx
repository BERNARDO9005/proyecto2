import React, { useState, useMemo } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  Terminal,
  FileCode,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  generatePythonCode,
  generateMatlabCode,
  generateCppCode,
  downloadCodeFile
} from '../services/codeExportService';

/**
 * Modal interactivo para visualizar, copiar y descargar scripts de código equivalentes
 * en Python (SciPy/NumPy), MATLAB y C++.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   data: Object,
 *   initialTab?: 'python' | 'matlab' | 'cpp'
 * }} props
 */
export default function CodeExportModal({
  isOpen,
  onClose,
  data,
  initialTab = 'python'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  // Sincronizar pestaña inicial al abrir
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Generar código según lenguaje activo
  const codeContent = useMemo(() => {
    if (!data) return '';
    if (activeTab === 'python') return generatePythonCode(data);
    if (activeTab === 'matlab') return generateMatlabCode(data);
    if (activeTab === 'cpp') return generateCppCode(data);
    return '';
  }, [data, activeTab]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const ext = activeTab === 'python' ? 'py' : activeTab === 'matlab' ? 'm' : 'cpp';
    const methodClean = (data.methodId || 'metodo').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `numcalc_${methodClean}.${ext}`;
    downloadCodeFile(filename, codeContent);
  };

  const getLanguageDetails = () => {
    switch (activeTab) {
      case 'python':
        return {
          title: 'Python (SciPy / NumPy)',
          ext: '.py',
          cmd: 'python numcalc_script.py',
          packages: 'pip install numpy scipy matplotlib',
          iconColor: 'text-amber-400'
        };
      case 'matlab':
        return {
          title: 'MATLAB / GNU Octave',
          ext: '.m',
          cmd: "matlab -batch \"run('numcalc_script.m')\"",
          packages: 'MATLAB R2020a+ o GNU Octave 7.0+',
          iconColor: 'text-orange-400'
        };
      case 'cpp':
        return {
          title: 'C++ Moderno (C++17 / STL)',
          ext: '.cpp',
          cmd: 'g++ -std=c++17 -O2 script.cpp -o script && ./script',
          packages: 'Compilador GCC (g++), Clang o MSVC',
          iconColor: 'text-cyan-400'
        };
      default:
        return { title: 'Código', ext: '', cmd: '', packages: '', iconColor: '' };
    }
  };

  const details = getLanguageDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Barra Superior de Encabezado */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <span>Generador de Código Científico</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  {data.methodName || 'Algoritmo'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Script 100% reproducible y ejecutable para resolver este problema exacto.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Lenguaje y Botones de Acción */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Selector de Pestañas */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'python'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Python (SciPy/NumPy)</span>
            </button>

            <button
              onClick={() => setActiveTab('matlab')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'matlab'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>MATLAB</span>
            </button>

            <button
              onClick={() => setActiveTab('cpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'cpp'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>C++ (C++17)</span>
            </button>
          </div>

          {/* Botones Copiar / Descargar */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado al portapapeles' : 'Copiar Código'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-600/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar ({details.ext})</span>
            </button>
          </div>
        </div>

        {/* Visor de Código Monoespaciado */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs sm:text-[13px] leading-relaxed select-text">
          <pre className="text-slate-300 whitespace-pre">
            {codeContent}
          </pre>
        </div>

        {/* Barra Inferior: Guía de Ejecución */}
        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400" />
            <span>Ejecutar en terminal:</span>
            <code className="px-2 py-0.5 rounded bg-slate-950 text-teal-300 border border-slate-800 font-mono text-[11px]">
              {details.cmd}
            </code>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5" />
            <span>Requisitos: {details.packages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
