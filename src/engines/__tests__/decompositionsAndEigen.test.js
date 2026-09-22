import { describe, it, expect } from 'vitest';
import {
  doolittleLU,
  croutLU,
  choleskyDecomposition,
  solveLU,
  solveCholesky,
  multiplyMatrices,
  powerMethod,
  inversePowerMethod,
  qrAlgorithm
} from '../linearSystemEngine';

describe('Descomposiciones Matriciales (LU y Cholesky)', () => {
  // Sistema de prueba:
  //  2x +  y -  z =  8
  // -3x -  y + 2z = -11
  // -2x +  y + 2z = -3
  // Solución analítica: x = [2, 3, -1]
  const A = [
    [2, 1, -1],
    [-3, -1, 2],
    [-2, 1, 2]
  ];
  const b = [8, -11, -3];

  it('Doolittle LU factoriza A = L*U con diagonal unitaria en L y resuelve correctamente', () => {
    const res = solveLU(A, b, 'doolittle');
    const { L, U, solution } = res;

    // Verificar que diagonal de L sea 1
    for (let i = 0; i < L.length; i++) {
      expect(L[i][i]).toBe(1);
    }

    // Verificar reconstrucción A = L * U
    const reconstructed = multiplyMatrices(L, U);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(reconstructed[i][j]).toBeCloseTo(A[i][j], 8);
      }
    }

    // Verificar vector solución
    expect(solution[0]).toBeCloseTo(2, 6);
    expect(solution[1]).toBeCloseTo(3, 6);
    expect(solution[2]).toBeCloseTo(-1, 6);
  });

  it('Crout LU factoriza A = L*U con diagonal unitaria en U y resuelve correctamente', () => {
    const res = solveLU(A, b, 'crout');
    const { L, U, solution } = res;

    // Verificar que diagonal de U sea 1
    for (let i = 0; i < U.length; i++) {
      expect(U[i][i]).toBe(1);
    }

    // Reconstrucción A = L * U
    const reconstructed = multiplyMatrices(L, U);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(reconstructed[i][j]).toBeCloseTo(A[i][j], 8);
      }
    }

    expect(solution[0]).toBeCloseTo(2, 6);
    expect(solution[1]).toBeCloseTo(3, 6);
    expect(solution[2]).toBeCloseTo(-1, 6);
  });

  it('Cholesky descompone matriz simétrica y definida positiva A = L*Lᵀ', () => {
    const spd = [
      [4, 12, -16],
      [12, 37, -43],
      [-16, -43, 98]
    ];
    const bVec = [0, 6, 27];

    const res = solveCholesky(spd, bVec);
    const { L, LT, solution } = res;

    // Verificar que L[0][0] = 2, L[1][0] = 6, L[1][1] = 1, etc.
    expect(L[0][0]).toBeCloseTo(2, 6);
    expect(L[1][0]).toBeCloseTo(6, 6);
    expect(L[1][1]).toBeCloseTo(1, 6);
    expect(L[2][0]).toBeCloseTo(-8, 6);
    expect(L[2][1]).toBeCloseTo(5, 6);
    expect(L[2][2]).toBeCloseTo(3, 6);

    // Reconstrucción L * Lᵀ = A
    const reconstructed = multiplyMatrices(L, LT);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(reconstructed[i][j]).toBeCloseTo(spd[i][j], 6);
      }
    }

    // Verificar solución del sistema
    // spd * x = bVec
    // x = [1, 2, 3] aprox
    const [x1, x2, x3] = solution;
    expect(spd[0][0] * x1 + spd[0][1] * x2 + spd[0][2] * x3).toBeCloseTo(bVec[0], 6);
    expect(spd[1][0] * x1 + spd[1][1] * x2 + spd[1][2] * x3).toBeCloseTo(bVec[1], 6);
    expect(spd[2][0] * x1 + spd[2][1] * x2 + spd[2][2] * x3).toBeCloseTo(bVec[2], 6);
  });

  it('Cholesky rechaza matrices no simétricas con error explícito', () => {
    const nonSymmetric = [
      [1, 2],
      [3, 4]
    ];
    expect(() => choleskyDecomposition(nonSymmetric)).toThrowError(/no es simétrica/);
  });

  it('Cholesky rechaza matrices que no son definidas positivas', () => {
    const nonPosDef = [
      [1, 2],
      [2, 1] // Det = 1 - 4 = -3 < 0, no es definida positiva
    ];
    expect(() => choleskyDecomposition(nonPosDef)).toThrowError(/no es definida positiva/);
  });
});

describe('Cálculo de Valores y Vectores Propios (Eigenvalues & Eigenvectors)', () => {
  // Matriz simétrica con autovalores analíticos conocidos:
  // A = [[2, 1], [1, 2]] -> Autovalores: λ1 = 3, λ2 = 1
  const A = [
    [2, 1],
    [1, 2]
  ];

  it('Método de la Potencia encuentra el valor propio dominante λ = 3', () => {
    const res = powerMethod(A, [1, 0], 1e-6);
    expect(res.converged).toBe(true);
    expect(res.eigenvalue).toBeCloseTo(3, 4);

    // Vector propio asociado normalizado [1/√2, 1/√2] ≈ [0.7071, 0.7071]
    expect(Math.abs(res.eigenvector[0])).toBeCloseTo(Math.SQRT1_2, 4);
    expect(Math.abs(res.eigenvector[1])).toBeCloseTo(Math.SQRT1_2, 4);
  });

  it('Método de la Potencia Inversa con shift = 0 encuentra el menor autovalor λ = 1', () => {
    const res = inversePowerMethod(A, 0, [1, -0.5], 1e-6);
    expect(res.converged).toBe(true);
    expect(res.eigenvalue).toBeCloseTo(1, 4);
  });

  it('Algoritmo QR calcula el espectro completo de la matriz', () => {
    // Matriz: A = [[5, -2], [-2, 2]] -> Tr=7, Det=6 -> λ1 = 6, λ2 = 1
    const mat = [
      [5, -2],
      [-2, 2]
    ];
    const res = qrAlgorithm(mat, 1e-6);
    expect(res.converged).toBe(true);
    const evs = res.eigenvalues.map(e => e.real).sort((a, b) => b - a);
    expect(evs[0]).toBeCloseTo(6, 4);
    expect(evs[1]).toBeCloseTo(1, 4);
  });

  it('Algoritmo QR detecta pares complejos conjugados', () => {
    // Matriz de rotación 90 grados: [[0, -1], [1, 0]] -> λ = ± i
    const rot = [
      [0, -1],
      [1, 0]
    ];
    const res = qrAlgorithm(rot, 1e-6);
    expect(res.eigenvalues.length).toBe(2);
    expect(res.eigenvalues[0].real).toBeCloseTo(0, 4);
    expect(Math.abs(res.eigenvalues[0].imag)).toBeCloseTo(1, 4);
  });
});
