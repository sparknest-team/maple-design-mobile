import { optionValueText } from '../_components/field-presentation/option-labels'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './CheckboxGroup.vue'

export default withFieldPresentation(Base, {
  text: optionValueText,
  methods: ['checkAll', 'inverseAll'],
  inactiveMethod: (_name, value) => (Array.isArray(value) ? [...value] : []),
})
