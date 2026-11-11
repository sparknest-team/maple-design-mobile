import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './VerificationCode.vue'

export default withFieldPresentation(Base, {
  commitEvents: { finish: ([completed], accepted) => completed === accepted },
  methods: ['focus', 'blur', 'reset'],
  openMethods: ['reset'],
  intent: 'input',
})
