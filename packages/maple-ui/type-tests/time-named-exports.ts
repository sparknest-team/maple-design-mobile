import { TimeRange as RootRange, Time as RootTime } from '@maple-design/ui'
import DefaultTime, { Time } from '@maple-design/ui/time'
import DefaultRange, { TimeRange } from '@maple-design/ui/time-range'

export const same: typeof DefaultTime = Time
export const sameRange: typeof DefaultRange = TimeRange
export const root: typeof RootTime = Time
export const rootRange: typeof RootRange = TimeRange
