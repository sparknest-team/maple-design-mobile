import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Checkbox.vue'

export default withFieldPresentation(Base, { methods: ['toggle', 'focus', 'blur'] })
