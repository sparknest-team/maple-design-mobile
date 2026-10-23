import { shallowRef, watch } from 'vue'
import type { Theme } from './index'

// The mounted app owns its theme; demos must not reapply another storage scope.
export const currentTheme = shallowRef<Theme>()

export function observeTheme(callback: (theme: Theme) => void) {
  return watch(currentTheme, (theme) => theme && callback(theme), { immediate: true, flush: 'sync' })
}
