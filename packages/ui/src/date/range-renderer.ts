import { inject, provide, type Component, type InjectionKey } from 'vue'

export const rangeRendererKey: InjectionKey<Component> = Symbol('date-range-renderer')
export const provideRangeRenderer = (renderer: Component) => provide(rangeRendererKey, renderer)
export const useRangeRenderer = () => inject(rangeRendererKey, undefined)
