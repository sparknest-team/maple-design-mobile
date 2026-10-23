import { defineComponent, h, KeepAlive, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Form from '../Form.vue'
import { useForm } from '../provide'

let owner
let container
let tasks
let descriptors
let nextId
let frameRequests
let queuedFrames
let nativeWrites
let positionDescriptors
beforeEach(() => {
  tasks = []
  nextId = 100000
  queuedFrames = []
  nativeWrites = []
  positionDescriptors = ['scrollX', 'scrollY', 'scrollLeft', 'scrollTop'].map((key) => [
    key,
    Object.getOwnPropertyDescriptor(window, key),
  ])
  for (const [key] of positionDescriptors) {
    Object.defineProperty(window, key, { configurable: true, writable: true, value: 0 })
  }
  frameRequests = vi.fn((callback) => {
    queuedFrames.push(callback)
    return queuedFrames.length
  })
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(frameRequests)
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
  vi.spyOn(window, 'scrollTo').mockImplementation((left, top) => nativeWrites.push({ left, top }))
  descriptors = Object.fromEntries(
    ['setTimeout', 'clearTimeout'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  )
  const originalSet = globalThis.setTimeout
  const originalClear = globalThis.clearTimeout
  Object.defineProperty(globalThis, 'setTimeout', {
    configurable: true,
    writable: true,
    value: (callback, delay, ...args) => {
      if (delay !== 300) {
        return originalSet(callback, delay, ...args)
      }
      const task = { id: nextId++, callback, cancelled: false, delay }
      tasks.push(task)
      return task.id
    },
  })
  Object.defineProperty(globalThis, 'clearTimeout', {
    configurable: true,
    writable: true,
    value: (id) => {
      const task = tasks.find((entry) => entry.id === id)
      if (task) {
        task.cancelled = true
      } else {
        originalClear(id)
      }
    },
  })
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  try {
    owner?.unmount()
    container.remove()
  } finally {
    vi.restoreAllMocks()
    for (const [key, descriptor] of positionDescriptors) {
      if (descriptor) {
        Object.defineProperty(window, key, descriptor)
      } else {
        delete window[key]
      }
    }
    for (const [key, descriptor] of Object.entries(descriptors)) {
      Object.defineProperty(globalThis, key, descriptor)
    }
    owner = undefined
  }
})

function fixture(options = {}) {
  const visible = ref(true)
  const Field = defineComponent({
    setup() {
      const element = ref()
      const { form } = useForm()
      let unregister
      onMounted(() => {
        unregister = form.registerField({
          field: 'name',
          validate: async () => undefined,
          clearValidate: () => undefined,
          resetField: () => undefined,
          getElement: () => element.value,
        })
      })
      onBeforeUnmount(() => unregister?.())
      return () =>
        h('div', [
          h('input', { ref: element }),
          h('div', {
            class: 'mp-form-details-enter-active',
            style: { transitionProperty: 'margin-top', transitionDuration: '0.3s', transitionDelay: '0s' },
          }),
        ])
    },
  })
  const Host = defineComponent({
    setup: () => () =>
      h(KeepAlive, null, {
        default: () => (visible.value ? h(Form, options, { default: () => h(Field) }) : null),
      }),
  })
  owner = mount(Host, { attachTo: container })
  return { visible, form: owner.getComponent(Form) }
}

async function prepare() {
  await nextTick()
  for (let i = 0; i < 2; i++) {
    const callback = queuedFrames.pop()
    callback?.()
  }
  frameRequests.mockClear()
}

describe('Form scroll task ownership on the current parallel snapshot', () => {
  it('starts one animation frame only after the normal 300ms wait', async () => {
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].delay).toBe(300)
    expect(frameRequests).not.toHaveBeenCalled()
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('ignores a delivered callback after a newer request cancelled it', async () => {
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks[0].cancelled).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
    tasks[1].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('consumes the current callback only once', async () => {
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    tasks[0].callback()
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('does not revive a cancelled callback across KeepAlive activation', async () => {
    const { form, visible } = fixture()
    await nextTick()
    form.vm.scrollToField('name')
    await prepare()
    visible.value = false
    await nextTick()
    expect(tasks[0].cancelled).toBe(true)
    visible.value = true
    await nextTick()
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('cancels the pending timeout on ordinary unmount', async () => {
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    owner.unmount()
    owner = undefined
    expect(tasks[0].cancelled).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('does not schedule for an unknown field', async () => {
    const { form } = fixture()
    form.vm.scrollToField('missing')
    expect(tasks).toHaveLength(0)
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('does not dispatch if geometry reading disposes the owner', async () => {
    const { form } = fixture()
    const field = owner.get('input').element
    Object.defineProperty(field, 'getBoundingClientRect', {
      configurable: true,
      value: () => {
        owner.unmount()
        owner = undefined
        return { top: 0, left: 0, width: 10, height: 10, right: 10, bottom: 10, x: 0, y: 0 }
      },
    })
    form.vm.scrollToField('name')
    await prepare()
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('rejects a retained command while inactive and accepts a fresh activated request', async () => {
    const { form, visible } = fixture()
    await nextTick()
    visible.value = false
    await nextTick()
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks).toHaveLength(0)
    visible.value = true
    await nextTick()
    expect(tasks).toHaveLength(0)
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks).toHaveLength(1)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('preserves a newer request created during geometry reading', async () => {
    const { form } = fixture()
    const field = owner.get('input').element
    const originalRect = field.getBoundingClientRect.bind(field)
    let replace = true
    Object.defineProperty(field, 'getBoundingClientRect', {
      configurable: true,
      value: () => {
        if (replace) {
          replace = false
          form.vm.scrollToField('name')
        }
        return originalRect()
      },
    })
    form.vm.scrollToField('name')
    await prepare()
    tasks[0].callback()
    await prepare()
    expect(tasks).toHaveLength(2)
    expect(frameRequests).not.toHaveBeenCalled()
    tasks[1].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('preserves the current offset and linear positions', async () => {
    const { form } = fixture({ scrollToErrorOffsetY: 20 })
    const field = owner.get('input').element
    Object.defineProperty(field, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: 123, left: 0, width: 10, height: 10, right: 10, bottom: 133, x: 0, y: 123 }),
    })
    form.vm.scrollToField('name')
    await prepare()
    const now = vi.spyOn(Date, 'now').mockReturnValue(0)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
    now.mockReturnValue(150)
    queuedFrames[0]()
    expect(nativeWrites[0].top).toBe(51.5)
    now.mockReturnValue(300)
    queuedFrames[1]()
    expect(nativeWrites[1].top).toBe(103)
  })
})
