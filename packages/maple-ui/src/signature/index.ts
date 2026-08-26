import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as signatureProps } from './props'
import Signature from './Signature.vue'

withInstall(Signature)
withPropsDefaultsSetter(Signature, signatureProps)

export { signatureProps }

export type SignatureInstance = InstanceType<typeof Signature>
export const _SignatureComponent = Signature

export default Signature
