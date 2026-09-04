import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { vLoading } from './directive'
import Loading from './Loading.vue'
import { props as loadingProps } from './props'

withInstall(Loading, undefined, {
  setup(app) {
    app.directive('mp-loading', vLoading)
  },
})
withPropsDefaultsSetter(Loading, loadingProps)

export { loadingProps, vLoading }
export type { LoadingDirectiveOptions } from './directive'

export type LoadingInstance = InstanceType<typeof Loading>
export const _LoadingComponent = Loading

export default Loading
