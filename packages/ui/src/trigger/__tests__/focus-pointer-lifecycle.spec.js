import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '..'

test('cleans pointer listeners from both documents on unmount', async () => {
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const popupDoc = frame.contentDocument
  const mainAdd = vi.spyOn(document, 'addEventListener')
  const mainRemove = vi.spyOn(document, 'removeEventListener')
  const popupAdd = vi.spyOn(popupDoc, 'addEventListener')
  const popupRemove = vi.spyOn(popupDoc, 'removeEventListener')
  const wrapper = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, trigger: 'focus', popupContainer: popupDoc.body },
    slots: { default: () => h('button', 'ref'), content: () => h('input') },
  })
  try {
    await nextTick()
    await nextTick()
    const registered = [mainAdd, popupAdd].map((spy) =>
      spy.mock.calls.filter(([type]) => type === 'pointerdown' || type === 'pointerup' || type === 'pointercancel'),
    )
    expect(registered.map((calls) => calls.length)).toEqual([3, 3])
    wrapper.unmount()
    for (const [index, remove] of [mainRemove, popupRemove].entries()) {
      for (const [type, listener, capture] of registered[index]) {
        expect(remove).toHaveBeenCalledWith(type, listener, capture)
      }
    }
  } finally {
    wrapper.unmount()
    frame.remove()
    vi.restoreAllMocks()
  }
})

const tick = async () => {
  await nextTick()
  await nextTick()
}
const activePointerCalls = ({ add, remove }) => {
  const timeline = [add, remove]
    .flatMap((spy, action) =>
      spy.mock.calls.map((args, index) => ({ args, action, order: spy.mock.invocationCallOrder[index] })),
    )
    .sort((a, b) => a.order - b.order)
  const active = new Map()
  for (const {
    args: [type, listener, capture],
    action,
  } of timeline) {
    if (!['pointerdown', 'pointerup', 'pointercancel'].includes(type) || capture !== true) {
      continue
    }
    const set = active.get(listener) ?? new Set()
    if (action === 0) {
      set.add(type)
    } else {
      set.delete(type)
    }
    active.set(listener, set)
  }
  return [...active.values()].flatMap((set) => [...set]).sort()
}

test('deactivation removes both documents pointer listeners and activation restores exactly one set', async () => {
  const frame = document.createElement('iframe')
  document.body.append(frame)
  const popupDoc = frame.contentDocument
  const spies = [document, popupDoc].map((doc) => ({
    add: vi.spyOn(doc, 'addEventListener'),
    remove: vi.spyOn(doc, 'removeEventListener'),
  }))
  const enabled = ref(true)
  const Host = defineComponent({
    setup: () => () =>
      h(KeepAlive, null, {
        default: () =>
          enabled.value
            ? h(
                Trigger,
                { open: true, trigger: 'focus', popupContainer: popupDoc.body },
                { default: () => h('button', 'reference'), content: () => h('input') },
              )
            : null,
      }),
  })
  const wrapper = mount(Host, { attachTo: document.body })
  try {
    await tick()
    const expected = ['pointercancel', 'pointerdown', 'pointerup']
    for (const spy of spies) {
      expect(activePointerCalls(spy)).toEqual(expected)
    }
    enabled.value = false
    await tick()
    for (const spy of spies) {
      expect(activePointerCalls(spy)).toEqual([])
    }
    enabled.value = true
    await tick()
    for (const spy of spies) {
      expect(activePointerCalls(spy)).toEqual(expected)
    }
    wrapper.unmount()
    for (const spy of spies) {
      expect(activePointerCalls(spy)).toEqual([])
    }
  } finally {
    wrapper.unmount()
    frame.remove()
    vi.restoreAllMocks()
  }
})
