import * as math from 'mathjs';

/**
 * Traduce un nodo del AST de mathjs a una cadena de código en el lenguaje especificado.
 * @param {math.MathNode} node
 * @param {'python' | 'matlab' | 'cpp'} lang
 * @param {{ varMap?: Record<string, string>, vectorize?: boolean }} options
 * @returns {string}
 */
function nodeToLang(node, lang, options = {}) {
  const { varMap = {}, vectorize = true } = options;

  switch (node.type) {
    case 'ConstantNode':
      return String(node.value);

    case 'SymbolNode': {
      const name = node.name;
      if (varMap[name]) return varMap[name];
      if (name === 'pi' || name === 'PI') {
        if (lang === 'python') return 'np.pi';
        if (lang === 'matlab') return 'pi';
        if (lang === 'cpp') return 'M_PI';
      }
      if (name === 'e' || name === 'E') {
        if (lang === 'python') return 'np.e';
        if (lang === 'matlab') return 'exp(1)';
        if (lang === 'cpp') return 'M_E';
      }
      return name;
    }

    case 'ParenthesisNode':
      return `(${nodeToLang(node.content, lang, options)})`;

    case 'OperatorNode': {
      if (node.isUnary()) {
        const argStr = nodeToLang(node.args[0], lang, options);
        return `${node.op}${argStr}`;
      }

      const left = nodeToLang(node.args[0], lang, options);
      const right = nodeToLang(node.args[1], lang, options);

      if (node.op === '^') {
        if (lang === 'python') return `(${left} ** ${right})`;
        if (lang === 'matlab') return vectorize ? `(${left} .^ ${right})` : `(${left} ^ ${right})`;
        if (lang === 'cpp') return `std::pow(${left}, ${right})`;
      }

      let op = node.op;
      if (lang === 'matlab' && vectorize) {
        if (op === '*') op = ' .* ';
        else if (op === '/') op = ' ./ ';
        else op = ` ${op} `;
      } else {
        op = ` ${op} `;
      }

      return `${left}${op}${right}`;
    }

    case 'FunctionNode': {
      const argsStr = node.args.map((a) => nodeToLang(a, lang, options)).join(', ');
      let fnName = node.name.toLowerCase();

      if (fnName === 'ln') fnName = 'log';

      if (lang === 'python') {
        if (fnName === 'abs') return `np.abs(${argsStr})`;
        return `np.${fnName}(${argsStr})`;
      }
      if (lang === 'matlab') {
        return `${fnName}(${argsStr})`;
      }
      if (lang === 'cpp') {
        if (fnName === 'abs') return `std::fabs(${argsStr})`;
        return `std::${fnName}(${argsStr})`;
      }
      return `${fnName}(${argsStr})`;
    }

    default:
      return node.toString();
  }
}

/**
 * Traduce una expresión matemática a Python, MATLAB o C++.
 * Si falla el parser de mathjs, aplica fallback basado en reemplazo de expresiones regulares.
 *
 * @param {string} expression - Cadena con la fórmula matemática (ej: "x^3 - 2*x - 5")
 * @param {'python' | 'matlab' | 'cpp'} lang - Lenguaje objetivo
 * @param {{ varMap?: Record<string, string>, vectorize?: boolean }} [options]
 * @returns {string}
 */
export function translateExpression(expression, lang, options = {}) {
  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    return lang === 'cpp' ? '0.0' : '0';
  }

  const clean = expression.trim();

  try {
    const parsed = math.parse(clean);
    return nodeToLang(parsed, lang, options);
  } catch {
    // Fallback con expresiones regulares
    let res = clean;
    if (lang === 'python') {
      res = res.replace(/\^/g, '**');
      res = res.replace(/\bpi\b/gi, 'np.pi');
      res = res.replace(/\be\b/g, 'np.e');
      res = res.replace(/\b(sin|cos|tan|exp|log|sqrt|sinh|cosh|tanh)\b/g, 'np.$1');
    } else if (lang === 'matlab') {
      if (options.vectorize !== false) {
        res = res.replace(/\^/g, '.^');
        res = res.replace(/\*/g, '.*');
        res = res.replace(/\//g, './');
      }
      res = res.replace(/\bln\b/g, 'log');
    } else if (lang === 'cpp') {
      res = res.replace(/\bpi\b/gi, 'M_PI');
      res = res.replace(/\b(sin|cos|tan|exp|log|sqrt|abs)\b/g, 'std::$1');
      res = res.replace(/([a-zA-Z0-9_]+)\s*\^\s*([a-zA-Z0-9_]+)/g, 'std::pow($1, $2)');
    }
    return res;
  }
}

/**
 * Convierte una expresión matemática a LaTeX utilizando el AST de mathjs.
 * @param {string} expression
 * @returns {string}
 */
export function expressionToLatex(expression) {
  if (!expression || typeof expression !== 'string' || expression.trim() === '') {
    return '0';
  }
  try {
    const parsed = math.parse(expression.trim());
    return parsed.toTex({ parenthesis: 'auto' });
  } catch {
    return expression.trim();
  }
}
