import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import Empty from './Empty.vue'
import { props as emptyProps } from './props'

withInstall(Empty)
withPropsDefaultsSetter(Empty, emptyProps)

export { emptyProps }

export const _EmptyComponent = Empty

export default Empty
