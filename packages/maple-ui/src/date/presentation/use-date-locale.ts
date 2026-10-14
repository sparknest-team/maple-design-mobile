import { computed } from 'vue'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'

export function useDateLocale() {
  const { t: provided } = injectLocaleProvider()
  return computed(() => String((provided ?? t)('lang') ?? 'zh-CN'))
}
