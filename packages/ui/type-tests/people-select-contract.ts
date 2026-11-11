import type { PeopleSelectEmits, PeopleSelectReadScope, PeopleSelectSlots } from '@maple-design/ui-vue'
import type { PeopleSelectReadScope as SubScope } from '@maple-design/ui-vue/people-select'

export const scope: PeopleSelectReadScope = { value: null, text: 'Empty', person: { value: '', label: 'Empty' } }
export const sub: SubScope = scope
export const slots: PeopleSelectSlots = {
  read: ({ text, person, value }) => text + person.label + String(value),
  'arrow-icon': ({ focus, menuOpen }) => String(focus || menuOpen),
  'clear-icon': ({ clear }) => {
    clear()
    return null
  },
}
export const changed: PeopleSelectEmits['change'] = [null]
export const failed: PeopleSelectEmits['load-error'] = [new Error('offline'), 'options']
// @ts-expect-error An unknown failure source is not part of the public event.
export const invalid: PeopleSelectEmits['load-error'] = [null, 'arbitrary']
