import type { InjectionKey } from 'vue'

/** Floating and standalone panels keep date and time controls visible together. */
export const simultaneousDateLayout: InjectionKey<boolean> = Symbol('simultaneous-date-layout')
