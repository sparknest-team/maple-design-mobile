import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as swipeCellProps } from './props'
import SwipeCellSource from './SwipeCell.vue'

const SwipeCell = withInstall(SwipeCellSource)
withPropsDefaultsSetter(SwipeCell, swipeCellProps)

export { swipeCellProps }
export type { SwipeCellBeforeCloseArgs, SwipeCellPosition, SwipeCellSide } from './props'

export type SwipeCellInstance = InstanceType<typeof SwipeCell>
export const _SwipeCellComponent: typeof SwipeCell = SwipeCell

export default SwipeCell
export type SwipeCellProps = import('../_utils/public-props').CompatiblePublicProps<typeof import('./props').props>
