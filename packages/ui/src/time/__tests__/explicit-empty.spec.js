import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Time from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../TimePicker.vue'
import { panelState } from './panel-test-utils'

const action = (panel, pattern) => panel.findAll('footer button').find((button) => pattern.test(button.text()))
describe('Explicit empty time draft survives visible panel initialization', () => {
  for (const [name, Field, initial] of [
    ['single', Time, '09:30'],
    ['range', TimeRange, ['09:30', '18:00']],
  ]) {
    test(name + ' can clear to null and confirm once', async () => {
      const w = mount(Field, {
        props: { editMode: 'popup', defaultValue: initial, emptyValue: null, clearable: true, format: 'HH:mm' },
      })
      try {
        await w.get('[aria-haspopup="dialog"]').trigger('click')
        await flushPromises()
        const panel = w.getComponent(EditorPanel)
        await action(panel, /清空|清除|Clear/).trigger('click')
        await flushPromises()
        expect(w.emitted('update:modelValue')).toBeUndefined()
        const confirm = action(panel, /确定|确认|Confirm|OK/)
        expect(confirm.attributes('disabled')).toBeUndefined()
        await confirm.trigger('click')
        await flushPromises()
        expect(w.emitted('update:modelValue')).toEqual([[null]])
        expect(w.emitted('change')).toHaveLength(1)
        expect(w.emitted('change')[0][0]).toBe(null)
        await w.get('[aria-haspopup="dialog"]').trigger('click')
        await flushPromises()
        await w
          .getComponent(EditorPanel)
          .findAll('button')
          .find((button) => button.text() === '×')
          .trigger('click')
        await flushPromises()
        expect(w.emitted('update:modelValue')).toEqual([[null]])
        await w.get('[aria-haspopup="dialog"]').trigger('click')
        await flushPromises()
        const emptyPanel = w.getComponent(EditorPanel)
        await action(emptyPanel, /清空|清除|Clear/).trigger('click')
        await flushPromises()
        const unchangedConfirm = action(emptyPanel, /确定|确认|Confirm|OK/)
        expect(unchangedConfirm.attributes('disabled')).toBeUndefined()
        await unchangedConfirm.trigger('click')
        await flushPromises()
        expect(w.get('[aria-haspopup="dialog"]').attributes('aria-expanded')).toBe('false')
        expect(w.emitted('update:modelValue')).toEqual([[null]])
      } finally {
        w.unmount()
      }
    })
  }
})

describe('Mobile wheel candidate initialization is per panel lifetime', () => {
  for (const [name, Panel, initial] of [
    ['single', TimePicker, '09:30'],
    ['range', TimeRangePicker, ['09:30', '18:00']],
  ]) {
    test(name + ' does not reinitialize an externally cleared existing candidate', async () => {
      const w = mount(Panel, { props: { modelValue: initial, format: 'HH:mm' } })
      try {
        await flushPromises()
        await w.setProps({ modelValue: null })
        await flushPromises()
        await w.setProps({ step: { minute: 15 } })
        await flushPromises()
        expect(panelState(w).draft).toBe(null)
        expect(w.emitted('draft-initialize')).toBeUndefined()
        expect(w.emitted('select')).toBeUndefined()
        expect(w.emitted('change')).toBeUndefined()
      } finally {
        w.unmount()
      }
    })
    test(name + ' initializes an empty new panel once without publishing a model', async () => {
      const w = mount(Panel, { props: { modelValue: null, format: 'HH:mm' } })
      try {
        await flushPromises()
        expect(w.emitted('draft-initialize')).toHaveLength(1)
        expect(w.emitted('update:modelValue')).toBeUndefined()
        await w.setProps({ modelValue: initial })
        await w.setProps({ modelValue: null })
        await flushPromises()
        expect(panelState(w).draft).toBe(null)
        expect(w.emitted('draft-initialize')).toHaveLength(1)
      } finally {
        w.unmount()
      }
    })
  }
})
