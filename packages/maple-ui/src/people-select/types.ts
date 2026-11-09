import type { AsyncDataContext } from '@maple-design/use'

/** Application-mapped data; no transport or personnel SDK is imported by the UI. */
export interface PeopleSelectOption {
  value: string
  label: string
  avatar?: string
  mobile?: string
  disabled?: boolean
}
export type PeopleSelectOptionsLoader = (
  query: string,
  context: AsyncDataContext,
) => readonly PeopleSelectOption[] | Promise<readonly PeopleSelectOption[]>
export type PeopleSelectFallbackOption = boolean | ((value: string) => PeopleSelectOption)
export interface PeopleSelectActionScope {
  person: PeopleSelectOption
  disabled: boolean
}
/** Generic application-rendered read actions; the UI does not know any business action. */
export type PeopleSelectRenderActions = (scope: PeopleSelectActionScope) => import('vue').VNodeChild

export type PeopleSelectAction = (person: PeopleSelectOption) => void | Promise<unknown>

export interface PeopleSelectExpose {
  refresh(): Promise<void>
  focus(): void
  blur(): void
}

/** Shared read scope across component reading and field reading presentations. */
export interface PeopleSelectReadScope {
  value: string | null
  text: string
  person: PeopleSelectOption
}
export type PeopleSelectEmits = {
  [Event in keyof typeof import('./emits').peopleSelectEmits]: Parameters<
    (typeof import('./emits').peopleSelectEmits)[Event]
  >
}
export interface PeopleSelectSlots extends Omit<import('../select/types').SelectSlots, 'read' | 'option' | 'label'> {
  read?(scope: PeopleSelectReadScope): import('vue').VNodeChild
  actions?(scope: PeopleSelectActionScope): import('vue').VNodeChild
  option?(scope: { data: PeopleSelectOption }): import('vue').VNodeChild
  label?(scope: { data: PeopleSelectOption }): import('vue').VNodeChild
}
