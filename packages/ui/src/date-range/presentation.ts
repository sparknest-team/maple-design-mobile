import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { dateFieldAdapter } from '../date/field-adapter'
import Base from './DateRange.vue'

const Presented: typeof Base = withFieldPresentation(Base, dateFieldAdapter(true))

export default Presented
