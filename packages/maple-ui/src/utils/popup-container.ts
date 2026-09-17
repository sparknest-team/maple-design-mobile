import { computed, onMounted, ref, type PropType } from 'vue'

export type PopupContainer = string | HTMLElement | false
export const popupContainerProp = {
  type: [String, Object, Boolean] as PropType<PopupContainer>,
  default: undefined,
  validator: (value: unknown) =>
    value === false ||
    typeof value === 'string' ||
    (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement),
}
export function resolvePopupContainer(value: PopupContainer | undefined): HTMLElement | string {
  if (value === false || value == null || typeof document === 'undefined') {
    return 'body'
  }
  if (typeof value !== 'string') {
    return value
  }
  try {
    const element = document.querySelector<HTMLElement>(value)
    if (element) {
      return element
    }
  } catch {
    /* Invalid selectors follow the same fallback as missing targets. */
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[PopupContainer] Target not found; falling back to body:', value)
  }
  return 'body'
}
export function usePopupContainer(source: () => PopupContainer | undefined) {
  const mounted = ref(false)
  onMounted(() => {
    mounted.value = true
  })
  return computed(() => {
    const value = source()
    // An HTMLElement is already a resolved target and is safe to use immediately.
    // String selectors still wait until mount so SSR and hydration use the same target.
    if (value && typeof value !== 'string') {
      return value
    }
    return mounted.value ? resolvePopupContainer(value) : 'body'
  })
}
