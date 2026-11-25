import { withInstall } from '../utils/components'
import { vLoading } from './directive'
import LoadingSource from './Loading.vue'
import { loadingProps } from './props'

const Loading = withInstall(LoadingSource, undefined, {
  setup(app) {
    app.directive('mp-loading', vLoading)
  },
})

export { Loading, loadingProps, vLoading }
export type { LoadingDirectiveOptions } from './directive'

export type LoadingInstance = InstanceType<typeof Loading>
export const _LoadingComponent: typeof Loading = Loading

export default Loading
export type { LoadingProps, LoadingSize, LoadingType } from './props'
