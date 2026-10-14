import { defineComponent, nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import DateField from '../DateField.vue'
import DatePanel from '../DatePanel.vue'
import type { DateFieldState } from '../field-state'

const FieldStub = defineComponent({ name: 'DateContentStub', props: ['state'], template: '<div />' })
const PanelStub = defineComponent({
  name: 'DatePanelStub',
  props: ['value', 'canConfirm'],
  emits: ['select', 'confirm'],
  template: '<div />',
})

describe('date family owner integration', () => {
  function mountField(fieldProps = {}, range = false) {
    const wrapper = shallowMount(DateField, {
      props: { fieldProps, range },
      global: { stubs: { DateFieldContent: FieldStub } },
    })
    const state = wrapper.getComponent(FieldStub).props('state') as DateFieldState
    return { wrapper, state }
  }
  it('handles defaults, formatted display, draft select, confirm and event payloads', async () => {
    const { wrapper, state } = mountField({ defaultValue: '2025-01-01', format: 'DD/MM/YYYY' })
    expect(state.controlProps.value.texts).toEqual(['01/01/2025'])
    state.setOpen(true)
    await nextTick()
    state.select('2025-01-02')
    expect(wrapper.emitted('change')).toBeUndefined()
    state.confirm()
    await nextTick()
    expect(wrapper.emitted('change')?.[0]).toEqual(['2025-01-02', new Date(2025, 0, 2), '02/01/2025'])
    expect(state.open.value).toBe(false)
    expect(state.controlProps.value.texts).toEqual(['02/01/2025'])
    wrapper.unmount()
  })
  it('cancels even when readonly changes while open, and never submits canceled drafts', async () => {
    const { wrapper, state } = mountField({ modelValue: '2025-01-01', defaultOpen: true })
    state.select('2025-01-02')
    await wrapper.setProps({ fieldProps: { modelValue: '2025-01-01', readonly: true } })
    state.cancel()
    await nextTick()
    expect(state.open.value).toBe(false)
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(state.draft.value).toBe('2025-01-01')
    wrapper.unmount()
  })
  it('validates keyboard input with the same rules and serializes timestamps', () => {
    const { wrapper, state } = mountField({ valueFormat: 'timestamp', format: 'DD/MM/YYYY', min: new Date(2025, 0, 1) })
    state.commitText(['31/02/2025'])
    state.commitText(['31/12/2024'])
    expect(wrapper.emitted('change')).toBeUndefined()
    state.commitText(['02/01/2025'])
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(new Date(2025, 0, 2).getTime())
    wrapper.unmount()
  })
  it('notifies leaving the input even while the popup is open, without stale focus', () => {
    const { wrapper, state } = mountField({ defaultOpen: true })
    state.focus()
    state.blur()
    state.blur()
    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toHaveLength(1)
    expect(state.controlProps.value.focused).toBe(false)
    wrapper.unmount()
  })
  it('range clear emits an empty array and clear has no payload', () => {
    const { wrapper, state } = mountField({ modelValue: ['2025-01-01', '2025-01-02'], clearable: true }, true)
    expect(state.clear()).toBe(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    expect(wrapper.emitted('clear')?.[0]).toEqual([])
    wrapper.unmount()
  })
  for (const range of [false, true]) {
    it(`starts a fresh selection after controlled close is rejected (range=${range})`, () => {
      const initial = range ? ['2025-01-01', '2025-01-03'] : '2025-01-01'
      const first = range ? ['2025-01-02', '2025-01-04'] : '2025-01-02'
      const second = range ? ['2025-01-05', '2025-01-07'] : '2025-01-05'
      const { wrapper, state } = mountField({ modelValue: initial, open: true }, range)
      expect(state.select(first)).toBe(true)
      expect(state.confirm()).toBe(true)
      expect(state.confirm()).toBe(false)
      expect(state.open.value).toBe(true)
      expect(state.select(second)).toBe(true)
      expect(state.confirm()).toBe(true)
      expect(state.confirm()).toBe(false)
      expect(wrapper.emitted('change')?.map(([value]) => value)).toEqual([first, second])
      expect(wrapper.emitted('update:open')).toHaveLength(2)
      expect(state.open.value).toBe(true)
      wrapper.unmount()
    })
    it(`does not retry close when the parent echoes a committed model (range=${range})`, async () => {
      const initial = range ? ['2025-01-01', '2025-01-03'] : '2025-01-01'
      const first = range ? ['2025-01-02', '2025-01-04'] : '2025-01-02'
      const second = range ? ['2025-01-05', '2025-01-07'] : '2025-01-05'
      const { wrapper, state } = mountField({ modelValue: initial, open: true }, range)
      state.select(first)
      expect(state.confirm()).toBe(true)
      await wrapper.setProps({ fieldProps: { modelValue: first, open: true } })
      expect(state.confirm()).toBe(false)
      expect(wrapper.emitted('update:open')).toHaveLength(1)
      state.select(second)
      expect(state.confirm()).toBe(true)
      expect(wrapper.emitted('change')?.map(([value]) => value)).toEqual([first, second])
      expect(wrapper.emitted('update:open')).toHaveLength(2)
      wrapper.unmount()
    })
  }
  it('pure panels can preview then confirm and reject blocked candidates', async () => {
    const wrapper = shallowMount(DatePanel, {
      props: { options: { modelValue: '2025-01-01', disableConfirm: false, max: '2025-01-03' } },
      global: { stubs: { DatePanelContent: PanelStub } },
    })
    const panel = wrapper.getComponent(PanelStub)
    panel.vm.$emit('select', '2025-01-04')
    expect(wrapper.emitted('select')).toBeUndefined()
    panel.vm.$emit('select', '2025-01-02')
    await nextTick()
    expect(panel.props('value')).toBe('2025-01-02')
    expect(wrapper.emitted('change')).toBeUndefined()
    panel.vm.$emit('confirm')
    panel.vm.$emit('confirm')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    wrapper.unmount()
  })
})
