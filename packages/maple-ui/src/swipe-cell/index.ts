import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as swipeCellProps } from './props'
import SwipeCell from './SwipeCell.vue'

withInstall(SwipeCell)
withPropsDefaultsSetter(SwipeCell, swipeCellProps)

export { swipeCellProps }
export type { SwipeCellBeforeCloseArgs, SwipeCellPosition, SwipeCellSide } from './props'

export type SwipeCellInstance = InstanceType<typeof SwipeCell>
export const _SwipeCellComponent = SwipeCell

export default SwipeCell
