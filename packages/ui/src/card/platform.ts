import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultCloseText } from '../locale/zh-CN'
import type { CardSize } from './props'

export function useCardSize(size: () => CardSize | undefined) {
  return computed<CardSize>(() => size() ?? 'md')
}

export function useCardCloseLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() =>
    String(translate?.('common.close') ?? t('common.close') ?? (defaultLocaleReady.value ? 'Close' : defaultCloseText)),
  )
}
