import { h } from 'vue'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import SelectionEditor from '../_components/selected-options/SelectionEditor.vue'
import Base from './people-select'
import { peopleText } from './selection'

export default withFieldPresentation(Base, {
  selectionConfirmation: 'update',
  methods: ['focus', 'blur'],
  defaultPresentation: 'popup',
  text: peopleText,
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
