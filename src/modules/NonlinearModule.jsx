import React, { useState, useMemo } from 'react';
import { Play, Sparkles, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { compileFunction1D, formatNum } from '../engines/mathParser';
import { bisection, regulaFalsi, newtonRaphson, secant } from '../engines/nonlinearEngine';
import LatexRenderer from '../components/LatexRenderer';
import InteractivePlot from '../components/InteractivePlot';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';

export default function NonlinearModule({ precision = 6 }) {
  const [method, setMethod] = useState('bisection');
  const [expression, setExpression] = useState('x^3 - 2*x - 5');
  const [paramA, setParamA] = useState('1');
  const [paramB, setParamB] = useState('3');
  const [paramX0, setParamX0] = useState('2');
  const [paramX1, setParamX1] = useState('3');
  const [tolerance, setTolerance] = useState('0.0001');
  const [maxIter, setMaxIter] = useState('100');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Vista previa KaTeX de la función en tiempo real
  const latexPreview = useMemo(() => {
    try {
      const { toTex } = compileFunction1D(expression);
      return `f(x) = ${toTex()}`;
    } catch {
      return `f(x) = \\text{${expression || '...'}}`;
    }
  }, [expression]);

  // Cargar presets representativos
  const handlePreset = (fn, a, b, x0, x1) => {
    setExpression(fn);
    setParamA(a);
    setParamB(b);
    setParamX0(x0);
    setParamX1(x1);
    setError(null);
    setResult(null);
  };

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    setTimeout(() => {
      try {
        const tol = parseFloat(tolerance) || 1e-6;
        const maxI = Math.min(100, Math.max(1, parseInt(maxIter, 10) || 100));

        let res;
        if (method === 'bisection') {
          const a = parseFloat(paramA);
          const b = parseFloat(paramB);
          if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Los extremos a y b deben ser números válidos.');
          if (a >= b) throw new Error('El extremo a debe ser menor que el extremo b.');
          res = bisection(expression, a, b, tol, maxI);
        } else if (method === 'regulaFalsi') {
          const a = parseFloat(paramA);
          const b = parseFloat(paramB);
          if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('Los extremos a y b deben ser números válidos.');
          if (a >= b) throw new Error('El extremo a debe ser menor que b.');
          res = regulaFalsi(expression, a, b, tol, maxI);
        } else if (method === 'newton') {
          const x0 = parseFloat(paramX0);
          if (Number.isNaN(x0)) throw new Error('El punto inicial x0 debe ser un número válido.');
          res = newtonRaphson(expression, x0, tol, maxI);
        } else if (method === 'secant') {
          const x0 = parseFloat(paramX0);
          const x1 = parseFloat(paramX1);
          if (Number.isNaN(x0) || Number.isNaN(x1)) throw new Error('Los puntos x0 y x1 deben ser números válidos.');
          if (x0 === x1) throw new Error('Los puntos iniciales x0 y x1 deben ser distintos.');
          res = secant(expression, x0, x1, tol, maxI);
        }

        setResult(res);
      } catch (err) {
        setError(err.message || 'Error desconocido durante el cálculo.');
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  // Preparar datos para el gráfico de Plotly
  const plotData = useMemo(() => {
    if (!result) return [];

    try {
      const { evaluate } = compileFunction1D(expression);

      // Determinar rango de x para el gráfico
      const xValsIter = result.iterations.map((it) => it.xi ?? it.x1 ?? it.next_xi ?? result.root);
      const minXVal = Math.min(...xValsIter, parseFloat(paramA) || 0, parseFloat(paramB) || 0, result.root);
      const maxXVal = Math.max(...xValsIter, parseFloat(paramA) || 0, parseFloat(paramB) || 0, result.root);
      const margin = Math.max(1.5, (maxXVal - minXVal) * 0.4);

      const xMin = minXVal - margin;
      const xMax = maxXVal + margin;

      const curveX = [];
      const curveY = [];
      const numPoints = 250;
      const step = (xMax - xMin) / numPoints;

      for (let i = 0; i <= numPoints; i++) {
        const x = xMin + i * step;
        try {
          const y = evaluate(x);
          if (Number.isFinite(y) && Math.abs(y) < 1e5) {
            curveX.push(x);
            curveY.push(y);
          } else {
            curveX.push(x);
            curveY.push(null);
          }
        } catch {
          curveX.push(x);
          curveY.push(null);
        }
      }

      // Traza 1: Curva de f(x)
      const traces = [
        {
          x: curveX,
          y: curveY,
          type: 'scatter',
          mode: 'lines',
          name: 'f(x)',
          line: { color: '#38bdf8', width: 2.5 }
        },
        // Traza 2: Eje horizontal y = 0
        {
          x: [xMin, xMax],
          y: [0, 0],
          type: 'scatter',
          mode: 'lines',
          name: 'y = 0',
          line: { color: '#64748b', width: 1.5, dash: 'dash' }
        }
      ];

      // Traza 3: Puntos de iteración
      if (result.iterations.length > 0) {
        const iterX = result.iterations.map((it) => it.xi ?? it.next_xi);
        const iterY = result.iterations.map((it) => it.f_xi ?? 0);

        traces.push({
          x: iterX,
          y: iterY,
          type: 'scatter',
          mode: 'markers+lines',
          name: 'Iteraciones',
          line: { color: '#f59e0b', width: 1.5, dash: 'dot' },
          marker: {
            color: '#fbbf24',
            size: 6,
            symbol: 'circle'
          }
        });
      }

      // Traza 4: Raíz final destacada
      traces.push({
        x: [result.root],
        y: [evaluate(result.root)],
        type: 'scatter',
        mode: 'markers',
        name: `Raíz: ${result.root.toFixed(precision)}`,
        marker: {
          color: '#10b981',
          size: 14,
          symbol: 'star',
          line: { color: '#ffffff', width: 2 }
        }
      });

      return traces;
    } catch {
      return [];
    }
  }, [result, expression, paramA, paramB, precision]);

  // Columnas para IterationTable
  const tableColumns = useMemo(() => {
    if (method === 'bisection' || method === 'regulaFalsi') {
      return [
        { key: 'k', label: 'k (Iter)' },
        { key: 'a', label: 'a' },
        { key: 'b', label: 'b' },
        { key: 'xi', label: 'x_i (Aprox)' },
        { key: 'f_xi', label: 'f(x_i)' },
        { key: 'ea', label: '|εa|' },
        {
          key: 'ea_percent',
          label: '|εa| %',
          render: (val) => (val !== null ? `${formatNum(val, 4)}%` : '—')
        }
      ];
    } else if (method === 'newton') {
      return [
        { key: 'k', label: 'k' },
        { key: 'xi', label: 'x_k' },
        { key: 'f_xi', label: 'f(x_k)' },
        { key: 'df_xi', label: "f'(x_k)" },
        { key: 'next_xi', label: 'x_{k+1}' },
        { key: 'ea', label: '|x_{k+1} - x_k|' },
        {
          key: 'ea_percent',
          label: '|εa| %',
          render: (val) => (val !== null ? `${formatNum(val, 4)}%` : '—')
        }
      ];
    } else {
      // Secante
      return [
        { key: 'k', label: 'k' },
        { key: 'x0', label: 'x_{k-1}' },
        { key: 'x1', label: 'x_k' },
        { key: 'xi', label: 'x_{k+1}' },
        { key: 'f_xi', label: 'f(x_{k+1})' },
        { key: 'ea', label: '|εa|' },
        {
          key: 'ea_percent',
          label: '|εa| %',
          render: (val) => (val !== null ? `${formatNum(val, 4)}%` : '—')
        }
      ];
    }
  }, [method]);

  return (
    <div className="space-y-6">
      {/* Selector de Método */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
        {[
          { id: 'bisection', label: 'Bisección' },
          { id: 'regulaFalsi', label: 'Regula Falsi' },
          { id: 'newton', label: 'Newton-Raphson' },
          { id: 'secant', label: 'Secante' }
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

      {/* Formulario de Entrada */}
      <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm">
        <form onSubmit={handleCalculate} className="space-y-5">
          {/* Función f(x) y KaTeX preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="nonlinear-function-input" className="text-xs sm:text-sm font-semibold text-slate-200">
                Función f(x)
              </label>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Presets:</span>
                <button
                  type="button"
                  onClick={() => handlePreset('x^3 - 2*x - 5', '1', '3', '2', '3')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  x³-2x-5
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('cos(x) - x', '0', '1', '0.5', '1')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  cos(x)-x
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('e^(-x) - x', '0', '1', '0', '1')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  e⁻ˣ-x
                </button>
              </div>
            </div>

            <input
              id="nonlinear-function-input"
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Ej: x^3 - 2*x - 5"
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              required
            />

            <div className="mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans">Render LaTeX:</span>
              <LatexRenderer expression={latexPreview} />
            </div>
          </div>

          {/* Parámetros específicos por método */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(method === 'bisection' || method === 'regulaFalsi') && (
              <>
                <div>
                  <label htmlFor="bisection-param-a" className="block text-xs font-semibold text-slate-300 mb-1">
                    Límite inferior (a)
                  </label>
                  <input
                    id="bisection-param-a"
                    type="number"
                    step="any"
                    value={paramA}
                    onChange={(e) => setParamA(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bisection-param-b" className="block text-xs font-semibold text-slate-300 mb-1">
                    Límite superior (b)
                  </label>
                  <input
                    id="bisection-param-b"
                    type="number"
                    step="any"
                    value={paramB}
                    onChange={(e) => setParamB(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>
              </>
            )}

            {method === 'newton' && (
              <div>
                <label htmlFor="newton-param-x0" className="block text-xs font-semibold text-slate-300 mb-1">
                  Punto inicial (x₀)
                </label>
                <input
                  id="newton-param-x0"
                  type="number"
                  step="any"
                  value={paramX0}
                  onChange={(e) => setParamX0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                  required
                />
              </div>
            )}

            {method === 'secant' && (
              <>
                <div>
                  <label htmlFor="secant-param-x0" className="block text-xs font-semibold text-slate-300 mb-1">
                    Punto inicial 0 (x₀)
                  </label>
                  <input
                    id="secant-param-x0"
                    type="number"
                    step="any"
                    value={paramX0}
                    onChange={(e) => setParamX0(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="secant-param-x1" className="block text-xs font-semibold text-slate-300 mb-1">
                    Punto inicial 1 (x₁)
                  </label>
                  <input
                    id="secant-param-x1"
                    type="number"
                    step="any"
                    value={paramX1}
                    onChange={(e) => setParamX1(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="nonlinear-tolerance-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Tolerancia de error (|εa|)
              </label>
              <input
                id="nonlinear-tolerance-input"
                type="number"
                step="any"
                value={tolerance}
                onChange={(e) => setTolerance(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="nonlinear-max-iter-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Iteraciones Máx (Tope: 100)
              </label>
              <input
                id="nonlinear-max-iter-input"
                type="number"
                min="1"
                max="100"
                value={maxIter}
                onChange={(e) => setMaxIter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-slate-950" />
            )}
            <span>{loading ? 'Calculando...' : 'Calcular Raíz'}</span>
          </button>
        </form>
      </div>

      {/* Manejo visible de Errores y Advertencias */}
      {error && (
        <AlertBanner
          type="error"
          title="Error en la Búsqueda de Raíces"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Resumen del Resultado */}
      {result && (
        <div className="space-y-6">
          <div
            className={`p-5 rounded-2xl border backdrop-blur-sm ${
              result.converged
                ? 'bg-emerald-950/20 border-emerald-600/50'
                : 'bg-amber-950/30 border-amber-600/60'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  {result.method} • {result.converged ? 'Convergencia Exitosa' : 'Aproximación Parcial'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1 flex items-baseline gap-2">
                  <span>x ≈ {formatNum(result.root, precision)}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{result.message}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <div className="text-xs text-slate-400">Total Iteraciones</div>
                  <div className="text-lg font-bold font-mono text-teal-300">
                    {result.iterations.length}
                  </div>
                </div>
                <div className="text-right px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-700/60">
                  <div className="text-xs text-slate-400">f(x_raíz)</div>
                  <div className="text-lg font-bold font-mono text-emerald-400">
                    {formatNum(
                      result.iterations[result.iterations.length - 1]?.f_xi ?? 0,
                      precision
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico Interactivo Plotly */}
          <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span>Gráfica de Convergencia 2D:</span>
              <span className="text-xs font-mono text-teal-400">f(x) y Puntos de Iteración</span>
            </h4>
            <InteractivePlot
              data={plotData}
              layout={{
                title: {
                  text: `Convergencia por ${result.method}`,
                  font: { color: '#e2e8f0', size: 14 }
                }
              }}
            />
          </div>

          {/* Tabla de Iteraciones */}
          <IterationTable
            title={`Iteraciones de ${result.method}`}
            columns={tableColumns}
            data={result.iterations}
            precision={precision}
            filename={`raices_${method}`}
          />
        </div>
      )}
    </div>
  );
}
