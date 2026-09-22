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

const MAX_DETAILED_N = 10;

/**
 * Eliminación Gaussiana con Pivoteo Parcial Obligatorio
 */
export function gaussianElimination(A_in, b_in) {
  const n = A_in.length;
  if (n < 2 || n > 50) throw new Error('La dimensión del sistema debe estar entre 2 y 50.');
  if (b_in.length !== n) throw new Error('Las dimensiones de A y b no coinciden.');

  // Construir matriz aumentada [A|b]
  const M = [];
  for (let i = 0; i < n; i++) {
    M.push([...A_in[i], b_in[i]]);
  }

  const steps = [];
  steps.push({
    title: 'Matriz Aumentada Inicial [A | b]',
    matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
    description: `Estado inicial del sistema (${n}×${n}).`
  });

  // Fase de eliminación hacia adelante con pivoteo parcial
  for (let col = 0; col < n; col++) {
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
        `Matriz singular o mal condicionada detectada en la columna ${col + 1} (pivote ≈ 0 tras pivoteo parcial). El sistema no tiene solución única o es indeterminado.`
      );
    }

    if (maxRow !== col) {
      const temp = M[col];
      M[col] = M[maxRow];
      M[maxRow] = temp;

      if (n <= MAX_DETAILED_N || col === 0) {
        steps.push({
          title: `Pivoteo Parcial en Columna ${col + 1}`,
          matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
          description: `Intercambio de Fila ${col + 1} con Fila ${maxRow + 1} para maximizar el pivote (|${maxVal.toFixed(4)}|).`
        });
      }
    }

    // Eliminación de las filas inferiores
    for (let row = col + 1; row < n; row++) {
      const factor = M[row][col] / M[col][col];
      M[row][col] = 0;
      for (let j = col + 1; j <= n; j++) {
        M[row][j] -= factor * M[col][j];
      }
    }

    if (n <= MAX_DETAILED_N || col === n - 2 || col === 0) {
      steps.push({
        title: `Eliminación bajo el Pivote de Columna ${col + 1}`,
        matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
        description: `Ceros creados bajo el elemento diagonal M[${col + 1},${col + 1}].`
      });
    }
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

    if (n <= MAX_DETAILED_N || i >= n - 3 || i <= 2) {
      backSubstitutionHistory.unshift({
        variable: `x_${i + 1}`,
        formula: `(${M[i][n].toFixed(4)} - ${sum.toFixed(4)}) / ${diag.toFixed(4)}`,
        value: x[i]
      });
    }
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
  if (n < 2 || n > 50) throw new Error('La dimensión debe estar entre 2 y 50.');

  const M = [];
  for (let i = 0; i < n; i++) {
    M.push([...A_in[i], b_in[i]]);
  }

  const steps = [];
  steps.push({
    title: 'Matriz Aumentada Inicial [A | b]',
    matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
    description: `Estado inicial (${n}×${n}).`
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
      if (n <= MAX_DETAILED_N || col === 0) {
        steps.push({
          title: `Pivoteo Parcial en Columna ${col + 1}`,
          matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
          description: `Intercambio de Fila ${col + 1} con Fila ${maxRow + 1}.`
        });
      }
    }

    // Normalizar la fila pivote para que el elemento diagonal sea 1
    const pivot = M[col][col];
    for (let j = col; j <= n; j++) {
      M[col][j] /= pivot;
    }

    if (n <= MAX_DETAILED_N) {
      steps.push({
        title: `Normalización del Pivote en Fila ${col + 1}`,
        matrix: cloneMatrix(M),
        description: `Fila ${col + 1} dividida por su pivote ${pivot.toFixed(4)}.`
      });
    }

    // Eliminar todas las demás filas (tanto arriba como abajo)
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = M[row][col];
        for (let j = col; j <= n; j++) {
          M[row][j] -= factor * M[col][j];
        }
      }
    }

    if (n <= MAX_DETAILED_N || col === n - 1 || col === 0) {
      steps.push({
        title: `Eliminación Gauss-Jordan sobre Columna ${col + 1}`,
        matrix: n <= MAX_DETAILED_N ? cloneMatrix(M) : null,
        description: `Ceros generados en toda la columna ${col + 1}, excepto la diagonal.`
      });
    }
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

/* =========================================================================
 * DESCOMPOSICIONES MATRICIALES (LU Y CHOLESKY)
 * ========================================================================= */

