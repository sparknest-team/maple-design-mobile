import { withInstall, withPropsDefaultsSetter } from '../utils/components'
import { resultProps } from './props'
import Result from './Result.vue'

withInstall(Result)
withPropsDefaultsSetter(Result, resultProps)

export { resultProps }
export type { ResultProps, ResultStatus } from './props'

export type ResultInstance = InstanceType<typeof Result>
export const _ResultComponent: typeof Result = Result

export default Result
