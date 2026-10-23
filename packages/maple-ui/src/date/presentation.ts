import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { dateFieldAdapter } from '../date/field-adapter'
import Base from './Date.vue'

export default withFieldPresentation(Base, dateFieldAdapter(false))
