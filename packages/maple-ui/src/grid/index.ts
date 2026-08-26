import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Grid from './Grid.vue'
import { gridProps } from './props'

withInstall(Grid)
withPropsDefaultsSetter(Grid, gridProps)

export { gridProps }

export type GridInstance = InstanceType<typeof Grid>
export type { GridProps } from './props'
export type { ResponsiveValue, GridItemData } from './types'

export const _GridComponent = Grid

export default Grid
