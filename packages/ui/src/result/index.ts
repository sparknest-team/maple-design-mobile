import { withInstall } from '../utils/components'
import { resultProps } from './props'
import ResultSource from './Result.vue'

const Result = withInstall(ResultSource)

export { resultProps }
export type { ResultProps, ResultStatus } from './props'

export type ResultInstance = InstanceType<typeof Result>
export const _ResultComponent: typeof Result = Result

export default Result
