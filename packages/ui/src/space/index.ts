import { withInstall } from '../utils/components'
import { spaceProps } from './props'
import SpaceSource from './Space'

const Space = withInstall(SpaceSource)

export type SpaceInstance = InstanceType<typeof Space>
export type { SpaceProps, SpaceAlign, SpaceDirection, SpaceJustify, SpaceInternalSize, SpaceSize } from './props'

export { Space, spaceProps }

export const _SpaceComponent: typeof Space = Space

export default Space
