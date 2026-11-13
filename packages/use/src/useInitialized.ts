import { ref, watch, type Ref, type WatchSource } from 'vue'

export function useInitialized<T>(source: WatchSource<T>, value: T): Ref<boolean> {
  const initialized = ref(false)

  watch(
    source,
    (newValue) => {
      if (value === newValue) {
        initialized.value = true
      }
    },
    { immediate: true },
  )

  return initialized
}
