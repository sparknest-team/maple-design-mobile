import { withInstall } from '../utils/components'
import _PeopleSelect from './PeopleSelect'
import { peopleSelectProps } from './props'

const PeopleSelect = withInstall(_PeopleSelect, Object.assign(_PeopleSelect, {}), { components: [_PeopleSelect] })

export type PeopleSelectInstance = InstanceType<typeof _PeopleSelect> & import('./types').PeopleSelectExpose
export type { PeopleSelectProps } from './props'

export { peopleSelectProps }
export { PeopleSelect }

export const _PeopleSelectComponent = PeopleSelect

export default PeopleSelect

export type {
  PeopleSelectValue,
  PeopleSelectReadScope,
  PeopleSelectSlots,
  PeopleSelectEmits,
  PeopleSelectExpose,
  PeopleSelectOption,
  PeopleSelectOptionsLoader,
  PeopleSelectAction,
  PeopleSelectFallbackOption,
  PeopleSelectRenderActions,
  PeopleSelectActionScope,
} from './types'
