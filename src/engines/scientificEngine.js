import { create, all } from 'mathjs';

/**
 * Motor de Cálculo para la Calculadora Científica Avanzada
 * 100% client-side, seguro con AST de mathjs, sin eval().
 * Soporta modos angulares (DEG, RAD, GRAD), funciones trigonométricas e hiperbólicas,
 * logaritmos, combinatoria, raíces, constantes físicas y memoria.
 */

/**
 * Limpia imprecisiones de coma flotante (p. ej. 0.49999999999999994 -> 0.5)
 */
export function cleanFloat(val) {
  if (typeof val !== 'number' || !Number.isFinite(val)) return val;
  const rounded = Math.round(val * 1e12) / 1e12;
  return Math.abs(val - rounded) < 1e-11 ? rounded : val;
}

/**
 * Crea una instancia de mathjs configurada para el modo angular especificado
 * @param {'DEG' | 'RAD' | 'GRAD'} angleMode
 */
export function createConfiguredMath(angleMode = 'DEG') {
  const m = create(all);

  const factor = angleMode === 'DEG' ? Math.PI / 180 : (angleMode === 'GRAD' ? Math.PI / 200 : 1);
  const invFactor = 1 / factor;

  m.import(
    {
      // --- Trigonometría directa ---
      sin: (x) => {
        if (angleMode === 'DEG') {
          const d = ((x % 360) + 360) % 360;
          if (d === 0 || d === 180 || d === 360) return 0;
          if (d === 90) return 1;
          if (d === 270) return -1;
        } else if (angleMode === 'GRAD') {
          const g = ((x % 400) + 400) % 400;
          if (g === 0 || g === 200 || g === 400) return 0;
          if (g === 100) return 1;
          if (g === 300) return -1;
        }
        const val = Math.sin(x * factor);
        return cleanFloat(Math.abs(val) < 1e-15 ? 0 : val);
      },
      cos: (x) => {
        if (angleMode === 'DEG') {
          const d = ((x % 360) + 360) % 360;
          if (d === 90 || d === 270) return 0;
          if (d === 0 || d === 360) return 1;
          if (d === 180) return -1;
        } else if (angleMode === 'GRAD') {
          const g = ((x % 400) + 400) % 400;
          if (g === 100 || g === 300) return 0;
          if (g === 0 || g === 400) return 1;
          if (g === 200) return -1;
        }
        const val = Math.cos(x * factor);
        return cleanFloat(Math.abs(val) < 1e-15 ? 0 : val);
      },
      tan: (x) => {
        if (angleMode === 'DEG') {
          const d = ((x % 360) + 360) % 360;
          if (d === 90 || d === 270) throw new Error('Tangente indefinida (asíntota en 90°/270°)');
          if (d === 45 || d === 225) return 1;
          if (d === 135 || d === 315) return -1;
          if (d === 0 || d === 180 || d === 360) return 0;
        } else if (angleMode === 'GRAD') {
          const g = ((x % 400) + 400) % 400;
          if (g === 100 || g === 300) throw new Error('Tangente indefinida (asíntota en 100/300 grad)');
          if (g === 50 || g === 250) return 1;
          if (g === 150 || g === 350) return -1;
          if (g === 0 || g === 200 || g === 400) return 0;
        }
        const c = Math.cos(x * factor);
        if (Math.abs(c) < 1e-15) throw new Error('Tangente indefinida (división por cero)');
        const val = Math.tan(x * factor);
        return cleanFloat(Math.abs(val) < 1e-15 ? 0 : val);
      },
      cot: (x) => {
        const s = Math.sin(x * factor);
        if (Math.abs(s) < 1e-15) throw new Error('Cotangente indefinida (división por cero)');
        return cleanFloat(Math.cos(x * factor) / s);
      },
      sec: (x) => {
        const c = Math.cos(x * factor);
        if (Math.abs(c) < 1e-15) throw new Error('Secante indefinida (división por cero)');
        return cleanFloat(1 / c);
      },
      csc: (x) => {
        const s = Math.sin(x * factor);
        if (Math.abs(s) < 1e-15) throw new Error('Cosecante indefinida (división por cero)');
        return cleanFloat(1 / s);
      },

      // --- Trigonometría inversa ---
      asin: (x) => {
        if (x < -1 || x > 1) throw new Error('asin(x): dominio [-1, 1] excedido');
        return cleanFloat(Math.asin(x) * invFactor);
      },
      acos: (x) => {
        if (x < -1 || x > 1) throw new Error('acos(x): dominio [-1, 1] excedido');
        return cleanFloat(Math.acos(x) * invFactor);
      },
      atan: (x) => cleanFloat(Math.atan(x) * invFactor),
      atan2: (y, x) => cleanFloat(Math.atan2(y, x) * invFactor),

      // --- Funciones hiperbólicas ---
      sinh: (x) => cleanFloat(Math.sinh(x)),
      cosh: (x) => cleanFloat(Math.cosh(x)),
      tanh: (x) => cleanFloat(Math.tanh(x)),
      asinh: (x) => cleanFloat(Math.asinh(x)),
      acosh: (x) => {
        if (x < 1) throw new Error('acosh(x): requiere x >= 1');
        return cleanFloat(Math.acosh(x));
      },
      atanh: (x) => {
        if (x <= -1 || x >= 1) throw new Error('atanh(x): requiere -1 < x < 1');
        return cleanFloat(Math.atanh(x));
      },

      // --- Logaritmos & Exponenciales ---
      ln: (x) => {
        if (x <= 0) throw new Error('ln(x): requiere x > 0');
        return cleanFloat(Math.log(x));
      },
      log10: (x) => {
        if (x <= 0) throw new Error('log10(x): requiere x > 0');
        return cleanFloat(Math.log10(x));
      },
      log2: (x) => {
        if (x <= 0) throw new Error('log2(x): requiere x > 0');
        return cleanFloat(Math.log2(x));
      },

      // --- Combinatoria ---
      nCr: (n, r) => m.combinations(n, r),
      nPr: (n, r) => m.permutations(n, r),

      // --- Raíz cúbica y n-ésima ---
      cbrt: (x) => cleanFloat(Math.cbrt(x)),
      root: (x, n) => {
        if (n === 0) throw new Error('Índice de raíz no puede ser cero');
        if (x < 0 && n % 2 === 0) throw new Error('Raíz par de número negativo genera complejo');
        const sign = x < 0 ? -1 : 1;
        return cleanFloat(sign * Math.pow(Math.abs(x), 1 / n));
      },

      // --- Aleatorio ---
      rand: () => Math.random(),
      random: () => Math.random()
    },
    { override: true }
  );

  return m;
}

