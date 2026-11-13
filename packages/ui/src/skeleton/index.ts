import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { skeletonLineProps, skeletonProps, skeletonShapeProps } from './props'
import _Skeleton from './Skeleton.vue'
import SkeletonLine from './SkeletonLine.vue'
import SkeletonShape from './SkeletonShape.vue'

const Skeleton: typeof _Skeleton & { Line: typeof SkeletonLine; Shape: typeof SkeletonShape } = Object.assign(
  _Skeleton,
  { Line: SkeletonLine, Shape: SkeletonShape },
)
withInstall(Skeleton, undefined, { components: [Skeleton, SkeletonLine, SkeletonShape] })
withPropsDefaultsSetter(Skeleton, skeletonProps)

export { skeletonLineProps, skeletonProps, skeletonShapeProps }

export type SkeletonInstance = InstanceType<typeof _Skeleton>
export type SkeletonLineInstance = InstanceType<typeof SkeletonLine>
export type SkeletonShapeInstance = InstanceType<typeof SkeletonShape>
export type {
  SkeletonLineProps,
  SkeletonProps,
  SkeletonShapeProps,
  SkeletonShapeSize,
  SkeletonShapeType,
  SkeletonSize,
} from './props'
export { SkeletonLine, SkeletonShape }
export const _SkeletonComponent: typeof Skeleton = Skeleton
export const _SkeletonLineComponent: typeof SkeletonLine = SkeletonLine
export const _SkeletonShapeComponent: typeof SkeletonShape = SkeletonShape

export default Skeleton
