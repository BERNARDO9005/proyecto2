import {
  gaussianElimination,
  gaussJordan,
  jacobi,
  gaussSeidel,
  solveLU,
  solveCholesky,
  powerMethod,
  inversePowerMethod,
  qrAlgorithm
} from '../engines/linearSystemEngine';

let workerInstance = null;
let currentRequestId = 0;
const pendingRequests = new Map();

/**
 * Inicializa o recupera la instancia del Web Worker de matrices
 */
function getWorker() {
  if (typeof window === 'undefined' || !window.Worker) {
    return null;
  }

  if (!workerInstance) {
    try {
      workerInstance = new Worker(
        new URL('../workers/linearWorker.js', import.meta.url),
        { type: 'module' }
      );

      workerInstance.onmessage = (event) => {
        const { id, success, result, error, executionTimeMs } = event.data;
        const pending = pendingRequests.get(id);
        if (pending) {
          pendingRequests.delete(id);
          if (success) {
            pending.resolve({
              ...result,
              executionTimeMs,
              isWorker: true
            });
          } else {
            pending.reject(new Error(error));
          }
        }
      };

      workerInstance.onerror = (err) => {
        console.error('Error en Web Worker de matrices:', err);
        // Rechazar todas las peticiones pendientes
        for (const [id, pending] of pendingRequests.entries()) {
          pending.reject(new Error('Fallo crítico en el Web Worker de cálculo matricial.'));
        }
        pendingRequests.clear();
        terminateWorker();
      };
    } catch (e) {
      console.warn('No se pudo inicializar el Web Worker, se usará ejecución síncrona en hilo principal.', e);
      workerInstance = null;
    }
  }

  return workerInstance;
}

/**
 * Cancela cualquier tarea en ejecución terminando el worker y liberando memoria
 */
export function terminateWorker() {
  if (workerInstance) {
    workerInstance.terminate();
    workerInstance = null;
  }
  for (const [id, pending] of pendingRequests.entries()) {
    pending.reject(new Error('Cálculo cancelado por el usuario.'));
  }
  pendingRequests.clear();
}

/**
 * Resuelve un sistema o cálculo matricial de manera asíncrona mediante Web Worker
 * con fallback transparente al hilo principal.
 *
 * @param {Object} params
 * @param {string} params.method - 'gauss' | 'jordan' | 'doolittle' | 'crout' | 'cholesky' | 'jacobi' | 'seidel' | 'power' | 'inverse_power' | 'qr_eigen'
 * @param {number[][]} params.matrixA
 * @param {number[]} [params.vectorB]
 * @param {number[]} [params.vectorX0]
 * @param {number|string} [params.tolerance]
 * @param {number|string} [params.maxIter]
 * @param {number|string} [params.shift]
 * @returns {Promise<any>}
 */
export function solveLinearSystemAsync({
  method,
  matrixA,
  vectorB,
  vectorX0,
  tolerance = 1e-6,
  maxIter = 100,
  shift = 0
}) {
  const worker = getWorker();

  if (!worker) {
    // Fallback síncrono para entornos sin soporte de Worker
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const t0 = performance.now();
        try {
          const tol = parseFloat(tolerance) || 1e-6;
          const maxI = Math.min(200, Math.max(1, parseInt(maxIter, 10) || 100));

          let res;
          if (method === 'gauss') {
            res = gaussianElimination(matrixA, vectorB);
          } else if (method === 'jordan') {
            res = gaussJordan(matrixA, vectorB);
          } else if (method === 'doolittle') {
            res = solveLU(matrixA, vectorB, 'doolittle');
          } else if (method === 'crout') {
            res = solveLU(matrixA, vectorB, 'crout');
          } else if (method === 'cholesky') {
            res = solveCholesky(matrixA, vectorB);
          } else if (method === 'jacobi') {
            res = jacobi(matrixA, vectorB, vectorX0, tol, maxI);
          } else if (method === 'seidel') {
            res = gaussSeidel(matrixA, vectorB, vectorX0, tol, maxI);
          } else if (method === 'power') {
            res = powerMethod(matrixA, vectorX0, tol, maxI);
          } else if (method === 'inverse_power') {
            res = inversePowerMethod(matrixA, parseFloat(shift) || 0, vectorX0, tol, maxI);
          } else if (method === 'qr_eigen') {
            res = qrAlgorithm(matrixA, tol, maxI);
          } else {
            throw new Error(`Método no reconocido: ${method}`);
          }

          const t1 = performance.now();
          resolve({
            ...res,
            executionTimeMs: parseFloat((t1 - t0).toFixed(2)),
            isWorker: false
          });
        } catch (err) {
          reject(err);
        }
      }, 0);
    });
  }

  // Ejecución en Worker
  return new Promise((resolve, reject) => {
    const id = ++currentRequestId;
    pendingRequests.set(id, { resolve, reject });

    worker.postMessage({
      id,
      method,
      matrixA,
      vectorB,
      vectorX0,
      tolerance,
      maxIter,
      shift
    });
  });
}
