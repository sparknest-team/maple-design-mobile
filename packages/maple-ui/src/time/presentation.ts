import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import { timeFieldAdapter } from '../time/field-adapter'
import Base from './Time.vue'

export default withFieldPresentation(Base, timeFieldAdapter(false))
