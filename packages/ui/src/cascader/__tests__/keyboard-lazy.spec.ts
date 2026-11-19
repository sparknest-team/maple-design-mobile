import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'
import Editor from '../CascaderEditor.vue'
import Panel from '../CascaderPanel.vue'
import { cascaderProps } from '../props'

const Host = defineComponent({ props: cascaderProps, setup: (props) => () => h(Editor, { options: props }) })
for (const mode of ['panel', 'editor'] as const) {
  for (const key of ['Enter', ' ', 'ArrowRight']) {
    test(`${mode}: ${key} loads a lazy branch and exposes busy until completion`, async () => {
      let done!: (children?: { value: string; label: string }[]) => void
      const loadMore = vi.fn((_option, callback) => {
        done = callback
      })
      const wrapper = mount(mode === 'panel' ? Panel : Host, {
        attachTo: document.body,
        props: { options: [{ value: 'root', label: 'Root', isLeaf: false }], loadMore },
      })
      try {
        await flushPromises()
        const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
        const branch = owner.get('[role="menuitem"][title="Root"]')
        ;(branch.element as HTMLElement).focus()
        branch.element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
        await flushPromises()
        expect(loadMore).toHaveBeenCalledTimes(1)
        expect(branch.attributes('aria-busy')).toBe('true')
        done([{ value: 'child', label: 'Child' }])
        await flushPromises()
        expect(branch.attributes('aria-busy')).toBeUndefined()
        expect(owner.text()).toContain('Child')
      } finally {
        wrapper.unmount()
      }
    })
  }
}

for (const mode of ['panel', 'editor'] as const) {
  for (const moveOutside of [false, true]) {
    test(`${mode}: delayed forward navigation respects focus ownership (${moveOutside})`, async () => {
      let done!: (children: { value: string; label: string }[]) => void
      const loadMore = vi.fn((_option, callback) => {
        done = callback
      })
      const outside = document.createElement('button')
      document.body.append(outside)
      const wrapper = mount(mode === 'panel' ? Panel : Host, {
        attachTo: document.body,
        props: { options: [{ value: 'root', label: 'Root', isLeaf: false }], loadMore },
      })
      try {
        await flushPromises()
        const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
        const branch = owner.get('[role="menuitem"][title="Root"]')
        ;(branch.element as HTMLElement).focus()
        branch.element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
        )
        branch.element.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }),
        )
        expect(loadMore).toHaveBeenCalledTimes(1)
        if (moveOutside) {
          outside.focus()
        }
        done([{ value: 'child', label: 'Child' }])
        await flushPromises()
        await flushPromises()
        const child = owner.get('[role="menuitem"][title="Child"]')
        expect(document.activeElement).toBe(moveOutside ? outside : child.element)
      } finally {
        wrapper.unmount()
        outside.remove()
      }
    })
  }
  test(`${mode}: a keyboard lazy-loader exception follows Vue's error handler`, async () => {
    const error = new Error('loader failed'),
      onError = vi.fn()
    const wrapper = mount(mode === 'panel' ? Panel : Host, {
      attachTo: document.body,
      props: {
        options: [{ value: 'root', label: 'Root', isLeaf: false }],
        loadMore: () => {
          throw error
        },
      },
      global: { config: { errorHandler: onError } },
    })
    try {
      await flushPromises()
      const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
      const branch = owner.get('[role="menuitem"][title="Root"]')
      ;(branch.element as HTMLElement).focus()
      branch.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError.mock.calls[0][0]).toBe(error)
      expect(branch.attributes('aria-busy')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}

for (const mode of ['panel', 'editor'] as const) {
  test(`${mode}: replacing the loader cancels keyboard busy state and stale completion`, async () => {
    let done!: (children: { value: string; label: string }[]) => void
    const wrapper = mount(mode === 'panel' ? Panel : Host, {
      attachTo: document.body,
      props: {
        options: [{ value: 'root', label: 'Root', isLeaf: false }],
        loadMore: (_option: unknown, cb: typeof done) => {
          done = cb
        },
      },
    })
    try {
      await flushPromises()
      const owner = mode === 'panel' ? wrapper : wrapper.getComponent(Editor)
      const branch = owner.get('[role="menuitem"][title="Root"]')
      ;(branch.element as HTMLElement).focus()
      branch.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(branch.attributes('aria-busy')).toBe('true')
      await wrapper.setProps({ loadMore: () => {} })
      await flushPromises()
      expect(branch.attributes('aria-busy')).toBeUndefined()
      done([{ value: 'stale', label: 'Stale' }])
      await flushPromises()
      expect(owner.text()).not.toContain('Stale')
      expect(document.activeElement).toBe(branch.element)
    } finally {
      wrapper.unmount()
    }
  })
}

test('field keyboard navigation requests lazy children and honors consumed events', async () => {
  let done!: (children: { value: string; label: string }[]) => void
  const loadMore = vi.fn((_option, cb) => {
    done = cb
  })
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      options: [{ value: 'root', label: 'Root', isLeaf: false }],
      loadMore,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    ;(input.element as HTMLElement).focus()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
    await flushPromises()
    const blocked = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    blocked.preventDefault()
    input.element.dispatchEvent(blocked)
    expect(loadMore).not.toHaveBeenCalled()
    input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(loadMore).toHaveBeenCalledTimes(1)
    expect(wrapper.get('[title="Root"]').attributes('aria-busy')).toBe('true')
    done([{ value: 'child', label: 'Child' }])
    await flushPromises()
    expect(wrapper.text()).toContain('Child')
  } finally {
    wrapper.unmount()
  }
})

test('strict search result selection does not load an unrelated submenu', async () => {
  const loadMore = vi.fn()
  const wrapper = mount(Cascader, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      defaultOpen: true,
      popupContainer: false,
      filterable: true,
      checkStrictly: true,
      options: [{ value: 'root', label: 'Root', isLeaf: false }],
      loadMore,
    },
  })
  try {
    await flushPromises()
    const input = wrapper.get('input[role="combobox"]')
    await input.setValue('Root')
    await flushPromises()
    const result = wrapper.get('[role="option"][title="Root"]')
    ;(result.element as HTMLElement).focus()
    result.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flushPromises()
    expect(loadMore).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['root'])
  } finally {
    wrapper.unmount()
  }
})

