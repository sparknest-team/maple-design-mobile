import type {
  PeopleSelectEmits,
  PeopleSelectReadScope,
  PeopleSelectSlots,
  PeopleSelectValue,
} from '@maple-design/ui-vue'
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

export const multipleChange: PeopleSelectEmits['change'] = [['alice', 'bob']]
export const multipleScope: PeopleSelectReadScope = {
  value: ['alice'],
  text: 'Alice',
  person: { value: 'alice', label: 'Alice' },
  people: [{ value: 'alice', label: 'Alice' }],
}

export const multipleValue: PeopleSelectValue = ['alice', 'bob']
export const subValue: import('@maple-design/ui-vue/people-select').PeopleSelectValue = multipleValue
// @ts-expect-error Personnel identities must be strings.
export const invalidMultiple: PeopleSelectEmits['change'] = [[123]]
