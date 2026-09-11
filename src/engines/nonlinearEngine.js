import { compileFunction1D, getDerivative } from './mathParser';

/**
 * MÓDULO 1: SOLUCIÓN DE ECUACIONES NO LINEALES (BÚSQUEDA DE RAÍCES)
 * Todos los métodos operan como funciones puras y respetan el límite duro de 100 iteraciones.
 */

const MAX_ITERATIONS = 100;
const ZERO_EPSILON = 1e-14;

/**
 * Método de Bisección
 * @param {string} expression - Función f(x)
 * @param {number} a - Extremo inferior del intervalo
 * @param {number} b - Extremo superior del intervalo
 * @param {number} tol - Tolerancia de error absoluto/relativo
 * @param {number} maxIter - Límite de iteraciones (máx 100)
 */
export function bisection(expression, a, b, tol = 1e-6, maxIter = MAX_ITERATIONS) {
  const { evaluate } = compileFunction1D(expression);
  const limit = Math.min(Math.max(1, maxIter), MAX_ITERATIONS);

  let fa = evaluate(a);
  let fb = evaluate(b);

  if (Math.abs(fa) < ZERO_EPSILON) {
    return {
      root: a,
      converged: true,
      iterations: [{ k: 1, a, b, xi: a, f_xi: fa, ea: 0, ea_percent: 0 }],
      message: `El extremo inferior a = ${a} es exactamente una raíz de f(x).`,
      method: 'Bisección',
      plotPoints: [{ x: a, y: fa, k: 1 }]
    };
  }

  if (Math.abs(fb) < ZERO_EPSILON) {
    return {
      root: b,
      converged: true,
      iterations: [{ k: 1, a, b, xi: b, f_xi: fb, ea: 0, ea_percent: 0 }],
      message: `El extremo superior b = ${b} es exactamente una raíz de f(x).`,
      method: 'Bisección',
      plotPoints: [{ x: b, y: fb, k: 1 }]
    };
  }

  // Teorema de Bolzano
  if (fa * fb > 0) {
    throw new Error(
      `Violación del Teorema de Bolzano: f(a) = ${fa.toFixed(6)} y f(b) = ${fb.toFixed(6)} tienen el mismo signo (${fa > 0 ? 'ambos positivos' : 'ambos negativos'}). No se puede garantizar la existencia de una raíz en el intervalo [${a}, ${b}]. Por favor, elija un intervalo donde los signos sean opuestos.`
    );
  }

  const iterations = [];
  const plotPoints = [];
  let currentA = a;
  let currentB = b;
  let xOld = null;
  let root = currentA;
  let converged = false;

  for (let k = 1; k <= limit; k++) {
    const xi = (currentA + currentB) / 2;
    const f_xi = evaluate(xi);

    let ea = null;
    let ea_percent = null;
    if (xOld !== null) {
      ea = Math.abs(xi - xOld);
      ea_percent = Math.abs(xi) > ZERO_EPSILON ? (ea / Math.abs(xi)) * 100 : ea * 100;
    }

    iterations.push({
      k,
      a: currentA,
      b: currentB,
      xi,
      f_xi,
      ea: ea !== null ? ea : Math.abs(currentB - currentA),
      ea_percent: ea_percent !== null ? ea_percent : 100
    });

    plotPoints.push({ x: xi, y: f_xi, k });
    root = xi;

    if (Math.abs(f_xi) < ZERO_EPSILON || (ea !== null && ea < tol)) {
      converged = true;
      break;
    }

    if (fa * f_xi < 0) {
      currentB = xi;
      fb = f_xi;
    } else {
      currentA = xi;
      fa = f_xi;
    }

    xOld = xi;
  }

  return {
    root,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada exitosamente en ${iterations.length} iteraciones.`
      : `ADVERTENCIA: No se alcanzó la tolerancia especificada (|ea| < ${tol}) tras el máximo de ${limit} iteraciones. El valor mostrado es la mejor aproximación alcanzada, no un resultado exacto.`,
    method: 'Bisección',
    plotPoints
  };
}

/**
 * Método de Regula Falsi (Falsa Posición)
 */
export function regulaFalsi(expression, a, b, tol = 1e-6, maxIter = MAX_ITERATIONS) {
  const { evaluate } = compileFunction1D(expression);
  const limit = Math.min(Math.max(1, maxIter), MAX_ITERATIONS);

  let fa = evaluate(a);
  let fb = evaluate(b);

  if (Math.abs(fa) < ZERO_EPSILON) {
    return {
      root: a,
      converged: true,
      iterations: [{ k: 1, a, b, xi: a, f_xi: fa, ea: 0, ea_percent: 0 }],
      message: `El extremo inferior a = ${a} es una raíz exacta de f(x).`,
      method: 'Regula Falsi',
      plotPoints: [{ x: a, y: fa, k: 1 }]
    };
  }

  if (Math.abs(fb) < ZERO_EPSILON) {
    return {
      root: b,
      converged: true,
      iterations: [{ k: 1, a, b, xi: b, f_xi: fb, ea: 0, ea_percent: 0 }],
      message: `El extremo superior b = ${b} es una raíz exacta de f(x).`,
      method: 'Regula Falsi',
      plotPoints: [{ x: b, y: fb, k: 1 }]
    };
  }

  if (fa * fb > 0) {
    throw new Error(
      `Violación del Teorema de Bolzano: f(a) y f(b) tienen el mismo signo. No se garantiza raíz en [${a}, ${b}]. Elija otro intervalo con cambio de signo.`
    );
  }

  const iterations = [];
  const plotPoints = [];
  let currentA = a;
  let currentB = b;
  let xOld = null;
  let root = currentA;
  let converged = false;

  for (let k = 1; k <= limit; k++) {
    const denominator = fb - fa;
    if (Math.abs(denominator) < ZERO_EPSILON) {
      throw new Error(
        `División entre cero: f(b) - f(a) ≈ 0 en la iteración ${k}. Los valores de la función son indistinguibles.`
      );
    }

    // Fórmula de Regula Falsi: xi = b - (fb * (b - a)) / (fb - fa)
    const xi = currentB - (fb * (currentB - currentA)) / denominator;
    const f_xi = evaluate(xi);

    let ea = null;
    let ea_percent = null;
    if (xOld !== null) {
      ea = Math.abs(xi - xOld);
      ea_percent = Math.abs(xi) > ZERO_EPSILON ? (ea / Math.abs(xi)) * 100 : ea * 100;
    }

    iterations.push({
      k,
      a: currentA,
      b: currentB,
      xi,
      f_xi,
      ea: ea !== null ? ea : Math.abs(currentB - currentA),
      ea_percent: ea_percent !== null ? ea_percent : 100
    });

    plotPoints.push({ x: xi, y: f_xi, k });
    root = xi;

    if (Math.abs(f_xi) < ZERO_EPSILON || (ea !== null && ea < tol)) {
      converged = true;
      break;
    }

    if (fa * f_xi < 0) {
      currentB = xi;
      fb = f_xi;
    } else {
      currentA = xi;
      fa = f_xi;
    }

    xOld = xi;
  }

  return {
    root,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada exitosamente en ${iterations.length} iteraciones.`
      : `ADVERTENCIA: No se alcanzó la tolerancia deseada (|ea| < ${tol}) en ${limit} iteraciones. Se presenta la mejor aproximación.`,
    method: 'Regula Falsi',
    plotPoints
  };
}

