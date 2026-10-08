import MenuPresentation from '../../_components/selection-field/MenuPresentation.vue'
import ListPresentation from './ListPresentation.vue'
import PickerPresentation from './PickerPresentation.vue'

type Presentation<T> = { component: T; deferred: (multiple: boolean) => boolean }

// Preserve each concrete component type without serializing its entire inferred implementation.
export const presentations: {
  menu: Presentation<typeof MenuPresentation>
  list: Presentation<typeof ListPresentation>
  picker: Presentation<typeof PickerPresentation>
} = {
  menu: { component: MenuPresentation, deferred: (_multiple: boolean) => false },
  list: { component: ListPresentation, deferred: (multiple: boolean) => multiple },
  picker: { component: PickerPresentation, deferred: (_multiple: boolean) => true },
}
