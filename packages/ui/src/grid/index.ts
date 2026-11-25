import { withInstall } from '../utils/components'
import Component from './Grid.vue'
import ItemComponent from './GridItem.vue'
import { gridItemProps } from './item-props'
import { gridProps } from './props'

const GridItem: import('../utils/components').ComponentWithInstall<typeof ItemComponent> = withInstall(ItemComponent)
const Grid: import('../utils/components').ComponentWithInstall<typeof Component & { Item: typeof GridItem }> =
  withInstall(Component, Object.assign(Component, { Item: GridItem }), { components: [Component, GridItem] })
export { Grid, GridItem, gridProps, gridItemProps }
export type { GridProps, GridItemProps, ResponsiveValue, GridItemData } from './types'
export type GridInstance = InstanceType<typeof Grid>
export type GridItemInstance = InstanceType<typeof GridItem>
export const _GridComponent: typeof Grid = Grid
export const _GridItemComponent: typeof GridItem = GridItem
export default Grid
