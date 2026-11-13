import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './InputNumber.vue'

const Presented: typeof Base = withFieldPresentation(Base, {
  inheritInputGroup: true,
  methods: ['focus', 'blur', 'select'],
  openMethods: ['select'],
  intent: 'input',
  changeArgs: (value, _props, event) => (event ? [value, event] : [value]),
})

export default Presented
