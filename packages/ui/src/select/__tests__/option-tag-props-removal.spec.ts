import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select, { Option } from '..'
import SelectMenu from '../SelectMenu'

test('slot option reflects removed and restored tag properties', async () => {
  const tagProps = ref<Record<string, unknown>>({ color: 'red', closable: true })
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: { options: [], editMode: 'direct' },
    slots: { default: () => h(Option, { value: 'a', label: 'Alpha', tagProps: tagProps.value }) },
  })
  try {
    const info = () =>
      (wrapper.findComponent(SelectMenu).props('controller') as any).validOptionInfos.find(
        (item: any) => item.value === 'a',
      )
    await nextTick()
    expect(info().tagProps).toEqual({ color: 'red', closable: true })
    tagProps.value = { color: 'red' }
    await nextTick()
    await nextTick()
    expect(info().tagProps).toEqual({ color: 'red' })
    tagProps.value = { color: 'red', closable: false }
    await nextTick()
    await nextTick()
    expect(info().tagProps).toEqual({ color: 'red', closable: false })
  } finally {
    wrapper.unmount()
  }
})

test('slot option updates callbacks with identical source and different closures', async () => {
  const create = (value: string) => () => value
  const tagProps = ref({ onClose: create('first') })
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: { options: [], editMode: 'direct' },
    slots: { default: () => h(Option, { value: 'a', label: 'Alpha', tagProps: tagProps.value }) },
  })
  try {
    const info = () =>
      (wrapper.findComponent(SelectMenu).props('controller') as any).validOptionInfos.find(
        (item: any) => item.value === 'a',
      )
    await nextTick()
    expect(info().tagProps.onClose()).toBe('first')
    tagProps.value = { onClose: create('second') }
    await nextTick()
    await nextTick()
    expect(info().tagProps.onClose()).toBe('second')
  } finally {
    wrapper.unmount()
  }
})

test('forwarded close and once listeners coexist with Select removal', async () => {
  const close = vi.fn()
  const once = vi.fn()
  const wrapper = mount(Select, {
    attachTo: document.body,
    props: { options: [], multiple: true, modelValue: ['a'], editMode: 'direct' },
    slots: {
      default: () => h(Option, { value: 'a', label: 'Alpha', tagProps: { onClose: close, onCloseOnce: once } }),
    },
  })
  try {
    await nextTick()
    const button = wrapper.get('[role="button"][aria-label]')
    await button.trigger('click')
    await button.trigger('click')
    expect(close).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
    expect(close.mock.calls[0][0]).toBeInstanceOf(MouseEvent)
    expect(wrapper.emitted('update:modelValue')).toEqual([[[]], [[]]])
  } finally {
    wrapper.unmount()
  }
})
