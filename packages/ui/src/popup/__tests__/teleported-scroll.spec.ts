import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Dialog from '../../dialog'
import Popover from '../../popover'
import Select from '../../select'
import Popup from '../Popup.vue'

function touch(target: Element, type: string, clientY: number) {
  const event = new Event(type, { bubbles: true, cancelable: true, composed: true })
  const touches = [{ identifier: 1, clientX: 20, clientY }]
  Object.assign(event, { touches, changedTouches: touches })
  target.dispatchEvent(event)
  return event
}

test.each([1, 100_000])('allows touch scrolling in a teleported Select at modal z-index %s', async (zIndex) => {
  const wrapper = mount(Popup, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, zIndex },
    slots: {
      default: () =>
        h(Select, {
          defaultOpen: true,
          editMode: 'direct',
          filterable: true,
          options: Array.from({ length: 30 }, (_, value) => ({ value, label: String(value) })),
        }),
    },
  })
  const background = document.createElement('div')
  document.body.append(background)
  try {
    await flushPromises()
    const list = document.querySelector<HTMLElement>('.mp-select-dropdown-list-wrapper')!
    const option = list.querySelector('.mp-select-option-content')!
    expect(wrapper.get('[role="dialog"]').element.contains(option)).toBe(false)
    list.style.overflowY = 'auto'
    Object.defineProperties(list, { clientHeight: { value: 210 }, scrollHeight: { value: 1080 } })

    touch(option, 'touchstart', 100)
    expect(touch(option, 'touchmove', 70).defaultPrevented).toBe(false)

    list.scrollTop = 870
    touch(option, 'touchstart', 100)
    expect(touch(option, 'touchmove', 70).defaultPrevented).toBe(true)

    touch(background, 'touchstart', 100)
    expect(touch(background, 'touchmove', 70).defaultPrevented).toBe(true)
  } finally {
    wrapper.unmount()
    background.remove()
  }
})

test('separates the current Dialog’s floating region from a lower Popup’s floating region', async () => {
  const local = document.createElement('div')
  document.body.append(local)
  const popover = (label: string) =>
    h(
      Popover,
      { open: true, popupContainer: local },
      {
        default: () => h('button', label),
        content: () => h('div', { 'data-scroll-region': label, style: { overflowY: 'auto' } }, [h('span', label)]),
      },
    )
  const wrapper = mount(Popup, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, zIndex: 100 },
    slots: {
      default: () => [
        popover('lower'),
        h(
          Dialog,
          { open: true, popupContainer: false, zIndex: 200 },
          {
            default: () => popover('upper'),
          },
        ),
      ],
    },
  })
  try {
    await flushPromises()
    for (const region of local.querySelectorAll('[data-scroll-region]')) {
      Object.defineProperties(region, { clientHeight: { value: 100 }, scrollHeight: { value: 300 } })
    }
    const lower = local.querySelector('[data-scroll-region="lower"] span')!
    const upper = local.querySelector('[data-scroll-region="upper"] span')!
    touch(upper, 'touchstart', 100)
    expect(touch(upper, 'touchmove', 70).defaultPrevented).toBe(false)
    touch(lower, 'touchstart', 100)
    expect(touch(lower, 'touchmove', 70).defaultPrevented).toBe(true)
  } finally {
    wrapper.unmount()
    local.remove()
  }
})
