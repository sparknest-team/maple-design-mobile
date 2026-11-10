import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultLoadingText } from '../locale/zh-CN'

export function useLoadingPlatform() {
  const { t: translate } = injectLocaleProvider()
  const customLoading = computed(() => undefined)
  const loadingText = computed(() =>
    String(
      translate?.('loading.text') ?? t('loading.text') ?? (defaultLocaleReady.value ? 'Loading' : defaultLoadingText),
    ),
  )
  return { customLoading, loadingText }
}
