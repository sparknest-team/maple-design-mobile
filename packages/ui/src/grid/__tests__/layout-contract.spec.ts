import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Grid from '../Grid.vue'
import GridItem from '../GridItem.vue'
import { gridItemProps } from '../item-props'
import { gridProps } from '../props'
import { resolveItemData, setItemVisible } from '../utils'

const data = (span: number, suffix = false) => ({ span, offset: 0, suffix })
describe('grid DOM-order budget and safe numeric contract', () => {
  it('budgets a middle suffix in DOM order instead of moving it to the end', () => {
    const result = setItemVisible({
      cols: 4,
      collapsed: true,
      collapsedRows: 1,
      itemDataList: [data(1), data(1, true), data(1), data(1)],
    })
    expect(result.displayIndexList).toEqual([0, 1])
    expect(result.overflow).toBe(true)
  })
  it('accounts for a leading suffix while allowing the following second row', () => {
    const options = { cols: 4, collapsed: true, itemDataList: [data(1, true), data(1), data(1), data(1)] }
    expect(setItemVisible({ ...options, collapsedRows: 1 }).displayIndexList).toEqual([0])
    expect(setItemVisible({ ...options, collapsedRows: 2 }).overflow).toBe(false)
  })
  it('does not over-hide ordinary items when a middle suffix completes the previous row', () => {
    const result = setItemVisible({
      cols: 4,
      collapsed: true,
      collapsedRows: 2,
      itemDataList: [data(3), data(1, true), data(3), data(1)],
    })
    expect([...result.displayIndexList].sort()).toEqual([0, 1, 2, 3])
    expect(result.overflow).toBe(false)
  })
  it('applies the corrected budget to actual registered items', async () => {
    const wrapper = mount(Grid, {
      props: { cols: 4, collapsed: true },
      slots: {
        default: () => [
          h(GridItem, { id: 'a' }, () => 'A'),
          h(GridItem, { id: 'suffix', suffix: true }, () => 'Suffix'),
          h(GridItem, { id: 'b' }, () => 'B'),
          h(GridItem, { id: 'c' }, () => 'C'),
        ],
      },
    })
    await nextTick()
    expect(wrapper.find<HTMLElement>('#a').element.style.display).not.toBe('none')
    expect(wrapper.find<HTMLElement>('#suffix').element.style.display).not.toBe('none')
    expect(wrapper.find<HTMLElement>('#b').element.style.display).toBe('none')
    expect(wrapper.find<HTMLElement>('#c').element.style.display).toBe('none')
    await wrapper.setProps({ collapsed: false })
    expect(wrapper.find<HTMLElement>('#b').element.style.display).not.toBe('none')
    wrapper.unmount()
  })
  it('diagnoses non-finite values and malformed breakpoint objects', () => {
    for (const descriptor of [
      gridProps.cols,
      gridProps.rowGap,
      gridProps.colGap,
      gridItemProps.span,
      gridItemProps.offset,
    ]) {
      for (const value of [Infinity, NaN, null, [], { medium: 3 }, { xs: Infinity }]) {
        expect(descriptor.validator!(value)).toBe(false)
      }
      expect(descriptor.validator!({ xs: undefined, md: 3 })).toBe(true)
      expect(descriptor.validator!(2.5)).toBe(true)
    }
    expect(gridProps.collapsedRows.validator!(NaN)).toBe(false)
  })
  it('normalizes malformed JS values before responsive resolution and CSS generation', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const wrapper = mount(Grid, {
        props: { cols: null as any, rowGap: Infinity, colGap: NaN, collapsedRows: NaN, collapsed: true },
        slots: { default: () => h(GridItem, { span: Infinity, offset: Infinity }) },
      })
      expect(wrapper.element.style.gridTemplateColumns).toContain('repeat(24,')
      expect(wrapper.element.style.rowGap).toBe('0px')
      expect(wrapper.element.style.columnGap).toBe('0px')
      expect(wrapper.findComponent(GridItem).element.style.gridColumn).toBe('span 1 / span 1')
      expect(wrapper.html()).not.toMatch(/NaN|Infinity|undefinedpx/)
      wrapper.unmount()
    } finally {
      warn.mockRestore()
    }
  })
  it('preserves existing finite rounding, clamping and negative gap rules', () => {
    const wrapper = mount(Grid, {
      props: { cols: 3.7, rowGap: -4, colGap: 2.5, collapsedRows: 0 },
      slots: { default: () => h(GridItem, { span: 2.8, offset: 1.5 }) },
    })
    expect(wrapper.element.style.gridTemplateColumns).toContain('repeat(3,')
    expect(wrapper.element.style.gap).toBe('0px 2.5px')
    expect(wrapper.findComponent(GridItem).element.style.gridColumn).toBe('span 3 / span 3')
    wrapper.unmount()
  })
  it('keeps item and row utility results finite for non-finite inputs', () => {
    expect(resolveItemData(Infinity, { span: Infinity, offset: NaN })).toEqual({ span: 1, offset: 0, suffix: false })
    expect(
      setItemVisible({ cols: NaN, collapsed: true, collapsedRows: NaN, itemDataList: [data(1), data(1)] }),
    ).toEqual({ overflow: false, displayIndexList: [0, 1] })
  })
  it('falls back for invalid responsive fields and accepts later valid updates', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const previousMatchMedia = window.matchMedia
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
    const wrapper = mount(Grid, {
      props: { cols: { xs: Infinity, medium: 3 } as any, rowGap: { xs: NaN } },
      slots: { default: () => h(GridItem, { span: { xs: Infinity }, offset: { xs: NaN } }) },
    })
    try {
      expect(wrapper.element.style.gridTemplateColumns).toContain('repeat(24,')
      expect(wrapper.findComponent(GridItem).element.style.gridColumn).toBe('span 1 / span 1')
      await wrapper.setProps({ cols: { xs: 4, md: undefined } })
      expect(wrapper.element.style.gridTemplateColumns).toContain('repeat(4,')
      expect(wrapper.html()).not.toMatch(/NaN|Infinity|undefinedpx/)
    } finally {
      wrapper.unmount()
      warn.mockRestore()
      vi.stubGlobal('matchMedia', previousMatchMedia)
    }
  })
})
