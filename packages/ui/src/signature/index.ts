import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as signatureProps } from './props'
import Signature from './Signature.vue'

withInstall(Signature)
withPropsDefaultsSetter(Signature, signatureProps)

export { signatureProps }

export type SignatureInstance = InstanceType<typeof Signature>
export const _SignatureComponent: typeof Signature = Signature

export default Signature
export type SignatureProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
