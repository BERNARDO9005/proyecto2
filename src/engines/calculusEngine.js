import { compileFunction1D } from './mathParser';

/**
 * MÓDULO 3: DIFERENCIACIÓN E INTEGRACIÓN NUMÉRICA
 * Funciones puras con validación estricta de dominios, ajuste automático de subintervalos
 * y estimación analítica/numérica del error.
 */

/**
 * Evalúa f(x) en una lista de puntos con detección precisa del subintervalo que falla.
 */
function evaluatePointsSafely(evaluate, points, a, b) {
  const values = [];
  for (let i = 0; i < points.length; i++) {
    const x = points[i];
    try {
      const y = evaluate(x);
      if (!Number.isFinite(y) || Number.isNaN(y)) {
        throw new Error('Valor infinito o indeterminado (NaN)');
      }
      values.push(y);
    } catch (err) {
      const prevX = i > 0 ? points[i - 1].toFixed(4) : a.toFixed(4);
      const nextX = i < points.length - 1 ? points[i + 1].toFixed(4) : b.toFixed(4);
      throw new Error(
        `Error de dominio en x = ${x.toFixed(6)} (subintervalo [${prevX}, ${nextX}]): ${err.message}. La función no está definida en los reales en este punto.`
      );
    }
  }
  return values;
}

/**
 * Estima numéricamente la 2da y 4ta derivada promedio para estimaciones del error de truncamiento
 */
function estimateDerivatives(evaluate, a, b, samples = 20) {
  let sumD2 = 0;
  let maxD2 = 0;
  let sumD4 = 0;
  let maxD4 = 0;
  const h = (b - a) / samples;
  const dh = 1e-4;

  let validD2Count = 0;
  let validD4Count = 0;

  for (let i = 0; i <= samples; i++) {
    const x = a + i * h;
    try {
      const f_p1 = evaluate(x + dh);
      const f_m1 = evaluate(x - dh);
      const f_0 = evaluate(x);
      const d2 = (f_p1 - 2 * f_0 + f_m1) / (dh * dh);
      if (Number.isFinite(d2)) {
        sumD2 += Math.abs(d2);
        if (Math.abs(d2) > maxD2) maxD2 = Math.abs(d2);
        validD2Count++;
      }

      const f_p2 = evaluate(x + 2 * dh);
      const f_m2 = evaluate(x - 2 * dh);
      const d4 = (f_p2 - 4 * f_p1 + 6 * f_0 - 4 * f_m1 + f_m2) / Math.pow(dh, 4);
      if (Number.isFinite(d4)) {
        sumD4 += Math.abs(d4);
        if (Math.abs(d4) > maxD4) maxD4 = Math.abs(d4);
        validD4Count++;
      }
    } catch {
      // Ignorar puntos de frontera con ruido numérico
    }
  }

  const avgD2 = validD2Count > 0 ? sumD2 / validD2Count : 0;
  const avgD4 = validD4Count > 0 ? sumD4 / validD4Count : 0;
  return { avgD2, maxD2, avgD4, maxD4 };
}

/**
 * Método del Trapecio Simple
 */
export function trapezoidalSimple(expression, a, b) {
  if (a >= b) throw new Error('El límite superior b debe ser mayor que el límite inferior a.');
  const { evaluate } = compileFunction1D(expression);

  const [fa, fb] = evaluatePointsSafely(evaluate, [a, b], a, b);
  const h = b - a;
  const integral = (h / 2) * (fa + fb);

  const { maxD2 } = estimateDerivatives(evaluate, a, b, 10);
  const estimatedError = (Math.pow(h, 3) / 12) * maxD2;

  return {
    method: 'Trapecio Simple',
    result: integral,
    n: 1,
    h,
    estimatedError,
    points: [
      { i: 0, x: a, fx: fa },
      { i: 1, x: b, fx: fb }
    ],
    polygonPoints: [
      { x: a, y: 0 },
      { x: a, y: fa },
      { x: b, y: fb },
      { x: b, y: 0 }
    ],
    adjustmentNotice: null
  };
}

/**
 * Método del Trapecio Compuesto
 */
