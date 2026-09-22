import { compileFunction2D, compileSystemFunction } from './mathParser';

/**
 * MÓDULO 4: ECUACIONES DIFERENCIALES ORDINARIAS (EDO)
 * Métodos numéricos para problemas de valor inicial: dy/dx = f(x, y), y(x0) = y0.
 */

const MAX_STEPS_ALLOWED = 10000;

/**
 * Valida los parámetros de entrada del problema de valor inicial.
 */
function validateOdeInputs(x0, y0, xf, h) {
  if (typeof x0 !== 'number' || typeof y0 !== 'number' || typeof xf !== 'number' || typeof h !== 'number') {
    throw new Error('Todos los parámetros (x0, y0, xf, h) deben ser valores numéricos válidos.');
  }

  if (h <= 0) {
    throw new Error('El tamaño de paso h debe ser estrictamente positivo (h > 0).');
  }

  if (xf <= x0) {
    throw new Error(`El valor final xf (${xf}) debe ser estrictamente mayor que el valor inicial x0 (${x0}).`);
  }

  const rawSteps = (xf - x0) / h;
  const numSteps = Math.round(rawSteps);

  if (numSteps <= 0) {
    throw new Error('El intervalo [x0, xf] con el paso h no genera pasos válidos.');
  }

  if (numSteps > MAX_STEPS_ALLOWED) {
    throw new Error(
      `El número de pasos (${numSteps}) excede el límite seguro de ${MAX_STEPS_ALLOWED}. Aumente el tamaño de paso h o reduzca el intervalo.`
    );
  }

  const discrepancy = Math.abs(numSteps * h - (xf - x0));
  if (discrepancy > 1e-3) {
    // Advertencia de que (xf - x0) no es múltiplo exacto de h
  }

  return numSteps;
}

/**
 * Método de Euler Clásico
 */
export function euler(expression, x0, y0, xf, h) {
  const numSteps = validateOdeInputs(x0, y0, xf, h);
  const { evaluate } = compileFunction2D(expression);

  const trajectory = [];
  let currentX = x0;
  let currentY = y0;

  for (let i = 0; i <= numSteps; i++) {
    let slope = 0;
    try {
      slope = evaluate(currentX, currentY);
    } catch (err) {
      throw new Error(`Error evaluando f(x, y) en el paso ${i} (x = ${currentX.toFixed(4)}, y = ${currentY.toFixed(4)}): ${err.message}`);
    }

    trajectory.push({
      i,
      x: currentX,
      y: currentY,
      slope,
      k1: slope
    });

    if (i === numSteps) break;

    currentY = currentY + h * slope;
    currentX = x0 + (i + 1) * h;

    if (!Number.isFinite(currentY)) {
      throw new Error(`Inestabilidad numérica o desbordamiento en el paso ${i + 1} (x = ${currentX.toFixed(4)}). La solución diverge.`);
    }
  }

  return {
    method: 'Euler Clásico',
    x0,
    y0,
    xf,
    h,
    numSteps,
    finalY: trajectory[trajectory.length - 1].y,
    trajectory
  };
}

/**
 * Método de Euler Modificado (Heun / Predictor-Corrector)
 */
export function heun(expression, x0, y0, xf, h) {
  const numSteps = validateOdeInputs(x0, y0, xf, h);
  const { evaluate } = compileFunction2D(expression);

  const trajectory = [];
  let currentX = x0;
  let currentY = y0;

  for (let i = 0; i <= numSteps; i++) {
    let slope = 0;
    try {
      slope = evaluate(currentX, currentY);
    } catch (err) {
      throw new Error(`Error en el paso ${i} (x = ${currentX.toFixed(4)}, y = ${currentY.toFixed(4)}): ${err.message}`);
    }

    if (i === numSteps) {
      trajectory.push({
        i,
        x: currentX,
        y: currentY,
        slope,
        yPredictor: null
      });
      break;
    }

    // Predictor (Euler ordinario)
    const yPred = currentY + h * slope;
    const nextX = x0 + (i + 1) * h;
    let nextSlope = 0;
    try {
      nextSlope = evaluate(nextX, yPred);
    } catch (err) {
      throw new Error(`Error evaluando corrector en paso ${i + 1} (x = ${nextX.toFixed(4)}, yPred = ${yPred.toFixed(4)}): ${err.message}`);
    }

    // Corrector (promedio de pendientes)
    const correctedY = currentY + (h / 2) * (slope + nextSlope);

    trajectory.push({
      i,
      x: currentX,
      y: currentY,
      slope,
      yPredictor: yPred,
      slopePredictor: nextSlope
    });

    currentX = nextX;
    currentY = correctedY;

    if (!Number.isFinite(currentY)) {
      throw new Error(`Inestabilidad numérica en x = ${currentX.toFixed(4)}.`);
    }
  }

  return {
    method: 'Euler Modificado (Heun)',
    x0,
    y0,
    xf,
    h,
    numSteps,
    finalY: trajectory[trajectory.length - 1].y,
    trajectory
  };
}

