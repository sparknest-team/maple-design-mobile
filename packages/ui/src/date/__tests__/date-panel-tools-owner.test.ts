import { defineComponent, nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DatePanel from '../DatePanel.vue'
import DateShortcuts from '../DateShortcuts.vue'

const Content = defineComponent({
  props: ['value', 'pickerValue'],
  emits: ['navigate', 'select', 'confirm'],
  template: '<div />',
})
describe('date panel tools owner wiring', () => {
  it('keeps shortcut preview out of model and commits only after confirmation', async () => {
    const shortcut = { label: 'next', value: '2025-02-01' }
    const wrapper = shallowMount(DatePanel, {
      props: { options: { modelValue: '2025-01-01', disableConfirm: false, shortcuts: [shortcut] } },
      global: { stubs: { DatePanelContent: Content } },
    })
    const shortcuts = wrapper.getComponent(DateShortcuts)
    const content = wrapper.getComponent(Content)
    shortcuts.vm.$emit('preview', shortcut)
    await nextTick()
    expect(content.props('value')).toBe('2025-02-01')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    shortcuts.vm.$emit('choose', shortcut)
    await nextTick()
    expect(wrapper.emitted('select-shortcut')?.[0]).toEqual([shortcut])
    expect(wrapper.emitted('change')).toBeUndefined()
    content.vm.$emit('confirm')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2025-02-01'])
    wrapper.unmount()
  })
  it('forwards controlled navigation without changing selection', async () => {
    const wrapper = shallowMount(DatePanel, {
      props: { options: { modelValue: '2025-01-15', pickerValue: '2025-01-01' } },
      global: { stubs: { DatePanelContent: Content } },
    })
    const content = wrapper.getComponent(Content)
    content.vm.$emit('navigate', '2025-02-01')
    await nextTick()
    expect(wrapper.emitted('update:pickerValue')?.[0]).toEqual(['2025-02-01'])
    expect(wrapper.emitted('picker-value-change')?.[0]).toEqual(['2025-02-01', new Date(2025, 1, 1), '2025-02-01'])
    expect(content.props('pickerValue')).toBe('2025-01-01')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('select')).toBeUndefined()
    wrapper.unmount()
  })
  it('rejects shortcuts changing a locked range endpoint', async () => {
    const wrapper = shallowMount(DatePanel, {
      props: {
        range: true,
        options: {
          modelValue: ['2025-01-01', '2025-01-10'],
          disabled: [true, false],
          shortcuts: [{ label: 'bad', value: ['2025-01-02', '2025-01-11'] }],
        },
      },
      global: { stubs: { DatePanelContent: Content } },
    })
    wrapper.getComponent(DateShortcuts).vm.$emit('choose', { label: 'bad', value: ['2025-01-02', '2025-01-11'] })
    await nextTick()
    expect(wrapper.emitted('select-shortcut')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
    wrapper.unmount()
  })
})
