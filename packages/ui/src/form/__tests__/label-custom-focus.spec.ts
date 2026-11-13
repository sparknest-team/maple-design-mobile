import { h, type Component as VueComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Rate from '../../rate'
import Slider from '../../slider'
import FormItem from '../FormItem.vue'

test.each([
  ['Rate', Rate],
  ['Slider', Slider],
] as const)('explicit label focuses enabled %s', async (_, Component) => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Value', labelAttrs: { for: 'test-target' } },
    slots: { default: () => h(Component as VueComponent, { id: 'test-target', editMode: 'direct' }) },
  })
  try {
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(document.activeElement).toBe(wrapper.get('[role="slider"]').element)
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['Rate', Rate],
  ['Slider', Slider],
] as const)('disabled %s is not focused', async (_, Component) => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Value', labelAttrs: { for: 'test-target' } },
    slots: { default: () => h(Component as VueComponent, { id: 'test-target', disabled: true, editMode: 'direct' }) },
  })
  try {
    const slider = wrapper.get('[role="slider"]').element as HTMLElement
    const focus = vi.spyOn(slider, 'focus')
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('range label does not choose between two thumbs', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Range', labelAttrs: { for: 'test-target' } },
    slots: { default: () => h(Slider, { id: 'test-target', range: true, editMode: 'direct' }) },
  })
  try {
    const thumbs = wrapper.findAll('[role="slider"]')
    const focus = thumbs.map((thumb) => vi.spyOn(thumb.element as HTMLElement, 'focus'))
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus.every((spy) => spy.mock.calls.length === 0)).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('consumer can prevent custom focus through label click', async () => {
  const handler = vi.fn((event: MouseEvent) => event.preventDefault())
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Value', labelAttrs: { for: 'test-target', onClick: handler } },
    slots: { default: () => h(Rate, { id: 'test-target', editMode: 'direct' }) },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(handler).toHaveBeenCalledTimes(1)
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('a native label target remains handled by the browser', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Native', labelAttrs: { for: 'native-target' } },
    slots: { default: () => h('input', { id: 'native-target' }) },
  })
  try {
    const focus = vi.spyOn(wrapper.get('input').element as HTMLElement, 'focus')
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('clicking an interactive descendant of the label does not move focus', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { labelAttrs: { for: 'test-target' } },
    slots: {
      label: () => h('a', { href: '#details' }, 'Details'),
      default: () => h(Rate, { id: 'test-target', editMode: 'direct' }),
    },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('label a').trigger('click', { button: 0 })
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('label activation resolves its target inside an open shadow root', async () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const shadow = host.attachShadow({ mode: 'open' })
  const container = document.createElement('div')
  shadow.appendChild(container)
  const wrapper = mount(FormItem, {
    attachTo: container,
    props: { label: 'Value', labelAttrs: { for: 'test-target' } },
    slots: { default: () => h(Rate, { id: 'test-target', editMode: 'direct' }) },
  })
  try {
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(shadow.activeElement).toBe(wrapper.get('[role="slider"]').element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('readonly slider remains focusable', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Value', labelAttrs: { for: 'test-target' } },
    slots: { default: () => h(Slider, { id: 'test-target', readonly: true, editMode: 'direct' }) },
  })
  try {
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(document.activeElement).toBe(wrapper.get('[role="slider"]').element)
  } finally {
    wrapper.unmount()
  }
})

test('an ancestor can cancel label activation', async () => {
  const wrapper = mount(
    {
      render: () =>
        h('div', { onClick: (event: MouseEvent) => event.preventDefault() }, [
          h(FormItem, { label: 'Value', labelAttrs: { for: 'test-target' } }, () =>
            h(Rate, { id: 'test-target', editMode: 'direct' }),
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('label activation does not override focus moved by an ancestor', async () => {
  const wrapper = mount(
    {
      render: () =>
        h('div', { onClick: () => document.getElementById('alternative-focus')?.focus() }, [
          h('button', { id: 'alternative-focus' }, 'Alternative'),
          h(FormItem, { label: 'Value', labelAttrs: { for: 'test-target' } }, () =>
            h(Rate, { id: 'test-target', editMode: 'direct' }),
          ),
        ]),
    },
    { attachTo: document.body },
  )
  try {
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(document.activeElement).toBe(wrapper.get('#alternative-focus').element)
  } finally {
    wrapper.unmount()
  }
})

test('explicitly targeted generic group does not guess which child to focus', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Group', labelAttrs: { for: 'test-target' } },
    slots: {
      default: () =>
        h('div', { id: 'test-target', role: 'group' }, [h('div', { role: 'slider', tabindex: 0 }), h('input')]),
    },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus).not.toHaveBeenCalled()
  } finally {
    wrapper.unmount()
  }
})

test('slider class recognition supports a custom prefix', async () => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { label: 'Value', labelAttrs: { for: 'test-target' } },
    slots: {
      default: () =>
        h('div', { id: 'test-target', class: 'custom-slider' }, [
          h('div', { class: 'custom-slider__thumb', role: 'slider', tabindex: 0 }),
        ]),
    },
  })
  try {
    await wrapper.get('label').trigger('click')
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(document.activeElement).toBe(wrapper.get('[role="slider"]').element)
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['unknown BUTTON', false],
  ['searchbox', false],
  ['unknown group', true],
] as const)('label descendant role %s respects interactive ownership', async (role, shouldFocus) => {
  const wrapper = mount(FormItem, {
    attachTo: document.body,
    props: { labelAttrs: { for: 'role-target' } },
    slots: {
      label: () => h('span', { role }, [h('span', { class: 'role-child' }, 'Details')]),
      default: () => h(Rate, { id: 'role-target', editMode: 'direct' }),
    },
  })
  try {
    const focus = vi.spyOn(wrapper.get('[role="slider"]').element as HTMLElement, 'focus')
    await wrapper.get('.role-child').trigger('click', { button: 0 })
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(focus.mock.calls.length).toBe(shouldFocus ? 1 : 0)
  } finally {
    wrapper.unmount()
  }
})
