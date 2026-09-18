import React, { useState, useMemo } from 'react';
import {
  Play,
  Sparkles,
  Plus,
  Trash2,
  ArrowUpDown,
  FileSpreadsheet,
  Layers,
  Calculator,
  Target,
  Table,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  lagrangeInterpolation,
  newtonDividedDifferences,
  cubicSplineNatural,
  validatePoints
} from '../engines/interpolationEngine';
import { formatNum } from '../engines/mathParser';
import LatexRenderer from '../components/LatexRenderer';
import InteractivePlot from '../components/InteractivePlot';
import AlertBanner from '../components/AlertBanner';

export default function InterpolationModule({ precision = 6 }) {
  const [method, setMethod] = useState('lagrange'); // 'lagrange' | 'newton' | 'spline'

  // Puntos iniciales por defecto (f(x) = x^3 - 2x + 1)
  const [points, setPoints] = useState([
    { x: -2, y: -3 },
    { x: -1, y: 2 },
    { x: 1, y: 0 },
    { x: 2, y: 5 },
    { x: 3, y: 22 }
  ]);

  const [evalX, setEvalX] = useState('1.5');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Modal de importación de puntos
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvError, setCsvError] = useState(null);

  // Presets pedagógicos y de ingeniería
  const loadPreset = (type) => {
    setError(null);
    setResult(null);

    if (type === 'runge') {
      // Función de Runge f(x) = 1 / (1 + 25*x^2) en [-1, 1]
      const pts = [-1, -0.6, -0.2, 0.2, 0.6, 1].map((x) => ({
        x: parseFloat(x.toFixed(2)),
        y: parseFloat((1 / (1 + 25 * x * x)).toFixed(4))
      }));
      setPoints(pts);
      setEvalX('0.0');
    } else if (type === 'thermo') {
      // Calor específico del agua vs Temperatura
      setPoints([
        { x: 0, y: 1.0074 },
        { x: 20, y: 0.9988 },
        { x: 40, y: 0.998 },
        { x: 60, y: 1.0001 },
        { x: 80, y: 1.0037 },
        { x: 100, y: 1.0084 }
      ]);
      setEvalX('50');
    } else if (type === 'kinematics') {
      // Trayectoria de proyectil
      setPoints([
        { x: 0, y: 0 },
        { x: 10, y: 24.5 },
        { x: 20, y: 39 },
        { x: 30, y: 43.5 },
        { x: 40, y: 38 },
        { x: 50, y: 22.5 },
        { x: 60, y: 0 }
      ]);
      setEvalX('25');
    } else if (type === 'simple3') {
      setPoints([
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 4, y: 7 }
      ]);
      setEvalX('3');
    }
  };

  // Agregar / Modificar / Eliminar puntos
  const handlePointChange = (index, field, value) => {
    const val = parseFloat(value);
    const updated = [...points];
    updated[index] = {
      ...updated[index],
      [field]: Number.isNaN(val) ? 0 : val
    };
    setPoints(updated);
  };

  const handleAddPoint = () => {
    const lastPoint = points[points.length - 1] || { x: 0, y: 0 };
    setPoints([...points, { x: lastPoint.x + 1, y: 0 }]);
  };

  const handleRemovePoint = (index) => {
    if (points.length <= 2) {
      setError('Se requieren al menos 2 puntos para interpolación.');
      return;
    }
    setPoints(points.filter((_, i) => i !== index));
  };

  const handleSortPoints = () => {
    const sorted = [...points].sort((a, b) => a.x - b.x);
    setPoints(sorted);
  };

  // Importar CSV de puntos
  const handleImportCsv = () => {
    try {
      setCsvError(null);
      const lines = csvText
        .trim()
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length < 2) {
        throw new Error('Debe proporcionar al menos 2 pares (x, y).');
      }

      const parsed = lines.map((line, idx) => {
        const parts = line.split(/[\t,;\s]+/).map((v) => parseFloat(v));
        if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
          throw new Error(`Error en la fila ${idx + 1}: se requieren 2 valores numéricos (x e y).`);
        }
        return { x: parts[0], y: parts[1] };
      });

      // Validar abscisas
      validatePoints(parsed, 2);

      setPoints(parsed);
      setShowCsvModal(false);
      setCsvText('');
    } catch (err) {
      setCsvError(err.message || 'Error importando datos.');
    }
  };

  // Validación de duplicados en tiempo real
  const validationWarning = useMemo(() => {
    const seen = new Set();
    for (const pt of points) {
      if (seen.has(pt.x)) {
        return `Abscisa repetida x = ${pt.x}. Todos los valores de x deben ser distintos.`;
      }
      seen.add(pt.x);
    }
    if (method === 'spline' && points.length < 3) {
      return 'Los Splines Cúbicos requieren al menos 3 puntos.';
    }
    return null;
  }, [points, method]);

  // Ejecución del cálculo
  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    setTimeout(() => {
      try {
        if (validationWarning) {
          throw new Error(validationWarning);
        }

        let res;
        if (method === 'lagrange') {
          res = lagrangeInterpolation(points);
        } else if (method === 'newton') {
          res = newtonDividedDifferences(points);
        } else if (method === 'spline') {
          res = cubicSplineNatural(points);
        }

        setResult(res);
      } catch (err) {
        setError(err.message || 'Error realizando la interpolación.');
      } finally {
        setLoading(false);
      }
    }, 30);
  };

  // Evaluación puntual en x*
  const evaluatedValue = useMemo(() => {
    if (!result || !result.evaluate) return null;
    const targetX = parseFloat(evalX);
    if (Number.isNaN(targetX)) return null;
    try {
      return result.evaluate(targetX);
    } catch {
      return null;
    }
  }, [result, evalX]);

  // Curva continua para el gráfico Plotly
  const plotData = useMemo(() => {
    if (!result || !result.evaluate) return [];

    const sortedPts = [...points].sort((a, b) => a.x - b.x);
    const minX = sortedPts[0].x;
    const maxX = sortedPts[sortedPts.length - 1].x;
    const span = maxX - minX || 1;
    const plotMinX = minX - span * 0.08;
    const plotMaxX = maxX + span * 0.08;

    const numSamples = 200;
    const curveX = [];
    const curveY = [];
    const step = (plotMaxX - plotMinX) / (numSamples - 1);

    for (let i = 0; i < numSamples; i++) {
      const curX = plotMinX + i * step;
      try {
        const curY = result.evaluate(curX);
        if (Number.isFinite(curY)) {
          curveX.push(curX);
          curveY.push(curY);
        }
      } catch {
        // Ignorar puntos fuera de cálculo
      }
    }

    const traces = [
      // Curva interpolante continua
      {
        x: curveX,
        y: curveY,
        type: 'scatter',
        mode: 'lines',
        name: `${result.method}`,
        line: { color: '#14b8a6', width: 2.5 }
      },
      // Puntos de datos dados (nodos)
      {
        x: sortedPts.map((p) => p.x),
        y: sortedPts.map((p) => p.y),
        type: 'scatter',
        mode: 'markers',
        name: `Nodos (${sortedPts.length} puntos)`,
        marker: {
          color: '#38bdf8',
          size: 9,
          line: { color: '#0f172a', width: 2 }
        }
      }
    ];

    // Punto evaluado x*
    if (evaluatedValue !== null) {
      const targetX = parseFloat(evalX);
      traces.push({
        x: [targetX],
        y: [evaluatedValue],
        type: 'scatter',
        mode: 'markers+text',
        name: `Evaluado (${targetX}, ${formatNum(evaluatedValue, 3)})`,
        text: [`P(${targetX}) ≈ ${formatNum(evaluatedValue, precision)}`],
        textposition: 'top right',
        marker: {
          color: '#f59e0b',
          size: 11,
          symbol: 'star',
          line: { color: '#0f172a', width: 1.5 }
        }
      });
    }

    return traces;
  }, [result, points, evaluatedValue, evalX, precision]);

  return (
    <div className="space-y-6">
      {/* Selector de Método */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
        {[
          { id: 'lagrange', label: 'Polinomios de Lagrange' },
          { id: 'newton', label: 'Diferencias Divididas de Newton' },
          { id: 'spline', label: 'Splines Cúbicos Naturales' }
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

      {/* Editor de Puntos de Interpolación */}
      <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm space-y-5">
        {/* Cabecera y Presets */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-semibold text-slate-200">
              Tabla de Nodos a Interpolar (x_i, y_i):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Presets:
            </span>
            <button
              type="button"
              onClick={() => loadPreset('runge')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Función clásica de Runge para evaluar oscilaciones en extremos"
            >
              Fenómeno Runge
            </button>
            <button
              type="button"
              onClick={() => loadPreset('thermo')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Termodinámica
            </button>
            <button
              type="button"
              onClick={() => loadPreset('kinematics')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Cinemática
            </button>
            <button
              type="button"
              onClick={() => setShowCsvModal(true)}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 flex items-center gap-1 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Pegar / CSV</span>
            </button>
          </div>
        </div>

        {/* Advertencia de duplicados */}
        {validationWarning && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-700 text-amber-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{validationWarning}</span>
          </div>
        )}

        {/* Lista de Filas de Puntos */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          <div className="grid grid-cols-12 gap-2 text-xs font-mono text-slate-400 px-2">
            <span className="col-span-1 text-center">i</span>
            <span className="col-span-5 font-semibold text-teal-400">Abscisa (x_i)</span>
            <span className="col-span-5 font-semibold text-indigo-400">Ordenada (y_i)</span>
            <span className="col-span-1 text-center">Acción</span>
          </div>

          {points.map((pt, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 gap-2 items-center bg-slate-900/60 p-1.5 rounded-xl border border-slate-700/60"
            >
              <span className="col-span-1 text-xs font-mono text-slate-400 text-center">
                {idx}
              </span>

              <div className="col-span-5">
                <input
                  type="number"
                  step="any"
                  value={pt.x}
                  onChange={(e) => handlePointChange(idx, 'x', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 focus:border-teal-400 rounded-lg text-xs font-mono text-slate-100 text-center focus:outline-none"
                  placeholder="x_i"
                />
              </div>

              <div className="col-span-5">
                <input
                  type="number"
                  step="any"
                  value={pt.y}
                  onChange={(e) => handlePointChange(idx, 'y', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 focus:border-indigo-400 rounded-lg text-xs font-mono text-slate-100 text-center focus:outline-none"
                  placeholder="y_i"
                />
              </div>

              <div className="col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleRemovePoint(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  title="Eliminar punto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de acción sobre la tabla */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddPoint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-teal-400" />
              <span>Agregar Punto</span>
            </button>
            <button
              type="button"
              onClick={handleSortPoints}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
              title="Ordenar puntos en orden ascendente según x"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Ordenar por x</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Total de nodos: <strong className="text-teal-300">{points.length}</strong> (Grado:{' '}
            {points.length - 1})
          </div>
        </div>

        {/* Punto a Evaluar x* */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 items-center">
          <div>
            <label
              htmlFor="interp-eval-x"
              className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Evaluar Polinomio en x*:</span>
            </label>
            <input
              id="interp-eval-x"
              type="number"
              step="any"
              value={evalX}
              onChange={(e) => setEvalX(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-amber-400 focus:outline-none"
              placeholder="Ej: 1.5"
            />
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Resultado evaluado P(x*):</span>
            <div className="text-lg font-bold font-mono text-amber-300">
              {evaluatedValue !== null
                ? `P(${evalX}) ≈ ${formatNum(evaluatedValue, precision)}`
                : '—'}
            </div>
          </div>
        </div>

        {/* Botón de Cálculo */}
        <button
          type="button"
          onClick={handleCalculate}
          disabled={loading || !!validationWarning}
          className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-slate-950" />
          )}
          <span>{loading ? 'Calculando Interpolación...' : 'Calcular Interpolación'}</span>
        </button>
      </div>

      {/* Alerta de Error */}
      {error && (
        <AlertBanner
          type="error"
          title="Error en Interpolación"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Resultados */}
      {result && (
        <div className="space-y-6">
          {/* Tarjeta de Resumen */}
          <div className="p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Resultado • {result.method}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {result.degree !== undefined
                  ? `Polinomio de Grado n = ${result.degree}`
                  : `${result.numIntervals} Tramos Cúbicos`}
              </span>
            </div>

            {/* Fórmula Expandida en KaTeX */}
            {result.expandedLatex && (
              <div className="p-4 bg-slate-900/80 rounded-xl border border-emerald-700/40 text-center overflow-x-auto">
                <div className="text-xs text-slate-400 mb-1 font-sans">
                  Forma Canónica Expandida:
                </div>
                <LatexRenderer expression={result.expandedLatex} displayMode={true} />
              </div>
            )}

            {/* Spline Cúbico: resumen de tramos */}
            {result.intervals && (
              <div className="text-xs text-slate-300">
                Ajuste cúbico continuo de clase $C^2$ con segundas derivadas continuas y extremos naturales ($S''(x_0) = S''(x_n) = 0$).
              </div>
            )}
          </div>

          {/* Gráfico Plotly de la Curva */}
          <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span>Curva Interpolada y Nodos:</span>
              <span className="text-xs font-mono text-teal-400">{result.method}</span>
            </h4>
            <InteractivePlot
              data={plotData}
              layout={{
                title: {
                  text: `Interpolación mediante ${result.method}`,
                  font: { color: '#e2e8f0', size: 14 }
                },
                xaxis: { title: { text: 'x' } },
                yaxis: { title: { text: 'y(x)' } }
              }}
            />
          </div>

          {/* Detalles específicos según el método */}

          {/* 1. Lagrange: Bases L_i(x) */}
          {result.basis && (
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Table className="w-4 h-4 text-teal-400" />
                <span>Polinomio de Lagrange Completo y Términos Base:</span>
              </h4>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-x-auto text-center">
                <LatexRenderer expression={result.latex} displayMode={true} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.basis.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs font-mono"
                  >
                    <div className="text-teal-400 font-bold mb-1">
                      L_{idx}(x) en x_{idx} = {b.xi}:
                    </div>
                    <div className="text-slate-400 mb-1">
                      Denominador: {formatNum(b.denominator, 4)} | Peso y_i / den: {formatNum(b.weight, 4)}
                    </div>
                    <div className="text-slate-300">
                      Factores: {b.factors.map((f) => f.text).join('')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Newton: Tabla Piramidal de Diferencias Divididas */}
          {result.table && (
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Table className="w-4 h-4 text-teal-400" />
                <span>Tabla de Diferencias Divididas de Newton:</span>
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/80">
                      <th className="p-2 text-center">i</th>
                      <th className="p-2 text-center text-teal-400">x_i</th>
                      <th className="p-2 text-center text-indigo-400">f[x_i]</th>
                      {Array.from({ length: result.points.length - 1 }).map((_, colIdx) => (
                        <th key={colIdx} className="p-2 text-center text-emerald-400">
                          {colIdx === 0 ? '1ra Dif.' : `${colIdx + 1}a Dif.`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.points.map((pt, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-slate-800/60 hover:bg-slate-900/40"
                      >
                        <td className="p-2 text-center text-slate-500">{rowIdx}</td>
                        <td className="p-2 text-center font-bold text-slate-200">{pt.x}</td>
                        <td className="p-2 text-center text-teal-300 font-semibold">
                          {formatNum(result.table[rowIdx][0], precision)}
                        </td>
                        {Array.from({ length: result.points.length - 1 }).map((_, colIdx) => {
                          const val = result.table[rowIdx][colIdx + 1];
                          const isPivot = rowIdx === 0;
                          return (
                            <td
                              key={colIdx}
                              className={`p-2 text-center ${
                                isPivot
                                  ? 'bg-teal-950/30 text-teal-200 font-bold border-l border-r border-teal-800/50'
                                  : 'text-slate-400'
                              }`}
                            >
                              {val !== null && val !== undefined
                                ? formatNum(val, precision)
                                : '—'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-x-auto text-center">
                <div className="text-xs text-slate-400 mb-1 font-sans">
                  Fórmula Polinómica en Forma de Newton:
                </div>
                <LatexRenderer expression={result.latex} displayMode={true} />
              </div>
            </div>
          )}

          {/* 3. Splines Cúbicos: Tramos S_i(x) y Segundas Derivadas */}
          {result.intervals && (
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Table className="w-4 h-4 text-teal-400" />
                <span>Ecuaciones de Cada Tramo Cúbico S_i(x):</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.intervals.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-300 font-mono">
                        Tramo {idx + 1}: x ∈ [{it.x0}, {it.x1}]
                      </span>
                      <span className="text-slate-400 font-mono">h_{idx} = {it.h}</span>
                    </div>

                    <div className="overflow-x-auto py-1 text-center bg-slate-950/60 rounded-lg p-2">
                      <LatexRenderer expression={it.formulaLatex} displayMode={false} />
                    </div>

                    <div className="grid grid-cols-4 gap-1 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                      <div>a: {formatNum(it.a, 3)}</div>
                      <div>b: {formatNum(it.b, 3)}</div>
                      <div>c: {formatNum(it.c, 3)}</div>
                      <div>d: {formatNum(it.d, 3)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Segundas derivadas */}
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs">
                <span className="font-semibold text-slate-300 block mb-1">
                  Segundas Derivadas en Nodos (M_i = S''(x_i)):
                </span>
                <div className="flex flex-wrap gap-2 font-mono">
                  {result.secondDerivatives.map((mVal, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700"
                    >
                      M_{idx}: {formatNum(mVal, 4)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal de Importación de Puntos */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-base">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Pegar Puntos (x, y)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCsvModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Pega pares de valores numéricos separados por comas, espacios o tabulaciones (una línea por punto).
            </p>

            <textarea
              rows={8}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={`-2  -3\n-1   2\n 1   0\n 2   5\n 3  22`}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-teal-200 focus:border-teal-400 focus:outline-none"
            />

            {csvError && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-700 text-rose-300 text-xs">
                {csvError}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCsvModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImportCsv}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20"
              >
                Cargar Puntos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
