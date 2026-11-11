import type { PropType } from 'vue'

export type CalendarInteractiveMode = 'page' | 'scroll' | 'line'
export const calendarViewportProps = {
  interactiveMode: { type: String as PropType<CalendarInteractiveMode>, default: 'page' },
  useVirtualScroll: { type: Boolean, default: true },
}
