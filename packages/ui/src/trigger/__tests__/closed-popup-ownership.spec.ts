import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Trigger from '..'

test.each(['popup', 'sibling', 'host'] as const)('closed shadow popup: %s click ownership', async (origin) => {
  const host = document.createElement('div')
  document.body.append(host)
  const shadow = host.attachShadow({ mode: 'closed' })
  const target = document.createElement('div')
  const sibling = document.createElement('button')
  shadow.append(target, sibling)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'click', defaultOpen: true, popupContainer: target },
    slots: { default: () => h('button', 'Reference'), content: () => h('button', { class: 'popup-action' }, 'Inside') },
  })
  try {
    await nextTick()
    await nextTick()
    const action = shadow.querySelector<HTMLButtonElement>('.popup-action')!
    expect(action).toBeTruthy()
    ;(origin === 'popup' ? action : origin === 'sibling' ? sibling : host).click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    if (origin === 'popup') {
      expect(wrapper.emitted('update:open')).toBeUndefined()
    } else {
      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    }
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('does not deliver a deferred outside click after unmount', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const target = document.createElement('div')
  const sibling = document.createElement('button')
  root.append(target, sibling)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'click', defaultOpen: true, popupContainer: target },
    slots: { default: () => h('button', 'Reference'), content: () => h('button', 'Inside') },
  })
  try {
    await nextTick()
    await nextTick()
    sibling.click()
    wrapper.unmount()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(wrapper.emitted('click-outside')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    host.remove()
  }
})

test('tracks a popup moved to another closed shadow root', async () => {
  const hostA = document.createElement('div'),
    hostB = document.createElement('div')
  document.body.append(hostA, hostB)
  const rootA = hostA.attachShadow({ mode: 'closed' }),
    rootB = hostB.attachShadow({ mode: 'closed' })
  const targetA = document.createElement('div'),
    targetB = document.createElement('div'),
    sibling = document.createElement('button')
  rootA.append(targetA)
  rootB.append(targetB, sibling)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'click', defaultOpen: true, popupContainer: targetA },
    slots: { default: () => h('button', 'Reference'), content: () => h('button', { class: 'popup-action' }, 'Inside') },
  })
  try {
    await nextTick()
    await nextTick()
    const original = rootA.querySelector<HTMLButtonElement>('.popup-action')!
    await wrapper.setProps({ popupContainer: targetB })
    await nextTick()
    await nextTick()
    expect(rootB.querySelector('.popup-action')).toBe(original)
    original.click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    sibling.click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  } finally {
    wrapper.unmount()
    hostA.remove()
    hostB.remove()
  }
})

test('ignores a deferred outside click from an earlier opening', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const target = document.createElement('div')
  const sibling = document.createElement('button')
  root.append(target, sibling)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'click', open: true, popupContainer: target },
    slots: { default: () => h('button', 'Reference'), content: () => h('button', 'Inside') },
  })
  try {
    await nextTick()
    await nextTick()
    sibling.click()
    await wrapper.setProps({ open: false })
    await wrapper.setProps({ open: true })
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrapper.emitted('click-outside')).toBeUndefined()
    expect(wrapper.emitted('update:open')).toBeUndefined()
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('nested closed roots preserve internal clicks that stop propagation', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const outer = host.attachShadow({ mode: 'closed' })
  const nestedHost = document.createElement('div')
  const outerSibling = document.createElement('button')
  outer.append(nestedHost, outerSibling)
  const inner = nestedHost.attachShadow({ mode: 'closed' })
  const target = document.createElement('div')
  inner.append(target)
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { trigger: 'click', defaultOpen: true, popupContainer: target },
    slots: {
      default: () => h('button', 'Reference'),
      content: () =>
        h('button', { class: 'popup-action', onClick: (event: Event) => event.stopPropagation() }, 'Inside'),
    },
  })
  try {
    await nextTick()
    await nextTick()
    inner.querySelector<HTMLButtonElement>('.popup-action')!.click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrapper.emitted('update:open')).toBeUndefined()
    outerSibling.click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('closed-root peer reference dismisses a lower click trigger', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  root.append(mountPoint)
  const wrapper = mount(
    {
      render: () =>
        h(
          'div',
          (['click', 'hover'] as const).map((trigger) =>
            h(
              Trigger,
              { trigger, popupContainer: false, mouseEnterDelay: 0 },
              {
                default: () => h('button', { 'data-reference': trigger }, trigger),
                content: () => h('button', { 'data-panel': trigger }, 'Panel'),
              },
            ),
          ),
        ),
    },
    { attachTo: mountPoint },
  )
  try {
    const triggers = wrapper.findAllComponents(Trigger)
    ;(wrapper.get('[data-reference=click]').element as HTMLElement).click()
    await nextTick()
    await nextTick()
    wrapper.get('[data-reference=hover]').element.dispatchEvent(new MouseEvent('mouseenter'))
    await nextTick()
    await nextTick()
    expect(triggers[0].emitted('update:open')).toEqual([[true]])
    expect(triggers[1].emitted('update:open')).toEqual([[true]])
    ;(wrapper.get('[data-panel=hover]').element as HTMLElement).click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(triggers[0].emitted('update:open')).toEqual([[true]])
    ;(wrapper.get('[data-reference=hover]').element as HTMLElement).click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(triggers[0].emitted('update:open')).toEqual([[true], [false]])
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('separate closed-root peer reference dismisses a lower click trigger', async () => {
  const hosts = [document.createElement('div'), document.createElement('div')]
  document.body.append(...hosts)
  const roots = hosts.map((host) => host.attachShadow({ mode: 'closed' }))
  const mounts = roots.map((root) => {
    const element = document.createElement('div')
    root.append(element)
    return element
  })
  const wrappers = (['click', 'hover'] as const).map((trigger, index) =>
    mount(Trigger, {
      attachTo: mounts[index],
      props: { trigger, popupContainer: false, mouseEnterDelay: 0 },
      slots: {
        default: () => h('button', { 'data-reference': trigger }, trigger),
        content: () => h('button', { 'data-panel': trigger }, 'Panel'),
      },
    }),
  )
  try {
    ;(wrappers[0].get('[data-reference=click]').element as HTMLElement).click()
    await nextTick()
    await nextTick()
    wrappers[1].get('[data-reference=hover]').element.dispatchEvent(new MouseEvent('mouseenter'))
    await nextTick()
    await nextTick()
    expect(wrappers[0].emitted('update:open')).toEqual([[true]])
    expect(wrappers[1].emitted('update:open')).toEqual([[true]])
    ;(wrappers[1].get('[data-reference=hover]').element as HTMLElement).click()
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()
    expect(wrappers[0].emitted('update:open')).toEqual([[true], [false]])
  } finally {
    wrappers.forEach((wrapper) => wrapper.unmount())
    hosts.forEach((host) => host.remove())
  }
})
