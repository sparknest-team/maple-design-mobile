import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { timeFieldAdapter } from '../time/field-adapter'
import Base from './Time.vue'

const Presented: typeof Base = withFieldPresentation(Base, timeFieldAdapter(false))

export default Presented