/**
 * Método de Runge-Kutta de 4to Orden (RK4)
 */
export function rk4(expression, x0, y0, xf, h) {
  const numSteps = validateOdeInputs(x0, y0, xf, h);
  const { evaluate } = compileFunction2D(expression);

  const trajectory = [];
  let currentX = x0;
  let currentY = y0;

  for (let i = 0; i <= numSteps; i++) {
    if (i === numSteps) {
      let finalSlope = 0;
      try {
        finalSlope = evaluate(currentX, currentY);
      } catch {
        finalSlope = 0;
      }
      trajectory.push({
        i,
        x: currentX,
        y: currentY,
        k1: finalSlope,
        k2: null,
        k3: null,
        k4: null
      });
      break;
    }

    let k1, k2, k3, k4;
    try {
      k1 = evaluate(currentX, currentY);
      k2 = evaluate(currentX + 0.5 * h, currentY + 0.5 * h * k1);
      k3 = evaluate(currentX + 0.5 * h, currentY + 0.5 * h * k2);
      k4 = evaluate(currentX + h, currentY + h * k3);
    } catch (err) {
      throw new Error(`Error en RK4 en paso ${i} (x = ${currentX.toFixed(4)}, y = ${currentY.toFixed(4)}): ${err.message}`);
    }

    const nextY = currentY + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

    trajectory.push({
      i,
      x: currentX,
      y: currentY,
      k1,
      k2,
      k3,
      k4
    });

    currentX = x0 + (i + 1) * h;
    currentY = nextY;

    if (!Number.isFinite(currentY)) {
      throw new Error(`Desbordamiento o divergencia en RK4 en x = ${currentX.toFixed(4)}.`);
    }
  }

  return {
    method: 'Runge-Kutta 4° Orden (RK4)',
    x0,
    y0,
    xf,
    h,
    numSteps,
    finalY: trajectory[trajectory.length - 1].y,
    trajectory
  };
}

/**
 * Resuelve y compara los tres métodos simultáneamente para el mismo problema
 */
export function solveAllOdeMethods(expression, x0, y0, xf, h) {
  const eulerRes = euler(expression, x0, y0, xf, h);
  const heunRes = heun(expression, x0, y0, xf, h);
  const rk4Res = rk4(expression, x0, y0, xf, h);

  return {
    euler: eulerRes,
    heun: heunRes,
    rk4: rk4Res
  };
}

/**
 * Método de Runge-Kutta de 4to Orden para Sistemas de EDOs Acopladas de 1er Orden:
 * dy1/dt = f1(t, y1, y2)
 * dy2/dt = f2(t, y1, y2)
 */
