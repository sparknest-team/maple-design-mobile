import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export { IconChevronLeft as BackIcon } from '@maple-design/icons-vue'

export function usePageHeaderBackLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() => String(translate?.('common.back') ?? t('common.back') ?? 'Back'))
}