/**
 * Multiplicación matriz-vector: y = A * x
 */
export function multiplyMatrixVector(A, x) {
  const n = A.length;
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < A[i].length; j++) {
      s += A[i][j] * x[j];
    }
    res[i] = s;
  }
  return res;
}

/**
 * Multiplicación de matrices cuadradas o compatibles: C = A * B
 */
export function multiplyMatrices(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  const res = Array.from({ length: rowsA }, () => new Array(colsB).fill(0));
  for (let i = 0; i < rowsA; i++) {
    for (let k = 0; k < colsA; k++) {
      const aik = A[i][k];
      for (let j = 0; j < colsB; j++) {
        res[i][j] += aik * B[k][j];
      }
    }
  }
  return res;
}

/**
 * Transpuesta de una matriz.
 */
export function transposeMatrix(A) {
  const rows = A.length;
  const cols = A[0].length;
  const res = Array.from({ length: cols }, () => new Array(rows).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      res[j][i] = A[i][j];
    }
  }
  return res;
}

/**
 * Producto escalar y norma euclidiana L2.
 */
export function dotProduct(u, v) {
  let s = 0;
  for (let i = 0; i < u.length; i++) s += u[i] * v[i];
  return s;
}

export function vectorNorm(v) {
  return Math.sqrt(dotProduct(v, v));
}

/**
 * Descomposición LU por el Método de Doolittle.
 * A = L * U, donde L es triangular inferior con diagonal unitaria (l_ii = 1)
 * y U es triangular superior.
 */
export function doolittleLU(A) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  const L = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
  const U = Array.from({ length: n }, () => new Array(n).fill(0));
  const steps = [];

  for (let i = 0; i < n; i++) {
    // Calcular fila i de U
    for (let j = i; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[i][k] * U[k][j];
      }
      U[i][j] = A[i][j] - sum;
    }

    // Verificar pivote
    if (Math.abs(U[i][i]) < EPSILON) {
      throw new Error(
        `Elemento pivote u_${i + 1}${i + 1} ≈ 0 en Doolittle. La descomposición requiere pivotes diagonales no nulos.`
      );
    }

    // Calcular columna i de L
    for (let j = i + 1; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < i; k++) {
        sum += L[j][k] * U[k][i];
      }
      L[j][i] = (A[j][i] - sum) / U[i][i];
    }

    if (n <= MAX_DETAILED_N) {
      steps.push({
        step: i + 1,
        title: `Etapa ${i + 1}: Fila ${i + 1} de U y Columna ${i + 1} de L`,
        L: cloneMatrix(L),
        U: cloneMatrix(U)
      });
    }
  }

  return { L, U, steps };
}

/**
 * Descomposición LU por el Método de Crout.
 * A = L * U, donde U es triangular superior con diagonal unitaria (u_ii = 1)
 * y L es triangular inferior.
 */
export function croutLU(A) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  const U = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
  const steps = [];

  for (let j = 0; j < n; j++) {
    // Calcular columna j de L
    for (let i = j; i < n; i++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * U[k][j];
      }
      L[i][j] = A[i][j] - sum;
    }

    // Verificar pivote diagonal de L
    if (Math.abs(L[j][j]) < EPSILON) {
      throw new Error(
        `Elemento pivote l_${j + 1}${j + 1} ≈ 0 en Crout. La descomposición requiere pivotes diagonales no nulos.`
      );
    }

    // Calcular fila j de U
    for (let i = j + 1; i < n; i++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[j][k] * U[k][i];
      }
      U[j][i] = (A[j][i] - sum) / L[j][j];
    }

    if (n <= MAX_DETAILED_N) {
      steps.push({
        step: j + 1,
        title: `Etapa ${j + 1}: Columna ${j + 1} de L y Fila ${j + 1} de U`,
        L: cloneMatrix(L),
        U: cloneMatrix(U)
      });
    }
  }

  return { L, U, steps };
}

/**
 * Descomposición de Cholesky: A = L * Lᵀ
 * Para matrices simétricas y definidas positivas.
 */
