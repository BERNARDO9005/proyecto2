# Calculadora Científica de Métodos Numéricos (Web App SPA)

Una aplicación web Single Page Application (SPA) 100% client-side, moderna, ultraligera y modular, diseñada para el análisis y resolución de problemas numéricos en ingeniería y ciencias aplicadas.

Desarrollada con **React 18**, **Vite**, **Tailwind CSS (Dark Mode #0f172a)**, con motor matemático seguro basado en **math.js AST** (sin `eval()`), renderizado de fórmulas LaTeX mediante **KaTeX** y visualización gráfica interactiva 2D mediante **Plotly.js**.

---

## 🚀 Características Principales

### 1. Módulo 1: Solución de Ecuaciones No Lineales (Búsqueda de Raíces)
- **Métodos**: Bisección, Regula Falsi, Newton-Raphson y Secante.
- **Entradas**: Expresión $f(x)$ estándar, intervalo $[a, b]$ o puntos iniciales $x_0$ ($x_1$), tolerancia $|\varepsilon_a|$ y límite de iteraciones (hasta 100).
- **Casos límite controlados**:
  - **Teorema de Bolzano**: Rechazo preventivo si $f(a) \cdot f(b) > 0$ antes de iterar, con explicación analítica.
  - **División por cero**: Detección de $f'(x) \approx 0$ en Newton-Raphson y $f(x_1) - f(x_0) \approx 0$ en Secante con advertencias y sugerencias.
  - **No convergencia**: Advertencia explícita y reporte de la mejor aproximación al alcanzar el tope de 100 iteraciones.
- **Visualización**: Curva $f(x)$, eje $y=0$ y trayectoria de puntos de iteración convergentes.

### 2. Módulo 2: Sistemas de Ecuaciones Lineales (Matrices)
- **Métodos**:
  - Directos: Eliminación Gaussiana con **pivoteo parcial obligatorio** y Gauss-Jordan.
  - Iterativos: Jacobi y Gauss-Seidel.
- **Dimensiones**: Matrices dinámicas desde $2 \times 2$ hasta $10 \times 10$.
- **Casos límite controlados**:
  - **Matriz singular o mal condicionada**: Detección estricta si el pivote $|a_{kk}| < 10^{-12}$ tras el pivoteo parcial.
  - **Dominancia diagonal**: Verificación analítica en tiempo real para Jacobi/Gauss-Seidel con advertencia visual.
- **Salidas**: Matrices aumentadas $[A|b]$ paso a paso, historial de sustitución hacia atrás y tablas de convergencia.

### 3. Módulo 3: Diferenciación e Integración Numérica
- **Integración**:
  - Regla del Trapecio (Simple y Compuesto).
  - Simpson 1/3 Compuesto (**ajuste automático estricto a $n$ par** con notificación visible al usuario).
  - Simpson 3/8 Compuesto (**ajuste automático a múltiplos de 3** con notificación al usuario).
  - Estimación analítica/numérica del error de truncamiento.
  - Gráfico de área segmentada bajo la curva.
- **Diferenciación**:
  - Diferencias finitas hacia adelante, hacia atrás y centradas de 1er, 2do y 4to orden ($O(h)$, $O(h^2)$, $O(h^4)$).
  - Aproximación de segunda derivada $f''(x)$.
- **Caso límite controlado**:
  - **Fuera de dominio**: Captura puntual si $f(x)$ queda indefinida (ej. $\ln(x)$ con $x \le 0$) indicando con precisión el subintervalo que falló sin romper la aplicación.

### 4. Módulo 4: Ecuaciones Diferenciales Ordinarias (EDO)
- **Métodos**: Euler, Euler Modificado (Heun) y Runge-Kutta de 4° Orden (RK4).
- **Entradas**: $\frac{dy}{dx} = f(x, y)$, condición inicial $(x_0, y_0)$, valor final $x_f$, paso $h > 0$.
- **Modo Comparativo**: Simulación simultánea de los 3 métodos sobre el mismo gráfico y tabla para contrastar convergencias y errores.
- **Casos límite controlados**: Validación estricta de $h > 0$, $x_f > x_0$ y límite de pasos para evitar congelamiento.

---

## 🛠️ Tecnologías y Arquitectura

- **Framework**: React 18 + Vite (SPA 100% Client-Side).
- **Estilos**: Tailwind CSS con paleta Slate Dark Mode (`#0f172a`, `#1e293b`).
- **Motor Matemático**: `mathjs` con análisis sintáctico por AST y derivadas simbólicas (con fallback numérico de 4to orden). **Prohibido el uso de `eval()`**.
- **Tipografía Matemática**: KaTeX para renderizado en vivo de fórmulas.
- **Visualización Científica**: Plotly.js 2D interactivo con tema oscuro responsivo.
- **Exportación**: Tablas con soporte de paginación, copiado a portapapeles y exportación directa a **CSV** y **JSON**.
- **Testing**: Vitest con casos analíticos verificados.

---

## 📦 Instalación y Ejecución

```bash
# 1. Clonar o ingresar al directorio del proyecto
cd calculadora-metodos-numericos

# 2. Instalar dependencias
npm install

# 3. Ejecutar suite de pruebas unitarias
npm test

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```
