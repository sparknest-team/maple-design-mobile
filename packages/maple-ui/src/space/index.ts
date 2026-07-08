import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { spaceProps } from './props'
import Space from './Space'

withInstall(Space)
withPropsDefaultsSetter(Space, spaceProps)

export type SpaceInstance = InstanceType<typeof Space>
export type {
  SpaceProps,
  SpaceAlign,
  SpaceDirection,
  SpaceJustify,
  SpaceInternalSize,
  SpaceSize,
} from './props'

export { spaceProps }

export const _SpaceComponent = Space

export default Space
