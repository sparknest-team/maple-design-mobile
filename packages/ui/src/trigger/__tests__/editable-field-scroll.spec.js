import { flushPromises, mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import InputTag from '../../input-tag'
import Mention from '../../mention'
import Time from '../../time'
import TimeRange from '../../time-range'
import Trigger from '..'

// jsdom omits the scroll method used by Mention's textarea caret mirror.
const nativeScrollTo = HTMLElement.prototype.scrollTo
beforeAll(() => {
  if (!nativeScrollTo) {
    HTMLElement.prototype.scrollTo = vi.fn()
  }
})
afterAll(() => {
  if (!nativeScrollTo) {
    delete HTMLElement.prototype.scrollTo
  }
})

const editablePicker = { open: true, inputEditable: true }

test.each([
  ['Mention input', Mention, { type: 'input', options: ['alice'] }, '@a'],
  ['Mention textarea', Mention, { type: 'textarea', options: ['alice'] }, '@a'],
  ['InputTag suggestions', InputTag, { options: ['alice', 'anna'] }, 'a'],
  ['Searchable Cascader', Cascader, { open: true, filterable: true, options: [{ value: 'a', label: 'Alpha' }] }, 'Al'],
  ['Date', DateField, editablePicker],
  ['DateRange', DateRange, editablePicker],
  ['Time', Time, editablePicker],
  ['TimeRange', TimeRange, editablePicker],
])('%s follows its anchor when a dialog scrolls after keyboard resize', async (_, component, props, query) => {
  const dialog = document.createElement('div')
  dialog.style.overflowY = 'auto'
  document.body.append(dialog)
  const viewport = Object.assign(new EventTarget(), { width: 390, height: 800, offsetLeft: 0, offsetTop: 0 })
  vi.stubGlobal('visualViewport', viewport)
  const wrapper = mount(component, { attachTo: dialog, props: { editMode: 'direct', ...props } })
  try {
    const input = wrapper.get('input, textarea')
    input.element.focus()
    if (query) {
      await input.setValue(query)
    }
    await flushPromises()
    const reference = wrapper.getComponent(Trigger).vm.$.exposed.getReference()
    vi.spyOn(reference, 'getBoundingClientRect').mockImplementation(() => ({
      top: 200 - dialog.scrollTop,
      left: 10,
      width: 100,
      height: 40,
    }))
    const popup = document.querySelector('[trigger-placement]')
    expect(popup).toBeTruthy()
    viewport.height = 350
    viewport.dispatchEvent(new Event('resize'))
    await vi.waitFor(() => expect(popup.style.top).toBe('244px'))

    dialog.scrollTop = 80
    dialog.dispatchEvent(new Event('scroll'))
    await vi.waitFor(() => expect(popup.style.top).toBe('164px'))
  } finally {
    wrapper.unmount()
    dialog.remove()
    vi.unstubAllGlobals()
  }
})
