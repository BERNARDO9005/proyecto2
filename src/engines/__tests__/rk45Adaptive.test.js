import { describe, it, expect } from 'vitest';
import { rk45 } from '../odeEngine';

describe('Runge-Kutta Adaptativo (RK45 / Dormand-Prince)', () => {
  // dy/dx = x + y, y(0) = 1, xf = 1
  // Solución analítica exacta: y(x) = 2*e^x - x - 1
  // y(1) = 2*e - 2 ≈ 3.4365636569
  const odeExpr = 'x + y';
  const exactY1 = 2 * Math.E - 2;

  it('RK45 resuelve la EDO adaptando el paso h con alta precisión', () => {
    const res = rk45(odeExpr, 0, 1, 1, { tol: 1e-6 });

    expect(res.trajectory.length).toBeGreaterThan(2);
    expect(res.finalY).toBeCloseTo(exactY1, 4);
    expect(res.acceptedSteps).toBeGreaterThan(0);
    expect(res.method).toContain('Dormand-Prince');
  });

  it('Adapta el paso h dinámicamente según la curvatura de la solución', () => {
    // Solución exponencial de rápido crecimiento: dy/dx = 2*y, y(0) = 1 -> y = e^(2x)
    const res = rk45('2*y', 0, 1, 2, { tol: 1e-5 });

    const exactY2 = Math.exp(4); // e^4 ≈ 54.598
    expect(res.finalY).toBeCloseTo(exactY2, 1);

    // Los pasos h deben variar dinámicamente
    const stepSizes = res.trajectory.slice(1).map(pt => pt.h);
    const hasDifferentH = stepSizes.some((hVal, idx, arr) => idx > 0 && Math.abs(hVal - arr[idx - 1]) > 1e-6);
    expect(hasDifferentH).toBe(true);
  });

  it('Rechaza parámetros inválidos (tf <= t0)', () => {
    expect(() => rk45('x + y', 1, 1, 0)).toThrowError(/mayor que el tiempo inicial/);
  });
});
