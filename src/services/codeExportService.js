import { translateExpression } from './expressionTranslator';

/**
 * Servicio de Generación de Scripts de Código Científico
 * Genera código equivalente en Python (NumPy/SciPy), MATLAB/Octave y C++ (C++17)
 * para resolver con exactitud el problema configurado por el usuario.
 */

/**
 * Descarga un archivo de código al equipo local.
 * @param {string} filename - Nombre del archivo (ej: "metodo_newton.py")
 * @param {string} content - Contenido en texto del script
 */
export function downloadCodeFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// =========================================================================
// MÓDULO 1: ECUACIONES NO LINEALES
// =========================================================================

function generateNonlinearPython(data) {
  const expr = data.rawInputs?.expression || 'x**3 - 2*x - 5';
  const pyExpr = translateExpression(expr, 'python');
  const method = data.methodId || 'bisection';
  const tol = data.rawInputs?.tolerance || 1e-4;
  const maxIter = data.rawInputs?.maxIter || 100;
  const a = data.rawInputs?.paramA ?? 1;
  const b = data.rawInputs?.paramB ?? 3;
  const x0 = data.rawInputs?.paramX0 ?? 2;
  const x1 = data.rawInputs?.paramX1 ?? 3;

  return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Ecuaciones No Lineales
Método: ${data.methodName || method}
Ecuación: f(x) = ${expr} = 0
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy import optimize

# 1. Definición de la función matemática f(x)
def f(x):
    return ${pyExpr}

# 2. Parámetros de ejecución
tolerancia = ${tol}
max_iter = ${maxIter}

print("=" * 65)
print("NumCalc Pro - Solución de Ecuaciones No Lineales")
print(f"Método seleccionado: ${data.methodName || method}")
print(f"Ecuación: f(x) = {${JSON.stringify(expr)}}")
print("=" * 65)

${
  method === 'bisection'
    ? `# 3. Implementación Algorítmica: Bisección
a = ${a}
b = ${b}

if f(a) * f(b) > 0:
    raise ValueError("Error: Teorema de Bolzano no se cumple. f(a) y f(b) tienen el mismo signo.")

print(f"{'Iter':<5} {'a':<14} {'b':<14} {'x_mid':<14} {'f(x_mid)':<14} {'|ea|':<12}")
print("-" * 65)

iteraciones = []
xr_old = None

for k in range(1, max_iter + 1):
    xr = (a + b) / 2.0
    fxr = f(xr)
    ea = abs(xr - xr_old) if xr_old is not None else float('nan')
    iteraciones.append((k, xr, fxr, ea))

    print(f"{k:<5} {a:<14.6f} {b:<14.6f} {xr:<14.6f} {fxr:<14.6e} {ea:<12.6e}")

    if abs(fxr) < 1e-15 or (xr_old is not None and ea < tolerancia):
        break

    if f(a) * fxr < 0:
        b = xr
    else:
        a = xr
    xr_old = xr

raiz = xr
`
    : method === 'regulaFalsi'
    ? `# 3. Implementación Algorítmica: Regula Falsi (Falsa Posición)
a = ${a}
b = ${b}

if f(a) * f(b) > 0:
    raise ValueError("Error: Teorema de Bolzano no se cumple.")

print(f"{'Iter':<5} {'a':<14} {'b':<14} {'xr':<14} {'f(xr)':<14} {'|ea|':<12}")
print("-" * 65)

iteraciones = []
xr_old = None

for k in range(1, max_iter + 1):
    fa = f(a)
    fb = f(b)
    xr = b - (fb * (b - a)) / (fb - fa)
    fxr = f(xr)
    ea = abs(xr - xr_old) if xr_old is not None else float('nan')
    iteraciones.append((k, xr, fxr, ea))

    print(f"{k:<5} {a:<14.6f} {b:<14.6f} {xr:<14.6f} {fxr:<14.6e} {ea:<12.6e}")

    if abs(fxr) < 1e-15 or (xr_old is not None and ea < tolerancia):
        break

    if fa * fxr < 0:
        b = xr
    else:
        a = xr
    xr_old = xr

raiz = xr
`
    : method === 'newton'
    ? `# 3. Implementación Algorítmica: Newton-Raphson
x_k = ${x0}
h_diff = 1e-6

def df(x):
    # Derivada numérica por diferencias centradas
    return (f(x + h_diff) - f(x - h_diff)) / (2.0 * h_diff)

print(f"{'Iter':<5} {'x_k':<14} {'f(x_k)':<14} {'df(x_k)':<14} {'x_{k+1}':<14} {'|ea|':<12}")
print("-" * 75)

iteraciones = []

for k in range(1, max_iter + 1):
    fx = f(x_k)
    dfx = df(x_k)
    if abs(dfx) < 1e-12:
        raise ZeroDivisionError(f"Derivada horizontal en iteración {k}.")

    x_next = x_k - fx / dfx
    ea = abs(x_next - x_k)
    iteraciones.append((k, x_k, fx, x_next, ea))

    print(f"{k:<5} {x_k:<14.6f} {fx:<14.6e} {dfx:<14.6e} {x_next:<14.6f} {ea:<12.6e}")

    if ea < tolerancia or abs(fx) < 1e-15:
        x_k = x_next
        break
    x_k = x_next

raiz = x_k
`
    : `# 3. Implementación Algorítmica: Secante
x_prev = ${x0}
x_curr = ${x1}

print(f"{'Iter':<5} {'x_{k-1}':<14} {'x_k':<14} {'x_{k+1}':<14} {'f(x_{k+1})':<14} {'|ea|':<12}")
print("-" * 75)

iteraciones = []

for k in range(1, max_iter + 1):
    f_prev = f(x_prev)
    f_curr = f(x_curr)
    denom = f_curr - f_prev
    if abs(denom) < 1e-14:
        raise ZeroDivisionError(f"División por cero en secante (f(x_k) ≈ f(x_{{k-1}})).")

    x_next = x_curr - f_curr * (x_curr - x_prev) / denom
    fx_next = f(x_next)
    ea = abs(x_next - x_curr)
    iteraciones.append((k, x_curr, x_next, ea))

    print(f"{k:<5} {x_prev:<14.6f} {x_curr:<14.6f} {x_next:<14.6f} {fx_next:<14.6e} {ea:<12.6e}")

    if ea < tolerancia:
        x_curr = x_next
        break
    x_prev = x_curr
    x_curr = x_next

raiz = x_curr
`
}

# 4. Verificación con SciPy
try:
${
  method === 'bisection' || method === 'regulaFalsi'
    ? `    sol_scipy = optimize.root_scalar(f, bracket=[${a}, ${b}], method='brentq')`
    : method === 'newton'
    ? `    sol_scipy = optimize.root_scalar(f, x0=${x0}, fprime=df, method='newton')`
    : `    sol_scipy = optimize.root_scalar(f, x0=${x0}, x1=${x1}, method='secant')`
}
    print(f"\\nSolución NumCalc Pro: x ≈ {raiz:.8f}")
    print(f"Solución SciPy (built-in): x ≈ {sol_scipy.root:.8f}")
    print(f"Error residual |f(x*)| = {abs(f(raiz)):.2e}")
except Exception as e:
    print(f"\\nSolución NumCalc Pro: x ≈ {raiz:.8f}")
    print(f"SciPy root_scalar info: {e}")

# 5. Visualización Científica con Matplotlib
x_vals = np.linspace(raiz - 2, raiz + 2, 400)
y_vals = f(x_vals)

plt.figure(figsize=(9, 5))
plt.plot(x_vals, y_vals, label=f'f(x) = ${expr}$', color='#0284c7', linewidth=2)
plt.axhline(0, color='gray', linestyle='--', linewidth=1)
plt.plot(raiz, f(raiz), 'r*', markersize=14, label=f'Raíz encontrada (x* = {raiz:.6f})')

plt.title('NumCalc Pro - Búsqueda de Raíces: ' + ${JSON.stringify(data.methodName || method)}, fontsize=12)
plt.xlabel('x', fontsize=11)
plt.ylabel('f(x)', fontsize=11)
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`;
}

function generateNonlinearMatlab(data) {
  const expr = data.rawInputs?.expression || 'x^3 - 2*x - 5';
  const mExpr = translateExpression(expr, 'matlab');
  const method = data.methodId || 'bisection';
  const tol = data.rawInputs?.tolerance || 1e-4;
  const maxIter = data.rawInputs?.maxIter || 100;
  const a = data.rawInputs?.paramA ?? 1;
  const b = data.rawInputs?.paramB ?? 3;
  const x0 = data.rawInputs?.paramX0 ?? 2;
  const x1 = data.rawInputs?.paramX1 ?? 3;

  return `% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Ecuaciones No Lineales
% Método: ${data.methodName || method}
% =========================================================================
clc; clear; close all;

% 1. Definición de la función objetivo
f = @(x) ${mExpr};

% 2. Parámetros
tol = ${tol};
max_iter = ${maxIter};

fprintf('=== NUMCALC PRO: SOLUCION DE ECUACIONES NO LINEALES ===\\n');
fprintf('Metodo: ${data.methodName || method}\\n');
fprintf('Ecuacion: f(x) = ${expr}\\n\\n');

${
  method === 'bisection'
    ? `% 3. Bisección
a = ${a};
b = ${b};

if f(a) * f(b) > 0
    error('El Teorema de Bolzano no se cumple en [a, b].');
end

fprintf('%-5s %-12s %-12s %-12s %-12s %-12s\\n', 'k', 'a', 'b', 'xr', 'f(xr)', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

xr_old = NaN;
for k = 1:max_iter
    xr = (a + b) / 2;
    fxr = f(xr);
    ea = abs(xr - xr_old);
    
    fprintf('%-5d %-12.6f %-12.6f %-12.6f %-12.4e %-12.4e\\n', k, a, b, xr, fxr, ea);
    
    if abs(fxr) < 1e-15 || (~isnan(xr_old) && ea < tol)
        break;
    end
    
    if f(a) * fxr < 0
        b = xr;
    else
        a = xr;
    end
    xr_old = xr;
end
root = xr;
`
    : method === 'regulaFalsi'
    ? `% 3. Regula Falsi
a = ${a};
b = ${b};

if f(a) * f(b) > 0
    error('El Teorema de Bolzano no se cumple en [a, b].');
end

fprintf('%-5s %-12s %-12s %-12s %-12s %-12s\\n', 'k', 'a', 'b', 'xr', 'f(xr)', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

xr_old = NaN;
for k = 1:max_iter
    fa = f(a); fb = f(b);
    xr = b - (fb * (b - a)) / (fb - fa);
    fxr = f(xr);
    ea = abs(xr - xr_old);
    
    fprintf('%-5d %-12.6f %-12.6f %-12.6f %-12.4e %-12.4e\\n', k, a, b, xr, fxr, ea);
    
    if abs(fxr) < 1e-15 || (~isnan(xr_old) && ea < tol)
        break;
    end
    
    if fa * fxr < 0
        b = xr;
    else
        a = xr;
    end
    xr_old = xr;
end
root = xr;
`
    : method === 'newton'
    ? `% 3. Newton-Raphson
x_k = ${x0};
h = 1e-6;
df = @(x) (f(x + h) - f(x - h)) / (2*h);

fprintf('%-5s %-14s %-14s %-14s %-12s\\n', 'k', 'x_k', 'f(x_k)', 'x_{k+1}', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

for k = 1:max_iter
    fx = f(x_k);
    dfx = df(x_k);
    if abs(dfx) < 1e-14
        error('Derivada nula detectada.');
    end
    x_next = x_k - fx / dfx;
    ea = abs(x_next - x_k);
    
    fprintf('%-5d %-14.6f %-14.4e %-14.6f %-12.4e\\n', k, x_k, fx, x_next, ea);
    
    if ea < tol || abs(fx) < 1e-15
        x_k = x_next;
        break;
    end
    x_k = x_next;
end
root = x_k;
`
    : `% 3. Secante
x_prev = ${x0};
x_curr = ${x1};

fprintf('%-5s %-14s %-14s %-14s %-12s\\n', 'k', 'x_{k-1}', 'x_k', 'x_{k+1}', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

for k = 1:max_iter
    fp = f(x_prev);
    fc = f(x_curr);
    x_next = x_curr - fc * (x_curr - x_prev) / (fc - fp);
    ea = abs(x_next - x_curr);
    
    fprintf('%-5d %-14.6f %-14.6f %-14.6f %-12.4e\\n', k, x_prev, x_curr, x_next, ea);
    
    if ea < tol
        x_curr = x_next;
        break;
    end
    x_prev = x_curr;
    x_curr = x_next;
end
root = x_curr;
`
}

% 4. Verificación nativa con MATLAB fzero
sol_fzero = fzero(f, ${method === 'bisection' || method === 'regulaFalsi' ? `[${a}, ${b}]` : `${x0}`});
fprintf('\\nRaiz NumCalc Pro: x = %.8f\\n', root);
fprintf('Raiz fzero nativo: x = %.8f\\n', sol_fzero);

% 5. Gráfico
figure('Name', 'NumCalc Pro - Raices');
fplot(f, [root - 2, root + 2], 'LineWidth', 2, 'Color', [0.0 0.45 0.74]);
hold on; grid on;
yline(0, '--k', 'LineWidth', 1);
plot(root, f(root), 'pr', 'MarkerSize', 12, 'MarkerFaceColor', 'r');
title(['Convergencia de ' '${data.methodName || method}']);
xlabel('x'); ylabel('f(x)');
legend('f(x)', 'y = 0', ['Raiz x* = ' num2str(root, '%.6f')]);
`;
}

function generateNonlinearCpp(data) {
  const expr = data.rawInputs?.expression || 'x^3 - 2*x - 5';
  const cppExpr = translateExpression(expr, 'cpp');
  const method = data.methodId || 'bisection';
  const tol = data.rawInputs?.tolerance || 1e-4;
  const maxIter = data.rawInputs?.maxIter || 100;
  const a = data.rawInputs?.paramA ?? 1;
  const b = data.rawInputs?.paramB ?? 3;
  const x0 = data.rawInputs?.paramX0 ?? 2;
  const x1 = data.rawInputs?.paramX1 ?? 3;

  return `/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Ecuaciones No Lineales
 * Método: ${data.methodName || method}
 * Compilación: g++ -std=c++17 -O2 main.cpp -o main && ./main
 */

#include <iostream>
#include <cmath>
#include <iomanip>
#include <string>

// 1. Función f(x)
double f(double x) {
    return ${cppExpr};
}

${method === 'newton' ? `double df(double x, double h = 1e-6) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}` : ''}

int main() {
    std::cout << std::string(60, '=') << "\\n";
    std::cout << "NumCalc Pro - Solucion de Ecuaciones No Lineales\\n";
    std::cout << "Metodo: ${data.methodName || method}\\n";
    std::cout << std::string(60, '=') << "\\n\\n";

    const double tol = ${tol};
    const int maxIter = ${maxIter};

    std::cout << std::fixed << std::setprecision(6);

${
  method === 'bisection'
    ? `    double a = ${a};
    double b = ${b};

    if (f(a) * f(b) > 0) {
        std::cerr << "Error: No cumple el Teorema de Bolzano en [a, b].\\n";
        return 1;
    }

    std::cout << std::setw(6) << "k" 
              << std::setw(14) << "a" 
              << std::setw(14) << "b" 
              << std::setw(14) << "xr" 
              << std::setw(14) << "f(xr)" 
              << std::setw(14) << "|ea|" << "\\n";
    std::cout << std::string(76, '-') << "\\n";

    double xr_old = 0.0;
    double root = 0.0;

    for (int k = 1; k <= maxIter; ++k) {
        double xr = (a + b) / 2.0;
        double fxr = f(xr);
        double ea = (k == 1) ? 0.0 : std::fabs(xr - xr_old);

        std::cout << std::setw(6) << k 
                  << std::setw(14) << a 
                  << std::setw(14) << b 
                  << std::setw(14) << xr 
                  << std::setw(14) << fxr 
                  << std::setw(14) << ea << "\\n";

        if (std::fabs(fxr) < 1e-15 || (k > 1 && ea < tol)) {
            root = xr;
            break;
        }

        if (f(a) * fxr < 0) b = xr;
        else a = xr;
        xr_old = xr;
        root = xr;
    }

    std::cout << "\\nRaiz aproximada: x* = " << root << "\\n";
`
    : method === 'newton'
    ? `    double x_k = ${x0};
    double root = x_k;

    std::cout << std::setw(6) << "k" 
              << std::setw(16) << "x_k" 
              << std::setw(16) << "f(x_k)" 
              << std::setw(16) << "x_{k+1}" 
              << std::setw(16) << "|ea|" << "\\n";
    std::cout << std::string(70, '-') << "\\n";

    for (int k = 1; k <= maxIter; ++k) {
        double fx = f(x_k);
        double dfx = df(x_k);
        if (std::fabs(dfx) < 1e-14) {
            std::cerr << "Derivada nula detectada.\\n";
            return 1;
        }
        double x_next = x_k - fx / dfx;
        double ea = std::fabs(x_next - x_k);

        std::cout << std::setw(6) << k 
                  << std::setw(16) << x_k 
                  << std::setw(16) << fx 
                  << std::setw(16) << x_next 
                  << std::setw(16) << ea << "\\n";

        if (ea < tol || std::fabs(fx) < 1e-15) {
            root = x_next;
            break;
        }
        x_k = x_next;
        root = x_k;
    }

    std::cout << "\\nRaiz aproximada: x* = " << root << "\\n";
`
    : `    double x_prev = ${x0};
    double x_curr = ${x1};
    double root = x_curr;

    for (int k = 1; k <= maxIter; ++k) {
        double fp = f(x_prev);
        double fc = f(x_curr);
        double x_next = x_curr - fc * (x_curr - x_prev) / (fc - fp);
        double ea = std::fabs(x_next - x_curr);

        if (ea < tol) {
            root = x_next;
            break;
        }
        x_prev = x_curr;
        x_curr = x_next;
        root = x_curr;
    }

    std::cout << "Raiz aproximada: x* = " << root << "\\n";
`
}
    return 0;
}
`;
}

// =========================================================================
// MÓDULO 2: SISTEMAS LINEALES Y AUTOVALORES
// =========================================================================

function generateLinearPython(data) {
  const method = data.methodId || 'gauss';
  const matrixA = data.rawInputs?.matrixA || [[2, 1], [1, 3]];
  const vectorB = data.rawInputs?.vectorB || [1, 2];
  const isEigen = data.category === 'eigen';

  const n = matrixA.length;
  const aStr = JSON.stringify(matrixA);
  const bStr = JSON.stringify(vectorB);

  return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Sistemas Lineales & Álgebra Matricial
Método: ${data.methodName || method}
Dimensión: ${n}x${n}
"""

import numpy as np
import scipy.linalg as la

A = np.array(${aStr}, dtype=float)
${!isEigen ? `b = np.array(${bStr}, dtype=float)` : ''}

print("=" * 60)
print("NumCalc Pro - Álgebra Lineal Numérica")
print(f"Método: ${data.methodName || method}")
print("Matriz A:")
print(A)
${!isEigen ? 'print("\\nVector b:", b)' : ''}
print("=" * 60)

${
  isEigen
    ? `# 1. Resolución de Autovalores y Autovectores
${
  method === 'power'
    ? `# Método de la Potencia
v = np.ones(${n})
max_iter = 100
tol = 1e-6

for k in range(max_iter):
    v_next = A @ v
    lambda_val = np.max(np.abs(v_next))
    v_next = v_next / lambda_val
    if np.linalg.norm(v_next - v) < tol:
        v = v_next
        break
    v = v_next

print(f"\\nAutovalor dominante (Método Potencia): λ ≈ {lambda_val:.8f}")
print("Autovector asociado normalizado:", np.round(v, 6))
`
    : `# Cálculo con scipy.linalg.eig
eigenvalues, eigenvectors = la.eig(A)
print("\\nAutovalores:")
for i, ev in enumerate(eigenvalues):
    print(f"λ_{i+1} = {ev:.6f}")
`
}
# Verificación con SciPy
vals_scipy, vecs_scipy = la.eig(A)
print("\\nVerificación SciPy la.eig(A):")
for i, val in enumerate(vals_scipy):
    print(f"  λ_{i+1} = {val.real:.6f} + {val.imag:.6f}j")
`
    : `# 1. Resolución del Sistema Ax = b
${
  method === 'gauss' || method === 'jordan'
    ? `# Eliminación Gaussiana con pivoteo parcial
n = len(b)
Aug = np.hstack([A, b.reshape(-1, 1)])

for i in range(n):
    # Pivoteo parcial
    max_row = i + np.argmax(np.abs(Aug[i:, i]))
    Aug[[i, max_row]] = Aug[[max_row, i]]
    
    for j in range(i + 1, n):
        factor = Aug[j, i] / Aug[i, i]
        Aug[j, i:] -= factor * Aug[i, i:]

# Sustitución hacia atrás
x = np.zeros(n)
for i in range(n - 1, -1, -1):
    x[i] = (Aug[i, -1] - np.dot(Aug[i, i+1:n], x[i+1:n])) / Aug[i, i]
`
    : method === 'doolittle'
    ? `# Factorización LU Doolittle
P, L, U = la.lu(A)
y = la.solve_triangular(L, P.T @ b, lower=True)
x = la.solve_triangular(U, y, lower=False)
`
    : method === 'cholesky'
    ? `# Descomposición de Cholesky
L = la.cholesky(A, lower=True)
y = la.solve_triangular(L, b, lower=True)
x = la.solve_triangular(L.T, y, lower=False)
`
    : `# Método Iterativo (Jacobi / Gauss-Seidel)
x = np.zeros_like(b)
for k in range(100):
    x_new = np.copy(x)
    for i in range(len(b)):
        s1 = np.dot(A[i, :i], x_new[:i])
        s2 = np.dot(A[i, i+1:], x[i+1:])
        x_new[i] = (b[i] - s1 - s2) / A[i, i]
    if np.linalg.norm(x_new - x, ord=np.inf) < 1e-5:
        x = x_new
        break
    x = x_new
`
}

# 2. Resultados
print("\\nVector Solución x:")
for i, val in enumerate(x):
    print(f"  x_{i+1} = {val:.8f}")

# 3. Verificación con numpy.linalg.solve
x_scipy = np.linalg.solve(A, b)
print("\\nSolución de referencia (np.linalg.solve):")
print(x_scipy)

# Residuo ||Ax - b||
residuo = np.linalg.norm(A @ x - b)
print(f"\\nNorma del Residuo ||Ax - b|| = {residuo:.2e}")
`
}
`;
}

