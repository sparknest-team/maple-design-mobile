import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fieldEditModeProp } from '../../_components/field-presentation/context'
import FieldSurface from '../../_components/field-presentation/FieldPresentation.vue'
import Input from '../../input'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const modes = ['popup'] as const
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('edit-mode public API', () => {
  it('exposes only editMode and rejects the removed inline value', () => {
    expect(fieldEditModeProp.validator('direct')).toBe(true)
    expect(fieldEditModeProp.validator('inline')).toBe(false)
    for (const component of [Form, FormItem, Input, Select]) {
      expect(component.props).toHaveProperty('editMode')
      expect(component.props).not.toHaveProperty('presentation')
    }
  })
  it('inherits edit-mode and lets items and fields override their ancestors', async () => {
    const wrapper = mount(Form, {
      props: { editMode: modes[0] },
      slots: {
        default: () => [
          h(FormItem, { label: 'Inherited' }, () => h(Input, { modelValue: 'One' })),
          h(FormItem, { label: 'Item override', editMode: 'direct' }, () => h(Input, { modelValue: 'Two' })),
          h(FormItem, { label: 'Field override' }, () => h(Input, { modelValue: 'Three', editMode: 'direct' })),
        ],
      },
    })
    wrappers.push(wrapper)
    expect(wrapper.findAll('.mp-field-presentation__reference')).toHaveLength(1)
    expect(wrapper.findAll('input')).toHaveLength(2)
    await wrapper.setProps({ editMode: 'direct' })
    expect(wrapper.findAll('.mp-field-presentation__reference')).toHaveLength(0)
    expect(wrapper.findAll('input')).toHaveLength(3)
  })
  it.each(modes)('keeps %s activation and independent readPretty behavior', async (editMode) => {
    const wrapper = mount(Input, { attachTo: document.body, props: { editMode, modelValue: 'Saved' } })
    wrappers.push(wrapper)
    const host = () => wrapper.getComponent(FieldSurface)
    expect(host().props('editMode')).toBe(editMode)
    if (String(editMode) === 'dblclick') {
      await wrapper.get('.mp-field-presentation__reference').trigger('click')
      await flushPromises()
      expect(host().props('open')).toBe(false)
    }
    await wrapper
      .get('.mp-field-presentation__reference')
      .trigger(String(editMode) === 'dblclick' ? 'dblclick' : 'click')
    await flushPromises()
    expect(host().props('open')).toBe(true)
    await wrapper.setProps({ readPretty: true })
    await flushPromises()
    expect(wrapper.get('.mp-field-presentation__read').text()).toBe('Saved')
    expect(wrapper.props('editMode')).toBe(editMode)
    await wrapper.setProps({ readPretty: false })
    expect(wrapper.find('.mp-field-presentation__reference').exists()).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
  it.each(modes)('opens a native Select editor once for %s without recursion', async (editMode) => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: { editMode, modelValue: 'a', options: [{ value: 'a', label: 'Alpha' }] },
    })
    wrappers.push(wrapper)
    await wrapper
      .get('.mp-field-presentation__reference')
      .trigger(String(editMode) === 'dblclick' ? 'dblclick' : 'click')
    await flushPromises()
    expect(wrapper.getComponent(FieldSurface).props('open')).toBe(true)
    await wrapper.setProps({ readPretty: true })
    await flushPromises()
    expect(wrapper.get('.mp-field-presentation__read').text()).toBe('Alpha')
  })
})
