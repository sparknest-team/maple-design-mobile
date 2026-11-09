import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import type { TagProps } from './props'

export { IconClose, IconLoading } from '@maple-design/icons-vue'
export function useTagPlatform(props: Readonly<TagProps>) {
  return { mergedSize: computed(() => props.size ?? 'md') }
}

export function useTagCloseLabel() {
  const { t: translate } = injectLocaleProvider()
  return computed(() => String(translate?.('common.close') ?? t('common.close') ?? 'Close'))
}
