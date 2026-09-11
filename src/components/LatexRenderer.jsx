import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * Componente para renderizado de fórmulas matemáticas mediante KaTeX
 * @param {{ expression: string, displayMode?: boolean, className?: string }} props
 */
export default function LatexRenderer({ expression, displayMode = false, className = '' }) {
  const html = useMemo(() => {
    if (!expression) return '';
    try {
      return katex.renderToString(expression, {
        displayMode,
        throwOnError: false,
        strict: false
      });
    } catch {
      return `<span class="text-rose-400 font-mono text-xs">${expression}</span>`;
    }
  }, [expression, displayMode]);

  return (
    <span
      className={`inline-block overflow-x-auto align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
