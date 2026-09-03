import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as colProps } from './col-props'
import Col from './Col.vue'
import Grid from './Grid.vue'
import GridItem from './GridItem.vue'
import { gridItemProps } from './item-props'
import { gridProps } from './props'
import { props as rowProps } from './row-props'
import Row from './Row.vue'

const GridFamily = withInstall(
  Grid,
  Object.assign(Grid, {
    Item: GridItem,
    Row,
    Col,
  }),
  { components: [Grid, GridItem, Row, Col] },
)

withPropsDefaultsSetter(GridFamily, gridProps)
withPropsDefaultsSetter(GridItem, gridItemProps)
withPropsDefaultsSetter(Row, rowProps)
withPropsDefaultsSetter(Col, colProps)

export { GridFamily as Grid, gridProps, gridItemProps, rowProps, colProps, GridItem, Row, Col }

export type GridInstance = InstanceType<typeof Grid>
export type GridItemInstance = InstanceType<typeof GridItem>
export type RowInstance = InstanceType<typeof Row>
export type ColInstance = InstanceType<typeof Col>
export type { GridProps } from './props'
export type { GridItemProps } from './item-props'
export type { ResponsiveValue, GridItemData } from './types'
export type { RowProps, RowJustify, RowAlign, RowGutter } from './row-props'
export type { ColProps, ColBreakpoint, ColSizeDescriptor, FlexType } from './col-props'

export const _GridComponent = GridFamily
export const _GridItemComponent = GridItem
export const _RowComponent = Row
export const _ColComponent = Col

export default GridFamily
