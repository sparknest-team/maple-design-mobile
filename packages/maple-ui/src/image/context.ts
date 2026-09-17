import type { InjectionKey } from 'vue'
import type { PreviewGroupContext } from './api'

export type { PreviewGroupContext }

export const PreviewGroupInjectionKey: InjectionKey<PreviewGroupContext> = Symbol('PreviewGroupInjectionKey')
