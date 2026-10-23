import { defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Form from '../Form.vue'
import { useForm } from '../provide'

let owner
let container
let tasks
let frame
let renderFrames
beforeEach(() => {
  tasks = []
  const original = globalThis.setTimeout
  vi.spyOn(globalThis, 'setTimeout').mockImplementation((callback, delay, ...args) => {
    if (delay >= 0 && delay <= 1000) {
      tasks.push({ callback, delay })
      return 100000 + tasks.length
    }
    return original(callback, delay, ...args)
  })
  vi.spyOn(globalThis, 'clearTimeout').mockImplementation(() => undefined)
  renderFrames = []
  frame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    renderFrames.push(callback)
    return 100000
  })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  try {
    owner?.unmount()
  } finally {
    container.remove()
    vi.restoreAllMocks()
    owner = undefined
  }
})
function fixture(duration, delay = '0s') {
  const Field = defineComponent({
    setup() {
      const element = ref()
      const { form } = useForm()
      onMounted(() =>
        form.registerField({
          field: 'name',
          validate: async () => undefined,
          clearValidate() {},
          resetField() {},
          getElement: () => element.value,
        }),
      )
      return () =>
        h('div', [
          h('input', { ref: element }),
          duration == null
            ? null
            : h('div', {
                class: 'mp-form-details mp-form-details-enter-active',
                style: { transitionProperty: 'margin-top', transitionDuration: duration, transitionDelay: delay },
              }),
        ])
    },
  })
  owner = mount(Form, { attachTo: container, slots: { default: () => h(Field) } })
  return owner
}

async function prepare() {
  await nextTick()
  for (let i = 0; i < 2; i++) {
    renderFrames.pop()?.()
  }
  frame.mockClear()
}

describe('Form rendered details completion wait', () => {
  it('preserves a measured 300ms completion wait', async () => {
    const form = fixture('0.3s')
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks.map((task) => task.delay)).toEqual([300])
    expect(frame).not.toHaveBeenCalled()
  })
  it('does not keep a fixed delay for explicit zero CSS motion', async () => {
    const form = fixture('0s')
    form.vm.scrollToField('name')
    await nextTick()
    expect(tasks).toHaveLength(0)
    expect(frame).toHaveBeenCalledTimes(1)
  })
  it('waits for current CSS duration plus delay rather than 300ms', async () => {
    const form = fixture('0.7s', '0.1s')
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks.map((task) => task.delay)).toEqual([800])
  })
  it('subtracts negative CSS delay from the remaining wait', async () => {
    const form = fixture('0.2s', '-0.1s')
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks.map((task) => task.delay)).toEqual([100])
  })
  it('does not wait for absent form-details motion', async () => {
    const form = fixture()
    form.vm.scrollToField('name')
    await nextTick()
    expect(tasks).toHaveLength(0)
    expect(frame).toHaveBeenCalledTimes(1)
  })

  it('combines CSS property lists with repeating delays', async () => {
    const form = fixture('0.2s, 0.7s', '0.1s')
    form.get('.mp-form-details').element.style.transitionProperty = 'opacity, margin-top'
    form.vm.scrollToField('name')
    await prepare()
    expect(tasks.map((task) => task.delay)).toEqual([800])
  })

  it('does not start render frames after disposal before nextTick', async () => {
    const form = fixture('0.3s')
    form.vm.scrollToField('name')
    owner.unmount()
    owner = undefined
    await nextTick()
    expect(tasks).toHaveLength(0)
    expect(frame).not.toHaveBeenCalled()
  })

  it('rejects a cancelled render frame delivered after disposal', async () => {
    const form = fixture('0.3s')
    form.vm.scrollToField('name')
    await nextTick()
    const callback = renderFrames[0]
    owner.unmount()
    owner = undefined
    callback()
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(100000)
    expect(tasks).toHaveLength(0)
    expect(frame).toHaveBeenCalledTimes(1)
  })

  it('consumes each render frame only once', async () => {
    const form = fixture('0.3s')
    form.vm.scrollToField('name')
    await nextTick()
    const first = renderFrames.shift()
    first()
    first()
    expect(renderFrames).toHaveLength(1)
    renderFrames.shift()()
    expect(tasks.map((task) => task.delay)).toEqual([300])
  })
})
