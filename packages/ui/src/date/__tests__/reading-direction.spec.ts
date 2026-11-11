import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { navigateTemporalColumns, navigateTemporalGrid } from '../../_utils/temporal-keyboard'
import { mockScrollIntoView } from '../../utils/test'
import DatePicker from '../DatePicker.vue'

mockScrollIntoView()

afterEach(() => {
  document.body.innerHTML = ''
})
const press = (element: HTMLElement, key: string, extra = {}) => {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...extra })
  element.dispatchEvent(event)
  return event
}
describe('temporal reading direction', () => {
  it('maps horizontal focus dynamically, skips disabled cells, and keeps vertical row order', () => {
    const grid = document.createElement('div')
    grid.dir = 'ltr'
    grid.innerHTML = Array.from(
      { length: 21 },
      (_, i) => `<button data-cell ${i === 8 ? 'disabled' : ''}>${i}</button>`,
    ).join('')
    document.body.append(grid)
    grid.addEventListener('keydown', (event) => navigateTemporalGrid(event, '[data-cell]', 7))
    const cells = grid.querySelectorAll<HTMLButtonElement>('button')
    cells[7].focus()
    press(cells[7], 'ArrowRight')
    expect(document.activeElement).toBe(cells[9])
    grid.dir = 'rtl'
    press(cells[9], 'ArrowRight')
    expect(document.activeElement).toBe(cells[7])
    press(cells[7], 'ArrowDown')
    expect(document.activeElement).toBe(cells[14])
    press(cells[14], 'End')
    expect(document.activeElement).toBe(cells[20])
    press(cells[20], 'Home')
    expect(document.activeElement).toBe(cells[14])
    expect(press(cells[14], 'ArrowLeft', { ctrlKey: true }).defaultPrevented).toBe(false)
    expect(press(cells[14], 'ArrowLeft', { isComposing: true }).defaultPrevented).toBe(false)
    expect(press(cells[14], 'Enter').defaultPrevented).toBe(false)
  })
  it('moves across time columns in visual direction without selecting an option', () => {
    const root = document.createElement('div')
    root.dir = 'rtl'
    root.innerHTML =
      '<div role="listbox"><button role="option">H</button></div><div role="listbox"><button role="option" aria-disabled="true">blocked</button><button role="option" aria-selected="true">M</button></div>'
    document.body.append(root)
    root.addEventListener('keydown', (event) => navigateTemporalColumns(event, '[role=listbox]', '[role=option]'))
    const options = root.querySelectorAll<HTMLButtonElement>('button')
    let clicks = 0
    root.addEventListener('click', () => clicks++)
    options[0].focus()
    press(options[0], 'ArrowLeft')
    expect(document.activeElement).toBe(options[2])
    root.dir = 'ltr'
    press(options[2], 'ArrowLeft')
    expect(document.activeElement).toBe(options[0])
    expect(clicks).toBe(0)
    expect(press(options[0], 'ArrowLeft').defaultPrevented).toBe(false)
  })
  it('keeps date values stable during focus navigation and runtime direction changes', async () => {
    const host = document.createElement('div')
    host.dir = 'ltr'
    document.body.append(host)
    const wrapper = mount(DatePicker, {
      attachTo: host,
      props: { presentation: 'calendar', modelValue: '2025-01-15', pickerValue: '2025-01-01' },
    })
    const cells = wrapper.findAll('button[mp-day-picker-cover]')
    expect(cells.length).toBeGreaterThanOrEqual(28)
    const first = cells[10].element as HTMLElement
    first.focus()
    await cells[10].trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(cells[11].element)
    host.dir = 'rtl'
    await cells[11].trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(first)
    await cells[10].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(cells[17].element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
    wrapper.unmount()
  })
  it.each(['month', 'year'] as const)('uses three columns for %s focus navigation', async (type) => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const wrapper = mount(DatePicker, {
      attachTo: host,
      props: { presentation: 'calendar', type, modelValue: '2025-01-01', pickerValue: '2025-01-01' },
    })
    const cells = wrapper.findAll(`button[mp-${type}-picker-cover]`)
    ;(cells[1].element as HTMLElement).focus()
    await cells[1].trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(cells[4].element)
    await cells[4].trigger('keydown', { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(cells[5].element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })
  it('commits the chosen date in RTL', async () => {
    const host = document.createElement('div')
    host.dir = 'rtl'
    document.body.append(host)
    const wrapper = mount(DatePicker, {
      attachTo: host,
      props: { presentation: 'calendar', modelValue: '2025-01-15', pickerValue: '2025-01-01', disableConfirm: true },
    })
    const cells = wrapper.findAll('button[mp-day-picker-cover]')
    const day = cells.find((cell) => cell.text() === '16')!
    await day.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('2025-01-16')
    wrapper.unmount()
  })
})
