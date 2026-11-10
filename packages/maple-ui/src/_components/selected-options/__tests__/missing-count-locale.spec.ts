import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { add, use } from '../../../locale'
import { selectionEditorSurface } from '../context'
import SelectedOptions from '../SelectedOptions.vue'

test('a partial locale does not break multi-select count rendering', () => {
  add('partial-count-test', {})
  use('partial-count-test')
  try {
    const wrapper = mount(SelectedOptions, {
      global: { provide: { [selectionEditorSurface as symbol]: { mobile: true } } },
      props: { multiple: true, open: true, items: [{ key: 'a', label: 'A' }] },
    })
    try {
      expect(wrapper.get('[role="status"]').text()).toBe('1')
    } finally {
      wrapper.unmount()
    }
  } finally {
    use('zh-CN')
  }
})
