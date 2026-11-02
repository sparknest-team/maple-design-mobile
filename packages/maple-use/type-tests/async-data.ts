import { useAsyncData, type AsyncDataLoader, type AsyncDataResult, type AsyncDataReturn } from '@maple-design/use'

const load = async () => [{ value: 'id', label: 'Name' }]
const state = useAsyncData(load, { initialData: [], immediate: false, debounce: 250, cacheTime: 1000 })
const portable: AsyncDataReturn<{ value: string; label: string }[]> = state
const abortable: AsyncDataLoader<number[]> = async ({ signal }) => (signal.aborted ? [] : [1])
void state.execute({
  loader: async ({ signal }) => (signal.aborted ? [] : [{ value: 'new', label: 'New' }]),
  cacheKey: 'team:query',
})
// @ts-expect-error The loader result retains its data shape.
void state.execute({ loader: async () => ['invalid'] })
// @ts-expect-error Public loading is readonly.
state.loading.value = true
// @ts-expect-error Public error is readonly.
state.error.value = new Error('invalid write')
// @ts-expect-error Capture business query arguments in a closure; the only loader context is AbortSignal.
const bad: AsyncDataLoader<number[]> = async (query: string) => [query.length]
const result: AsyncDataResult<number[]> = { status: 'success', data: [1] }
void [portable, abortable, bad, result]
