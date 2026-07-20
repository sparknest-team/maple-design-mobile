import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Message from '..'
import { delay, mockStubs } from '../../utils/test'
import VarMessage from '../Message'

test('message component plugin', () => {
  const app = createApp({}).use(Message.Component)
  expect(app.component(Message.Component.name)).toBeTruthy()
})

test('message style', async () => {
  const template = `
     <mp-message
      v-model:show="show"
      type="error"
      position="center"
      content-class="test-message"
      vertical
      :elevation="5"
      :duration="500"
      loading-type="wave"
      loading-size="large"
      content="test message"
      forbid-click
      lock-scroll
    />
   `
  const wrapper = mount({
    components: {
      [VarMessage.name]: VarMessage,
    },
    data() {
      return {
        show: true,
      }
    },
    template,
  })

  await delay(200)
  expect(document.body.innerHTML).toMatchSnapshot()

  await delay(500)
  expect(document.querySelector('.mp-message').style.display).toBe('none')

  wrapper.unmount()
})

test('message event', async () => {
  const open = vi.fn()
  const opened = vi.fn()
  const close = vi.fn()
  const closed = vi.fn()
  const { mockRestore } = mockStubs()

  const template = `
    <mp-message v-model:show="show" @open="open" @opened="opened" @close="close" @closed="closed">
      Message
    </mp-message>`

  const wrapper = mount({
    components: {
      [VarMessage.name]: VarMessage,
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      open,
      opened,
      close,
      closed,
    },
    template,
  })

  await delay(0)
  await wrapper.setData({ show: true })
  await delay(200)
  await wrapper.setData({ show: false })
  await delay(200)

  expect(open).toHaveBeenCalledTimes(1)
  expect(opened).toHaveBeenCalledTimes(1)
  expect(close).toHaveBeenCalledTimes(1)
  expect(closed).toHaveBeenCalledTimes(1)

  mockRestore()
  wrapper.unmount()
})
