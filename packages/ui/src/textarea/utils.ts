import type { CSSProperties } from 'vue'

const sizeStyles = [
  'border-width',
  'border-top-width',
  'border-top-style',
  'border-right-width',
  'border-right-style',
  'border-bottom-width',
  'border-bottom-style',
  'border-left-width',
  'border-left-style',
  'box-sizing',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'text-indent',
  'text-rendering',
  'text-transform',
  'white-space',
  'overflow-wrap',
  'width',
]

const controlledTextareaAttrs = [
  'value',
  'disabled',
  'readonly',
  'rows',
  'maxlength',
  'autofocus',
  'enterkeyhint',
  'onInput',
  'onChange',
  'onFocus',
  'onBlur',
  'onKeydown',
  'onKeyDown',
  'onCompositionstart',
  'onCompositionStart',
  'onCompositionupdate',
  'onCompositionUpdate',
  'onCompositionend',
  'onCompositionEnd',
]

export const getSizeStyles = (styleDeclaration: CSSStyleDeclaration) => {
  const styles: Record<string, string> = {}
  sizeStyles.forEach((item) => {
    styles[item] = styleDeclaration.getPropertyValue(item)
  })
  return styles
}

export interface TextareaAutoSizeOptions {
  minRows?: number
  maxRows?: number
}

export function isValidTextareaRows(value: unknown): value is number | string {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return false
  }
  const rows = Number(value)
  return Number.isFinite(rows) && Number.isInteger(rows) && rows > 0
}

export function resolveTextareaRows(value: unknown): number | undefined {
  return isValidTextareaRows(value) ? Number(value) : undefined
}

export function isValidTextareaAutoSize(value: unknown): value is boolean | TextareaAutoSizeOptions {
  if (typeof value === 'boolean') {
    return true
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }
  const options = value as { minRows?: unknown; maxRows?: unknown }
  const valid = (rows: unknown): rows is number | undefined =>
    rows === undefined || (typeof rows === 'number' && Number.isFinite(rows) && rows > 0)
  return (
    valid(options.minRows) &&
    valid(options.maxRows) &&
    (options.minRows === undefined || options.maxRows === undefined || options.minRows <= options.maxRows)
  )
}

export function resolveTextareaAutoSize(value: unknown): boolean | TextareaAutoSizeOptions {
  return isValidTextareaAutoSize(value) ? value : false
}

export const getTextareaAutoSizeStyle = (
  styles: Record<string, string>,
  mirrorHeight: number,
  options?: TextareaAutoSizeOptions,
): CSSProperties => {
  const fontSize = Number.parseFloat(styles['font-size']) || 0
  const lineHeight = Number.parseFloat(styles['line-height']) || fontSize * 1.5
  const paddingHeight =
    (Number.parseFloat(styles['padding-top']) || 0) + (Number.parseFloat(styles['padding-bottom']) || 0)
  const borderHeight =
    (Number.parseFloat(styles['border-top-width']) || 0) + (Number.parseFloat(styles['border-bottom-width']) || 0)
  const outerHeight = paddingHeight + borderHeight
  const borderBox = styles['box-sizing'] !== 'content-box'
  const rowOffset = borderBox ? outerHeight : 0
  // offsetHeight always measures the border box; CSS height follows box-sizing.
  const measuredHeight = Math.max(0, mirrorHeight - (borderBox ? 0 : outerHeight))
  const minHeight = options?.minRows ? options.minRows * lineHeight + rowOffset : 0
  const maxHeight = options?.maxRows ? options.maxRows * lineHeight + rowOffset : 0
  const height = Math.max(minHeight, measuredHeight)
  const cappedHeight = maxHeight && height > maxHeight ? maxHeight : height
  return {
    height: `${cappedHeight}px`,
    ...(options?.minRows || options?.maxRows ? { minHeight: `${minHeight}px` } : {}),
    overflow: maxHeight && height > maxHeight ? 'auto' : 'hidden',
  }
}

export const getNativeTextareaAttrs = (attrs: Record<string, unknown> = {}) => {
  const result = { ...attrs }
  controlledTextareaAttrs.forEach((key) => {
    delete result[key]
  })
  return result
}
