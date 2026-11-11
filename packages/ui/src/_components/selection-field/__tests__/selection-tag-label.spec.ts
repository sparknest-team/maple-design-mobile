import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Tooltip from '../../../tooltip'
import SelectionField from '../SelectionField.vue'
import SelectionTagLabel from '../SelectionTagLabel.vue'

const cleanups: (() => void)[] = []
afterEach(() =>
  cleanups
    .splice(0)
    .reverse()
    .forEach((cleanup) => cleanup()),
)
const settle = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 130))
  await nextTick()
}
function create() {
  const host = document.createElement('div')
  document.body.append(host)
  const wrapper = mount(SelectionTagLabel, {
    attachTo: host,
    slots: { default: () => h('span', 'Full selected label') },
  })
  cleanups.push(() => {
    wrapper.unmount()
    host.remove()
  })
  const label = wrapper.get('.mp-selection-field__tag-label')
  let width = 80
  Object.defineProperty(label.element, 'clientWidth', { get: () => width })
  Object.defineProperty(label.element, 'scrollWidth', { get: () => 180 })
  const resize = async (next: number) => {
    width = next
    window.dispatchEvent(new Event('resize'))
    await nextTick()
  }
  return { wrapper, label, resize, tooltip: wrapper.findComponent(Tooltip) }
}

test('only truncated labels become focusable and show the complete text on hover', async () => {
  const { label, tooltip, resize } = create()
  await resize(240)
  expect(label.attributes('tabindex')).toBeUndefined()
  await label.trigger('click')
  expect(tooltip.props('open')).toBe(false)
  await resize(80)
  expect(label.attributes('tabindex')).toBe('0')
  await label.trigger('mouseenter')
  await settle()
  expect(tooltip.props('open')).toBe(true)
  expect(document.querySelector('[role="tooltip"]')?.textContent).toContain('Full selected label')
  expect(label.attributes('aria-describedby')).toBeTruthy()
  await label.trigger('mouseleave')
  await settle()
  expect(tooltip.props('open')).toBe(false)
})

test('touch click and keyboard focus can reveal text without changing or removing selections', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const wrapper = mount(SelectionField, {
    attachTo: host,
    props: {
      multiple: true,
      tagNowrap: true,
      clearable: true,
      items: [{ key: 'long', value: 'long', label: 'Full selected label' }],
    },
  })
  cleanups.push(() => {
    wrapper.unmount()
    host.remove()
  })
  const label = wrapper.get('.mp-selection-field__tag-label')
  Object.defineProperty(label.element, 'clientWidth', { value: 80 })
  Object.defineProperty(label.element, 'scrollWidth', { value: 180 })
  window.dispatchEvent(new Event('resize'))
  await nextTick()
  await label.trigger('click')
  await settle()
  expect(wrapper.findComponent(Tooltip).props('open')).toBe(true)
  expect(wrapper.emitted('click')).toBeUndefined()
  expect(wrapper.emitted('remove')).toBeUndefined()
  expect(wrapper.emitted('update:inputValue')).toBeUndefined()
  await wrapper.get('.mp-tag__close-btn').trigger('click')
  expect(wrapper.emitted('remove')).toEqual([['long']])
})

test('focus, Enter and Space reveal text while Escape and outside clicks dismiss it', async () => {
  const { label, tooltip, resize } = create()
  await resize(80)
  await label.trigger('focus')
  await settle()
  expect(tooltip.props('open')).toBe(true)
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  await settle()
  expect(tooltip.props('open')).toBe(false)
  await label.trigger('keydown', { key: 'Enter' })
  await settle()
  expect(tooltip.props('open')).toBe(true)
  document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await settle()
  expect(tooltip.props('open')).toBe(false)
  await label.trigger('keydown', { key: ' ' })
  await settle()
  expect(tooltip.props('open')).toBe(true)
})

test('pointer scrolling does not open a preview, and resizing or disabling dismisses it', async () => {
  const { wrapper, label, tooltip, resize } = create()
  await resize(80)
  await label.trigger('pointerdown', { pointerType: 'touch' })
  await label.trigger('pointermove', { pointerType: 'touch' })
  await label.trigger('pointercancel', { pointerType: 'touch' })
  expect(tooltip.props('open')).toBe(false)
  await label.trigger('click')
  await settle()
  expect(tooltip.props('open')).toBe(true)
  await label.trigger('pointercancel', { pointerType: 'touch' })
  expect(tooltip.props('open')).toBe(false)
  await label.trigger('click')
  await resize(240)
  expect(tooltip.props('open')).toBe(false)
  await resize(80)
  await label.trigger('click')
  await wrapper.setProps({ disabled: true })
  expect(tooltip.props('open')).toBe(false)
  expect(label.attributes('tabindex')).toBeUndefined()
})
