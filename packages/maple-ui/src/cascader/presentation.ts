import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Cascader.vue'
import { cascaderFieldAdapter } from './field-adapter'

export default withFieldPresentation(Base, cascaderFieldAdapter)