function generateLinearMatlab(data) {
  const method = data.methodId || 'gauss';
  const matrixA = data.rawInputs?.matrixA || [[2, 1], [1, 3]];
  const vectorB = data.rawInputs?.vectorB || [1, 2];
  const isEigen = data.category === 'eigen';

  const mMat = matrixA.map((row) => row.join(', ')).join('; ');
  const mVec = vectorB.join('; ');

  return `% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Sistemas Lineales & Álgebra Matricial
% =========================================================================
clc; clear; close all;

A = [${mMat}];
${!isEigen ? `b = [${mVec}];` : ''}

fprintf('=== NUMCALC PRO: SISTEMAS LINEALES ===\\n');
fprintf('Metodo: ${data.methodName || method}\\n\\n');

${
  isEigen
    ? `% 1. Cálculo de Autovalores y Autovectores
[V, D] = eig(A);
fprintf('Autovalores de A:\\n');
disp(diag(D));
fprintf('Matriz de Autovectores V:\\n');
disp(V);
`
    : `% 1. Solución con operador división matricial (A \\ b)
x_builtin = A \\ b;

fprintf('Vector Solución x:\\n');
for i = 1:length(x_builtin)
    fprintf('  x(%d) = %.8f\\n', i, x_builtin(i));
end

% 2. Verificación de residuo
residuo = norm(A * x_builtin - b);
fprintf('\\nNorma del residuo ||Ax - b|| = %.2e\\n', residuo);
`
}
`;
}

