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
  'aria-label',
  'aria-invalid',
  'ariaInvalid',
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
  const styles: Record<string, any> = {}
  sizeStyles.forEach((item) => {
    styles[item] = styleDeclaration.getPropertyValue(item)
  })
  return styles
}

export const getNativeTextareaAttrs = (attrs: Record<string, unknown> = {}) => {
  const result = { ...attrs }
  controlledTextareaAttrs.forEach((key) => {
    delete result[key]
  })
  return result
}