export function rk4System(f1Expr, f2Expr, t0, y1_0, y2_0, tf, h, options = {}) {
  const numSteps = validateOdeInputs(t0, y1_0, tf, h);
  if (typeof y2_0 !== 'number' || !Number.isFinite(y2_0)) {
    throw new Error('El valor inicial y2_0 debe ser un número finito válido.');
  }

  const { evaluate: evalF1 } = compileSystemFunction(f1Expr);
  const { evaluate: evalF2 } = compileSystemFunction(f2Expr);

  const trajectory = [];
  let currentT = t0;
  let currentY1 = y1_0;
  let currentY2 = y2_0;

  for (let i = 0; i <= numSteps; i++) {
    if (i === numSteps) {
      trajectory.push({
        i,
        t: currentT,
        y1: currentY1,
        y2: currentY2,
        k1_1: null,
        k1_2: null,
        k2_1: null,
        k2_2: null,
        k3_1: null,
        k3_2: null,
        k4_1: null,
        k4_2: null
      });
      break;
    }

    let k1_1, k1_2, k2_1, k2_2, k3_1, k3_2, k4_1, k4_2;

    try {
      // k1
      k1_1 = evalF1(currentT, currentY1, currentY2);
      k1_2 = evalF2(currentT, currentY1, currentY2);

      // k2
      const tHalf = currentT + 0.5 * h;
      const y1_k2 = currentY1 + 0.5 * h * k1_1;
      const y2_k2 = currentY2 + 0.5 * h * k1_2;
      k2_1 = evalF1(tHalf, y1_k2, y2_k2);
      k2_2 = evalF2(tHalf, y1_k2, y2_k2);

      // k3
      const y1_k3 = currentY1 + 0.5 * h * k2_1;
      const y2_k3 = currentY2 + 0.5 * h * k2_2;
      k3_1 = evalF1(tHalf, y1_k3, y2_k3);
      k3_2 = evalF2(tHalf, y1_k3, y2_k3);

      // k4
      const tFull = currentT + h;
      const y1_k4 = currentY1 + h * k3_1;
      const y2_k4 = currentY2 + h * k3_2;
      k4_1 = evalF1(tFull, y1_k4, y2_k4);
      k4_2 = evalF2(tFull, y1_k4, y2_k4);
    } catch (err) {
      throw new Error(`Error en RK4 de sistema en paso ${i} (t = ${currentT.toFixed(4)}): ${err.message}`);
    }

    const nextY1 = currentY1 + (h / 6) * (k1_1 + 2 * k2_1 + 2 * k3_1 + k4_1);
    const nextY2 = currentY2 + (h / 6) * (k1_2 + 2 * k2_2 + 2 * k3_2 + k4_2);

    trajectory.push({
      i,
      t: currentT,
      y1: currentY1,
      y2: currentY2,
      k1_1,
      k1_2,
      k2_1,
      k2_2,
      k3_1,
      k3_2,
      k4_1,
      k4_2
    });

    currentT = t0 + (i + 1) * h;
    currentY1 = nextY1;
    currentY2 = nextY2;

    if (!Number.isFinite(currentY1) || !Number.isFinite(currentY2)) {
      throw new Error(`Inestabilidad numérica o divergencia en t = ${currentT.toFixed(4)}.`);
    }
  }

  return {
    method: options.isSecondOrder ? 'RK4 para EDO de 2° Orden' : 'RK4 para Sistemas de EDOs',
    t0,
    tf,
    h,
    numSteps,
    finalY1: trajectory[trajectory.length - 1].y1,
    finalY2: trajectory[trajectory.length - 1].y2,
    var1Label: options.var1Label || 'y_1',
    var2Label: options.var2Label || 'y_2',
    isSecondOrder: !!options.isSecondOrder,
    trajectory
  };
}

/**
 * Método de Runge-Kutta 4to Orden para EDO de 2do Orden:
 * y'' = f(t, y, y') con y(t0) = y0, y'(t0) = v0.
 * Reducción canónica a sistema:
 * y1 = y, y2 = y'
 * dy1/dt = y2
 * dy2/dt = f(t, y1, y2)
 */
export function rk4SecondOrder(expr, t0, y0, v0, tf, h) {
  return rk4System('y2', expr, t0, y0, v0, tf, h, {
    isSecondOrder: true,
    var1Label: 'y(t) (Posición)',
    var2Label: "y'(t) (Velocidad)"
  });
}

/* =========================================================================
 * RUNGE-KUTTA ADAPTATIVO (RK45 / DORMAND-PRINCE)
 * ========================================================================= */

