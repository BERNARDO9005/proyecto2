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

