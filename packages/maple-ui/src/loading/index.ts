import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { vLoading } from './directive'
import Loading from './Loading.vue'
import { loadingProps } from './props'

withInstall(Loading, undefined, {
  setup(app) {
    app.directive('mp-loading', vLoading)
  },
})
withPropsDefaultsSetter(Loading, loadingProps)

export { Loading, loadingProps, vLoading }
export type { LoadingDirectiveOptions } from './directive'

export type LoadingInstance = InstanceType<typeof Loading>
export const _LoadingComponent: typeof Loading = Loading

export default Loading
export type { LoadingProps, LoadingSize, LoadingType } from './props'
