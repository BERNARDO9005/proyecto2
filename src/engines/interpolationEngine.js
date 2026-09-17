import * as math from 'mathjs';
import { formatNum } from './mathParser';

/**
 * MÓDULO 5: INTERPOLACIÓN Y AJUSTE DE CURVAS
 * - Polinomios de Lagrange
 * - Diferencias Divididas de Newton
 * - Splines Cúbicos (Condición Natural)
 */

/**
 * Valida que los puntos ingresados sean válidos y que no existan valores de x repetidos.
 * @param {Array<{x: number, y: number}>} points
 * @param {number} minPoints
 */
export function validatePoints(points, minPoints = 2) {
  if (!Array.isArray(points) || points.length < minPoints) {
    throw new Error(`Se requieren al menos ${minPoints} puntos para este método.`);
  }

  const sorted = [...points].sort((a, b) => a.x - b.x);
  const seenX = new Set();

  for (let i = 0; i < sorted.length; i++) {
    const pt = sorted[i];
    if (typeof pt.x !== 'number' || typeof pt.y !== 'number' || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) {
      throw new Error(`El punto en la fila ${i + 1} contiene coordenadas no numéricas o inválidas.`);
    }

    // Verificar unicidad de x con tolerancia numérica
    for (const prevX of seenX) {
      if (Math.abs(pt.x - prevX) < 1e-12) {
        throw new Error(
          `Abscisas duplicadas detectadas: x = ${pt.x}. Todos los valores de x deben ser estrictamente diferentes para interpolar.`
        );
      }
    }
    seenX.add(pt.x);
  }

  return sorted;
}

/**
 * 1. POLINOMIOS DE LAGRANGE
 * P(x) = sum_{i=0}^{n-1} y_i * L_i(x)
 * L_i(x) = prod_{j != i} (x - x_j) / (x_i - x_j)
 */
export function lagrangeInterpolation(rawPoints) {
  const points = validatePoints(rawPoints, 2);
  const n = points.length;

  // Construir términos base L_i(x)
  const basis = [];
  for (let i = 0; i < n; i++) {
    const xi = points[i].x;
    const yi = points[i].y;

    let denom = 1;
    const factors = [];

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const xj = points[j].x;
        denom *= (xi - xj);
        factors.push({
          xj,
          text: xj >= 0 ? `(x - ${formatNum(xj, 4)})` : `(x + ${formatNum(Math.abs(xj), 4)})`
        });
      }
    }

    const weight = yi / denom;
    basis.push({
      i,
      xi,
      yi,
      denominator: denom,
      weight,
      factors,
      latex: `L_{${i}}(x) = \\prod_{j \\neq ${i}} \\frac{x - x_j}{x_{${i}} - x_j}`
    });
  }

  // Función evaluadora
  const evaluate = (x) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
      let term = points[i].y;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          term *= (x - points[j].x) / (points[i].x - points[j].x);
        }
      }
      result += term;
    }
    return result;
  };

  // Construir representación simbólica/LaTeX
  const termsLatex = basis.map((b) => {
    const numParts = b.factors.map(f => f.xj >= 0 ? `(x - ${formatNum(f.xj, 3)})` : `(x + ${formatNum(Math.abs(f.xj), 3)})`).join('');
    const sign = b.yi >= 0 ? '+' : '-';
    return `${sign} \\frac{${formatNum(Math.abs(b.yi), 4)}}{${formatNum(b.denominator, 4)}} ${numParts}`;
  }).join(' \\\\[6pt] \n');

  const fullLatex = `P_{${n - 1}}(x) = \n\\begin{aligned}\n${termsLatex}\n\\end{aligned}`;

  // Expansión a forma canónica a_n x^n + ... + a_1 x + a_0 usando convolución de polinomios
  let expandedCoeffs = new Array(n).fill(0); // orden ascendente [c0, c1, c2, ...]
  for (let i = 0; i < n; i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    let denom = basis[i].denominator;

    // Convolución sucesiva de (x - xj)
    let poly = [1];
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const xj = points[j].x;
        // poly * (x - xj) = poly * x - xj * poly
        const nextPoly = new Array(poly.length + 1).fill(0);
        for (let k = 0; k < poly.length; k++) {
          nextPoly[k + 1] += poly[k];
          nextPoly[k] -= xj * poly[k];
        }
        poly = nextPoly;
      }
    }

    const scale = yi / denom;
    for (let k = 0; k < poly.length; k++) {
      expandedCoeffs[k] += poly[k] * scale;
    }
  }

  // Generar string del polinomio expandido
  const expandedTerms = [];
  for (let k = expandedCoeffs.length - 1; k >= 0; k--) {
    const coef = expandedCoeffs[k];
    if (Math.abs(coef) > 1e-10) {
      if (k === 0) {
        expandedTerms.push(formatNum(coef, 4));
      } else if (k === 1) {
        expandedTerms.push(`${formatNum(coef, 4)}x`);
      } else {
        expandedTerms.push(`${formatNum(coef, 4)}x^{${k}}`);
      }
    }
  }
  const expandedLatex = expandedTerms.length > 0 ? expandedTerms.join(' + ').replace(/\+\s*-/g, '- ') : '0';

  return {
    method: 'Polinomios de Lagrange',
    degree: n - 1,
    points,
    basis,
    evaluate,
    latex: fullLatex,
    expandedLatex: `P(x) = ${expandedLatex}`,
    expandedCoeffs
  };
}

