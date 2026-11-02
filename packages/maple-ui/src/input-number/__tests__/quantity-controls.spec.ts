import { h, KeepAlive, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import PublicInputNumber from '..'
import InputNumber from '../InputNumber.vue'

const wrappers: ReturnType<typeof mount>[] = []
function render(props: Record<string, unknown> = {}) {
  const wrapper = mount(InputNumber, { props: { defaultValue: 2, mode: 'button', ...props } })
  wrappers.push(wrapper)
  return wrapper
}
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
test('button-only input still steps by keyboard and publishes its direction', async () => {
  const wrapper = render({ disableInput: true })
  expect(wrapper.get('input').attributes('readonly')).toBeDefined()
  await wrapper.get('input').setValue('99')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  expect(wrapper.emitted('step')?.[0].slice(0, 2)).toEqual([3, 'plus'])
})
test('independent disable and visibility rules also govern keyboard steps', async () => {
  const wrapper = render({ disableIncrement: true })
  expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.setProps({ disableIncrement: false, incrementButton: false, disableDecrement: true })
  expect(wrapper.findAll('button')).toHaveLength(1)
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  await wrapper.get('input').trigger('keydown', { key: 'ArrowDown' })
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})
test('press=false keeps one pointer step without starting a repeat', async () => {
  vi.useFakeTimers()
  const wrapper = render({ press: false })
  await wrapper.findAll('button')[1].trigger('pointerdown', { button: 0, isPrimary: true })
  vi.advanceTimersByTime(2000)
  expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
})
test('guard waits once, blocks repeated operations, and publishes only after approval', async () => {
  let finish!: (allow: boolean) => void
  const beforeCommit = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        finish = resolve
      }),
  )
  const wrapper = render({ beforeCommit, clearable: true })
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(wrapper.attributes('aria-busy')).toBe('true')
  expect(wrapper.get('input').attributes('readonly')).toBeDefined()
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(beforeCommit).toHaveBeenCalledTimes(1)
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  finish(true)
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  expect(wrapper.emitted('change')?.[0][0]).toBe(3)
  expect(wrapper.emitted('step')?.[0].slice(0, 2)).toEqual([3, 'plus'])
})
test('guard rejection restores typed drafts and errors are observable', async () => {
  const wrapper = render({ beforeCommit: () => false })
  await wrapper.get('input').setValue('7')
  await wrapper.get('input').trigger('blur')
  await flushPromises()
  expect(wrapper.get('input').element.value).toBe('2')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  const error = new Error('denied')
  await wrapper.setProps({ beforeCommit: () => Promise.reject(error) })
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  await flushPromises()
  expect(wrapper.emitted('commit-error')).toEqual([[error]])
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
})
for (const reason of ['external', 'disabled', 'readonly', 'direction', 'unmount']) {
  test(`pending guard cannot publish after ${reason}`, async () => {
    let finish!: (allow: boolean) => void
    let signal!: AbortSignal
    const wrapper = render({
      beforeCommit: (_payload: unknown, _done: unknown, context: { signal: AbortSignal }) => {
        signal = context.signal
        return new Promise<boolean>((resolve) => {
          finish = resolve
        })
      },
    })
    await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
    if (reason === 'external') {
      await wrapper.setProps({ modelValue: 9 })
    } else if (reason === 'direction') {
      await wrapper.setProps({ disableIncrement: true })
    } else if (reason === 'unmount') {
      wrapper.unmount()
    } else {
      await wrapper.setProps({ [reason]: true })
    }
    expect(signal.aborted).toBe(true)
    finish(true)
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
}
test('input-mode approval followed by blur commits once and does not invoke the hook twice', async () => {
  let finish!: (allow: boolean) => void
  const beforeCommit = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        finish = resolve
      }),
  )
  const wrapper = render({ beforeCommit, modelEvent: 'input' })
  await wrapper.get('input').setValue('5')
  await wrapper.get('input').trigger('blur')
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  finish(true)
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toEqual([[5]])
  expect(wrapper.emitted('change')?.map((args) => args[0])).toEqual([5])
  expect(beforeCommit).toHaveBeenCalledTimes(1)
})
test('clear uses the same guard and preserves the model when rejected', async () => {
  const wrapper = render({ clearable: true, beforeCommit: () => false })
  await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(wrapper.get('input').element.value).toBe('2')
  expect(wrapper.emitted('clear')).toBeUndefined()
  await wrapper.setProps({ beforeCommit: () => true })
  await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]])
  expect(wrapper.emitted('clear')).toHaveLength(1)
})

test('controlled live input and blur share one approval before parent props flush', async () => {
  let finish!: (allowed: false | void) => void
  const beforeCommit = vi.fn(
    () =>
      new Promise<false | void>((resolve) => {
        finish = resolve
      }),
  )
  const model = ref<number | null | undefined>(2)
  const wrapper = mount({
    setup: () => () =>
      h(InputNumber, {
        modelValue: model.value,
        modelEvent: 'input',
        beforeCommit,
        'onUpdate:modelValue': (value) => {
          model.value = value
        },
      }),
  })
  wrappers.push(wrapper)
  await wrapper.get('input').setValue('5')
  await wrapper.get('input').trigger('blur')
  finish(undefined)
  await flushPromises()
  expect(model.value).toBe(5)
  expect(beforeCommit).toHaveBeenCalledTimes(1)
  expect(
    wrapper
      .getComponent(InputNumber)
      .emitted('change')
      ?.map((args) => args[0]),
  ).toEqual([5])
})

test('deactivation and disposal invalidate pending approval even before its continuation runs', async () => {
  let finish!: (allowed: false | void) => void
  let signal!: AbortSignal
  const visible = ref(true)
  const beforeCommit = (_payload: unknown, _done: unknown, context: { signal: AbortSignal }) => {
    signal = context.signal
    return new Promise<false | void>((resolve) => {
      finish = resolve
    })
  }
  const wrapper = mount({
    setup: () => () => h(KeepAlive, () => (visible.value ? h(InputNumber, { defaultValue: 2, beforeCommit }) : null)),
  })
  wrappers.push(wrapper)
  const field = wrapper.getComponent(InputNumber)
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  visible.value = false
  await nextTick()
  expect(signal.aborted).toBe(true)
  finish(undefined)
  await flushPromises()
  expect(field.emitted('update:modelValue')).toBeUndefined()
  visible.value = true
  await nextTick()
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  finish(undefined)
  wrapper.unmount()
  await flushPromises()
  expect(field.emitted('update:modelValue')).toBeUndefined()
})
test('popup approves the final transaction once rather than guarding inner draft steps', async () => {
  let finish!: (allowed: false | void) => void
  const beforeCommit = vi.fn(
    () =>
      new Promise<false | void>((resolve) => {
        finish = resolve
      }),
  )
  const surface = { template: '<div><slot /></div>' }
  const wrapper = mount(PublicInputNumber, {
    props: { editMode: 'popup', defaultOpen: true, defaultValue: 2, beforeCommit },
    global: { stubs: { MpPopup: surface, Popup: surface, teleport: true } },
  })
  wrappers.push(wrapper)
  await wrapper.get('[aria-haspopup=dialog]').trigger('click')
  await flushPromises()
  await wrapper.get('input').trigger('keydown', { key: 'ArrowUp' })
  expect(beforeCommit).not.toHaveBeenCalled()
  expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  await wrapper.get('.mp-field-presentation__footer button').trigger('click')
  await flushPromises()
  expect(beforeCommit).toHaveBeenCalledTimes(1)
  finish(undefined)
  await flushPromises()
  expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(3)
})
