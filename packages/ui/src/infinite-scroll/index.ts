import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import InfiniteScroll from './InfiniteScroll.vue'
import { infiniteScrollProps } from './props'

withInstall(InfiniteScroll)
withPropsDefaultsSetter(InfiniteScroll, infiniteScrollProps)

export { infiniteScrollProps }
export type { InfiniteScrollProps, InfiniteScrollStatus } from './props'

export type InfiniteScrollInstance = InstanceType<typeof InfiniteScroll>
export interface InfiniteScrollMethods {
  check: () => void
  retry: () => void
}
export const _InfiniteScrollComponent: typeof InfiniteScroll = InfiniteScroll

export default InfiniteScroll
