import { describe, it, expect } from 'vitest';
import { bisection, regulaFalsi, newtonRaphson, secant } from '../nonlinearEngine';
import { gaussianElimination, gaussJordan, jacobi, gaussSeidel, checkStrictDiagonalDominance } from '../linearSystemEngine';
import { trapezoidalSimple, trapezoidalComposite, simpson13Composite, simpson38Composite, computeFiniteDifferences } from '../calculusEngine';
import { euler, heun, rk4 } from '../odeEngine';

describe('Módulo 1: Ecuaciones No Lineales (Búsqueda de Raíces)', () => {
  const expr = 'x^2 - 4'; // Raíz exacta en x = 2

  it('Bisección converge a la raíz x = 2', () => {
    const res = bisection(expr, 0, 3, 1e-5);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.root - 2)).toBeLessThan(1e-4);
    expect(res.iterations.length).toBeGreaterThan(0);
  });

  it('Regula Falsi converge a la raíz x = 2', () => {
    const res = regulaFalsi(expr, 0, 3, 1e-5);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.root - 2)).toBeLessThan(1e-4);
  });

  it('Newton-Raphson con derivada analítica converge a la raíz x = 2', () => {
    const res = newtonRaphson(expr, 3, 1e-6);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.root - 2)).toBeLessThan(1e-5);
  });

  it('Secante converge a la raíz x = 2', () => {
    const res = secant(expr, 1, 3, 1e-6);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.root - 2)).toBeLessThan(1e-5);
  });

  it('Rechaza intervalo que viola el Teorema de Bolzano en Bisección', () => {
    expect(() => bisection(expr, 3, 5, 1e-5)).toThrowError(/Bolzano/);
  });

  it('Detecta división entre cero por derivada nula en Newton-Raphson', () => {
    // f(x) = x^2, en x0 = 0, f'(0) = 0
    expect(() => newtonRaphson('x^2', 0, 1e-5)).toThrowError(/División entre cero/);
  });

  it('Indica explícitamente no convergencia si se alcanza el límite duro sin cumplir tolerancia', () => {
    const res = bisection(expr, 0, 3, 1e-12, 3);
    expect(res.converged).toBe(false);
    expect(res.message).toMatch(/ADVERTENCIA: No se alcanzó la tolerancia/);
  });
});

describe('Módulo 2: Sistemas de Ecuaciones Lineales', () => {
  // Sistema:
  //  2x +  y -  z =  8
  // -3x -  y + 2z = -11
  // -2x +  y + 2z = -3
  // Solución analítica: x = 2, y = 3, z = -1
  const A = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
  ];
  const b = [8, -11, -3];

  it('Eliminación Gaussiana con pivoteo parcial halla la solución exacta', () => {
    const res = gaussianElimination(A, b);
    expect(Math.abs(res.solution[0] - 2)).toBeLessThan(1e-5);
    expect(Math.abs(res.solution[1] - 3)).toBeLessThan(1e-5);
    expect(Math.abs(res.solution[2] - (-1))).toBeLessThan(1e-5);
    expect(res.steps.length).toBeGreaterThan(1);
    expect(res.backSubstitution.length).toBe(3);
  });

  it('Gauss-Jordan con pivoteo parcial resuelve el sistema', () => {
    const res = gaussJordan(A, b);
    expect(Math.abs(res.solution[0] - 2)).toBeLessThan(1e-5);
    expect(Math.abs(res.solution[1] - 3)).toBeLessThan(1e-5);
    expect(Math.abs(res.solution[2] - (-1))).toBeLessThan(1e-5);
  });

  it('Detecta matriz singular y aborta con error explicativo', () => {
    const singularA = [
      [1, 2, 3],
      [2, 4, 6],
      [1, 1, 1]
    ];
    const bVec = [1, 2, 3];
    expect(() => gaussianElimination(singularA, bVec)).toThrowError(/singular/);
  });

  // Sistema diagonalmente dominante:
  // 10x + 2y -  z = 34  -> x=2, y=6, z=-2
  //   x + 10y - z = 64
  //  2x -  y + 10z = -22
  const A_diag = [
    [10, 2, -1],
    [1, 10, -1],
    [2, -1, 10]
  ];
  const b_diag = [34, 64, -22];

  it('Verifica dominancia diagonal correctamente', () => {
    const dom = checkStrictDiagonalDominance(A_diag);
    expect(dom.isDominant).toBe(true);
    expect(dom.warning).toBeNull();
  });

  it('Jacobi converge al resultado exacto [2, 6, -2]', () => {
    const res = jacobi(A_diag, b_diag, [0, 0, 0], 1e-5);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.solution[0] - 2)).toBeLessThan(1e-4);
    expect(Math.abs(res.solution[1] - 6)).toBeLessThan(1e-4);
    expect(Math.abs(res.solution[2] - (-2))).toBeLessThan(1e-4);
  });

  it('Gauss-Seidel converge al resultado exacto [2, 6, -2]', () => {
    const res = gaussSeidel(A_diag, b_diag, [0, 0, 0], 1e-5);
    expect(res.converged).toBe(true);
    expect(Math.abs(res.solution[0] - 2)).toBeLessThan(1e-4);
    expect(Math.abs(res.solution[1] - 6)).toBeLessThan(1e-4);
    expect(Math.abs(res.solution[2] - (-2))).toBeLessThan(1e-4);
  });
});

