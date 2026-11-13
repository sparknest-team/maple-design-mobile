import type { Ref } from 'vue'
import * as Vue from 'vue'
import { kebabCase } from '@maple-design/shared-vue'

/** Vue 3.5 supplies hydration-safe IDs. Earlier Vue versions defer IDs to mount. */
export function useId(): Ref<string | undefined> {
  const instance = Vue.getCurrentInstance()!
  const name = kebabCase(instance.type.name ?? 'component')
  const nativeId = (Vue as unknown as { useId?: () => string }).useId?.()
  const id = Vue.ref<string>()
  id.value = process.env.NODE_ENV === 'test' ? `${name}-mock-id` : nativeId ? `${name}-${nativeId}` : undefined
  Vue.onMounted(() => {
    if (id.value === undefined) {
      id.value = `${name}-${instance.uid}`
    }
  })
  return id
}
