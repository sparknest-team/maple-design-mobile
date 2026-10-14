import { createSSRApp, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import List, { ListItem } from '..'
import VirtualList from '../../_components/virtual-list-v2'

describe('List aligned body', () => {
  test.each(['sm', 'md', 'lg'])('renders supported size %s', (size) => {
    const w = mount(List, { props: { size, scrollbar: false } })
    expect(w.classes()).toContain('mp-list--' + size)
    w.unmount()
  })
  test('native height and single original scroll event', async () => {
    const w = mount(List, { props: { maxHeight: '12rem', scrollbar: false } })
    const viewport = w.find('.mp-list__viewport')
    expect(viewport.attributes('style')).toContain('max-height: 12rem')
    await viewport.trigger('scroll')
    expect(w.emitted('scroll')).toHaveLength(1)
    expect(w.emitted('scroll')[0][0]).toBeInstanceOf(Event)
    w.unmount()
  })
  test('custom scrollbar options and absent height', () => {
    const w = mount(List, { props: { scrollbar: { type: 'track', outerClass: 'track-test', hide: true } } })
    expect(w.find('.track-test').exists()).toBe(true)
    expect(w.find('.mp-list__viewport').attributes('style') || '').not.toContain('max-height')
    w.unmount()
  })
  test('manual slots override data and virtualization', () => {
    const w = mount(List, {
      props: { data: [1, 2], virtualListProps: { height: 120 } },
      slots: { default: () => h(ListItem, null, () => 'manual'), item: () => 'data' },
    })
    expect(w.findComponent(VirtualList).exists()).toBe(false)
    expect(w.text()).toContain('manual')
    expect(w.text()).not.toContain('data')
    w.unmount()
  })
  test('virtual data updates, semantics, scroll events and methods', async () => {
    const data = Array.from({ length: 100 }, (_, id) => ({ id }))
    const w = mount(List, {
      props: {
        data,
        maxHeight: 120,
        virtualListProps: { fixedSize: true, estimatedSize: 20, buffer: 3, itemKey: 'id' },
      },
      slots: { item: ({ item, index }) => h(ListItem, null, () => item.id + ':' + index) },
    })
    const virtual = w.findComponent(VirtualList)
    const element = virtual.element
    Object.defineProperty(element, 'clientHeight', { value: 120 })
    expect(element.style.height).toBe('120px')
    expect(virtual.find('[role="list"]').exists()).toBe(true)
    w.vm.scrollIntoView({ key: 50, align: 'bottom' })
    await nextTick()
    expect(element.scrollTop).toBe(900)
    expect(w.text()).toContain('50:50')
    await virtual.trigger('scroll')
    expect(w.emitted('scroll')).toHaveLength(1)
    await w.setProps({ data: [] })
    expect(w.findComponent(VirtualList).exists()).toBe(false)
    w.unmount()
  })
  test('virtual empty respects loading and empty slot', async () => {
    const w = mount(List, {
      props: { data: [], loading: true, virtualListProps: {} },
      slots: { empty: () => 'Nothing' },
    })
    expect(w.text()).not.toContain('Nothing')
    await w.setProps({ loading: false })
    expect(w.text()).toContain('Nothing')
    expect(w.attributes('aria-busy')).toBe('false')
    w.unmount()
  })
  test('SSR renders native semantic content', async () => {
    const html = await renderToString(
      createSSRApp({ render: () => h(List, { scrollbar: false }, () => h(ListItem, null, () => 'server')) }),
    )
    expect(html).toContain('role="list"')
    expect(html).toContain('role="listitem"')
    expect(html).toContain('server')
  })
})

describe('virtual-list alignment foundation', () => {
  test('shrinking non-empty data recovers its window and threshold preserves indexes', async () => {
    const w = mount(VirtualList, {
      props: {
        data: Array.from({ length: 100 }, (_, id) => ({ id })),
        itemKey: 'id',
        fixedSize: true,
        estimatedSize: 20,
        buffer: 3,
      },
      slots: { item: ({ item, index }) => h('div', item.id + ':' + index) },
    })
    w.vm.scrollTo({ index: 80, align: 'top' })
    await nextTick()
    await w.setProps({ data: [{ id: 'a' }, { id: 'b' }] })
    expect(w.text()).toBe('a:0b:1')
    await w.setProps({ data: Array.from({ length: 20 }, (_, id) => ({ id })), threshold: 100 })
    w.vm.scrollTo({ index: 10, align: 'top' })
    await nextTick()
    expect(w.text()).toContain('0:0')
    expect(w.text()).toContain('19:19')
    expect(w.html()).not.toContain('padding-top')
    w.unmount()
  })

  test('top bottom auto and invalid targets', async () => {
    const w = mount(VirtualList, {
      props: {
        data: Array.from({ length: 100 }, (_, id) => ({ id })),
        itemKey: 'id',
        height: 100,
        fixedSize: true,
        estimatedSize: 20,
        buffer: 3,
      },
      slots: { item: ({ item }) => h('div', String(item.id)) },
    })
    Object.defineProperty(w.element, 'clientHeight', { value: 100 })
    w.vm.scrollTo({ index: 10, align: 'top' })
    await nextTick()
    expect(w.element.scrollTop).toBe(200)
    w.vm.scrollTo({ index: 10, align: 'bottom' })
    await nextTick()
    expect(w.element.scrollTop).toBe(120)
    w.vm.scrollTo({ index: 8, align: 'auto' })
    await nextTick()
    expect(w.element.scrollTop).toBe(120)
    w.vm.scrollTo({ index: 2, align: 'auto' })
    await nextTick()
    expect(w.element.scrollTop).toBe(40)
    w.vm.scrollTo({ key: 'missing', align: 'top' })
    w.vm.scrollTo({ index: -1, align: 'top' })
    expect(w.element.scrollTop).toBe(40)
    w.vm.scrollTo({ index: 40, align: 'top' })
    w.vm.scrollTo({ index: 50, align: 'bottom' })
    await nextTick()
    expect(w.element.scrollTop).toBe(920)
    w.unmount()
  })
})