function generateLinearCpp(data) {
  const matrixA = data.rawInputs?.matrixA || [[2, 1], [1, 3]];
  const vectorB = data.rawInputs?.vectorB || [1, 2];
  const n = matrixA.length;

  return `/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Sistemas Lineales (Eliminación Gaussiana con Pivoteo Parcial)
 * Compilación: g++ -std=c++17 -O2 main.cpp -o main && ./main
 */

#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>

int main() {
    const int n = ${n};
    std::vector<std::vector<double>> A = {
${matrixA.map((r) => `        {${r.join(', ')}}`).join(',\n')}
    };
    std::vector<double> b = {${vectorB.join(', ')}};

    // Eliminación Gaussiana con Pivoteo Parcial
    for (int i = 0; i < n; ++i) {
        int maxRow = i;
        for (int k = i + 1; k < n; ++k) {
            if (std::abs(A[k][i]) > std::abs(A[maxRow][i])) {
                maxRow = k;
            }
        }
        std::swap(A[i], A[maxRow]);
        std::swap(b[i], b[maxRow]);

        for (int k = i + 1; k < n; ++k) {
            double c = A[k][i] / A[i][i];
            for (int j = i; j < n; ++j) {
                A[k][j] -= c * A[i][j];
            }
            b[k] -= c * b[i];
        }
    }

    // Sustitución hacia atrás
    std::vector<double> x(n);
    for (int i = n - 1; i >= 0; --i) {
        double sum = 0.0;
        for (int j = i + 1; j < n; ++j) {
            sum += A[i][j] * x[j];
        }
        x[i] = (b[i] - sum) / A[i][i];
    }

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Solucion del Sistema Ax = b:\\n";
    for (int i = 0; i < n; ++i) {
        std::cout << "  x_" << (i + 1) << " = " << x[i] << "\\n";
    }

    return 0;
}
`;
}

