import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { pullRefreshProps } from './props'
import PullRefreshSource from './PullRefresh.vue'

const PullRefresh = withInstall(PullRefreshSource)
withPropsDefaultsSetter(PullRefresh, pullRefreshProps)

export type PullRefreshInstance = InstanceType<typeof PullRefresh>
export type { PullRefreshProps, PullRefreshStatus } from './props'
export { pullRefreshProps }

export const _PullRefreshComponent: typeof PullRefresh = PullRefresh

export default PullRefresh
