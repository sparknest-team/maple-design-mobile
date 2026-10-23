import { defineComponent, h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'

const ticks: Array<() => void> = []
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    nextTick: (callback?: () => void) => {
      if (callback) {
        ticks.push(callback)
        return Promise.resolve()
      }
      return actual.nextTick()
    },
  }
})
const owners: Array<ReturnType<typeof mount>> = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  ticks.length = 0
  vi.restoreAllMocks()
})
async function fixture() {
  const focus = vi.fn(),
    editorFocus = vi.fn()
  const props = reactive({ presentation: 'popup' as const, open: true })
  const active = ref(true)
  const reference = defineComponent({
    setup(_, { expose }) {
      expose({ focus })
      return () => h('button')
    },
  })
  const panel = defineComponent({
    setup(_, { expose }) {
      expose({ focus: editorFocus })
      return () => h('div')
    },
  })
  const dialog = defineComponent({
    name: 'AuditDialog',
    setup:
      (_, { slots }) =>
      () =>
        h('div', slots.default?.()),
  })
  const Child = defineComponent({ setup: () => () => h(FieldPresentation, props) })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
    {
      global: { stubs: { FieldReference: reference, EditorPanel: panel, Dialog: dialog } },
    },
  )
  owners.push(owner)
  const flush = async () => {
    await nextTick()
    await nextTick()
  }
  const close = async () => {
    props.open = false
    await flush()
    return ticks[ticks.length - 1]
  }
  return { focus, editorFocus, props, active, owner, flush, close }
}
test('current closed editor restores its reference after render', async () => {
  const f = await fixture()
  const restore = await f.close()
  expect(f.focus).not.toHaveBeenCalled()
  restore()
  expect(f.focus).toHaveBeenCalledTimes(1)
})
test('a consumed close callback cannot focus twice', async () => {
  const f = await fixture()
  const restore = await f.close()
  restore()
  restore()
  expect(f.focus).toHaveBeenCalledTimes(1)
})
test('close callback cannot steal focus from a reopened editor', async () => {
  const f = await fixture()
  const restore = await f.close()
  f.props.open = true
  await f.flush()
  restore()
  expect(f.focus).not.toHaveBeenCalled()
})
test('superseded close cannot focus the current reference', async () => {
  const f = await fixture()
  const old = await f.close()
  f.props.open = true
  await f.flush()
  const current = await f.close()
  old()
  expect(f.focus).not.toHaveBeenCalled()
  current()
  expect(f.focus).toHaveBeenCalledTimes(1)
})
test('deactivation retires queued restore across activation', async () => {
  const f = await fixture()
  const restore = await f.close()
  f.active.value = false
  await f.flush()
  f.active.value = true
  await f.flush()
  restore()
  expect(f.focus).not.toHaveBeenCalled()
})
test('unmount retires the queued restore', async () => {
  const f = await fixture()
  const restore = await f.close()
  f.owner.unmount()
  restore()
  expect(f.focus).not.toHaveBeenCalled()
})
