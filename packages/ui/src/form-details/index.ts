import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FormDetailsSource from './FormDetails.vue'
import { props as formDetailsProps } from './props'

const FormDetails = withInstall(FormDetailsSource)
withPropsDefaultsSetter(FormDetails, formDetailsProps)

export { formDetailsProps }

export type FormDetailsInstance = InstanceType<typeof FormDetails>
export const _FormDetailsComponent: typeof FormDetails = FormDetails

export default FormDetails
export type FormDetailsProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
