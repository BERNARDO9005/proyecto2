import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  Layers,
  Sigma,
  TrendingUp,
  Settings,
  HelpCircle,
  Menu,
  X,
  Cpu,
  BookOpen
} from 'lucide-react';
import NonlinearModule from './modules/NonlinearModule';
import LinearModule from './modules/LinearModule';
import CalculusModule from './modules/CalculusModule';
import OdeModule from './modules/OdeModule';

export default function App() {
  const [activeModule, setActiveModule] = useState('nonlinear');
  const [precision, setPrecision] = useState(6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);

  const modules = [
    {
      id: 'nonlinear',
      title: 'Ecuaciones No Lineales',
      subtitle: 'Búsqueda de Raíces',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      badge: 'Módulo 1'
    },
    {
      id: 'linear',
      title: 'Sistemas Lineales',
      subtitle: 'Matrices & Álgebra',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      badge: 'Módulo 2'
    },
    {
      id: 'calculus',
      title: 'Cálculo Numérico',
      subtitle: 'Integración & Diferenciación',
      icon: <Sigma className="w-5 h-5 text-teal-400" />,
      badge: 'Módulo 3'
    },
    {
      id: 'ode',
      title: 'Ecuaciones Diferenciales',
      subtitle: 'Problemas de Valor Inicial (EDO)',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      badge: 'Módulo 4'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans">
      {/* Header Superior */}
      <header className="sticky top-0 z-30 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo y Nombre */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Calculator className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-100 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                  NumCalc Pro
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                  Client-Side Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Calculadora Científica de Métodos Numéricos
              </p>
            </div>
          </div>

          {/* Configuración de Precisión y Ayuda */}
          <div className="flex items-center gap-3">
            {/* Selector de Precisión Decimal */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700">
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="precision-selector" className="text-xs text-slate-300 font-medium hidden sm:inline">
                Precisión:
              </label>
              <select
                id="precision-selector"
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-teal-300 text-xs font-mono rounded-lg px-2 py-1 focus:outline-none focus:border-teal-400"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((dec) => (
                  <option key={dec} value={dec}>
                    {dec} dec
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de Documentación / Ayuda */}
            <button
              onClick={() => setShowDocsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-medium"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Manual y Métodos</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal con Barra Lateral de Navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Navegación Desktop */}
        <aside className="hidden md:block w-72 shrink-0 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Módulos de Análisis
          </div>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 group ${
                activeModule === m.id
                  ? 'bg-gradient-to-r from-slate-800 to-slate-800/90 border-teal-500/60 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div
                className={`p-2.5 rounded-xl transition-colors ${
                  activeModule === m.id
                    ? 'bg-teal-500/10 text-teal-400'
                    : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {m.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-semibold text-sm ${
                      activeModule === m.id ? 'text-slate-100' : 'text-slate-300'
                    }`}
                  >
                    {m.title}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700/80">
                    {m.badge}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{m.subtitle}</div>
              </div>
            </button>
          ))}

          {/* Tarjeta de Especificación Técnica */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Arquitectura Técnica</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Motor matemático 100% en cliente con <strong className="text-slate-300">mathjs AST</strong> sin eval(), renderizado <strong className="text-slate-300">KaTeX</strong> y visualización científica con <strong className="text-slate-300">Plotly.js</strong>.
            </p>
          </div>
        </aside>

        {/* Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden grid grid-cols-2 gap-2 mb-4">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setActiveModule(m.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl border text-left flex flex-col gap-2 ${
                  activeModule === m.id
                    ? 'bg-slate-800 border-teal-500/60 text-slate-100'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  {m.icon}
                  <span className="text-[10px] font-mono text-teal-400">{m.badge}</span>
                </div>
                <div className="font-semibold text-xs text-slate-200">{m.title}</div>
              </button>
            ))}
          </div>
        )}

        {/* Área de Trabajo / Módulo Activo */}
        <main className="flex-1 min-w-0">
          {activeModule === 'nonlinear' && <NonlinearModule precision={precision} />}
          {activeModule === 'linear' && <LinearModule precision={precision} />}
          {activeModule === 'calculus' && <CalculusModule precision={precision} />}
          {activeModule === 'ode' && <OdeModule precision={precision} />}
        </main>
      </div>

      {/* Modal de Documentación Técnica */}
      {showDocsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-lg">
                <BookOpen className="w-5 h-5" />
                <span>Manual de Métodos Numéricos y Casos Límite</span>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div>
                <h5 className="font-bold text-teal-300">1. Ecuaciones No Lineales</h5>
                <p>
                  Incluye Bisección, Regula Falsi, Newton-Raphson y Secante. Implementa validación del <strong>Teorema de Bolzano</strong> (si f(a)·f(b) &gt; 0 se rechaza antes de iterar), detección estricta de <strong>división entre cero</strong> por derivada horizontal f'(x) = 0 o pendiente secante nula, y advertencia visible tras 100 iteraciones si no se alcanza la tolerancia especificada.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-indigo-300">2. Sistemas de Ecuaciones Lineales</h5>
                <p>
                  Eliminación Gaussiana con <strong>pivoteo parcial obligatorio</strong>, Gauss-Jordan, y métodos iterativos de Jacobi y Gauss-Seidel. Soporta matrices de 2×2 hasta 10×10. Detecta automáticamente <strong>matrices singulares o mal condicionadas</strong> (|pivote| &lt; 10⁻¹²) e incluye verificador de <strong>diagonal dominante</strong>.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-teal-300">3. Diferenciación e Integración</h5>
                <p>
                  Reglas del Trapecio (simple y compuesto) y Simpson 1/3 y 3/8. Incorpora <strong>ajuste automático de subintervalos</strong> para garantizar paridad en Simpson 1/3 y múltiplos de 3 en Simpson 3/8, con notificación al usuario. Protege contra <strong>fuera de dominio</strong> (log de x ≤ 0, divisiones por cero) indicando con precisión qué subintervalo falló.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-emerald-300">4. Ecuaciones Diferenciales Ordinarias (EDO)</h5>
                <p>
                  Métodos de Euler, Heun (Euler modificado) y Runge-Kutta 4° Orden (RK4) para dy/dx = f(x, y). Modo comparativo simultáneo que grafica y contrasta las tres trayectorias sobre el mismo problema de valor inicial.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 text-center text-xs text-slate-500">
        <p>
          Calculadora Científica de Métodos Numéricos • 100% Client-Side Single Page Application
        </p>
      </footer>
    </div>
  );
}
