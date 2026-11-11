import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
const render = (props, slots) => {
  const w = mount(Upload, { attachTo: document.body, props: { editMode: 'direct', ripple: false, ...props }, slots })
  owners.push(w)
  const click = vi.spyOn(w.get('input[type=file]').element, 'click').mockImplementation(() => {})
  return { w, click }
}
test('a scoped chooser and bubbling default produce one native request', async () => {
  const { w, click } = render(
    {},
    { trigger: ({ chooseFile }) => h('button', { type: 'button', onClick: () => chooseFile() }, 'Choose once') },
  )
  await w.get('button').trigger('click')
  await flushPromises()
  expect(click).toHaveBeenCalledTimes(1)
})
test('interactive custom children own one keyboard entry while decorative custom content retains the wrapper entry', async () => {
  const child = render({}, { trigger: () => h('button', { type: 'button' }, 'Choose') })
  await flushPromises()
  const root = child.w.get('.mp-upload__trigger')
  expect(root.attributes('role')).toBeUndefined()
  expect(root.attributes('tabindex')).toBeUndefined()
  await child.w.get('button').trigger('click')
  await flushPromises()
  expect(child.click).toHaveBeenCalledTimes(1)
  child.w.unmount()
  owners.splice(owners.indexOf(child.w), 1)
  const display = render(
    {},
    { trigger: () => [h('svg', { tabindex: -1, 'aria-hidden': 'true' }), h('span', 'Decorative')] },
  )
  await flushPromises()
  const fallback = display.w.get('.mp-upload__trigger')
  expect(fallback.attributes('role')).toBe('button')
  expect(fallback.attributes('tabindex')).toBe('0')
  await fallback.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  await fallback.trigger('keydown', { key: ' ' })
  await flushPromises()
  expect(display.click).toHaveBeenCalledTimes(2)
})
test('requestChoose callback is scoped to one activation even if called twice', async () => {
  const requestChoose = vi.fn(async (choose) => {
    await Promise.all([choose(), choose()])
  })
  const { w, click } = render({ requestChoose })
  await w.get('.mp-upload__trigger').trigger('click')
  await flushPromises()
  expect(requestChoose).toHaveBeenCalledTimes(1)
  expect(click).toHaveBeenCalledTimes(1)
})
test('a child can cancel the fallback and choose after an explicit asynchronous decision', async () => {
  const { w, click } = render(
    {},
    {
      trigger: ({ chooseFile }) =>
        h(
          'button',
          {
            type: 'button',
            onClick: async (event) => {
              event.preventDefault()
              await Promise.resolve()
              await chooseFile()
            },
          },
          'Decide then choose',
        ),
    },
  )
  await w.get('button').trigger('click')
  await flushPromises()
  expect(click).toHaveBeenCalledTimes(1)
})
test('locally changing a custom component updates wrapper semantics', async () => {
  const interactive = ref(true)
  const Child = defineComponent({
    setup: () => () => (interactive.value ? h('button', 'Action') : h('span', 'Display')),
  })
  const { w } = render({}, { trigger: () => h(Child) })
  await flushPromises()
  const trigger = w.get('.mp-upload__trigger')
  expect(trigger.attributes('role')).toBeUndefined()
  interactive.value = false
  await flushPromises()
  expect(trigger.attributes('role')).toBe('button')
  interactive.value = true
  await flushPromises()
  expect(trigger.attributes('role')).toBeUndefined()
})
test('a chooser retained by requestChoose cannot revive after KeepAlive retirement', async () => {
  const shown = ref(true)
  let saved
  const w = mount(
    {
      render: () =>
        h(KeepAlive, null, () =>
          shown.value
            ? h(Upload, {
                editMode: 'direct',
                ripple: false,
                requestChoose: (choose) => {
                  saved = choose
                },
              })
            : h('span'),
        ),
    },
    { attachTo: document.body },
  )
  owners.push(w)
  const click = vi.spyOn(w.get('input[type=file]').element, 'click').mockImplementation(() => {})
  await w.get('.mp-upload__trigger').trigger('click')
  await flushPromises()
  expect(saved).toBeTypeOf('function')
  shown.value = false
  await flushPromises()
  shown.value = true
  await flushPromises()
  await saved()
  expect(click).not.toHaveBeenCalled()
})

test('a scoped chooser owns the click without also running requestChoose', async () => {
  const requestChoose = vi.fn(async (choose) => choose())
  const { w, click } = render(
    { requestChoose },
    { trigger: ({ chooseFile }) => h('button', { onClick: () => chooseFile() }, 'Own selection') },
  )
  await w.get('button').trigger('click')
  await flushPromises()
  expect(click).toHaveBeenCalledTimes(1)
  expect(requestChoose).not.toHaveBeenCalled()
})
