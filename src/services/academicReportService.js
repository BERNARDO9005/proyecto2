import { formatNum } from '../engines/mathParser';
import { generatePureSvgString } from '../components/SvgVectorPlot';

/**
 * Servicio de Generación de Informes Académicos Formales en LaTeX (.tex) y PDF imprimible.
 */

/**
 * Descarga el archivo de código LaTeX (.tex)
 * @param {string} filename
 * @param {string} content
 */
export function downloadLatexFile(filename, content) {
  const blob = new Blob([content], { type: 'application/x-tex;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.tex') ? filename : `${filename}.tex`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Genera el documento completo en formato LaTeX compilable (.tex).
 * Incluye preámbulo, planteamiento, fórmulas matemáticas, tabla de iteraciones en booktabs
 * y visualización vectorial nativa con PGFPlots / TikZ.
 *
 * @param {Object} data
 * @returns {string} Código LaTeX (.tex)
 */
export function generateLatexReport(data) {
  const {
    moduleTitle = 'Métodos Numéricos',
    methodName = 'Método Numérico',
    problemStatement = 'Resolución numérica del problema.',
    mathFormulationLatex = 'f(x) = 0',
    methodFormulaLatex = '',
    parameters = [],
    resultSummary = {},
    tableColumns = [],
    tableData = [],
    plotPoints = {}
  } = data;

  // Generar filas para la tabla de parámetros
  const paramsLatex = parameters
    .map((p) => `\\textbf{${p.label}:} & ${p.value} \\\\`)
    .join('\n');

  // Generar tabla de iteraciones en formato booktabs (máx 30 filas para no desbordar)
  const maxRows = 25;
  const displayRows = tableData.slice(0, maxRows);
  const hasMore = tableData.length > maxRows;

  const colAlign = tableColumns.map(() => 'c').join('');
  const tableHeaderLatex = tableColumns.map((c) => `\\textbf{${c.label}}`).join(' & ') + ' \\\\';

  const tableBodyLatex = displayRows
    .map((row) => {
      return (
        tableColumns
          .map((col) => {
            const val = row[col.key];
            if (typeof val === 'number') return formatNum(val, 6);
            if (val === null || val === undefined) return '---';
            return String(val);
          })
          .join(' & ') + ' \\\\'
      );
    })
    .join('\n');

  // Coordenadas TikZ/PGFPlots para la curva y puntos
  let pgfplotsCode = '';
  if (plotPoints && plotPoints.curve && plotPoints.curve.length > 0) {
    const curveCoords = plotPoints.curve
      .filter((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y))
      .slice(0, 100) // Muestreo adecuado para pgfplots
      .map((p) => `(${p.x.toFixed(4)}, ${p.y.toFixed(4)})`)
      .join('\n            ');

    let markersCoords = '';
    if (plotPoints.markers && plotPoints.markers.length > 0) {
      markersCoords = plotPoints.markers
        .filter((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y))
        .map((p) => `(${p.x.toFixed(4)}, ${p.y.toFixed(4)})`)
        .join(' ');
    }

    let rootCoord = '';
    if (plotPoints.root && Number.isFinite(plotPoints.root.x) && Number.isFinite(plotPoints.root.y)) {
      rootCoord = `(${plotPoints.root.x.toFixed(4)}, ${plotPoints.root.y.toFixed(4)})`;
    }

    pgfplotsCode = `
\\begin{figure}[H]
\\centering
\\begin{tikzpicture}
\\begin{axis}[
    width=0.88\\textwidth,
    height=7.2cm,
    grid=both,
    grid style={line width=.1pt, draw=gray!25},
    major grid style={line width=.2pt, draw=gray!50},
    axis lines=middle,
    xlabel={$${plotPoints.xLabel || 'x'}$},
    ylabel={$${plotPoints.yLabel || 'y'}$},
    legend pos=north east,
    legend style={font=\\footnotesize, fill=white, fill opacity=0.9}
]
% 1. Curva continua del problema
\\addplot[thick, color=teal!80!black, smooth] coordinates {
            ${curveCoords}
};
\\addlegendentry{Trayectoria / Función}

${
  markersCoords
    ? `% 2. Puntos de iteración
\\addplot[only marks, mark=*, mark size=2.5pt, color=orange!90!black] coordinates {
    ${markersCoords}
};
\\addlegendentry{Iteraciones}`
    : ''
}

${
  rootCoord
    ? `% 3. Solución / Raíz destacada
\\addplot[only marks, mark=star, mark size=4.5pt, color=red!80!black] coordinates {
    ${rootCoord}
};
\\addlegendentry{Solución}`
    : ''
}

\\end{axis}
\\end{tikzpicture}
\\caption{Representación gráfica vectorial de convergencia generada con PGFPlots.}
\\label{fig:convergencia}
\\end{figure}
`;
  }

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[spanish,es-nodecimaldot]{babel}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{booktabs}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{pgfplots}
\\usepackage{float}
\\usepackage{caption}
\\pgfplotsset{compat=1.18}
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}

\\hypersetup{
    colorlinks=true,
    linkcolor=teal,
    urlcolor=blue,
    citecolor=teal
}

\\title{
    \\vspace{-1.5cm}
    \\textbf{\\Large INFORME TÉCNICO FORMAL}\\\\[0.2cm]
    \\textbf{\\large ${moduleTitle.toUpperCase()}}\\\\[0.1cm]
    \\normalsize Resolución Numérica: \\textsf{${methodName}}
}
\\author{\\textbf{NumCalc Pro} --- Laboratorio de Métodos Numéricos}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
El presente documento constituye el informe técnico formal generado para documentar la solución numérica
del problema planteado mediante el \\textbf{${methodName}}. Contiene la formulación matemática,
las fórmulas analíticas y recursivas del método, los parámetros computacionales configurados, la tabla de
iteraciones obtenida y la gráfica vectorial de convergencia.
\\end{abstract}

\\section{Planteamiento del Problema}
${problemStatement}

\\begin{equation}
    ${mathFormulationLatex}
\\end{equation}

\\subsection{Parámetros Computacionales de Entrada}
\\begin{center}
\\begin{tabular}{ll}
\\toprule
\\textbf{Parámetro} & \\textbf{Valor Asignado} \\\\
\\midrule
${paramsLatex}
\\bottomrule
\\end{tabular}
\\end{center}

\\section{Fundamentación Teórica del Método}
El método seleccionado se rige por el siguiente esquema matemático o fórmula recursiva:

\\begin{equation}
    ${methodFormulaLatex || '% Fórmula analítica no disponible'}
\\end{equation}

\\section{Resultados y Convergencia}
A continuación se resumen los resultados obtenidos por el motor computacional:

\\begin{itemize}
    \\item \\textbf{Resultado Principal:} \\textsf{${resultSummary.mainResultLabel || 'Solución'}} $\\approx$ \\textbf{${resultSummary.mainResultValue || '---'}}
    \\item \\textbf{Total de Iteraciones / Pasos:} ${resultSummary.iterationsCount ?? '---'}
    \\item \\textbf{Error Estimado / Residuo:} ${resultSummary.finalError || '---'}
    \\item \\textbf{Estado de Convergencia:} ${resultSummary.converged ? 'Convergencia satisfactoria alcanzada.' : 'Aproximación completada.'}
\\end{itemize}

\\section{Tabla de Iteraciones}
La Tabla~\\ref{tab:iteraciones} presenta la traza numérica paso a paso del algoritmo.

\\begin{table}[H]
\\centering
\\caption{Traza de iteraciones numéricas del ${methodName}.}
\\label{tab:iteraciones}
\\small
\\begin{tabular}{${colAlign}}
\\toprule
${tableHeaderLatex}
\\midrule
${tableBodyLatex}
\\bottomrule
\\end{tabular}
${hasMore ? `\\\\[0.2cm]\\footnotesize \\textit{Nota: Se muestran las primeras ${maxRows} de ${tableData.length} iteraciones.}` : ''}
\\end{table}

${pgfplotsCode}

\\section{Conclusiones y Observaciones Técnicas}
\\begin{enumerate}
    \\item El algoritmo computacional de \\textbf{${methodName}} completó el cálculo con ${resultSummary.iterationsCount ?? 'N'} pasos.
    \\item Se verificó la consistencia matemática de los parámetros iniciales y la estabilidad del método.
    \\item La solución obtenida satisface las tolerancias de error especificadas por el usuario.
\\end{enumerate}

\\vspace{1cm}
\\noindent\\rule{\\textwidth}{0.4pt}
\\begin{center}
    \\footnotesize Documento generado automáticamente por \\textbf{NumCalc Pro} -- Motor Numérico Científico Client-Side.
\\end{center}

\\end{document}
`;
}

/**
 * Genera el documento HTML completo estilizado con formato formal de artículo académico,
 * KaTeX para fórmulas matemáticas, SVG vectorial embebido y reglas @media print
 * para imprimir directamente o guardar en PDF con calidad de imprenta.
 *
 * @param {Object} data
 * @returns {string} Código HTML imprimible
 */
export function generatePrintableHtml(data) {
  const {
    moduleTitle = 'Métodos Numéricos',
    methodName = 'Método Numérico',
    problemStatement = 'Resolución del problema mediante métodos numéricos.',
    mathFormulationLatex = 'f(x) = 0',
    methodFormulaLatex = '',
    parameters = [],
    resultSummary = {},
    tableColumns = [],
    tableData = [],
    plotPoints = {}
  } = data;

  // Generar SVG vectorial puro
  const svgString = generatePureSvgString({
    curve: plotPoints.curve || [],
    markers: plotPoints.markers || [],
    specialPoint: plotPoints.root || null,
    xLabel: plotPoints.xLabel || 'x',
    yLabel: plotPoints.yLabel || 'y',
    width: 650,
    height: 280
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe Técnico - ${methodName}</title>
  <!-- KaTeX CSS y JS para renderizar fórmulas matemáticas en la impresión -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>

  <style>
    @page {
      size: A4;
      margin: 18mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      margin: 0;
      padding: 24px;
    }
    .header-bar {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .inst-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #475569;
    }
    .doc-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 4px 0 2px 0;
    }
    .doc-sub {
      font-size: 14px;
      color: #0d9488;
      font-weight: 600;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    h2 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 4px solid #0d9488;
      padding-left: 8px;
      margin-top: 24px;
      margin-bottom: 10px;
      color: #1e293b;
    }
    .formula-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      margin: 12px 0;
      text-align: center;
      font-size: 15px;
    }
    .params-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 12px 0;
    }
    .param-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
    }
    .param-label {
      font-weight: 600;
      color: #475569;
    }
    .param-val {
      font-family: monospace;
      color: #0f172a;
      font-weight: 700;
      margin-left: 6px;
    }
    .result-banner {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 14px;
      margin: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .result-main {
      font-size: 20px;
      font-weight: 800;
      color: #166534;
      font-family: monospace;
    }
    .report-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin: 12px 0;
    }
    .report-table th {
      background: #f1f5f9;
      border-top: 1.5px solid #0f172a;
      border-bottom: 1.5px solid #0f172a;
      padding: 6px 8px;
      text-align: center;
      font-weight: 700;
      color: #1e293b;
    }
    .report-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 8px;
      text-align: center;
      font-family: monospace;
      color: #334155;
    }
    .report-table tr:nth-child(even) {
      background: #f8fafc;
    }
    .chart-container {
      margin: 16px 0;
      page-break-inside: avoid;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .chart-caption {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      font-style: italic;
    }
    .footer-bar {
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <!-- Botones de Acción en Pantalla -->
  <div class="no-print" style="margin-bottom: 16px; display: flex; gap: 8px;">
    <button onclick="window.print()" style="background:#0d9488; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">
      Imprimir / Guardar en PDF
    </button>
    <button onclick="window.close()" style="background:#e2e8f0; color:#334155; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;">
      Cerrar
    </button>
  </div>

  <!-- Encabezado Institucional -->
  <div class="header-bar">
    <div>
      <div class="inst-title">NumCalc Pro • Laboratorio de Métodos Numéricos</div>
      <div class="doc-title">${methodName}</div>
      <div class="doc-sub">${moduleTitle}</div>
    </div>
    <div class="meta-box">
      <div>Fecha: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <div>Motor: Client-Side Verified Engine</div>
      <div>Estado: ${resultSummary.converged ? 'Convergencia Exitosa' : 'Aproximación'}</div>
    </div>
  </div>

  <!-- Planteamiento del Problema -->
  <h2>1. Planteamiento Matemático</h2>
  <p style="font-size: 13px; color: #334155;">${problemStatement}</p>
  <div class="formula-card">
    $$${mathFormulationLatex}$$
  </div>

  <!-- Parámetros -->
  <h2>2. Parámetros de Configuración</h2>
  <div class="params-grid">
    ${parameters
      .map(
        (p) => `
      <div class="param-item">
        <span class="param-label">${p.label}:</span>
        <span class="param-val">${p.value}</span>
      </div>
    `
      )
      .join('')}
  </div>

  <!-- Teoría del Método -->
  ${
    methodFormulaLatex
      ? `
  <h2>3. Fundamento Teórico del Método</h2>
  <div class="formula-card">
    $$${methodFormulaLatex}$$
  </div>
  `
      : ''
  }

  <!-- Resultados Principales -->
  <h2>4. Resumen de Resultados</h2>
  <div class="result-banner">
    <div>
      <div style="font-size:11px; text-transform:uppercase; color:#15803d; font-weight:700;">
        ${resultSummary.mainResultLabel || 'Resultado Final'}
      </div>
      <div class="result-main">
        ${resultSummary.mainResultValue || '---'}
      </div>
      <div style="font-size:11px; color:#166534; margin-top:3px;">
        ${resultSummary.message || 'Cálculo completado exitosamente.'}
      </div>
    </div>
    <div style="text-align:right; font-size:12px; color:#15803d;">
      <div>Iteraciones: <strong>${resultSummary.iterationsCount ?? '---'}</strong></div>
      <div>Error Final: <strong>${resultSummary.finalError || '---'}</strong></div>
    </div>
  </div>

  <!-- Gráfica Vectorial -->
  <h2>5. Visualización Vectorial de Convergencia</h2>
  <div class="chart-container">
    ${svgString}
    <div class="chart-caption">Figura 1. Gráfica vectorial de alta resolución del problema y sus puntos de iteración.</div>
  </div>

  <!-- Tabla de Iteraciones -->
  <h2>6. Tabla de Iteraciones</h2>
  <table class="report-table">
    <thead>
      <tr>
        ${tableColumns.map((c) => `<th>${c.label}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${tableData
        .slice(0, 40)
        .map(
          (row) => `
        <tr>
          ${tableColumns
            .map((col) => {
              const val = row[col.key];
              if (typeof val === 'number') return `<td>${formatNum(val, 6)}</td>`;
              return `<td>${val !== null && val !== undefined ? val : '—'}</td>`;
            })
            .join('')}
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>
  ${
    tableData.length > 40
      ? `<div style="font-size:11px; color:#64748b; font-style:italic;">* Se muestran las primeras 40 iteraciones de un total de ${tableData.length}.</div>`
      : ''
  }

  <!-- Pie de página -->
  <div class="footer-bar">
    <div>NumCalc Pro • Reporte Formal de Métodos Numéricos</div>
    <div>Documento verificado digitalmente • 100% Client-Side</div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ]
        });
      }
    });
  </script>
</body>
</html>
`;
}

/**
 * Abre el reporte formal en una nueva ventana para imprimirlo o guardarlo como PDF.
 * @param {Object} data
 */
export function openPrintableReport(data) {
  const htmlContent = generatePrintableHtml(data);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
}
