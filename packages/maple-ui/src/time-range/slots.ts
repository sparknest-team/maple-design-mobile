import type { VNodeChild } from 'vue'
import type { TimeRangeSlots as FieldSlots, TimeRangeActionsScope } from '../time/public-types'

/** The mobile field forwards panel actions/extra in deferred editing, not direct mode. */
export interface TimeRangeSlots extends Omit<FieldSlots, 'actions'> {
  actions?: (scope: TimeRangeActionsScope & { selectNow: () => boolean; nowDisabled: boolean }) => VNodeChild
}
