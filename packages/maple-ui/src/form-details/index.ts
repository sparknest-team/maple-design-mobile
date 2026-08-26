import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FormDetails from './FormDetails.vue'
import { props as formDetailsProps } from './props'

withInstall(FormDetails)
withPropsDefaultsSetter(FormDetails, formDetailsProps)

export { formDetailsProps }

export type FormDetailsInstance = InstanceType<typeof FormDetails>
export const _FormDetailsComponent = FormDetails

export default FormDetails
