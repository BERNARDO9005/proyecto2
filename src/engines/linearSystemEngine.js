/**
 * MÓDULO 2: SISTEMAS DE ECUACIONES LINEALES (MATRICES)
 * Funciones puras para métodos directos e iterativos (2x2 hasta 10x10).
 */

const EPSILON = 1e-12;
const MAX_ITER = 100;

/**
 * Clona profundamente una matriz 2D.
 */
function cloneMatrix(mat) {
  return mat.map(row => [...row]);
}

/**
 * Verifica si una matriz es estrictamente o débilmente diagonal dominante.
 */
export function checkStrictDiagonalDominance(A) {
  const n = A.length;
  let isStrict = true;
  const rowsStatus = [];

  for (let i = 0; i < n; i++) {
    const diag = Math.abs(A[i][i]);
    let sumOffDiag = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sumOffDiag += Math.abs(A[i][j]);
      }
    }
    const dominant = diag > sumOffDiag;
    if (!dominant) {
      isStrict = false;
    }
    rowsStatus.push({ row: i + 1, diag, sumOffDiag, dominant });
  }

  return {
    isDominant: isStrict,
    details: rowsStatus,
    warning: isStrict
      ? null
      : 'Advertencia: La matriz NO es diagonal dominante. Los métodos iterativos (Jacobi / Gauss-Seidel) podrían no converger o divergir rápidamente.'
  };
}

/**
 * Eliminación Gaussiana con Pivoteo Parcial Obligatorio
 */
export function gaussianElimination(A_in, b_in) {
  const n = A_in.length;
  if (n < 2 || n > 10) throw new Error('La dimensión del sistema debe estar entre 2 y 10.');
  if (b_in.length !== n) throw new Error('Las dimensiones de A y b no coinciden.');

  // Construir matriz aumentada [A|b]
  const M = [];
  for (let i = 0; i < n; i++) {
    M.push([...A_in[i], b_in[i]]);
  }

  const steps = [];
  steps.push({
    title: 'Matriz Aumentada Inicial [A | b]',
    matrix: cloneMatrix(M),
    description: 'Estado inicial del sistema de ecuaciones.'
  });

  // Fase de eliminación hacia adelante con pivoteo parcial
  for (let col = 0; col < n; col++) {
    // Buscar pivote máximo en la columna col (desde la fila col hasta n-1)
    let maxRow = col;
    let maxVal = Math.abs(M[col][col]);
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > maxVal) {
        maxVal = Math.abs(M[r][col]);
        maxRow = r;
      }
    }

    // Comprobación de matriz singular
    if (maxVal < EPSILON) {
      throw new Error(
        `Matriz singular o mal condicionada detectada en la columna ${col + 1} (pivote ≈ 0 tras pivoteo parcial). El sistema no tiene solución única o es indeterminado.`
      );
    }

    // Intercambio de filas si es necesario
    if (maxRow !== col) {
      const temp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = temp;

      steps.push({
        title: `Pivoteo Parcial en Columna ${col + 1}`,
        matrix: cloneMatrix(M),
        description: `Intercambio de Fila ${col + 1} con Fila ${maxRow + 1} para maximizar el pivote (|${maxVal.toFixed(4)}|).`
      });
    }

    // Eliminación de las filas inferiores
    for (let row = col + 1; row < n; row++) {
      const factor = M[row][col] / M[col][col];
      M[row][col] = 0; // Asegurar cero explícito numérico
      for (let j = col + 1; j <= n; j++) {
        M[row][j] -= factor * M[col][j];
      }
    }

    steps.push({
      title: `Eliminación bajo el Pivote de Columna ${col + 1}`,
      matrix: cloneMatrix(M),
      description: `Ceros creados bajo el elemento diagonal M[${col + 1},${col + 1}].`
    });
  }

  // Sustitución hacia atrás
  const x = new Array(n).fill(0);
  const backSubstitutionHistory = [];

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += M[i][j] * x[j];
    }
    const diag = M[i][i];
    if (Math.abs(diag) < EPSILON) {
      throw new Error(`Pivote diagonal casi nulo en sustitución hacia atrás en fila ${i + 1}.`);
    }
    x[i] = (M[i][n] - sum) / diag;

    backSubstitutionHistory.unshift({
      variable: `x_${i + 1}`,
      formula: `(${M[i][n].toFixed(6)} - ${sum.toFixed(6)}) / ${diag.toFixed(6)}`,
      value: x[i]
    });
  }

  return {
    solution: x,
    steps,
    backSubstitution: backSubstitutionHistory,
    method: 'Eliminación Gaussiana con Pivoteo Parcial'
  };
}

/**
 * Método de Gauss-Jordan con Pivoteo Parcial
 */
