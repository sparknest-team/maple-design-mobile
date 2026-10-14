import type { CSSProperties } from 'vue'

const sizeStyles = [
  'border-width',
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

export const getTextareaAutoSizeStyle = (
  styles: Record<string, string>,
  mirrorHeight: number,
  options?: TextareaAutoSizeOptions,
): CSSProperties => {
  const fontSize = Number.parseFloat(styles['font-size']) || 0
  const lineHeight = Number.parseFloat(styles['line-height']) || fontSize * 1.5
  const outerHeight =
    (Number.parseFloat(styles['border-width']) || 0) * 2 +
    (Number.parseFloat(styles['padding-top']) || 0) +
    (Number.parseFloat(styles['padding-bottom']) || 0)
  const minHeight = options?.minRows ? options.minRows * lineHeight + outerHeight : 0
  const maxHeight = options?.maxRows ? options.maxRows * lineHeight + outerHeight : 0
  const height = Math.max(minHeight, mirrorHeight)
  const cappedHeight = maxHeight && height > maxHeight ? maxHeight : height
  return { height: `${cappedHeight}px`, overflow: maxHeight && height > maxHeight ? 'auto' : 'hidden' }
}

export const getNativeTextareaAttrs = (attrs: Record<string, unknown> = {}) => {
  const result = { ...attrs }
  controlledTextareaAttrs.forEach((key) => {
    delete result[key]
  })
  return result
}