export function choleskyDecomposition(A) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  // Verificar simetría
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[i][j] - A[j][i]) > 1e-9) {
        throw new Error(
          `La matriz no es simétrica: A[${i + 1}][${j + 1}] (${A[i][j]}) ≠ A[${j + 1}][${i + 1}] (${A[j][i]}). Cholesky requiere simetría estricta.`
        );
      }
    }
  }

  const L = Array.from({ length: n }, () => new Array(n).fill(0));
  const steps = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }

      if (i === j) {
        const val = A[i][i] - sum;
        if (val <= EPSILON) {
          throw new Error(
            `La matriz no es definida positiva (pivote fila ${i + 1} = ${val.toFixed(6)} ≤ 0). Cholesky requiere una matriz simétrica y definida positiva.`
          );
        }
        L[i][i] = Math.sqrt(val);
      } else {
        L[i][j] = (A[i][j] - sum) / L[j][j];
      }
    }

    if (n <= MAX_DETAILED_N) {
      steps.push({
        step: i + 1,
        title: `Etapa ${i + 1}: Fila ${i + 1} de L`,
        L: cloneMatrix(L)
      });
    }
  }

  const LT = transposeMatrix(L);
  return { L, LT, steps };
}

/**
 * Sustitución hacia adelante: L * y = b
 */
export function forwardSubstitution(L, b) {
  const n = L.length;
  const y = new Array(n).fill(0);
  const steps = [];

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < i; j++) {
      sum += L[i][j] * y[j];
    }
    if (Math.abs(L[i][i]) < EPSILON) {
      throw new Error(`Elemento diagonal L[${i + 1}][${i + 1}] nulo en sustitución hacia adelante.`);
    }
    y[i] = (b[i] - sum) / L[i][i];
    steps.push({
      step: i + 1,
      variable: `y_${i + 1}`,
      value: y[i],
      formula: `(${b[i].toFixed(4)} - ${sum.toFixed(4)}) / ${L[i][i].toFixed(4)} = ${y[i].toFixed(4)}`
    });
  }

  return { y, steps };
}

/**
 * Sustitución hacia atrás: U * x = y
 */
export function backSubstitution(U, y) {
  const n = U.length;
  const x = new Array(n).fill(0);
  const steps = [];

  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) {
      sum += U[i][j] * x[j];
    }
    if (Math.abs(U[i][i]) < EPSILON) {
      throw new Error(`Elemento diagonal U[${i + 1}][${i + 1}] nulo en sustitución hacia atrás.`);
    }
    x[i] = (y[i] - sum) / U[i][i];
    steps.push({
      step: n - i,
      variable: `x_${i + 1}`,
      value: x[i],
      formula: `(${y[i].toFixed(4)} - ${sum.toFixed(4)}) / ${U[i][i].toFixed(4)} = ${x[i].toFixed(4)}`
    });
  }

  return { x, steps };
}

/**
 * Resuelve A * x = b usando descomposición LU (Doolittle o Crout).
 * Permite reutilizar las matrices L y U para resolver múltiples vectores b.
 */
export function solveLU(A, b, method = 'doolittle') {
  const n = A.length;
  if (b.length !== n) throw new Error('La longitud del vector b debe coincidir con la dimensión de A.');

  const decomposition = method === 'crout' ? croutLU(A) : doolittleLU(A);
  const { L, U } = decomposition;

  // 1. Resolver L * y = b
  const { y, steps: forwardSteps } = forwardSubstitution(L, b);
  // 2. Resolver U * x = y
  const { x, steps: backwardSteps } = backSubstitution(U, y);

  return {
    method: method === 'crout' ? 'LU (Crout)' : 'LU (Doolittle)',
    L,
    U,
    y,
    solution: x,
    decompSteps: decomposition.steps,
    forwardSteps,
    backwardSteps
  };
}

/**
 * Resuelve A * x = b usando descomposición de Cholesky (A = L * Lᵀ).
 */
export function solveCholesky(A, b) {
  const n = A.length;
  if (b.length !== n) throw new Error('La longitud del vector b debe coincidir con la dimensión de A.');

  const { L, LT, steps: decompSteps } = choleskyDecomposition(A);

  // 1. Resolver L * y = b
  const { y, steps: forwardSteps } = forwardSubstitution(L, b);
  // 2. Resolver Lᵀ * x = y
  const { x, steps: backwardSteps } = backSubstitution(LT, y);

  return {
    method: 'Cholesky (LLᵀ)',
    L,
    LT,
    y,
    solution: x,
    decompSteps,
    forwardSteps,
    backwardSteps
  };
}

