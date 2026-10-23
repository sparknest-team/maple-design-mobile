import { optionValueText } from '../_components/field-presentation/option-labels'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './RadioGroup.vue'

export default withFieldPresentation(Base, { text: optionValueText })
