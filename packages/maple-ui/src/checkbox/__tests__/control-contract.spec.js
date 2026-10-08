import { h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { formHost } from '../../input-number/__tests__/form-host'
import Radio from '../../radio'
import Checkbox from '../index'

const wrappers = []
function make(Item, props = {}) {
  const wrapper = mount(Item, { props, attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}
function focusedElement(wrapper, label) {
  const input = wrapper.find('input')
  return input.exists() ? input : wrapper.find('.mp-' + label + '__action')
}
function checked(wrapper, label) {
  const input = wrapper.find('input')
  return input.exists()
    ? input.element.checked
    : wrapper
        .find('.mp-' + label + '__action')
        .classes()
        .includes('mp-' + label + '--checked')
}
async function click(wrapper, label) {
  const input = wrapper.find('input')
  if (input.exists()) {
    input.element.checked = label === 'checkbox' ? !input.element.checked : true
    await input.trigger('change')
  } else {
    await wrapper.find('.mp-' + label).trigger('click')
  }
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

describe('choice control contract copies', () => {
  it('keeps checkbox boolean models boolean regardless of value', async () => {
    const wrapper = make(Checkbox, { defaultValue: false, value: 'custom' })
    wrapper.vm.toggle()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
    expect(checked(wrapper, 'checkbox')).toBe(true)
    wrapper.vm.toggle(false)
    await nextTick()
    expect(wrapper.emitted('change')[1][0]).toBe(false)
  })

  it('updates arrays without mutating defaults and distinguishes false/zero/empty', async () => {
    const initial = [false, 0]
    const wrapper = make(Checkbox, { defaultValue: initial, value: '' })
    wrapper.vm.toggle(true)
    await nextTick()
    expect(initial).toEqual([false, 0])
    expect(wrapper.emitted('change')[0][0]).toEqual([false, 0, ''])
    await wrapper.setProps({ value: false })
    wrapper.vm.toggle(false)
    expect(wrapper.emitted('change')[1][0]).toEqual([0, ''])
  })

  for (const [Item, label, initial, proposal, method] of [
    [Checkbox, 'checkbox', false, true, 'toggle'],
    [Radio, 'radio', null, true, 'select'],
  ]) {
    it(label + ' rejects a controlled proposal and keeps external sync silent', async () => {
      const wrapper = make(Item, { modelValue: initial })
      await click(wrapper, label)
      expect(checked(wrapper, label)).toBe(false)
      expect(wrapper.emitted('change')[0][0]).toBe(proposal)
      await wrapper.setProps({ modelValue: proposal })
      expect(checked(wrapper, label)).toBe(true)
      expect(wrapper.emitted('change')).toHaveLength(1)
      await wrapper.setProps({ modelValue: undefined })
      expect(checked(wrapper, label)).toBe(false)
    })

    it(label + ' reads defaultValue only once and isolates instances', async () => {
      const left = make(Item, { defaultValue: initial })
      const right = make(Item, { defaultValue: initial })
      left.vm[method]()
      await nextTick()
      expect(checked(left, label)).toBe(true)
      expect(checked(right, label)).toBe(false)
      await left.setProps({ defaultValue: initial })
      expect(checked(left, label)).toBe(true)
    })

    it(label + ' guards methods and exposes focus/blur with single form notifications', async () => {
      const state = reactive({ disabled: true, readonly: false })
      const calls = []
      const wrapper = mount(
        formHost(
          state,
          {
            onChange: () => calls.push('form'),
          },
          () =>
            h(Item, {
              'onUpdate:modelValue': () => calls.push('update'),
              onChange: () => calls.push('change'),
            }),
        ),
        { attachTo: document.body },
      )
      wrappers.push(wrapper)
      const item = wrapper.findComponent(Item)
      const api = item.vm.$.exposed || item.vm
      api[method]()
      api.focus()
      expect(calls).toEqual([])
      expect(document.activeElement).not.toBe(focusedElement(item, label).element)
      state.disabled = false
      state.readonly = true
      await nextTick()
      api.focus()
      expect(document.activeElement).toBe(focusedElement(item, label).element)
      api[method]()
      expect(calls).toEqual([])
      api.blur()
      expect(item.emitted('focus')).toHaveLength(1)
      expect(item.emitted('blur')).toHaveLength(1)
      state.readonly = false
      await nextTick()
      api[method]()
      expect(calls).toEqual(['update', 'change', 'form'])
    })
  }

  it('radio supports explicit null and false without toggling off a selection', async () => {
    const wrapper = make(Radio, { defaultValue: null, value: false })
    expect(checked(wrapper, 'radio')).toBe(false)
    wrapper.vm.select()
    await nextTick()
    expect(checked(wrapper, 'radio')).toBe(true)
    wrapper.vm.select()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')[0][0]).toBe(false)
    expect(wrapper.vm.toggle).toBeUndefined()
  })

  it('indeterminate is presentation only and never emits update:indeterminate', async () => {
    const wrapper = make(Checkbox, { defaultValue: false, indeterminate: true })
    await click(wrapper, 'checkbox')
    expect(wrapper.emitted('change')[0][0]).toBe(true)
    expect(wrapper.props('indeterminate')).toBe(true)
    expect(wrapper.emitted('update:indeterminate')).toBeUndefined()
    await wrapper.setProps({ indeterminate: false })
    expect(wrapper.emitted('change')).toHaveLength(1)
  })

  it('does not emit for idempotent imperative checkbox requests', () => {
    const wrapper = make(Checkbox, { defaultValue: false })
    wrapper.vm.toggle(false)
    wrapper.vm.toggle(true)
    wrapper.vm.toggle(true)
    expect(wrapper.emitted('change')).toHaveLength(1)
  })
})

it('keyboard activates only the local control and cancels a blurred Space press', async () => {
  const first = make(Checkbox)
  const second = make(Checkbox)
  const target = focusedElement(first, 'checkbox')
  await target.trigger('keydown', { key: 'Enter' })
  await target.trigger('keydown', { key: 'Enter', repeat: true })
  expect(first.emitted('change')).toHaveLength(1)
  expect(second.emitted('change')).toBeUndefined()
  await target.trigger('keydown', { key: ' ' })
  await target.trigger('blur')
  await target.trigger('keyup', { key: ' ' })
  expect(first.emitted('change')).toHaveLength(1)
  await target.trigger('keydown', { key: ' ' })
  await target.trigger('keyup', { key: ' ' })
  expect(first.emitted('change')).toHaveLength(2)
  await target.trigger('keydown', { key: 'Enter', ctrlKey: true })
  expect(first.emitted('change')).toHaveLength(2)
})

it('does not complete a Space press after KeepAlive deactivation', async () => {
  const show = ref(true)
  const changed = vi.fn()
  const host = mount({
    setup: () => () => h(KeepAlive, null, { default: () => (show.value ? h(Checkbox, { onChange: changed }) : null) }),
  })
  wrappers.push(host)
  await focusedElement(host.findComponent(Checkbox), 'checkbox').trigger('keydown', { key: ' ' })
  show.value = false
  await nextTick()
  show.value = true
  await nextTick()
  await focusedElement(host.findComponent(Checkbox), 'checkbox').trigger('keyup', { key: ' ' })
  expect(changed).not.toHaveBeenCalled()
})
