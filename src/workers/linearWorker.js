import {
  gaussianElimination,
  gaussJordan,
  jacobi,
  gaussSeidel
} from '../engines/linearSystemEngine.js';

/**
 * Web Worker para el cómputo de sistemas lineales de gran escala (hasta 50x50)
 * Permite ejecutar métodos directos e iterativos en un hilo separado para mantener 60 FPS en la UI.
 */
self.onmessage = function (e) {
  const { id, method, matrixA, vectorB, vectorX0, tolerance, maxIter } = e.data;

  const startTime = performance.now();

  try {
    let result;
    const tol = parseFloat(tolerance) || 1e-6;
    const maxI = Math.min(100, Math.max(1, parseInt(maxIter, 10) || 100));

    switch (method) {
      case 'gauss':
        result = gaussianElimination(matrixA, vectorB);
        break;
      case 'jordan':
        result = gaussJordan(matrixA, vectorB);
        break;
      case 'jacobi':
        result = jacobi(matrixA, vectorB, vectorX0, tol, maxI);
        break;
      case 'seidel':
        result = gaussSeidel(matrixA, vectorB, vectorX0, tol, maxI);
        break;
      default:
        throw new Error(`Método matricial no reconocido: ${method}`);
    }

    const endTime = performance.now();
    const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

    self.postMessage({
      id,
      success: true,
      result,
      executionTimeMs
    });
  } catch (err) {
    const endTime = performance.now();
    const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

    self.postMessage({
      id,
      success: false,
      error: err.message || 'Error desconocido en el cálculo matricial.',
      executionTimeMs
    });
  }
};
