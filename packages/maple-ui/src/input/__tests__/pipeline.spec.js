import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { formHost } from '../../input-number/__tests__/form-host'
import Textarea from '../../textarea'
import Input from '../index'

for (const [name, Component, selector] of [
  ['Input', Input, 'input'],
  ['Textarea', Textarea, 'textarea'],
]) {
  describe(name + ' input pipeline', () => {
    it('emits input before update and clears through each semantic once', async () => {
      const order = []
      const wrapper = mount(Component, {
        props: {
          editMode: 'direct',
          defaultValue: 'a',
          clearable: true,
          onInput: () => order.push('input'),
          'onUpdate:modelValue': () => order.push('update'),
          onClear: () => order.push('clear'),
          onChange: () => order.push('change'),
        },
      })
      await wrapper.get(selector).setValue('b')
      expect(order).toEqual(['input', 'update'])
      order.length = 0
      await wrapper.get('button').trigger('click')
      expect(order).toEqual(['clear', 'input', 'update', 'change'])
      await wrapper.get(selector).trigger('blur')
      expect(order).toEqual(['clear', 'input', 'update', 'change'])
      wrapper.unmount()
    })
    it('notifies each Form semantic once on clear', async () => {
      const handlers = { onInput: vi.fn(), onChange: vi.fn(), onClear: vi.fn() }
      const wrapper = mount(
        formHost({}, handlers, () => h(Component, { editMode: 'direct', defaultValue: 'draft', clearable: true })),
      )
      await wrapper.get('button').trigger('click')
      expect(handlers.onInput).toHaveBeenCalledTimes(1)
      expect(handlers.onChange).toHaveBeenCalledTimes(1)
      expect(handlers.onClear).toHaveBeenCalledTimes(1)
      await wrapper.get(selector).trigger('blur')
      expect(handlers.onChange).toHaveBeenCalledTimes(1)
      wrapper.unmount()
    })
    it('does not invent change when editing returns to the focus-entry value', async () => {
      const wrapper = mount(Component, { props: { editMode: 'direct', defaultValue: 'a' } })
      const input = wrapper.get(selector)
      await input.trigger('focus')
      await input.setValue('b')
      await input.setValue('a')
      await input.trigger('blur')
      expect(wrapper.emitted('change')).toBeUndefined()
      wrapper.unmount()
    })
    it('does not re-commit rejected clear proposals on blur', async () => {
      const wrapper = mount(Component, { props: { editMode: 'direct', modelValue: 'fixed', clearable: true } })
      await wrapper.get('button').trigger('click')
      await nextTick()
      expect(wrapper.get(selector).element.value).toBe('fixed')
      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')[0][0]).toBe('')
      await wrapper.get(selector).trigger('blur')
      expect(wrapper.emitted('change')).toHaveLength(1)
      wrapper.unmount()
    })
    it('keeps readonly/disabled values intact even on synthetic input and blur', async () => {
      const wrapper = mount(Component, {
        props: {
          editMode: 'direct',
          defaultValue: ' a ',
          readonly: true,
          modelModifiers: { trim: true },
          clearable: true,
        },
      })
      const input = wrapper.get(selector)
      await input.setValue('changed')
      await input.trigger('blur')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.find('button').exists()).toBe(false)
      await wrapper.setProps({ readonly: false, disabled: true })
      await input.setValue('changed again')
      expect(wrapper.emitted('input')).toBeUndefined()
      wrapper.unmount()
    })
    it('does not clear an in-progress composition', async () => {
      const wrapper = mount(Component, { props: { editMode: 'direct', defaultValue: 'before', clearable: true } })
      await wrapper.get(selector).trigger('compositionstart')
      await wrapper.get('button').trigger('click')
      expect(wrapper.emitted('clear')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      wrapper.unmount()
    })
    it('server-renders a native name and a stable hint association', async () => {
      const html = await renderToString(
        createSSRApp({
          render: () =>
            h(Component, {
              editMode: 'direct',
              hint: true,
              placeholder: 'Name',
              [selector === 'input' ? 'inputAttrs' : 'textareaAttrs']: { id: 'native-field', name: 'field' },
            }),
        }),
      )
      expect(html).toContain('for="native-field"')
      expect(html).toContain('name="field"')
    })
  })
}
it('restores rejected email input when no selection API is available', async () => {
  const wrapper = mount(Input, { props: { editMode: 'direct', modelValue: 'kept@example.com', type: 'email' } })
  await wrapper.get('input').setValue('rejected@example.com')
  await nextTick()
  expect(wrapper.get('input').element.value).toBe('kept@example.com')
  wrapper.unmount()
})

it('honors a consumer preventing Enter before committing the query', async () => {
  const wrapper = mount(Input, {
    props: { editMode: 'direct', defaultValue: 'query', onKeydown: (event) => event.preventDefault() },
  })
  await wrapper.get('input').trigger('focus')
  await wrapper.get('input').setValue('draft')
  await wrapper.get('input').trigger('keydown', { key: 'Enter' })
  expect(wrapper.emitted('press-enter')).toBeUndefined()
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})
