import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import DateRange from '..'
import CalendarContent from '../../date/presentation/CalendarContent.vue'
import CalendarViewport from '../../date/presentation/CalendarViewport.vue'

for (const editMode of ['direct', 'popup'] as const) {
  for (const first of [0, 1]) {
    it(`${editMode}: keeps an initially empty ${first ? 'end' : 'start'} pending until the other endpoint is filled`, async () => {
      const owner = mount(DateRange, {
        attachTo: document.body,
        props: {
          modelValue: [],
          editMode,
          inputEditable: false,
          popupContainer: false,
          disableConfirm: false,
          dateRangePickerProps: { defaultPickerValue: ['2026-10-01', '2026-10-03'] },
        },
      })
      try {
        for (const index of [first, first ^ 1]) {
          await owner.findAll('input[role="combobox"]')[index].trigger('click')
          await flushPromises()
          if (index === 1) {
            await owner.findAll('.mp-date-range-picker__summary')[1].trigger('click')
          }
          await owner
            .findAll('.mp-day-picker__body button')
            .find((button) => button.text() === (index ? '3' : '1'))!
            .trigger('click')
          await flushPromises()
          const confirm = owner.findAll('button').find((button) => button.text() === '确认')!
          if (index === first) {
            expect(confirm.attributes('disabled')).toBeDefined()
            await confirm.trigger('click')
            await flushPromises()
            expect(owner.emitted('update:modelValue')).toBeUndefined()
            expect(owner.emitted('change')).toBeUndefined()
            continue
          }
          expect(confirm.attributes('disabled')).toBeUndefined()
          await confirm.trigger('click')
          await flushPromises()
          const value = owner.emitted('update:modelValue')?.at(-1)?.[0] as any
          expect(value[index]).toBe(index ? '2026-10-03' : '2026-10-01')
          await owner.setProps({ modelValue: value })
        }
        expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['2026-10-01', '2026-10-03'])
      } finally {
        owner.unmount()
        document.body.innerHTML = ''
      }
    }, 15000)
  }
}

for (const editMode of ['direct', 'popup'] as const) {
  for (const interactiveMode of ['page', 'scroll', 'line'] as const) {
    for (const showTime of [false, true]) {
      for (const endpoint of [0, 1]) {
        it(`${editMode}/${interactiveMode}/${showTime}/${endpoint}: edits only the opened endpoint`, async () => {
          const values = showTime ? ['2026-10-01 09:00:00', '2026-10-03 11:00:00'] : ['2026-10-01', '2026-10-03']
          const owner = mount(DateRange, {
            attachTo: document.body,
            props: {
              modelValue: values,
              editMode,
              interactiveMode,
              showTime,
              inputEditable: false,
              popupContainer: false,
              disableConfirm: false,
            },
          })
          try {
            await owner.findAll('input[role="combobox"]')[endpoint].trigger('click')
            await flushPromises()
            expect(owner.find('.mp-date-range-picker__summaries').exists()).toBe(true)
            expect(owner.findAll('.mp-date-range-picker__summary')[0].attributes('aria-pressed')).toBe('true')
            if (endpoint === 1) {
              await owner.findAll('.mp-date-range-picker__summary')[1].trigger('click')
              await flushPromises()
            }
            expect(owner.get('.mp-temporal-current__value').text()).toBe('2026-10-0' + (endpoint ? '3' : '1'))
            if (interactiveMode === 'page') {
              const calendar = owner.findComponent(CalendarContent)
              expect(calendar.props('range')).toBe(false)
              await owner
                .findAll('.mp-day-picker__body button')
                .find((button) => button.text() === '2')!
                .trigger('click')
            } else {
              const calendar = owner.findComponent(CalendarViewport)
              expect(calendar.props('range')).toBe(false)
              expect(calendar.props('modelValue')).toBe(values[endpoint].slice(0, 10))
              await owner.get('button[aria-label="2026-10-02"]').trigger('click')
            }
            await flushPromises()
            expect(owner.emitted('update:modelValue')).toBeUndefined()
            const confirm = owner.findAll('button').find((button) => button.text() === '确认')!
            expect(confirm.attributes('disabled')).toBeUndefined()
            await confirm.trigger('click')
            await flushPromises()
            const expected = [...values]
            expected[endpoint] = '2026-10-02' + (showTime ? (endpoint ? ' 11:00:00' : ' 09:00:00') : '')
            expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(expected)
          } finally {
            owner.unmount()
            document.body.innerHTML = ''
          }
        }, 15000)
      }
    }
  }
}

for (const editMode of ['direct', 'popup'] as const) {
  it(`${editMode}: keeps both summaries and reopens the end editor at the start month`, async () => {
    const owner = mount(DateRange, {
      attachTo: document.body,
      props: {
        modelValue: ['2026-09-12', '2026-11-20'],
        defaultPickerValue: ['2026-08-01', '2026-09-01'],
        editMode,
        inputEditable: false,
        popupContainer: false,
        disableConfirm: false,
      },
    })
    try {
      for (let attempt = 0; attempt < 2; attempt++) {
        await owner.findAll('input[role="combobox"]')[1].trigger('click')
        await flushPromises()
        expect(owner.findAll('.mp-date-range-picker__summary-date').map((node) => node.text())).toEqual([
          '2026-09-12',
          '2026-11-20',
        ])
        expect(owner.get('.mp-date-picker-header__value').text()).toBe('2026 九月')
        expect(owner.findAll('.mp-date-range-picker__summary')[0].attributes('aria-pressed')).toBe('true')
        await owner.findAll('.mp-date-range-picker__summary')[1].trigger('click')
        await flushPromises()
        expect(owner.get('.mp-date-picker-header__value').text()).toBe('2026 十一月')
        expect(owner.emitted('update:modelValue')).toBeUndefined()
        if (editMode === 'direct') {
          await owner.findAll('input[role="combobox"]')[1].trigger('keydown', { key: 'Escape' })
        } else {
          await owner
            .findAll('button')
            .find((button) => button.text() === '×')!
            .trigger('click')
        }
        await flushPromises()
      }
    } finally {
      owner.unmount()
      document.body.innerHTML = ''
    }
  }, 15000)
}
