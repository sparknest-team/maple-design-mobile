import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { timeFieldAdapter } from '../time/field-adapter'
import Base from './TimeRange.vue'

export default withFieldPresentation(Base, timeFieldAdapter(true))
