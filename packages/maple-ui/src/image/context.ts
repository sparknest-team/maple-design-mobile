// @sync-with: cedar-ui/src/image/context.ts

import type { InjectionKey } from 'vue'
import type { PreviewGroupContext } from './api'

export const PreviewGroupInjectionKey: InjectionKey<PreviewGroupContext> = Symbol('PreviewGroupInjectionKey')
