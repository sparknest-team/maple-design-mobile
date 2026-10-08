const nativeKeys = new Set([
  'id',
  'name',
  'form',
  'autocomplete',
  'autofocus',
  'minlength',
  'maxlength',
  'pattern',
  'required',
  'readonly',
  'disabled',
  'tabindex',
  'inputmode',
  'spellcheck',
  'autocorrect',
  'autocapitalize',
  'min',
  'max',
  'step',
  'role',
  'onFocusin',
  'onFocusout',
  'onBeforeinput',
  'onInvalid',
  'onKeypress',
  'onKeyup',
  'onCopy',
  'onCut',
  'onPaste',
  'onCompositionstart',
  'onCompositionupdate',
  'onCompositionend',
  'onSelect',
])

export function splitInputAttrs(attrs: Record<string, unknown>) {
  const native: Record<string, unknown> = {}
  const root: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(attrs)) {
    const target = nativeKeys.has(key) || key.startsWith('aria-') || key.startsWith('data-') ? native : root
    target[key] = value
  }
  return { native, root }
}

/** Capture before normalization; restore selections including position zero. */
export function captureInputSelection(input: HTMLInputElement) {
  const { selectionStart: start, selectionEnd: end, selectionDirection: direction, value } = input
  return (nextValue: string) => {
    if (start == null || end == null || value === nextValue) {
      return
    }
    const suffix = value.slice(end)
    const prefix = value.slice(0, start)
    if (input.value !== nextValue) {
      input.value = nextValue
    }
    const nextEnd =
      suffix && nextValue.endsWith(suffix) ? nextValue.length - suffix.length : Math.min(end, nextValue.length)
    const nextStart = nextValue.startsWith(prefix) ? Math.min(start, nextEnd) : Math.max(0, nextEnd - (end - start))
    input.setSelectionRange(nextStart, nextEnd, direction ?? undefined)
  }
}
