import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select from '..'
import AutoComplete from '../../auto-complete'

for (const [name, Component] of [
  ['Select', Select],
  ['AutoComplete', AutoComplete],
] as const) {
  test(`${name}: readonly loads display options without opening or changing value`, async () => {
    const loader = vi.fn(async () => [{ value: 'a', label: 'Alpha' }])
    const w = mount(Component as any, {
      props: { options: loader, modelValue: 'a', readonly: true, open: true, searchDelay: 0 },
    })
    try {
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
      expect(w.emitted('update:modelValue')).toBeUndefined()
      expect(w.find('[role="listbox"]').exists()).toBe(false)
    } finally {
      w.unmount()
    }
  })
  test(`${name}: disabled and readPretty pause requests and resume on unlock`, async () => {
    const loader = vi.fn(async () => [{ value: 'a', label: 'Alpha' }])
    const w = mount(Component as any, { props: { options: loader, disabled: true, searchDelay: 0 } })
    try {
      await flushPromises()
      expect(loader).not.toHaveBeenCalled()
      await w.setProps({ disabled: false, readPretty: true })
      await flushPromises()
      expect(loader).not.toHaveBeenCalled()
      await w.setProps({ readPretty: false })
      await flushPromises()
      expect(loader).toHaveBeenCalledTimes(1)
    } finally {
      w.unmount()
    }
  })
}
