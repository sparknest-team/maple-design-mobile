import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export function useLoadingPlatform() {
  const { t: translate } = injectLocaleProvider()
  const customLoading = computed(() => undefined)
  const loadingText = computed(() => String(translate?.('loading.text') ?? t('loading.text') ?? 'Loading'))
  return { customLoading, loadingText }
}