/**
 * 2. DIFERENCIAS DIVIDIDAS DE NEWTON
 * P(x) = f[x0] + f[x0, x1](x - x0) + f[x0, x1, x2](x - x0)(x - x1) + ...
 */
export function newtonDividedDifferences(rawPoints) {
  const points = validatePoints(rawPoints, 2);
  const n = points.length;

  // Tabla piramidal de diferencias divididas
  // table[i][j] representa f[x_i, x_{i+1}, ..., x_{i+j}]
  const table = Array.from({ length: n }, () => new Array(n).fill(null));

  for (let i = 0; i < n; i++) {
    table[i][0] = points[i].y;
  }

  for (let j = 1; j < n; j++) {
    for (let i = 0; i < n - j; i++) {
      const num = table[i + 1][j - 1] - table[i][j - 1];
      const den = points[i + j].x - points[i].x;
      table[i][j] = num / den;
    }
  }

  // Los coeficientes del polinomio de Newton están en la primera fila table[0][k]
  const coefficients = [];
  for (let j = 0; j < n; j++) {
    coefficients.push({
      order: j,
      value: table[0][j]
    });
  }

  // Función evaluadora utilizando el esquema de Horner anidado
  const evaluate = (x) => {
    let result = table[0][n - 1];
    for (let j = n - 2; j >= 0; j--) {
      result = table[0][j] + (x - points[j].x) * result;
    }
    return result;
  };

  // Construcción de la fórmula en LaTeX
  const terms = [];
  for (let j = 0; j < n; j++) {
    const a_j = table[0][j];
    if (j === 0) {
      terms.push(formatNum(a_j, 4));
    } else {
      let factorStr = '';
      for (let k = 0; k < j; k++) {
        const xk = points[k].x;
        factorStr += xk >= 0 ? `(x - ${formatNum(xk, 3)})` : `(x + ${formatNum(Math.abs(xk), 3)})`;
      }
      const sign = a_j >= 0 ? '+' : '-';
      terms.push(`${sign} ${formatNum(Math.abs(a_j), 4)} ${factorStr}`);
    }
  }

  const latex = `P_{${n - 1}}(x) = ${terms.join(' ')}`;

  // Formatear tabla para visualización en UI
  const tableRows = points.map((p, i) => {
    const row = {
      i,
      x: p.x,
      y: p.y
    };
    for (let j = 1; j < n; j++) {
      row[`diff_${j}`] = table[i][j];
    }
    return row;
  });

  return {
    method: 'Diferencias Divididas de Newton',
    degree: n - 1,
    points,
    table,
    tableRows,
    coefficients,
    evaluate,
    latex
  };
}

/**
 * 3. SPLINES CÚBICOS (Condición Natural)
 * En cada intervalo [x_i, x_{i+1}]:
 * S_i(x) = a_i + b_i(x - x_i) + c_i(x - x_i)^2 + d_i(x - x_i)^3
 * Condición natural: S''(x_0) = S''(x_{n-1}) = 0 (M_0 = M_{n-1} = 0)
 */
