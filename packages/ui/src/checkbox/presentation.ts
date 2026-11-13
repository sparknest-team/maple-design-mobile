import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Checkbox.vue'

const Presented: typeof Base = withFieldPresentation(Base, { methods: ['toggle', 'focus', 'blur'] })

export default Presented
