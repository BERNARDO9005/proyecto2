import React from 'react';
import { Sparkles, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { checkStrictDiagonalDominance } from '../engines/linearSystemEngine';

/**
 * Componente interactivo para edición de Matrices [A] y vectores [b], [x0]
 */
export default function MatrixInput({
  n,
  setN,
  matrixA,
  setMatrixA,
  vectorB,
  setVectorB,
  vectorX0,
  setVectorX0,
  isIterative = false
}) {
  const handleDimensionChange = (newN) => {
    const parsed = Math.max(2, Math.min(10, parseInt(newN, 10) || 3));
    setN(parsed);

    // Redimensionar matriz A
    const newA = Array.from({ length: parsed }, (_, i) =>
      Array.from({ length: parsed }, (_, j) => {
        if (matrixA[i] && matrixA[i][j] !== undefined) return matrixA[i][j];
        return i === j ? 1 : 0;
      })
    );
    setMatrixA(newA);

    // Redimensionar vector b
    const newB = Array.from({ length: parsed }, (_, i) =>
      vectorB[i] !== undefined ? vectorB[i] : 0
    );
    setVectorB(newB);

    // Redimensionar vector x0
    if (vectorX0) {
      const newX0 = Array.from({ length: parsed }, (_, i) =>
        vectorX0[i] !== undefined ? vectorX0[i] : 0
      );
      setVectorX0(newX0);
    }
  };

  const handleCellChange = (i, j, value) => {
    const val = parseFloat(value) || 0;
    const updatedA = matrixA.map((row, rIdx) =>
      rIdx === i ? row.map((cell, cIdx) => (cIdx === j ? val : cell)) : [...row]
    );
    setMatrixA(updatedA);
  };

  const handleBChange = (i, value) => {
    const val = parseFloat(value) || 0;
    const updatedB = [...vectorB];
    updatedB[i] = val;
    setVectorB(updatedB);
  };

  const handleX0Change = (i, value) => {
    const val = parseFloat(value) || 0;
    const updatedX0 = [...vectorX0];
    updatedX0[i] = val;
    setVectorX0(updatedX0);
  };

  // Presets rápidos
  const loadPreset = (type) => {
    if (type === 'example3x3') {
      setN(3);
      setMatrixA([
        [2, 1, -1],
        [-3, -1, 2],
        [-2, 1, 2]
      ]);
      setVectorB([8, -11, -3]);
      if (setVectorX0) setVectorX0([0, 0, 0]);
    } else if (type === 'diagDominant') {
      setN(3);
      setMatrixA([
        [10, 2, -1],
        [1, 10, -1],
        [2, -1, 10]
      ]);
      setVectorB([34, 64, -22]);
      if (setVectorX0) setVectorX0([0, 0, 0]);
    } else if (type === 'singular') {
      setN(3);
      setMatrixA([
        [1, 2, 3],
        [2, 4, 6],
        [1, 1, 1]
      ]);
      setVectorB([5, 10, 3]);
      if (setVectorX0) setVectorX0([0, 0, 0]);
    } else if (type === 'clear') {
      const emptyA = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
      );
      setMatrixA(emptyA);
      setVectorB(new Array(n).fill(0));
      if (setVectorX0) setVectorX0(new Array(n).fill(0));
    }
  };

  // Comprobar dominancia diagonal en tiempo real
  const dominance = React.useMemo(() => {
    try {
      return checkStrictDiagonalDominance(matrixA);
    } catch {
      return { isDominant: false };
    }
  }, [matrixA]);

  return (
    <div className="space-y-4">
      {/* Controles de dimensión y presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/60">
        <div className="flex items-center gap-3">
          <label htmlFor="matrix-dimension-select" className="text-xs sm:text-sm font-semibold text-slate-300">
            Dimensión (n × n):
          </label>
          <select
            id="matrix-dimension-select"
            value={n}
            onChange={(e) => handleDimensionChange(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-sm font-mono text-teal-300 focus:outline-none focus:border-teal-400"
          >
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
              <option key={size} value={size}>
                {size} × {size}
              </option>
            ))}
          </select>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => loadPreset('example3x3')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Ejemplo Estándar</span>
          </button>
          <button
            type="button"
            onClick={() => loadPreset('diagDominant')}
            className="px-2.5 py-1.5 rounded-lg bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-700/50 flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Diagonal Dominante</span>
          </button>
          <button
            type="button"
            onClick={() => loadPreset('singular')}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-700/50 flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Caso Singular</span>
          </button>
          <button
            type="button"
            onClick={() => loadPreset('clear')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Alerta de dominancia diagonal si es método iterativo */}
      {isIterative && (
        <div
          className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 ${
            dominance.isDominant
              ? 'bg-emerald-950/30 border-emerald-700/50 text-emerald-300'
              : 'bg-amber-950/30 border-amber-700/50 text-amber-300'
          }`}
        >
          {dominance.isDominant ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          )}
          <span>
            {dominance.isDominant
              ? 'La matriz es diagonal dominante (|a_ii| > ∑|a_ij|). Se garantiza la convergencia de Jacobi y Gauss-Seidel.'
              : 'Atención: La matriz NO es diagonal dominante. La convergencia no está matemáticamente asegurada, pero se intentará el cálculo.'}
          </span>
        </div>
      )}

      {/* Grid de la Matriz Aumentada [A | b] */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div className="flex items-center gap-3 mb-2 font-mono text-xs text-slate-400">
            <div className="flex-1 text-center font-semibold tracking-wider text-slate-300">
              MATRIZ DE COEFICIENTES [A]
            </div>
            <div className="w-8 text-center text-slate-500">|</div>
            <div className="w-24 text-center font-semibold text-teal-400">VECTOR [b]</div>
            {isIterative && vectorX0 && (
              <div className="w-24 text-center font-semibold text-indigo-400">INICIAL [x₀]</div>
            )}
          </div>

          <div className="space-y-2">
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 text-xs font-mono text-slate-500 text-right shrink-0">
                  F{i + 1}
                </span>

                {/* Fila de A */}
                <div
                  className="grid gap-2 flex-1"
                  style={{ gridTemplateColumns: `repeat(${n}, minmax(50px, 1fr))` }}
                >
                  {Array.from({ length: n }).map((_, j) => {
                    const isDiag = i === j;
                    return (
                      <input
                        key={j}
                        type="number"
                        step="any"
                        value={matrixA[i]?.[j] ?? 0}
                        onChange={(e) => handleCellChange(i, j, e.target.value)}
                        className={`w-full px-2 py-1.5 text-center font-mono text-xs sm:text-sm rounded-lg border transition-colors ${
                          isDiag
                            ? 'bg-slate-900 border-teal-500/70 text-teal-200 font-bold focus:ring-1 focus:ring-teal-400'
                            : 'bg-slate-800/80 border-slate-700 text-slate-100 hover:border-slate-500 focus:border-teal-400'
                        }`}
                        title={`a[${i + 1},${j + 1}]`}
                      />
                    );
                  })}
                </div>

                <span className="text-slate-600 font-mono font-bold px-1">|</span>

                {/* Celda de b */}
                <div className="w-24 shrink-0">
                  <input
                    type="number"
                    step="any"
                    value={vectorB[i] ?? 0}
                    onChange={(e) => handleBChange(i, e.target.value)}
                    className="w-full px-2 py-1.5 text-center font-mono text-xs sm:text-sm rounded-lg border bg-teal-950/40 border-teal-600/70 text-teal-300 font-semibold focus:border-teal-400"
                    title={`b[${i + 1}]`}
                  />
                </div>

                {/* Celda de x0 si aplica */}
                {isIterative && vectorX0 && (
                  <div className="w-24 shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={vectorX0[i] ?? 0}
                      onChange={(e) => handleX0Change(i, e.target.value)}
                      className="w-full px-2 py-1.5 text-center font-mono text-xs sm:text-sm rounded-lg border bg-indigo-950/40 border-indigo-600/70 text-indigo-300 focus:border-indigo-400"
                      title={`x0[${i + 1}]`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
