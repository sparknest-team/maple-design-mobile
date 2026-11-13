import type { reactive } from 'vue'

/** Reactive object shape without relying on newer root type exports. */
export type CompatibleReactive<T extends object> = ReturnType<typeof reactive<T>>
