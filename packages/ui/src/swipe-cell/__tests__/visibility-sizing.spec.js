import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import SwipeCell from '../SwipeCell.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
function setup(props = {}) {
  const trigger = document.createElement('button')
  document.body.append(trigger)
  trigger.focus()
  const owner = mount(SwipeCell, {
    attachTo: document.body,
    props,
    slots: {
      left: () => h('button', { id: 'left-action' }, 'left'),
      right: () => h('button', { id: 'right-action' }, 'right'),
    },
  })
  owners.push(owner)
  return { owner, trigger, wrapper: owner.find('.mp-swipe-cell__wrapper') }
}
function event(type, x) {
  const result = new Event(type, { bubbles: true, cancelable: true })
  Object.defineProperty(result, 'touches', { value: [{ clientX: x, clientY: 0 }] })
  return result
}

test('only opened actions are accessible and focus returns to the opener', async () => {
  const { owner, trigger } = setup({ leftWidth: 80, rightWidth: 80 })
  const left = owner.find('.mp-swipe-cell__left'),
    right = owner.find('.mp-swipe-cell__right')
  expect(left.attributes('inert')).toBeDefined()
  expect(right.attributes('aria-hidden')).toBe('true')
  owner.vm.open('left')
  await nextTick()
  expect(left.attributes('inert')).toBeUndefined()
  expect(right.attributes('inert')).toBeDefined()
  left.find('button').element.focus()
  await owner.vm.close()
  await nextTick()
  expect(document.activeElement).toBe(trigger)
  expect(left.attributes('inert')).toBeDefined()
  owner.vm.open('right')
  await nextTick()
  expect(left.attributes('inert')).toBeDefined()
  expect(right.attributes('inert')).toBeUndefined()
})

test('automatic width is remeasured before open and when the open action resizes', async () => {
  let resize
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(cb) {
        resize = cb
      }
      observe() {}
      disconnect() {}
    },
  )
  let width = 80
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    return { width: this.classList.contains('mp-swipe-cell__left') ? width : 0 }
  })
  const { owner, wrapper } = setup()
  await nextTick()
  owner.vm.open('left')
  await nextTick()
  expect(wrapper.attributes('style')).toContain('80px')
  width = 120
  resize()
  await nextTick()
  expect(wrapper.attributes('style')).toContain('120px')
  width = 140
  owner.vm.open('left')
  await nextTick()
  expect(wrapper.attributes('style')).toContain('140px')
})

test('external loading cancels a gesture and ignores its later events', async () => {
  const { owner, wrapper } = setup({ leftWidth: 80 })
  const root = owner.element
  root.dispatchEvent(event('touchstart', 0))
  root.dispatchEvent(event('touchmove', 40))
  await nextTick()
  expect(wrapper.attributes('style')).toContain('40px')
  await owner.setProps({ loading: true })
  root.dispatchEvent(event('touchmove', 70))
  root.dispatchEvent(event('touchend', 70))
  await owner.setProps({ loading: false })
  expect(wrapper.attributes('style')).toContain('0px')
  expect(owner.emitted('open')).toBeUndefined()
})

test('focus falls back to the cell if the opener can no longer receive focus', async () => {
  const { owner, trigger } = setup({ leftWidth: 80 })
  owner.vm.open('left')
  await nextTick()
  owner.find('#left-action').element.focus()
  trigger.disabled = true
  await owner.vm.close()
  expect(document.activeElement).toBe(owner.element)
})
