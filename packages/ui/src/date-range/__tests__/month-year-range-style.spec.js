import { flushPromises, mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import DatePanel from '../../date/DatePanel.vue'
import { rangeRendererKey } from '../../date/range-renderer'
import RangeContent from '../presentation/RangeContent.vue'

const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
beforeAll(() => Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() }))
afterAll(() => {
  if (scrollDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', scrollDescriptor)
  } else {
    delete HTMLElement.prototype.scrollIntoView
  }
})

const pc = false
for (const type of ['month', 'year']) {
  const prefix = pc ? 'c-picker-cell' : `mp-${type}-picker__range`
  const initial = type === 'month' ? ['2026-03', '2026-05'] : ['2024', '2026']
  const format = type === 'month' ? 'YYYY-MM' : 'YYYY'
  async function fixture(extra = {}) {
    const wrapper = mount(DatePanel, {
      global: { provide: { [rangeRendererKey]: RangeContent } },
      props: {
        range: true,
        options: {
          type,
          modelValue: [],
          pickerValue: initial,
          valueFormat: format,
          disableConfirm: true,
          presentation: 'calendar',
          ...extra,
        },
      },
    })
    await flushPromises()
    const cells = () =>
      wrapper
        .findAll(pc ? '.c-picker-cell-in-view' : `.mp-${type}-picker li`)
        .filter((node) => node.find('button, [role=button]').exists() || (pc && node.attributes('role') === 'button'))
    const cell = (value) =>
      type === 'month' ? cells()[value - 1] : cells().find((node) => node.text() === String(value))
    const click = async (value) => {
      const node = cell(value)
      await (pc ? node : node.get('button')).trigger('click')
      await flushPromises()
    }
    const hover = async (value) => {
      await cell(value).trigger(pc ? 'mouseenter' : 'pointerenter', { pointerType: 'mouse' })
      await flushPromises()
    }
    const count = (part) =>
      wrapper.findAll(
        pc
          ? `.c-picker-cell-${part}`
          : `.${prefix}${part === 'in-range' ? '' : part === 'hover-in-range' ? '--preview' : part === 'range-start' ? '--start' : '--end'}`,
      ).length
    const leave = async () => {
      await wrapper
        .get(pc ? '.c-picker-range-wrapper' : type === 'month' ? '.mp-month-picker ul' : 'ul.mp-year-picker')
        .trigger(pc ? 'mouseleave' : 'pointerleave')
      await flushPromises()
    }
    return { wrapper, cell, click, hover, count, leave }
  }
  for (const reverse of [false, true]) {
    test(`${type} ${reverse ? 'reverse' : 'forward'} selection only highlights the active endpoint without range bands`, async () => {
      const f = await fixture()
      try {
        expect(f.count('in-range')).toBe(0)
        const a = type === 'month' ? 6 : 2026,
          b = type === 'month' ? 8 : 2028
        await f.click(reverse ? b : a)
        const before = f.wrapper.emitted('select')?.length
        await f.hover(reverse ? a : b)
        expect(f.count('hover-in-range')).toBe(0)
        expect(f.wrapper.emitted('select')?.length).toBe(before)
        expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
        await f.leave()
        expect(f.count('hover-in-range')).toBe(0)
        await f.wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
        await f.click(reverse ? a : b)
        expect(f.count('in-range')).toBe(0)
        expect(f.count('range-start')).toBe(0)
        expect(f.count('range-end')).toBe(0)
        if (!pc) {
          expect(
            f
              .cell(reverse ? b : a)
              .get('button')
              .classes(),
          ).not.toContain('mp-button--status-primary')
          expect(
            f
              .cell(a + 1)
              .get('button')
              .classes(),
          ).not.toContain('mp-button--status-primary')
          expect(
            f
              .cell(reverse ? a : b)
              .get('button')
              .classes(),
          ).toContain('mp-button--status-primary')
        }
        const candidate = f.wrapper.emitted('select').at(-1)[0]
        const expected = type === 'month' ? ['2026-06', '2026-08'] : ['2026', '2028']
        expect(candidate).toEqual(reverse ? expected.reverse() : expected)
        expect(f.wrapper.find('[role=alert]').exists()).toBe(reverse)
      } finally {
        f.wrapper.unmount()
      }
    })
  }
  for (const restriction of ['disabled', 'readonly']) {
    test(`${type} ${restriction} blocks selection and hover`, async () => {
      const f = await fixture({ [restriction]: true })
      try {
        const value = type === 'month' ? 8 : 2028
        await f.hover(value)
        await f.click(value)
        expect(f.count('hover-in-range')).toBe(0)
        expect(f.wrapper.emitted('select')).toBeUndefined()
        expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        f.wrapper.unmount()
      }
    })
  }
  test(`${type} same endpoint is one cell with both boundary styles`, async () => {
    const f = await fixture()
    try {
      const value = type === 'month' ? 6 : 2026
      await f.click(value)
      await f.wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
      await f.click(value)
      expect(f.count('in-range')).toBe(0)
      expect(f.count('range-start')).toBe(0)
      expect(f.count('range-end')).toBe(0)
    } finally {
      f.wrapper.unmount()
    }
  })
  for (const restriction of ['disabled', 'readonly']) {
    test(`${type} becoming ${restriction} clears a pending preview and blocks further changes`, async () => {
      const f = await fixture()
      try {
        const a = type === 'month' ? 6 : 2026,
          b = type === 'month' ? 8 : 2028
        await f.click(a)
        await f.hover(b)
        expect(f.count('hover-in-range')).toBe(0)
        const count = f.wrapper.emitted('select')?.length
        await f.wrapper.setProps({ options: { ...f.wrapper.props('options'), [restriction]: true } })
        await flushPromises()
        expect(f.count('hover-in-range')).toBe(0)
        await f.hover(b)
        await f.click(b)
        expect(f.wrapper.emitted('select')?.length).toBe(count)
        expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        f.wrapper.unmount()
      }
    })
  }
  test(`${type} disabled endpoint cannot preview or finish a range`, async () => {
    const f = await fixture({
      disabledDate: (date) => (type === 'month' ? date.getMonth() === 7 : date.getFullYear() === 2028),
    })
    try {
      await f.click(type === 'month' ? 6 : 2026)
      const count = f.wrapper.emitted('select')?.length
      await f.hover(type === 'month' ? 7 : 2027)
      expect(f.count('hover-in-range')).toBe(0)
      await f.hover(type === 'month' ? 8 : 2028)
      await f.click(type === 'month' ? 8 : 2028)
      expect(f.count('hover-in-range')).toBe(0)
      expect(f.wrapper.emitted('select')?.length).toBe(count)
    } finally {
      f.wrapper.unmount()
    }
  })
}
