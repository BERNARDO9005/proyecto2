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
  Square,
  Layers,
  Activity,
  Divide,
  Cpu
} from 'lucide-react';
import { solveLinearSystemAsync, terminateWorker } from '../services/linearWorkerClient';
import { formatNum } from '../engines/mathParser';
import MatrixInput from '../components/MatrixInput';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';
import LatexRenderer from '../components/LatexRenderer';

export default function LinearModule({ precision = 6 }) {
  // Categoría principal: 'systems' (Ax = b) | 'eigen' (Av = λv)
  const [category, setCategory] = useState('systems');

  // Método activo
  const [method, setMethod] = useState('gauss'); // gauss | jordan | doolittle | crout | cholesky | jacobi | seidel | power | inverse_power | qr_eigen

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
  const [shift, setShift] = useState('0');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const isEigen = category === 'eigen';
  const isIterative =
    method === 'jacobi' ||
    method === 'seidel' ||
    method === 'power' ||
    method === 'inverse_power';
  const isLU = method === 'doolittle' || method === 'crout';
  const isCholesky = method === 'cholesky';

  // Manejar cambio de categoría
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setError(null);
    setResult(null);

    if (newCat === 'eigen') {
      setMethod('power');
      // Asegurar que vectorX0 no sea nulo para el método de la potencia
      if (!vectorX0 || vectorX0.every((v) => v === 0)) {
        setVectorX0(new Array(n).fill(1));
      }
    } else {
      setMethod('gauss');
    }
  };

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
        maxIter,
        shift
      });

      setResult(res);
    } catch (err) {
      setError(err.message || 'Error resolviendo el cálculo matricial.');
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
    if (!result) return;
    let text = '';
    if (result.solution) {
      text = result.solution.map((val, idx) => `x_${idx + 1} = ${val}`).join('\n');
    } else if (result.eigenvector) {
      text = `λ = ${result.eigenvalue}\nVector propio normalizado:\n` +
        result.eigenvector.map((val, idx) => `v_${idx + 1} = ${val}`).join('\n');
    } else if (result.eigenvalues) {
      text = result.eigenvalues.map((ev, idx) => `λ_${idx + 1} = ${ev.text}`).join('\n');
    }
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Columnas dinámicas para la tabla de iteración de Jacobi / Gauss-Seidel
  const iterativeColumns = useMemo(() => {
    if ((method !== 'jacobi' && method !== 'seidel') || !result || !result.iterations) return [];

    const cols = [{ key: 'k', label: 'k (Iter)' }];
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
  }, [method, result, n, precision]);

  // Columnas para tabla de iteración del Método de las Potencias / Potencia Inversa
  const powerMethodColumns = useMemo(() => {
    if ((method !== 'power' && method !== 'inverse_power') || !result || !result.iterations) return [];

    const cols = [
      { key: 'k', label: 'Iteración (k)' },
      {
        key: 'lambda',
        label: 'λ Cociente Rayleigh',
        render: (val) => formatNum(val, precision)
      }
    ];

    const maxColsToShow = Math.min(n, 5);
    for (let i = 0; i < maxColsToShow; i++) {
      cols.push({
        key: `v_${i}`,
        label: `v_${i + 1}`,
        render: (_, row) => (row.vector ? formatNum(row.vector[i], precision) : '—')
      });
    }
    if (n > 5) {
      cols.push({
        key: 'more',
        label: '...',
        render: () => '...'
      });
    }

    cols.push({
      key: 'error',
      label: 'Error |Δλ|',
      render: (val) => (val !== null ? formatNum(val, precision) : '—')
    });

    return cols;
  }, [method, result, n, precision]);

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

  // Formato LaTeX para matrices estándar (L, U, Schur, etc.)
  const formatMatrixToLatex = (mat) => {
    if (!mat || !Array.isArray(mat)) return null;
    const rowsTex = mat
      .map((row) => row.map((v) => formatNum(v, 3)).join(' & '))
      .join(' \\\\ \n');
    return `\\begin{pmatrix} \n ${rowsTex} \n \\end{pmatrix}`;
  };

  return (
    <div className="space-y-6">
      {/* Selector de Categoría Principal */}
      <div className="flex border-b border-slate-700/60 pb-3 gap-3">
        <button
          type="button"
          onClick={() => handleCategoryChange('systems')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            category === 'systems'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sistemas Lineales ($A x = b$)</span>
        </button>

        <button
          type="button"
          onClick={() => handleCategoryChange('eigen')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            category === 'eigen'
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Autovalores & Autovectores ($A v = \lambda v$)</span>
        </button>
      </div>

      {/* Selector de Método Específico */}
      {category === 'systems' ? (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Selecciona el Método de Solución:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
            {[
              { id: 'gauss', label: 'Gauss' },
              { id: 'jordan', label: 'Gauss-Jordan' },
              { id: 'doolittle', label: 'LU Doolittle' },
              { id: 'crout', label: 'LU Crout' },
              { id: 'cholesky', label: 'Cholesky (LLᵀ)' },
              { id: 'jacobi', label: 'Jacobi' },
              { id: 'seidel', label: 'Gauss-Seidel' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMethod(m.id);
                  setError(null);
                  setResult(null);
                }}
                className={`py-2 px-2.5 rounded-xl font-medium text-xs transition-all text-center ${
                  method === m.id
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Selecciona el Algoritmo Espectral:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
            {[
              {
                id: 'power',
                label: 'Método de la Potencia',
                desc: 'Autovalor dominante λ_max y autovector'
              },
              {
                id: 'inverse_power',
                label: 'Potencia Inversa con Shift',
                desc: 'Autovalor más cercano a μ y autovector'
              },
              {
                id: 'qr_eigen',
                label: 'Algoritmo QR',
                desc: 'Espectro completo (reales y complejos)'
              }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMethod(m.id);
                  setError(null);
                  setResult(null);
                }}
                className={`p-3 rounded-xl transition-all text-left ${
                  method === m.id
                    ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-bold">{m.label}</div>
                <div
                  className={`text-[11px] font-normal ${
                    method === m.id ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {m.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor de Matriz */}
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
          hideVectorB={isEigen}
        />

        {/* Parámetros específicos según el método */}
        {(isIterative || method === 'qr_eigen') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <div>
              <label
                htmlFor="linear-tolerance-input"
                className="block text-xs font-semibold text-slate-300 mb-1"
              >
                Tolerancia de convergencia (|ε|)
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
                Iteraciones Máximas (Tope: 200)
              </label>
              <input
                id="linear-max-iter-input"
                type="number"
                min="1"
                max="200"
                value={maxIter}
                onChange={(e) => setMaxIter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              />
            </div>

            {method === 'inverse_power' && (
              <div>
                <label
                  htmlFor="linear-shift-input"
                  className="block text-xs font-semibold text-indigo-300 mb-1"
                >
                  Desplazamiento Spectral Shift (μ)
                </label>
                <input
                  id="linear-shift-input"
                  type="number"
                  step="any"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  placeholder="0 para autovalor menor"
                  className="w-full px-3 py-2 bg-slate-900 border border-indigo-500/70 rounded-xl text-indigo-200 text-sm font-mono focus:border-indigo-400 focus:outline-none"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer ${
              isEigen
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-indigo-500/20'
                : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-teal-500/20'
            }`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>
              {loading
                ? `Calculando (${n}×${n}) en Web Worker...`
                : isEigen
                ? `Calcular Autovalores (${n}×${n})`
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
          title="Error en el Cálculo Matricial"
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
                <span>{copied ? '¡Copiado!' : 'Copiar Resultado'}</span>
              </button>
            </div>
          )}

          {/* VISTA 1: AUTOVALORES Y AUTOVECTORES */}
          {isEigen ? (
            <div className="space-y-6">
              {/* Resultado del Algoritmo QR (Espectro Completo) */}
              {method === 'qr_eigen' && result.eigenvalues && (
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-indigo-700/50 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                    <div className="text-xs uppercase font-bold tracking-wider text-indigo-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>
                        Espectro de Autovalores • {result.method} ({result.eigenvalues.length} Raíces)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Iteraciones QR: {result.iterations}
                    </span>
                  </div>

                  {/* Grid de Autovalores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {result.eigenvalues.map((ev, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                          <span>λ_{idx + 1}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              ev.imag !== 0
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                            }`}
                          >
                            {ev.imag !== 0 ? 'Complejo' : 'Real'}
                          </span>
                        </div>
                        <div className="text-base font-mono font-bold text-indigo-300 truncate" title={ev.text}>
                          {ev.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Matriz Cuasi-triangular de Schur */}
                  {result.finalMatrix && n <= 8 && (
                    <div className="mt-4 p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
                      <div className="text-xs font-semibold text-slate-300">
                        Matriz Cuasi-triangular de Schur ($A_k$ tras convergencia QR):
                      </div>
                      <div className="overflow-x-auto py-2 text-center">
                        <LatexRenderer
                          expression={formatMatrixToLatex(result.finalMatrix)}
                          displayMode={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Resultado de Método de la Potencia o Potencia Inversa */}
              {(method === 'power' || method === 'inverse_power') && result.eigenvalue !== undefined && (
                <>
                  <div className="p-5 rounded-2xl border bg-indigo-950/25 border-indigo-600/50 shadow-xl backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                        {result.method} • Convergencia
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Iteraciones: {result.iterations?.length || 0}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Autovalor Dominante */}
                      <div className="p-4 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-1">
                        <div className="text-xs text-slate-400 font-mono">
                          {method === 'power'
                            ? 'Valor Propio Dominante (λ_max):'
                            : `Valor Propio más cercano a μ = ${result.shift}:`}
                        </div>
                        <div className="text-2xl font-bold font-mono text-indigo-300">
                          λ = {formatNum(result.eigenvalue, precision)}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          Cociente de Rayleigh: (xᵀ A x) / (xᵀ x)
                        </div>
                      </div>

                      {/* Autovector Normalizado */}
                      <div className="p-4 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-2">
                        <div className="text-xs text-slate-400 font-mono">
                          Vector Propio Normalizado (||v||₂ = 1):
                        </div>
                        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                          {result.eigenvector?.map((val, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-slate-800 rounded font-mono text-xs text-indigo-200 border border-slate-700"
                            >
                              v_{idx + 1} = {formatNum(val, precision)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {result.message && (
                      <div className="text-xs text-slate-300 border-t border-slate-700/50 pt-2">
                        {result.message}
                      </div>
                    )}
                  </div>

                  {/* Tabla de Convergencia del Método de las Potencias */}
                  {result.iterations && (
                    <IterationTable
                      title={`Historial de Convergencia Espectral • ${result.method}`}
                      columns={powerMethodColumns}
                      data={result.iterations}
                      precision={precision}
                      filename={`autovalores_${method}`}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            /* VISTA 2: SISTEMAS LINEALES (Ax = b) */
            <div className="space-y-6">
              {/* Vector Solución Destacado */}
              {result.solution && (
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
                        <div
                          className="text-base sm:text-lg font-bold font-mono text-emerald-300 truncate"
                          title={`${val}`}
                        >
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
              )}

              {/* FACTORIZACIÓN LU / CHOLESKY */}
              {(isLU || isCholesky) && (
                <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-5">
                  <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <span>
                      Factorización Matricial {isCholesky ? 'A = L · Lᵀ' : 'A = L · U'}:
                    </span>
                  </h4>

                  {/* Renderizado de Matrices L y U / LT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.L && (
                      <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
                        <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                          Matriz Triangular Inferior [L]:
                        </span>
                        {n <= 8 ? (
                          <div className="overflow-x-auto py-2 text-center">
                            <LatexRenderer
                              expression={formatMatrixToLatex(result.L)}
                              displayMode={true}
                            />
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 font-mono py-2">
                            [Matriz L de dimensión {n}×{n} calculada]
                          </div>
                        )}
                      </div>
                    )}

                    {(result.U || result.LT) && (
                      <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
                        <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                          {isCholesky
                            ? 'Matriz Traspuesta [Lᵀ]:'
                            : 'Matriz Triangular Superior [U]:'}
                        </span>
                        {n <= 8 ? (
                          <div className="overflow-x-auto py-2 text-center">
                            <LatexRenderer
                              expression={formatMatrixToLatex(result.U || result.LT)}
                              displayMode={true}
                            />
                          </div>
                        ) : (
                          <div className="text-xs text-slate-500 font-mono py-2">
                            [Matriz de dimensión {n}×{n} calculada]
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Vector Intermedio y */}
                  {result.y && (
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-2">
                      <div className="text-xs font-bold text-slate-300">
                        Vector Intermedio [y] de la Sustitución hacia adelante ($L \\cdot y = b$):
                      </div>
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                        {result.y.map((val, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-800 rounded-lg font-mono text-xs text-teal-300 border border-slate-700"
                          >
                            y_{idx + 1} = {formatNum(val, precision)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sustitución hacia adelante (L y = b) */}
                  {result.forwardSteps && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-400">
                        Pasos de Sustitución Hacia Adelante ($L \\cdot y = b$):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto">
                        {result.forwardSteps.map((s, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/60 font-mono text-xs"
                          >
                            <span className="text-teal-400 font-bold">{s.variable}: </span>
                            <span className="text-slate-400">{s.formula}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sustitución hacia atrás (U x = y o LT x = y) */}
                  {result.backwardSteps && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-400">
                        Pasos de Sustitución Hacia Atrás ({isCholesky ? '$L^T \\cdot x = y$' : '$U \\cdot x = y$'}):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto">
                        {result.backwardSteps.map((s, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/60 font-mono text-xs"
                          >
                            <span className="text-emerald-400 font-bold">{s.variable}: </span>
                            <span className="text-slate-400">{s.formula}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Historial de Sustitución hacia atrás (Gauss clásico) */}
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

              {/* Pasos de Matriz Escalonada (Gauss y Jordan) */}
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

              {/* Tabla de Convergencia (Jacobi / Gauss-Seidel) */}
              {(method === 'jacobi' || method === 'seidel') && result.iterations && (
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
      )}
    </div>
  );
}
