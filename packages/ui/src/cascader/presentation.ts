import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Cascader.vue'
import { cascaderFieldAdapter } from './field-adapter'

const Presented: typeof Base = withFieldPresentation(Base, cascaderFieldAdapter)

export default Presented
