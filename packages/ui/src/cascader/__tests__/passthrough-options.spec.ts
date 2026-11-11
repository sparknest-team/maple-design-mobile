import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Cascader from '..'
import type { CascaderTriggerOptions } from '..'
import Trigger from '../../trigger'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})
function setup(props: Record<string, unknown>) {
  const wrapper = mount(Cascader, {
    props: { editMode: 'direct', options: [{ value: 'a', label: 'Apple' }], ...props },
    global: { stubs: { teleport: true } },
  })
  wrappers.push(wrapper)
  return wrapper
}
test('Cascader: legacy nested state cannot override host open/readonly; top-level container wins', () => {
  const wrapper = setup({
    open: false,
    readonly: true,
    popupContainer: false,
    triggerProps: {
      open: true,
      defaultOpen: true,
      disabled: false,
      popupContainer: document.body,
      placement: 'top-start',
      popupOffset: 8,
    },
  })
  const trigger = wrapper.findComponent(Trigger)
  expect(trigger.props('open')).toBe(false)
  expect(trigger.props('disabled')).toBe(true)
  expect(trigger.props('popupContainer')).toBe(false)
  expect(trigger.props('placement')).toBe('top-start')
  expect(trigger.props('popupOffset')).toBe(8)
})
test('Cascader: typed presentation options retain nested container fallback and real positioning', () => {
  const triggerProps: CascaderTriggerOptions = { placement: 'top-end', popupOffset: 12, popupContainer: false }
  const wrapper = setup({ triggerProps })
  const trigger = wrapper.findComponent(Trigger)
  expect(trigger.props('popupContainer')).toBe(false)
  expect(trigger.props('placement')).toBe('top-end')
  expect(trigger.props('popupOffset')).toBe(12)
})
test('Cascader: legacy nested unmountOnClose still overrides the top-level value', () => {
  const wrapper = setup({ unmountOnClose: false, triggerProps: { unmountOnClose: true } })
  expect(wrapper.findComponent(Trigger).props('unmountOnClose')).toBe(true)
})
