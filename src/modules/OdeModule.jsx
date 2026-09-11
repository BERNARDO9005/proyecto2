import React, { useState, useMemo } from 'react';
import { Play, Sparkles, GitCompare, Activity } from 'lucide-react';
import { compileFunction2D, formatNum } from '../engines/mathParser';
import { euler, heun, rk4, solveAllOdeMethods } from '../engines/odeEngine';
import LatexRenderer from '../components/LatexRenderer';
import InteractivePlot from '../components/InteractivePlot';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';

export default function OdeModule({ precision = 6 }) {
  const [method, setMethod] = useState('all'); // 'euler' | 'heun' | 'rk4' | 'all'
  const [expression, setExpression] = useState('x + y');
  const [paramX0, setParamX0] = useState('0');
  const [paramY0, setParamY0] = useState('1');
  const [paramXf, setParamXf] = useState('1');
  const [paramH, setParamH] = useState('0.1');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Vista previa LaTeX
  const latexPreview = useMemo(() => {
    try {
      const { toTex } = compileFunction2D(expression);
      return `\\frac{dy}{dx} = ${toTex()}`;
    } catch {
      return `\\frac{dy}{dx} = \\text{${expression || '...'}}`;
    }
  }, [expression]);

  // Presets
  const handlePreset = (fn, x0, y0, xf, h) => {
    setExpression(fn);
    setParamX0(x0);
    setParamY0(y0);
    setParamXf(xf);
    setParamH(h);
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
        const x0 = parseFloat(paramX0);
        const y0 = parseFloat(paramY0);
        const xf = parseFloat(paramXf);
        const h = parseFloat(paramH);

        let res;
        if (method === 'euler') {
          res = { single: euler(expression, x0, y0, xf, h), isMulti: false };
        } else if (method === 'heun') {
          res = { single: heun(expression, x0, y0, xf, h), isMulti: false };
        } else if (method === 'rk4') {
          res = { single: rk4(expression, x0, y0, xf, h), isMulti: false };
        } else {
          // Comparación simultánea de los 3 métodos
          const multi = solveAllOdeMethods(expression, x0, y0, xf, h);
          res = { multi, isMulti: true };
        }

        setResult(res);
      } catch (err) {
        setError(err.message || 'Error resolviendo la ecuación diferencial.');
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  // Gráfico Plotly
  const plotData = useMemo(() => {
    if (!result) return [];

    if (result.isMulti) {
      const { euler: eul, heun: heu, rk4: rk } = result.multi;
      return [
        {
          x: eul.trajectory.map((p) => p.x),
          y: eul.trajectory.map((p) => p.y),
          type: 'scatter',
          mode: 'lines+markers',
          name: `Euler: y(${paramXf}) ≈ ${formatNum(eul.finalY, precision)}`,
          line: { color: '#f59e0b', width: 2, dash: 'dot' },
          marker: { color: '#f59e0b', size: 5 }
        },
        {
          x: heu.trajectory.map((p) => p.x),
          y: heu.trajectory.map((p) => p.y),
          type: 'scatter',
          mode: 'lines+markers',
          name: `Heun: y(${paramXf}) ≈ ${formatNum(heu.finalY, precision)}`,
          line: { color: '#06b6d4', width: 2, dash: 'dash' },
          marker: { color: '#06b6d4', size: 6 }
        },
        {
          x: rk.trajectory.map((p) => p.x),
          y: rk.trajectory.map((p) => p.y),
          type: 'scatter',
          mode: 'lines+markers',
          name: `RK4: y(${paramXf}) ≈ ${formatNum(rk.finalY, precision)}`,
          line: { color: '#10b981', width: 2.5 },
          marker: { color: '#10b981', size: 7, symbol: 'diamond' }
        }
      ];
    } else {
      const single = result.single;
      return [
        {
          x: single.trajectory.map((p) => p.x),
          y: single.trajectory.map((p) => p.y),
          type: 'scatter',
          mode: 'lines+markers',
          name: `${single.method}`,
          line: { color: '#14b8a6', width: 2.5 },
          marker: { color: '#2dd4bf', size: 6 }
        }
      ];
    }
  }, [result, paramXf, precision]);

  // Columnas para la tabla
  const tableColumns = useMemo(() => {
    if (!result) return [];
    if (result.isMulti) {
      const eul = result.multi.euler.trajectory;
      const heu = result.multi.heun.trajectory;
      const rk = result.multi.rk4.trajectory;

      const combinedData = eul.map((pt, idx) => ({
        i: pt.i,
        x: pt.x,
        y_euler: pt.y,
        y_heun: heu[idx]?.y ?? 0,
        y_rk4: rk[idx]?.y ?? 0,
        diff: Math.abs((rk[idx]?.y ?? 0) - pt.y)
      }));

      return {
        columns: [
          { key: 'i', label: 'Paso (i)' },
          { key: 'x', label: 'x_i' },
          { key: 'y_euler', label: 'y (Euler)' },
          { key: 'y_heun', label: 'y (Heun)' },
          { key: 'y_rk4', label: 'y (RK4)' },
          { key: 'diff', label: '|RK4 - Euler|' }
        ],
        data: combinedData
      };
    } else {
      return {
        columns: [
          { key: 'i', label: 'i' },
          { key: 'x', label: 'x_i' },
          { key: 'y', label: 'y_i' },
          { key: 'slope', label: 'f(x_i, y_i)' }
        ],
        data: result.single.trajectory
      };
    }
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Selector de Método */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60">
        {[
          { id: 'all', label: 'Comparar Todos (3 en 1)' },
          { id: 'rk4', label: 'Runge-Kutta 4°' },
          { id: 'heun', label: 'Euler Modificado (Heun)' },
          { id: 'euler', label: 'Euler Clásico' }
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
      <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="ode-function-input" className="text-xs sm:text-sm font-semibold text-slate-200">
              Ecuación diferencial: dy/dx = f(x, y)
            </label>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Presets:</span>
              <button
                type="button"
                onClick={() => handlePreset('x + y', '0', '1', '1', '0.1')}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
              >
                x + y
              </button>
              <button
                type="button"
                onClick={() => handlePreset('x - y + 1', '0', '1', '2', '0.2')}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
              >
                x - y + 1
              </button>
              <button
                type="button"
                onClick={() => handlePreset('y - x^2 + 1', '0', '0.5', '2', '0.1')}
                className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
              >
                y - x² + 1
              </button>
            </div>
          </div>

          <input
            id="ode-function-input"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Ej: x + y"
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
            required
          />

          <div className="mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2">
            <span className="text-xs text-slate-400 font-sans">Render LaTeX:</span>
            <LatexRenderer expression={latexPreview} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="ode-param-x0" className="block text-xs font-semibold text-slate-300 mb-1">
              x Inicial (x₀)
            </label>
            <input
              id="ode-param-x0"
              type="number"
              step="any"
              value={paramX0}
              onChange={(e) => setParamX0(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="ode-param-y0" className="block text-xs font-semibold text-slate-300 mb-1">
              y Inicial y(x₀)
            </label>
            <input
              id="ode-param-y0"
              type="number"
              step="any"
              value={paramY0}
              onChange={(e) => setParamY0(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="ode-param-xf" className="block text-xs font-semibold text-slate-300 mb-1">
              x Final (x_f)
            </label>
            <input
              id="ode-param-xf"
              type="number"
              step="any"
              value={paramXf}
              onChange={(e) => setParamXf(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="ode-param-h" className="block text-xs font-semibold text-slate-300 mb-1">
              Paso (h &gt; 0)
            </label>
            <input
              id="ode-param-h"
              type="number"
              step="any"
              value={paramH}
              onChange={(e) => setParamH(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"
              required
            />
          </div>
        </div>

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
          <span>{loading ? 'Calculando trayectoria...' : 'Simular Trayectoria'}</span>
        </button>
      </div>

      {error && (
        <AlertBanner
          type="error"
          title="Error en EDO"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {result && (
        <div className="space-y-6">
          {/* Tarjetas de Solución Final */}
          {result.isMulti ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border bg-slate-900/80 border-amber-500/40">
                <div className="text-xs text-amber-400 font-semibold mb-1">Euler Clásico</div>
                <div className="text-xl font-bold font-mono text-slate-100">
                  y({paramXf}) ≈ {formatNum(result.multi.euler.finalY, precision)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {result.multi.euler.numSteps} pasos
                </div>
              </div>

              <div className="p-4 rounded-2xl border bg-slate-900/80 border-cyan-500/40">
                <div className="text-xs text-cyan-400 font-semibold mb-1">Euler Modificado (Heun)</div>
                <div className="text-xl font-bold font-mono text-slate-100">
                  y({paramXf}) ≈ {formatNum(result.multi.heun.finalY, precision)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {result.multi.heun.numSteps} pasos
                </div>
              </div>

              <div className="p-4 rounded-2xl border bg-emerald-950/30 border-emerald-500/50">
                <div className="text-xs text-emerald-400 font-semibold mb-1">
                  Runge-Kutta 4° Orden (RK4)
                </div>
                <div className="text-xl font-bold font-mono text-emerald-200">
                  y({paramXf}) ≈ {formatNum(result.multi.rk4.finalY, precision)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {result.multi.rk4.numSteps} pasos
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                  Solución Final • {result.single.method}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1">
                  y({paramXf}) ≈ {formatNum(result.single.finalY, precision)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Condición inicial: y({paramX0}) = {paramY0} | Paso h = {paramH}
                </div>
              </div>
              <div className="px-4 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right">
                <div className="text-xs text-slate-400">Número de pasos</div>
                <div className="text-lg font-bold font-mono text-teal-300">
                  {result.single.numSteps}
                </div>
              </div>
            </div>
          )}

          {/* Gráfico de Trayectoria Plotly */}
          <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
            <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span>Trayectoria de la Solución y(x):</span>
              <span className="text-xs font-mono text-teal-400">
                {result.isMulti ? 'Comparativa Euler vs Heun vs RK4' : result.single.method}
              </span>
            </h4>
            <InteractivePlot
              data={plotData}
              layout={{
                title: {
                  text: `Solución numérica dy/dx = ${expression}`,
                  font: { color: '#e2e8f0', size: 14 }
                },
                xaxis: { title: { text: 'x' } },
                yaxis: { title: { text: 'y(x)' } }
              }}
            />
          </div>

          {/* Tabla de Trayectoria */}
          <IterationTable
            title="Tabla de Valores de la Trayectoria"
            columns={tableColumns.columns}
            data={tableColumns.data}
            precision={precision}
            filename="trayectoria_edo"
          />
        </div>
      )}
    </div>
  );
}