describe('Módulo 3: Diferenciación e Integración Numérica', () => {
  // Integral de f(x) = x^2 en [0, 1] es 1/3 ≈ 0.33333333
  const expr = 'x^2';

  it('Trapecio simple aproxima la integral de x^2 en [0, 1]', () => {
    const res = trapezoidalSimple(expr, 0, 1);
    expect(res.result).toBeCloseTo(0.5, 5);
  });

  it('Trapecio compuesto con n=10 aproxima con mayor exactitud', () => {
    const res = trapezoidalComposite(expr, 0, 1, 10);
    expect(res.result).toBeCloseTo(0.335, 2);
  });

  it('Simpson 1/3 compuesto calcula exactamente polinomios de grado 2', () => {
    const res = simpson13Composite(expr, 0, 1, 4);
    expect(res.result).toBeCloseTo(1 / 3, 6);
  });

  it('Simpson 1/3 ajusta automáticamente n impar a par y emite aviso', () => {
    const res = simpson13Composite(expr, 0, 1, 3); // n = 3 impar
    expect(res.n).toBe(4);
    expect(res.adjustmentNotice).toMatch(/Ajuste automático/);
    expect(res.result).toBeCloseTo(1 / 3, 6);
  });

  it('Simpson 3/8 ajusta automáticamente n no múltiplo de 3', () => {
    const res = simpson38Composite(expr, 0, 1, 4); // n = 4 no múltiplo de 3
    expect(res.n).toBe(6);
    expect(res.adjustmentNotice).toMatch(/múltiplo de 3/);
    expect(res.result).toBeCloseTo(1 / 3, 6);
  });

  it('Captura error de dominio e identifica el punto/subintervalo que falló', () => {
    // log(x) con x en [-1, 2] falla en x <= 0
    expect(() => trapezoidalComposite('log(x)', -1, 2, 6)).toThrowError(/Error de dominio/);
  });

  it('Diferencias finitas calcula derivadas de f(x) = x^3 en x = 2', () => {
    // f'(2) = 3*(2^2) = 12, f''(2) = 6*(2) = 12
    const diff = computeFiniteDifferences('x^3', 2, 0.01);
    expect(diff.firstDerivative.central4.value).toBeCloseTo(12, 4);
    expect(diff.firstDerivative.central1.value).toBeCloseTo(12, 3);
    expect(diff.secondDerivative.central.value).toBeCloseTo(12, 2);
  });
});

describe('Módulo 4: Ecuaciones Diferenciales Ordinarias (EDO)', () => {
  // dy/dx = x + y, y(0) = 1, xf = 1
  // Solución analítica: y(x) = 2*e^x - x - 1. En x=1: y(1) = 2*e - 2 ≈ 3.43656
  const odeExpr = 'x + y';
  const exactY1 = 2 * Math.E - 2;

  it('Euler aproxima la solución', () => {
    const res = euler(odeExpr, 0, 1, 1, 0.1);
    expect(res.trajectory.length).toBe(11);
    expect(res.finalY).toBeCloseTo(3.18748, 2);
  });

  it('Heun mejora la aproximación de Euler', () => {
    const res = heun(odeExpr, 0, 1, 1, 0.1);
    expect(res.finalY).toBeCloseTo(3.428, 2);
  });

  it('RK4 produce aproximación de alta precisión coincidente con analítica', () => {
    const res = rk4(odeExpr, 0, 1, 1, 0.1);
    expect(Math.abs(res.finalY - exactY1)).toBeLessThan(1e-4);
  });

  it('Rechaza h no positivo o intervalo no válido', () => {
    expect(() => euler(odeExpr, 0, 1, 1, -0.1)).toThrowError(/estrictamente positivo/);
    expect(() => euler(odeExpr, 2, 1, 1, 0.1)).toThrowError(/mayor que el valor inicial/);
  });
});
