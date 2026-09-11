import * as math from 'mathjs';

/**
 * Parser matemático seguro utilizando mathjs AST.
 * Prohibido el uso de eval(). Todas las expresiones son analizadas sintácticamente y compiladas.
 */

/**
 * Valida y compila una expresión matemática de una sola variable f(x).
 * @param {string} expression - Cadena con la expresión matemática (ej: "x^3 - 2*x - 5")
 * @returns {{ evaluate: (x: number) => number, ast: math.MathNode, toTex: () => string }}
 */
export function compileFunction1D(expression) {
  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    throw new Error('La expresión matemática no puede estar vacía.');
  }

  const sanitized = expression.trim();
  let parsedNode;

  try {
    parsedNode = math.parse(sanitized);
  } catch (err) {
    throw new Error(`Error de sintaxis matemática: ${err.message || 'Expresión no válida.'}`);
  }

  const compiled = parsedNode.compile();

  const evaluate = (x) => {
    try {
      const scope = { x, e: Math.E, pi: Math.PI, PI: Math.PI };
      const res = compiled.evaluate(scope);

      if (typeof res === 'object' && res !== null && 're' in res) {
        // Número complejo
        if (Math.abs(res.im) > 1e-12) {
          throw new Error(`Resultado complejo no soportado en x = ${x}`);
        }
        return res.re;
      }

      if (typeof res !== 'number' || !Number.isFinite(res) || Number.isNaN(res)) {
        throw new Error(`Resultado no definido o infinito en x = ${x}`);
      }

      return res;
    } catch (evalErr) {
      throw new Error(`Error evaluando f(${x}): ${evalErr.message}`);
    }
  };

  const toTex = () => {
    try {
      return parsedNode.toTex({ parenthesis: 'auto' });
    } catch {
      return sanitized;
    }
  };

  return { evaluate, ast: parsedNode, toTex };
}

/**
 * Valida y compila una función de dos variables f(x, y) para Ecuaciones Diferenciales.
 * @param {string} expression - Cadena de la función (ej: "x - y + 1")
 * @returns {{ evaluate: (x: number, y: number) => number, ast: math.MathNode, toTex: () => string }}
 */
export function compileFunction2D(expression) {
  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    throw new Error('La expresión matemática no puede estar vacía.');
  }

  const sanitized = expression.trim();
  let parsedNode;

  try {
    parsedNode = math.parse(sanitized);
  } catch (err) {
    throw new Error(`Error de sintaxis en f(x, y): ${err.message || 'Expresión no válida.'}`);
  }

  const compiled = parsedNode.compile();

  const evaluate = (x, y) => {
    try {
      const scope = { x, y, e: Math.E, pi: Math.PI, PI: Math.PI };
      const res = compiled.evaluate(scope);

      if (typeof res === 'object' && res !== null && 're' in res) {
        if (Math.abs(res.im) > 1e-12) {
          throw new Error(`Resultado complejo en (x=${x}, y=${y})`);
        }
        return res.re;
      }

      if (typeof res !== 'number' || !Number.isFinite(res) || Number.isNaN(res)) {
        throw new Error(`Resultado indefinido en (x=${x}, y=${y})`);
      }

      return res;
    } catch (evalErr) {
      throw new Error(`Error evaluando f(${x}, ${y}): ${evalErr.message}`);
    }
  };

  const toTex = () => {
    try {
      return parsedNode.toTex({ parenthesis: 'auto' });
    } catch {
      return sanitized;
    }
  };

  return { evaluate, ast: parsedNode, toTex };
}

/**
 * Obtiene la derivada de f(x). Intenta derivada analítica simbólica con math.derivative;
 * si falla, utiliza fallback a diferencias finitas centradas de 4to orden.
 * @param {string} expression - Expresión de f(x)
 * @param {Function} fallbackEval - Función evaluable de f(x)
 * @returns {{ evaluateDerivative: (x: number) => number, isSymbolic: boolean, toTex: () => string }}
 */
export function getDerivative(expression, fallbackEval) {
  try {
    const derivNode = math.derivative(expression, 'x');
    const compiledDeriv = derivNode.compile();

    const evaluateDerivative = (x) => {
      try {
        const scope = { x, e: Math.E, pi: Math.PI, PI: Math.PI };
        const res = compiledDeriv.evaluate(scope);
        if (typeof res !== 'number' || !Number.isFinite(res) || Number.isNaN(res)) {
          throw new Error('Derivada simbólica indefinida.');
        }
        return res;
      } catch {
        // Fallback numérico si la analítica falla en este punto específico
        return numericDerivativeCentral(fallbackEval, x);
      }
    };

    return {
      evaluateDerivative,
      isSymbolic: true,
      toTex: () => derivNode.toTex({ parenthesis: 'auto' })
    };
  } catch {
    // Si la derivada analítica falla completamente para expresiones no soportadas
    return {
      evaluateDerivative: (x) => numericDerivativeCentral(fallbackEval, x),
      isSymbolic: false,
      toTex: () => `\\frac{d}{dx}\\left[${expression}\\right]`
    };
  }
}

/**
 * Derivada numérica por diferencias finitas centradas de 4to orden (O(h^4))
 */
export function numericDerivativeCentral(f, x, h = 1e-5) {
  const f_plus2 = f(x + 2 * h);
  const f_plus1 = f(x + h);
  const f_minus1 = f(x - h);
  const f_minus2 = f(x - 2 * h);
  return (-f_plus2 + 8 * f_plus1 - 8 * f_minus1 + f_minus2) / (12 * h);
}

/**
 * Formatea un número a un número fijo de decimales sin ceros redundantes extra si no es necesario,
 * o con notación científica si es muy pequeño.
 */
export function formatNum(value, decimals = 6) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'NaN';
  if (!Number.isFinite(value)) return value > 0 ? '+∞' : '-∞';
  if (Math.abs(value) < 1e-12 && value !== 0) return '0';
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 1e-4 && value !== 0)) {
    return value.toExponential(Math.max(2, decimals - 2));
  }
  return Number(value.toFixed(decimals)).toString();
}
