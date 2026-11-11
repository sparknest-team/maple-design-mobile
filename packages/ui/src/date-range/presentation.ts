import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { dateFieldAdapter } from '../date/field-adapter'
import Base from './DateRange.vue'

export default withFieldPresentation(Base, dateFieldAdapter(true))
