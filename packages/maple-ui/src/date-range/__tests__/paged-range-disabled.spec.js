import { flushPromises, mount } from '@vue/test-utils'
import { afterAll, beforeAll, expect, test, vi } from 'vitest'
import DatePanel from '../../date/DatePanel.vue'

const pc = false
const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollIntoView')
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() })
})
afterAll(() => {
  if (scrollDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', scrollDescriptor)
  } else {
    delete HTMLElement.prototype.scrollIntoView
  }
})
const cases = [
  ['cross-month', 'date', ['2026-10-29', '2026-11-03'], '2026-11-01', 29, 3, 1],
  ['cross-year', 'date', ['2026-12-29', '2027-01-03'], '2027-01-01', 29, 3, 1],
  ['cross-year', 'month', ['2026-11', '2027-02'], '2027-01', 11, 2, 1],
  ['cross-century', 'year', ['2098', '2102'], '2100', 2098, 2102, 2100],
]
for (const [name, type, values, blocked, start, end, disabled] of cases) {
  const format = type === 'date' ? 'YYYY-MM-DD' : type === 'month' ? 'YYYY-MM' : 'YYYY'
  for (const reverse of [false, true]) {
    test(`${name} ${type} ${reverse ? 'reverse' : 'forward'} pages preserve the draft and allow disabled interior units`, async () => {
      const wrapper = mount(DatePanel, {
        props: {
          range: true,
          options: {
            modelValue: [],
            defaultPickerValue: values,
            type,
            valueFormat: format,
            presentation: 'calendar',
            disableConfirm: false,
            disabledDate: (date) => {
              const value =
                type === 'date'
                  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                  : type === 'month'
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
                    : String(date.getFullYear())
              return value === blocked
            },
          },
        },
      })
      await flushPromises()
      const cells = () =>
        wrapper
          .findAll(pc ? '.c-picker-cell-in-view' : `.mp-${type === 'date' ? 'day' : type}-picker li`)
          .filter((node) => pc || node.find('button').exists())
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
      const page = async (next) => {
        const root = pc ? wrapper : wrapper.get('.mp-date-picker-header')
        const button = root
          .findAll('button')
          .find(
            (node) =>
              node.attributes('disabled') === undefined &&
              (next ? /下|next/i : /上|previous/i).test(node.attributes('aria-label') || ''),
          )
        await button.trigger('click')
        await flushPromises()
      }
      try {
        if (reverse) {
          await page(true)
        }
        await click(reverse ? end : start)
        const count = wrapper.emitted('select')?.length
        // A preview must not remain after navigation; navigation never publishes a selection.
        await hover(reverse ? end : start)
        await page(!reverse)
        expect(wrapper.findAll(pc ? '.c-picker-cell-hover-in-range' : `[class*="__range--preview"]`)).toHaveLength(0)
        expect(wrapper.emitted('select')?.length).toBe(count)
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        if (!reverse) {
          await hover(disabled)
          await click(disabled)
          expect(wrapper.emitted('select')?.length).toBe(count)
        }
        await hover(reverse ? start : end)
        expect(wrapper.emitted('select')?.length).toBe(count)
        // Select the other endpoint without moving the current viewport.
        await wrapper.findAll('.mp-date-range-picker__summary')[1].trigger('click')
        await click(reverse ? start : end)
        expect(wrapper.emitted('select').at(-1)[0]).toEqual(reverse ? [...values].reverse() : values)
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        // Move back to the interior unit after reverse selection; this must preserve the completed range.
        if (reverse) {
          await page(true)
        }
        const middle = cell(disabled)
        if (pc) {
          expect(middle.classes()).toContain('c-picker-cell-disabled')
          expect(middle.classes()).toContain('c-picker-cell-in-range')
        } else {
          expect(middle.classes()).not.toContain(`mp-${type === 'date' ? 'day' : type}-picker__range`)
          expect(middle.classes()).toContain(`mp-${type === 'date' ? 'day' : type}-picker__range--disabled`)
          expect(middle.get('button').attributes('disabled')).toBeDefined()
        }
        // The complete candidate remains confirmable despite its disabled interior unit.
        const confirm = wrapper.findAll('button').find((node) => ['确定', '确认'].includes(node.text()))
        if (reverse) {
          expect(confirm.attributes('disabled')).toBeDefined()
          expect(wrapper.find('[role=alert]').exists()).toBe(true)
          await confirm.trigger('click')
          expect(wrapper.emitted('update:modelValue')).toBeUndefined()
          return
        }
        expect(confirm.attributes('disabled')).toBeUndefined()
        await confirm.trigger('click')
        await flushPromises()
        expect(wrapper.emitted('confirm').at(-1)[0]).toEqual(values)
        expect(wrapper.emitted('update:modelValue').at(-1)[0]).toEqual(values)
      } finally {
        wrapper.unmount()
      }
    })
  }
}
