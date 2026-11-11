import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FormDetails from './FormDetails.vue'
import { props as formDetailsProps } from './props'

withInstall(FormDetails)
withPropsDefaultsSetter(FormDetails, formDetailsProps)

export { formDetailsProps }

export type FormDetailsInstance = InstanceType<typeof FormDetails>
export const _FormDetailsComponent: typeof FormDetails = FormDetails

export default FormDetails
export type FormDetailsProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
