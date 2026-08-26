import { computed, onMounted, onUpdated, ref, watch, type Ref } from 'vue'

export function useIndex({
  itemRef,
  selector,
  index,
  parentClassName,
}: {
  itemRef: Ref<HTMLElement | undefined>
  selector: string
  index?: Ref<number | undefined>
  parentClassName?: string
}) {
  const _index = ref(-1)
  const computedIndex = computed(() => index?.value ?? _index.value)

  const parent = ref<HTMLElement>()

  const getParent = () => {
    let parentEl = itemRef.value?.parentElement ?? undefined
    if (parentClassName) {
      while (parentEl && !parentEl.className.includes(parentClassName)) {
        parentEl = parentEl.parentElement ?? undefined
      }
    }
    return parentEl
  }

  const getIndex = () => {
    if (index?.value === undefined && parent.value && itemRef.value) {
      const nextIndex = Array.from(parent.value.querySelectorAll(selector)).indexOf(itemRef.value)
      if (nextIndex !== _index.value) {
        _index.value = nextIndex
      }
    }
  }

  watch(itemRef, () => {
    if (itemRef.value && !parent.value) {
      parent.value = getParent()
    }
  })

  onMounted(() => {
    if (itemRef.value) {
      parent.value = getParent()
    }
    getIndex()
  })
  onUpdated(() => getIndex())

  return {
    computedIndex,
  }
}
