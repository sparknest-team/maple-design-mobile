import { onBeforeUnmount, onDeactivated, ref } from 'vue'

/** Keep the roving entry on the option that actually owns focus, not a hovered option. */
export function useCascaderMenuFocus(panelSelector: string) {
  const focusedKey = ref<string>()
  const ownKey = (target: EventTarget | null, root: EventTarget | null) => {
    const element = target as Element | null
    const option = element?.closest?.('[data-cascader-key]') as HTMLElement | null
    return option && option.closest(panelSelector) === root ? option.dataset.cascaderKey : undefined
  }
  const onFocusin = (event: FocusEvent) => {
    const key = ownKey(event.target, event.currentTarget)
    if (key !== undefined) {
      focusedKey.value = key
    }
  }
  const onFocusout = (event: FocusEvent) => {
    if (ownKey(event.target, event.currentTarget) !== undefined) {
      focusedKey.value = ownKey(event.relatedTarget, event.currentTarget)
    }
  }
  const clear = () => {
    focusedKey.value = undefined
  }
  onDeactivated(clear)
  onBeforeUnmount(clear)
  return { focusedKey, onFocusin, onFocusout }
}
