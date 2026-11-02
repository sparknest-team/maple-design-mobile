import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Time from '..'
import Picker from '../../picker/Picker.vue'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../TimePicker.vue'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
const global = { stubs: { MpTrigger: Surface, teleport: true } }

for (const mode of ['standalone', 'direct', 'popup'] as const) {
  for (const range of [false, true]) {
    it(`${mode} range=${range} stages the visible bounded candidate without selection or commit`, async () => {
      const component: Component =
        mode === 'standalone' ? (range ? TimeRangePicker : TimePicker) : range ? TimeRange : Time
      const owner = mount(component, {
        props: {
          modelValue: range ? [] : undefined,
          min: '09:30:00',
          max: '10:30:00',
          format: 'HH:mm:ss',
          timeFields: ['minute', 'hour'],
          disableConfirm: false,
          ...(mode === 'standalone' ? {} : { editMode: mode, open: true }),
        },
        global,
      })
      try {
        await flushPromises()
        expect(owner.getComponent(Picker).props('modelValue')).toEqual(range ? ['30', '09', '30', '09'] : ['30', '09'])
        expect(owner.emitted('select')).toBeUndefined()
        expect(owner.emitted('update:modelValue')).toBeUndefined()
        const confirm = owner.findAll('button').find((button) => button.text() === '确认')!
        expect(confirm.attributes('disabled')).toBeUndefined()
        await confirm.trigger('click')
        await flushPromises()
        expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(range ? ['09:30:00', '09:30:00'] : '09:30:00')
      } finally {
        owner.unmount()
      }
    })
  }
}

it('does not enable confirmation when no valid time exists', async () => {
  const owner = mount(TimePicker, {
    props: { disabledHours: () => Array.from({ length: 24 }, (_, index) => index), disableConfirm: false },
  })
  try {
    await flushPromises()
    expect(
      owner
        .findAll('button')
        .find((button) => button.text() === '确认')!
        .attributes('disabled'),
    ).toBeDefined()
    expect(owner.emitted('draft-initialize')).toBeUndefined()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})

it('retains an existing range endpoint while initializing the missing endpoint', async () => {
  const owner = mount(TimeRangePicker, { props: { modelValue: [undefined, '10:15:17'] as any, disableConfirm: false } })
  try {
    await flushPromises()
    expect(owner.emitted('draft-initialize')?.at(-1)?.[0]).toEqual(['10:15:17', '10:15:17'])
    expect(owner.emitted('select')).toBeUndefined()
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
