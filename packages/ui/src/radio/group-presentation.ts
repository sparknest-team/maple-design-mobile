import { optionValueText } from '../_components/field-presentation/option-labels'
import { withFieldPresentation } from '../_components/field-presentation/with-field-presentation'
import Base from './RadioGroup.vue'

const Presented: typeof Base = withFieldPresentation(Base, { text: optionValueText })

export default Presented