/**
 * Convierte un número a fracción irreducible si es limpio (denominador <= 5000)
 */
export function toFractionString(val) {
  if (typeof val !== 'number' || !Number.isFinite(val) || Number.isInteger(val)) return null;
  try {
    const m = create(all);
    const f = m.fraction(val);
    if (f.d <= 5000 && f.d > 1) {
      const sign = f.s < 0 ? '-' : '';
      return `${sign}${f.n}/${f.d}`;
    }
  } catch {
    // Si no se puede convertir a fracción simple
  }
  return null;
}

/**
 * Notación de ingeniería (exponente múltiplo de 3)
 */
export function toEngineeringString(val, precision = 6) {
  if (typeof val !== 'number' || !Number.isFinite(val) || val === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(val)));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = val / Math.pow(10, engExp);
  const prec = Math.max(1, Math.min(precision, 8));
  return `${Number(mantissa.toFixed(prec))} × 10^${engExp}`;
}

/**
 * Notación científica estándar
 */
export function toScientificString(val, precision = 6) {
  if (typeof val !== 'number' || !Number.isFinite(val)) return String(val);
  const prec = Math.max(1, Math.min(precision, 8));
  return val.toExponential(prec);
}

/**
 * Formatea un resultado numérico
 */
export function formatResult(val, precision = 6) {
  if (val === null || val === undefined || Number.isNaN(val)) return 'Error';
  if (!Number.isFinite(val)) return val > 0 ? '+∞' : '-∞';
  if (Number.isInteger(val)) return val.toString();
  if (Math.abs(val) < 1e-12 && val !== 0) return '0';
  if (Math.abs(val) >= 1e12 || (Math.abs(val) < 1e-5 && val !== 0)) {
    return val.toExponential(Math.max(2, precision - 2));
  }
  return Number(val.toFixed(precision)).toString();
}

