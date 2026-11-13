import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Switch.vue'

const Presented: typeof Base = withFieldPresentation(Base, {
  changeArgs: (value, _props, event) => (event ? [value, event] : [value]),
})

export default Presented
