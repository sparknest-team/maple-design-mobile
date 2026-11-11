import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import CalendarViewport from '../presentation/CalendarViewport.vue'

it('bounds rendered months over a century and maps distant scrolling to navigation only', async () => {
  const owner = mount(CalendarViewport, {
    props: {
      mode: 'scroll',
      useVirtualScroll: true,
      min: '2000-01-01',
      max: '2099-12-31',
      pickerValue: '2026-11-01',
      onNavigate: (value: string | string[]) => {
        void owner.setProps({ pickerValue: value })
      },
    },
  })
  await flushPromises()
  expect(owner.attributes('data-total-months')).toBe('1200')
  expect(owner.findAll('[data-month]').length).toBeLessThanOrEqual(4)
  const element = owner.get('.mp-calendar-viewport__scroll')
  element.element.scrollTop = 900 * 320
  await element.trigger('scroll')
  await nextTick()
  expect(owner.findAll('[data-month]').length).toBeLessThanOrEqual(4)
  expect(owner.find('[data-month="2075-01"]').exists()).toBe(true)
  expect(owner.emitted('select')).toBeUndefined()
  expect(owner.emitted('navigate')?.at(-1)).toEqual(['2075-01-01'])
  owner.unmount()
})
it('line mode obeys week start, limits, selected state and readonly while navigation does not commit', async () => {
  const owner = mount(CalendarViewport, {
    props: {
      mode: 'line',
      pickerValue: '2026-11-04',
      modelValue: '2026-11-04',
      min: '2026-11-01',
      max: '2026-11-30',
      dayStartOfWeek: 1,
    },
  })
  expect(owner.findAll('[aria-pressed]')).toHaveLength(7)
  expect(owner.get('[aria-label="2026-11-04"]').attributes('aria-pressed')).toBe('true')
  await owner.get('[aria-label="下一周"], [aria-label="Next week"]').trigger('click')
  expect(owner.emitted('navigate')?.[0]).toEqual(['2026-11-11'])
  expect(owner.emitted('select')).toBeUndefined()
  await owner.get('[aria-label="2026-11-05"]').trigger('click')
  expect(owner.emitted('select')?.[0]).toEqual(['2026-11-05'])
  await owner.setProps({ readonly: true })
  expect(owner.get('[aria-label="2026-11-05"]').attributes('disabled')).toBeDefined()
  owner.unmount()
})
it('range and multiple keep their selection protocol', async () => {
  const owner = mount(CalendarViewport, {
    props: { mode: 'line', pickerValue: '2026-11-04', modelValue: ['2026-11-05'], range: true },
  })
  await owner.get('[aria-label="2026-11-03"]').trigger('click')
  expect(owner.emitted('select')?.[0]).toEqual([['2026-11-03', '2026-11-05']])
  await owner.setProps({ range: false, multiple: true })
  await owner.get('[aria-label="2026-11-05"]').trigger('click')
  expect(owner.emitted('select')?.at(-1)).toEqual([[]])
  owner.unmount()
})

it('separates weekday labels from date buttons and names the visible week across month and year boundaries', async () => {
  const owner = mount(CalendarViewport, {
    props: { mode: 'line', pickerValue: '2026-11-02', modelValue: '2026-11-02', dayStartOfWeek: 0 },
  })
  try {
    expect(owner.get('.mp-calendar-viewport__period').text()).toBe('2026.11.01 – 07')
    expect(owner.findAll('.mp-calendar-viewport__weekdays span')).toHaveLength(7)
    expect(owner.findAll('.mp-calendar-viewport__grid button')).toHaveLength(7)
    expect(owner.findAll('button small')).toHaveLength(0)
    expect(owner.get('[aria-label="2026-11-02"] .mp-calendar-viewport__day-value').text()).toBe('2')
    await owner.setProps({ pickerValue: '2026-11-30' })
    expect(owner.get('.mp-calendar-viewport__period').text()).toBe('2026.11.29 – 12.05')
    await owner.setProps({ pickerValue: '2026-12-31' })
    expect(owner.get('.mp-calendar-viewport__period').text()).toBe('2026.12.27 – 2027.01.02')
    expect(owner.emitted('select')).toBeUndefined()
  } finally {
    owner.unmount()
  }
})
