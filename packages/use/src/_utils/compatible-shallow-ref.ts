import type { Ref, shallowRef } from 'vue'

// Preserve Vue's optional shallow marker when present, while supporting older Vue exports.
type ShallowMarker = Pick<ReturnType<typeof shallowRef>, Exclude<keyof ReturnType<typeof shallowRef>, keyof Ref<any>>>
export type CompatibleShallowRef<T> = Ref<T> & ShallowMarker
