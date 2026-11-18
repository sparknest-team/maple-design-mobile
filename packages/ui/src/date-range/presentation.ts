import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { dateFieldAdapter } from '../date/field-adapter'
import Base from './DateRange.vue'
import RangeContent from './presentation/RangeContent.vue'

const Presented: typeof Base = withFieldPresentation(Base, dateFieldAdapter(true, RangeContent))

export default Presented
