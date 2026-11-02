import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Cascader from '../../cascader'
import DateField from '../../date'
import DateRange from '../../date-range'
import Select from '../../select'
import Time from '../../time'
import TimeRange from '../../time-range'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))
const cases = [
  ['date', DateField, { modelValue: '2026-10-27', inputEditable: true }],
  ['date-range', DateRange, { modelValue: ['2026-10-27', '2026-10-28'], inputEditable: true }],
  ['time', Time, { modelValue: '09:30:00', inputEditable: true }],
  ['time-range', TimeRange, { modelValue: ['09:30:00', '10:30:00'], inputEditable: true }],
  ['select', Select, { filterable: true, options: [{ value: 'a', label: 'Alpha' }] }],
  ['cascader', Cascader, { filterable: true, options: [{ value: 'a', label: 'Alpha' }] }],
] as const
for (const [name, Component, extra] of cases) {
  describe(name + ' open-trigger-target', () => {
    it('edits or selects input without opening, opens from the icon, and allows controlled open', async () => {
      const wrapper = mount(Component as any, {
        props: { editMode: 'direct', openTriggerTarget: 'icon', ...extra },
      })
      wrappers.push(wrapper)
      const input = wrapper.get('input')
      await input.trigger('focus')
      await input.trigger('click')
      if (name === 'select' || name === 'cascader') {
        await input.setValue('Al')
      }
      await flushPromises()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      await wrapper.get('[data-field-open-trigger]').trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:open')?.some((args) => args[0] === true)).toBe(true)
      await wrapper.setProps({ open: false })
      await wrapper.setProps({ open: true })
      expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    })
    if (['date', 'date-range', 'time', 'time-range'].includes(name)) {
      it('commits unfinished text before opening from the icon', async () => {
        const { modelValue: initial, ...rest } = extra as Record<string, unknown>
        const wrapper = mount(Component as any, {
          props: { ...rest, defaultValue: initial, editMode: 'direct', openTriggerTarget: 'icon' },
        })
        wrappers.push(wrapper)
        const text = name.startsWith('time') ? '09:45:23' : '2026-10-28'
        await wrapper.get('input').setValue(text)
        await wrapper.get('[data-field-open-trigger]').trigger('click')
        await flushPromises()
        const expected = Array.isArray(initial) ? [text, initial[1]] : text
        expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(expected)
        expect(wrapper.get('input').element.value).toBe(text)
        expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
      })
    }
    it('keeps the existing explicit keyboard open command in icon mode', async () => {
      const wrapper = mount(Component as any, {
        props: { editMode: 'direct', openTriggerTarget: 'icon', ...extra },
      })
      wrappers.push(wrapper)
      const key = ['select', 'cascader'].includes(name) ? 'Enter' : 'ArrowDown'
      await wrapper.get('input').trigger('keydown', { key, code: key, keyCode: key === 'Enter' ? 13 : 40 })
      await flushPromises()
      expect(wrapper.emitted('update:open')?.some((args) => args[0] === true)).toBe(true)
    })
    it('clears an existing value without opening a closed panel', async () => {
      const selection = ['select', 'cascader', 'tree-select'].includes(name)
      const wrapper = mount(Component as any, {
        props: {
          editMode: 'direct',
          openTriggerTarget: 'icon',
          ...extra,
          ...(selection ? { modelValue: 'a' } : {}),
          clearable: true,
        },
      })
      wrappers.push(wrapper)
      await wrapper.get('[class*="field-decorator__clear-btn"]').trigger('click')
      await flushPromises()
      expect(wrapper.emitted('update:open')?.some((args) => args[0] === true) ?? false).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
    it('keeps disabled and readonly trigger buttons blocked', async () => {
      for (const blocked of [{ disabled: true }, { readonly: true }]) {
        const wrapper = mount(Component as any, {
          props: { editMode: 'direct', openTriggerTarget: 'icon', ...extra, ...blocked },
        })
        wrappers.push(wrapper)
        expect(wrapper.get('[data-field-open-trigger]').attributes('disabled')).toBeDefined()
        await wrapper.get('[data-field-open-trigger]').trigger('click')
        expect(wrapper.emitted('update:open')).toBeUndefined()
      }
    })
  })
}