/* =========================================================================
 * CÁLCULO DE VALORES Y VECTORES PROPIOS (EIGENVALUES & EIGENVECTORS)
 * ========================================================================= */

/**
 * Método de la Potencia (Power Method)
 * Encuentra el valor propio dominante (de mayor magnitud) y su vector propio normalizado.
 */
export function powerMethod(A, x0 = null, tol = 1e-6, maxIter = MAX_ITER) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  // Vector inicial x0 (por defecto [1, 1, ..., 1] normalizado)
  let x = x0 ? [...x0] : new Array(n).fill(1);
  let norm = vectorNorm(x);
  if (norm < EPSILON) throw new Error('El vector inicial x0 no puede ser el vector nulo.');
  x = x.map(val => val / norm);

  const iterations = [];
  let lambda = 0;
  let converged = false;

  for (let k = 1; k <= maxIter; k++) {
    const y = multiplyMatrixVector(A, x);
    // Cociente de Rayleigh: (xᵀ * y) / (xᵀ * x)
    const prevLambda = lambda;
    lambda = dotProduct(x, y) / dotProduct(x, x);

    const yNorm = vectorNorm(y);
    if (yNorm < EPSILON) {
      throw new Error(`En la iteración ${k}, el vector convergió a cero (posible valor propio nulo).`);
    }

    const nextX = y.map(val => val / yNorm);
    const error = k === 1 ? null : Math.abs(lambda - prevLambda);

    iterations.push({
      k,
      lambda,
      vector: [...nextX],
      error
    });

    if (k > 1 && error !== null && error < tol) {
      converged = true;
      x = nextX;
      break;
    }

    x = nextX;
  }

  return {
    method: 'Método de la Potencia (Dominante)',
    eigenvalue: lambda,
    eigenvector: x,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length} iteraciones con tolerancia |ε| < ${tol}.`
      : `ADVERTENCIA: No se alcanzó la convergencia tras ${maxIter} iteraciones.`
  };
}

/**
 * Método de la Potencia Inversa (Inverse Power Method con Shift)
 * Encuentra el valor propio más cercano a un desplazamiento (shift) μ (por defecto μ = 0 para el menor en magnitud).
 */
export function inversePowerMethod(A, shift = 0, x0 = null, tol = 1e-6, maxIter = MAX_ITER) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  // Matriz desplazada M = A - μ * I
  const M = cloneMatrix(A);
  for (let i = 0; i < n; i++) {
    M[i][i] -= shift;
  }

  let x = x0 ? [...x0] : new Array(n).fill(1);
  let norm = vectorNorm(x);
  if (norm < EPSILON) throw new Error('El vector inicial x0 no puede ser el vector nulo.');
  x = x.map(val => val / norm);

  const iterations = [];
  let lambda = 0;
  let converged = false;

  for (let k = 1; k <= maxIter; k++) {
    let y;
    try {
      const res = gaussianElimination(M, x);
      y = res.solution;
    } catch {
      // Si M es singular, shift es exactamente un valor propio
      return {
        method: 'Método de la Potencia Inversa',
        eigenvalue: shift,
        eigenvector: x,
        converged: true,
        iterations,
        shift,
        message: `El desplazamiento μ = ${shift} coincide exactamente con un valor propio de la matriz.`
      };
    }

    // Cociente de Rayleigh para M^-1
    const theta = dotProduct(x, y) / dotProduct(x, x);
    const prevLambda = lambda;
    lambda = shift + (Math.abs(theta) > EPSILON ? 1 / theta : 0);

    const yNorm = vectorNorm(y);
    if (yNorm < EPSILON) {
      throw new Error(`En la iteración ${k}, el vector convergió a cero.`);
    }

    const nextX = y.map(val => val / yNorm);
    const error = k === 1 ? null : Math.abs(lambda - prevLambda);

    iterations.push({
      k,
      lambda,
      vector: [...nextX],
      error
    });

    if (k > 1 && error !== null && error < tol) {
      converged = true;
      x = nextX;
      break;
    }

    x = nextX;
  }

  return {
    method: 'Método de la Potencia Inversa',
    eigenvalue: lambda,
    eigenvector: x,
    shift,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length} iteraciones con tolerancia |ε| < ${tol}.`
      : `ADVERTENCIA: No se alcanzó la convergencia tras ${maxIter} iteraciones.`
  };
}