/**
 * Convierte una expresión en LaTeX mediante mathjs AST toTex()
 */
export function expressionToLatex(expression) {
  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    return '';
  }
  const cleanExpr = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .trim();

  try {
    const m = create(all);
    const node = m.parse(cleanExpr);
    return node.toTex({ parenthesis: 'auto' });
  } catch {
    // Si la expresión está a medio escribir, no romper la vista
    return cleanExpr
      .replace(/\*/g, ' \\cdot ')
      .replace(/\//g, ' / ')
      .replace(/pi/g, '\\pi')
      .replace(/sqrt\(/g, '\\sqrt{')
      .replace(/alpha/g, '\\alpha');
  }
}

/**
 * Evalúa una expresión en la calculadora científica con soporte completo
 * @param {string} expression - Cadena con la fórmula a evaluar
 * @param {Object} options
 * @param {'DEG' | 'RAD' | 'GRAD'} [options.angleMode='DEG']
 * @param {number} [options.ans=0]
 * @param {number} [options.precision=6]
 * @param {number} [options.memory=0]
 * @returns {{
 *   result: number,
 *   formatted: string,
 *   scientific: string,
 *   engineering: string,
 *   fraction: string|null,
 *   latex: string,
 *   error: string|null
 * }}
 */
export function evaluateScientific(expression, options = {}) {
  const {
    angleMode = 'DEG',
    ans = 0,
    precision = 6,
    memory = 0
  } = options;

  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    return {
      result: 0,
      formatted: '0',
      scientific: '0',
      engineering: '0',
      fraction: null,
      latex: '',
      error: 'Expresión vacía'
    };
  }

  // Preprocesar caracteres visuales
  let sanitized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/Ans/gi, 'ans')
    .replace(/MR/g, 'memory')
    .trim();

  try {
    const mathInstance = createConfiguredMath(angleMode);
    const scope = {
      ans: typeof ans === 'number' && Number.isFinite(ans) ? ans : 0,
      memory: typeof memory === 'number' && Number.isFinite(memory) ? memory : 0,
      pi: Math.PI,
      PI: Math.PI,
      e: Math.E,
      phi: (1 + Math.sqrt(5)) / 2
    };

    const parsedNode = mathInstance.parse(sanitized);
    const compiled = parsedNode.compile();
    let rawResult = compiled.evaluate(scope);

    // Si devuelve un número complejo
    if (typeof rawResult === 'object' && rawResult !== null && 're' in rawResult) {
      if (Math.abs(rawResult.im) > 1e-12) {
        throw new Error(`Resultado complejo no soportado (${rawResult.re} + ${rawResult.im}i)`);
      }
      rawResult = rawResult.re;
    }

    if (typeof rawResult !== 'number' || !Number.isFinite(rawResult) || Number.isNaN(rawResult)) {
      throw new Error('Resultado numérico no definido o infinito');
    }

    const cleanedResult = cleanFloat(rawResult);
    const formatted = formatResult(cleanedResult, precision);
    const scientific = toScientificString(cleanedResult, precision);
    const engineering = toEngineeringString(cleanedResult, precision);
    const fraction = toFractionString(cleanedResult);

    let latex = '';
    try {
      latex = parsedNode.toTex({ parenthesis: 'auto' });
    } catch {
      latex = sanitized;
    }

    return {
      result: cleanedResult,
      formatted,
      scientific,
      engineering,
      fraction,
      latex,
      error: null
    };
  } catch (err) {
    return {
      result: null,
      formatted: 'Error',
      scientific: 'Error',
      engineering: 'Error',
      fraction: null,
      latex: expressionToLatex(expression),
      error: err.message || 'Error de sintaxis matemática'
    };
  }
}

/**
 * Constantes Científicas y Físicas Fundamentales
 */
