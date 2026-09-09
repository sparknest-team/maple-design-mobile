import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Component from './Grid.vue'
import ItemComponent from './GridItem.vue'
import { gridItemProps } from './item-props'
import { gridProps } from './props'

const GridItem = withInstall(ItemComponent)
const Grid = withInstall(Component, Object.assign(Component, { Item: GridItem }), { components: [Component, GridItem] })
export { Grid, GridItem, gridProps, gridItemProps }
export type { GridProps, GridItemProps, ResponsiveValue, GridItemData } from './types'
export type GridInstance = InstanceType<typeof Grid>
export type GridItemInstance = InstanceType<typeof GridItem>
export const _GridComponent = Grid
export const _GridItemComponent = GridItem
export default Grid

withPropsDefaultsSetter(Grid, gridProps)
withPropsDefaultsSetter(GridItem, gridItemProps)