/**
 * Algoritmo QR para el Espectro Completo de Autovalores.
 * Utiliza descomposición QR mediante Gram-Schmidt modificado iterativamente (A_{k+1} = R_k * Q_k).
 * Detecta valores propios reales y bloques 2x2 para pares conjugados complejos.
 */
export function qrAlgorithm(A, tol = 1e-6, maxIter = 200) {
  const n = A.length;
  if (n < 2) throw new Error('La dimensión de la matriz debe ser al menos 2x2.');
  for (let i = 0; i < n; i++) {
    if (A[i].length !== n) throw new Error('La matriz debe ser estrictamente cuadrada (n×n).');
  }

  let Ak = cloneMatrix(A);
  let converged = false;
  let iterationsCount = 0;

  for (let iter = 1; iter <= maxIter; iter++) {
    iterationsCount = iter;

    // Descomposición QR por Gram-Schmidt Modificado
    // Columnas de Ak
    const V = [];
    for (let j = 0; j < n; j++) {
      const col = [];
      for (let i = 0; i < n; i++) col.push(Ak[i][j]);
      V.push(col);
    }

    const Q_cols = [];
    const R = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      let v = [...V[i]];
      for (let j = 0; j < i; j++) {
        const qj = Q_cols[j];
        const r_ji = dotProduct(qj, v);
        R[j][i] = r_ji;
        for (let r = 0; r < n; r++) {
          v[r] -= r_ji * qj[r];
        }
      }

      const r_ii = vectorNorm(v);
      R[i][i] = r_ii;
      const q_i = r_ii > 1e-14 ? v.map(val => val / r_ii) : new Array(n).fill(0);
      Q_cols.push(q_i);
    }

    // Reconstruir matriz Q (n x n) donde columnas son Q_cols
    const Q = Array.from({ length: n }, (_, r) =>
      Array.from({ length: n }, (_, c) => Q_cols[c][r])
    );

    // Ak_next = R * Q
    const Ak_next = multiplyMatrices(R, Q);

    // Verificar si los elementos subdiagonales son menores que tol
    let subdiagMax = 0;
    for (let i = 1; i < n; i++) {
      // Ignorar subdiagonal si forma bloque 2x2 cuasi-triangular de Schur
      const subVal = Math.abs(Ak_next[i][i - 1]);
      if (subVal > subdiagMax) subdiagMax = subVal;
    }

    Ak = Ak_next;

    if (subdiagMax < tol) {
      converged = true;
      break;
    }
  }

  // Extraer autovalores de la forma cuasi-triangular de Schur (Ak)
  const eigenvalues = [];
  let i = 0;
  while (i < n) {
    if (i === n - 1 || Math.abs(Ak[i + 1][i]) < 1e-4) {
      // Autovalor real simple
      const realVal = Ak[i][i];
      eigenvalues.push({
        real: realVal,
        imag: 0,
        text: realVal.toFixed(6)
      });
      i++;
    } else {
      // Bloque 2x2: pares complejos conjugados o raíces de submatriz
      const a = Ak[i][i];
      const b = Ak[i][i + 1];
      const c = Ak[i + 1][i];
      const d = Ak[i + 1][i + 1];

      const tr = a + d;
      const det = a * d - b * c;
      const disc = tr * tr - 4 * det;

      if (disc >= 0) {
        const root1 = (tr + Math.sqrt(disc)) / 2;
        const root2 = (tr - Math.sqrt(disc)) / 2;
        eigenvalues.push({ real: root1, imag: 0, text: root1.toFixed(6) });
        eigenvalues.push({ real: root2, imag: 0, text: root2.toFixed(6) });
      } else {
        const realPart = tr / 2;
        const imagPart = Math.sqrt(-disc) / 2;
        eigenvalues.push({
          real: realPart,
          imag: imagPart,
          text: `${realPart.toFixed(6)} + ${imagPart.toFixed(6)}i`
        });
        eigenvalues.push({
          real: realPart,
          imag: -imagPart,
          text: `${realPart.toFixed(6)} - ${imagPart.toFixed(6)}i`
        });
      }
      i += 2;
    }
  }

  return {
    method: 'Algoritmo QR (Espectro Completo)',
    eigenvalues,
    iterations: iterationsCount,
    converged,
    finalMatrix: Ak
  };
}
