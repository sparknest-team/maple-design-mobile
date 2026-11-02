import { h } from 'vue'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import Base from './people-select'

export default withFieldPresentation(Base, {
  defaultPresentation: 'popup',
  text: (value, props) =>
    props.options?.find((option: { value: string; label: string }) => option.value === value)?.label ||
    props.label ||
    value ||
    props.defaultText ||
    '',
  editor: ({ props, attrs, value, update, emit, slots, disabled, readonly }) =>
    h(SelectionEditor, { kind: 'people-select' }, () =>
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
          onClear: () => emit('clear'),
          onSearch: (query: string) => emit('search', query),
        },
        slots,
      ),
    ),
})