// =========================================================================
// MÓDULO 3: CÁLCULO NUMÉRICO (INTEGRACIÓN Y DIFERENCIACIÓN)
// =========================================================================

function generateCalculusPython(data) {
  const isDiff = data.activeTab === 'differentiation';
  const expr = data.rawInputs?.expression || (isDiff ? 'x**3' : 'x**2');
  const pyExpr = translateExpression(expr, 'python');
  const method = data.methodId || (isDiff ? 'central' : 'simpson13');

  if (isDiff) {
    const x0 = data.rawInputs?.x0 ?? 2;
    const h = data.rawInputs?.h ?? 0.01;
    return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Cálculo Numérico - Diferenciación Numérica
Fórmula: Diferencias Finitas (Adelante, Atrás, Centradas)
"""

import numpy as np

def f(x):
    return ${pyExpr}

x0 = ${x0}
h = ${h}

# Fórmulas de diferenciación numérica
d_forward = (f(x0 + h) - f(x0)) / h
d_backward = (f(x0) - f(x0 - h)) / h
d_central = (f(x0 + h) - f(x0 - h)) / (2.0 * h)
d2_central = (f(x0 + h) - 2.0 * f(x0) + f(x0 - h)) / (h ** 2)

print("=" * 60)
print("NumCalc Pro - Diferenciación Numérica en x0 =", x0, "con paso h =", h)
print("=" * 60)
print(f"f'(x0) [Diferencia Progresiva O(h)]:    {d_forward:.8f}")
print(f"f'(x0) [Diferencia Regresiva O(h)]:     {d_backward:.8f}")
print(f"f'(x0) [Diferencia Centrada O(h^2)]:    {d_central:.8f}")
print(f"f''(x0) [Segunda Derivada Centrada]:    {d2_central:.8f}")
`;
  }

  const a = data.rawInputs?.a ?? 0;
  const b = data.rawInputs?.b ?? 1;
  const n = data.rawInputs?.n ?? 4;

  return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Cálculo Numérico - Integración Definida
Método: ${data.methodName || method}
Intervalo: [${a}, ${b}], n = ${n}
"""

import numpy as np
from scipy import integrate

# 1. Definición del integrando
def f(x):
    return ${pyExpr}

a = ${a}
b = ${b}
n = ${n}

# 2. Implementación del Método Numérico
${
  method === 'simpson13'
    ? `h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)

# Simpson 1/3 Compuesto
I_num = (h / 3.0) * (y_vals[0] + 4.0 * np.sum(y_vals[1:-1:2]) + 2.0 * np.sum(y_vals[2:-1:2]) + y_vals[-1])
`
    : method === 'simpson38'
    ? `h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)

# Simpson 3/8 Compuesto
sum_mod3 = 0.0
sum_others = 0.0
for i in range(1, n):
    if i % 3 == 0:
        sum_mod3 += y_vals[i]
    else:
        sum_others += y_vals[i]

I_num = (3.0 * h / 8.0) * (y_vals[0] + 3.0 * sum_others + 2.0 * sum_mod3 + y_vals[-1])
`
    : `# Regla del Trapecio Compuesta
h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)
I_num = (h / 2.0) * (y_vals[0] + 2.0 * np.sum(y_vals[1:-1]) + y_vals[-1])
`
}

# 3. Verificación con SciPy Quad
I_scipy, error_est = integrate.quad(f, a, b)

print("=" * 60)
print("NumCalc Pro - Integración Numérica")
print(f"Método: ${data.methodName || method}")
print(f"Integral aproximada I ≈ {I_num:.8f}")
print(f"Referencia SciPy quad:   {I_scipy:.8f} (error est. {error_est:.2e})")
print(f"Diferencia absoluta:     {abs(I_num - I_scipy):.2e}")
print("=" * 60)
`;
}

function generateCalculusMatlab(data) {
  const isDiff = data.activeTab === 'differentiation';
  const expr = data.rawInputs?.expression || (isDiff ? 'x^3' : 'x^2');
  const mExpr = translateExpression(expr, 'matlab');

  if (isDiff) {
    const x0 = data.rawInputs?.x0 ?? 2;
    const h = data.rawInputs?.h ?? 0.01;
    return `% Diferenciación Numérica en MATLAB
clc; clear;
f = @(x) ${mExpr};
x0 = ${x0}; h = ${h};

d_prog = (f(x0 + h) - f(x0)) / h;
d_regr = (f(x0) - f(x0 - h)) / h;
d_cent = (f(x0 + h) - f(x0 - h)) / (2*h);

fprintf('f''(x0) Progresiva: %.8f\\n', d_prog);
fprintf('f''(x0) Regresiva:  %.8f\\n', d_regr);
fprintf('f''(x0) Centrada:   %.8f\\n', d_cent);
`;
  }

  const a = data.rawInputs?.a ?? 0;
  const b = data.rawInputs?.b ?? 1;
  const n = data.rawInputs?.n ?? 4;

  return `% Integración Numérica en MATLAB
clc; clear;
f = @(x) ${mExpr};
a = ${a}; b = ${b}; n = ${n};

h = (b - a) / n;
x = linspace(a, b, n + 1);
y = f(x);

% Integral con función nativa integral()
I_builtin = integral(f, a, b);

% Simpson 1/3 Compuesto
I_simpson = (h/3) * (y(1) + 4*sum(y(2:2:end-1)) + 2*sum(y(3:2:end-2)) + y(end));

fprintf('Integral Simpson 1/3: %.8f\\n', I_simpson);
fprintf('Integral MATLAB nativa: %.8f\\n', I_builtin);
`;
}

function generateCalculusCpp(data) {
  const expr = data.rawInputs?.expression || 'x^2';
  const cppExpr = translateExpression(expr, 'cpp');
  const a = data.rawInputs?.a ?? 0;
  const b = data.rawInputs?.b ?? 1;
  const n = data.rawInputs?.n ?? 4;

  return `/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Cálculo Numérico - Integración (Regla de Simpson 1/3)
 */

#include <iostream>
#include <cmath>
#include <iomanip>

double f(double x) {
    return ${cppExpr};
}

int main() {
    double a = ${a};
    double b = ${b};
    int n = ${n};
    if (n % 2 != 0) n += 1; // n debe ser par para Simpson 1/3

    double h = (b - a) / n;
    double sum = f(a) + f(b);

    for (int i = 1; i < n; ++i) {
        double x = a + i * h;
        if (i % 2 == 1) sum += 4.0 * f(x);
        else sum += 2.0 * f(x);
    }

    double I = (h / 3.0) * sum;

    std::cout << std::fixed << std::setprecision(8);
    std::cout << "Integral aproximada (Simpson 1/3): I = " << I << "\\n";
    return 0;
}
`;
}

// =========================================================================
// MÓDULO 4: ECUACIONES DIFERENCIALES ORDINARIAS (EDO)
// =========================================================================

function generateOdePython(data) {
  const method = data.methodId || 'rk4';
  const expr = data.rawInputs?.expression || 'x + y';
  const pyExpr = translateExpression(expr, 'python');
  const x0 = data.rawInputs?.paramX0 ?? 0;
  const y0 = data.rawInputs?.paramY0 ?? 1;
  const xf = data.rawInputs?.paramXf ?? 1;
  const h = data.rawInputs?.paramH ?? 0.1;

  return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Ecuaciones Diferenciales Ordinarias (EDO)
Método: ${data.methodName || method}
dy/dx = f(x, y) = ${expr}
Condición inicial: y(${x0}) = ${y0}, intervalo [${x0}, ${xf}], h = ${h}
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# 1. Definición de la EDO dy/dx = f(x, y)
def f(x, y):
    return ${pyExpr}

x0 = ${x0}
y0 = ${y0}
xf = ${xf}
h = ${h}

n_steps = int(round((xf - x0) / h))
x_vals = [x0]
y_vals = [y0]

print("=" * 60)
print("NumCalc Pro - Solución Numérica de EDOs")
print(f"Método: ${data.methodName || method}")
print(f"{'Paso':<6} {'x':<12} {'y':<14} {'f(x, y)':<14}")
print("-" * 60)
print(f"{0:<6} {x0:<12.4f} {y0:<14.6f} {f(x0, y0):<14.6f}")

x_curr = x0
y_curr = y0

for i in range(1, n_steps + 1):
${
  method === 'euler'
    ? `    # Método de Euler
    y_next = y_curr + h * f(x_curr, y_curr)
    x_next = x0 + i * h
`
    : method === 'heun'
    ? `    # Método de Heun (Euler Mejorado)
    k1 = f(x_curr, y_curr)
    k2 = f(x_curr + h, y_curr + h * k1)
    y_next = y_curr + (h / 2.0) * (k1 + k2)
    x_next = x0 + i * h
`
    : `    # Método de Runge-Kutta de 4° Orden (RK4)
    k1 = f(x_curr, y_curr)
    k2 = f(x_curr + 0.5 * h, y_curr + 0.5 * h * k1)
    k3 = f(x_curr + 0.5 * h, y_curr + 0.5 * h * k2)
    k4 = f(x_curr + h, y_curr + h * k3)
    y_next = y_curr + (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4)
    x_next = x0 + i * h
`
}
    x_vals.append(x_next)
    y_vals.append(y_next)
    print(f"{i:<6} {x_next:<12.4f} {y_next:<14.6f} {f(x_next, y_next):<14.6f}")
    x_curr = x_next
    y_curr = y_next

# 2. Verificación con SciPy solve_ivp
sol_scipy = solve_ivp(lambda t, y: f(t, y[0]), [x0, xf], [y0], method='RK45', t_eval=x_vals)

# 3. Gráfica Comparativa
plt.figure(figsize=(9, 5))
plt.plot(x_vals, y_vals, 'o-', label=f'NumCalc Pro (${data.methodName || method})', color='#10b981', linewidth=2)
plt.plot(sol_scipy.t, sol_scipy.y[0], '--', label='SciPy solve_ivp (RK45)', color='#38bdf8')
plt.title(f'Solución de dy/dx = {${JSON.stringify(expr)}} con ${data.methodName || method}', fontsize=12)
plt.xlabel('x')
plt.ylabel('y(x)')
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`;
}

function generateOdeMatlab(data) {
  const method = data.methodId || 'rk4';
  const expr = data.rawInputs?.expression || 'x + y';
  const mExpr = translateExpression(expr, 'matlab');
  const x0 = data.rawInputs?.paramX0 ?? 0;
  const y0 = data.rawInputs?.paramY0 ?? 1;
  const xf = data.rawInputs?.paramXf ?? 1;
  const h = data.rawInputs?.paramH ?? 0.1;

  return `% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Ecuaciones Diferenciales Ordinarias (EDO)
% =========================================================================
clc; clear; close all;

f = @(x, y) ${mExpr};
x0 = ${x0}; y0 = ${y0}; xf = ${xf}; h = ${h};

x = x0:h:xf;
n = length(x);
y = zeros(1, n);
y(1) = y0;

for i = 1:n-1
    k1 = f(x(i), y(i));
    k2 = f(x(i) + 0.5*h, y(i) + 0.5*h*k1);
    k3 = f(x(i) + 0.5*h, y(i) + 0.5*h*k2);
    k4 = f(x(i) + h, y(i) + h*k3);
    y(i+1) = y(i) + (h/6)*(k1 + 2*k2 + 2*k3 + k4);
end

% Verificación con ode45
[t_ode, y_ode] = ode45(@(t, y) f(t, y), [x0 xf], y0);

figure('Name', 'NumCalc Pro - EDO');
plot(x, y, 'ro-', 'LineWidth', 1.5, 'DisplayName', 'NumCalc Pro RK4');
hold on; grid on;
plot(t_ode, y_ode, 'b--', 'LineWidth', 1.5, 'DisplayName', 'MATLAB ode45');
title('Solución de dy/dx = f(x, y)');
xlabel('x'); ylabel('y(x)');
legend('show');
`;
}

function generateOdeCpp(data) {
  const expr = data.rawInputs?.expression || 'x + y';
  const cppExpr = translateExpression(expr, 'cpp');
  const x0 = data.rawInputs?.paramX0 ?? 0;
  const y0 = data.rawInputs?.paramY0 ?? 1;
  const xf = data.rawInputs?.paramXf ?? 1;
  const h = data.rawInputs?.paramH ?? 0.1;

  return `/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: EDO - Runge-Kutta 4° Orden (RK4)
 */

#include <iostream>
#include <iomanip>

double f(double x, double y) {
    return ${cppExpr};
}

int main() {
    double x = ${x0};
    double y = ${y0};
    const double xf = ${xf};
    const double h = ${h};

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Paso\\t x\\t\\t y\\n";
    std::cout << "---------------------------------\\n";

    int step = 0;
    while (x <= xf + 1e-9) {
        std::cout << step << "\\t " << x << "\\t " << y << "\\n";

        double k1 = f(x, y);
        double k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
        double k4 = f(x + h, y + h * k3);

        y += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        x += h;
        step++;
    }

    return 0;
}
`;
}

// =========================================================================
// MÓDULO 5: INTERPOLACIÓN Y AJUSTE DE CURVAS
// =========================================================================

function generateInterpolationPython(data) {
  const points = data.rawInputs?.points || [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }];
  const evalX = data.rawInputs?.evalX ?? 1.5;
  const xArr = points.map((p) => p.x);
  const yArr = points.map((p) => p.y);

  return `"""
Script generado automáticamente por NumCalc Pro
Módulo: Interpolación & Ajuste de Curvas
Método: ${data.methodName || data.methodId || 'lagrange'}
Puntos de entrada: ${points.length} nodos
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import lagrange, CubicSpline

# 1. Conjunto de datos (nodos)
x_data = np.array(${JSON.stringify(xArr)}, dtype=float)
y_data = np.array(${JSON.stringify(yArr)}, dtype=float)
x_eval = ${evalX}

# 2. Interpolación con SciPy
poly = lagrange(x_data, y_data)
spline = CubicSpline(x_data, y_data, bc_type='natural')

y_poly_eval = poly(x_eval)
y_spline_eval = spline(x_eval)

print("=" * 60)
print("NumCalc Pro - Interpolación Numérica")
print(f"Punto de evaluación x* = {x_eval}")
print(f"Valor interpolado (Polinomio de Lagrange): P(x*) = {y_poly_eval:.6f}")
print(f"Valor interpolado (Spline Cúbico Natural): S(x*) = {y_spline_eval:.6f}")
print("=" * 60)

# 3. Gráfico de curvas continuas
x_dense = np.linspace(min(x_data), max(x_data), 300)

plt.figure(figsize=(9, 5))
plt.plot(x_data, y_data, 'ro', markersize=8, label='Nodos de datos')
plt.plot(x_dense, poly(x_dense), 'b-', label='Polinomio Lagrange')
plt.plot(x_dense, spline(x_dense), 'g--', label='Spline Cúbico Natural')
plt.plot(x_eval, y_poly_eval, 'k*', markersize=12, label=f'Evaluación en x*={x_eval}')

plt.title('NumCalc Pro - Interpolación Polinomial y Splines')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`;
}

