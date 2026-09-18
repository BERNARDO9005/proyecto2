import React, { useState, useMemo } from 'react';
import {
  Play,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Table,
  ArrowRight,
  Zap,
  Clock,
  Copy,
  Check,
  Square
} from 'lucide-react';
import { solveLinearSystemAsync, terminateWorker } from '../services/linearWorkerClient';
import { formatNum } from '../engines/mathParser';
import MatrixInput from '../components/MatrixInput';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';
import LatexRenderer from '../components/LatexRenderer';

export default function LinearModule({ precision = 6 }) {
  const [method, setMethod] = useState('gauss'); // gauss | jordan | jacobi | seidel
  const [n, setN] = useState(3);
  const [matrixA, setMatrixA] = useState([
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
  ]);
  const [vectorB, setVectorB] = useState([8, -11, -3]);
  const [vectorX0, setVectorX0] = useState([0, 0, 0]);
  const [tolerance, setTolerance] = useState('0.0001');
  const [maxIter, setMaxIter] = useState('100');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const isIterative = method === 'jacobi' || method === 'seidel';

  const handleCalculate = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await solveLinearSystemAsync({
        method,
        matrixA,
        vectorB,
        vectorX0,
        tolerance,
        maxIter
      });

      setResult(res);
    } catch (err) {
      setError(err.message || 'Error resolviendo el sistema lineal.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    terminateWorker();
    setLoading(false);
    setError('Cálculo detenido por el usuario.');
  };

  const handleCopySolution = () => {
    if (!result || !result.solution) return;
    const text = result.solution.map((val, idx) => `x_${idx + 1} = ${val}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Columnas dinámicas para la tabla de iteración de Jacobi / Gauss-Seidel
  const iterativeColumns = useMemo(() => {
    if (!isIterative || !result || !result.iterations) return [];

    const cols = [{ key: 'k', label: 'k (Iter)' }];
    // Para n grande limitamos a las primeras 6 y últimas 2 variables en tabla
    const maxColsToShow = Math.min(n, 8);
    for (let i = 0; i < maxColsToShow; i++) {
      cols.push({
        key: `x_${i}`,
        label: `x_${i + 1}`,
        render: (_, row) => formatNum(row.x[i], precision)
      });
    }
    if (n > 8) {
      cols.push({
        key: 'more',
        label: '...',
        render: () => '...'
      });
      cols.push({
        key: `x_${n - 1}`,
        label: `x_${n}`,
        render: (_, row) => formatNum(row.x[n - 1], precision)
      });
    }

    cols.push({
      key: 'error',
      label: '||ε||_∞',
      render: (val) => (val !== null ? formatNum(val, precision) : '—')
    });
    return cols;
  }, [isIterative, result, n, precision]);

  // Formato LaTeX para mostrar la matriz aumentada de un paso
  const formatStepMatrixToLatex = (mat) => {
    if (!mat || !Array.isArray(mat)) return null;

    const rowsTex = mat
      .map((row) => {
        const aPart = row.slice(0, n).map((v) => formatNum(v, 3)).join(' & ');
        const bPart = formatNum(row[n], 3);
        return `${aPart} & \\Big| & ${bPart}`;
      })
      .join(' \\\\ \n');

    return `\\begin{pmatrix} \n ${rowsTex} \n \\end{pmatrix}`;
  };

  return (
    <div className="space-y-6">
      {/* Selector de Método */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
        {[
          { id: 'gauss', label: 'Eliminación Gaussiana' },
          { id: 'jordan', label: 'Gauss-Jordan' },
          { id: 'jacobi', label: 'Jacobi (Iterativo)' },
          { id: 'seidel', label: 'Gauss-Seidel (Iterativo)' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMethod(m.id);
              setError(null);
              setResult(null);
            }}
            className={`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${
              method === m.id
                ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Editor de Matriz [A | b] */}
      <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm space-y-5">
        <MatrixInput
          n={n}
          setN={setN}
          matrixA={matrixA}
          setMatrixA={setMatrixA}
          vectorB={vectorB}
          setVectorB={setVectorB}
          vectorX0={vectorX0}
          setVectorX0={setVectorX0}
          isIterative={isIterative}
        />

        {/* Parámetros para métodos iterativos */}
        {isIterative && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <div>
              <label
                htmlFor="linear-tolerance-input"
                className="block text-xs font-semibold text-slate-300 mb-1"
              >
                Tolerancia de convergencia (||ε||_∞)
              </label>
              <input
                id="linear-tolerance-input"
                type="number"
                step="any"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="linear-max-iter-input"
                className="block text-xs font-semibold text-slate-300 mb-1"
              >
                Iteraciones Máximas (Tope: 100)
              </label>
              <input
                id="linear-max-iter-input"
                type="number"
                min="1"
                max="100"
                value={maxIter}
                onChange={(e) => setMaxIter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-slate-950" />
            )}
            <span>
              {loading
                ? `Calculando (${n}×${n}) en Web Worker...`
                : `Resolver Sistema (${n}×${n})`}
            </span>
          </button>

          {loading && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-700 flex items-center gap-2 text-xs font-semibold"
            >
              <Square className="w-3.5 h-3.5 fill-rose-400" />
              <span>Detener Cómputo</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <AlertBanner
          type="error"
          title="Error en el Sistema de Ecuaciones"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Resultados */}
      {result && (
        <div className="space-y-6">
          {/* Badge de Rendimiento del Web Worker */}
          {result.executionTimeMs !== undefined && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/70 border border-teal-800/50 rounded-xl text-xs">
              <div className="flex items-center gap-2 text-teal-300">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>
                  Procesado con éxito en{' '}
                  <strong className="text-white font-mono">{result.executionTimeMs} ms</strong>
                  {result.isWorker
                    ? ' mediante Web Worker (hilo secundario sin bloqueo)'
                    : ' (hilo principal)'}
                  .
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopySolution}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? '¡Copiado!' : 'Copiar Solución'}</span>
              </button>
            </div>
          )}

          {/* Vector Solución Destacado */}
          <div className="p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Solución del Sistema • {result.method} ({n} Incógnitas)
              </div>
              <button
                type="button"
                onClick={handleCopySolution}
                className="text-xs text-emerald-300 hover:text-emerald-200 underline"
              >
                {copied ? 'Copiado al portapapeles' : 'Copiar todas'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-80 overflow-y-auto pr-1">
              {result.solution.map((val, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900/80 rounded-xl border border-emerald-700/40 text-center"
                >
                  <div className="text-xs text-slate-400 font-mono">x_{idx + 1}</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-emerald-300 truncate" title={`${val}`}>
                    {formatNum(val, precision)}
                  </div>
                </div>
              ))}
            </div>

            {result.message && (
              <div className="mt-3 text-xs text-slate-300 border-t border-slate-700/50 pt-2">
                {result.message}
              </div>
            )}
          </div>

          {/* Historial de Sustitución hacia atrás (Gauss) */}
          {result.backSubstitution && (
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-teal-400" />
                <span>Historial de Sustitución Hacia Atrás:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto">
                {result.backSubstitution.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 font-mono text-xs"
                  >
                    <div className="text-teal-400 font-bold mb-1">{step.variable}:</div>
                    <div className="text-slate-400 mb-1">{step.formula}</div>
                    <div className="text-emerald-300 font-semibold text-sm">
                      = {formatNum(step.value, precision)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pasos de Matriz Escalonada (Directos) */}
          {result.steps && (
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Table className="w-4 h-4 text-teal-400" />
                <span>
                  Evolución de la Matriz Aumentada Paso a Paso
                  {n > 10 && ' (Resumen para matriz grande)'}:
                </span>
              </h4>

              <div className="space-y-4">
                {result.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                        Paso {idx + 1}: {step.title}
                      </span>
                      <span className="text-xs text-slate-400">{step.description}</span>
                    </div>

                    {step.matrix ? (
                      <div className="overflow-x-auto py-2 text-center">
                        <LatexRenderer
                          expression={formatStepMatrixToLatex(step.matrix)}
                          displayMode={true}
                        />
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic py-1 font-mono">
                        [Matriz omitida para n &gt; 10 para optimizar rendimiento de renderizado]
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabla de Convergencia (Iterativos: Jacobi / Gauss-Seidel) */}
          {isIterative && result.iterations && (
            <IterationTable
              title={`Convergencia por ${result.method}`}
              columns={iterativeColumns}
              data={result.iterations}
              precision={precision}
              filename={`sistema_${method}`}
            />
          )}
        </div>
      )}
    </div>
  );
}
