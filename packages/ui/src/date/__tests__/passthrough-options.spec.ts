import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Date from '..'
import type { DatePopupOptions } from '..'
import { datePresentationOptions } from '../../date/presentation-options'
import Trigger from '../../trigger'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})
test('Date: existing popup filtering strips host state/rules/listeners including kebab-case keys', () => {
  const onChange = vi.fn()
  const options = {
    open: true,
    'default-open': true,
    disabled: false,
    'model-value': 'other',
    min: '2020-01-01',
    onChange,
    'onUpdate:open': onChange,
    placement: 'top-start',
    popupTranslate: [0, 8],
  }
  expect(datePresentationOptions(options)).toEqual({ placement: 'top-start', popupTranslate: [0, 8] })
  expect(onChange).not.toHaveBeenCalled()
})
test('Date: real trigger keeps host state and fixed offset; top-level container wins', () => {
  const wrapper = mount(Date, {
    props: {
      editMode: 'direct',
      open: false,
      disabled: true,
      popupContainer: false,
      popupProps: {
        open: true,
        disabled: false,
        popupContainer: document.body,
        popupOffset: 99,
        placement: 'top-start',
      },
    },
    global: { stubs: { teleport: true } },
  })
  wrappers.push(wrapper)
  const trigger = wrapper.findComponent(Trigger)
  expect(trigger.props('open')).toBe(false)
  expect(trigger.props('disabled')).toBe(true)
  expect(trigger.props('popupContainer')).toBe(false)
  expect(trigger.props('popupOffset')).toBe(4)
  expect(trigger.props('placement')).toBe('top-start')
})
test('Date: opt-in popup type remains accepted by the legacy prop with nested container fallback', () => {
  const popupProps: DatePopupOptions = { placement: 'top-end', popupTranslate: [0, -8], popupContainer: false }
  const wrapper = mount(Date, { props: { editMode: 'direct', popupProps }, global: { stubs: { teleport: true } } })
  wrappers.push(wrapper)
  const trigger = wrapper.findComponent(Trigger)
  expect(trigger.props('popupContainer')).toBe(false)
  expect(trigger.props('popupTranslate')).toEqual([0, -8])
  expect(trigger.props('placement')).toBe('top-end')
})
