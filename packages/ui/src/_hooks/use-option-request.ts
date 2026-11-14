import { computed, inject, onMounted, provide, ref, watch, type ComputedRef, type InjectionKey, type Ref } from 'vue'
import { useAsyncData, type AsyncDataContext } from '@maple-design/use-vue'

export type OptionsLoader<T> = (query: string, context: AsyncDataContext) => readonly T[] | Promise<readonly T[]>
export interface OptionRequestState<T> {
  options: ComputedRef<T[]>
  loading: Readonly<Ref<boolean>>
  failed: Readonly<Ref<boolean>>
  remote: ComputedRef<boolean>
  query: Readonly<Ref<string>>
  search: (query?: string) => Promise<void>
  cancel: (clear?: boolean) => void
  refresh: () => Promise<void>
}
const optionRequestOwnerKey: InjectionKey<{ definition: unknown; state: OptionRequestState<unknown> }> =
  Symbol('option-request-owner')
/** Private field ownership; schemas prevent a nested unrelated control from borrowing this source. */
export function provideOptionRequest<T>(definition: unknown, state: OptionRequestState<T>) {
  provide(optionRequestOwnerKey, { definition, state })
}
/** Component-owned async arrays. Explicit arrays always take priority. */
export function useOptionRequest<T>(
  supplied: () => readonly T[] | OptionsLoader<T> | undefined,
  blocked: () => boolean,
  onError: (error: unknown) => void,
  delay: () => number = () => 0,
  definition?: unknown,
  ownsSource = false,
  minSearchLength: () => number = () => 0,
): OptionRequestState<T> {
  const owner = ownsSource ? undefined : inject(optionRequestOwnerKey, undefined)
  if (definition && owner?.definition === definition) {
    return owner.state as OptionRequestState<T>
  }
  const mounted = ref(false)
  const remote = computed(() => typeof supplied() === 'function')
  const state = useAsyncData<readonly T[]>(() => [], {
    initialData: [],
    immediate: false,
    get debounce() {
      return delay()
    },
  })
  const query = ref('')
  const failed = ref(false)
  async function search(next = query.value) {
    query.value = next
    failed.value = false
    if (next.length < minSearchLength()) {
      state.cancel()
      state.data.value = []
      return
    }
    const loader = supplied()
    if (typeof loader !== 'function') {
      return
    }
    if (!mounted.value || !remote.value || blocked() || !loader) {
      return
    }
    state.data.value = []
    const result = await state.execute({
      loader: async (context) => {
        const options = await loader(next, context)
        if (!Array.isArray(options)) {
          throw new TypeError('Candidate loader must return an array')
        }
        return options
      },
    })
    if (result.status === 'error') {
      failed.value = true
      onError(result.error)
    }
  }
  watch([supplied, blocked], () => {
    state.cancel()
    if (!remote.value) {
      state.data.value = []
    }
    if (mounted.value) {
      void search()
    }
  })
  onMounted(() => {
    mounted.value = true
    void search()
  })
  return {
    options: computed<T[]>(() => {
      const value = supplied()
      return [...(Array.isArray(value) ? value : state.data.value)] as T[]
    }),
    loading: state.loading,
    failed,
    remote,
    query,
    search,
    cancel: (clear = true) => {
      state.cancel()
      failed.value = false
      if (clear) {
        state.data.value = []
      }
    },
    refresh: () => search(),
  }
}
