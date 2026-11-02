import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Calculator,
  History,
  Atom,
  Copy,
  Check,
  RotateCcw,
  Delete,
  ArrowRight,
  Download,
  Trash2,
  X,
  Info,
  CornerDownLeft
} from 'lucide-react';
import {
  evaluateScientific,
  toFractionString,
  toEngineeringString,
  toScientificString,
  formatResult,
  expressionToLatex,
  PHYSICAL_CONSTANTS
} from '../engines/scientificEngine';
import LatexRenderer from '../components/LatexRenderer';

export default function ScientificCalculatorModule({ precision = 6 }) {
  // Estados de cálculo
  const [input, setInput] = useState('');
  const [lastAnswer, setLastAnswer] = useState(0);
  const [memory, setMemory] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [error, setError] = useState(null);

  // Modos de operación
  const [angleMode, setAngleMode] = useState('DEG'); // 'DEG' | 'RAD' | 'GRAD'
  const [displayFormat, setDisplayFormat] = useState('normal'); // 'normal' | 'sci' | 'eng' | 'frac'
  const [isSecond, setIsSecond] = useState(false); // 2nd function
  const [isHyp, setIsHyp] = useState(false); // Hyperbolic functions

  // Modales y paneles auxiliares
  const [showHistory, setShowHistory] = useState(false);
  const [showConstants, setShowConstants] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 1,
      expression: 'sin(30) + cos(60)',
      latex: '\\sin\\left(30\\right)+\\cos\\left(60\\right)',
      result: 1,
      formatted: '1',
      angleMode: 'DEG',
      timestamp: 'Ejemplo'
    }
  ]);

  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const inputRef = useRef(null);

  // Evaluación en tiempo real para vista previa
  const livePreview = useMemo(() => {
    if (!input.trim()) return null;
    return evaluateScientific(input, {
      angleMode,
      ans: lastAnswer,
      precision,
      memory
    });
  }, [input, angleMode, lastAnswer, precision, memory]);

  // Expresión en LaTeX para el display
  const latexDisplay = useMemo(() => {
    if (!input) return '';
    return expressionToLatex(input);
  }, [input]);

  // Manejo de foco en el campo de entrada
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Insertar texto en la posición actual del cursor
  const insertText = (text) => {
    if (!inputRef.current) {
      setInput((prev) => prev + text);
      return;
    }
    const start = inputRef.current.selectionStart || input.length;
    const end = inputRef.current.selectionEnd || input.length;
    const newInput = input.substring(0, start) + text + input.substring(end);
    setInput(newInput);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const nextPos = start + text.length;
        inputRef.current.setSelectionRange(nextPos, nextPos);
      }
    }, 0);
  };

  // Borrar el carácter anterior al cursor
  const handleBackspace = () => {
    if (!inputRef.current) {
      setInput((prev) => prev.slice(0, -1));
      return;
    }
    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;

    if (start === end && start > 0) {
      const newInput = input.substring(0, start - 1) + input.substring(end);
      setInput(newInput);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(start - 1, start - 1);
        }
      }, 0);
    } else if (start !== end) {
      const newInput = input.substring(0, start) + input.substring(end);
      setInput(newInput);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(start, start);
        }
      }, 0);
    }
  };

  // Limpiar todo (All Clear)
  const handleAllClear = () => {
    setInput('');
    setCurrentResult(null);
    setError(null);
    focusInput();
  };

  // Ejecutar el cálculo actual
  const handleCalculate = () => {
    if (!input.trim()) return;

    const evaluation = evaluateScientific(input, {
      angleMode,
      ans: lastAnswer,
      precision,
      memory
    });

    if (evaluation.error) {
      setError(evaluation.error);
      setCurrentResult(null);
    } else {
      setError(null);
      setCurrentResult(evaluation);
      setLastAnswer(evaluation.result);

      // Añadir al historial
      const newEntry = {
        id: Date.now(),
        expression: input,
        latex: evaluation.latex || expressionToLatex(input),
        result: evaluation.result,
        formatted: evaluation.formatted,
        scientific: evaluation.scientific,
        engineering: evaluation.engineering,
        fraction: evaluation.fraction,
        angleMode,
        timestamp: new Date().toLocaleTimeString()
      };
      setHistory((prev) => [newEntry, ...prev.slice(0, 49)]); // Guardar últimas 50
    }
    focusInput();
  };

  // Inversión de signo ±
  const handleToggleSign = () => {
    if (!input) {
      setInput('-');
      return;
    }
    if (input.startsWith('-(') && input.endsWith(')')) {
      setInput(input.slice(2, -1));
    } else if (input.startsWith('-')) {
      setInput(input.slice(1));
    } else {
      setInput(`-(${input})`);
    }
    focusInput();
  };

  // Operaciones de Memoria
  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => insertText(memory.toString());
  const handleMemoryAdd = () => {
    const val = currentResult ? currentResult.result : parseFloat(input);
    if (!isNaN(val)) setMemory((prev) => prev + val);
  };
  const handleMemorySubtract = () => {
    const val = currentResult ? currentResult.result : parseFloat(input);
    if (!isNaN(val)) setMemory((prev) => prev - val);
  };
  const handleMemoryStore = () => {
    const val = currentResult ? currentResult.result : parseFloat(input);
    if (!isNaN(val)) setMemory(val);
  };

  // Copiar resultado al portapapeles
  const handleCopyResult = (val) => {
    const textToCopy = val !== undefined ? String(val) : String(currentResult?.result ?? '');
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  // Atajos de teclado nativos
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCalculate();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleAllClear();
    }
  };

  // Obtener texto para mostrar según el formato activo
  const formattedDisplayValue = useMemo(() => {
    if (!currentResult) return livePreview?.formatted ?? '0';
    if (displayFormat === 'sci') return currentResult.scientific;
    if (displayFormat === 'eng') return currentResult.engineering;
    if (displayFormat === 'frac') return currentResult.fraction || currentResult.formatted;
    return currentResult.formatted;
  }, [currentResult, livePreview, displayFormat]);

  // Exportar historial a CSV
  const exportHistoryCSV = () => {
    if (history.length === 0) return;
    const header = 'ID,Hora,Modo,Expresion,Resultado,Formato\n';
    const rows = history
      .map(
        (h) =>
          `"${h.id}","${h.timestamp}","${h.angleMode}","${h.expression}","${h.result}","${h.formatted}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `historial_calculadora_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Barra de Título y Modos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Calculadora Científica
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Full Precision
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Operaciones científicas, trigonometría con modos angulares, memoria y constantes
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción rápida: Constantes e Historial */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConstants(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
          >
            <Atom className="w-3.5 h-3.5 text-cyan-400" />
            <span>Constantes Físicas</span>
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
              showHistory
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial ({history.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PANEL PRINCIPAL: Pantalla y Teclado Científico (2 columnas en LG) */}
        <div className="lg:col-span-2 space-y-4">
          {/* PANTALLA CIENTÍFICA (NATURAL DISPLAY) */}
          <div className="rounded-3xl bg-[#080d1a] border-2 border-slate-800/90 shadow-2xl p-5 space-y-3 relative overflow-hidden">
            {/* Barra de Estado Superior de la Pantalla */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                {/* Selector / Indicador de Modo Angular */}
                <div className="flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                  {['DEG', 'RAD', 'GRAD'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setAngleMode(m)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        angleMode === m
                          ? 'bg-emerald-500 text-slate-950 font-extrabold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                {/* Indicador 2nd */}
                {isSecond && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                    2ND
                  </span>
                )}

                {/* Indicador HYP */}
                {isHyp && (
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                    HYP
                  </span>
                )}

                {/* Indicador de Memoria */}
                {memory !== 0 && (
                  <span
                    title={`Memoria: ${memory}`}
                    className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold cursor-pointer"
                    onClick={handleMemoryRecall}
                  >
                    M: {formatResult(memory, 3)}
                  </span>
                )}
              </div>

              {/* Selector de Formato de Salida */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500 hidden sm:inline">Formato:</span>
                <select
                  value={displayFormat}
                  onChange={(e) => setDisplayFormat(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono rounded px-1.5 py-0.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="normal">Normal</option>
                  <option value="sci">Científica (Sci)</option>
                  <option value="eng">Ingeniería (Eng)</option>
                  <option value="frac">Fracción (Frac)</option>
                </select>
              </div>
            </div>

            {/* Renderizado LaTeX / Fórmula en vivo */}
            <div className="min-h-[32px] flex items-center justify-end overflow-x-auto text-slate-400 px-2 text-sm">
              {latexDisplay ? (
                <LatexRenderer expression={latexDisplay} />
              ) : (
                <span className="text-slate-600 italic text-xs font-mono">
                  Ingrese una expresión matemática o use el teclado
                </span>
              )}
            </div>

            {/* Input Editable Directo */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleKeyDown}
                placeholder="0"
                className="w-full bg-transparent text-right font-mono text-2xl sm:text-3xl text-slate-100 placeholder-slate-700 focus:outline-none tracking-wider pr-2"
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* Resultado Principal & Notificaciones */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-2 min-h-[44px]">
              {/* Notificación de error o alternativas fraccionarias */}
              <div className="text-xs">
                {error ? (
                  <span className="text-rose-400 font-mono flex items-center gap-1 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800">
                    ⚠ {error}
                  </span>
                ) : currentResult?.fraction ? (
                  <button
                    onClick={() => handleCopyResult(currentResult.fraction)}
                    className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/60 transition-colors"
                    title="Haga clic para copiar la fracción exacta"
                  >
                    Fracción: {currentResult.fraction}
                  </button>
                ) : null}
              </div>

              {/* Valor del resultado */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">=</span>
                <span
                  onClick={() => handleCopyResult()}
                  title="Haga clic para copiar"
                  className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors"
                >
                  {formattedDisplayValue}
                </span>

                <button
                  onClick={() => handleCopyResult()}
                  title="Copiar resultado"
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedFeedback ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* BARRA DE MEMORIA (MC, MR, M+, M-, MS) */}
          <div className="grid grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={handleMemoryClear}
              className="py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="Memory Clear (Borrar memoria)"
            >
              MC
            </button>
            <button
              onClick={handleMemoryRecall}
              className="py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="Memory Recall (Recuperar memoria)"
            >
              MR
            </button>
            <button
              onClick={handleMemoryAdd}
              className="py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border border-slate-700/60 transition-colors"
              title="Memory Add (Sumar a memoria)"
            >
              M+
            </button>
            <button
              onClick={handleMemorySubtract}
              className="py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border border-slate-700/60 transition-colors"
              title="Memory Subtract (Restar de memoria)"
            >
              M-
            </button>
            <button
              onClick={handleMemoryStore}
              className="py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border border-slate-700/60 transition-colors"
              title="Memory Store (Guardar en memoria)"
            >
              MS
            </button>
          </div>

          {/* TECLADO CIENTÍFICO */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-3 rounded-3xl bg-slate-900/40 border border-slate-800 text-sm font-medium">
            {/* FILA 1: Modificadores y Trig Básica */}
            <button
              onClick={() => setIsSecond(!isSecond)}
              className={`p-3 rounded-2xl border font-bold transition-all ${
                isSecond
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 border-slate-700'
              }`}
            >
              2nd
            </button>

            <button
              onClick={() => setIsHyp(!isHyp)}
              className={`p-3 rounded-2xl border font-bold transition-all ${
                isHyp
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 border-slate-700'
              }`}
            >
              hyp
            </button>

            {/* Seno / Inverso / Hiperbólico */}
            <button
              onClick={() =>
                insertText(
                  isHyp
                    ? isSecond
                      ? 'asinh('
                      : 'sinh('
                    : isSecond
                    ? 'asin('
                    : 'sin('
                )
              }
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isHyp
                ? isSecond
                  ? 'sinh⁻¹'
                  : 'sinh'
                : isSecond
                ? 'sin⁻¹'
                : 'sin'}
            </button>

            {/* Coseno */}
            <button
              onClick={() =>
                insertText(
                  isHyp
                    ? isSecond
                      ? 'acosh('
                      : 'cosh('
                    : isSecond
                    ? 'acos('
                    : 'cos('
                )
              }
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isHyp
                ? isSecond
                  ? 'cosh⁻¹'
                  : 'cosh'
                : isSecond
                ? 'cos⁻¹'
                : 'cos'}
            </button>

            {/* Tangente */}
            <button
              onClick={() =>
                insertText(
                  isHyp
                    ? isSecond
                      ? 'atanh('
                      : 'tanh('
                    : isSecond
                    ? 'atan('
                    : 'tan('
                )
              }
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isHyp
                ? isSecond
                  ? 'tanh⁻¹'
                  : 'tanh'
                : isSecond
                ? 'tan⁻¹'
                : 'tan'}
            </button>

            {/* Logaritmo Natural / e^x */}
            <button
              onClick={() => insertText(isSecond ? 'e^(' : 'ln(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isSecond ? 'eˣ' : 'ln'}
            </button>

            {/* Log10 / 10^x */}
            <button
              onClick={() => insertText(isSecond ? '10^(' : 'log10(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isSecond ? '10ˣ' : 'log'}
            </button>

            {/* FILA 2: Potencias y Raíces */}
            <button
              onClick={() => insertText(isSecond ? '^3' : '^2')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isSecond ? 'x³' : 'x²'}
            </button>

            <button
              onClick={() => insertText('^(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              xʸ
            </button>

            <button
              onClick={() => insertText(isSecond ? 'cbrt(' : 'sqrt(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              {isSecond ? '³√x' : '√x'}
            </button>

            <button
              onClick={() => insertText('^(-1)')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              1/x
            </button>

            <button
              onClick={() => insertText('abs(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              |x|
            </button>

            <button
              onClick={() => insertText('(')}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold"
            >
              (
            </button>

            <button
              onClick={() => insertText(')')}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold"
            >
              )
            </button>

            {/* FILA 3: Combinatoria y Números 7, 8, 9, División */}
            <button
              onClick={() => insertText('!')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              n!
            </button>

            <button
              onClick={() => insertText('nCr(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              nCr
            </button>

            <button
              onClick={() => insertText('nPr(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              nPr
            </button>

            <button
              onClick={() => insertText('7')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              7
            </button>

            <button
              onClick={() => insertText('8')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              8
            </button>

            <button
              onClick={() => insertText('9')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              9
            </button>

            <button
              onClick={() => insertText(' ÷ ')}
              className="p-3 rounded-2xl bg-teal-950/70 hover:bg-teal-900 text-teal-300 border border-teal-800 font-mono text-base font-bold"
            >
              ÷
            </button>

            {/* FILA 4: Constantes pi, e, %, Números 4, 5, 6, Multiplicación */}
            <button
              onClick={() => insertText('pi')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-serif"
            >
              π
            </button>

            <button
              onClick={() => insertText('e')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-serif"
            >
              e
            </button>

            <button
              onClick={() => insertText(' % ')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono"
            >
              %
            </button>

            <button
              onClick={() => insertText('4')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              4
            </button>

            <button
              onClick={() => insertText('5')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              5
            </button>

            <button
              onClick={() => insertText('6')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              6
            </button>

            <button
              onClick={() => insertText(' × ')}
              className="p-3 rounded-2xl bg-teal-950/70 hover:bg-teal-900 text-teal-300 border border-teal-800 font-mono text-base font-bold"
            >
              ×
            </button>

            {/* FILA 5: Rand, mod, Signo, Números 1, 2, 3, Resta */}
            <button
              onClick={() => insertText('rand()')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs"
            >
              Rand
            </button>

            <button
              onClick={() => insertText(' mod ')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs"
            >
              mod
            </button>

            <button
              onClick={handleToggleSign}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono font-bold"
            >
              ±
            </button>

            <button
              onClick={() => insertText('1')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              1
            </button>

            <button
              onClick={() => insertText('2')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              2
            </button>

            <button
              onClick={() => insertText('3')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              3
            </button>

            <button
              onClick={() => insertText(' - ')}
              className="p-3 rounded-2xl bg-teal-950/70 hover:bg-teal-900 text-teal-300 border border-teal-800 font-mono text-base font-bold"
            >
              -
            </button>

            {/* FILA 6: Cero, Punto, EXP (10^x), Borrado, Suma y Ejecución */}
            <button
              onClick={() => insertText('0')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              0
            </button>

            <button
              onClick={() => insertText('.')}
              className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-white border border-slate-700/80 font-mono text-base font-bold"
            >
              .
            </button>

            <button
              onClick={() => insertText(' * 10^(')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs"
            >
              EXP
            </button>

            <button
              onClick={() => insertText('Ans')}
              className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-slate-700 font-mono text-xs font-bold"
            >
              Ans
            </button>

            <button
              onClick={handleBackspace}
              className="p-3 rounded-2xl bg-amber-950/50 hover:bg-amber-900 text-amber-300 border border-amber-800 font-mono font-bold flex items-center justify-center"
              title="Borrar carácter anterior"
            >
              <Delete className="w-4 h-4" />
            </button>

            <button
              onClick={handleAllClear}
              className="p-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 font-mono font-bold"
              title="All Clear (Limpiar todo)"
            >
              AC
            </button>

            <button
              onClick={() => insertText(' + ')}
              className="p-3 rounded-2xl bg-teal-950/70 hover:bg-teal-900 text-teal-300 border border-teal-800 font-mono text-base font-bold"
            >
              +
            </button>
          </div>

          {/* BOTÓN GRANDE DE EJECUCIÓN (=) */}
          <button
            onClick={handleCalculate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-lg tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="font-mono text-xl">=</span>
            <span>CALCULAR</span>
          </button>
        </div>

        {/* PANEL LATERAL: HISTORIAL O GUÍA RÁPIDA */}
        <div className="space-y-4">
          {/* Panel de Historial */}
          <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col h-[560px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                <History className="w-4 h-4 text-emerald-400" />
                <span>Historial de Sesión</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={exportHistoryCSV}
                  disabled={history.length === 0}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors disabled:opacity-50"
                  title="Exportar a CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setHistory([])}
                  disabled={history.length === 0}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-200 transition-colors disabled:opacity-50"
                  title="Limpiar historial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Lista de cálculos pasados */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
              {history.length === 0 ? (
                <div className="text-center text-slate-500 py-16 text-xs">
                  No hay cálculos registrados aún
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{item.timestamp}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {item.angleMode}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-nowrap">
                      {item.expression}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <span className="text-sm font-mono font-bold text-emerald-400">
                        = {item.formatted}
                      </span>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setInput(item.expression);
                            focusInput();
                          }}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 hover:text-white"
                          title="Cargar expresión"
                        >
                          Usar
                        </button>
                        <button
                          onClick={() => {
                            insertText(String(item.result));
                          }}
                          className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-400"
                          title="Insertar valor"
                        >
                          Ans
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CONSTANTES CIENTÍFICAS */}
      {showConstants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2">
                <Atom className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-slate-100">
                  Constantes Científicas y Físicas
                </h3>
              </div>
              <button
                onClick={() => setShowConstants(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              <p className="text-xs text-slate-400 mb-3">
                Haga clic en <strong className="text-emerald-400">Insertar</strong> para agregar el valor de la constante a su expresión activa.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PHYSICAL_CONSTANTS.map((c) => (
                  <div
                    key={c.symbol}
                    className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-cyan-300 font-mono">
                          {c.symbol}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {c.category}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-200 mt-0.5">
                        {c.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        {c.value.toExponential(4)} {c.unit}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        insertText(c.value.toString());
                        setShowConstants(false);
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Insertar valor</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end">
              <button
                onClick={() => setShowConstants(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
