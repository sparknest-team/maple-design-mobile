import type { ComputedRef, InjectionKey } from 'vue'

export interface RowContext {
  gutter: ComputedRef<[number, number]>
  div: ComputedRef<boolean>
}
export const ROW_CONTEXT_KEY: InjectionKey<RowContext> = Symbol('ROW_CONTEXT_KEY')
