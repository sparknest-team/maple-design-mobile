import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './rate-core'

export default withFieldPresentation(Base, { methods: ['focus', 'blur'] })
