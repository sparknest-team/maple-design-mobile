import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import type { CardSize } from './props'

export function useCardSize(size: () => CardSize | undefined) {
  return computed<CardSize>(() => size() ?? 'md')
}

export function useCardCloseLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() => String(translate?.('common.close') ?? t('common.close') ?? 'Close'))
}
