import React from 'react';
import { formatNum } from '../engines/mathParser';

/**
 * Componente de Gráficos Vectoriales en SVG puro para Informes Académicos.
 * Garantiza resolución infinita (vectorial nítida) al exportar o imprimir en PDF.
 *
 * @param {{
 *   curve?: Array<{x: number, y: number}>,
 *   markers?: Array<{x: number, y: number, label?: string}>,
 *   specialPoint?: {x: number, y: number, label?: string},
 *   xLabel?: string,
 *   yLabel?: string,
 *   width?: number,
 *   height?: number,
 *   className?: string
 * }} props
 */
export default function SvgVectorPlot({
  curve = [],
  markers = [],
  specialPoint = null,
  xLabel = 'x',
  yLabel = 'y',
  width = 650,
  height = 320,
  className = ''
}) {
  const pad = { top: 30, right: 35, bottom: 45, left: 65 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  // Recolectar todos los puntos para calcular rangos
  const allX = [];
  const allY = [];

  curve.forEach((p) => {
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      allX.push(p.x);
      allY.push(p.y);
    }
  });

  markers.forEach((p) => {
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      allX.push(p.x);
      allY.push(p.y);
    }
  });

  if (specialPoint && Number.isFinite(specialPoint.x) && Number.isFinite(specialPoint.y)) {
    allX.push(specialPoint.x);
    allY.push(specialPoint.y);
  }

  // Fallbacks si no hay datos válidos
  let minX = allX.length > 0 ? Math.min(...allX) : 0;
  let maxX = allX.length > 0 ? Math.max(...allX) : 1;
  let minY = allY.length > 0 ? Math.min(...allY) : 0;
  let maxY = allY.length > 0 ? Math.max(...allY) : 1;

  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  // Agregar margen del 10%
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  minX -= spanX * 0.08;
  maxX += spanX * 0.08;
  minY -= spanY * 0.08;
  maxY += spanY * 0.08;

  // Proyecciones cartesianas a coordenadas de pantalla SVG
  const scaleX = (x) => pad.left + ((x - minX) / (maxX - minX)) * plotW;
  const scaleY = (y) => pad.top + plotH - ((y - minY) / (maxY - minY)) * plotH;

  // Ruta SVG para la curva continua
  let pathD = '';
  curve.forEach((pt, idx) => {
    if (Number.isFinite(pt.x) && Number.isFinite(pt.y)) {
      const sx = scaleX(pt.x);
      const sy = scaleY(pt.y);
      if (idx === 0 || pathD === '') {
        pathD += `M ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      } else {
        pathD += ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      }
    }
  });

  // Ticks y rejilla (5 divisiones)
  const xTicks = [];
  const yTicks = [];
  const numDivs = 5;

  for (let i = 0; i <= numDivs; i++) {
    const valX = minX + (i / numDivs) * (maxX - minX);
    xTicks.push({ val: valX, sx: scaleX(valX) });

    const valY = minY + (i / numDivs) * (maxY - minY);
    yTicks.push({ val: valY, sy: scaleY(valY) });
  }

  const zeroY = 0 >= minY && 0 <= maxY ? scaleY(0) : null;
  const zeroX = 0 >= minX && 0 <= maxX ? scaleX(0) : null;

  return (
    <div className={`w-full overflow-x-auto flex justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-[650px] h-auto bg-slate-900/90 rounded-xl border border-slate-700/80 shadow-inner font-sans"
        style={{ minWidth: '320px' }}
      >
        {/* Rejilla de Fondo */}
        {xTicks.map((t, idx) => (
          <line
            key={`grid-x-${idx}`}
            x1={t.sx}
            y1={pad.top}
            x2={t.sx}
            y2={pad.top + plotH}
            stroke="#334155"
            strokeDasharray="3,3"
            strokeWidth="0.8"
          />
        ))}

        {yTicks.map((t, idx) => (
          <line
            key={`grid-y-${idx}`}
            x1={pad.left}
            y1={t.sy}
            x2={pad.left + plotW}
            y2={t.sy}
            stroke="#334155"
            strokeDasharray="3,3"
            strokeWidth="0.8"
          />
        ))}

        {/* Ejes Zero si están en rango */}
        {zeroY !== null && (
          <line
            x1={pad.left}
            y1={zeroY}
            x2={pad.left + plotW}
            y2={zeroY}
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
        )}
        {zeroX !== null && (
          <line
            x1={zeroX}
            y1={pad.top}
            x2={zeroX}
            y2={pad.top + plotH}
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
        )}

        {/* Marco Perimetral */}
        <rect
          x={pad.left}
          y={pad.top}
          width={plotW}
          height={plotH}
          fill="none"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Curva Vectorial Principal */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Puntos de Iteración */}
        {markers.map((pt, idx) => (
          <g key={`marker-${idx}`}>
            <circle
              cx={scaleX(pt.x)}
              cy={scaleY(pt.y)}
              r="3.5"
              fill="#fbbf24"
              stroke="#0f172a"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Punto Especial (Raíz o Solución Final) */}
        {specialPoint && Number.isFinite(specialPoint.x) && Number.isFinite(specialPoint.y) && (
          <g>
            <circle
              cx={scaleX(specialPoint.x)}
              cy={scaleY(specialPoint.y)}
              r="7"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {specialPoint.label && (
              <text
                x={scaleX(specialPoint.x) + 10}
                y={scaleY(specialPoint.y) - 8}
                fill="#34d399"
                fontSize="11"
                fontWeight="bold"
              >
                {specialPoint.label}
              </text>
            )}
          </g>
        )}

        {/* Etiquetas de los Ejes X */}
        {xTicks.map((t, idx) => (
          <text
            key={`lbl-x-${idx}`}
            x={t.sx}
            y={pad.top + plotH + 18}
            fill="#94a3b8"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {formatNum(t.val, 2)}
          </text>
        ))}

        {/* Etiquetas de los Ejes Y */}
        {yTicks.map((t, idx) => (
          <text
            key={`lbl-y-${idx}`}
            x={pad.left - 8}
            y={t.sy + 3.5}
            fill="#94a3b8"
            fontSize="10"
            textAnchor="end"
            fontFamily="monospace"
          >
            {formatNum(t.val, 2)}
          </text>
        ))}

        {/* Título de los Ejes */}
        <text
          x={pad.left + plotW / 2}
          y={height - 10}
          fill="#cbd5e1"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
        >
          {xLabel}
        </text>

        <text
          x={18}
          y={pad.top + plotH / 2}
          fill="#cbd5e1"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform={`rotate(-90, 18, ${pad.top + plotH / 2})`}
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
}

/**
 * Genera el string SVG puro para insertar directamente en documentos HTML imprimibles.
 */
export function generatePureSvgString({
  curve = [],
  markers = [],
  specialPoint = null,
  xLabel = 'x',
  yLabel = 'y',
  width = 650,
  height = 300
}) {
  const pad = { top: 25, right: 30, bottom: 40, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const allX = [];
  const allY = [];

  curve.forEach((p) => {
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      allX.push(p.x);
      allY.push(p.y);
    }
  });

  markers.forEach((p) => {
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      allX.push(p.x);
      allY.push(p.y);
    }
  });

  if (specialPoint && Number.isFinite(specialPoint.x) && Number.isFinite(specialPoint.y)) {
    allX.push(specialPoint.x);
    allY.push(specialPoint.y);
  }

  let minX = allX.length > 0 ? Math.min(...allX) : 0;
  let maxX = allX.length > 0 ? Math.max(...allX) : 1;
  let minY = allY.length > 0 ? Math.min(...allY) : 0;
  let maxY = allY.length > 0 ? Math.max(...allY) : 1;

  if (minX === maxX) {
    minX -= 1;
    maxX += 1;
  }
  if (minY === maxY) {
    minY -= 1;
    maxY += 1;
  }

  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  minX -= spanX * 0.08;
  maxX += spanX * 0.08;
  minY -= spanY * 0.08;
  maxY += spanY * 0.08;

  const scaleX = (x) => pad.left + ((x - minX) / (maxX - minX)) * plotW;
  const scaleY = (y) => pad.top + plotH - ((y - minY) / (maxY - minY)) * plotH;

  let pathD = '';
  curve.forEach((pt, idx) => {
    if (Number.isFinite(pt.x) && Number.isFinite(pt.y)) {
      const sx = scaleX(pt.x);
      const sy = scaleY(pt.y);
      if (idx === 0 || pathD === '') {
        pathD += `M ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      } else {
        pathD += ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`;
      }
    }
  });

  const xTicks = [];
  const yTicks = [];
  const numDivs = 5;

  for (let i = 0; i <= numDivs; i++) {
    const valX = minX + (i / numDivs) * (maxX - minX);
    xTicks.push({ val: valX, sx: scaleX(valX) });

    const valY = minY + (i / numDivs) * (maxY - minY);
    yTicks.push({ val: valY, sy: scaleY(valY) });
  }

  const zeroY = 0 >= minY && 0 <= maxY ? scaleY(0) : null;
  const zeroX = 0 >= minX && 0 <= maxX ? scaleX(0) : null;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="width:100%; max-width:650px; height:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; font-family:sans-serif;">
      ${xTicks
        .map(
          (t) =>
            `<line x1="${t.sx}" y1="${pad.top}" x2="${t.sx}" y2="${pad.top + plotH}" stroke="#e2e8f0" stroke-dasharray="3,3" stroke-width="0.8" />`
        )
        .join('')}
      ${yTicks
        .map(
          (t) =>
            `<line x1="${pad.left}" y1="${t.sy}" x2="${pad.left + plotW}" y2="${t.sy}" stroke="#e2e8f0" stroke-dasharray="3,3" stroke-width="0.8" />`
        )
        .join('')}
      ${
        zeroY !== null
          ? `<line x1="${pad.left}" y1="${zeroY}" x2="${pad.left + plotW}" y2="${zeroY}" stroke="#64748b" stroke-width="1.2" />`
          : ''
      }
      ${
        zeroX !== null
          ? `<line x1="${zeroX}" y1="${pad.top}" x2="${zeroX}" y2="${pad.top + plotH}" stroke="#64748b" stroke-width="1.2" />`
          : ''
      }
      <rect x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="none" stroke="#94a3b8" stroke-width="1" />
      ${
        pathD
          ? `<path d="${pathD}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`
          : ''
      }
      ${markers
        .map(
          (pt) =>
            `<circle cx="${scaleX(pt.x).toFixed(1)}" cy="${scaleY(pt.y).toFixed(1)}" r="3.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1" />`
        )
        .join('')}
      ${
        specialPoint && Number.isFinite(specialPoint.x) && Number.isFinite(specialPoint.y)
          ? `<circle cx="${scaleX(specialPoint.x).toFixed(1)}" cy="${scaleY(specialPoint.y).toFixed(1)}" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" />
             <text x="${(scaleX(specialPoint.x) + 8).toFixed(1)}" y="${(scaleY(specialPoint.y) - 6).toFixed(1)}" fill="#059669" font-size="11" font-weight="bold">${specialPoint.label || 'Solución'}</text>`
          : ''
      }
      ${xTicks
        .map(
          (t) =>
            `<text x="${t.sx.toFixed(1)}" y="${pad.top + plotH + 16}" fill="#475569" font-size="10" text-anchor="middle" font-family="monospace">${formatNum(t.val, 2)}</text>`
        )
        .join('')}
      ${yTicks
        .map(
          (t) =>
            `<text x="${pad.left - 6}" y="${(t.sy + 3.5).toFixed(1)}" fill="#475569" font-size="10" text-anchor="end" font-family="monospace">${formatNum(t.val, 2)}</text>`
        )
        .join('')}
      <text x="${pad.left + plotW / 2}" y="${height - 8}" fill="#1e293b" font-size="11" font-weight="bold" text-anchor="middle">${xLabel}</text>
      <text x="16" y="${pad.top + plotH / 2}" fill="#1e293b" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(-90, 16, ${pad.top + plotH / 2})">${yLabel}</text>
    </svg>
  `;
}
