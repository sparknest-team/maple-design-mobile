import { h } from 'vue'
import { optionValueText } from '../_components/field-presentation/option-labels'
import type { FieldPresentationAdapter } from '../_components/field-presentation/with-field-presentation'
import CascaderEditor from './CascaderEditor.vue'

export const cascaderFieldAdapter: FieldPresentationAdapter = {
  defaultPresentation: 'popup',
  text: (value, props) => optionValueText(value, { ...props, showPathLabel: true }),
  editor: ({ props, value, update, emit, slots, disabled, readonly }) =>
    h(
      CascaderEditor,
      {
        options: { ...props, disabled, readonly },
        modelValue: value,
        'onUpdate:modelValue': update,
        'onUpdate:inputValue': (query: string) => emit('update:inputValue', query),
        onSearch: (query: string) => emit('search', query),
        onInputValueChange: (query: string) => emit('input-value-change', query),
      },
      slots,
    ),
}
