import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './rate-core'

const Presented: typeof Base = withFieldPresentation(Base, { methods: ['focus', 'blur'] })

export default Presented
