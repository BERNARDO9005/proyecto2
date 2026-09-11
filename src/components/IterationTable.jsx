import React, { useState, useMemo } from 'react';
import { Download, ChevronLeft, ChevronRight, FileSpreadsheet, FileJson, Copy, Check } from 'lucide-react';
import { formatNum } from '../engines/mathParser';

/**
 * Tabla interactiva paginada con exportación a CSV y JSON.
 * @param {{
 *  columns: { key: string, label: string, render?: (val: any, row: any) => React.ReactNode, isNumber?: boolean }[],
 *  data: any[],
 *  precision?: number,
 *  title?: string,
 *  filename?: string
 * }} props
 */
export default function IterationTable({
  columns,
  data = [],
  precision = 6,
  title = 'Tabla de Resultados',
  filename = 'resultados_metodos_numericos'
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [copied, setCopied] = useState(false);

  const totalPages = Math.ceil(data.length / pageSize) || 1;

  const currentData = useMemo(() => {
    if (pageSize >= data.length) return data;
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  // Exportar a CSV
  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = columns.map(c => `"${c.label}"`).join(',');
    const rows = data.map(row => {
      return columns
        .map(col => {
          let val = row[col.key];
          if (typeof val === 'number') {
            val = Number(val.toFixed(precision));
          }
          return `"${val !== null && val !== undefined ? val : ''}"`;
        })
        .join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Exportar a JSON
  const exportToJSON = () => {
    if (data.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copiar tabla al portapapeles en formato TSV (pega directo en Excel)
  const copyToClipboard = () => {
    if (data.length === 0) return;
    const headers = columns.map(c => c.label).join('\t');
    const rows = data.map(row => {
      return columns
        .map(col => {
          const val = row[col.key];
          if (typeof val === 'number') return Number(val.toFixed(precision));
          return val !== null && val !== undefined ? val : '';
        })
        .join('\t');
    });

    navigator.clipboard.writeText([headers, ...rows].join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-slate-800/40 rounded-xl border border-slate-700/60">
        No hay datos para mostrar. Ejecute el cálculo para visualizar los resultados.
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-800/60 rounded-xl border border-slate-700/70 overflow-hidden shadow-lg shadow-slate-950/30">
      {/* Barra superior de herramientas y exportación */}
      <div className="px-4 py-3 bg-slate-800/90 border-b border-slate-700/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-teal-400" />
          <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-teal-300 font-mono">
            {data.length} {data.length === 1 ? 'fila' : 'filas'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            title="Copiar datos para Excel"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={exportToJSON}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg transition-colors"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <select
            value={pageSize}
            aria-label="Filas por página"
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-500"
          >
            <option value={10}>10 / pág</option>
            <option value={25}>25 / pág</option>
            <option value={50}>50 / pág</option>
            <option value={1000}>Todas</option>
          </select>
        </div>
      </div>

      {/* Contenedor de la tabla */}
      <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr className="border-b border-slate-700 text-slate-400">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 font-semibold whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 font-mono text-slate-200">
            {currentData.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-700/30 transition-colors odd:bg-slate-800/30 even:bg-slate-800/10"
              >
                {columns.map(col => {
                  const val = row[col.key];
                  return (
                    <td key={col.key} className="px-4 py-2.5 whitespace-nowrap">
                      {col.render ? (
                        col.render(val, row)
                      ) : typeof val === 'number' ? (
                        formatNum(val, precision)
                      ) : (
                        val !== null && val !== undefined ? String(val) : '—'
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="px-4 py-2.5 bg-slate-800/90 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
          <div>
            Página <span className="font-semibold text-slate-200">{currentPage}</span> de{' '}
            <span className="font-semibold text-slate-200">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-200" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
