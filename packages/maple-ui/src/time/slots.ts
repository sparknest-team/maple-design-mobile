import type { VNodeChild } from 'vue'
import type { TimeSlots as FieldSlots, TimeActionsScope } from './public-types'

/** The mobile field forwards panel actions/extra in deferred editing, not direct mode. */
export interface TimeSlots extends Omit<FieldSlots, 'actions'> {
  actions?: (scope: TimeActionsScope & { selectNow: () => boolean; nowDisabled: boolean }) => VNodeChild
}
