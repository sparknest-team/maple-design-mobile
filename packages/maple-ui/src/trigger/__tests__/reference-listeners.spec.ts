import { defineComponent, h, KeepAlive, nextTick, ref, shallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Trigger from '../index'
import { useTriggerReferenceListeners } from '../reference-listeners'

function fixture(listeners: Record<string, unknown>) {
  const first = document.createElement('button')
  const second = document.createElement('button')
  document.body.append(first, second)
  const reference = shallowRef<HTMLElement>(first)
  const Owner = defineComponent({
    setup(_, { attrs }) {
      useTriggerReferenceListeners(reference, attrs)
      return () => h('div')
    },
  })
  const owner = mount(Owner, { attrs: listeners })
  return {
    first,
    second,
    reference,
    owner,
    dispose() {
      owner.unmount()
      first.remove()
      second.remove()
    },
  }
}

test('Trigger sends regular, once, capture and passive reference listeners to the reference, never the popup', async () => {
  const click = vi.fn(),
    once = vi.fn(),
    capture = vi.fn(),
    passive = vi.fn()
  const owner = mount(Trigger, {
    attachTo: document.body,
    props: { open: true, popupContainer: false },
    attrs: { onClick: click, onClickOnce: once, onClickCapture: capture, onClickPassive: passive },
    slots: {
      default: () => h('button', { id: 'modifier-reference' }, 'Reference'),
      content: () => h('button', { id: 'modifier-popup' }, 'Popup'),
    },
  })
  try {
    await flushPromises()
    owner.get('#modifier-reference').element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    owner.get('#modifier-reference').element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(click).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
    expect(capture).toHaveBeenCalledTimes(2)
    expect(passive).toHaveBeenCalledTimes(2)
    document.querySelector('#modifier-popup')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(click).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})

test('updating a consumed once callback does not rearm it; removing and readding does', async () => {
  const once = vi.fn(),
    replacement = vi.fn()
  const f = fixture({ onClickOnce: once })
  try {
    f.first.click()
    f.first.click()
    await f.owner.setProps({ onClickOnce: replacement } as any)
    f.first.click()
    expect(once).toHaveBeenCalledTimes(1)
    expect(replacement).not.toHaveBeenCalled()
    await f.owner.setProps({ onClickOnce: undefined } as any)
    await f.owner.setProps({ onClickOnce: replacement } as any)
    f.first.click()
    f.first.click()
    expect(replacement).toHaveBeenCalledTimes(1)
  } finally {
    f.dispose()
  }
})

test('a replacement reference gets its own once lifetime and the previous reference is detached', async () => {
  const once = vi.fn()
  const f = fixture({ onClickOnceCapture: once })
  try {
    f.first.click()
    f.reference.value = f.second
    await nextTick()
    f.first.click()
    f.second.click()
    f.second.click()
    expect(once).toHaveBeenCalledTimes(2)
  } finally {
    f.dispose()
  }
})

test('KeepAlive suspension detaches native notifications without rearming a consumed once listener', async () => {
  const button = document.createElement('button')
  document.body.append(button)
  const active = ref(true),
    reference = shallowRef<HTMLElement>(button)
  const regular = vi.fn(),
    once = vi.fn()
  const Child = defineComponent({
    setup() {
      useTriggerReferenceListeners(reference, { onClick: regular, onClickOncePassive: once })
      return () => h('span')
    },
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, { default: () => (active.value ? h(Child) : null) }) }),
  )
  try {
    button.click()
    active.value = false
    await nextTick()
    button.click()
    active.value = true
    await nextTick()
    button.click()
    expect(regular).toHaveBeenCalledTimes(2)
    expect(once).toHaveBeenCalledTimes(1)
    owner.unmount()
    button.click()
    expect(regular).toHaveBeenCalledTimes(2)
  } finally {
    owner.unmount()
    button.remove()
  }
})

test('native once/capture/passive options are preserved and async failures use Vue error handling', async () => {
  const error = new Error('consumer rejected'),
    onError = vi.fn()
  const reference = shallowRef<HTMLElement>(document.createElement('button'))
  const add = vi.spyOn(reference.value, 'addEventListener')
  const owner = mount(
    defineComponent({
      setup() {
        useTriggerReferenceListeners(reference, { onClickOnceCapturePassive: () => Promise.reject(error) })
        return () => h('div')
      },
    }),
    { global: { config: { errorHandler: onError } } },
  )
  try {
    expect(add).toHaveBeenCalledWith('click', expect.any(Function), { once: true, capture: true, passive: true })
    reference.value.click()
    await flushPromises()
    expect(onError.mock.calls[0][0]).toBe(error)
  } finally {
    owner.unmount()
    add.mockRestore()
  }
})
