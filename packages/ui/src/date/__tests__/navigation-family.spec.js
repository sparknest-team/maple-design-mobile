import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import Date, { DatePicker } from '..'
import DateRange, { DateRangePicker } from '../../date-range'
import { rangeControls } from './range-controls'

const Surface = { template: '<div><slot /><slot name="content" /></div>' }
// This suite exercises calendar viewport ownership. Recreating hundreds of wheel
// options at every view switch adds no navigation coverage; real wheels are
// exercised by the paired-panel and mobile-range regression suites.
const global = { stubs: { MpTrigger: Surface, Dialog: Surface, MpPicker: true, teleport: true } }
const variants = [
  { name: 'date', type: 'date' },
  { name: 'month', type: 'month' },
  { name: 'year', type: 'year' },
  {
    name: 'datetime-minute',
    type: 'date',
    showTime: true,
    timeFields: ['hour', 'minute'],
    format: 'YYYY-MM-DD HH:mm',
    valueFormat: 'YYYY-MM-DD HH:mm',
  },
  { name: 'datetime-second', type: 'date', showTime: true },
]
function values(options) {
  if (options.type === 'year') {
    return ['2026', '2028']
  }
  if (options.type === 'month') {
    return ['2026-10', '2028-02']
  }
  const suffix = options.showTime ? (options.valueFormat !== 'YYYY-MM-DD HH:mm' ? ' 09:30:12' : ' 09:30') : ''
  return [`2026-10-19${suffix}`, `2028-02-25${suffix}`]
}
function fixture(range, editMode, options, modelValue = range ? values(options) : values(options)[0]) {
  return mount(editMode === 'standalone' ? (range ? DateRangePicker : DatePicker) : range ? DateRange : Date, {
    props: {
      ...options,
      modelValue,
      disableConfirm: false,
      ...(editMode === 'standalone' ? {} : { editMode, open: true }),
    },
    global,
  })
}
const title = (wrapper) => wrapper.get('.mp-date-picker-header__value').text()
async function pageRoundTrip(wrapper) {
  const before = title(wrapper)
  await wrapper.findAll('.mp-date-picker-header__arrow')[1].trigger('click')
  expect(title(wrapper)).not.toBe(before)
  await wrapper.findAll('.mp-date-picker-header__arrow')[0].trigger('click')
  expect(title(wrapper)).toBe(before)
}
async function navigate(wrapper, type) {
  await pageRoundTrip(wrapper)
  if (type === 'year') {
    return
  }
  await wrapper.get('.mp-date-picker-header__value').trigger('click')
  if (type === 'date') {
    expect(wrapper.find('.mp-month-picker').exists()).toBe(true)
    await pageRoundTrip(wrapper)
    await wrapper.get('.mp-date-picker-header__value').trigger('click')
  }
  expect(wrapper.find('.mp-year-picker').exists()).toBe(true)
  await pageRoundTrip(wrapper)
  await wrapper
    .findAll('.mp-year-picker button')
    .find((button) => button.text() === '2027')
    .trigger('click')
  expect(title(wrapper)).toContain('2027')
  if (type === 'date') {
    await wrapper.findAll('.mp-month-picker li button')[2].trigger('click')
    expect(title(wrapper)).toBe('2027 三月')
  }
  await pageRoundTrip(wrapper)
}

// Keep each full user journey sequential, but give every navigation step its
// own assertion boundary instead of timing dozens of Vue renders as one test.
for (const range of [false, true]) {
  for (const editMode of ['standalone', 'direct', 'popup']) {
    for (const { name, ...options } of variants) {
      describe(`${range ? 'range' : 'single'} ${name} ${editMode} navigation`, () => {
        let wrapper
        beforeAll(() => {
          wrapper = fixture(range, editMode, options)
        })
        afterAll(() => {
          wrapper?.unmount()
        })
        const expectPending = () => {
          expect(wrapper.emitted('select')).toBeUndefined()
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        }
        it('navigates every calendar level without selecting', async () => {
          await navigate(wrapper, options.type)
          expectPending()
        })
        if (range) {
          for (const [step, endpoint] of [1, 0, 1].entries()) {
            it(`switches to endpoint ${endpoint} at step ${step + 1} and retains its viewport`, async () => {
              await rangeControls(wrapper)[endpoint].trigger('click')
              const year = endpoint === 0 ? '2026' : '2028'
              if (options.type === 'year') {
                expect(title(wrapper)).toBe('2000 ~ 2099')
              } else {
                expect(title(wrapper)).toBe(
                  options.type === 'month' ? year : `${year} ${endpoint === 0 ? '十月' : '二月'}`,
                )
              }
              if (options.showTime) {
                await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
                await wrapper.get('.mp-date-range-picker__view-toggle').trigger('click')
              }
              await navigate(wrapper, options.type)
              expectPending()
            })
          }
          it('selects only the current end and retains the pending range', async () => {
            expectPending()
            if (options.type === 'year') {
              await wrapper
                .findAll('.mp-year-picker button')
                .find((button) => button.text() === '2027')
                .trigger('click')
            } else if (options.type === 'month') {
              await wrapper.findAll('.mp-month-picker li button')[2].trigger('click')
            } else {
              await wrapper
                .findAll('.mp-day-picker button')
                .find((button) => button.text() === '15')
                .trigger('click')
            }
            const end =
              options.type === 'year'
                ? '2027'
                : options.type === 'month'
                  ? '2027-03'
                  : `2027-03-15${options.showTime ? (options.valueFormat !== 'YYYY-MM-DD HH:mm' ? ' 09:30:12' : ' 09:30') : ''}`
            expect(wrapper.emitted('select').at(-1)[0]).toEqual([values(options)[0], end])
            expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          })
        }
      })
    }
  }
}

describe('same-year range endpoints', () => {
  for (const editMode of ['standalone', 'direct', 'popup']) {
    it(`${editMode} returns to the endpoint century after paging and switching equal years`, async () => {
      const wrapper = fixture(true, editMode, { type: 'year' }, ['2026', '2026'])
      try {
        await wrapper.findAll('.mp-date-picker-header__arrow')[1].trigger('click')
        expect(title(wrapper)).toBe('2100 ~ 2199')
        await rangeControls(wrapper)[1].trigger('click')
        expect(title(wrapper)).toBe('2000 ~ 2099')
        await pageRoundTrip(wrapper)
        expect(wrapper.emitted('select')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  }
})
