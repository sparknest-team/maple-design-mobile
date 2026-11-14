import { withInstall } from '../utils/components'
import _TimelineItem from './Item.vue'
import { timelineProps } from './props'
import _Timeline from './timeline'

const Timeline: import('../utils/components').ComponentWithInstall<typeof _Timeline & { Item: typeof _TimelineItem }> =
  withInstall(
    _Timeline,
    Object.assign(_Timeline, {
      Item: _TimelineItem,
    }),
    { components: [_Timeline, _TimelineItem] },
  )

export type TimelineInstance = InstanceType<typeof _Timeline>
export type TimelineItemInstance = InstanceType<typeof _TimelineItem>

export { _TimelineItem as TimelineItem }

export const _TimelineComponent: typeof Timeline = Timeline
export const _TimelineItemComponent: typeof _TimelineItem = _TimelineItem

export { Timeline }

export { timelineProps }

export default Timeline
export type TimelineProps = import('../_utils/public-props').CompatiblePublicProps<
  typeof import('./props').timelineProps
>

export type {
  TimelineItemContentPlacement,
  ModeType as TimelineMode,
  LabelPositionType as TimelineLabelPosition,
  DotType as TimelineDotType,
  LineType as TimelineLineType,
} from './types'
export type TimelineItemProps = InstanceType<typeof _TimelineItem>['$props']
export interface TimelineSlots {
  default?: () => import('vue').VNodeChild
  dot?: () => import('vue').VNodeChild
  pending?: () => import('vue').VNodeChild
}
export interface TimelineItemSlots {
  default?: () => import('vue').VNodeChild
  dot?: () => import('vue').VNodeChild
  label?: () => import('vue').VNodeChild
}
