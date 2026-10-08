import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Radio, { RadioGroup } from '../../radio'

function target(item) {
  const input = item.find('input')
  return input.exists() ? input : item.find('[tabindex]')
}
const items = (wrapper) => wrapper.findAllComponents(Radio)
const tabs = (wrapper) =>
  items(wrapper).map((item) => {
    const input = item.find('input')
    return input.exists() ? input.attributes('tabindex') : item.find('.mp-radio__action').attributes('tabindex')
  })
const settled = async () => {
  await nextTick()
  await nextTick()
}

for (const variant of ['radio', 'button']) {
  describe('radio navigation / ' + variant, () => {
    it('maintains one tab entry and cycles locally with the original event', async () => {
      const wrapper = mount(RadioGroup, { props: { variant, ariaLabel: 'Choices', options: ['a', 'b', 'c'] } })
      await settled()
      expect(wrapper.attributes('role') || wrapper.find('[role="radiogroup"]').attributes('role')).toBe('radiogroup')
      expect(tabs(wrapper)).toEqual(['0', '-1', '-1'])
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight' })
      await settled()
      expect(wrapper.emitted('change')[0][0]).toBe('b')
      expect(wrapper.emitted('change')[0][1]).toBeInstanceOf(KeyboardEvent)
      expect(tabs(wrapper)).toEqual(['-1', '0', '-1'])
      await target(items(wrapper)[1]).trigger('keydown', { key: 'End' })
      await target(items(wrapper)[2]).trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.emitted('change').map((args) => args[0])).toEqual(['b', 'c', 'a'])
      wrapper.unmount()
    })

    it('skips disabled, focuses readonly without selecting, and supports Home', async () => {
      const wrapper = mount(RadioGroup, {
        attachTo: document.body,
        props: {
          variant,
          defaultValue: 'a',
          options: ['a', { value: 'b', disabled: true }, { value: 'c', readonly: true }, 'd'],
        },
      })
      await settled()
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight' })
      expect(document.activeElement).toBe(target(items(wrapper)[2]).element)
      expect(wrapper.emitted('change')).toBeUndefined()
      await target(items(wrapper)[2]).trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('change')[0][0]).toBe('d')
      await target(items(wrapper)[3]).trigger('keydown', { key: 'Home' })
      expect(wrapper.emitted('change')[1][0]).toBe('a')
      wrapper.unmount()
    })

    it('respects rejected controlled values, readonly and modified/repeated keys', async () => {
      const wrapper = mount(RadioGroup, { props: { variant, modelValue: 'a', options: ['a', 'b'] } })
      await settled()
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight', ctrlKey: true })
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight', repeat: true })
      expect(wrapper.emitted('change')).toBeUndefined()
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('change')[0][0]).toBe('b')
      expect(tabs(wrapper)).toEqual(['0', '-1'])
      await wrapper.setProps({ readonly: true })
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowRight' })
      expect(wrapper.emitted('change')).toHaveLength(1)
      await wrapper.setProps({ readonly: false, disabled: true })
      expect(tabs(wrapper)).toEqual([undefined, undefined])
      wrapper.unmount()
    })

    it('recovers tab entry after reset, selected removal and disabled updates', async () => {
      const wrapper = mount(RadioGroup, { props: { variant, modelValue: 'b', options: ['a', 'b'] } })
      await settled()
      expect(tabs(wrapper)).toEqual(['-1', '0'])
      await wrapper.setProps({ modelValue: null })
      await settled()
      expect(tabs(wrapper)).toEqual(['0', '-1'])
      await wrapper.setProps({ modelValue: 'b', options: [{ value: 'a', disabled: true }, 'b', 'c'] })
      await settled()
      expect(tabs(wrapper)).toEqual([undefined, '0', '-1'])
      await wrapper.setProps({ options: [{ value: 'a', disabled: true }, 'c'] })
      await settled()
      expect(tabs(wrapper)).toEqual([undefined, '0'])
      expect(wrapper.emitted('change')).toBeUndefined()
      wrapper.unmount()
    })

    it('tracks keyed DOM order and handles no enabled options', async () => {
      const order = ref(['a', 'b', 'c'])
      const wrapper = mount(RadioGroup, {
        props: { variant },
        slots: { default: () => order.value.map((value) => h(Radio, { key: value, value })) },
      })
      await settled()
      order.value = ['c', 'a', 'b']
      await settled()
      expect(tabs(wrapper)).toEqual(['0', '-1', '-1'])
      await target(items(wrapper)[0]).trigger('keydown', { key: 'ArrowLeft' })
      expect(wrapper.emitted('change')[0][0]).toBe('b')
      await wrapper.setProps({ disabled: true })
      await settled()
      expect(tabs(wrapper)).toEqual([undefined, undefined, undefined])
      wrapper.unmount()
    })
  })
}

it('does not respond to window events, nested groups or interactive label descendants', async () => {
  const wrapper = mount(RadioGroup, {
    slots: {
      default: () => [
        h(Radio, { value: 'outer' }, () => h('button', 'Embedded')),
        h(RadioGroup, { options: ['a', 'b'] }),
      ],
    },
  })
  await settled()
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
  await wrapper.find('button').trigger('keydown', { key: 'ArrowRight' })
  expect(wrapper.emitted('change')).toBeUndefined()
  const nested = wrapper.findAllComponents(RadioGroup).find((item) => item.vm.$ !== wrapper.vm.$)
  await target(items(nested)[0]).trigger('keydown', { key: 'ArrowRight' })
  expect(nested.emitted('change')[0][0]).toBe('b')
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})

it('cleans up KeepAlive registrations and keeps restored ordering', async () => {
  const show = ref(true)
  const Child = defineComponent({ setup: () => () => h(Radio, { value: 'a' }) })
  const wrapper = mount(RadioGroup, {
    slots: {
      default: () => [h(KeepAlive, null, { default: () => (show.value ? h(Child) : null) }), h(Radio, { value: 'b' })],
    },
  })
  await settled()
  show.value = false
  await settled()
  expect(tabs(wrapper)).toEqual(['0'])
  show.value = true
  await settled()
  expect(tabs(wrapper)).toEqual(['0', '-1'])
  wrapper.unmount()
})

it('supports all five button sizes and inherits the group variant', async () => {
  const wrapper = mount(RadioGroup, { props: { variant: 'button', options: ['a', 'b'] } })
  for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
    await wrapper.setProps({ size })
    await settled()
    expect(wrapper.html()).toContain('radio-group--size-' + size)
    expect(wrapper.html()).toContain('radio--button')
  }
  await wrapper.setProps({ variant: 'radio' })
  expect(wrapper.html()).not.toContain('radio--button')
  wrapper.unmount()
})
