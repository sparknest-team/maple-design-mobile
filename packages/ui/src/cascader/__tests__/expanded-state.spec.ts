import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Column from '../cascader-column'
import Option from '../cascader-option'
import Panel from '../CascaderPanel.vue'

test('focus alone does not announce a branch as expanded', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options: [{ value: 'a', label: 'Alpha', children: [{ value: 'a1', label: 'Child' }] }] },
  })
  try {
    const branch = wrapper.get(':is([role="menuitem"],[role="menuitemradio"])')
    ;(branch.element as HTMLElement).focus()
    await nextTick()
    expect(branch.attributes('aria-expanded')).toBe('false')
    await branch.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(branch.attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')).toHaveLength(2)
    expect(
      wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')[1]!.attributes('aria-expanded'),
    ).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])('expanded state follows visible columns in virtual=%s mode', async (virtual) => {
  const wrapper = mount(Column, {
    props: {
      column: [
        { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] },
        { key: 'b', label: 'Beta', value: 'b', isLeaf: false, path: [] },
      ] as any,
      activeKey: 'b',
      selectedPath: ['a'],
      level: 0,
      totalLevel: 4,
      displayedLevels: 2,
      virtualListProps: virtual ? { height: 120 } : undefined,
    },
  })
  try {
    const branches = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')
    expect(branches.map((item) => item.attributes('aria-expanded'))).toEqual(['true', 'false'])
    await wrapper.setProps({ displayedLevels: 1 })
    expect(
      wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])').map((item) => item.attributes('aria-expanded')),
    ).toEqual(['false', 'false'])
  } finally {
    wrapper.unmount()
  }
})

test('search results and leaf options do not advertise a submenu', () => {
  const option = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] } as any
  const wrapper = mount(Option, { props: { option, searchOption: true } })
  try {
    expect(wrapper.attributes('aria-haspopup')).toBeUndefined()
    expect(wrapper.attributes('aria-expanded')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
  const leaf = mount(Option, { props: { option: { ...option, isLeaf: true } } })
  try {
    expect(leaf.attributes('aria-haspopup')).toBeUndefined()
    expect(leaf.attributes('aria-expanded')).toBeUndefined()
  } finally {
    leaf.unmount()
  }
})

test('lazy branch remains collapsed until a child column exists', async () => {
  let done!: (items?: any[]) => void
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [{ value: 'a', label: 'Alpha', isLeaf: false }],
      loadMore: (_item: unknown, callback: (items?: any[]) => void) => {
        done = callback
      },
    },
  })
  try {
    const branch = wrapper.get(':is([role="menuitem"],[role="menuitemradio"])')
    expect(branch.attributes('aria-expanded')).toBe('false')
    await branch.trigger('click')
    expect(branch.attributes('aria-expanded')).toBe('false')
    done([{ value: 'a1', label: 'Child', isLeaf: true }])
    await flushPromises()
    expect(wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')).toHaveLength(2)
    expect(branch.attributes('aria-expanded')).toBe('true')
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])('editor announces an existing child column in virtual=%s mode', async (virtual) => {
  const EditorPanel = (await import('../CascaderEditorPanel.vue')).default
  const branch = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] }
  const leaf = { key: 'a1', label: 'Child', value: 'a1', isLeaf: true, path: [] }
  const wrapper = mount(EditorPanel, {
    attachTo: document.body,
    props: {
      displayColumns: [[branch], [leaf]] as any,
      selectedPath: ['a'],
      totalLevel: 2,
      virtualListProps: virtual ? { height: 120 } : undefined,
    },
  })
  try {
    expect(wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')[0]!.attributes('aria-expanded')).toBe(
      'true',
    )
    await wrapper.setProps({ displayColumns: [[branch]] as any })
    expect(wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')[0]!.attributes('aria-expanded')).toBe(
      'false',
    )
  } finally {
    wrapper.unmount()
  }
})

test('mobile editor does not announce a hidden child column as expanded', async () => {
  const EditorPanel = (await import('../CascaderEditorPanel.vue')).default
  const { selectionEditorSurface } = await import('../../_components/selected-options/context')
  const branch = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] }
  const leaf = { key: 'a1', label: 'Child', value: 'a1', isLeaf: true, path: [] }
  const wrapper = mount(EditorPanel, {
    attachTo: document.body,
    props: { displayColumns: [[branch], [leaf]] as any, selectedPath: ['a'], totalLevel: 2 },
    global: { provide: { [selectionEditorSurface as symbol]: { mobile: true } } },
  })
  try {
    await wrapper.findAll('nav button')[0]!.trigger('click')
    const parent = wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')[0]!
    expect(parent.isVisible()).toBe(true)
    expect(parent.attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAll(':is([role="menuitem"],[role="menuitemradio"])')[1]!.isVisible()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
