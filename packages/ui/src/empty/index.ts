import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import EmptySource from './Empty.vue'
import { emptyProps } from './props'

const Empty = withInstall(EmptySource)
withPropsDefaultsSetter(Empty, emptyProps)

export { emptyProps }

export type EmptyInstance = InstanceType<typeof Empty>
export type { EmptyImageSize, EmptyProps } from './props'
export const _EmptyComponent: typeof Empty = Empty

export default Empty
