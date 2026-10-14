import { computed, onMounted, ref, shallowRef, watch, type PropType } from 'vue'

export type PopupContainer = string | HTMLElement | false
function isPopupElement(value: unknown): value is HTMLElement {
  if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement) {
    return true
  }
  if (!value || typeof value !== 'object') {
    return false
  }
  // An iframe element belongs to another realm, so the caller's constructor
  // cannot validate it. Detached HTML documents still use the branch above.
  const view = (value as HTMLElement).ownerDocument?.defaultView as (Window & typeof globalThis) | null | undefined
  if (typeof view?.HTMLElement === 'function' && value instanceof view.HTMLElement) {
    return true
  }
  // Adoption changes ownerDocument but not the element's prototype realm.
  // A native Element method checks its DOM brand without mutating attributes.
  const ElementType = typeof Element !== 'undefined' ? Element : view?.Element
  if (!ElementType || (value as HTMLElement).namespaceURI !== 'http://www.w3.org/1999/xhtml') {
    return false
  }
  try {
    ElementType.prototype.hasAttribute.call(value, 'data-popup-container')
    return true
  } catch {
    return false
  }
}
export const popupContainerProp = {
  type: [String, Object, Boolean] as PropType<PopupContainer>,
  default: undefined,
  validator: (value: unknown) => value === false || typeof value === 'string' || isPopupElement(value),
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
  const target = shallowRef<HTMLElement | string>('body')
  watch(
    [source, mounted],
    ([value, isMounted]) => {
      // Keep Teleport's last enabled target while inline. Changing `to` while
      // disabled can leave its previous target cached when it is enabled again.
      if (value === false) {
        return
      }
      // An HTMLElement is already a resolved target and is safe to use immediately.
      // String selectors still wait until mount so SSR and hydration use the same target.
      target.value = value && typeof value !== 'string' ? value : isMounted ? resolvePopupContainer(value) : 'body'
    },
    { immediate: true, flush: 'sync' },
  )
  return computed(() => target.value)
}
