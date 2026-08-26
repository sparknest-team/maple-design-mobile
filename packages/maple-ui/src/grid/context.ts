import type { InjectionKey } from 'vue'
import type { GridItemData } from './types'

export type GridContext = Readonly<{
  overflow: boolean
  displayIndexList: number[]
  cols: number
  colGap: number
}>

export const GRID_CONTEXT_KEY: InjectionKey<GridContext> = Symbol('GRID_CONTEXT_KEY')

export type GridDataCollector = Readonly<{
  collectItemData: (index: number, itemData: GridItemData) => void
  removeItemData: (index: number) => void
}>

export const GRID_DATA_COLLECTOR_KEY: InjectionKey<GridDataCollector> = Symbol('GRID_DATA_COLLECTOR_KEY')
