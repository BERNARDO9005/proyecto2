import { describe, it, expect } from 'vitest';
import { gaussLegendre, rombergIntegration } from '../calculusEngine';

describe('Integración Adaptativa y Cuadratura Gaussiana', () => {
  it('Cuadratura de Gauss-Legendre con n=2 integra polinomios cúbicos de forma exacta', () => {
    // \int_0^1 x^3 dx = [x^4 / 4]_0^1 = 0.25 exacto
    // Gauss-Legendre con n=2 es exacta para polinomios de grado <= 2*2 - 1 = 3
    const res = gaussLegendre('x^3', 0, 1, 2);
    expect(res.result).toBeCloseTo(0.25, 8);
    expect(res.points.length).toBe(2);
  });

  it('Cuadratura de Gauss-Legendre con n=4 aproxima integrales trascendentes con alta precisión', () => {
    // \int_0^pi sin(x) dx = 2
    const res = gaussLegendre('sin(x)', 0, Math.PI, 4);
    expect(res.result).toBeCloseTo(2.0, 5);
    expect(res.points.length).toBe(4);
  });

  it('Rechaza número de puntos no soportado en Gauss-Legendre', () => {
    expect(() => gaussLegendre('x^2', 0, 1, 8)).toThrowError(/debe ser 2, 3, 4, 5 o 6/);
  });

  it('Algoritmo de Romberg integra e^x con extrapolación de Richardson y alta precisión', () => {
    // \int_0^1 e^x dx = e - 1 ≈ 1.718281828459
    const exact = Math.E - 1;
    const res = rombergIntegration('exp(x)', 0, 1, 1e-8, 6);

    expect(res.converged).toBe(true);
    expect(res.result).toBeCloseTo(exact, 7);
    expect(res.table.length).toBeGreaterThan(1);
    expect(res.estimatedError).toBeLessThan(1e-8);
  });

  it('Romberg integra sin(x) en [0, pi] convergiendo en pocos niveles', () => {
    const res = rombergIntegration('sin(x)', 0, Math.PI, 1e-7, 6);
    expect(res.converged).toBe(true);
    expect(res.result).toBeCloseTo(2.0, 6);
  });

  it('Romberg y Gauss-Legendre rechazan intervalos donde b <= a', () => {
    expect(() => gaussLegendre('x^2', 2, 1, 3)).toThrowError(/límite superior b debe ser mayor/);
    expect(() => rombergIntegration('x^2', 2, 1)).toThrowError(/límite superior b debe ser mayor/);
  });
});
