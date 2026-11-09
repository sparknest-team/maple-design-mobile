// CSS number/dimension grammar: https://www.w3.org/TR/css-values-4/#lengths
// Container-relative units: https://www.w3.org/TR/css-conditional-5/#container-lengths
const lengthLiteral =
  /^([+-]?(?:\d+|\d*\.\d+)(?:e[+-]?\d+)?)(%|cm|mm|q|in|pt|pc|px|em|rem|ex|rex|cap|rcap|ch|rch|ic|ric|lh|rlh|[sld]?v(?:w|h|i|b|min|max)|cq(?:w|h|i|b|min|max))?$/i
const lengthFunction = /^(?:calc|min|max|clamp|var|env|round|mod|rem|hypot|abs)\([\s\S]+\)$/i

export function positiveLength(value: unknown, fallback: string): string {
  return resolveLength(value, fallback, false)
}

export function nonnegativeLength(value: unknown, fallback: string): string {
  return resolveLength(value, fallback, true)
}

function resolveLength(value: unknown, fallback: string, allowZero: boolean): string {
  if (typeof value === 'number') {
    return Number.isFinite(value) && (allowZero ? value >= 0 : value > 0) ? `${value}px` : fallback
  }
  if (typeof value !== 'string') {
    return fallback
  }
  const text = value.trim()
  const literal = lengthLiteral.exec(text)
  if (literal) {
    const amount = Number(literal[1])
    if (!Number.isFinite(amount) || (allowZero ? amount < 0 : amount <= 0)) {
      return fallback
    }
    if (!literal[2]) {
      return `${amount}px`
    }
  } else if (!lengthFunction.test(text)) {
    return fallback
  }
  // Expression resolution remains the caller's CSS responsibility; check browser syntax when available.
  if (typeof CSS !== 'undefined' && CSS.supports && !CSS.supports('width', text)) {
    return fallback
  }
  return text
}
