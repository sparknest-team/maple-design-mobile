export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type ResponsiveValue = Partial<Record<Breakpoint, number>>
export interface GridItemData {
  span: number
  offset: number
  suffix?: boolean
}
export type { GridProps } from './props'
export type { GridItemProps } from './item-props'
