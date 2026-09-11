import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

/**
 * Componente para mostrar alertas y notificaciones científicas
 * @param {{
 *   type: 'error' | 'warning' | 'success' | 'info',
 *   title?: string,
 *   message: string,
 *   onClose?: () => void
 * }} props
 */
export default function AlertBanner({ type = 'info', title, message, onClose }) {
  if (!message) return null;

  const styles = {
    error: {
      bg: 'bg-rose-950/40 border-rose-600/60 text-rose-200',
      icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Error de Cálculo'
    },
    warning: {
      bg: 'bg-amber-950/40 border-amber-600/60 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Advertencia Numérica'
    },
    success: {
      bg: 'bg-emerald-950/40 border-emerald-600/60 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Cálculo Exitoso'
    },
    info: {
      bg: 'bg-cyan-950/40 border-cyan-600/60 text-cyan-200',
      icon: <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Aviso del Sistema'
    }
  };

  const current = styles[type] || styles.info;

  return (
    <div
      role="alert"
      className={`p-4 rounded-xl border flex items-start gap-3 shadow-md backdrop-blur-sm ${current.bg}`}
    >
      {current.icon}
      <div className="flex-1 text-sm">
        <h5 className="font-semibold mb-0.5 text-slate-100">{title || current.defaultTitle}</h5>
        <div className="leading-relaxed break-words">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors"
          aria-label="Cerrar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
