import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Dices,
  Sliders,
  Maximize2
} from 'lucide-react';
import { checkStrictDiagonalDominance } from '../engines/linearSystemEngine';

/**
 * Componente avanzado para edición, generación e importación de Matrices [A] y vectores [b], [x0]
 * Soporta dimensiones dinámicas desde 2x2 hasta 50x50.
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
  isIterative = false,
  hideVectorB = false
}) {
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvError, setCsvError] = useState(null);

  const handleDimensionChange = (newN) => {
    const parsed = Math.max(2, Math.min(50, parseInt(newN, 10) || 3));
    setN(parsed);

    // Redimensionar matriz A preservando celdas existentes
    const newA = Array.from({ length: parsed }, (_, i) =>
      Array.from({ length: parsed }, (_, j) => {
        if (matrixA[i] && matrixA[i][j] !== undefined) return matrixA[i][j];
        return i === j ? 1 : 0;
      })
    );
    setMatrixA(newA);

    // Redimensionar vector b
    const newB = Array.from({ length: parsed }, (_, i) =>
      vectorB[i] !== undefined ? vectorB[i] : 1
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

  // Generadores automáticos
  const generateDiagonalDominant = (size = n) => {
    const newA = [];
    const newB = [];
    const newX0 = [];

    for (let i = 0; i < size; i++) {
      const row = [];
      let rowSum = 0;
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          const val = Math.floor(Math.random() * 9) - 4; // [-4, 4]
          row.push(val);
          rowSum += Math.abs(val);
        } else {
          row.push(0); // pivote provisional
        }
      }
      // Pivote estrictamente superior a la suma de la fila
      row[i] = rowSum + Math.floor(Math.random() * 5) + 3;
      newA.push(row);
      newB.push(Math.floor(Math.random() * 40) - 20);
      newX0.push(0);
    }

    setN(size);
    setMatrixA(newA);
    setVectorB(newB);
    if (setVectorX0) setVectorX0(newX0);
  };

  const generateRandomMatrix = (size = n) => {
    const newA = [];
    const newB = [];
    const newX0 = [];

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        let val = Math.floor(Math.random() * 21) - 10;
        if (i === j && val === 0) val = 1;
        row.push(val);
      }
      newA.push(row);
      newB.push(Math.floor(Math.random() * 30) - 15);
      newX0.push(0);
    }

    setN(size);
    setMatrixA(newA);
    setVectorB(newB);
    if (setVectorX0) setVectorX0(newX0);
  };

  const generateTridiagonal = (size = n) => {
    const newA = [];
    const newB = [];
    const newX0 = [];

    for (let i = 0; i < size; i++) {
      const row = new Array(size).fill(0);
      row[i] = 4; // diagonal
      if (i > 0) row[i - 1] = -1; // subdiagonal
      if (i < size - 1) row[i + 1] = -1; // superdiagonal
      newA.push(row);
      newB.push(i + 1);
      newX0.push(0);
    }

    setN(size);
    setMatrixA(newA);
    setVectorB(newB);
    if (setVectorX0) setVectorX0(newX0);
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
    } else if (type === 'diagDominant3x3') {
      setN(3);
      setMatrixA([
        [10, 2, -1],
        [1, 10, -1],
        [2, -1, 10]
      ]);
      setVectorB([34, 64, -22]);
      if (setVectorX0) setVectorX0([0, 0, 0]);
    } else if (type === 'cholesky3x3') {
      setN(3);
      setMatrixA([
        [4, 12, -16],
        [12, 37, -43],
        [-16, -43, 98]
      ]);
      setVectorB([8, 18, 44]);
      if (setVectorX0) setVectorX0([0, 0, 0]);
    } else if (type === 'symmetricEigen3x3') {
      setN(3);
      setMatrixA([
        [4, 1, 1],
        [1, 3, -1],
        [1, -1, 2]
      ]);
      setVectorB([1, 1, 1]);
      if (setVectorX0) setVectorX0([1, 1, 1]);
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
      setVectorB(new Array(n).fill(1));
      if (setVectorX0) setVectorX0(new Array(n).fill(0));
    }
  };

  // Importar desde CSV o texto separado por espacios/tabulaciones
  const handleImportCsv = () => {
    try {
      setCsvError(null);
      const lines = csvText
        .trim()
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length < 2) {
        throw new Error('Debe proporcionar al menos 2 filas de datos.');
      }

      const parsedRows = lines.map((line) =>
        line
          .split(/[\t,;\s]+/)
          .map((v) => parseFloat(v))
          .filter((v) => !Number.isNaN(v))
      );

      const parsedN = parsedRows.length;
      if (parsedN > 50) {
        throw new Error('El tamaño máximo soportado es de 50x50.');
      }

      // Comprobar si cada fila tiene n elementos (sólo A) o n+1 elementos ([A|b])
      const hasAugmentedB = parsedRows.every((r) => r.length === parsedN + 1);
      const isOnlyA = parsedRows.every((r) => r.length === parsedN);

      if (!hasAugmentedB && !isOnlyA) {
        throw new Error(
          `Formato irregular: Cada una de las ${parsedN} filas debe contener ${parsedN} números (para matriz A) o ${parsedN + 1} números (para matriz aumentada [A|b]).`
        );
      }

      const newA = parsedRows.map((r) => r.slice(0, parsedN));
      const newB = hasAugmentedB
        ? parsedRows.map((r) => r[parsedN])
        : new Array(parsedN).fill(1);

      setN(parsedN);
      setMatrixA(newA);
      setVectorB(newB);
      if (setVectorX0) setVectorX0(new Array(parsedN).fill(0));

      setShowCsvModal(false);
      setCsvText('');
    } catch (err) {
      setCsvError(err.message || 'Error al procesar el texto/CSV.');
    }
  };

  // Comprobar dominancia diagonal en tiempo real
  const dominance = useMemo(() => {
    try {
      return checkStrictDiagonalDominance(matrixA);
    } catch {
      return { isDominant: false };
    }
  }, [matrixA]);

  return (
    <div className="space-y-4">
      {/* Barra de Controles y Dimensión */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/70 rounded-2xl border border-slate-700/60">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-400" />
            <label
              htmlFor="matrix-dimension-input"
              className="text-xs sm:text-sm font-semibold text-slate-300"
            >
              Dimensión (n × n):
            </label>
            <input
              id="matrix-dimension-input"
              type="number"
              min="2"
              max="50"
              value={n}
              onChange={(e) => handleDimensionChange(e.target.value)}
              className="w-16 bg-slate-800 border border-slate-600 rounded-lg px-2.5 py-1 text-sm font-mono text-teal-300 text-center focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* Botones de Dimensiones Frecuentes */}
          <div className="flex items-center gap-1">
            {[3, 5, 10, 20, 50].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleDimensionChange(size)}
                className={`px-2 py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                  n === size
                    ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-bold'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {size}×{size}
              </button>
            ))}
          </div>
        </div>

        {/* Generadores y Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Generador Aleatorio */}
          <button
            type="button"
            onClick={() => generateRandomMatrix(n)}
            title="Generar coeficientes aleatorios para el tamaño actual"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Dices className="w-3.5 h-3.5 text-indigo-400" />
            <span>Aleatoria</span>
          </button>

          {/* Generador Diagonal Dominante */}
          <button
            type="button"
            onClick={() => generateDiagonalDominant(n)}
            title="Genera matriz diagonal dominante (convergencia garantizada)"
            className="px-2.5 py-1.5 rounded-lg bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-700/50 flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Diag. Dominante</span>
          </button>

          {/* Tridiagonal */}
          <button
            type="button"
            onClick={() => generateTridiagonal(n)}
            title="Generar sistema tridiagonal clásico (ej. transferencia de calor)"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <span>Tridiagonal</span>
          </button>

          {/* Cholesky Preset */}
          <button
            type="button"
            onClick={() => loadPreset('cholesky3x3')}
            title="Cargar matriz simétrica y definida positiva (para Cholesky)"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <span>Simétrica Def. Pos.</span>
          </button>

          {/* Autovalores Preset */}
          <button
            type="button"
            onClick={() => loadPreset('symmetricEigen3x3')}
            title="Cargar matriz para cálculo de autovalores"
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <span>Autovalores 3×3</span>
          </button>

          {/* Importar CSV / Texto */}
          <button
            type="button"
            onClick={() => setShowCsvModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pegar / CSV</span>
          </button>

          {/* Reiniciar a Identidad */}
          <button
            type="button"
            onClick={() => loadPreset('clear')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-colors"
            title="Reiniciar a Matriz Identidad"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Alerta si es matriz grande */}
      {n > 10 && (
        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>
              <strong>Matriz de Gran Escala ({n}×{n}):</strong> Se procesará en segundo plano mediante <strong>Web Worker</strong> para evitar pausas en la interfaz. Puedes editar celdas puntuales o utilizar el botón <em>Pegar / CSV</em> o los generadores automáticos.
            </span>
          </div>
        </div>
      )}

      {/* Alerta de dominancia diagonal si es método iterativo */}
      {isIterative && (
        <div
          className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
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
              ? `La matriz es diagonal dominante estricta (|a_ii| > ∑|a_ij|). Se garantiza la convergencia de Jacobi y Gauss-Seidel.`
              : 'Atención: La matriz NO es diagonal dominante. Jacobi y Gauss-Seidel pueden no converger o divergir. (Tip: pulsa el botón "Diag. Dominante" para probar un caso garantizado).'}
          </span>
        </div>
      )}

      {/* Grid de la Matriz Aumentada [A | b | x0] */}
      <div className="overflow-x-auto pb-2 border border-slate-700/50 rounded-2xl bg-slate-900/50 p-3">
        <div className="inline-block min-w-full">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-slate-400">
            <span className="w-8 text-center text-slate-500">Fila</span>
            <div className="flex-1 text-center font-semibold tracking-wider text-slate-300">
              MATRIZ DE COEFICIENTES [A] ({n}×{n})
            </div>
            {!hideVectorB && (
              <>
                <div className="w-4 text-center text-slate-500">|</div>
                <div className="w-24 text-center font-semibold text-teal-400">[b]</div>
              </>
            )}
            {isIterative && vectorX0 && (
              <div className="w-24 text-center font-semibold text-indigo-400">[x₀]</div>
            )}
          </div>

          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {Array.from({ length: n }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-8 text-xs font-mono text-slate-500 text-center shrink-0">
                  {i + 1}
                </span>

                {/* Fila de A */}
                <div
                  className="grid gap-1.5 flex-1"
                  style={{
                    gridTemplateColumns: `repeat(${n}, minmax(${n > 12 ? '42px' : '52px'}, 1fr))`
                  }}
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
                        className={`w-full px-1.5 py-1 text-center font-mono text-xs rounded-lg border transition-colors ${
                          isDiag
                            ? 'bg-slate-900 border-teal-500/80 text-teal-200 font-bold focus:ring-1 focus:ring-teal-400'
                            : 'bg-slate-800/80 border-slate-700/80 text-slate-100 hover:border-slate-500 focus:border-teal-400'
                        }`}
                        title={`a[${i + 1},${j + 1}]`}
                      />
                    );
                  })}
                </div>

                {!hideVectorB && (
                  <>
                    <span className="text-slate-600 font-mono font-bold px-0.5">|</span>

                    {/* Celda de b */}
                    <div className="w-24 shrink-0">
                      <input
                        type="number"
                        step="any"
                        value={vectorB[i] ?? 0}
                        onChange={(e) => handleBChange(i, e.target.value)}
                        className="w-full px-2 py-1 text-center font-mono text-xs rounded-lg border bg-teal-950/40 border-teal-600/70 text-teal-300 font-semibold focus:border-teal-400"
                        title={`b[${i + 1}]`}
                      />
                    </div>
                  </>
                )}

                {/* Celda de x0 si aplica */}
                {isIterative && vectorX0 && (
                  <div className="w-24 shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={vectorX0[i] ?? 0}
                      onChange={(e) => handleX0Change(i, e.target.value)}
                      className="w-full px-2 py-1 text-center font-mono text-xs rounded-lg border bg-indigo-950/40 border-indigo-600/70 text-indigo-300 focus:border-indigo-400"
                      title={`x0[${i + 1}]`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Importación de CSV / Matriz en Texto Plano */}
      {showCsvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-base">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Pegar Matriz (CSV / Texto / Excel)</span>
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
              Pega las filas separadas por comas, espacios o tabulaciones. Cada fila puede contener $n$ números (matriz $A$) o $n+1$ números (matriz aumentada $[A|b]$). La dimensión se detectará automáticamente.
            </p>

            <textarea
              rows={8}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={`Ejemplo 3x3 aumentada:\n2  1 -1  8\n-3 -1  2 -11\n-2  1  2 -3`}
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
                Cargar Matriz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
