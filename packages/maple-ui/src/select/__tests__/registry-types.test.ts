import { describe, expect, it } from 'vitest'
import Menu from '../../_components/selection-field/MenuPresentation.vue'
import { presentations as cascader } from '../../cascader/presentations'
import CascaderPicker from '../../cascader/presentations/PickerPresentation.vue'
import { presentations as select } from '../presentations'
import SelectPicker from '../presentations/PickerPresentation.vue'

// Keep exact view types, rather than replacing the registry with Component/any.
const selectPicker: typeof SelectPicker = select.picker.component
const cascaderPicker: typeof CascaderPicker = cascader.picker.component

describe('selection presentation registry declarations', () => {
  it('preserves component identities and commit modes', () => {
    expect(selectPicker).toBe(SelectPicker)
    expect(cascaderPicker).toBe(CascaderPicker)
    for (const registry of [select, cascader]) {
      expect(registry.menu.component).toBe(Menu)
      expect(registry.menu.deferred(false)).toBe(false)
      expect(registry.menu.deferred(true)).toBe(false)
      expect(registry.list.deferred(false)).toBe(false)
      expect(registry.list.deferred(true)).toBe(true)
      expect(registry.picker.deferred(false)).toBe(true)
      expect(registry.picker.deferred(true)).toBe(true)
    }
  })
})
