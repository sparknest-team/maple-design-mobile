import { flushPromises, mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import Menu from '../../menu'
import Popover from '../../popover'
import Select from '../../select'
import Time from '../../time'
import TimeRange from '../../time-range'
import Tooltip from '../../tooltip'
import Trigger from '..'

const originalTouchPoints = Object.getOwnPropertyDescriptor(navigator, 'maxTouchPoints')
beforeAll(() => Object.defineProperty(navigator, 'maxTouchPoints', { configurable: true, value: 5 }))
afterAll(() => {
  if (originalTouchPoints) {
    Object.defineProperty(navigator, 'maxTouchPoints', originalTouchPoints)
  } else {
    delete navigator.maxTouchPoints
  }
})

const options = [{ label: 'Alpha', value: 'a' }]
const button = { default: '<button>Details</button>' }

test.each([
  ['Tooltip', Tooltip, { content: 'Details' }, button],
  ['Popover', Popover, { content: 'Details' }, button],
  ['Menu', Menu, { options }, button],
  ['Select', Select, { editMode: 'direct', options }],
  ['Cascader', Cascader, { editMode: 'direct', options }],
  ['Date', DateField, { editMode: 'direct', inputEditable: false }],
  ['DateRange', DateRange, { editMode: 'direct', inputEditable: false }],
  ['Time', Time, { editMode: 'direct', inputEditable: false }],
  ['TimeRange', TimeRange, { editMode: 'direct', inputEditable: false }],
])('%s follows a touch page moving without an event from its own reference', async (_, component, props, slots) => {
  const wrapper = mount(component, { attachTo: document.body, props: { ...props, open: true }, slots })
  try {
    await flushPromises()
    const anchor = wrapper.getComponent(Trigger).vm.$.exposed.getReference()
    let top = 220
    vi.spyOn(anchor, 'getBoundingClientRect').mockImplementation(() => ({ left: 120, top, width: 60, height: 32 }))
    window.dispatchEvent(new Event('resize'))
    const popup = document.querySelector('[trigger-placement]')
    await vi.waitFor(() => expect(parseFloat(popup.style.top)).toBeGreaterThan(180))
    const initial = parseFloat(popup.style.top)
    top -= 80
    await vi.waitFor(() => expect(parseFloat(popup.style.top)).toBe(initial - 80))
  } finally {
    wrapper.unmount()
  }
})