export const PHYSICAL_CONSTANTS = [
  {
    symbol: 'c',
    name: 'Velocidad de la luz en el vacío',
    value: 299792458,
    unit: 'm / s',
    category: 'Física Clásica & Relatividad',
    latex: 'c = 2.9979 \\times 10^8 \\text{ m/s}'
  },
  {
    symbol: 'h',
    name: 'Constante de Planck',
    value: 6.62607015e-34,
    unit: 'J · s',
    category: 'Mecánica Cuántica',
    latex: 'h = 6.6261 \\times 10^{-34} \\text{ J}\\cdot\\text{s}'
  },
  {
    symbol: 'hbar',
    name: 'Constante reducida de Planck (ħ)',
    value: 1.054571817e-34,
    unit: 'J · s',
    category: 'Mecánica Cuántica',
    latex: '\\hbar = 1.0546 \\times 10^{-34} \\text{ J}\\cdot\\text{s}'
  },
  {
    symbol: 'G',
    name: 'Constante de gravitación universal',
    value: 6.6743e-11,
    unit: 'm³ / (kg · s²)',
    category: 'Astrofísica & Cosmología',
    latex: 'G = 6.6743 \\times 10^{-11} \\text{ m}^3/(\\text{kg}\\cdot\\text{s}^2)'
  },
  {
    symbol: 'k_B',
    name: 'Constante de Boltzmann',
    value: 1.380649e-23,
    unit: 'J / K',
    category: 'Termodinámica',
    latex: 'k_B = 1.3806 \\times 10^{-23} \\text{ J/K}'
  },
  {
    symbol: 'e_charge',
    name: 'Carga elemental (e)',
    value: 1.602176634e-19,
    unit: 'C',
    category: 'Electromagnetismo',
    latex: 'e = 1.6022 \\times 10^{-19} \\text{ C}'
  },
  {
    symbol: 'm_e',
    name: 'Masa del electrón en reposo',
    value: 9.1093837e-31,
    unit: 'kg',
    category: 'Física Atómica',
    latex: 'm_e = 9.1094 \\times 10^{-31} \\text{ kg}'
  },
  {
    symbol: 'm_p',
    name: 'Masa del protón en reposo',
    value: 1.67262192e-27,
    unit: 'kg',
    category: 'Física Nuclear',
    latex: 'm_p = 1.6726 \\times 10^{-27} \\text{ kg}'
  },
  {
    symbol: 'N_A',
    name: 'Constante de Avogadro',
    value: 6.02214076e23,
    unit: 'mol⁻¹',
    category: 'Química & Termodinámica',
    latex: 'N_A = 6.0221 \\times 10^{23} \\text{ mol}^{-1}'
  },
  {
    symbol: 'R_gas',
    name: 'Constante universal de los gases ideales',
    value: 8.314462618,
    unit: 'J / (mol · K)',
    category: 'Termodinámica',
    latex: 'R = 8.3145 \\text{ J}/(\\text{mol}\\cdot\\text{K})'
  },
  {
    symbol: 'g',
    name: 'Aceleración estándar de la gravedad terrestre',
    value: 9.80665,
    unit: 'm / s²',
    category: 'Mecánica Clásica',
    latex: 'g = 9.80665 \\text{ m/s}^2'
  },
  {
    symbol: 'eps_0',
    name: 'Permitividad eléctrica del vacío (ε₀)',
    value: 8.8541878128e-12,
    unit: 'F / m',
    category: 'Electromagnetismo',
    latex: '\\varepsilon_0 = 8.8542 \\times 10^{-12} \\text{ F/m}'
  },
  {
    symbol: 'mu_0',
    name: 'Permeabilidad magnética del vacío (μ₀)',
    value: 1.25663706212e-6,
    unit: 'N / A²',
    category: 'Electromagnetismo',
    latex: '\\mu_0 = 1.2566 \\times 10^{-6} \\text{ N/A}^2'
  },
  {
    symbol: 'sigma_sb',
    name: 'Constante de Stefan-Boltzmann (σ)',
    value: 5.670374419e-8,
    unit: 'W / (m² · K⁴)',
    category: 'Radiación Térmica',
    latex: '\\sigma = 5.6704 \\times 10^{-8} \\text{ W}/(\\text{m}^2\\cdot\\text{K}^4)'
  },
  {
    symbol: 'phi',
    name: 'Número áureo (Proporción dorada)',
    value: 1.618033988749895,
    unit: 'adimensional',
    category: 'Matemáticas Fundamentales',
    latex: '\\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.61803'
  }
];
