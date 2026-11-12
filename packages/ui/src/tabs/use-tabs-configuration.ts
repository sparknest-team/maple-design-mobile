import { computed, type ComputedRef } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { miscText as t } from '../locale/misc-text'
import type { ComponentSize } from '../utils/constants'

// Maple has no global size/RTL provider. Explicit size/default setters and DOM dir remain supported.
export function useTabsConfiguration(size: ComputedRef<ComponentSize | undefined>) {
  return { size: computed(() => size.value ?? 'md') }
}

export function useTabsLocale() {
  const { t: localize } = injectLocaleProvider()
  const get = (key: 'tabs.close' | 'tabs.add' | 'tabs.previous' | 'tabs.next', fallback: string) =>
    localize?.(key) ?? t(key) ?? fallback
  return computed(() => ({
    close: get('tabs.close', 'Close'),
    add: get('tabs.add', 'Add tab'),
    previous: get('tabs.previous', 'Previous tabs'),
    next: get('tabs.next', 'Next tabs'),
  }))
}