function generateInterpolationMatlab(data) {
  const points = data.rawInputs?.points || [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }];
  const evalX = data.rawInputs?.evalX ?? 1.5;
  const xArr = points.map((p) => p.x).join(', ');
  const yArr = points.map((p) => p.y).join(', ');

  return `% Interpolación en MATLAB
clc; clear; close all;

x = [${xArr}];
y = [${yArr}];
x_eval = ${evalX};

% Spline cúbico natural
y_spline = spline(x, y, x_eval);
fprintf('Spline evaluado en x* = %.4f: y = %.6f\\n', x_eval, y_spline);

% Gráfica
x_dense = linspace(min(x), max(x), 200);
y_dense = spline(x, y, x_dense);

figure;
plot(x, y, 'ro', 'MarkerSize', 8, 'DisplayName', 'Datos');
hold on; grid on;
plot(x_dense, y_dense, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Spline Cúbico');
plot(x_eval, y_spline, 'k*', 'MarkerSize', 12, 'DisplayName', 'Punto evaluado');
legend('show');
`;
}

function generateInterpolationCpp(data) {
  const points = data.rawInputs?.points || [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }];
  const evalX = data.rawInputs?.evalX ?? 1.5;

  return `/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Interpolación de Lagrange
 */

#include <iostream>
#include <vector>
#include <iomanip>

struct Point {
    double x, y;
};

double lagrangeInterpolation(const std::vector<Point>& pts, double x) {
    double result = 0.0;
    int n = pts.size();

    for (int i = 0; i < n; ++i) {
        double term = pts[i].y;
        for (int j = 0; j < n; ++j) {
            if (i != j) {
                term *= (x - pts[j].x) / (pts[i].x - pts[j].x);
            }
        }
        result += term;
    }
    return result;
}

int main() {
    std::vector<Point> points = {
${points.map((p) => `        {${p.x}, ${p.y}}`).join(',\n')}
    };

    double x_eval = ${evalX};
    double y_eval = lagrangeInterpolation(points, x_eval);

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Interpolacion de Lagrange en x = " << x_eval << ": y = " << y_eval << "\\n";
    return 0;
}
`;
}

