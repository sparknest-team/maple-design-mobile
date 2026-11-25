import { withInstall } from '../utils/components'
import InfiniteScrollSource from './InfiniteScroll.vue'
import { infiniteScrollProps } from './props'

const InfiniteScroll = withInstall(InfiniteScrollSource)

export { infiniteScrollProps }
export type { InfiniteScrollProps, InfiniteScrollStatus } from './props'

export type InfiniteScrollInstance = InstanceType<typeof InfiniteScroll>
export interface InfiniteScrollMethods {
  check: () => void
  retry: () => void
}
export const _InfiniteScrollComponent: typeof InfiniteScroll = InfiniteScroll

export default InfiniteScroll
