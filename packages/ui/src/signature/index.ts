import { withInstall } from '../utils/components'
import { props as signatureProps } from './props'
import SignatureSource from './Signature.vue'

const Signature = withInstall(SignatureSource)

export { signatureProps }

export type SignatureInstance = InstanceType<typeof Signature>
export const _SignatureComponent: typeof Signature = Signature

export default Signature
export type SignatureProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