// =========================================================================
// DESPACHADOR PRINCIPAL DE GENERADORES DE CÓDIGO
// =========================================================================

export function generatePythonCode(data) {
  if (!data) return '# Sin datos disponibles.';
  switch (data.moduleId) {
    case 'nonlinear':
      return generateNonlinearPython(data);
    case 'linear':
      return generateLinearPython(data);
    case 'calculus':
      return generateCalculusPython(data);
    case 'ode':
      return generateOdePython(data);
    case 'interpolation':
      return generateInterpolationPython(data);
    default:
      return generateNonlinearPython(data);
  }
}

export function generateMatlabCode(data) {
  if (!data) return '% Sin datos disponibles.';
  switch (data.moduleId) {
    case 'nonlinear':
      return generateNonlinearMatlab(data);
    case 'linear':
      return generateLinearMatlab(data);
    case 'calculus':
      return generateCalculusMatlab(data);
    case 'ode':
      return generateOdeMatlab(data);
    case 'interpolation':
      return generateInterpolationMatlab(data);
    default:
      return generateNonlinearMatlab(data);
  }
}

export function generateCppCode(data) {
  if (!data) return '// Sin datos disponibles.';
  switch (data.moduleId) {
    case 'nonlinear':
      return generateNonlinearCpp(data);
    case 'linear':
      return generateLinearCpp(data);
    case 'calculus':
      return generateCalculusCpp(data);
    case 'ode':
      return generateOdeCpp(data);
    case 'interpolation':
      return generateInterpolationCpp(data);
    default:
      return generateNonlinearCpp(data);
  }
}
