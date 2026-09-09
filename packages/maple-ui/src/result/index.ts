import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { props as resultProps } from './props'
import Result from './Result.vue'

withInstall(Result)
withPropsDefaultsSetter(Result, resultProps)

export { resultProps }
export type { ResultStatus } from './props'

export type ResultInstance = InstanceType<typeof Result>
export const _ResultComponent: typeof Result = Result

export default Result
export type ResultProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
