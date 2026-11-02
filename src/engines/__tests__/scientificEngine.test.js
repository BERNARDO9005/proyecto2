import { describe, it, expect } from 'vitest';
import {
  evaluateScientific,
  toFractionString,
  toEngineeringString,
  toScientificString,
  expressionToLatex,
  PHYSICAL_CONSTANTS
} from '../scientificEngine';

describe('Scientific Calculator Engine (scientificEngine.js)', () => {
  describe('Aritmética básica y precedencia', () => {
    it('evalúa sumas y multiplicaciones respetando orden de operaciones', () => {
      const res = evaluateScientific('2 + 3 * 4');
      expect(res.result).toBe(14);
      expect(res.error).toBeNull();
    });

    it('evalúa paréntesis anidados correctamente', () => {
      const res = evaluateScientific('(2 + 3) * (10 - 2)');
      expect(res.result).toBe(40);
    });

    it('soporta potencias y raíces estándar', () => {
      const res1 = evaluateScientific('2^10');
      expect(res1.result).toBe(1024);

      const res2 = evaluateScientific('sqrt(144)');
      expect(res2.result).toBe(12);

      const res3 = evaluateScientific('cbrt(64)');
      expect(res3.result).toBe(4);

      const res4 = evaluateScientific('root(81, 4)');
      expect(res4.result).toBe(3);
    });

    it('soporta símbolos de teclado visual como × y ÷', () => {
      const res = evaluateScientific('10 × 5 ÷ 2');
      expect(res.result).toBe(25);
    });
  });

  describe('Modo Grados Sexagesimales (DEG)', () => {
    it('calcula sin(30) = 0.5 y cos(60) = 0.5', () => {
      const sin30 = evaluateScientific('sin(30)', { angleMode: 'DEG' });
      expect(sin30.result).toBeCloseTo(0.5, 10);

      const cos60 = evaluateScientific('cos(60)', { angleMode: 'DEG' });
      expect(cos60.result).toBeCloseTo(0.5, 10);
    });

    it('calcula cos(90) = 0 y sin(180) = 0 exactamente', () => {
      const cos90 = evaluateScientific('cos(90)', { angleMode: 'DEG' });
      expect(cos90.result).toBe(0);

      const sin180 = evaluateScientific('sin(180)', { angleMode: 'DEG' });
      expect(sin180.result).toBe(0);
    });

    it('calcula tan(45) = 1 y detecta asíntota tan(90)', () => {
      const tan45 = evaluateScientific('tan(45)', { angleMode: 'DEG' });
      expect(tan45.result).toBe(1);

      const tan90 = evaluateScientific('tan(90)', { angleMode: 'DEG' });
      expect(tan90.error).toBeTruthy();
      expect(tan90.error).toContain('Tangente indefinida');
    });

    it('calcula funciones inversas en grados asin(0.5) = 30 y atan(1) = 45', () => {
      const asin = evaluateScientific('asin(0.5)', { angleMode: 'DEG' });
      expect(asin.result).toBe(30);

      const atan = evaluateScientific('atan(1)', { angleMode: 'DEG' });
      expect(atan.result).toBe(45);
    });
  });

  describe('Modo Radianes (RAD) y Gradianes (GRAD)', () => {
    it('calcula sin(pi / 2) = 1 y cos(pi) = -1 en RAD', () => {
      const sinPi2 = evaluateScientific('sin(pi / 2)', { angleMode: 'RAD' });
      expect(sinPi2.result).toBe(1);

      const cosPi = evaluateScientific('cos(pi)', { angleMode: 'RAD' });
      expect(cosPi.result).toBe(-1);
    });

    it('calcula funciones en GRAD (100 grad = 90 deg)', () => {
      const sin100 = evaluateScientific('sin(100)', { angleMode: 'GRAD' });
      expect(sin100.result).toBe(1);

      const cos100 = evaluateScientific('cos(100)', { angleMode: 'GRAD' });
      expect(cos100.result).toBe(0);

      const tan50 = evaluateScientific('tan(50)', { angleMode: 'GRAD' });
      expect(tan50.result).toBe(1);
    });
  });

  describe('Logaritmos, Exponenciales e Hiperbólicas', () => {
    it('calcula ln(e) = 1, log10(1000) = 3 y log2(16) = 4', () => {
      const ln = evaluateScientific('ln(e)');
      expect(ln.result).toBe(1);

      const log10 = evaluateScientific('log10(1000)');
      expect(log10.result).toBe(3);

      const log2 = evaluateScientific('log2(16)');
      expect(log2.result).toBe(4);
    });

    it('rechaza argumentos no positivos para logaritmos', () => {
      const logNeg = evaluateScientific('ln(-5)');
      expect(logNeg.error).toBeTruthy();

      const logZero = evaluateScientific('log10(0)');
      expect(logZero.error).toBeTruthy();
    });

    it('calcula funciones hiperbólicas sinh(0) = 0 y cosh(0) = 1', () => {
      const sinh0 = evaluateScientific('sinh(0)');
      expect(sinh0.result).toBe(0);

      const cosh0 = evaluateScientific('cosh(0)');
      expect(cosh0.result).toBe(1);
    });
  });

  describe('Combinatoria y Factoriales', () => {
    it('evalúa factoriales 5! = 120', () => {
      const fact = evaluateScientific('5!');
      expect(fact.result).toBe(120);
    });

    it('evalúa combinaciones nCr y permutaciones nPr', () => {
      const ncr = evaluateScientific('nCr(6, 2)');
      expect(ncr.result).toBe(15);

      const npr = evaluateScientific('nPr(6, 2)');
      expect(npr.result).toBe(30);
    });
  });

  describe('Variables Ans y Memoria', () => {
    it('utiliza ans de operaciones previas', () => {
      const res = evaluateScientific('ans * 2 + 5', { ans: 20 });
      expect(res.result).toBe(45);
    });

    it('utiliza el valor de memoria almacenado', () => {
      const res = evaluateScientific('memory + 100', { memory: 450 });
      expect(res.result).toBe(550);
    });
  });

  describe('Formateo y Conversión Numérica', () => {
    it('convierte decimales limpios a fracciones', () => {
      expect(toFractionString(0.75)).toBe('3/4');
      expect(toFractionString(0.5)).toBe('1/2');
      expect(toFractionString(2.5)).toBe('5/2');
      expect(toFractionString(-0.125)).toBe('-1/8');
      expect(toFractionString(Math.PI)).toBeNull(); // Irracional no genera fracción espuria
    });

    it('formatea en notación de ingeniería (potencias de 3)', () => {
      const eng1 = toEngineeringString(1500, 4);
      expect(eng1).toContain('10^3');

      const eng2 = toEngineeringString(0.00045, 4);
      expect(eng2).toContain('10^-6');
    });

    it('formatea en notación científica', () => {
      const sci = toScientificString(123456, 4);
      expect(sci).toContain('e+5');
    });

    it('genera representaciones KaTeX de fórmulas', () => {
      const tex = expressionToLatex('sin(30) + sqrt(45)');
      expect(tex).toContain('\\sin');
      expect(tex).toContain('\\sqrt');
    });
  });

  describe('Integridad de Constantes Físicas', () => {
    it('contiene constantes esenciales con símbolos y valores numéricos válidos', () => {
      expect(PHYSICAL_CONSTANTS.length).toBeGreaterThanOrEqual(10);
      const c = PHYSICAL_CONSTANTS.find((item) => item.symbol === 'c');
      expect(c).toBeDefined();
      expect(c.value).toBe(299792458);

      const h = PHYSICAL_CONSTANTS.find((item) => item.symbol === 'h');
      expect(h).toBeDefined();
      expect(h.value).toBeCloseTo(6.626e-34, 30);
    });
  });
});
