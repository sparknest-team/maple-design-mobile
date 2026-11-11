import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Picker from '../Picker.vue'

let owner
let container
let descriptor
let media
let listeners
beforeEach(() => {
  descriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia')
  listeners = []
  media = {
    matches: false,
    addEventListener: vi.fn((type, listener) => listeners.push(listener)),
    removeEventListener: vi.fn(),
  }
  Object.defineProperty(window, 'matchMedia', { configurable: true, writable: true, value: () => media })
  container = document.createElement('div')
  document.body.appendChild(container)
})
afterEach(() => {
  try {
    owner?.unmount()
  } finally {
    container.remove()
    if (descriptor) {
      Object.defineProperty(window, 'matchMedia', descriptor)
    } else {
      delete window.matchMedia
    }
    vi.restoreAllMocks()
    owner = undefined
  }
})
function fixture(extra = {}) {
  const visible = ref(true)
  const columns = ref([[{ text: 'A' }, { text: 'B' }]])
  const Host = defineComponent({
    setup: () => () =>
      h(KeepAlive, null, {
        default: () => (visible.value ? h(Picker, { columns: columns.value, modelValue: ['A'], ...extra }) : null),
      }),
  })
  owner = mount(Host, { attachTo: container })
  return { picker: owner.getComponent(Picker), visible, columns }
}

describe('Picker owned motion resources', () => {
  it('settles a current transform completion normally', async () => {
    const { picker } = fixture()
    await picker.findAll('[role="option"]')[1].trigger('click')
    await picker.get('.mp-picker__scroller').trigger('transitionend', { propertyName: 'transform' })
    expect(picker.emitted('change')).toHaveLength(1)
  })
  it('releases the original media listener on disposal', () => {
    fixture()
    owner.unmount()
    owner = undefined
    expect(media.removeEventListener).toHaveBeenCalledWith('change', listeners[0])
  })
  it('releases the media listener while suspended', async () => {
    const { visible } = fixture()
    visible.value = false
    await nextTick()
    expect(media.removeEventListener).toHaveBeenCalledWith('change', listeners[0])
  })
  it('rejects an old preference listener delivered after disposal', async () => {
    const { picker } = fixture()
    await picker.findAll('[role="option"]')[1].trigger('click')
    const column = picker.vm.scrollColumns[0]
    const callback = listeners[0]
    owner.unmount()
    owner = undefined
    const duration = column.duration
    media.matches = true
    callback()
    expect(column.duration).toBe(duration)
  })
  it('does not commit an opacity completion as a transform completion', async () => {
    const { picker } = fixture()
    await picker.findAll('[role="option"]')[1].trigger('click')
    await picker.get('.mp-picker__scroller').trigger('transitionend', { propertyName: 'opacity' })
    expect(picker.emitted('change')).toBeUndefined()
  })
  it('rejects a transition callback for a replaced column', async () => {
    const { picker, columns } = fixture()
    const previous = picker.vm.scrollColumns[0]
    columns.value = [[{ text: 'C' }, { text: 'D' }]]
    await nextTick()
    await picker.findAll('[role="option"]')[1].trigger('click')
    picker.vm.handleTransitionend(previous)
    expect(picker.emitted('change')).toBeUndefined()
  })
  it('rejects retained clicks while suspended', async () => {
    const { picker, visible } = fixture()
    const column = picker.vm.scrollColumns[0]
    visible.value = false
    await nextTick()
    picker.vm.handleClick(column, 1)
    expect(column.index).toBe(0)
  })

  it('rebinds on fresh activation without accepting the old listener', async () => {
    const { picker, visible } = fixture()
    const previous = listeners[0]
    visible.value = false
    await nextTick()
    visible.value = true
    await nextTick()
    expect(listeners).toHaveLength(2)
    await picker.findAll('[role="option"]')[1].trigger('click')
    media.matches = true
    previous()
    expect(picker.emitted('change')).toBeUndefined()
    listeners[1]()
    expect(picker.emitted('change')).toHaveLength(1)
  })

  it('ignores a bubbled child transform completion', async () => {
    const { picker } = fixture()
    await picker.findAll('[role="option"]')[1].trigger('click')
    await picker.findAll('[role="option"]')[1].trigger('transitionend', { propertyName: 'transform' })
    expect(picker.emitted('change')).toBeUndefined()
    await picker.get('.mp-picker__scroller').trigger('transitionend', { propertyName: 'transform' })
    expect(picker.emitted('change')).toHaveLength(1)
  })

  it('does not overwrite a newer keyboard selection created by change notification', async () => {
    media.matches = true
    let replace = true
    const { picker } = fixture({
      onChange: () => {
        if (replace) {
          replace = false
          picker.vm.handleColumnKeydown(new KeyboardEvent('keydown', { key: 'Home' }), picker.vm.scrollColumns[0])
        }
      },
    })
    await picker.findAll('[role="option"]')[1].trigger('click')
    expect(picker.vm.scrollColumns[0].index).toBe(0)
    expect(picker.emitted('update:modelValue').map((entry) => entry[0])).toEqual([['A']])
  })
})
