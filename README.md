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

### 2. Módulo 2: Sistemas de Ecuaciones Lineales y Álgebra Matricial
- **Métodos Directos**:
  - Eliminación Gaussiana con **pivoteo parcial obligatorio** y sustitución hacia atrás.
  - Gauss-Jordan con matriz diagonal unitaria.
  - **Factorización LU**: Métodos de **Doolittle** ($L$ con diagonal unitaria) y **Crout** ($U$ con diagonal unitaria) con resolución de dos sistemas triangulares ($Ly = b$, $Ux = y$).
  - **Descomposición de Cholesky**: Factorización $A = L L^T$ para matrices simétricas y definidas positivas.
- **Métodos Iterativos**:
  - Jacobi y Gauss-Seidel con control de convergencia espectral y tolerancia $|\varepsilon_a|$.
- **Autovalores y Autovectores**:
  - **Método de las Potencias**: Cálculo del autovalor y autovector dominante ($|\lambda_1|$) con normalización por norma infinita.
  - **Método de las Potencias Inversas**: Autovalores más cercanos a un desplazamiento $s$ ($\lambda \approx s$).
  - **Algoritmo QR**: Espectro completo de autovalores mediante descomposiciones ortogonales iterativas ($A_k = Q_k R_k \implies A_{k+1} = R_k Q_k$).
- **Dimensiones & Rendimiento**: Matrices dinámicas desde $2 \times 2$ hasta **$50 \times 50$** procesadas en segundo plano mediante **Web Worker** dedicado (`linearWorker.js`), garantizando 60 FPS continuos en la interfaz.
- **Herramientas**: Generador de matrices aleatorias, matrices diagonalmente dominantes, sistemas tridiagonales, simétricas definidas positivas e importador de matrices desde texto o CSV.
- **Casos límite controlados**:
  - **Matriz singular o mal condicionada**: Detección estricta si el pivote $|a_{kk}| < 10^{-12}$.
  - **Dominancia diagonal**: Verificación analítica en tiempo real para Jacobi/Gauss-Seidel con advertencia visual.
  - **Matrices no simétricas o no definidas positivas**: Validación estricta previa para Cholesky.

### 3. Módulo 3: Diferenciación e Integración Numérica
- **Integración Newton-Cotes**:
  - Regla del Trapecio (Simple y Compuesto).
  - Simpson 1/3 Compuesto (**ajuste automático estricto a $n$ par** con notificación visible).
  - Simpson 3/8 Compuesto (**ajuste automático a múltiplos de 3** con notificación).
- **Integración Avanzada y Adaptativa**:
  - **Cuadratura de Gauss-Legendre**: Integración de alto orden con 2 a 6 puntos de evaluación y pesos exactos tabulados, transformando $[a, b] \to [-1, 1]$.
  - **Integración de Romberg**: Algoritmo de aceleración de convergencia mediante extrapolación de Richardson sobre la regla del trapecio, generando la tabla triangular completa $R(j, k)$ hasta satisfacer la tolerancia local.
- **Diferenciación**:
  - Diferencias finitas hacia adelante, hacia atrás y centradas de 1er, 2do y 4to orden ($O(h)$, $O(h^2)$, $O(h^4)$).
  - Aproximación de segunda derivada $f''(x)$.
- **Casos límite controlados**:
  - **Fuera de dominio**: Captura puntual si $f(x)$ queda indefinida (ej. $\ln(x)$ con $x \le 0$) indicando con precisión el subintervalo que falló sin romper la aplicación.

### 4. Módulo 4: Ecuaciones Diferenciales Ordinarias (EDO)
- **Modos de 1er Orden**:
  - **Métodos de Paso Fijo**: Euler Clásico, Heun (Euler Modificado) y Runge-Kutta 4° Orden (RK4) contrastados individual o simultáneamente (3 en 1).
  - **RK45 Adaptativo (Dormand-Prince DP54)**: Integrador con control automático del paso $h(t)$ según tolerancia al error local $|\varepsilon|$, reporte de pasos aceptados vs rechazados y gráfico dinámico del tamaño de paso $h(t)$.
- **Sistemas de EDOs Acopladas (RK4 Vectorial)**: Solución de $\frac{dy_1}{dt} = f_1(t, y_1, y_2)$ y $\frac{dy_2}{dt} = f_2(t, y_1, y_2)$ (ej. Modelo Lotka-Volterra presa-depredador).
- **EDOs de 2° Orden**: Reducción canónica a sistema de 1er orden para resolver problemas mecánicos como osciladores armónicos amortiguados y péndulos no lineales $y'' = f(t, y, y')$.
- **Visualización**: Series temporales simultáneas, gráfico de paso adaptativo $h(t)$ y gráfico 2D de **Retrato de Fases** (espacio de estados $y_2$ vs $y_1$ / velocidad vs posición).
- **Casos límite controlados**: Validación estricta de $h > 0$, $t_f > t_0$, control de divergencia numérica y límite de seguridad de pasos en RK45.

### 5. Módulo 5: Interpolación y Ajuste de Curvas
- **Interpolación Polinomial y Splines**:
  - **Polinomios de Lagrange**: Polinomios base $L_i(x)$, suma ponderada y expansión a forma canónica $P(x) = a_n x^n + \dots + a_0$.
  - **Diferencias Divididas de Newton**: Tabla piramidal completa de diferencias divididas, fórmula en forma de Newton y evaluación eficiente mediante Horner.
  - **Splines Cúbicos Naturales**: Ajuste suave de clase $C^2$ con segundas derivadas continuas resuelto mediante el algoritmo tridiagonal de Thomas ($S''(x_0) = S''(x_n) = 0$).
- **Ajuste de Curvas (Regresión por Mínimos Cuadrados)**:
  - **Regresión Lineal**: $y = a_1 x + a_0$ con sistema normal $2 \times 2$.
  - **Regresión Polinomial**: Grado $m$ configurable con sistema de ecuaciones normales de Vandermonde.
  - **Regresión Exponencial**: $y = a e^{bx}$ mediante linealización semilogarítmica ($\ln y = \ln a + bx$).
  - **Regresión Potencial**: $y = a x^b$ mediante linealización log-log ($\ln y = \ln a + b \ln x$).
  - **Métricas de Bondad de Ajuste**: Coeficiente de determinación $R^2$, correlación $r$, error estándar de la estimación ($S_{y/x}$) y suma de cuadrados residuales ($S_r$).
- **Herramientas**: Editor interactivo de nodos $(x_i, y_i)$, importador CSV/texto, evaluador puntual en $x^*$, presets pedagógicos (Runge, cinética química, termodinámica, ley de enfriamiento) y gráfico interactivo con nodos destacados y curva continua.
- **Caso límite controlado**: Detección de abscisas duplicadas ($x_i = x_j$), valores no positivos en regresiones logarítmicas y puntos insuficientes para el grado del polinomio.

---

## 🛠️ Tecnologías y Arquitectura

- **Framework**: React 18 + Vite (SPA 100% Client-Side con Code-Splitting por Rollup).
- **Concurrencia**: Web Worker dedicado (`linearWorker.js`) para álgebra lineal de gran escala en hilo secundario.
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
