import React, { useState, useMemo } from 'react';
import { Play, Sparkles, AlertCircle, CheckCircle, Info, Sigma, Activity } from 'lucide-react';
import { compileFunction1D, formatNum } from '../engines/mathParser';
import {
  trapezoidalSimple,
  trapezoidalComposite,
  simpson13Composite,
  simpson38Composite,
  computeFiniteDifferences
} from '../engines/calculusEngine';
import LatexRenderer from '../components/LatexRenderer';
import InteractivePlot from '../components/InteractivePlot';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';

export default function CalculusModule({ precision = 6 }) {
  const [activeTab, setActiveTab] = useState('integration'); // 'integration' | 'differentiation'

  // Estado para Integración
  const [intMethod, setIntMethod] = useState('simpson13');
  const [intExpr, setIntExpr] = useState('x^2');
  const [paramA, setParamA] = useState('0');
  const [paramB, setParamB] = useState('1');
  const [paramN, setParamN] = useState('4');

  // Estado para Diferenciación
  const [diffExpr, setDiffExpr] = useState('x^3');
  const [diffX0, setDiffX0] = useState('2');
  const [diffH, setDiffH] = useState('0.01');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [intResult, setIntResult] = useState(null);
  const [diffResult, setDiffResult] = useState(null);

  // Vista previa KaTeX
  const currentLatexPreview = useMemo(() => {
    try {
      const expr = activeTab === 'integration' ? intExpr : diffExpr;
      const { toTex } = compileFunction1D(expr);
      return `f(x) = ${toTex()}`;
    } catch {
      return `f(x) = \\text{...}`;
    }
  }, [activeTab, intExpr, diffExpr]);

  // Presets para Integración
  const handleIntPreset = (fn, a, b, n) => {
    setIntExpr(fn);
    setParamA(a);
    setParamB(b);
    setParamN(n);
    setError(null);
    setIntResult(null);
  };

  // Presets para Diferenciación
  const handleDiffPreset = (fn, x0, h) => {
    setDiffExpr(fn);
    setDiffX0(x0);
    setDiffH(h);
    setError(null);
    setDiffResult(null);
  };

  // Ejecución de Integración
  const handleCalculateIntegration = (e) => {
    if (e) e.preventDefault();
    setError(null);
    setIntResult(null);
    setLoading(true);

    setTimeout(() => {
      try {
        const a = parseFloat(paramA);
        const b = parseFloat(paramB);
        const n = parseInt(paramN, 10);

        if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Los límites a y b deben ser números válidos.');
        if (a >= b) throw new Error('El límite superior b debe ser mayor que el límite inferior a.');

        let res;
        if (intMethod === 'trapezoidSimple') {
          res = trapezoidalSimple(intExpr, a, b);
        } else if (intMethod === 'trapezoidComp') {
          res = trapezoidalComposite(intExpr, a, b, n);
        } else if (intMethod === 'simpson13') {
          res = simpson13Composite(intExpr, a, b, n);
        } else if (intMethod === 'simpson38') {
          res = simpson38Composite(intExpr, a, b, n);
        }

        setIntResult(res);
      } catch (err) {
        setError(err.message || 'Error durante la integración numérica.');
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  // Ejecución de Diferenciación
  const handleCalculateDifferentiation = (e) => {
    if (e) e.preventDefault();
    setError(null);
    setDiffResult(null);
    setLoading(true);

    setTimeout(() => {
      try {
        const x0 = parseFloat(diffX0);
        const h = parseFloat(diffH);

        if (Number.isNaN(x0)) throw new Error('El punto x0 debe ser un número válido.');
        if (Number.isNaN(h) || h <= 0) throw new Error('El paso h debe ser estrictamente positivo.');

        const res = computeFiniteDifferences(diffExpr, x0, h);
        setDiffResult(res);
      } catch (err) {
        setError(err.message || 'Error durante la diferenciación numérica.');
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  // Gráfico para Integración
  const intPlotData = useMemo(() => {
    if (!intResult) return [];

    try {
      const { evaluate } = compileFunction1D(intExpr);
      const a = parseFloat(paramA);
      const b = parseFloat(paramB);
      const margin = (b - a) * 0.25;
      const xMin = a - margin;
      const xMax = b + margin;

      // Curva continua
      const curveX = [];
      const curveY = [];
      const numPts = 200;
      const step = (xMax - xMin) / numPts;

      for (let i = 0; i <= numPts; i++) {
        const x = xMin + i * step;
        try {
          const y = evaluate(x);
          curveX.push(x);
          curveY.push(y);
        } catch {
          curveX.push(x);
          curveY.push(null);
        }
      }

      // Área sombreada segmentada por los nodos
      const areaX = [a, ...intResult.points.map((p) => p.x), b];
      const areaY = [0, ...intResult.points.map((p) => p.fx), 0];

      return [
        {
          x: areaX,
          y: areaY,
          fill: 'tozeroy',
          fillcolor: 'rgba(20, 184, 166, 0.22)',
          line: { color: '#0d9488', width: 1 },
          type: 'scatter',
          name: 'Área Integrada',
          mode: 'lines'
        },
        {
          x: curveX,
          y: curveY,
          type: 'scatter',
          mode: 'lines',
          name: 'f(x)',
          line: { color: '#38bdf8', width: 2.5 }
        },
        {
          x: intResult.points.map((p) => p.x),
          y: intResult.points.map((p) => p.fx),
          type: 'scatter',
          mode: 'markers+lines',
          name: 'Nodos de Mallado',
          marker: { color: '#f59e0b', size: 6 },
          line: { color: '#f59e0b', width: 1, dash: 'dot' }
        }
      ];
    } catch {
      return [];
    }
  }, [intResult, intExpr, paramA, paramB]);

  // Gráfico para Diferenciación
  const diffPlotData = useMemo(() => {
    if (!diffResult) return [];

    try {
      const { evaluate } = compileFunction1D(diffExpr);
      const x0 = diffResult.x0;
      const h = diffResult.h;
      const span = Math.max(1, h * 6);
      const xMin = x0 - span;
      const xMax = x0 + span;

      const curveX = [];
      const curveY = [];
      const pts = 150;
      const step = (xMax - xMin) / pts;

      for (let i = 0; i <= pts; i++) {
        const x = xMin + i * step;
        try {
          const y = evaluate(x);
          curveX.push(x);
          curveY.push(y);
        } catch {
          curveX.push(x);
          curveY.push(null);
        }
      }

      // Recta tangente aproximada con derivada central de alto orden
      const slope = diffResult.firstDerivative.central4.value;
      const tangentY0 = diffResult.fx0;
      const tangentX = [x0 - span * 0.7, x0 + span * 0.7];
      const tangentY = tangentX.map((x) => tangentY0 + slope * (x - x0));

      return [
        {
          x: curveX,
          y: curveY,
          type: 'scatter',
          mode: 'lines',
          name: 'f(x)',
          line: { color: '#38bdf8', width: 2.5 }
        },
        {
          x: tangentX,
          y: tangentY,
          type: 'scatter',
          mode: 'lines',
          name: `Tangente f'(x0) ≈ ${formatNum(slope, precision)}`,
          line: { color: '#10b981', width: 2, dash: 'dash' }
        },
        {
          x: diffResult.evaluations.map((e) => e.x),
          y: diffResult.evaluations.map((e) => e.fx),
          type: 'scatter',
          mode: 'markers',
          name: 'Puntos del Mallado (x0 ± kh)',
          marker: { color: '#fbbf24', size: 8, symbol: 'diamond' }
        }
      ];
    } catch {
      return [];
    }
  }, [diffResult, diffExpr, precision]);

  // Columnas para tabla de nodos de integración
  const intTableColumns = [
    { key: 'i', label: 'i (Nodo)' },
    { key: 'x', label: 'x_i' },
    { key: 'fx', label: 'f(x_i)' }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Tabs: Integración vs Diferenciación */}
      <div className="flex rounded-2xl bg-slate-900/80 p-1.5 border border-slate-700/60 max-w-md">
        <button
          onClick={() => {
            setActiveTab('integration');
            setError(null);
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'integration'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sigma className="w-4 h-4" />
          <span>Integración Numérica</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('differentiation');
            setError(null);
          }}
          className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'differentiation'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Diferenciación Finitas</span>
        </button>
      </div>

      {/* SECCIÓN 1: INTEGRACIÓN NUMÉRICA */}
      {activeTab === 'integration' && (
        <div className="space-y-6">
          {/* Selector de Método de Integración */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60">
            {[
              { id: 'trapezoidSimple', label: 'Trapecio Simple' },
              { id: 'trapezoidComp', label: 'Trapecio Compuesto' },
              { id: 'simpson13', label: 'Simpson 1/3 Compuesto' },
              { id: 'simpson38', label: 'Simpson 3/8 Compuesto' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setIntMethod(m.id);
                  setError(null);
                  setIntResult(null);
                }}
                className={`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${
                  intMethod === m.id
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Formulario de Entrada */}
          <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="integration-function-input" className="text-xs sm:text-sm font-semibold text-slate-200">
                  Función a integrar f(x)
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Presets:</span>
                  <button
                    type="button"
                    onClick={() => handleIntPreset('x^2', '0', '1', '4')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    x² [0,1]
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIntPreset('sin(x)', '0', 'pi', '6')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    sin(x) [0,π]
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIntPreset('e^(-x^2)', '0', '2', '8')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    e^(-x²) [0,2]
                  </button>
                </div>
              </div>

              <input
                id="integration-function-input"
                type="text"
                value={intExpr}
                onChange={(e) => setIntExpr(e.target.value)}
                placeholder="Ej: x^2"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
                required
              />

              <div className="mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2">
                <span className="text-xs text-slate-400 font-sans">Render LaTeX:</span>
                <LatexRenderer expression={currentLatexPreview} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="integration-limit-a" className="block text-xs font-semibold text-slate-300 mb-1">
                  Límite inferior (a)
                </label>
                <input
                  id="integration-limit-a"
                  type="number"
                  step="any"
                  value={paramA}
                  onChange={(e) => setParamA(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="integration-limit-b" className="block text-xs font-semibold text-slate-300 mb-1">
                  Límite superior (b)
                </label>
                <input
                  id="integration-limit-b"
                  type="number"
                  step="any"
                  value={paramB}
                  onChange={(e) => setParamB(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                  required
                />
              </div>

              {intMethod !== 'trapezoidSimple' && (
                <div>
                  <label htmlFor="integration-subintervals-n" className="block text-xs font-semibold text-slate-300 mb-1">
                    Subintervalos (n)
                    {intMethod === 'simpson13' && ' [Par requerido]'}
                    {intMethod === 'simpson38' && ' [Múltiplo de 3]'}
                  </label>
                  <input
                    id="integration-subintervals-n"
                    type="number"
                    min="1"
                    value={paramN}
                    onChange={(e) => setParamN(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleCalculateIntegration}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-slate-950" />
              )}
              <span>{loading ? 'Integrando...' : 'Calcular Integral'}</span>
            </button>
          </div>

          {/* Notificación de ajuste de n si se modificó automáticamente */}
          {intResult?.adjustmentNotice && (
            <AlertBanner
              type="info"
              title="Ajuste Automático de Subintervalos"
              message={intResult.adjustmentNotice}
            />
          )}

          {error && (
            <AlertBanner
              type="error"
              title="Error en Integración"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          {intResult && (
            <div className="space-y-6">
              {/* Tarjeta de Resultado Principal */}
              <div className="p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                      Resultado Integral Definida • {intResult.method}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1">
                      I ≈ {formatNum(intResult.result, precision)}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      En intervalo [{paramA}, {paramB}] con n = {intResult.n} (paso h ={' '}
                      {formatNum(intResult.h, 4)})
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right">
                    <div className="text-xs text-slate-400 font-medium">Error Teórico Estimado</div>
                    <div className="text-sm font-mono text-amber-300 font-bold">
                      |E_t| ≈ {formatNum(intResult.estimatedError, precision)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Área Segmentada */}
              <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
                <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span>Visualización del Área Segmentada:</span>
                  <span className="text-xs font-mono text-teal-400">{intResult.method}</span>
                </h4>
                <InteractivePlot
                  data={intPlotData}
                  layout={{
                    title: {
                      text: `Área bajo la curva con ${intResult.n} segmentos`,
                      font: { color: '#e2e8f0', size: 14 }
                    }
                  }}
                />
              </div>

              {/* Tabla de Nodos */}
              <IterationTable
                title="Valores de los Nodos f(x_i)"
                columns={intTableColumns}
                data={intResult.points}
                precision={precision}
                filename="nodos_integracion"
              />
            </div>
          )}
        </div>
      )}

      {/* SECCIÓN 2: DIFERENCIACIÓN NUMÉRICA */}
      {activeTab === 'differentiation' && (
        <div className="space-y-6">
          <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="differentiation-function-input" className="text-xs sm:text-sm font-semibold text-slate-200">
                  Función f(x)
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Presets:</span>
                  <button
                    type="button"
                    onClick={() => handleDiffPreset('x^3', '2', '0.01')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    x³ (x=2)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDiffPreset('sin(x)', '0.5', '0.001')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    sin(x) (x=0.5)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDiffPreset('e^x', '1', '0.01')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    eˣ (x=1)
                  </button>
                </div>
              </div>

              <input
                id="differentiation-function-input"
                type="text"
                value={diffExpr}
                onChange={(e) => setDiffExpr(e.target.value)}
                placeholder="Ej: x^3"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
                required
              />

              <div className="mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2">
                <span className="text-xs text-slate-400 font-sans">Render LaTeX:</span>
                <LatexRenderer expression={currentLatexPreview} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="differentiation-point-x0" className="block text-xs font-semibold text-slate-300 mb-1">
                  Punto de evaluación (x₀)
                </label>
                <input
                  id="differentiation-point-x0"
                  type="number"
                  step="any"
                  value={diffX0}
                  onChange={(e) => setDiffX0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="differentiation-step-h" className="block text-xs font-semibold text-slate-300 mb-1">
                  Tamaño de paso (h &gt; 0)
                </label>
                <input
                  id="differentiation-step-h"
                  type="number"
                  step="any"
                  value={diffH}
                  onChange={(e) => setDiffH(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculateDifferentiation}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-slate-950" />
              )}
              <span>{loading ? 'Calculando derivadas...' : 'Calcular Diferencias Finitas'}</span>
            </button>
          </div>

          {error && (
            <AlertBanner
              type="error"
              title="Error en Diferenciación"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          {diffResult && (
            <div className="space-y-6">
              {/* Panel de Primera Derivada f'(x0) */}
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                    <span>Primera Derivada f'(x₀) — Comparativa de Esquemas</span>
                  </h4>
                  <span className="text-xs font-mono text-teal-300">
                    f({diffResult.x0}) = {formatNum(diffResult.fx0, precision)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Centrada O(h⁴) [Máxima Precisión]',
                      data: diffResult.firstDerivative.central4,
                      accent: 'border-teal-500/70 bg-teal-950/20 text-teal-200'
                    },
                    {
                      title: 'Centrada O(h²)',
                      data: diffResult.firstDerivative.central1,
                      accent: 'border-cyan-500/50 bg-slate-900/60 text-cyan-200'
                    },
                    {
                      title: 'Hacia Adelante O(h²)',
                      data: diffResult.firstDerivative.forward2,
                      accent: 'border-slate-700 bg-slate-900/60 text-slate-200'
                    },
                    {
                      title: 'Hacia Atrás O(h²)',
                      data: diffResult.firstDerivative.backward2,
                      accent: 'border-slate-700 bg-slate-900/60 text-slate-200'
                    },
                    {
                      title: 'Hacia Adelante O(h)',
                      data: diffResult.firstDerivative.forward1,
                      accent: 'border-slate-700 bg-slate-900/60 text-slate-200'
                    },
                    {
                      title: 'Hacia Atrás O(h)',
                      data: diffResult.firstDerivative.backward1,
                      accent: 'border-slate-700 bg-slate-900/60 text-slate-200'
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${item.accent}`}
                    >
                      <div>
                        <div className="text-xs font-semibold mb-1 text-slate-300">{item.title}</div>
                        <div className="my-2 py-1 text-xs">
                          <LatexRenderer expression={item.data.formula} />
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-700/50 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400 font-mono">{item.data.order}</span>
                        <span className="text-base font-bold font-mono text-emerald-300">
                          {formatNum(item.data.value, precision)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel de Segunda Derivada f''(x0) */}
              <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700/60 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <span>Segunda Derivada f''(x₀)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Segunda Derivada Centrada O(h²)',
                      data: diffResult.secondDerivative.central,
                      accent: 'border-indigo-500/70 bg-indigo-950/20'
                    },
                    {
                      title: 'Segunda Derivada Adelante O(h)',
                      data: diffResult.secondDerivative.forward,
                      accent: 'border-slate-700 bg-slate-900/60'
                    },
                    {
                      title: 'Segunda Derivada Atrás O(h)',
                      data: diffResult.secondDerivative.backward,
                      accent: 'border-slate-700 bg-slate-900/60'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border ${item.accent}`}>
                      <div className="text-xs font-semibold text-slate-300 mb-1">{item.title}</div>
                      <div className="my-2 text-xs">
                        <LatexRenderer expression={item.data.formula} />
                      </div>
                      <div className="pt-2 border-t border-slate-700/50 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400 font-mono">{item.data.order}</span>
                        <span className="text-base font-bold font-mono text-indigo-300">
                          {formatNum(item.data.value, precision)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfica de Tangente Local */}
              <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
                <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span>Visualización Geométrica:</span>
                  <span className="text-xs font-mono text-teal-400">Curva y Recta Tangente Local</span>
                </h4>
                <InteractivePlot
                  data={diffPlotData}
                  layout={{
                    title: {
                      text: `Aproximación de f'(x₀) en x₀ = ${diffResult.x0}`,
                      font: { color: '#e2e8f0', size: 14 }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
