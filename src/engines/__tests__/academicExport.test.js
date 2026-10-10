import { describe, it, expect } from 'vitest';
import { translateExpression, expressionToLatex } from '../../services/expressionTranslator';
import {
  generatePythonCode,
  generateMatlabCode,
  generateCppCode
} from '../../services/codeExportService';
import {
  generateLatexReport,
  generatePrintableHtml
} from '../../services/academicReportService';
import { generatePureSvgString } from '../../components/SvgVectorPlot';

describe('Servicio de Traducción de Expresiones Matemáticas', () => {
  it('Traduce potencias a operadores nativos de Python, MATLAB y C++', () => {
    const expr = 'x^3 - 2*x + 1';
    const py = translateExpression(expr, 'python');
    const m = translateExpression(expr, 'matlab');
    const cpp = translateExpression(expr, 'cpp');

    expect(py).toContain('** 3');
    expect(m).toContain('.^ 3');
    expect(cpp).toContain('std::pow(x, 3)');
  });

  it('Traduce funciones trigonométricas y trascendentes correctamente', () => {
    const expr = 'sin(x) + cos(x) - exp(x)';
    const py = translateExpression(expr, 'python');
    const m = translateExpression(expr, 'matlab');
    const cpp = translateExpression(expr, 'cpp');

    expect(py).toContain('np.sin(x)');
    expect(py).toContain('np.cos(x)');
    expect(py).toContain('np.exp(x)');

    expect(m).toContain('sin(x)');
    expect(m).toContain('cos(x)');
    expect(m).toContain('exp(x)');

    expect(cpp).toContain('std::sin(x)');
    expect(cpp).toContain('std::cos(x)');
    expect(cpp).toContain('std::exp(x)');
  });

  it('Traduce constantes pi y e a sus representaciones correspondientes', () => {
    const expr = 'pi * x + e';
    const py = translateExpression(expr, 'python');
    const m = translateExpression(expr, 'matlab');
    const cpp = translateExpression(expr, 'cpp');

    expect(py).toContain('np.pi');
    expect(py).toContain('np.e');
    expect(m).toContain('pi');
    expect(cpp).toContain('M_PI');
  });

  it('Genera LaTeX matemático limpio a través del AST', () => {
    const expr = 'x^3 - 2*x - 5';
    const tex = expressionToLatex(expr);
    expect(tex).toContain('x');
    expect(tex).toContain('3');
  });
});

describe('Generador de Código (Python, MATLAB, C++)', () => {
  const dummyNonlinear = {
    moduleId: 'nonlinear',
    methodId: 'newton',
    methodName: 'Método de Newton-Raphson',
    rawInputs: {
      expression: 'x^3 - 2*x - 5',
      paramX0: 2,
      tolerance: 0.0001,
      maxIter: 100
    }
  };

  it('Genera script de Python con SciPy, NumPy y Matplotlib para ecuaciones no lineales', () => {
    const code = generatePythonCode(dummyNonlinear);
    expect(code).toContain('import numpy as np');
    expect(code).toContain('import matplotlib.pyplot as plt');
    expect(code).toContain('from scipy import optimize');
    expect(code).toContain('def f(x):');
    expect(code).toContain('x_k = 2');
    expect(code).toContain('optimize.root_scalar');
  });

  it('Genera script de MATLAB para ecuaciones no lineales', () => {
    const code = generateMatlabCode(dummyNonlinear);
    expect(code).toContain('clc; clear; close all;');
    expect(code).toContain('f = @(x)');
    expect(code).toContain('fzero(f, 2)');
    expect(code).toContain('figure(');
  });

  it('Genera código C++17 para ecuaciones no lineales', () => {
    const code = generateCppCode(dummyNonlinear);
    expect(code).toContain('#include <iostream>');
    expect(code).toContain('#include <cmath>');
    expect(code).toContain('double f(double x)');
    expect(code).toContain('int main()');
    expect(code).toContain('std::setprecision(6)');
  });

  it('Genera scripts para sistemas lineales (Gauss)', () => {
    const dummyLinear = {
      moduleId: 'linear',
      methodId: 'gauss',
      methodName: 'Eliminación Gaussiana',
      rawInputs: {
        matrixA: [[2, 1], [-3, 1]],
        vectorB: [8, -11]
      }
    };

    const py = generatePythonCode(dummyLinear);
    const m = generateMatlabCode(dummyLinear);
    const cpp = generateCppCode(dummyLinear);

    expect(py).toContain('import scipy.linalg as la');
    expect(py).toContain('np.linalg.solve(A, b)');
    expect(m).toContain('A = [2, 1; -3, 1];');
    expect(m).toContain('x_builtin = A \\ b;');
    expect(cpp).toContain('Eliminación Gaussiana con Pivoteo Parcial');
  });

  it('Genera scripts para integración numérica (Simpson 1/3)', () => {
    const dummyCalc = {
      moduleId: 'calculus',
      methodId: 'simpson13',
      methodName: 'Regla de Simpson 1/3',
      activeTab: 'integration',
      rawInputs: {
        expression: 'x^2',
        a: 0,
        b: 1,
        n: 4
      }
    };

    const py = generatePythonCode(dummyCalc);
    const m = generateMatlabCode(dummyCalc);
    const cpp = generateCppCode(dummyCalc);

    expect(py).toContain('from scipy import integrate');
    expect(py).toContain('integrate.quad');
    expect(m).toContain('integral(f, a, b)');
    expect(cpp).toContain('Simpson 1/3');
  });

  it('Genera scripts para EDO (RK4)', () => {
    const dummyOde = {
      moduleId: 'ode',
      methodId: 'rk4',
      methodName: 'Runge-Kutta 4° Orden',
      rawInputs: {
        expression: 'x + y',
        paramX0: 0,
        paramY0: 1,
        paramXf: 1,
        paramH: 0.1
      }
    };

    const py = generatePythonCode(dummyOde);
    const m = generateMatlabCode(dummyOde);
    const cpp = generateCppCode(dummyOde);

    expect(py).toContain('solve_ivp');
    expect(m).toContain('ode45');
    expect(cpp).toContain('k1 = f(x, y);');
  });

  it('Genera scripts para interpolación (Lagrange y Splines)', () => {
    const dummyInterp = {
      moduleId: 'interpolation',
      methodId: 'lagrange',
      rawInputs: {
        points: [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }],
        evalX: 1.5
      }
    };

    const py = generatePythonCode(dummyInterp);
    const m = generateMatlabCode(dummyInterp);
    const cpp = generateCppCode(dummyInterp);

    expect(py).toContain('from scipy.interpolate import lagrange, CubicSpline');
    expect(m).toContain('spline(x, y, x_eval)');
    expect(cpp).toContain('lagrangeInterpolation');
  });
});

