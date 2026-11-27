import { Comment, createSSRApp, Fragment, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import Component from '..'
import { createNamespace } from '../../utils/components'

const { n } = createNamespace('space')

describe('space copied implementation contract', () => {
  it('renders on the server without starting browser work', async () => {
    const html = await renderToString(createSSRApp({ render: () => h(Component) }))
    expect(html).toContain(n())
  })

  it('keeps custom CSS lengths and fragment splits', async () => {
    const w = mount(Component, {
      props: { size: '1rem' },
      slots: {
        default: () => h(Fragment, [h('b', 'a'), h(Comment), h(Fragment, [h('i', 'b')])]),
        split: () => '|',
      },
    })
    expect([w.element.style.rowGap, w.element.style.columnGap]).toEqual(['1rem', '1rem'])
    expect(w.findAll('.' + n('item'))).toHaveLength(2)
    expect(w.findAll('.' + n('item-split'))).toHaveLength(1)
    await w.setProps({ size: [4, '2rem'], direction: 'column', wrap: false, block: false })
    expect(w.element.style.gap).toBe('4px 2rem')
    expect(w.element.style.alignItems).toBe('stretch')
    expect(w.classes()).not.toContain(n('--block'))
    w.unmount()
  })

  it('uses identical defaults and all five preset tokens', async () => {
    const w = mount(Component)
    expect(w.element.style.flexWrap).toBe('nowrap')
    expect(w.element.style.flexDirection).toBe('row')
    expect(w.element.style.alignItems).toBe('center')
    expect(w.element.style.justifyContent).toBe('flex-start')
    expect(w.classes()).toContain(n('--block'))
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      await w.setProps({ size })
      expect(w.element.style.gap).toBe(
        'var(--mp-space-size-' + size + '-row-gap) var(--mp-space-size-' + size + '-column-gap)',
      )
    }
    w.unmount()
  })
  it('preserves numbers, numeric strings and CSS expressions', async () => {
    const w = mount(Component)
    for (const [size, expected] of [
      [0, '0px 0px'],
      [12, '12px 12px'],
      ['8', '8px 8px'],
      ['2rem', '2rem 2rem'],
      ['var(--gap)', 'var(--gap) var(--gap)'],
      [[4, '2rem'], '4px 2rem'],
    ]) {
      await w.setProps({ size })
      const gap = w.element.style.gap
      expect(gap === expected || `${gap} ${gap}` === expected).toBe(true)
    }
    await w.setProps({ direction: 'column' })
    expect(w.element.style.gap).toBe('4px 2rem')
    w.unmount()
  })
  it('updates conditional content and splits without empty comment items', async () => {
    const count = ref(1)
    const split = ref(false)
    const w = mount({
      setup: () => () =>
        h(
          Component,
          {},
          {
            default: () => [
              h(Comment),
              h(
                Fragment,
                Array.from({ length: count.value }, (_, i) => h('b', { key: i }, String(i))),
              ),
            ],
            ...(split.value ? { split: () => '|' } : {}),
          },
        ),
    })
    expect(w.findAll('.' + n('item'))).toHaveLength(1)
    expect(w.findAll('.' + n('item-split'))).toHaveLength(0)
    count.value = 3
    split.value = true
    await nextTick()
    expect(w.findAll('.' + n('item'))).toHaveLength(3)
    expect(w.findAll('.' + n('item-split'))).toHaveLength(2)
    count.value = 0
    await nextTick()
    expect(w.findAll('.' + n('item'))).toHaveLength(0)
    expect(w.findAll('.' + n('item-split'))).toHaveLength(0)
    w.unmount()
  })
  it('forwards root attributes and events once, keeping instances independent', async () => {
    const onClick = vi.fn()
    const a = mount(Component, { attrs: { id: 'space', class: 'custom', style: { width: '100px' }, onClick } })
    const b = mount(Component)
    expect(a.attributes('id')).toBe('space')
    expect(a.classes()).toContain('custom')
    expect(a.element.style.width).toBe('100px')
    await a.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    await a.setProps({ wrap: true, direction: 'column', align: 'flex-end', block: false })
    expect(a.element.style.flexWrap).toBe('wrap')
    expect(a.element.style.alignItems).toBe('flex-end')
    expect(b.element.style.flexWrap).toBe('nowrap')
    expect(b.element.style.alignItems).toBe('center')
    a.unmount()
    b.unmount()
  })
})