export function trapezoidalComposite(expression, a, b, n) {
  if (a >= b) throw new Error('El límite superior b debe ser mayor que el límite inferior a.');
  const parsedN = parseInt(n, 10);
  if (!parsedN || parsedN < 1) throw new Error('El número de subintervalos n debe ser un entero positivo mayor o igual a 1.');

  const { evaluate } = compileFunction1D(expression);
  const h = (b - a) / parsedN;
  const xPoints = [];
  for (let i = 0; i <= parsedN; i++) {
    xPoints.push(a + i * h);
  }

  const yPoints = evaluatePointsSafely(evaluate, xPoints, a, b);

  let sumInterior = 0;
  for (let i = 1; i < parsedN; i++) {
    sumInterior += yPoints[i];
  }

  const integral = (h / 2) * (yPoints[0] + 2 * sumInterior + yPoints[parsedN]);

  const { avgD2 } = estimateDerivatives(evaluate, a, b, Math.min(parsedN, 30));
  const estimatedError = ((b - a) * Math.pow(h, 2) / 12) * avgD2;

  const points = xPoints.map((x, i) => ({ i, x, fx: yPoints[i] }));

  return {
    method: 'Trapecio Compuesto',
    result: integral,
    n: parsedN,
    h,
    estimatedError,
    points,
    adjustmentNotice: null
  };
}

/**
 * Método de Simpson 1/3 Compuesto
 * Valida estrictamente n par. Si no cumple, ajusta automáticamente al valor válido más cercano y notifica.
 */
export function simpson13Composite(expression, a, b, nInput) {
  if (a >= b) throw new Error('El límite superior b debe ser mayor que el límite inferior a.');
  let n = parseInt(nInput, 10);
  if (!n || n < 2) n = 2;

  let adjustmentNotice = null;
  if (n % 2 !== 0) {
    const adjustedN = n + 1;
    adjustmentNotice = `Ajuste automático: Simpson 1/3 requiere estrictamente un número PAR de subintervalos. El valor ingresado (n = ${n}) se ajustó automáticamente a n = ${adjustedN}.`;
    n = adjustedN;
  }

  const { evaluate } = compileFunction1D(expression);
  const h = (b - a) / n;
  const xPoints = [];
  for (let i = 0; i <= n; i++) {
    xPoints.push(a + i * h);
  }

  const yPoints = evaluatePointsSafely(evaluate, xPoints, a, b);

  let sumOdds = 0;
  let sumEvens = 0;

  for (let i = 1; i < n; i++) {
    if (i % 2 === 1) {
      sumOdds += yPoints[i];
    } else {
      sumEvens += yPoints[i];
    }
  }

  const integral = (h / 3) * (yPoints[0] + 4 * sumOdds + 2 * sumEvens + yPoints[n]);

  const { avgD4 } = estimateDerivatives(evaluate, a, b, Math.min(n, 30));
  const estimatedError = ((b - a) * Math.pow(h, 4) / 180) * avgD4;

  const points = xPoints.map((x, i) => ({ i, x, fx: yPoints[i] }));

  return {
    method: 'Simpson 1/3 Compuesto',
    result: integral,
    n,
    h,
    estimatedError,
    points,
    adjustmentNotice
  };
}

/**
 * Método de Simpson 3/8 Compuesto
 * Valida estrictamente que n sea múltiplo de 3. Si no cumple, ajusta automáticamente y notifica.
 */
export function simpson38Composite(expression, a, b, nInput) {
  if (a >= b) throw new Error('El límite superior b debe ser mayor que el límite inferior a.');
  let n = parseInt(nInput, 10);
  if (!n || n < 3) n = 3;

  let adjustmentNotice = null;
  if (n % 3 !== 0) {
    const remainder = n % 3;
    const adjustedN = remainder === 1 ? n + 2 : n + 1; // Ajusta al siguiente múltiplo de 3 más cercano
    adjustmentNotice = `Ajuste automático: Simpson 3/8 requiere estrictamente que n sea múltiplo de 3. El valor ingresado (n = ${n}) se ajustó automáticamente al múltiplo más cercano válido: n = ${adjustedN}.`;
    n = adjustedN;
  }

  const { evaluate } = compileFunction1D(expression);
  const h = (b - a) / n;
  const xPoints = [];
  for (let i = 0; i <= n; i++) {
    xPoints.push(a + i * h);
  }

  const yPoints = evaluatePointsSafely(evaluate, xPoints, a, b);

  let sumNonMultiplesOf3 = 0;
  let sumMultiplesOf3 = 0;

  for (let i = 1; i < n; i++) {
    if (i % 3 === 0) {
      sumMultiplesOf3 += yPoints[i];
    } else {
      sumNonMultiplesOf3 += yPoints[i];
    }
  }

  const integral = ((3 * h) / 8) * (yPoints[0] + 3 * sumNonMultiplesOf3 + 2 * sumMultiplesOf3 + yPoints[n]);

  const { avgD4 } = estimateDerivatives(evaluate, a, b, Math.min(n, 30));
  const estimatedError = ((b - a) * Math.pow(h, 4) / 80) * avgD4;

  const points = xPoints.map((x, i) => ({ i, x, fx: yPoints[i] }));

  return {
    method: 'Simpson 3/8 Compuesto',
    result: integral,
    n,
    h,
    estimatedError,
    points,
    adjustmentNotice
  };
}

