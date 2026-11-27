import { computed, type VNode } from 'vue'
import { IconEmpty as DefaultEmptyIcon } from '@maple-design/icons-vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultEmptyDescription } from '../locale/zh-CN'

export { DefaultEmptyIcon }

export function useDefaultDescription() {
  const { t: pt } = injectLocaleProvider()
  return computed(() => {
    if (pt) {
      return pt('emptyDescription')
    }
    const description = t('emptyDescription')
    return defaultLocaleReady.value ? description : (description ?? defaultEmptyDescription)
  })
}

// Maple renders its local empty state; global empty slots belong to Cedar's ConfigProvider.
export const ConfigEmptyNodes = undefined
export function useConfigEmpty(_props: { imageUrl?: string; description?: string }): VNode[] | null {
  return null
}
