import type { PropType } from 'vue'
import type { TimeDisabledRules } from './time-rules'

export const timeDisabledProps = {
  /** 禁用小时，返回 0–23 中的禁用值。 */
  disabledHours: Function as PropType<TimeDisabledRules['disabledHours']>,
  /** 根据当前 24 小时制小时，返回禁用分钟。 */
  disabledMinutes: Function as PropType<TimeDisabledRules['disabledMinutes']>,
  /** 根据当前小时和分钟，返回禁用秒。 */
  disabledSeconds: Function as PropType<TimeDisabledRules['disabledSeconds']>,
}
