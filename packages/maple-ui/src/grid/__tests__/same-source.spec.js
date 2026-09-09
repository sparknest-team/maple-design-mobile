import { createApp, h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Grid, { GridItem } from '..'
import Col from '../../col'
import Row from '../../row'
import { setItemVisible } from '../utils'

const originalMatchMedia = globalThis.matchMedia
let width, queries
const wrappers = []
const render = (component, options) => {
  const w = mount(component, options)
  wrappers.push(w)
  return w
}
const resize = async (value) => {
  width = value
  queries.forEach((query) => {
    query.matches = width >= query.width
    query.listeners.forEach((fn) => fn())
  })
  await nextTick()
}
beforeEach(() => {
  width = 400
  queries = []
  vi.stubGlobal(
    'matchMedia',
    vi.fn((media) => {
      const query = { width: Number(media.match(/(\d+)px/)[1]), matches: false, listeners: new Set() }
      query.matches = width >= query.width
      query.addEventListener = (_, fn) => query.listeners.add(fn)
      query.removeEventListener = (_, fn) => query.listeners.delete(fn)
      queries.push(query)
      return query
    }),
  )
})
afterEach(() => {
  wrappers.splice(0).forEach((w) => w.unmount())
  globalThis.matchMedia = originalMatchMedia
})

it('exports independently installable Row and Col without Grid aliases', () => {
  expect(Grid).not.toHaveProperty('Row')
  expect(Grid).not.toHaveProperty('Col')
  expect(Grid.Item).toBe(GridItem)
  const app = createApp({}).use(Row).use(Col)
  expect(app.component(Row.name)).toBe(Row)
  expect(app.component(Col.name)).toBe(Col)
})
it('installs the entire Grid family', () => {
  const app = createApp({}).use(Grid)
  for (const component of [Grid, GridItem]) {
    expect(app.component(component.name)).toBe(component)
  }
})
it('updates both gutter axes without stale padding', async () => {
  const w = render(Row, { props: { gutter: [20, 12] }, slots: { default: () => h(Col, { span: 12 }, () => 'Cell') } })
  expect(w.element.style.marginLeft).toBe('-10px')
  expect(w.element.style.marginTop).toBe('-6px')
  const col = w.findComponent(Col)
  expect(col.element.style.paddingLeft).toBe('10px')
  expect(col.element.style.paddingTop).toBe('6px')
  await w.setProps({ gutter: 0 })
  expect(col.element.style.paddingLeft).toBe('')
  expect(w.element.style.marginTop).toBe('')
})
it('supports all alignment and wrapping modes', async () => {
  const w = render(Row)
  for (const align of ['start', 'center', 'end', 'stretch']) {
    await w.setProps({ align })
    expect(w.classes()).toContain(`mp-row--align-${align}`)
  }
  for (const justify of ['start', 'center', 'end', 'space-around', 'space-between']) {
    await w.setProps({ justify })
    expect(w.classes()).toContain(`mp-row--justify-${justify}`)
  }
  await w.setProps({ wrap: false })
  expect(w.classes()).toContain('mp-row--nowrap')
})
it('div mode removes every layout class and style including flex and responsive columns', () => {
  const w = render(Row, {
    props: { div: true, gutter: 16, wrap: false },
    slots: { default: () => h(Col, { span: 0, xs: 12, offset: 2, order: 3, flex: 1 }, () => 'Visible') },
  })
  expect(w.classes()).toEqual([])
  expect(w.element.style.cssText).toBe('')
  expect(w.findComponent(Col).classes()).toEqual([])
  expect(w.findComponent(Col).element.style.cssText).toBe('')
  expect(w.text()).toBe('Visible')
})
it('keeps a base span and emits explicit zero responsive overrides', () => {
  const w = render(Col, { props: { span: 8, offset: 3, order: 2, xs: 0, md: { span: 12, offset: 0, order: 0 } } })
  for (const name of ['span-8', 'span-xs-0', 'span-md-12', 'offset-md-0', 'order-md-0']) {
    expect(w.classes()).toContain(`mp-col--${name}`)
  }
})
it.each([
  [1, '1 1 0%'],
  [0, '0 1 0%'],
  ['12.5rem', '0 0 12.5rem'],
  ['auto', '1 1 auto'],
  ['1 0 100px', '1 0 100px'],
])('supports flex %s', (flex, expected) => {
  const w = render(Col, { props: { flex } })
  expect(w.element.style.flex).toBe(expected)
  expect(w.classes()).toEqual(['mp-col'])
})
it('forwards click once on each Row and Col', async () => {
  const rowClick = vi.fn(),
    colClick = vi.fn()
  const w = render(Row, {
    attrs: { onClick: rowClick },
    slots: { default: () => h(Col, { onClick: colClick }, () => 'Click') },
  })
  await w.findComponent(Col).trigger('click')
  expect(rowClick).toHaveBeenCalledOnce()
  expect(colClick).toHaveBeenCalledOnce()
})
it('updates scalar-to-responsive values and removes every media listener', async () => {
  const w = render(Grid, { props: { cols: 3 } })
  await w.setProps({ cols: { xs: 2, md: 4 } })
  expect(w.element.style.gridTemplateColumns).toContain('repeat(2,')
  await resize(800)
  expect(w.element.style.gridTemplateColumns).toContain('repeat(4,')
  await resize(600)
  expect(w.element.style.gridTemplateColumns).toContain('repeat(2,')
  w.unmount()
  expect(queries.every((query) => query.listeners.size === 0)).toBe(true)
})
it('reacts to responsive row gutters', async () => {
  const w = render(Row, {
    props: {
      gutter: [
        { xs: 8, md: 24 },
        { xs: 4, md: 12 },
      ],
    },
  })
  expect(w.element.style.marginLeft).toBe('-4px')
  await resize(900)
  expect(w.element.style.marginLeft).toBe('-12px')
  expect(w.element.style.marginTop).toBe('-6px')
})
it('keeps nested row gutters isolated', () => {
  const w = render(Row, {
    props: { gutter: 24 },
    slots: { default: () => h(Col, {}, () => h(Row, { gutter: 8 }, () => h(Col, {}, () => 'Nested'))) },
  })
  const cols = w.findAllComponents(Col)
  expect(cols[0].element.style.paddingLeft).toBe('12px')
  expect(cols[1].element.style.paddingLeft).toBe('4px')
})
it('renders span and offset styles without waiting for DOM measurement', () => {
  const w = render(GridItem, { props: { span: 2, offset: 1 } })
  expect(w.element.style.gridColumn).toBe('span 3 / span 3')
  expect(w.element.style.marginLeft).toContain('calc')
  expect(w.element.style.display).not.toBe('none')
})
it('collapses whole rows and reserves a suffix with overflow state', async () => {
  const w = render(Grid, {
    props: { cols: 4, collapsed: true },
    slots: {
      default: () => [
        ...Array.from({ length: 5 }, (_, i) => h(GridItem, { key: i }, () => String(i))),
        h(GridItem, { suffix: true }, { default: ({ overflow }) => String(overflow) }),
      ],
    },
  })
  await flushPromises()
  const items = w.findAllComponents(GridItem)
  expect(items.filter((item) => item.element.style.display !== 'none')).toHaveLength(4)
  expect(items[5].text()).toBe('true')
  await w.setProps({ collapsed: false })
  expect(items.every((item) => item.element.style.display !== 'none')).toBe(true)
  expect(items[5].text()).toBe('false')
})
it('accounts for unused tracks when spans wrap', () => {
  const result = setItemVisible({
    cols: 4,
    collapsed: true,
    collapsedRows: 2,
    itemDataList: [
      { span: 3, offset: 0 },
      { span: 3, offset: 0 },
      { span: 2, offset: 0 },
    ],
  })
  expect(result.displayIndexList).toEqual([0, 1])
  expect(result.overflow).toBe(true)
})
it('handles removing, inserting and reordering keyed children without stale indices', async () => {
  const values = ref(['a', 'b', 'c'])
  const w = render({
    setup: () => () =>
      h(Grid, { cols: 2, collapsed: true }, () =>
        values.value.map((value) => h(GridItem, { key: value }, () => value)),
      ),
  })
  await flushPromises()
  const visible = () =>
    w
      .findAllComponents(GridItem)
      .filter((item) => item.element.style.display !== 'none')
      .map((item) => item.text())
  expect(visible()).toEqual(['a', 'b'])
  values.value = ['c', 'a']
  await flushPromises()
  expect(visible()).toEqual(['c', 'a'])
  values.value = ['d', 'c', 'a']
  await flushPromises()
  expect(visible()).toEqual(['d', 'c'])
})
it('isolates nested Grid item registration', async () => {
  const w = render(Grid, {
    props: { cols: 1, collapsed: true },
    slots: {
      default: () => [
        h(GridItem, {}, () =>
          h(Grid, { cols: 2 }, () => [h(GridItem, {}, () => 'Inner A'), h(GridItem, {}, () => 'Inner B')]),
        ),
        h(GridItem, {}, () => 'Outer B'),
      ],
    },
  })
  await flushPromises()
  expect(
    w
      .findAllComponents(GridItem)
      .filter((item) => item.element.style.display === 'none')
      .map((item) => item.text()),
  ).toEqual(['Outer B'])
})
it('normalizes zero columns and hides zero spans without invalid offsets', () => {
  const w = render(Grid, { props: { cols: 0 }, slots: { default: () => h(GridItem, { span: 0 }) } })
  expect(w.element.style.gridTemplateColumns).toContain('repeat(1,')
  expect(w.findComponent(GridItem).element.style.display).toBe('none')
})
