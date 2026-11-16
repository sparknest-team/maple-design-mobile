import { computed, useAttrs, type InputHTMLAttributes } from 'vue'
import { splitInputAttrs } from '../input/native-attrs'
import { useId } from '../utils/vue-compat'

/** Native input owns field attributes; the label keeps layout and other DOM attrs. */
export function useChoiceNativeAttrs(alias: () => InputHTMLAttributes | undefined = () => undefined) {
  const attrs = useAttrs()
  const generatedId = useId()
  const split = computed(() => splitInputAttrs(attrs, ['onKeydown']))
  const nativeAttrs = computed(() => {
    const native = { ...split.value.native, ...alias() }
    return { ...native, id: String(native.id ?? generatedId) } as InputHTMLAttributes & Record<string, unknown>
  })
  const rootAttrs = computed(() => split.value.root)
  return { nativeAttrs, rootAttrs }
}