export function gaussJordan(A_in, b_in) {
  const n = A_in.length;
  if (n < 2 || n > 10) throw new Error('La dimensión debe estar entre 2 y 10.');

  const M = [];
  for (let i = 0; i < n; i++) {
    M.push([...A_in[i], b_in[i]]);
  }

  const steps = [];
  steps.push({
    title: 'Matriz Aumentada Inicial [A | b]',
    matrix: cloneMatrix(M),
    description: 'Estado inicial.'
  });

  for (let col = 0; col < n; col++) {
    // Pivoteo parcial
    let maxRow = col;
    let maxVal = Math.abs(M[col][col]);
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > maxVal) {
        maxVal = Math.abs(M[r][col]);
        maxRow = r;
      }
    }

    if (maxVal < EPSILON) {
      throw new Error(
        `Matriz singular detectada en columna ${col + 1}. El sistema no posee solución única.`
      );
    }

    if (maxRow !== col) {
      const temp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = temp;
      steps.push({
        title: `Pivoteo Parcial en Columna ${col + 1}`,
        matrix: cloneMatrix(M),
        description: `Intercambio de Fila ${col + 1} con Fila ${maxRow + 1}.`
      });
    }

    // Normalizar la fila pivote para que el elemento diagonal sea 1
    const pivot = M[col][col];
    for (let j = col; j <= n; j++) {
      M[col][j] /= pivot;
    }

    steps.push({
      title: `Normalización del Pivote en Fila ${col + 1}`,
      matrix: cloneMatrix(M),
      description: `Fila ${col + 1} dividida por su pivote ${pivot.toFixed(4)}.`
    });

    // Eliminar todas las demás filas (tanto arriba como abajo)
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = M[row][col];
        for (let j = col; j <= n; j++) {
          M[row][j] -= factor * M[col][j];
        }
      }
    }

    steps.push({
      title: `Eliminación Gauss-Jordan sobre Columna ${col + 1}`,
      matrix: cloneMatrix(M),
      description: `Ceros generados en toda la columna ${col + 1}, excepto la diagonal.`
    });
  }

  const solution = M.map(row => row[n]);

  return {
    solution,
    steps,
    method: 'Gauss-Jordan con Pivoteo Parcial'
  };
}

/**
 * Método de Jacobi
 */
export function jacobi(A, b, x0, tol = 1e-6, maxIter = MAX_ITER) {
  const n = A.length;
  const dominance = checkStrictDiagonalDominance(A);

  // Verificar elementos diagonales no nulos
  for (let i = 0; i < n; i++) {
    if (Math.abs(A[i][i]) < EPSILON) {
      throw new Error(
        `Elemento diagonal a_${i + 1}${i + 1} nulo o casi cero. El método de Jacobi requiere pivotes diagonales no nulos.`
      );
    }
  }

  const limit = Math.min(Math.max(1, maxIter), MAX_ITER);
  let currentX = x0 ? [...x0] : new Array(n).fill(0);
  const iterations = [];
  let converged = false;

  iterations.push({
    k: 0,
    x: [...currentX],
    error: null
  });

  for (let k = 1; k <= limit; k++) {
    const nextX = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * currentX[j];
        }
      }
      nextX[i] = (b[i] - sum) / A[i][i];
    }

    // Norma infinito del error: max(|x_i^(k) - x_i^(k-1)|)
    let maxDiff = 0;
    for (let i = 0; i < n; i++) {
      const diff = Math.abs(nextX[i] - currentX[i]);
      if (diff > maxDiff) maxDiff = diff;
    }

    iterations.push({
      k,
      x: [...nextX],
      error: maxDiff
    });

    if (maxDiff < tol) {
      converged = true;
      currentX = nextX;
      break;
    }

    // Detección de divergencia rápida (overflow)
    if (maxDiff > 1e12 || Number.isNaN(maxDiff)) {
      return {
        solution: nextX,
        converged: false,
        iterations,
        dominance,
        message: 'DIVERGENCIA DETECTADA: La secuencia diverge a infinito debido a que la matriz no es diagonal dominante.',
        method: 'Jacobi'
      };
    }

    currentX = nextX;
  }

  return {
    solution: currentX,
    converged,
    iterations,
    dominance,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length - 1} iteraciones con tolerancia |ε| < ${tol}.`
      : `ADVERTENCIA: El método de Jacobi NO convergió tras el límite de ${limit} iteraciones. Se presenta la última aproximación calculada.`,
    method: 'Jacobi'
  };
}

/**
 * Método de Gauss-Seidel
 */
export function gaussSeidel(A, b, x0, tol = 1e-6, maxIter = MAX_ITER) {
  const n = A.length;
  const dominance = checkStrictDiagonalDominance(A);

  for (let i = 0; i < n; i++) {
    if (Math.abs(A[i][i]) < EPSILON) {
      throw new Error(
        `Elemento diagonal a_${i + 1}${i + 1} nulo o casi cero. Gauss-Seidel requiere elementos diagonales no nulos.`
      );
    }
  }

  const limit = Math.min(Math.max(1, maxIter), MAX_ITER);
  let currentX = x0 ? [...x0] : new Array(n).fill(0);
  const iterations = [];
  let converged = false;

  iterations.push({
    k: 0,
    x: [...currentX],
    error: null
  });

  for (let k = 1; k <= limit; k++) {
    const prevX = [...currentX];

    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum += A[i][j] * currentX[j]; // Usa los valores ya actualizados en la misma iteración
        }
      }
      currentX[i] = (b[i] - sum) / A[i][i];
    }

    let maxDiff = 0;
    for (let i = 0; i < n; i++) {
      const diff = Math.abs(currentX[i] - prevX[i]);
      if (diff > maxDiff) maxDiff = diff;
    }

    iterations.push({
      k,
      x: [...currentX],
      error: maxDiff
    });

    if (maxDiff < tol) {
      converged = true;
      break;
    }

    if (maxDiff > 1e12 || Number.isNaN(maxDiff)) {
      return {
        solution: currentX,
        converged: false,
        iterations,
        dominance,
        message: 'DIVERGENCIA DETECTADA: La secuencia diverge numéricamente.',
        method: 'Gauss-Seidel'
      };
    }
  }

  return {
    solution: currentX,
    converged,
    iterations,
    dominance,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length - 1} iteraciones con tolerancia |ε| < ${tol}.`
      : `ADVERTENCIA: El método de Gauss-Seidel NO convergió tras el límite de ${limit} iteraciones. Se presenta la última tabla parcial calculada.`,
    method: 'Gauss-Seidel'
  };
}
