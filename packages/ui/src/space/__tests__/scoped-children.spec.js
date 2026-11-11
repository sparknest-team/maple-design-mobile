import { Comment, defineComponent, Fragment, h, nextTick, ref, Text } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Space, { Space as NamedSpace, spaceProps } from '..'
import { isValidSpaceSize } from '../props'

function keyedFixture(keys = ['A', 'B']) {
  let serial = 0
  const order = ref([0, 1])
  const split = ref(false)
  const wrap = ref(false)
  const direction = ref('row')
  const Child = defineComponent({
    props: ['label'],
    setup: (props) => {
      const instance = ++serial
      const draft = ref('draft-' + props.label)
      return () => h('input', { 'data-label': props.label, 'data-instance': instance, value: draft.value })
    },
  })
  const wrapper = mount({
    render: () =>
      h(
        Space,
        { wrap: wrap.value, direction: direction.value },
        {
          default: () =>
            order.value.map((index) =>
              h(Fragment, { key: keys[index] }, [h(Child, { key: 'local', label: String(index) })]),
            ),
          ...(split.value ? { split: () => '|' } : {}),
        },
      ),
  })
  const identities = () =>
    Object.fromEntries(
      wrapper.findAll('input').map((input) => [input.attributes('data-label'), input.attributes('data-instance')]),
    )
  return { wrapper, order, split, wrap, direction, identities }
}

describe('Space scoped children and split groups', () => {
  test.each([
    ['strings', ['A', 'B']],
    ['number versus string', [1, '1']],
    ['symbols with identical descriptions', [Symbol('group'), Symbol('group')]],
    ['delimiters in keys', ['x/s1:y', 'x']],
  ])('preserves Fragment-local state after reordering %s keys', async (_label, keys) => {
    const f = keyedFixture(keys)
    try {
      const before = f.identities()
      f.order.value = [1, 0]
      await nextTick()
      expect(f.identities()).toEqual(before)
      expect(f.wrapper.findAll('input').map((input) => input.element.value)).toEqual(['draft-1', 'draft-0'])
    } finally {
      f.wrapper.unmount()
    }
  })

  test('layout and split changes preserve the content nodes', async () => {
    const f = keyedFixture()
    try {
      const inputs = f.wrapper.findAll('input').map((input) => input.element)
      for (const wrap of [true, false]) {
        f.wrap.value = wrap
        f.split.value = !f.split.value
        f.direction.value = 'column'
        await nextTick()
        expect(f.wrapper.findAll('input').map((input) => input.element)).toEqual(inputs)
      }
    } finally {
      f.wrapper.unmount()
    }
  })

  test('omits empty structure but retains visible text, zero and empty elements', () => {
    const wrapper = mount(Space, {
      slots: {
        default: () => [
          h(Comment),
          h(Text, ' '),
          h(Fragment, [h(Text, '')]),
          h(Fragment, [null, false, 0, 'Words', h('span')]),
        ],
        split: () => '|',
      },
    })
    try {
      expect(wrapper.findAll('[class$="space__item"]')).toHaveLength(3)
      expect(wrapper.findAll('[class$="space__item-split"]')).toHaveLength(2)
      expect(wrapper.text()).toContain('0')
    } finally {
      wrapper.unmount()
    }
  })

  test('each separator belongs to its preceding group, and empty split content adds no gap item', async () => {
    const visible = ref(true)
    const wrapper = mount({
      render: () =>
        h(
          Space,
          { wrap: true },
          {
            default: () => [h('span', 'A'), h('span', 'B')],
            split: () => (visible.value ? h('span', '|') : h(Fragment, [h(Comment), h(Text, ' ')])),
          },
        ),
    })
    try {
      const groups = wrapper.findAll('[class$="space__group"]')
      expect(groups[0].text()).toBe('A|')
      expect(groups[1].text()).toBe('B')
      visible.value = false
      await nextTick()
      expect(wrapper.findAll('[class$="space__item-split"]')).toHaveLength(0)
      expect(
        wrapper
          .getComponent(Space)
          .classes()
          .some((name) => name.endsWith('--split-wrap')),
      ).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  test('keeps caller keys untouched and exports the same named component', () => {
    const child = h('input', { key: 'original' })
    const wrapper = mount(Space, { slots: { default: () => h(Fragment, { key: 'scope' }, [child]) } })
    try {
      expect(child.key).toBe('original')
      expect(NamedSpace).toBe(Space)
    } finally {
      wrapper.unmount()
    }
  })
})

describe('Space runtime contract', () => {
  test('diagnoses enum mistakes without changing public value sets', () => {
    for (const [name, valid, invalid] of [
      ['direction', 'row', 'horizontal'],
      ['align', 'stretch', 'start'],
      ['justify', 'space-evenly', 'between'],
    ]) {
      expect(spaceProps[name].validator(valid)).toBe(true)
      expect(spaceProps[name].validator(invalid)).toBe(false)
    }
  })

  test('validates tuple structure while retaining CSS expressions and zero', () => {
    for (const value of [0, '0', '8', '1rem', 'var(--gap)', 'calc(1rem + 2px)', [0, '2rem'], 'md']) {
      expect(isValidSpaceSize(value)).toBe(true)
    }
    for (const value of [[], [8], [8, 12, 16], ['sm', 'lg'], [8, ''], -1, Infinity, NaN, {}]) {
      expect(isValidSpaceSize(value)).toBe(false)
    }
  })

  test('invalid size shapes fall back to md rather than producing undefined', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const wrapper = mount(Space, { props: { size: [8] } })
    try {
      expect(wrapper.attributes('style')).toContain('space-size-md-row-gap')
      expect(wrapper.attributes('style')).not.toContain('undefined')
      expect(warn).toHaveBeenCalled()
    } finally {
      wrapper.unmount()
      warn.mockRestore()
    }
  })
})
