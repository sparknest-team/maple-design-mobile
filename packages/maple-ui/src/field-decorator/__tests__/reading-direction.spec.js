import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Selection from '../../_components/selection-field/SelectionField.vue'
import Field from '../FieldDecorator.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.removeAttribute('dir')
  vi.restoreAllMocks()
})
const settle = async () => {
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 40))
  await flushPromises()
}
test('native dir mutations remeasure inline offset even when dimensions stay unchanged', async () => {
  const owner = mount(Field, {
    attachTo: document.body,
    attrs: { dir: 'ltr' },
    props: { hint: true, placeholder: 'Account' },
    slots: { default: () => h('input'), prefix: () => 'Prefix' },
  })
  owners.push(owner)
  const root = owner.element,
    middle = owner.get('.mp-field-decorator__middle').element
  let left = 48
  Object.defineProperty(root, 'clientWidth', { configurable: true, value: 320 })
  Object.defineProperty(middle, 'offsetLeft', { configurable: true, get: () => left })
  Object.defineProperty(middle, 'offsetWidth', { configurable: true, value: 240 })
  window.dispatchEvent(new Event('resize'))
  await settle()
  expect(root.style.getPropertyValue('--mp-internal-field-content-offset')).toBe('48px')
  left = 32
  root.setAttribute('dir', 'rtl')
  await settle()
  expect(root.style.getPropertyValue('--mp-internal-field-content-offset')).toBe('48px')
  expect(root.style.getPropertyValue('--mp-internal-field-hint-origin')).toBe('right center')
  document.body.dir = 'rtl'
  root.setAttribute('dir', 'ltr')
  left = 48
  await settle()
  expect(root.style.getPropertyValue('--mp-internal-field-hint-origin')).toBe('')
})
test('explicit physical alignment and last-value deletion retain their meanings in RTL', async () => {
  document.body.dir = 'rtl'
  const owner = mount(Selection, {
    attachTo: document.body,
    props: {
      multiple: true,
      searchable: true,
      textAlign: 'left',
      items: [
        { key: 'a', label: 'Alpha' },
        { key: 'b', label: 'Beta' },
      ],
    },
  })
  owners.push(owner)
  const content = owner.get('.mp-selection-field__content').element
  expect(content.style.getPropertyValue('--mp-internal-selection-justify')).toBe('left')
  await owner.get('input').trigger('keydown', { key: 'Backspace' })
  expect(owner.emitted('remove')).toEqual([['b']])
  await owner.get('input').trigger('compositionstart')
  await owner.get('input').trigger('keydown', { key: 'Backspace', isComposing: true })
  expect(owner.emitted('remove')).toHaveLength(1)
  await owner.setProps({ textAlign: 'right' })
  expect(content.style.getPropertyValue('--mp-internal-selection-justify')).toBe('right')
})

test('KeepAlive suspends geometry listeners and resumes one binding', async () => {
  const add = vi.spyOn(window, 'addEventListener'),
    remove = vi.spyOn(window, 'removeEventListener')
  const active = ref(true)
  const owner = mount({
    setup: () => () =>
      h(KeepAlive, null, {
        default: () =>
          active.value ? h(Field, { hint: true, placeholder: 'Account' }, { default: () => h('input') }) : null,
      }),
  })
  owners.push(owner)
  await settle()
  const bindings = () => add.mock.calls.filter((call) => call[0] === 'resize')
  expect(bindings()).toHaveLength(1)
  active.value = false
  await settle()
  expect(remove.mock.calls.some((call) => call[0] === 'resize' && call[1] === bindings()[0][1])).toBe(true)
  active.value = true
  await settle()
  expect(bindings()).toHaveLength(2)
})
