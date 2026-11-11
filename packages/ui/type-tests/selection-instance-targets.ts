import type { PeopleSelectExpose, PeopleSelectInstance, SelectExpose, SelectInstance } from '@maple-design/ui-vue'
import type { PeopleSelectExpose as SubExpose } from '@maple-design/ui-vue/people-select'

declare const select: SelectInstance
declare const people: PeopleSelectInstance
const selectApi: SelectExpose = select
const peopleApi: PeopleSelectExpose = people
const subApi: SubExpose = peopleApi
selectApi.focus()
selectApi.blur()
peopleApi.focus()
peopleApi.blur()
const selectRetry: Promise<void> = selectApi.refresh()
const peopleRetry: Promise<void> = subApi.refresh()
// @ts-expect-error focus takes no selected value
people.focus('a')
void [selectRetry, peopleRetry]
