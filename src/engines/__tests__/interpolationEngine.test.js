import { describe, it, expect } from 'vitest';
import {
  validatePoints,
  lagrangeInterpolation,
  newtonDividedDifferences,
  cubicSplineNatural
} from '../interpolationEngine';

describe('Interpolation Engine', () => {
  const samplePoints = [
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 7 },
    { x: 3, y: 13 } // f(x) = x^2 + x + 1
  ];

  describe('Validation', () => {
    it('throws error for less than minPoints', () => {
      expect(() => validatePoints([{ x: 1, y: 2 }], 2)).toThrow();
    });

    it('throws error for duplicate x coordinates', () => {
      expect(() => validatePoints([{ x: 1, y: 2 }, { x: 1, y: 5 }], 2)).toThrow(/duplicadas/i);
    });

    it('sorts points by x ascending', () => {
      const sorted = validatePoints([{ x: 3, y: 1 }, { x: 1, y: 2 }]);
      expect(sorted[0].x).toBe(1);
      expect(sorted[1].x).toBe(3);
    });
  });

  describe('Lagrange Interpolation', () => {
    it('exact evaluation at nodal points', () => {
      const res = lagrangeInterpolation(samplePoints);
      samplePoints.forEach(pt => {
        expect(res.evaluate(pt.x)).toBeCloseTo(pt.y, 5);
      });
    });

    it('interpolates intermediate points for quadratic polynomial', () => {
      const res = lagrangeInterpolation(samplePoints);
      // f(1.5) = 1.5^2 + 1.5 + 1 = 2.25 + 1.5 + 1 = 4.75
      expect(res.evaluate(1.5)).toBeCloseTo(4.75, 4);
      // f(0.5) = 0.25 + 0.5 + 1 = 1.75
      expect(res.evaluate(0.5)).toBeCloseTo(1.75, 4);
    });
  });

  describe('Newton Divided Differences', () => {
    it('exact evaluation at nodal points', () => {
      const res = newtonDividedDifferences(samplePoints);
      samplePoints.forEach(pt => {
        expect(res.evaluate(pt.x)).toBeCloseTo(pt.y, 5);
      });
    });

    it('matches Lagrange evaluation at intermediate points', () => {
      const lagrange = lagrangeInterpolation(samplePoints);
      const newton = newtonDividedDifferences(samplePoints);

      [0.5, 1.25, 2.5, 2.8].forEach(x => {
        expect(newton.evaluate(x)).toBeCloseTo(lagrange.evaluate(x), 5);
      });
    });

    it('computes correct divided difference table', () => {
      const res = newtonDividedDifferences(samplePoints);
      expect(res.table[0][0]).toBe(1);
      expect(res.table[0][1]).toBeCloseTo(2, 5); // (3 - 1) / (1 - 0) = 2
      expect(res.table[0][2]).toBeCloseTo(1, 5); // 2nd order diff = 1 (quadratic coefficient)
      expect(res.table[0][3]).toBeCloseTo(0, 5); // 3rd order diff = 0
    });
  });

  describe('Cubic Splines (Natural)', () => {
    it('exact evaluation at all nodes', () => {
      const res = cubicSplineNatural(samplePoints);
      samplePoints.forEach(pt => {
        expect(res.evaluate(pt.x)).toBeCloseTo(pt.y, 5);
      });
    });

    it('satisfies natural boundary conditions (M0 = 0 and Mn-1 = 0)', () => {
      const res = cubicSplineNatural(samplePoints);
      expect(res.secondDerivatives[0]).toBeCloseTo(0, 8);
      expect(res.secondDerivatives[samplePoints.length - 1]).toBeCloseTo(0, 8);
    });

    it('smooth continuity across subinterval boundaries', () => {
      const res = cubicSplineNatural(samplePoints);
      // Test continuity at boundary x = 1
      const leftVal = res.intervals[0].evaluate(1.0 - 1e-6);
      const rightVal = res.intervals[1].evaluate(1.0 + 1e-6);
      expect(leftVal).toBeCloseTo(rightVal, 4);
    });
  });
});