/**
 * Diferenciación Numérica por Diferencias Finitas (1er y 2do orden)
 */
export function computeFiniteDifferences(expression, x0, h) {
  if (h <= 0) throw new Error('El tamaño de paso h debe ser estrictamente mayor que cero.');

  const { evaluate } = compileFunction1D(expression);

  // Comprobar dominio en puntos x0, x0 ± h, x0 ± 2h
  const samplePoints = [x0 - 2 * h, x0 - h, x0, x0 + h, x0 + 2 * h];
  evaluatePointsSafely(evaluate, samplePoints, x0 - 2 * h, x0 + 2 * h);

  const fx0 = evaluate(x0);
  const fx_plus_h = evaluate(x0 + h);
  const fx_minus_h = evaluate(x0 - h);
  const fx_plus_2h = evaluate(x0 + 2 * h);
  const fx_minus_2h = evaluate(x0 - 2 * h);

  // Primera derivada - 1er orden
  const forward1 = (fx_plus_h - fx0) / h;
  const backward1 = (fx0 - fx_minus_h) / h;

  // Primera derivada - 2do orden
  const central1 = (fx_plus_h - fx_minus_h) / (2 * h);
  const forward2 = (-fx_plus_2h + 4 * fx_plus_h - 3 * fx0) / (2 * h);
  const backward2 = (3 * fx0 - 4 * fx_minus_h + fx_minus_2h) / (2 * h);

  // Primera derivada - 4to orden (centrada de alta precisión)
  const centralHighOrder = (-fx_plus_2h + 8 * fx_plus_h - 8 * fx_minus_h + fx_minus_2h) / (12 * h);

  // Segunda derivada
  const secondCentral = (fx_plus_h - 2 * fx0 + fx_minus_h) / (h * h);
  const secondForward = (fx_plus_2h - 2 * fx_plus_h + fx0) / (h * h);
  const secondBackward = (fx0 - 2 * fx_minus_h + fx_minus_2h) / (h * h);

  return {
    x0,
    h,
    fx0,
    firstDerivative: {
      forward1: { value: forward1, formula: "\\frac{f(x+h) - f(x)}{h}", order: "O(h)" },
      backward1: { value: backward1, formula: "\\frac{f(x) - f(x-h)}{h}", order: "O(h)" },
      central1: { value: central1, formula: "\\frac{f(x+h) - f(x-h)}{2h}", order: "O(h^2)" },
      forward2: { value: forward2, formula: "\\frac{-f(x+2h) + 4f(x+h) - 3f(x)}{2h}", order: "O(h^2)" },
      backward2: { value: backward2, formula: "\\frac{3f(x) - 4f(x-h) + f(x-2h)}{2h}", order: "O(h^2)" },
      central4: { value: centralHighOrder, formula: "\\frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}", order: "O(h^4)" }
    },
    secondDerivative: {
      central: { value: secondCentral, formula: "\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}", order: "O(h^2)" },
      forward: { value: secondForward, formula: "\\frac{f(x+2h) - 2f(x+h) + f(x)}{h^2}", order: "O(h)" },
      backward: { value: secondBackward, formula: "\\frac{f(x) - 2f(x-h) + f(x-2h)}{h^2}", order: "O(h)" }
    },
    evaluations: [
      { point: 'x - 2h', x: x0 - 2 * h, fx: fx_minus_2h },
      { point: 'x - h', x: x0 - h, fx: fx_minus_h },
      { point: 'x', x: x0, fx: fx0 },
      { point: 'x + h', x: x0 + h, fx: fx_plus_h },
      { point: 'x + 2h', x: x0 + 2 * h, fx: fx_plus_2h }
    ]
  };
}
