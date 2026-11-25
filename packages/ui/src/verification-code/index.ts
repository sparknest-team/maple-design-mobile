import { withInstall } from '../utils/components'
import VerificationCodeSource from './presentation'
import { verificationCodeProps } from './props'

const VerificationCode = withInstall(VerificationCodeSource)

export { VerificationCode, verificationCodeProps }
export type {
  VerificationCodeAlign,
  VerificationCodeVariant,
  VerificationCodeFormatter,
  VerificationCodeProps,
  VerificationCodeSeparator,
  VerificationCodeType,
} from './props'
export type { VerificationCodeEmits, VerificationCodeSlots, VerificationCodeExpose } from './types'

export type VerificationCodeInstance = InstanceType<typeof VerificationCode> & import('./types').VerificationCodeExpose
export const _VerificationCodeComponent: typeof VerificationCode = VerificationCode

export default VerificationCode
