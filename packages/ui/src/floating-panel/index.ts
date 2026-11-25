import { withInstall } from '../utils/components'
import FloatingPanelSource from './FloatingPanel.vue'
import { props as floatingPanelProps } from './props'

const FloatingPanel = withInstall(FloatingPanelSource)

export type FloatingPanelInstance = InstanceType<typeof FloatingPanel>
export { FloatingPanel, floatingPanelProps }
export const _FloatingPanelComponent: typeof FloatingPanel = FloatingPanel

export default FloatingPanel
export type FloatingPanelProps = InstanceType<typeof FloatingPanel>['$props']
