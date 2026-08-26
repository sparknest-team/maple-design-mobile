import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import GridItem from './GridItem.vue'
import { gridItemProps } from './props'

withInstall(GridItem)
withPropsDefaultsSetter(GridItem, gridItemProps)

export { gridItemProps }

export type GridItemInstance = InstanceType<typeof GridItem>
export type { GridItemProps } from './props'

export const _GridItemComponent = GridItem

export default GridItem
