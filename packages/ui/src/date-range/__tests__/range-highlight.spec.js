import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import DateRange from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

const pc = false
async function fixture(initial = ['2026-10-19', '2026-10-22']) {
  const wrapper = mount(DateRange, {
    props: {
      modelValue: initial,
      dateRangePickerProps: { defaultPickerValue: ['2026-10-01', '2026-11-01'] },
      editMode: 'popup',
      valueFormat: 'YYYY-MM-DD',
      ...(!pc ? { panelType: 'calendar' } : {}),
    },
  })
  await wrapper.get('input[aria-haspopup=dialog]').trigger('click')
  await flushPromises()
  const panel = wrapper.getComponent(EditorPanel)
  const cells = () => panel.findAll(pc ? '.c-picker-cell-in-view' : '.mp-day-picker__button--usable')
  const cell = (day, calendar = 0) => cells().filter((node) => node.text() === String(day))[calendar]
  const filled = () => panel.findAll('.mp-day-picker__button.mp-button--status-primary').map((node) => node.text())
  const confirm = async () => {
    await panel
      .findAll('button')
      .find((node) => ['确定', '确认'].includes(node.text()))
      .trigger('click')
    await flushPromises()
  }
  return { wrapper, panel, cells, cell, filled, confirm }
}
for (const [start, end] of [
  [26, 28, ['26', '27', '28']],
  [28, 26, ['26', '27', '28']],
  [26, 26, ['26']],
]) {
  test(`current-month ${start} to ${end} only highlights the active endpoint`, async () => {
    const f = await fixture([])
    try {
      expect(f.filled()).toEqual([])
      await f.cell(start).trigger('click')
      expect(f.filled().every((day) => day === String(start))).toBe(true)
      await f.wrapper.findAll('input[role=combobox]')[1].trigger('click')
      await f.cell(end).trigger('click')
      expect(f.filled()).toEqual([String(end)])
      expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
      await f.confirm()
      if (start > end) {
        expect(f.panel.find('[role=alert]').exists()).toBe(true)
        expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
        return
      }
      expect(f.wrapper.emitted('update:modelValue')).toEqual([
        [[`2026-10-${Math.min(start, end)}`, `2026-10-${Math.max(start, end)}`]],
      ])
    } finally {
      f.wrapper.unmount()
    }
  })
}
test('hover never changes the candidate or commits a value', async () => {
  const f = await fixture([])
  try {
    await f.cell(26).trigger('click')
    const selected = f.wrapper.emitted('select')?.length
    await f.cell(28).trigger('mouseenter')
    expect(f.wrapper.emitted('select')?.length).toBe(selected)
    expect(f.wrapper.emitted('update:modelValue')).toBeUndefined()
    if (pc) {
      expect(f.filled()).toEqual(['26', '27', '28'])
      await f.panel.get('.c-picker-range-wrapper').trigger('mouseleave')
      expect(f.filled()).toEqual([])
      expect(f.cell(26).classes()).toContain('c-picker-cell-range-start')
    } else {
      expect(f.filled()).toEqual(['26'])
    }
  } finally {
    f.wrapper.unmount()
  }
})

test('cross-month selection highlights only visible dates inside both endpoints', async () => {
  const f = await fixture([])
  try {
    await f.cell(26).trigger('click')
    if (!pc) {
      await f.panel
        .findAll('button')
        .find((node) => node.attributes('aria-label') === '下一月')
        .trigger('click')
      await flushPromises()
    }
    await f.wrapper.findAll('input[role=combobox]')[1].trigger('click')
    await f.cell(2, pc ? 1 : 0).trigger('click')
    expect(f.filled()).toEqual(['2'])
    await f.confirm()
    expect(f.wrapper.emitted('update:modelValue')).toEqual([[['2026-10-26', '2026-11-02']]])
  } finally {
    f.wrapper.unmount()
  }
})

test('mouse and touch hover do not preview another endpoint while editing a fixed endpoint', async () => {
  const f = await fixture([])
  try {
    await f.cell(26).trigger('click')
    const item = f.cell(28).element.parentElement
    const node = f.panel.findAll('li').find((li) => li.element === item)
    await node.trigger('pointerenter', { pointerType: 'touch' })
    expect(f.panel.find('.mp-day-picker__range--preview').exists()).toBe(false)
    await node.trigger('pointerenter', { pointerType: 'mouse' })
    expect(f.panel.findAll('.mp-day-picker__range--preview')).toHaveLength(0)
    expect(f.filled()).toEqual(['26'])
    await f.panel.get('.mp-day-picker__body').trigger('pointerleave')
    expect(f.filled()).toEqual(['26'])
    await f.wrapper.findAll('input[role=combobox]')[1].trigger('click')
    await f.cell(28).trigger('click')
    expect(f.cell(26).classes()).not.toContain('mp-button--status-primary')
    expect(f.cell(27).classes()).not.toContain('mp-button--status-primary')
    expect(f.cell(28).classes()).toContain('mp-button--status-primary')
  } finally {
    f.wrapper.unmount()
  }
})
