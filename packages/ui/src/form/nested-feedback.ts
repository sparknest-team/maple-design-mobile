import type { InjectionKey } from 'vue'

export type NestedFeedback = Map<symbol, string>
export const nestedFeedbackKey: InjectionKey<NestedFeedback> = Symbol('form-item-nested-feedback')
