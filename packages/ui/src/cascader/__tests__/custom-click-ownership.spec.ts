import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Panel from '../CascaderPanel.vue'

describe('custom option click ownership', () => {
  it.each(['button', 'link', 'role-button'])('keeps %s activation within the custom control', async (kind) => {
    const click = vi.fn()
    const tag = kind === 'link' ? 'a' : kind === 'button' ? 'button' : 'span'
    const attrs =
      kind === 'link'
        ? {
            href: '#custom',
            onClick: click,
          }
        : kind === 'role-button'
          ? { role: 'button', tabindex: 0, onClick: click }
          : { type: 'button', onClick: click }
    const wrapper = mount(Panel, {
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h(tag, attrs, [h('span', { 'data-child': '' }, 'Action')]) },
    })
    try {
      await wrapper.get('[data-child]').trigger('click')
      expect(click).toHaveBeenCalledOnce()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('does not select when a custom native input is clicked', async () => {
    const wrapper = mount(Panel, {
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h('input', { 'data-input': '', type: 'checkbox' }) },
    })
    try {
      await wrapper.get('[data-input]').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('recognizes an interactive control inside an open shadow root', () => {
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h('span', { 'data-host': '' }) },
    })
    try {
      const host = wrapper.get('[data-host]').element as HTMLElement
      const shadow = host.attachShadow({ mode: 'open' })
      const button = document.createElement('button')
      shadow.appendChild(button)
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it.each(['option', 'treeitem', 'gridcell'])(
    'keeps a nested %s widget action from selecting the outer option',
    async (role) => {
      const action = vi.fn()
      const wrapper = mount(Panel, {
        props: { options: [{ value: 'a', label: 'Alpha' }] },
        slots: {
          option: () =>
            h('div', { role, tabindex: 0, onClick: action }, [h('span', { 'data-widget': '' }, 'Widget action')]),
        },
      })
      try {
        await wrapper.get('[data-widget]').trigger('click')
        expect(action).toHaveBeenCalledOnce()
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    },
  )
  it('recognizes a semantic host for an interactive closed shadow root', () => {
    const wrapper = mount(Panel, {
      attachTo: document.body,
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h('span', { role: 'button', tabindex: 0, 'data-host': '' }) },
    })
    try {
      const host = wrapper.get('[data-host]').element as HTMLElement
      const shadow = host.attachShadow({ mode: 'closed' })
      const button = document.createElement('button')
      shadow.appendChild(button)
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }))
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('honours a prevented click on custom non-interactive content', async () => {
    const wrapper = mount(Panel, {
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: {
        option: () => h('span', { 'data-child': '', onClick: (event: Event) => event.preventDefault() }, 'Alpha'),
      },
    })
    try {
      await wrapper.get('[data-child]').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('does not select an outer option when a nested cascader option is clicked', async () => {
    const wrapper = mount(Panel, {
      props: { options: [{ value: 'outer', label: 'Outer' }] },
      slots: { option: () => h(Panel, { options: [{ value: 'inner', label: 'Inner' }] }) },
    })
    try {
      const inner = wrapper.findAllComponents(Panel).find((child) => child !== wrapper)!
      await inner.get('[title="Inner"]').trigger('click')
      expect(inner.emitted('update:modelValue')?.at(-1)).toEqual(['inner'])
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })
  it('still selects when ordinary option text is clicked', async () => {
    const wrapper = mount(Panel, {
      props: { options: [{ value: 'a', label: 'Alpha' }] },
      slots: { option: () => h('span', { 'data-child': '' }, 'Alpha') },
    })
    try {
      await wrapper.get('[data-child]').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
    } finally {
      wrapper.unmount()
    }
  })
})
