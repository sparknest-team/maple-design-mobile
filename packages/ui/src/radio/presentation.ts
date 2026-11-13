import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './Radio.vue'

const Presented: typeof Base = withFieldPresentation(Base, { methods: ['select', 'focus', 'blur'] })

export default Presented
