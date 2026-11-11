import { defineComponent, h, KeepAlive, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Form from '../Form.vue'
import { useForm } from '../provide'

let owner
let container
let tasks
let descriptors
let nextId
let preparationFrames
let frameRequests
const error = { field: 'name', message: 'Required' }
beforeEach(() => {
  tasks = []
  nextId = 100000
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
      const task = { id: nextId++, callback, cancelled: false }
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
  preparationFrames = []
  frameRequests = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    preparationFrames.push(callback)
    return 123456
  })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  try {
    owner?.unmount()
    container.remove()
  } finally {
    vi.restoreAllMocks()
    for (const [key, descriptor] of Object.entries(descriptors)) {
      Object.defineProperty(globalThis, key, descriptor)
    }
    owner = undefined
  }
})

function fixture() {
  const visible = ref(true)
  const options = reactive({ scrollToError: 'start' })
  const state = {}
  const Field = defineComponent({
    setup() {
      const element = ref()
      const { form } = useForm()
      onMounted(() => {
        state.element = element.value
        state.field = {
          field: 'name',
          validate: () => new Promise((resolve) => (state.resolve = resolve)),
          clearValidate: () => undefined,
          resetField: () => undefined,
          getElement: () => state.element,
        }
        state.unregister = form.registerField(state.field)
      })
      onBeforeUnmount(() => state.unregister?.())
      return () =>
        h('div', { style: { overflowY: 'auto' } }, [
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
        default: () => (visible.value ? h(Form, { ...options }, { default: () => h(Field) }) : null),
      }),
  })
  owner = mount(Host, { attachTo: container })
  return { form: owner.getComponent(Form), visible, state, options }
}
async function prepare() {
  await nextTick()
  for (let i = 0; i < 2; i++) {
    const callback = preparationFrames.pop()
    callback?.()
  }
  frameRequests.mockClear()
}

async function invalid(form, state, callback) {
  const result = form.vm.validate(callback)
  state.resolve(error)
  expect(await result).toEqual({ name: error })
  await prepare()
}

describe('Form automatic-scroll validation eligibility', () => {
  it('preserves current invalid results and schedules one automatic wait', async () => {
    const { form, state } = fixture()
    await invalid(form, state)
    expect(tasks).toHaveLength(1)
  })

  it('does not schedule for a successful validation', async () => {
    const { form, state } = fixture()
    const result = form.vm.validate()
    state.resolve(undefined)
    expect(await result).toBeUndefined()
    expect(tasks).toHaveLength(0)
  })

  it('rejects an old validation result after suspension and activation', async () => {
    const { form, state, visible } = fixture()
    const result = form.vm.validate()
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    state.resolve(error)
    expect(await result).toEqual({ name: error })
    expect(tasks).toHaveLength(0)
  })

  it('rejects results for an unregistered field whose node is still connected', async () => {
    const { form, state } = fixture()
    const result = form.vm.validate()
    state.unregister()
    expect(state.element.isConnected).toBe(true)
    state.resolve(error)
    expect(await result).toEqual({ name: error })
    expect(tasks).toHaveLength(0)
  })

  it('cancels a queued automatic wait when validation state is cleared', async () => {
    const { form, state } = fixture()
    await invalid(form, state)
    form.vm.clearValidate('name')
    expect(tasks[0].cancelled).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('cancels a queued automatic wait when automatic scrolling is turned off', async () => {
    const { form, state, options } = fixture()
    await invalid(form, state)
    options.scrollToError = undefined
    await nextTick()
    expect(tasks[0].cancelled).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('rejects an old element after the field now resolves to a replacement', async () => {
    const { form, state } = fixture()
    await invalid(form, state)
    const previous = state.element
    const replacement = document.createElement('input')
    previous.parentElement.appendChild(replacement)
    state.element = replacement
    expect(previous.isConnected).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })

  it('does not cancel explicit manual scrolling when automatic policy changes', async () => {
    const { form, options } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    options.scrollToError = undefined
    await nextTick()
    expect(tasks[0].cancelled).toBe(false)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('accepts a fresh validation after activation', async () => {
    const { form, state, visible } = fixture()
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    await invalid(form, state)
    expect(tasks).toHaveLength(1)
  })

  it('does not schedule after a validation callback clears the errors', async () => {
    const { form, state } = fixture()
    await invalid(form, state, () => form.vm.clearValidate('name'))
    expect(tasks).toHaveLength(0)
  })

  it.each(['resetFields', 'setFields', 'validate'])('retires an automatic wait on %s', async (command) => {
    const { form, state } = fixture()
    await invalid(form, state)
    const result = form.vm[command](command === 'setFields' ? { name: 'new' } : undefined)
    expect(tasks[0].cancelled).toBe(true)
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
    if (command === 'validate') {
      state.resolve(undefined)
      expect(await result).toBeUndefined()
    }
  })

  it.each(['clearValidate', 'resetFields', 'setFields'])('preserves an explicit manual wait on %s', async (command) => {
    const { form } = fixture()
    form.vm.scrollToField('name')
    await prepare()
    form.vm[command](command === 'setFields' ? { name: 'new' } : undefined)
    expect(tasks[0].cancelled).toBe(false)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('physically cancels the owned automatic frame when errors are cleared', async () => {
    const { form, state } = fixture()
    await invalid(form, state)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
    form.vm.clearValidate()
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(123456)
  })

  it('keeps a replacement manual command created inside the validation callback', async () => {
    const { form, state } = fixture()
    const callback = vi.fn(() => form.vm.scrollToField('name'))
    await invalid(form, state, callback)
    expect(callback).toHaveBeenCalledExactlyOnceWith({ name: error })
    expect(tasks).toHaveLength(1)
    expect(tasks[0].cancelled).toBe(false)
    tasks[0].callback()
    expect(frameRequests).toHaveBeenCalledTimes(1)
  })

  it('rejects an automatic wait after its registered field changes identity', async () => {
    const { form, state } = fixture()
    await invalid(form, state)
    state.field.field = 'other'
    tasks[0].callback()
    expect(frameRequests).not.toHaveBeenCalled()
  })
})
