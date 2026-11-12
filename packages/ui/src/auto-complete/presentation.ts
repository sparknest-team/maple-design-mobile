import { h, normalizeStyle, type StyleValue } from 'vue'
import { defaultSelectionPresentation } from '../_components/field-presentation/context'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import Base from './auto-complete'

export default withFieldPresentation(Base, {
  selectionConfirmation: 'select',
  methods: ['focus', 'blur', 'refresh'],
  defaultPresentation: defaultSelectionPresentation,
  intent: 'input',
  editor: ({ props, attrs, value, update, emit, slots, disabled, readonly }) => {
    // Preserve token overrides without copying field layout into the popup.
    const style = Object.fromEntries(
      Object.entries(normalizeStyle([attrs.style as StyleValue]) ?? {}).filter(([key]) => key.startsWith('--')),
    )
    const editorAttrs: Record<string, unknown> = { ...attrs, style }
    delete editorAttrs.class
    return h(SelectionEditor, { kind: 'auto-complete' }, () =>
      h(
        Base,
        {
          ...editorAttrs,
          ...props,
          modelValue: value,
          editMode: 'direct',
          disabled,
          readonly,
          'onUpdate:modelValue': update,
          onKeydown: (event: KeyboardEvent) => emit('keydown', event),
          onSearch: (...args: any[]) => emit('search', ...args),
          onInput: (...args: any[]) => emit('input', ...args),
          onSelect: (...args: any[]) => emit('select', ...args),
          onClear: (...args: any[]) => emit('clear', ...args),
          onFocus: (...args: any[]) => emit('focus', ...args),
          onBlur: (...args: any[]) => emit('blur', ...args),
          onDropdownScroll: (...args: any[]) => emit('dropdown-scroll', ...args),
          onDropdownReachBottom: (...args: any[]) => emit('dropdown-reach-bottom', ...args),
        },
        slots,
      ),
    )
  },
})
