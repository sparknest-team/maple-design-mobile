import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultCloseText } from '../locale/zh-CN'
import type { TagProps } from './props'

export { IconClose, IconLoading } from '@maple-design/icons-vue'
export function useTagPlatform(props: Readonly<TagProps>) {
  return { mergedSize: computed(() => props.size ?? 'md') }
}

export function useTagCloseLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() =>
    String(translate?.('common.close') ?? t('common.close') ?? (defaultLocaleReady.value ? 'Close' : defaultCloseText)),
  )
}
