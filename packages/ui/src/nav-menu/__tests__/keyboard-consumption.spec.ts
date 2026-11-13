import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import NavMenu, { NavMenuItem } from '..'
import NavMenuOptions from '../NavMenuOptions'

for (const mode of ['prevented', 'composing', 'legacy-ime', 'normal'] as const) {
  test(`option navigation respects ${mode} ArrowDown`, async () => {
    const wrapper = mount(NavMenuOptions, {
      attachTo: document.body,
      props: {
        options: [
          {
            key: 'a',
            label: 'Alpha',
            props: mode === 'prevented' ? { onKeydown: (event: KeyboardEvent) => event.preventDefault() } : {},
          },
          { key: 'b', label: 'Beta' },
        ],
      },
    })
    try {
      const buttons = wrapper.findAll('[data-nav-option]')
      const first = buttons[0].element as HTMLElement
      first.focus()
      first.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
          cancelable: true,
          isComposing: mode === 'composing',
          ...(mode === 'legacy-ime' ? { keyCode: 229 } : {}),
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(mode === 'normal' ? buttons[1].element : first)
    } finally {
      wrapper.unmount()
    }
  })
}

for (const mode of ['prevented', 'composing', 'legacy-ime'] as const) {
  test(`does not open on ${mode} ArrowDown`, async () => {
    const wrapper = mount(NavMenuItem, {
      attachTo: document.body,
      props: {
        label: 'Choose',
        popupContainer: false,
        options: [{ key: 'a', label: 'Alpha' }],
        ...(mode === 'prevented' ? { onKeydown: (event: KeyboardEvent) => event.preventDefault() } : {}),
      },
    })
    try {
      const button = wrapper.get('[data-nav-item]')
      const event = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
        isComposing: mode === 'composing',
        ...(mode === 'legacy-ime' ? { keyCode: 229 } : {}),
      })
      button.element.dispatchEvent(event)
      await nextTick()
      expect(wrapper.emitted('update:open')).toBeUndefined()
      expect(button.attributes('aria-expanded')).toBe('false')
    } finally {
      wrapper.unmount()
    }
  })
}

test('normal ArrowDown still requests opening', async () => {
  const wrapper = mount(NavMenuItem, {
    attachTo: document.body,
    props: { label: 'Choose', popupContainer: false, options: [{ key: 'a', label: 'Alpha' }] },
  })
  try {
    await wrapper.get('[data-nav-item]').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

test('once listener may cancel the first key without blocking a later key', async () => {
  let calls = 0
  const wrapper = mount(NavMenuItem, {
    attachTo: document.body,
    props: {
      label: 'Choose',
      popupContainer: false,
      options: [{ key: 'a', label: 'Alpha' }],
      onKeydownOnce: (event: KeyboardEvent) => {
        calls++
        event.preventDefault()
      },
    },
  })
  try {
    const button = wrapper.get('[data-nav-item]')
    await button.trigger('keydown', { key: 'ArrowDown' })
    expect(calls).toBe(1)
    expect(wrapper.emitted('update:open')).toBeUndefined()
    await button.trigger('keydown', { key: 'ArrowDown' })
    expect(calls).toBe(1)
    expect(wrapper.emitted('update:open')).toEqual([[true]])
  } finally {
    wrapper.unmount()
  }
})

for (const mode of ['prevented', 'composing', 'legacy-ime', 'normal'] as const) {
  test(`parent navigation respects ${mode} ArrowRight`, async () => {
    const wrapper = mount(NavMenu, {
      attachTo: document.body,
      props: { mode: 'horizontal', popupContainer: false },
      slots: {
        default: () => [
          h(NavMenuItem, {
            label: 'First',
            'data-first': '',
            ...(mode === 'prevented' ? { onKeydown: (event: KeyboardEvent) => event.preventDefault() } : {}),
          }),
          h(NavMenuItem, { label: 'Second', 'data-second': '' }),
        ],
      },
    })
    try {
      const first = wrapper.get('[data-first]').element as HTMLElement,
        second = wrapper.get('[data-second]').element as HTMLElement
      first.focus()
      expect(document.activeElement).toBe(first)
      first.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          bubbles: true,
          cancelable: true,
          isComposing: mode === 'composing',
          ...(mode === 'legacy-ime' ? { keyCode: 229 } : {}),
        }),
      )
      await nextTick()
      expect(document.activeElement).toBe(mode === 'normal' ? second : first)
    } finally {
      wrapper.unmount()
    }
  })
}
