import { h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'
import * as detachedMonitor from '../detached-root-monitor'

const waitForControls = async (input: HTMLInputElement, panel: HTMLElement) => {
  await vi.waitFor(
    () => {
      expect(input.getAttribute('aria-controls')).toBe(panel.id)
    },
    { timeout: 2000, interval: 25 },
  )
}

test('restores ownership when both detached nodes move to an unseen closed shadow root', async () => {
  const hostA = document.createElement('div')
  const hostB = document.createElement('div')
  document.body.append(hostA, hostB)
  const rootA = hostA.attachShadow({ mode: 'closed' })
  const rootB = hostB.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  const popup = document.createElement('div')
  rootA.append(mountPoint, popup)
  const wrapper = mount(Cascader, {
    attachTo: mountPoint,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      open: true,
      editMode: 'direct',
      popupContainer: popup,
    },
  })
  try {
    await flushPromises()
    const input = rootA.querySelector<HTMLInputElement>('input[role="combobox"]')!
    const panel = popup.querySelector<HTMLElement>('[role="listbox"]')!
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
    mountPoint.remove()
    popup.remove()
    await flushPromises()
    expect(input.hasAttribute('aria-controls')).toBe(false)
    rootB.append(mountPoint, popup)
    await waitForControls(input, panel)
    await flushPromises()
    expect(input.getRootNode()).toBe(panel.getRootNode())
    expect(input.getAttribute('aria-controls')).toBe(panel.id)
  } finally {
    wrapper.unmount()
    hostA.remove()
    hostB.remove()
    popup.remove()
  }
})

test.each(['close', 'unmount'] as const)('cleans up the detached reconnection timer on %s', async (operation) => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  const popup = document.createElement('div')
  root.append(mountPoint, popup)
  const wrapper = mount(Cascader, {
    attachTo: mountPoint,
    props: {
      options: [{ value: 'a', label: 'Alpha' }],
      filterable: true,
      inputValue: 'Alpha',
      open: true,
      editMode: 'direct',
      popupContainer: popup,
    },
  })
  const originalWatch = detachedMonitor.watchDetachedRoots
  const release = vi.fn()
  const subscribe = vi.spyOn(detachedMonitor, 'watchDetachedRoots').mockImplementation((check) => {
    const dispose = originalWatch(check)
    return () => {
      release()
      dispose()
    }
  })
  let unmounted = false
  try {
    await flushPromises()
    mountPoint.remove()
    popup.remove()
    await flushPromises()
    expect(subscribe).toHaveBeenCalled()
    if (operation === 'close') {
      await wrapper.setProps({ open: false })
      await flushPromises()
    } else {
      wrapper.unmount()
      unmounted = true
    }
    expect(release).toHaveBeenCalled()
  } finally {
    if (!unmounted) {
      wrapper.unmount()
    }
    subscribe.mockRestore()
    host.remove()
    popup.remove()
  }
})

test('cleans up the detached reconnection timer on KeepAlive deactivation', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const root = host.attachShadow({ mode: 'closed' })
  const mountPoint = document.createElement('div')
  const popup = document.createElement('div')
  root.append(mountPoint, popup)
  const visible = ref(true)
  const wrapper = mount(
    {
      render: () =>
        h(KeepAlive, null, () =>
          visible.value
            ? h(Cascader, {
                options: [{ value: 'a', label: 'Alpha' }],
                filterable: true,
                inputValue: 'Alpha',
                open: true,
                editMode: 'direct',
                popupContainer: popup,
              })
            : null,
        ),
    },
    { attachTo: mountPoint },
  )
  const originalWatch = detachedMonitor.watchDetachedRoots
  const release = vi.fn()
  const subscribe = vi.spyOn(detachedMonitor, 'watchDetachedRoots').mockImplementation((check) => {
    const dispose = originalWatch(check)
    return () => {
      release()
      dispose()
    }
  })
  try {
    await flushPromises()
    mountPoint.remove()
    popup.remove()
    await flushPromises()
    expect(subscribe).toHaveBeenCalled()
    visible.value = false
    await flushPromises()
    expect(release).toHaveBeenCalled()
  } finally {
    wrapper.unmount()
    subscribe.mockRestore()
    host.remove()
    popup.remove()
  }
})

test('keeps the shared reconnection check until both detached instances have reconnected', async () => {
  const hostA = document.createElement('div')
  const hostB = document.createElement('div')
  document.body.append(hostA, hostB)
  const rootA = hostA.attachShadow({ mode: 'closed' })
  const rootB = hostB.attachShadow({ mode: 'closed' })
  const mounts = [document.createElement('div'), document.createElement('div')]
  const popups = [document.createElement('div'), document.createElement('div')]
  rootA.append(...mounts, ...popups)
  const wrappers = mounts.map((attachTo, index) =>
    mount(Cascader, {
      attachTo,
      props: {
        options: [{ value: 'a', label: 'Alpha' }],
        filterable: true,
        inputValue: 'Alpha',
        open: true,
        editMode: 'direct',
        popupContainer: popups[index],
      },
    }),
  )
  try {
    await flushPromises()
    const inputs = mounts.map((el) => el.querySelector<HTMLInputElement>('input[role="combobox"]')!)
    const panels = popups.map((el) => el.querySelector<HTMLElement>('[role="listbox"]')!)
    mounts.forEach((el) => el.remove())
    popups.forEach((el) => el.remove())
    await flushPromises()
    rootB.append(mounts[0], popups[0])
    await waitForControls(inputs[0], panels[0])
    await flushPromises()
    expect(inputs[0].getAttribute('aria-controls')).toBe(panels[0].id)
    expect(inputs[1].hasAttribute('aria-controls')).toBe(false)
    rootB.append(mounts[1], popups[1])
    await waitForControls(inputs[1], panels[1])
    await flushPromises()
    expect(inputs[1].getAttribute('aria-controls')).toBe(panels[1].id)
  } finally {
    wrappers.forEach((wrapper) => wrapper.unmount())
    hostA.remove()
    hostB.remove()
    popups.forEach((el) => el.remove())
  }
})
