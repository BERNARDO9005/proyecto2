import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

/**
 * Componente gráfico 2D interactivo basado en Plotly.js con tema Dark (#0f172a / #1e293b).
 * @param {{ data: any[], layout?: any, config?: any, className?: string }} props
 */
export default function InteractivePlot({ data = [], layout = {}, config = {}, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const defaultLayout = {
      autosize: true,
      paper_bgcolor: '#1e293b',
      plot_bgcolor: '#0f172a',
      font: {
        family: 'Inter, system-ui, sans-serif',
        color: '#cbd5e1',
        size: 12
      },
      margin: { l: 55, r: 25, t: 40, b: 45 },
      xaxis: {
        gridcolor: '#334155',
        zerolinecolor: '#64748b',
        zerolinewidth: 1.5,
        tickfont: { color: '#94a3b8' },
        title: {
          text: 'x',
          font: { color: '#e2e8f0', size: 13 }
        }
      },
      yaxis: {
        gridcolor: '#334155',
        zerolinecolor: '#64748b',
        zerolinewidth: 1.5,
        tickfont: { color: '#94a3b8' },
        title: {
          text: 'y',
          font: { color: '#e2e8f0', size: 13 }
        }
      },
      legend: {
        font: { color: '#cbd5e1' },
        bgcolor: 'rgba(30, 41, 59, 0.85)',
        bordercolor: '#475569',
        borderwidth: 1
      },
      ...layout
    };

    const defaultConfig = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      toImageButtonOptions: {
        format: 'png',
        filename: 'grafico_metodos_numericos',
        height: 600,
        width: 900,
        scale: 2
      },
      ...config
    };

    Plotly.react(containerRef.current, data, defaultLayout, defaultConfig);

    const handleResize = () => {
      if (containerRef.current) {
        Plotly.Plots.resize(containerRef.current);
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (containerRef.current) {
        Plotly.purge(containerRef.current);
      }
    };
  }, [data, layout, config]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-80 md:h-96 rounded-xl border border-slate-700/60 overflow-hidden shadow-xl shadow-slate-950/40 ${className}`}
    />
  );
}