// Coeficientes del Tableau de Butcher para Dormand-Prince (DP54 / RK45)
const DP_C = [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
const DP_A = [
  [],
  [1 / 5],
  [3 / 40, 9 / 40],
  [44 / 45, -56 / 15, 32 / 9],
  [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
  [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
  [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]
];
const DP_B5 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
const DP_E = [
  71 / 57600,
  0,
  -71 / 16695,
  71 / 1920,
  -17253 / 339200,
  22 / 525,
  -1 / 40
];

/**
 * Runge-Kutta Adaptativo de Orden 4(5) (Dormand-Prince / RK45).
 * Control automático del tamaño de paso h según tolerancia al error local.
 */
export function rk45(expression, t0, y0, tf, options = {}) {
  if (typeof t0 !== 'number' || typeof y0 !== 'number' || typeof tf !== 'number') {
    throw new Error('Los parámetros iniciales (t0, y0, tf) deben ser valores numéricos.');
  }
  if (tf <= t0) {
    throw new Error(`El tiempo final tf (${tf}) debe ser mayor que el tiempo inicial t0 (${t0}).`);
  }

  const tol = typeof options.tol === 'number' && options.tol > 0 ? options.tol : 1e-5;
  const hMin = options.hMin || 1e-12;
  const hMax = options.hMax || (tf - t0);
  let h = options.h0 || Math.min(0.05, (tf - t0) / 20);

  const { evaluate } = compileFunction2D(expression);

  const trajectory = [];
  const allAttempts = [];

  let t = t0;
  let y = y0;
  let stepCount = 0;
  let acceptedCount = 0;
  let rejectedCount = 0;

  trajectory.push({
    i: 0,
    t,
    y,
    h,
    error: 0,
    accepted: true
  });

  const SAFETY = 0.85;
  const MAX_GROWTH = 5.0;
  const MIN_SHRINK = 0.1;

  while (t < tf && stepCount < MAX_STEPS_ALLOWED) {
    stepCount++;

    // Ajustar h para no exceder tf
    if (t + h > tf) {
      h = tf - t;
    }

    // Calcular las 7 etapas k_1 ... k_7
    const k = new Array(7);
    try {
      k[0] = evaluate(t, y);
      for (let i = 1; i < 7; i++) {
        let sumA = 0;
        for (let j = 0; j < i; j++) {
          sumA += DP_A[i][j] * k[j];
        }
        const ti = t + DP_C[i] * h;
        const yi = y + h * sumA;
        k[i] = evaluate(ti, yi);
      }
    } catch (err) {
      throw new Error(`Error al evaluar la función diferencial f(t, y) en t = ${t.toFixed(4)}: ${err.message}`);
    }

    // Solución orden 5
    let dy5 = 0;
    for (let i = 0; i < 7; i++) {
      dy5 += DP_B5[i] * k[i];
    }
    const y5 = y + h * dy5;

    // Estimación del error local: E = h * sum(e_i * k_i)
    let localError = 0;
    for (let i = 0; i < 7; i++) {
      localError += DP_E[i] * k[i];
    }
    const absError = Math.abs(h * localError);

    // Escala de tolerancia compuesta (absoluta + relativa)
    const scale = tol + tol * Math.max(Math.abs(y), Math.abs(y5));
    const errorRatio = absError / scale;

    const isAccepted = errorRatio <= 1.0 || h <= hMin;

    allAttempts.push({
      attempt: stepCount,
      t,
      y,
      h,
      absError,
      errorRatio,
      accepted: isAccepted
    });

    if (isAccepted) {
      acceptedCount++;
      t = t + h;
      y = y5;

      trajectory.push({
        i: acceptedCount,
        t,
        y,
        h,
        error: absError,
        accepted: true
      });

      // Factor de ajuste para el siguiente paso
      let factor = errorRatio > 1e-12 ? SAFETY * Math.pow(1 / errorRatio, 0.2) : MAX_GROWTH;
      factor = Math.min(MAX_GROWTH, Math.max(MIN_SHRINK, factor));
      h = Math.min(hMax, Math.max(hMin, h * factor));
    } else {
      rejectedCount++;
      // Paso rechazado: reducir h y reintentar sin avanzar t
      let factor = SAFETY * Math.pow(1 / errorRatio, 0.25);
      factor = Math.min(1.0, Math.max(MIN_SHRINK, factor));
      h = Math.max(hMin, h * factor);

      if (h <= hMin && t + h === t) {
        throw new Error(
          `El paso h se redujo al límite mínimo (${hMin.toExponential(2)}) sin satisfacer la tolerancia. Posible singularidad o rigidez severa en t = ${t.toFixed(4)}.`
        );
      }
    }
  }

  if (stepCount >= MAX_STEPS_ALLOWED && t < tf) {
    throw new Error(
      `Se superó el límite de seguridad de ${MAX_STEPS_ALLOWED} pasos sin alcanzar tf = ${tf}. Considere relajar la tolerancia tol.`
    );
  }

  return {
    method: 'Runge-Kutta Adaptativo (RK45 / Dormand-Prince)',
    t0,
    y0,
    tf,
    tol,
    finalY: trajectory[trajectory.length - 1].y,
    totalSteps: stepCount,
    acceptedSteps: acceptedCount,
    rejectedSteps: rejectedCount,
    trajectory,
    allAttempts
  };
}


