import Forbidden from './403'
import NotFound from './404'
import ServerError from './500'
import Danger from './Danger.vue'
import Empty from './Empty.vue'
import Info from './Info.vue'
import type { ResultStatus } from './props'
import Question from './Question.vue'
import Success from './Success.vue'
import Warning from './Warning.vue'

export const resultStatusComponents: Record<ResultStatus, object> = {
  info: Info,
  success: Success,
  warning: Warning,
  danger: Danger,
  question: Question,
  empty: Empty,
  '403': Forbidden,
  '404': NotFound,
  '500': ServerError,
}
