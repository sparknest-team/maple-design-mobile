import type { getTimeEventDates } from './time-events'
import type { TimeValue } from './time-value'
import type { TimePanelOutput, TimePanelValue } from './use-time-panel'

/** Pure panels notify selection/commit only; opening belongs to the field. */
function createTimePanelEmits<T extends TimePanelValue>() {
  return {
    'draft-initialize': (_value: TimePanelOutput<T>) => true,
    select: (_value: TimePanelOutput<T>, _dates: ReturnType<typeof getTimeEventDates>) => true,
    change: (_value: TimePanelOutput<T>, _dates: ReturnType<typeof getTimeEventDates>) => true,
    confirm: (_value: TimePanelOutput<T>, _dates: ReturnType<typeof getTimeEventDates>) => true,
    'update:modelValue': (_value: TimePanelOutput<T>) => true,
  }
}

export const timePanelEmits = createTimePanelEmits<TimePanelValue>()
export const timeSinglePanelEmits = createTimePanelEmits<TimeValue>()
export const timeRangePanelEmits = createTimePanelEmits<TimeValue[]>()

/** Business notifications only; draft-initialize belongs to the mobile owner bridge. */
export type TimePanelPublicEmits<T extends TimePanelValue = TimePanelValue> = {
  [Event in Exclude<keyof ReturnType<typeof createTimePanelEmits<T>>, 'draft-initialize'>]: Parameters<
    ReturnType<typeof createTimePanelEmits<T>>[Event]
  >
}
