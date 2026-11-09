import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Switch.vue'

export default withFieldPresentation(Base, { changeArgs: (value, _props, event) => (event ? [value, event] : [value]) })
