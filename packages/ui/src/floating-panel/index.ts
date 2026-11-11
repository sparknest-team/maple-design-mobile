import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import FloatingPanel from './FloatingPanel.vue'
import { props as floatingPanelProps } from './props'

withInstall(FloatingPanel)
withPropsDefaultsSetter(FloatingPanel, floatingPanelProps)

export type FloatingPanelInstance = InstanceType<typeof FloatingPanel>
export { FloatingPanel, floatingPanelProps }
export const _FloatingPanelComponent: typeof FloatingPanel = FloatingPanel

export default FloatingPanel
export type FloatingPanelProps = InstanceType<typeof FloatingPanel>['$props']
