import React, { useState, useMemo } from 'react';
import {
  Play,
  Sparkles,
  GitCompare,
  Activity,
  Maximize2,
  Workflow,
  Radio,
  Sliders
} from 'lucide-react';
import { compileFunction2D, formatNum } from '../engines/mathParser';
import {
  euler,
  heun,
  rk4,
  solveAllOdeMethods,
  rk4System,
  rk4SecondOrder
} from '../engines/odeEngine';
import LatexRenderer from '../components/LatexRenderer';
import InteractivePlot from '../components/InteractivePlot';
import IterationTable from '../components/IterationTable';
import AlertBanner from '../components/AlertBanner';

export default function OdeModule({ precision = 6 }) {
  // Tipo de problema: 'single' (1er orden) | 'system' (sistema acoplado) | 'secondOrder' (2do orden)
  const [problemType, setProblemType] = useState('single');

  // Modo para 1er orden: 'all' | 'rk4' | 'heun' | 'euler'
  const [method, setMethod] = useState('all');

  // Estados para 1er orden simple
  const [expression, setExpression] = useState('x + y');
  const [paramX0, setParamX0] = useState('0');
  const [paramY0, setParamY0] = useState('1');
  const [paramXf, setParamXf] = useState('1');
  const [paramH, setParamH] = useState('0.1');

  // Estados para Sistema de EDOs: dy1/dt = f1(t, y1, y2), dy2/dt = f2(t, y1, y2)
  const [sysF1, setSysF1] = useState('1.2*y1 - 0.6*y1*y2');
  const [sysF2, setSysF2] = useState('-0.8*y2 + 0.3*y1*y2');
  const [sysT0, setSysT0] = useState('0');
  const [sysY1_0, setSysY1_0] = useState('2');
  const [sysY2_0, setSysY2_0] = useState('1');
  const [sysTf, setSysTf] = useState('15');
  const [sysH, setSysH] = useState('0.05');

  // Estados para EDO 2° Orden: y'' = f(t, y, y')
  const [secondExpr, setSecondExpr] = useState('-0.4*y2 - 9*y1');
  const [secT0, setSecT0] = useState('0');
  const [secY0, setSecY0] = useState('1');
  const [secV0, setSecV0] = useState('0');
  const [secTf, setSecTf] = useState('8');
  const [secH, setSecH] = useState('0.02');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Presets para 1er orden
  const handleSinglePreset = (fn, x0, y0, xf, h) => {
    setExpression(fn);
    setParamX0(x0);
    setParamY0(y0);
    setParamXf(xf);
    setParamH(h);
    setError(null);
    setResult(null);
  };

  // Presets para Sistemas
  const handleSystemPreset = (type) => {
    setError(null);
    setResult(null);
    if (type === 'lotka') {
      setSysF1('1.2*y1 - 0.6*y1*y2');
      setSysF2('-0.8*y2 + 0.3*y1*y2');
      setSysT0('0');
      setSysY1_0('2');
      setSysY2_0('1');
      setSysTf('15');
      setSysH('0.05');
    } else if (type === 'oscillator') {
      setSysF1('y2');
      setSysF2('-y1');
      setSysT0('0');
      setSysY1_0('1');
      setSysY2_0('0');
      setSysTf('10');
      setSysH('0.05');
    }
  };

  // Presets para 2° Orden
  const handleSecondOrderPreset = (type) => {
    setError(null);
    setResult(null);
    if (type === 'damped') {
      // y'' + 0.4y' + 9y = 0 => y'' = -0.4y' - 9y
      setSecondExpr('-0.4*y2 - 9*y1');
      setSecT0('0');
      setSecY0('1');
      setSecV0('0');
      setSecTf('8');
      setSecH('0.02');
    } else if (type === 'pendulum') {
      // Péndulo simple no lineal: y'' = -sin(y)
      setSecondExpr('-sin(y1)');
      setSecT0('0');
      setSecY0('2.5');
      setSecV0('0');
      setSecTf('12');
      setSecH('0.05');
    } else if (type === 'gravity') {
      // Caída con fricción: y'' = -9.81 - 0.2*y'
      setSecondExpr('-9.81 - 0.2*y2');
      setSecT0('0');
      setSecY0('50');
      setSecV0('0');
      setSecTf('4');
      setSecH('0.05');
    }
  };

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    setTimeout(() => {
      try {
        if (problemType === 'single') {
          const x0 = parseFloat(paramX0);
          const y0 = parseFloat(paramY0);
          const xf = parseFloat(paramXf);
          const h = parseFloat(paramH);

          let res;
          if (method === 'euler') {
            res = { type: 'single', single: euler(expression, x0, y0, xf, h), isMulti: false };
          } else if (method === 'heun') {
            res = { type: 'single', single: heun(expression, x0, y0, xf, h), isMulti: false };
          } else if (method === 'rk4') {
            res = { type: 'single', single: rk4(expression, x0, y0, xf, h), isMulti: false };
          } else {
            const multi = solveAllOdeMethods(expression, x0, y0, xf, h);
            res = { type: 'single', multi, isMulti: true };
          }
          setResult(res);
        } else if (problemType === 'system') {
          const t0 = parseFloat(sysT0);
          const y1_0 = parseFloat(sysY1_0);
          const y2_0 = parseFloat(sysY2_0);
          const tf = parseFloat(sysTf);
          const h = parseFloat(sysH);

          const sysRes = rk4System(sysF1, sysF2, t0, y1_0, y2_0, tf, h, {
            var1Label: 'y_1 (Presa / Var 1)',
            var2Label: 'y_2 (Depredador / Var 2)'
          });

          setResult({ type: 'system', system: sysRes });
        } else if (problemType === 'secondOrder') {
          const t0 = parseFloat(secT0);
          const y0 = parseFloat(secY0);
          const v0 = parseFloat(secV0);
          const tf = parseFloat(secTf);
          const h = parseFloat(secH);

          const secRes = rk4SecondOrder(secondExpr, t0, y0, v0, tf, h);
          setResult({ type: 'secondOrder', secondOrder: secRes });
        }
      } catch (err) {
        setError(err.message || 'Error resolviendo la ecuación diferencial.');
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  // Gráficos Plotly para 1er Orden
  const singlePlotData = useMemo(() => {
    if (!result || result.type !== 'single') return [];

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

  // Gráficos Plotly para Sistemas de EDOs / 2do Orden
  const systemPlots = useMemo(() => {
    if (!result || (result.type !== 'system' && result.type !== 'secondOrder')) return null;

    const dataObj = result.type === 'system' ? result.system : result.secondOrder;
    const traj = dataObj.trajectory;

    const label1 = result.type === 'secondOrder' ? 'Posición y(t)' : 'y₁(t)';
    const label2 = result.type === 'secondOrder' ? "Velocidad y'(t)" : 'y₂(t)';

    // 1. Gráfico temporal t vs (y1, y2)
    const timePlot = [
      {
        x: traj.map((p) => p.t),
        y: traj.map((p) => p.y1),
        type: 'scatter',
        mode: 'lines',
        name: label1,
        line: { color: '#14b8a6', width: 2.5 }
      },
      {
        x: traj.map((p) => p.t),
        y: traj.map((p) => p.y2),
        type: 'scatter',
        mode: 'lines',
        name: label2,
        line: { color: '#f59e0b', width: 2.5, dash: 'dash' }
      }
    ];

    // 2. Retrato de Fase y1 vs y2
    const phasePlot = [
      {
        x: traj.map((p) => p.y1),
        y: traj.map((p) => p.y2),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Órbita de Fase',
        line: { color: '#a855f7', width: 2 },
        marker: {
          color: traj.map((_, idx) => idx),
          colorscale: 'Viridis',
          size: 4
        }
      },
      {
        x: [traj[0].y1],
        y: [traj[0].y2],
        type: 'scatter',
        mode: 'markers+text',
        name: 'Condición Inicial',
        text: ['Inicio'],
        textposition: 'top center',
        marker: { color: '#38bdf8', size: 10, symbol: 'star' }
      }
    ];

    return { timePlot, phasePlot, label1, label2, dataObj };
  }, [result]);

  // Columnas para la tabla
  const tableData = useMemo(() => {
    if (!result) return null;

    if (result.type === 'single') {
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
          data: combinedData,
          filename: 'edo_comparativa'
        };
      } else {
        return {
          columns: [
            { key: 'i', label: 'i' },
            { key: 'x', label: 'x_i' },
            { key: 'y', label: 'y_i' },
            { key: 'k1', label: 'Pendiente k₁' }
          ],
          data: result.single.trajectory,
          filename: 'edo_individual'
        };
      }
    } else {
      // Sistema o 2do orden
      const dataObj = result.type === 'system' ? result.system : result.secondOrder;
      const isSec = result.type === 'secondOrder';

      return {
        columns: [
          { key: 'i', label: 'Paso (i)' },
          { key: 't', label: 'Tiempo (t)' },
          { key: 'y1', label: isSec ? 'y(t) (Posición)' : 'y₁' },
          { key: 'y2', label: isSec ? "y'(t) (Velocidad)" : 'y₂' }
        ],
        data: dataObj.trajectory,
        filename: isSec ? 'edo_segundo_orden' : 'sistema_edos'
      };
    }
  }, [result]);

  return (
    <div className="space-y-6">
      {/* Selector Principal de Categoría de EDO */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/70 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
          {[
            { id: 'single', label: 'EDO 1er Orden dy/dx = f(x, y)' },
            { id: 'system', label: 'Sistema Acoplado (2 EDOs RK4)' },
            { id: 'secondOrder', label: "EDO 2° Orden y'' = f(t, y, y')" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setProblemType(cat.id);
                setError(null);
                setResult(null);
              }}
              className={`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${
                problemType === cat.id
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Método para 1er Orden */}
      {problemType === 'single' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
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
              className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                method === m.id
                  ? 'bg-slate-800 text-teal-300 font-bold border border-teal-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Formulario de Entrada */}
      <div className="bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5">
        {/* Caso 1: EDO 1er Orden */}
        {problemType === 'single' && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="ode-function-input"
                  className="text-xs sm:text-sm font-semibold text-slate-200"
                >
                  Ecuación diferencial: dy/dx = f(x, y)
                </label>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Presets:</span>
                  <button
                    type="button"
                    onClick={() => handleSinglePreset('x + y', '0', '1', '1', '0.1')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    x + y
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSinglePreset('x - y + 1', '0', '1', '2', '0.2')}
                    className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                  >
                    x - y + 1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSinglePreset('y - x^2 + 1', '0', '0.5', '2', '0.1')}
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
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="ode-param-x0"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
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
                <label
                  htmlFor="ode-param-y0"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
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
                <label
                  htmlFor="ode-param-xf"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
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
                <label
                  htmlFor="ode-param-h"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
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
          </>
        )}

        {/* Caso 2: Sistema Acoplado */}
        {problemType === 'system' && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Sistema de Ecuaciones Acopladas:
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Modelos:</span>
                <button
                  type="button"
                  onClick={() => handleSystemPreset('lotka')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  Lotka-Volterra
                </button>
                <button
                  type="button"
                  onClick={() => handleSystemPreset('oscillator')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  Oscilador
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-teal-300 mb-1">
                  dy₁/dt = f₁(t, y₁, y₂)
                </label>
                <input
                  type="text"
                  value={sysF1}
                  onChange={(e) => setSysF1(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
                  placeholder="Ej: 1.2*y1 - 0.6*y1*y2"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1">
                  dy₂/dt = f₂(t, y₁, y₂)
                </label>
                <input
                  type="text"
                  value={sysF2}
                  onChange={(e) => setSysF2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
                  placeholder="Ej: -0.8*y2 + 0.3*y1*y2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">t Inicial (t₀)</label>
                <input
                  type="number"
                  step="any"
                  value={sysT0}
                  onChange={(e) => setSysT0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-300 mb-1">y₁(t₀)</label>
                <input
                  type="number"
                  step="any"
                  value={sysY1_0}
                  onChange={(e) => setSysY1_0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1">y₂(t₀)</label>
                <input
                  type="number"
                  step="any"
                  value={sysY2_0}
                  onChange={(e) => setSysY2_0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">t Final (t_f)</label>
                <input
                  type="number"
                  step="any"
                  value={sysTf}
                  onChange={(e) => setSysTf(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Paso (h &gt; 0)</label>
                <input
                  type="number"
                  step="any"
                  value={sysH}
                  onChange={(e) => setSysH(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

        {/* Caso 3: EDO de 2° Orden */}
        {problemType === 'secondOrder' && (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Ecuación Diferencial de Segundo Orden: y'' = f(t, y, y')
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Casos Físicos:</span>
                <button
                  type="button"
                  onClick={() => handleSecondOrderPreset('damped')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  Amortiguado
                </button>
                <button
                  type="button"
                  onClick={() => handleSecondOrderPreset('pendulum')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  Péndulo No Lineal
                </button>
                <button
                  type="button"
                  onClick={() => handleSecondOrderPreset('gravity')}
                  className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono"
                >
                  Caída Libre
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-teal-300 mb-1">
                Aceleración f(t, y, y') [alias: t, y1 para y, y2 para y']:
              </label>
              <input
                type="text"
                value={secondExpr}
                onChange={(e) => setSecondExpr(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none"
                placeholder="Ej: -0.4*y2 - 9*y1"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">t₀</label>
                <input
                  type="number"
                  step="any"
                  value={secT0}
                  onChange={(e) => setSecT0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-teal-300 mb-1">y(t₀) (Posición)</label>
                <input
                  type="number"
                  step="any"
                  value={secY0}
                  onChange={(e) => setSecY0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1">y'(t₀) (Velocidad)</label>
                <input
                  type="number"
                  step="any"
                  value={secV0}
                  onChange={(e) => setSecV0(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">t Final (t_f)</label>
                <input
                  type="number"
                  step="any"
                  value={secTf}
                  onChange={(e) => setSecTf(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Paso (h &gt; 0)</label>
                <input
                  type="number"
                  step="any"
                  value={secH}
                  onChange={(e) => setSecH(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"
                />
              </div>
            </div>
          </>
        )}

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

      {/* Resultados */}
      {result && (
        <div className="space-y-6">
          {/* Tarjetas de Solución para 1er Orden */}
          {result.type === 'single' && (
            <>
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

              {/* Gráfico 1er Orden */}
              <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
                <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span>Trayectoria de la Solución y(x):</span>
                  <span className="text-xs font-mono text-teal-400">
                    {result.isMulti ? 'Comparativa Euler vs Heun vs RK4' : result.single.method}
                  </span>
                </h4>
                <InteractivePlot
                  data={singlePlotData}
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
            </>
          )}

          {/* Tarjetas y Gráficos para Sistemas y 2do Orden */}
          {(result.type === 'system' || result.type === 'secondOrder') && systemPlots && (
            <>
              <div className="p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-teal-400">
                    {systemPlots.dataObj.method}
                  </span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-xs text-slate-400">{systemPlots.label1} final:</div>
                      <div className="text-xl font-bold font-mono text-teal-300">
                        {formatNum(systemPlots.dataObj.finalY1, precision)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">{systemPlots.label2} final:</div>
                      <div className="text-xl font-bold font-mono text-amber-300">
                        {formatNum(systemPlots.dataObj.finalY2, precision)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right">
                  <div className="text-xs text-slate-400">Total de Pasos</div>
                  <div className="text-lg font-bold font-mono text-teal-300">
                    {systemPlots.dataObj.numSteps}
                  </div>
                </div>
              </div>

              {/* 2 Gráficos: Temporal + Retrato de Fase */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span>Evolución Temporal vs Tiempo (t):</span>
                  </h4>
                  <InteractivePlot
                    data={systemPlots.timePlot}
                    layout={{
                      title: { text: 'Trayectorias Temporales', font: { color: '#e2e8f0', size: 13 } },
                      xaxis: { title: { text: 'Tiempo (t)' } },
                      yaxis: { title: { text: 'Amplitud' } }
                    }}
                  />
                </div>

                <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-purple-400" />
                    <span>Espacio de Fases (Retrato de Fase):</span>
                  </h4>
                  <InteractivePlot
                    data={systemPlots.phasePlot}
                    layout={{
                      title: {
                        text: `${systemPlots.label2} vs ${systemPlots.label1}`,
                        font: { color: '#e2e8f0', size: 13 }
                      },
                      xaxis: { title: { text: systemPlots.label1 } },
                      yaxis: { title: { text: systemPlots.label2 } }
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Tabla de Datos */}
          {tableData && (
            <IterationTable
              title="Tabla de Valores de la Trayectoria"
              columns={tableData.columns}
              data={tableData.data}
              precision={precision}
              filename={tableData.filename}
            />
          )}
        </div>
      )}
    </div>
  );
}
