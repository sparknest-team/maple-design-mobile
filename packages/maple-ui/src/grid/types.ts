export type { ResponsiveValue } from '../utils/responsive-observe'

export interface GridItemProps {
  span?: number | ResponsiveValue
  offset?: number | ResponsiveValue
  suffix?: boolean
}

export interface GridItemData extends GridItemProps {
  span: number
  offset: number
}
