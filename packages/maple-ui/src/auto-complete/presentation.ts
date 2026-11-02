import { h } from 'vue'
import { defaultSelectionPresentation } from '../_components/field-presentation/context'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import Base from './auto-complete'

export default withFieldPresentation(Base, {
  defaultPresentation: defaultSelectionPresentation,
  intent: 'input',
  editor: ({ props, attrs, value, update, emit, slots, disabled, readonly }) =>
    h(SelectionEditor, { kind: 'auto-complete' }, () =>
      h(
        Base,
        {
          ...attrs,
          ...props,
          modelValue: value,
          editMode: 'direct',
          disabled,
          readonly,
          'onUpdate:modelValue': update,
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
    ),
})
