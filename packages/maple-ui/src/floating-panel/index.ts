import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FloatingPanel from './FloatingPanel.vue'
import { props as floatingPanelProps } from './props'

withInstall(FloatingPanel)
withPropsDefaultsSetter(FloatingPanel, floatingPanelProps)

export type FloatingPanelInstance = InstanceType<typeof FloatingPanel>
export { floatingPanelProps }
export const _FloatingPanelComponent = FloatingPanel

export default FloatingPanel