describe('Generador de Informes Formales (LaTeX & PDF Imprimible)', () => {
  const dummyReportData = {
    moduleTitle: 'Ecuaciones No Lineales',
    methodName: 'Método de Newton-Raphson',
    problemStatement: 'Búsqueda de raíz de la ecuación f(x) = 0.',
    mathFormulationLatex: 'f(x) = x^3 - 2x - 5 = 0',
    methodFormulaLatex: 'x_{k+1} = x_k - \\frac{f(x_k)}{f\'(x_k)}',
    parameters: [
      { label: 'Ecuación f(x)', value: 'x^3 - 2*x - 5' },
      { label: 'Punto Inicial x0', value: '2' },
      { label: 'Tolerancia', value: '0.0001' }
    ],
    resultSummary: {
      converged: true,
      mainResultLabel: 'Raíz Aproximada x*',
      mainResultValue: '2.094551',
      iterationsCount: 4,
      finalError: '1.25e-5',
      message: 'Convergencia alcanzada.'
    },
    tableColumns: [
      { key: 'k', label: 'k' },
      { key: 'xi', label: 'x_k' },
      { key: 'ea', label: '|εa|' }
    ],
    tableData: [
      { k: 1, xi: 2, ea: null },
      { k: 2, xi: 2.1, ea: 0.1 },
      { k: 3, xi: 2.094551, ea: 0.00001 }
    ],
    plotPoints: {
      curve: [{ x: 1, y: -6 }, { x: 2, y: -1 }, { x: 3, y: 16 }],
      markers: [{ x: 2, y: -1 }, { x: 2.1, y: 0.06 }],
      root: { x: 2.094551, y: 0, label: 'Raíz' },
      xLabel: 'x',
      yLabel: 'f(x)'
    }
  };

  it('Genera documento LaTeX (.tex) completo con preámbulo, booktabs y TikZ/PGFPlots', () => {
    const tex = generateLatexReport(dummyReportData);

    expect(tex).toContain('\\documentclass[11pt,a4paper]{article}');
    expect(tex).toContain('\\usepackage{amsmath,amssymb,amsfonts}');
    expect(tex).toContain('\\usepackage{booktabs}');
    expect(tex).toContain('\\usepackage{pgfplots}');
    expect(tex).toContain('\\begin{document}');
    expect(tex).toContain('Planteamiento del Problema');
    expect(tex).toContain('f(x) = x^3 - 2x - 5 = 0');
    expect(tex).toContain('\\begin{tabular}');
    expect(tex).toContain('\\toprule');
    expect(tex).toContain('\\bottomrule');
    expect(tex).toContain('\\begin{tikzpicture}');
    expect(tex).toContain('\\begin{axis}');
    expect(tex).toContain('\\end{document}');
  });

  it('Genera documento HTML imprimible con KaTeX y reglas de estilo para PDF', () => {
    const html = generatePrintableHtml(dummyReportData);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('katex.min.css');
    expect(html).toContain('@page {');
    expect(html).toContain('NumCalc Pro');
    expect(html).toContain('Planteamiento Matemático');
    expect(html).toContain('Tabla de Iteraciones');
    expect(html).toContain('<svg');
  });

  it('Genera string SVG vectorial puro para incrustar en el informe PDF', () => {
    const svg = generatePureSvgString({
      curve: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
      markers: [{ x: 0.5, y: 0.5 }],
      specialPoint: { x: 1, y: 1, label: 'x*' }
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox=');
    expect(svg).toContain('<path');
    expect(svg).toContain('<circle');
  });
});
