import { createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import { selectionEditorSurface } from '../../_components/selected-options/context'
import EditorPanel from '../CascaderEditorPanel.vue'
import Panel from '../CascaderPanel.vue'

const options = [{ value: 'a', label: 'Alpha', children: [{ value: 'a1', label: 'Child' }] }]
test.each([false, true])('expanded branch controls its real child menu, virtual=%s', async (virtual) => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options },
    attrs: virtual ? { virtualListProps: { height: 120 } } : {},
  })
  try {
    const branch = wrapper.get('[role="menuitem"]')
    expect(branch.attributes('aria-controls')).toBeUndefined()
    await branch.trigger('click')
    await flushPromises()
    const id = branch.attributes('aria-controls')
    const menus = wrapper.findAll('[role="menu"]')
    expect(menus).toHaveLength(2)
    expect(id).toBeTruthy()
    expect(menus[1]!.attributes('id')).toBe(id)
    expect(menus[1]!.text()).toContain('Child')
  } finally {
    wrapper.unmount()
  }
})

test('mobile editor does not reference a hidden child menu', async () => {
  const branch = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] }
  const leaf = { key: 'a1', label: 'Child', value: 'a1', isLeaf: true, path: [] }
  const wrapper = mount(EditorPanel, {
    props: { displayColumns: [[branch], [leaf]] as any, selectedPath: ['a'], totalLevel: 2 },
    global: { provide: { [selectionEditorSurface as symbol]: { mobile: true } } },
  })
  try {
    await wrapper.findAll('nav button')[0]!.trigger('click')
    const parent = wrapper.findAll('[role="menuitem"]')[0]!
    expect(parent.attributes('aria-expanded')).toBe('false')
    expect(parent.attributes('aria-controls')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])('desktop editor links only a rendered child menu, virtual=%s', async (virtual) => {
  const branch = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] }
  const leaf = { key: 'a1', label: 'Child', value: 'a1', isLeaf: true, path: [] }
  const wrapper = mount(EditorPanel, {
    props: {
      displayColumns: [[branch], [leaf]] as any,
      selectedPath: ['a'],
      totalLevel: 2,
      virtualListProps: virtual ? { height: 120 } : undefined,
    },
  })
  try {
    const parent = wrapper.findAll('[role="menuitem"]')[0]!
    expect(parent.attributes('aria-controls')).toBe(wrapper.findAll('[role="menu"]')[1]!.attributes('id'))
    expect(parent.attributes('aria-controls')).toBeTruthy()
    await wrapper.setProps({ displayColumns: [[branch], []] as any })
    expect(parent.attributes('aria-expanded')).toBe('false')
    expect(parent.attributes('aria-controls')).toBeUndefined()
    await wrapper.setProps({ displayColumns: [[branch]] as any })
    expect(parent.attributes('aria-controls')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test('multiple editor panels keep distinct child menu references through hydration', async () => {
  const branch = { key: 'a', label: 'Alpha', value: 'a', isLeaf: false, path: [] }
  const leaf = { key: 'a1', label: 'Child', value: 'a1', isLeaf: true, path: [] }
  const create = () =>
    createSSRApp({
      render: () =>
        h(
          'main',
          [0, 1].map(() =>
            h(EditorPanel, { displayColumns: [[branch], [leaf]] as any, selectedPath: ['a'], totalLevel: 2 }),
          ),
        ),
    })
  const container = document.createElement('div')
  container.innerHTML = await renderToString(create())
  document.body.append(container)
  const before = Array.from(container.querySelectorAll('[aria-controls]'), (node) => node.getAttribute('aria-controls'))
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const app = create()
  try {
    expect(before).toHaveLength(2)
    expect(new Set(before).size).toBe(2)
    app.mount(container)
    await nextTick()
    const after = Array.from(container.querySelectorAll('[aria-controls]'), (node) =>
      node.getAttribute('aria-controls'),
    )
    expect(after).toEqual(before)
    for (const id of after) {
      expect(Array.from(container.querySelectorAll('[role="menu"]')).filter((node) => node.id === id)).toHaveLength(1)
    }
    expect(warn.mock.calls.some((args) => String(args[0]).includes('Hydration'))).toBe(false)
  } finally {
    app.unmount()
    container.remove()
    warn.mockRestore()
  }
})

test('lazy branch exposes its child reference only after loading succeeds', async () => {
  let done!: (items?: any[]) => void
  const wrapper = mount(Panel, {
    props: {
      options: [{ value: 'a', label: 'Alpha', isLeaf: false }],
      loadMore: (_item: unknown, callback: (items?: any[]) => void) => {
        done = callback
      },
    },
  })
  try {
    const parent = wrapper.get('[role="menuitem"]')
    await parent.trigger('click')
    expect(parent.attributes('aria-controls')).toBeUndefined()
    done([{ value: 'child', label: 'Child', isLeaf: true }])
    await flushPromises()
    expect(parent.attributes('aria-controls')).toBeTruthy()
    expect(parent.attributes('aria-controls')).toBe(wrapper.findAll('[role="menu"]')[1]!.attributes('id'))
  } finally {
    wrapper.unmount()
  }
})