/**
 * Método de Newton-Raphson
 */
export function newtonRaphson(expression, x0, tol = 1e-6, maxIter = MAX_ITERATIONS) {
  const { evaluate } = compileFunction1D(expression);
  const { evaluateDerivative, isSymbolic } = getDerivative(expression, evaluate);
  const limit = Math.min(Math.max(1, maxIter), MAX_ITERATIONS);

  const iterations = [];
  const plotPoints = [];
  let currentX = x0;
  let root = currentX;
  let converged = false;

  for (let k = 1; k <= limit; k++) {
    const f_val = evaluate(currentX);
    const df_val = evaluateDerivative(currentX);

    // Caso límite: derivada nula
    if (Math.abs(df_val) < ZERO_EPSILON) {
      throw new Error(
        `División entre cero: La derivada f'(${currentX.toFixed(6)}) = 0 en la iteración ${k}. La recta tangente es horizontal. Sugerencia: cambie el punto inicial x0 o utilice el método de Bisección o Secante.`
      );
    }

    const nextX = currentX - f_val / df_val;
    const ea = Math.abs(nextX - currentX);
    const ea_percent = Math.abs(nextX) > ZERO_EPSILON ? (ea / Math.abs(nextX)) * 100 : ea * 100;

    iterations.push({
      k,
      xi: currentX,
      next_xi: nextX,
      f_xi: f_val,
      df_xi: df_val,
      ea,
      ea_percent
    });

    plotPoints.push({ x: currentX, y: f_val, k });
    root = nextX;

    if (Math.abs(f_val) < ZERO_EPSILON || ea < tol) {
      converged = true;
      // Guardar el punto final convergente
      plotPoints.push({ x: nextX, y: evaluate(nextX), k: k + 1 });
      break;
    }

    currentX = nextX;
  }

  return {
    root,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length} iteraciones. (Derivada: ${isSymbolic ? 'Analítica Simbólica' : 'Numérica Central de orden superior'}).`
      : `ADVERTENCIA: No se alcanzó la tolerancia (|ea| < ${tol}) en ${limit} iteraciones. Posible oscilación o divergencia. Se presenta el último valor calculado.`,
    method: 'Newton-Raphson',
    plotPoints
  };
}

/**
 * Método de la Secante
 */
export function secant(expression, x0, x1, tol = 1e-6, maxIter = MAX_ITERATIONS) {
  const { evaluate } = compileFunction1D(expression);
  const limit = Math.min(Math.max(1, maxIter), MAX_ITERATIONS);

  let currentX0 = x0;
  let currentX1 = x1;
  let f0 = evaluate(currentX0);
  let f1 = evaluate(currentX1);

  const iterations = [];
  const plotPoints = [
    { x: currentX0, y: f0, k: 0 },
    { x: currentX1, y: f1, k: 1 }
  ];

  let root = currentX1;
  let converged = false;

  for (let k = 1; k <= limit; k++) {
    const denominator = f1 - f0;

    // Caso límite: f(x1) - f(x0) = 0
    if (Math.abs(denominator) < ZERO_EPSILON) {
      throw new Error(
        `División entre cero: f(x₁) - f(x₀) = 0 en la iteración ${k} (f(${currentX1.toFixed(6)}) = ${f1.toFixed(6)} y f(${currentX0.toFixed(6)}) = ${f0.toFixed(6)}). Pendiente horizontal en la secante. Sugerencia: use puntos iniciales más separados o recurra al método de Bisección.`
      );
    }

    const xNext = currentX1 - (f1 * (currentX1 - currentX0)) / denominator;
    const fNext = evaluate(xNext);

    const ea = Math.abs(xNext - currentX1);
    const ea_percent = Math.abs(xNext) > ZERO_EPSILON ? (ea / Math.abs(xNext)) * 100 : ea * 100;

    iterations.push({
      k,
      x0: currentX0,
      x1: currentX1,
      xi: xNext,
      f_xi: fNext,
      ea,
      ea_percent
    });

    plotPoints.push({ x: xNext, y: fNext, k: k + 1 });
    root = xNext;

    if (Math.abs(fNext) < ZERO_EPSILON || ea < tol) {
      converged = true;
      break;
    }

    currentX0 = currentX1;
    f0 = f1;
    currentX1 = xNext;
    f1 = fNext;
  }

  return {
    root,
    converged,
    iterations,
    message: converged
      ? `Convergencia alcanzada en ${iterations.length} iteraciones.`
      : `ADVERTENCIA: No se alcanzó la tolerancia tras ${limit} iteraciones. Se presenta la mejor aproximación calculada.`,
    method: 'Secante',
    plotPoints
  };
}
