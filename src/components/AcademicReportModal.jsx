import React, { useState, useMemo } from 'react';
import {
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  X,
  Eye,
  FileCode,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';
import LatexRenderer from './LatexRenderer';
import SvgVectorPlot from './SvgVectorPlot';
import { formatNum } from '../engines/mathParser';
import {
  generateLatexReport,
  downloadLatexFile,
  openPrintableReport
} from '../services/academicReportService';

/**
 * Modal interactivo para visualizar y exportar Informes Técnicos Formales en PDF / LaTeX.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   data: Object
 * }} props
 */
export default function AcademicReportModal({ isOpen, onClose, data }) {
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'latex'
  const [copied, setCopied] = useState(false);

  // Código LaTeX generado
  const latexCode = useMemo(() => {
    if (!data) return '';
    return generateLatexReport(data);
  }, [data]);

  if (!isOpen || !data) return null;

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(latexCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadLatex = () => {
    const methodClean = (data.methodId || 'metodo').toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `informe_${methodClean}.tex`;
    downloadLatexFile(filename, latexCode);
  };

  const handlePrintPdf = () => {
    openPrintableReport(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Encabezado Superior del Modal */}
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <span>Informe Técnico Formal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                  PDF & LaTeX Compilable
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Documentación académica formal con formulación, fórmulas KaTeX, tabla y gráficos vectoriales.
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

        {/* Barra de Acciones y Pestañas */}
        <div className="px-5 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Selector de Pestañas */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'preview'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista Previa del Informe</span>
            </button>

            <button
              onClick={() => setActiveTab('latex')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'latex'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Código LaTeX (.tex)</span>
            </button>
          </div>

          {/* Botones Principales de Exportación */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar en PDF</span>
            </button>

            <button
              onClick={handleDownloadLatex}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .tex</span>
            </button>

            <button
              onClick={handleCopyLatex}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar LaTeX'}</span>
            </button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 bg-slate-950/40">
          {activeTab === 'preview' ? (
            /* Plantilla de Informe Académico Formal */
            <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-200">
              {/* Encabezado Formal */}
              <div className="border-b border-slate-800 pb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                    NumCalc Pro • Laboratorio de Métodos Numéricos
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {data.methodName || 'Informe de Métodos Numéricos'}
                  </h1>
                  <div className="text-xs text-slate-400 mt-0.5">{data.moduleTitle}</div>
                </div>

                <div className="text-right text-xs text-slate-400 space-y-0.5 font-mono">
                  <div>Fecha: {new Date().toLocaleDateString('es-ES')}</div>
                  <div className="text-teal-400 font-semibold">
                    {data.resultSummary?.converged ? 'Convergencia Exitosa' : 'Aproximación Numérica'}
                  </div>
                </div>
              </div>

              {/* 1. Planteamiento del Problema */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>1. Planteamiento Matemático del Problema</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {data.problemStatement}
                </p>

                {data.mathFormulationLatex && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <LatexRenderer
                      latex={data.mathFormulationLatex}
                      displayMode={true}
                    />
                  </div>
                )}
              </div>

              {/* 2. Parámetros de Entrada */}
              {data.parameters && data.parameters.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>2. Parámetros Computacionales de Entrada</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {data.parameters.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                      >
                        <div className="text-slate-400 font-medium">{p.label}</div>
                        <div className="text-slate-100 font-mono font-bold mt-0.5">{p.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Fundamentación Teórica del Método */}
              {data.methodFormulaLatex && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>3. Fundamento Teórico y Ecuación del Método</span>
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                    <LatexRenderer
                      latex={data.methodFormulaLatex}
                      displayMode={true}
                    />
                  </div>
                </div>
              )}

              {/* 4. Resumen de Resultados */}
              {data.resultSummary && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>4. Resultados del Cálculo</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-teal-950/20 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                        {data.resultSummary.mainResultLabel || 'Resultado Final'}
                      </div>
                      <div className="text-2xl font-mono font-extrabold text-white mt-1">
                        {data.resultSummary.mainResultValue || '---'}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {data.resultSummary.message}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3.5 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-right">
                        <div className="text-[11px] text-slate-400">Total Pasos</div>
                        <div className="text-base font-bold font-mono text-teal-300">
                          {data.resultSummary.iterationsCount ?? '---'}
                        </div>
                      </div>
                      <div className="px-3.5 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-right">
                        <div className="text-[11px] text-slate-400">Error Final</div>
                        <div className="text-base font-bold font-mono text-emerald-400">
                          {data.resultSummary.finalError || '---'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Gráfico Vectorial Nítido */}
              {data.plotPoints && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>5. Gráfica Vectorial de Convergencia (SVG Alta Resolución)</span>
                  </h4>
                  <SvgVectorPlot
                    curve={data.plotPoints.curve || []}
                    markers={data.plotPoints.markers || []}
                    specialPoint={data.plotPoints.root || null}
                    xLabel={data.plotPoints.xLabel || 'x'}
                    yLabel={data.plotPoints.yLabel || 'y'}
                  />
                  <div className="text-[11px] text-center text-slate-400 italic">
                    Gráfico renderizado vectorialmente sin pixelación para exportación e impresión formal.
                  </div>
                </div>
              )}

              {/* 6. Tabla de Iteraciones */}
              {data.tableColumns && data.tableData && data.tableData.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>6. Tabla de Pasos e Iteraciones</span>
                  </h4>
                  <div className="overflow-x-auto max-h-64 rounded-xl border border-slate-800">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold">
                        <tr>
                          {data.tableColumns.map((col) => (
                            <th key={col.key} className="px-3 py-2 whitespace-nowrap text-center">
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                        {data.tableData.slice(0, 30).map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40">
                            {data.tableColumns.map((col) => {
                              const val = row[col.key];
                              return (
                                <td key={col.key} className="px-3 py-1.5 text-center whitespace-nowrap">
                                  {typeof val === 'number'
                                    ? formatNum(val, 6)
                                    : val !== null && val !== undefined
                                    ? String(val)
                                    : '—'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {data.tableData.length > 30 && (
                    <div className="text-[11px] text-slate-400 italic text-center">
                      * Se muestran las primeras 30 iteraciones de un total de {data.tableData.length}.
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Código Fuente LaTeX (.tex) */
            <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-[13px] leading-relaxed select-text">
              <pre className="text-teal-200 whitespace-pre">
                {latexCode}
              </pre>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-teal-400" />
            <span>El código LaTeX incluye paquetes booktabs, amsmath y gráficos vectoriales TikZ/PGFPlots.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
