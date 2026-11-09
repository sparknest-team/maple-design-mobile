import { ref } from 'vue'

/** A composition commits once even when a browser follows compositionend with input. */
export function useInputComposition() {
  const isComposing = ref(false)
  let committed: string | undefined
  let revision = 0
  function start() {
    revision++
    isComposing.value = true
    committed = undefined
  }
  function end(event: Event) {
    if (!isComposing.value) {
      return false
    }
    revision++
    isComposing.value = false
    committed = (event.target as HTMLInputElement).value
    return true
  }
  function accepts(event: Event) {
    if (isComposing.value || (event as InputEvent).isComposing) {
      return false
    }
    const value = (event.target as HTMLInputElement).value
    if (committed !== undefined && value === committed) {
      return false
    }
    committed = undefined
    revision++
    return true
  }
  function cancel() {
    revision++
    isComposing.value = false
    committed = undefined
  }
  function capture() {
    const version = revision
    return () => version === revision && !isComposing.value
  }
  return { isComposing, start, end, accepts, cancel, capture }
}
