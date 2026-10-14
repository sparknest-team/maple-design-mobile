import { afterEach, expect, test, vi } from 'vitest'
import { previewImage } from '../preview'

vi.mock('../ImagePreview.vue', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    default: defineComponent({
      inheritAttrs: false,
      props: ['src'],
      emits: ['closed'],
      setup(props, { emit, expose }) {
        const close = () => emit('closed')
        expose({ close })
        return () => h('button', { 'data-preview-test': props.src, onClick: close }, props.src)
      },
    }),
  }
})
vi.mock('../ImagePreviewGroup.vue', async () => {
  const component = await import('../ImagePreview.vue')
  return { default: component.default }
})
const nodes = () => [...document.querySelectorAll('[data-preview-test]')]
afterEach(() => {
  const handle = previewImage({ src: 'cleanup' })
  handle?.close()
  vi.restoreAllMocks()
})
test('replacement finalizes the old instance exactly once and old handles cannot close the new instance', () => {
  const firstClosed = vi.fn()
  const secondClosed = vi.fn()
  const first = previewImage({ src: 'first', onClosed: firstClosed })
  const second = previewImage({ src: 'second', onClosed: secondClosed })
  expect(firstClosed).toHaveBeenCalledTimes(1)
  expect(nodes().map((node) => node.textContent)).toEqual(['second'])
  first.close()
  expect(secondClosed).not.toHaveBeenCalled()
  expect(nodes()).toHaveLength(1)
  second.close()
  expect(secondClosed).toHaveBeenCalledTimes(1)
  expect(nodes()).toHaveLength(0)
  previewImage({ src: 'third' })
  expect(firstClosed).toHaveBeenCalledTimes(1)
  expect(secondClosed).toHaveBeenCalledTimes(1)
})
test('normal closed removes its host before notifying and replacement never duplicates it', () => {
  const closed = vi.fn(() => expect(nodes()).toHaveLength(0))
  const handle = previewImage({ src: 'first', onClosed: closed })
  const host = nodes()[0].parentElement
  handle.close()
  expect(closed).toHaveBeenCalledTimes(1)
  expect(host.isConnected).toBe(false)
  previewImage({ src: 'second' })
  handle.close()
  expect(closed).toHaveBeenCalledTimes(1)
})
test('replacement cleans the host even when the old callback throws', () => {
  const failure = new Error('consumer callback')
  const closed = vi.fn(() => {
    expect(nodes()).toHaveLength(0)
    throw failure
  })
  previewImage({ src: 'first', onClosed: closed })
  const host = nodes()[0].parentElement
  expect(() => previewImage({ src: 'second' })).toThrow(failure)
  expect(host.isConnected).toBe(false)
  expect(nodes()).toHaveLength(0)
  previewImage({ src: 'third' })
  expect(closed).toHaveBeenCalledTimes(1)
})
test('a preview opened reentrantly by onClosed remains the sole latest instance', () => {
  const nestedClosed = vi.fn()
  let nested
  previewImage({
    src: 'first',
    onClosed: () => {
      nested = previewImage({ src: 'nested', onClosed: nestedClosed })
    },
  })
  const superseded = previewImage({ src: 'outer' })
  expect(superseded).toBeUndefined()
  expect(nodes().map((node) => node.textContent)).toEqual(['nested'])
  expect(nestedClosed).not.toHaveBeenCalled()
  nested.close()
  expect(nestedClosed).toHaveBeenCalledTimes(1)
  expect(nodes()).toHaveLength(0)
})
