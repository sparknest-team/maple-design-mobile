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
