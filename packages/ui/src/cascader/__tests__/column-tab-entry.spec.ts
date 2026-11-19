import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { selectionEditorSurface } from '../../_components/selected-options/context'
import EditorPanel from '../CascaderEditorPanel.vue'
import Panel from '../CascaderPanel.vue'

// User focus follows rendering; same-millisecond synthetic focus hits Vue's listener timestamp guard.
const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

for (const virtual of [false, true]) {
  test(`single-select column has one entry and follows keyboard focus (virtual=${virtual})`, async () => {
    const options = Array.from({ length: 30 }, (_, i) => ({ value: String(i), label: `Option ${i}` }))
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: { options, ...(virtual ? { virtualListProps: { height: 120, estimatedSize: 32, buffer: 0 } } : {}) },
    })
    try {
      const items = () => wrapper.findAll('[role="menuitemradio"]')
      const entry = () => items().filter((item) => item.attributes('tabindex') === '0')
      await nextTick()
      expect(entry()).toHaveLength(1)
      const first = entry()[0]!
      await nextFrame()
      ;(first.element as HTMLElement).focus()
      await first.trigger('keydown', { key: 'ArrowDown' })
      await nextTick()
      expect(entry()).toHaveLength(1)
      expect(entry()[0]!.element).toBe(document.activeElement)
      expect(entry()[0]!.attributes('title')).toBe('Option 1')
    } finally {
      wrapper.unmount()
    }
  })
}

test('a column of disabled options retains an entry without enabling selection', async () => {
  const wrapper = mount(Panel, {
    props: {
      options: [
        { value: 'a', label: 'Alpha', disabled: true },
        { value: 'b', label: 'Beta', disabled: true },
      ],
    },
  })
  try {
    const items = wrapper.findAll('[role="menuitemradio"]')
    expect(items.filter((item) => item.attributes('tabindex') === '0')).toHaveLength(1)
    await items[0]!.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

for (const virtual of [false, true]) {
  test(`selected option is the entry until user focus takes precedence (virtual=${virtual})`, async () => {
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: {
        modelValue: 'b',
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ],
        ...(virtual ? { virtualListProps: { height: 120, estimatedSize: 32, buffer: 0 } } : {}),
      },
    })
    try {
      await nextTick()
      const entry = () => wrapper.findAll('[role="menuitemradio"]').find((item) => item.attributes('tabindex') === '0')!
      expect(entry().attributes('title')).toBe('Beta')
      await wrapper.setProps({ modelValue: 'a' })
      expect(entry().attributes('title')).toBe('Alpha')
      await nextFrame()
      ;(entry().element as HTMLElement).focus()
      await wrapper.setProps({ modelValue: 'b' })
      expect(entry().attributes('title')).toBe('Alpha')
      expect(document.activeElement).toBe(entry().element)
    } finally {
      wrapper.unmount()
    }
  })
}

test('only the active column contributes an entry across hierarchical navigation', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options: [{ value: 'p', label: 'Parent', children: [{ value: 'c', label: 'Child' }] }] },
  })
  try {
    const entries = () => wrapper.findAll('[data-cascader-key]').filter((item) => item.attributes('tabindex') === '0')
    const parent = wrapper.get('[title="Parent"]')
    expect(entries()).toHaveLength(1)
    await nextFrame()
    ;(parent.element as HTMLElement).focus()
    await parent.trigger('keydown', { key: 'ArrowRight' })
    await nextTick()
    expect(wrapper.findAll('[role="menu"]').length).toBe(2)
    expect(entries()).toHaveLength(1)
    expect(entries()[0]!.attributes('title')).toBe('Child')
    expect(document.activeElement).toBe(entries()[0]!.element)
  } finally {
    wrapper.unmount()
  }
})

for (const virtual of [false, true]) {
  test(`mobile editor moves the entry to its visible column (virtual=${virtual})`, async () => {
    const branch = { key: 'a', value: 'a', label: 'Parent', isLeaf: false, path: [] }
    const leaf = { key: 'b', value: 'b', label: 'Child', isLeaf: true, path: [] }
    const wrapper = mount(EditorPanel, {
      props: {
        displayColumns: [[branch], [leaf]] as any,
        selectedPath: ['a'],
        activeKey: 'a',
        totalLevel: 2,
        ...(virtual ? { virtualListProps: { height: 120, estimatedSize: 32, buffer: 0 } } : {}),
      },
      global: { provide: { [selectionEditorSurface as symbol]: { mobile: true } } },
    })
    try {
      const parent = wrapper.get('[title="Parent"]')
      const child = wrapper.get('[title="Child"]')
      expect(parent.attributes('tabindex')).toBe('-1')
      expect(child.attributes('tabindex')).toBe('0')
      await wrapper.findAll('nav button')[0]!.trigger('click')
      expect(parent.attributes('tabindex')).toBe('0')
      expect(child.attributes('tabindex')).toBe('-1')
      await wrapper.findAll('nav button')[1]!.trigger('click')
      expect(parent.attributes('tabindex')).toBe('-1')
      expect(child.attributes('tabindex')).toBe('0')
    } finally {
      wrapper.unmount()
    }
  })
}

for (const virtual of [false, true]) {
  test(`multiple mode shares one option entry and preserves an explicit virtual viewport tabindex (virtual=${virtual})`, async () => {
    const wrapper = mount(Panel, {
      props: {
        multiple: true,
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ],
        ...(virtual ? { virtualListProps: { height: 120, estimatedSize: 32, tabindex: 2 } as any } : {}),
      },
    })
    try {
      await nextTick()
      const items = wrapper.findAll('[data-cascader-key]')
      expect(items).toHaveLength(2)
      expect(items.map((item) => item.attributes('tabindex'))).toEqual(['0', '-1'])
      expect(wrapper.findAll('input[type="checkbox"]')).toHaveLength(2)
      expect(items.map((item) => item.get('input').attributes('tabindex'))).toEqual(['-1', '-1'])
      if (virtual) {
        const scroll = wrapper.get('[role="menu"]').element.closest('[class$="-virtual-list"]')
        expect(scroll?.getAttribute('tabindex')).toBe('2')
      }
    } finally {
      wrapper.unmount()
    }
  })
}

test('pointer hover does not redirect the keyboard entry or Enter away from focused option', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const alpha = wrapper.get('[title="Alpha"]')
    const beta = wrapper.get('[title="Beta"]')
    await nextFrame()
    ;(alpha.element as HTMLElement).focus()
    await beta.trigger('mouseenter')
    expect(document.activeElement).toBe(alpha.element)
    expect(alpha.attributes('tabindex')).toBe('0')
    expect(beta.attributes('tabindex')).toBe('-1')
    await alpha.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  } finally {
    wrapper.unmount()
  }
})

test('Enter activates the focused option even while another option is hovered', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const alpha = wrapper.get('[title="Alpha"]')
    const beta = wrapper.get('[title="Beta"]')
    await nextFrame()
    ;(alpha.element as HTMLElement).focus()
    await beta.trigger('mouseenter')
    await alpha.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  } finally {
    wrapper.unmount()
  }
})

test('keyboard events from a custom nested menuitem stay with the custom control', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { options: [{ value: 'a', label: 'Alpha' }] },
    slots: { option: () => h('button', { type: 'button', role: 'menuitem', 'data-custom': '' }, 'Custom') },
  })
  try {
    const custom = wrapper.get('[data-custom]')
    await nextFrame()
    ;(custom.element as HTMLElement).focus()
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    custom.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
