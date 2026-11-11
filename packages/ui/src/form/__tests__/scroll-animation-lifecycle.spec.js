import { defineComponent, h, KeepAlive, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Form from '../Form.vue'
import { useForm } from '../provide'

let owner
let container
let timers
let frames
let writes
let clock
let descriptors
let nextId
let reduced
let onWrite
beforeEach(() => {
  timers = []
  frames = []
  writes = []
  clock = 0
  nextId = 100000
  reduced = false
  onWrite = undefined
  descriptors = []
  const replace = (object, key, value) => {
    descriptors.push([object, key, Object.getOwnPropertyDescriptor(object, key)])
    Object.defineProperty(object, key, { configurable: true, writable: true, value })
  }
  const originalSet = globalThis.setTimeout
  const originalClear = globalThis.clearTimeout
  replace(globalThis, 'setTimeout', (callback, delay, ...args) => {
    if (delay !== 300) {
      return originalSet(callback, delay, ...args)
    }
    const task = { id: nextId++, callback, cancelled: false }
    timers.push(task)
    return task.id
  })
  replace(globalThis, 'clearTimeout', (id) => {
    const task = timers.find((entry) => entry.id === id)
    if (task) {
      task.cancelled = true
    } else {
      originalClear(id)
    }
  })
  replace(window, 'requestAnimationFrame', (callback) => {
    const frame = { id: nextId++, callback, cancelled: false }
    frames.push(frame)
    return frame.id
  })
  replace(window, 'cancelAnimationFrame', (id) => {
    const frame = frames.find((entry) => entry.id === id)
    if (frame) {
      frame.cancelled = true
    }
  })
  replace(window, 'matchMedia', () => ({ matches: reduced }))
  replace(HTMLElement.prototype, 'scrollTo', function (left, top) {
    writes.push({ element: this, left, top })
    onWrite?.()
    this.scrollLeft = left
    this.scrollTop = top
  })
  vi.spyOn(Date, 'now').mockImplementation(() => clock)
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  try {
    owner?.unmount()
    container.remove()
  } finally {
    vi.restoreAllMocks()
    for (const [object, key, descriptor] of descriptors.reverse()) {
      if (descriptor) {
        Object.defineProperty(object, key, descriptor)
      } else {
        delete object[key]
      }
    }
    owner = undefined
  }
})

function fixture() {
  const visible = ref(true)
  const Field = defineComponent({
    setup() {
      const element = ref()
      const scroller = ref()
      const { form } = useForm()
      let unregister
      onMounted(() => {
        Object.defineProperty(element.value, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({ top: 300, left: 0, bottom: 310, right: 10, width: 10, height: 10, x: 0, y: 300 }),
        })
        Object.defineProperty(scroller.value, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({ top: 0, left: 0, bottom: 100, right: 10, width: 10, height: 100, x: 0, y: 0 }),
        })
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
        h('div', { ref: scroller, style: { overflowY: 'auto' } }, [
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
        default: () => (visible.value ? h(Form, null, { default: () => h(Field) }) : null),
      }),
  })
  owner = mount(Host, { attachTo: container })
  return { form: owner.getComponent(Form), visible }
}
async function prepare() {
  await nextTick()
  for (let i = 0; i < 2; i++) {
    const frame = frames.pop()
    frame?.callback()
  }
}

async function begin(form) {
  form.vm.scrollToField('name')
  await prepare()
  clock = 300
  timers[timers.length - 1].callback()
  expect(frames).toHaveLength(1)
}

describe('Form scroll interpolation lifecycle', () => {
  it('preserves normal 300ms linear interpolation after the existing wait', async () => {
    const { form } = fixture()
    await begin(form)
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(1)
    expect(writes[0].top).toBe(100)
    clock = 600
    frames[1].callback()
    expect(writes).toHaveLength(2)
    expect(writes[1].top).toBe(300)
  })

  it('does not consume a frame twice', async () => {
    const { form } = fixture()
    await begin(form)
    clock = 400
    frames[0].callback()
    frames[0].callback()
    expect(writes).toHaveLength(1)
    expect(frames).toHaveLength(2)
  })

  it('retires in-flight interpolation when a newer wait replaces it', async () => {
    const { form } = fixture()
    await begin(form)
    form.vm.scrollToField('name')
    await prepare()
    expect(frames[0].cancelled).toBe(true)
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(0)
  })

  it('retires in-flight interpolation on suspension', async () => {
    const { form, visible } = fixture()
    await begin(form)
    visible.value = false
    await nextTick()
    expect(frames[0].cancelled).toBe(true)
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(0)
  })

  it('does not revive an old frame across activation', async () => {
    const { form, visible } = fixture()
    await begin(form)
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(0)
  })

  it('retires in-flight interpolation on unmount', async () => {
    const { form } = fixture()
    await begin(form)
    owner.unmount()
    owner = undefined
    expect(frames[0].cancelled).toBe(true)
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(0)
  })

  it('aligns immediately after the wait for initial reduced motion without RAF', async () => {
    reduced = true
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    expect(writes).toHaveLength(0)
    timers[0].callback()
    expect(frames).toHaveLength(0)
    expect(writes).toHaveLength(1)
    expect(writes[0].top).toBe(300)
  })

  it('finishes on the next frame for dynamic reduced motion', async () => {
    const { form } = fixture()
    await begin(form)
    clock = 400
    frames[0].callback()
    reduced = true
    clock = 450
    frames[1].callback()
    expect(writes.map((entry) => entry.top)).toEqual([100, 300])
    expect(frames).toHaveLength(2)
  })

  it('does not schedule an extra frame after native-write disposal', async () => {
    const { form } = fixture()
    await begin(form)
    onWrite = () => {
      owner.unmount()
      owner = undefined
    }
    clock = 400
    frames[0].callback()
    expect(writes).toHaveLength(1)
    expect(frames).toHaveLength(1)
  })

  it('accepts a fresh request after activation without reviving the old frame', async () => {
    const { form, visible } = fixture()
    await begin(form)
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    expect(frames).toHaveLength(1)
    form.vm.scrollToField('name')
    await prepare()
    clock = 600
    timers[1].callback()
    expect(frames).toHaveLength(2)
    frames[0].callback()
    expect(writes).toHaveLength(0)
    clock = 900
    frames[1].callback()
    expect(writes.map((entry) => entry.top)).toEqual([300])
  })

  it('does not start a frame after initial scroll-position reading disposes the owner', async () => {
    const { form } = fixture()
    const scroller = owner.get('form div').element
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      get: () => {
        owner.unmount()
        owner = undefined
        return 0
      },
    })
    form.vm.scrollToField('name')
    await prepare()
    timers[0].callback()
    expect(frames).toHaveLength(0)
    expect(writes).toHaveLength(0)
  })
})