export function cubicSplineNatural(rawPoints) {
  const points = validatePoints(rawPoints, 3);
  const n = points.length; // n puntos, n-1 intervalos

  const numIntervals = n - 1;
  const h = new Array(numIntervals);
  const alpha = new Array(numIntervals);

  for (let i = 0; i < numIntervals; i++) {
    h[i] = points[i + 1].x - points[i].x;
    if (h[i] <= 0) {
      throw new Error('Los puntos deben estar estrictamente ordenados y sin abscisas repetidas.');
    }
  }

  // Construir sistema tridiagonal para las segundas derivadas M_i = S''(x_i)
  // Para spline natural: M_0 = 0, M_{n-1} = 0
  // Para i = 1 hasta n-2:
  // h_{i-1} * M_{i-1} + 2*(h_{i-1} + h_i) * M_i + h_i * M_{i+1} = 6 * [ (y_{i+1} - y_i)/h_i - (y_i - y_{i-1})/h_{i-1} ]
  const m = numIntervals - 1; // número de incógnitas interiores: M_1 ... M_{n-2}
  const M = new Array(n).fill(0);

  if (m > 0) {
    const A = Array.from({ length: m }, () => new Array(m).fill(0));
    const B = new Array(m).fill(0);

    for (let i = 1; i < n - 1; i++) {
      const row = i - 1;
      const d1 = (points[i + 1].y - points[i].y) / h[i];
      const d0 = (points[i].y - points[i - 1].y) / h[i - 1];
      B[row] = 6 * (d1 - d0);

      A[row][row] = 2 * (h[i - 1] + h[i]);
      if (row > 0) {
        A[row][row - 1] = h[i - 1];
      }
      if (row < m - 1) {
        A[row][row + 1] = h[i];
      }
    }

    // Resolución directa mediante eliminación de Thomas para matriz tridiagonal
    const cPrime = new Array(m).fill(0);
    const dPrime = new Array(m).fill(0);

    cPrime[0] = (A[0][1] || 0) / A[0][0];
    dPrime[0] = B[0] / A[0][0];

    for (let i = 1; i < m; i++) {
      const a = A[i][i - 1];
      const b = A[i][i];
      const c = i < m - 1 ? A[i][i + 1] : 0;
      const denom = b - a * cPrime[i - 1];
      cPrime[i] = c / denom;
      dPrime[i] = (B[i] - a * dPrime[i - 1]) / denom;
    }

    const solM = new Array(m).fill(0);
    solM[m - 1] = dPrime[m - 1];
    for (let i = m - 2; i >= 0; i--) {
      solM[i] = dPrime[i] - cPrime[i] * solM[i + 1];
    }

    for (let i = 1; i < n - 1; i++) {
      M[i] = solM[i - 1];
    }
  }

  // Con M_i calculados, derivamos los coeficientes a_i, b_i, c_i, d_i de cada tramo:
  // S_i(x) = a_i + b_i*(x - x_i) + c_i*(x - x_i)^2 + d_i*(x - x_i)^3
  const intervals = [];
  for (let i = 0; i < numIntervals; i++) {
    const x_i = points[i].x;
    const x_next = points[i + 1].x;
    const y_i = points[i].y;
    const y_next = points[i + 1].y;
    const hi = h[i];

    const a_i = y_i;
    const c_i = M[i] / 2;
    const d_i = (M[i + 1] - M[i]) / (6 * hi);
    const b_i = (y_next - y_i) / hi - (hi / 6) * (2 * M[i] + M[i + 1]);

    const formulaLatex = `S_{${i}}(x) = ${formatNum(a_i, 4)} ${b_i >= 0 ? '+' : '-'} ${formatNum(Math.abs(b_i), 4)}(x - ${formatNum(x_i, 3)}) ${c_i >= 0 ? '+' : '-'} ${formatNum(Math.abs(c_i), 4)}(x - ${formatNum(x_i, 3)})^2 ${d_i >= 0 ? '+' : '-'} ${formatNum(Math.abs(d_i), 4)}(x - ${formatNum(x_i, 3)})^3`;

    intervals.push({
      i,
      x0: x_i,
      x1: x_next,
      y0: y_i,
      y1: y_next,
      h: hi,
      a: a_i,
      b: b_i,
      c: c_i,
      d: d_i,
      M0: M[i],
      M1: M[i + 1],
      formulaLatex,
      evaluate: (x) => {
        const dx = x - x_i;
        return a_i + b_i * dx + c_i * Math.pow(dx, 2) + d_i * Math.pow(dx, 3);
      }
    });
  }

  // Función evaluadora global para cualquier x en el dominio [x_0, x_{n-1}]
  const evaluate = (x) => {
    if (x <= intervals[0].x0) {
      return intervals[0].evaluate(x);
    }
    if (x >= intervals[numIntervals - 1].x1) {
      return intervals[numIntervals - 1].evaluate(x);
    }
    for (let i = 0; i < numIntervals; i++) {
      if (x >= intervals[i].x0 && x <= intervals[i].x1) {
        return intervals[i].evaluate(x);
      }
    }
    return intervals[numIntervals - 1].evaluate(x);
  };

  return {
    method: 'Splines Cúbicos Naturales',
    numIntervals,
    points,
    intervals,
    secondDerivatives: M,
    evaluate
  };
}
