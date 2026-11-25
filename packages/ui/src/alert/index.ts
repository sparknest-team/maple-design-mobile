import { withInstall } from '../utils/components'
import AlertSource from './Alert.vue'
import { alertProps } from './props'

const Alert = withInstall(AlertSource)

export type AlertInstance = InstanceType<typeof Alert>
export type { AlertProps, AlertStatus, AlertVariant } from './props'

export { alertProps }

export const _AlertComponent: typeof Alert = Alert

export default Alert
