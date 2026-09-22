import { describe, it, expect } from 'vitest';
import {
  linearRegression,
  polynomialRegression,
  exponentialRegression,
  powerRegression,
  curveFitting
} from '../interpolationEngine';

describe('Ajuste de Curvas por Mínimos Cuadrados (Regresión)', () => {
  it('Regresión Lineal Simple ajusta datos exactamente lineales con R² = 1', () => {
    // y = 2.5*x + 1.0
    const points = [
      { x: 0, y: 1.0 },
      { x: 1, y: 3.5 },
      { x: 2, y: 6.0 },
      { x: 3, y: 8.5 },
      { x: 4, y: 11.0 }
    ];

    const res = linearRegression(points);
    expect(res.coefficients.a1).toBeCloseTo(2.5, 6);
    expect(res.coefficients.a0).toBeCloseTo(1.0, 6);
    expect(res.rSquared).toBeCloseTo(1.0, 6);
    expect(res.standardError).toBeCloseTo(0, 6);
    expect(res.evaluate(2.5)).toBeCloseTo(2.5 * 2.5 + 1.0, 6);
  });

  it('Regresión Lineal calcula residuales y error estándar en datos dispersos', () => {
    const points = [
      { x: 1, y: 2.1 },
      { x: 2, y: 3.9 },
      { x: 3, y: 6.2 },
      { x: 4, y: 8.0 }
    ];

    const res = linearRegression(points);
    expect(res.rSquared).toBeGreaterThan(0.98);
    expect(res.standardError).toBeGreaterThan(0);
    expect(res.residuals.length).toBe(4);
  });

  it('Regresión Polinómica (Grado 2) recupera coeficientes de parábola exacta', () => {
    // y = 3 - 2*x + 1.5*x^2
    const points = [
      { x: 0, y: 3.0 },
      { x: 1, y: 2.5 },
      { x: 2, y: 5.0 },
      { x: 3, y: 10.5 },
      { x: 4, y: 19.0 }
    ];

    const res = polynomialRegression(points, 2);
    expect(res.coefficients[0]).toBeCloseTo(3.0, 4);  // a0
    expect(res.coefficients[1]).toBeCloseTo(-2.0, 4); // a1
    expect(res.coefficients[2]).toBeCloseTo(1.5, 4);  // a2
    expect(res.rSquared).toBeCloseTo(1.0, 4);
    expect(res.evaluate(2)).toBeCloseTo(5.0, 4);
  });

  it('Regresión Exponencial ajusta y = a * e^(b*x)', () => {
    // y = 2.0 * e^(0.7 * x)
    const points = [
      { x: 0, y: 2.0 },
      { x: 1, y: 2.0 * Math.exp(0.7) },
      { x: 2, y: 2.0 * Math.exp(1.4) },
      { x: 3, y: 2.0 * Math.exp(2.1) }
    ];

    const res = exponentialRegression(points);
    expect(res.coefficients.a).toBeCloseTo(2.0, 4);
    expect(res.coefficients.b).toBeCloseTo(0.7, 4);
    expect(res.rSquared).toBeCloseTo(1.0, 4);
    expect(res.evaluate(1.5)).toBeCloseTo(2.0 * Math.exp(0.7 * 1.5), 4);
  });

  it('Regresión Potencial ajusta y = a * x^b', () => {
    // y = 3.0 * x^1.5
    const points = [
      { x: 1, y: 3.0 * Math.pow(1, 1.5) },
      { x: 2, y: 3.0 * Math.pow(2, 1.5) },
      { x: 3, y: 3.0 * Math.pow(3, 1.5) },
      { x: 4, y: 3.0 * Math.pow(4, 1.5) }
    ];

    const res = powerRegression(points);
    expect(res.coefficients.a).toBeCloseTo(3.0, 4);
    expect(res.coefficients.b).toBeCloseTo(1.5, 4);
    expect(res.rSquared).toBeCloseTo(1.0, 4);
    expect(res.evaluate(2.5)).toBeCloseTo(3.0 * Math.pow(2.5, 1.5), 4);
  });

  it('Rechaza y <= 0 en regresión exponencial', () => {
    const invalidPoints = [
      { x: 1, y: 2 },
      { x: 2, y: -1 },
      { x: 3, y: 4 }
    ];
    expect(() => exponentialRegression(invalidPoints)).toThrowError(/y ≤ 0/);
  });

  it('Rechaza grado excesivo en regresión polinómica', () => {
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: 3 }
    ];
    expect(() => polynomialRegression(points, 2)).toThrowError(/menor que el número de puntos/);
  });

  it('curveFitting despacha correctamente a los diferentes métodos', () => {
    const points = [
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 5 }
    ];
    const resLin = curveFitting(points, 'linear');
    expect(resLin.type).toBe('linear');

    const resPoly = curveFitting(points, 'polynomial', { degree: 1 });
    expect(resPoly.type).toBe('polynomial');
  });
});
