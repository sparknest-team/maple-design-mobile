import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { GridItemData } from './types'

export interface GridRecord {
  id: symbol
  data: ComputedRef<GridItemData>
  element: Ref<HTMLElement | undefined>
}
export interface GridContext {
  cols: ComputedRef<number>
  colGap: ComputedRef<number>
  overflow: ComputedRef<boolean>
  visible: (id: symbol) => boolean
  register: (record: GridRecord) => void
  remove: (id: symbol) => void
  reorder: () => void
}
export const GRID_CONTEXT_KEY: InjectionKey<GridContext> = Symbol('GRID_CONTEXT_KEY')
