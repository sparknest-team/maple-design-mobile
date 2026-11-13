import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { timeFieldAdapter } from '../time/field-adapter'
import Base from './TimeRange.vue'

const Presented: typeof Base = withFieldPresentation(Base, timeFieldAdapter(true))

export default Presented
