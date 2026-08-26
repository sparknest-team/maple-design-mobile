import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as verificationCodeProps } from './props'
import VerificationCode from './VerificationCode.vue'

withInstall(VerificationCode)
withPropsDefaultsSetter(VerificationCode, verificationCodeProps)

export { verificationCodeProps }
export type {
  VerificationCodeAlign,
  VerificationCodeFormatter,
  VerificationCodeProps,
  VerificationCodeSeparator,
  VerificationCodeType,
} from './props'

export type VerificationCodeInstance = InstanceType<typeof VerificationCode>
export const _VerificationCodeComponent = VerificationCode

export default VerificationCode
