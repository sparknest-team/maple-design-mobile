import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Alert from './Alert.vue'
import { alertProps } from './props'

withInstall(Alert)
withPropsDefaultsSetter(Alert, alertProps)

export type AlertInstance = InstanceType<typeof Alert>
export type { AlertProps, AlertType, AlertVariant } from './props'

export { alertProps }

export const _AlertComponent = Alert

export default Alert
