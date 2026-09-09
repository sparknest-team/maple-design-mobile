import { ref } from 'vue'

/** A composition commits once even when a browser follows compositionend with input. */
export function useInputComposition() {
  const isComposing = ref(false)
  let committed: string | undefined
  function start() {
    isComposing.value = true
    committed = undefined
  }
  function end(event: Event) {
    if (!isComposing.value) {
      return false
    }
    isComposing.value = false
    committed = (event.target as HTMLInputElement).value
    Promise.resolve().then(() => {
      committed = undefined
    })
    return true
  }
  function accepts(event: Event) {
    if (isComposing.value || (event as InputEvent).isComposing) {
      return false
    }
    const value = (event.target as HTMLInputElement).value
    if (committed !== undefined && value === committed) {
      committed = undefined
      return false
    }
    return true
  }
  return { isComposing, start, end, accepts }
}