for (const origin of ['field', 'menu'] as const) {
  test(`direct ${origin}: keyboard loader exception reaches Vue error handler`, async () => {
    const error = new Error('direct loader failed')
    const onError = vi.fn()
    const wrapper = mount(Cascader, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        defaultOpen: true,
        popupContainer: false,
        options: [{ value: 'root', label: 'Root', isLeaf: false }],
        loadMore: () => {
          throw error
        },
      },
      global: { config: { errorHandler: onError } },
    })
    try {
      await flushPromises()
      const input = wrapper.get('input[role="combobox"]')
      ;(input.element as HTMLElement).focus()
      input.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }))
      await flushPromises()
      const branch = wrapper.get('[role="menuitem"][title="Root"]')
      const target = origin === 'menu' ? branch : input
      ;(target.element as HTMLElement).focus()
      target.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(onError).toHaveBeenCalledTimes(1)
      expect(onError.mock.calls[0][0]).toBe(error)
      expect(branch.attributes('aria-busy')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
}

test.each([false, true])(
  'lazy ArrowRight in a closed root respects focus transferred to a sibling (%s)',
  async (moveFocus) => {
    const host = document.createElement('div')
    document.body.append(host)
    const root = host.attachShadow({ mode: 'closed' })
    const container = document.createElement('div')
    const other = document.createElement('button')
    root.append(container, other)
    let finish!: (children: { value: string; label: string }[]) => void
    const wrapper = mount(Panel, {
      attachTo: container,
      props: {
        options: [{ value: 'root', label: 'Root', isLeaf: false }],
        loadMore: (_option, done) => {
          finish = done
        },
      },
    })
    try {
      await flushPromises()
      const branch = wrapper.get('[role="menuitem"][title="Root"]')
      ;(branch.element as HTMLElement).focus()
      await branch.trigger('keydown', { key: 'ArrowRight' })
      if (moveFocus) {
        other.focus()
      }
      finish([{ value: 'child', label: 'Child' }])
      await flushPromises()
      expect(root.activeElement).toBe(moveFocus ? other : wrapper.get('[title="Child"]').element)
    } finally {
      wrapper.unmount()
      host.remove()
    }
  },
)
