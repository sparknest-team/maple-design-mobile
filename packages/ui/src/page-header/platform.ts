import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultBackText } from '../locale/zh-CN'

export { IconChevronLeft as BackIcon } from '@maple-design/icons-vue'

export function usePageHeaderBackLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() =>
    String(translate?.('common.back') ?? t('common.back') ?? (defaultLocaleReady.value ? 'Back' : defaultBackText)),
  )
}
