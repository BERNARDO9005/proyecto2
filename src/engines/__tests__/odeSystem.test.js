import { describe, it, expect } from 'vitest';
import { rk4System, rk4SecondOrder } from '../odeEngine';

describe('ODE System & 2nd Order Engine', () => {
  it('solves simple decoupled system accurately', () => {
    // dy1/dt = -y1, dy2/dt = -2*y2
    // y1(0) = 1 => y1(t) = e^(-t)
    // y2(0) = 2 => y2(t) = 2*e^(-2t)
    const res = rk4System('-y1', '-2*y2', 0, 1, 2, 1, 0.05);

    expect(res.trajectory.length).toBeGreaterThan(1);
    const lastStep = res.trajectory[res.trajectory.length - 1];
    expect(lastStep.t).toBeCloseTo(1, 4);
    expect(lastStep.y1).toBeCloseTo(Math.exp(-1), 4);
    expect(lastStep.y2).toBeCloseTo(2 * Math.exp(-2), 4);
  });

  it('solves harmonic oscillator as a 2nd order ODE (y\'\' = -y)', () => {
    // y'' = -y, y(0) = 1, y'(0) = 0 => y(t) = cos(t), y'(t) = -sin(t)
    const tFinal = Math.PI;
    const res = rk4SecondOrder('-y', 0, 1, 0, tFinal, 0.05);

    const last = res.trajectory[res.trajectory.length - 1];
    expect(last.y1).toBeCloseTo(-1, 3); // cos(pi) = -1
    expect(last.y2).toBeCloseTo(0, 3);  // -sin(pi) = 0
  });

  it('handles predator-prey system without NaN or divergence within bounded time', () => {
    // Lotka-Volterra:
    // dy1/dt = 0.5*y1 - 0.02*y1*y2
    // dy2/dt = -0.3*y2 + 0.01*y1*y2
    const res = rk4System(
      '0.5*y1 - 0.02*y1*y2',
      '-0.3*y2 + 0.01*y1*y2',
      0,
      30,
      20,
      5,
      0.1
    );

    expect(res.trajectory.length).toBe(51);
    res.trajectory.forEach(pt => {
      expect(Number.isFinite(pt.y1)).toBe(true);
      expect(Number.isFinite(pt.y2)).toBe(true);
      expect(pt.y1).toBeGreaterThan(0);
      expect(pt.y2).toBeGreaterThan(0);
    });
  });

  it('validates invalid parameter inputs', () => {
    expect(() => rk4System('y2', '-y1', 0, 1, 'invalid', 1, 0.1)).toThrow();
    expect(() => rk4System('y2', '-y1', 1, 1, 0, 0, 0.1)).toThrow(); // tf <= t0
    expect(() => rk4System('y2', '-y1', 0, 1, 0, 1, -0.1)).toThrow(); // h <= 0
  });
});
