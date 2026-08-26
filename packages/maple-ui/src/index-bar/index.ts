import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import IndexBar from './IndexBar.vue'
import { props as indexBarProps } from './props'

withInstall(IndexBar)
withPropsDefaultsSetter(IndexBar, indexBarProps)

export { indexBarProps }

export type IndexBarInstance = InstanceType<typeof IndexBar>
export const _IndexBarComponent = IndexBar

export default IndexBar
