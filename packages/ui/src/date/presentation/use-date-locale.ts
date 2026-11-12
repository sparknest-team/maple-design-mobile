import { computed } from 'vue'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { dateText as t } from '../../locale/date-text'

export function useDateLocale() {
  const { t: provided } = injectLocaleProvider()
  return computed(() => String((provided ?? t)('lang') ?? 'zh-CN'))
}
