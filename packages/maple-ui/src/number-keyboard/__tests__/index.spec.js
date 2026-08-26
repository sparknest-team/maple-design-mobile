import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import NumberKeyboard from '..'
import { delay } from '../../utils/test'
import VarNumberKeyboard from '../NumberKeyboard.vue'

test('number-keyboard plugin', () => {
  const app = createApp({}).use(NumberKeyboard)
  expect(app.component(NumberKeyboard.name)).toBeTruthy()
})

describe('number-keyboard', () => {
  function mountKeyboard(props = {}) {
    return mount(VarNumberKeyboard, {
      props: {
        open: true,
        ...props,
      },
      attachTo: document.body,
    })
  }

  test('renders keys', async () => {
    const wrapper = mountKeyboard()
    await delay(16)

    expect(document.querySelector('.mp-number-keyboard__key')).toBeTruthy()
    expect(document.body.textContent).toContain('1')
    expect(document.body.textContent).toContain('0')

    wrapper.unmount()
  })

  test('input appends and respects maxLength', async () => {
    const wrapper = mountKeyboard({
      modelValue: '',
      maxLength: 2,
    })
    await delay(16)

    const keys = document.querySelectorAll('.mp-number-keyboard__key')
    await keys[0].dispatchEvent(new Event('click'))
    await keys[1].dispatchEvent(new Event('click'))
    await keys[2].dispatchEvent(new Event('click'))

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['12'])
    expect(wrapper.emitted('update:modelValue')?.[2]).toBeUndefined()
    expect(wrapper.emitted('input')?.length).toBe(2)

    wrapper.unmount()
  })

  test('delete removes last character', async () => {
    const wrapper = mountKeyboard({
      modelValue: '12',
    })
    await delay(16)

    const deleteKey = document.querySelector('.mp-number-keyboard__key--delete')
    await deleteKey.dispatchEvent(new Event('click'))

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('delete')).toBeTruthy()

    wrapper.unmount()
  })

  test('open/close via open', async () => {
    const wrapper = mount(VarNumberKeyboard, {
      props: {
        open: false,
        popupContainer: false,
      },
    })

    expect(wrapper.find('.mp-number-keyboard').exists()).toBeFalsy()

    await wrapper.setProps({ open: true })
    await delay(16)
    expect(wrapper.find('.mp-number-keyboard').exists()).toBeTruthy()

    await wrapper.setProps({ open: false })
    await delay(300)
    expect(wrapper.find('.mp-number-keyboard').isVisible()).toBeFalsy()

    wrapper.unmount()
  })
})
