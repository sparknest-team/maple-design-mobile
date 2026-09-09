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
      v-model:open="open"
      status="danger"
      position="center"
      content-class="test-message"
      vertical
      :elevation="5"
      :duration="500"
      loading-type="wave"
      loading-size="lg"
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
        open: true,
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
  const onOpen = vi.fn()
  const onOpened = vi.fn()
  const onClose = vi.fn()
  const onClosed = vi.fn()
  const { mockRestore } = mockStubs()

  const template = `
    <mp-message v-model:open="visible" @open="onOpen" @opened="onOpened" @close="onClose" @closed="onClosed">
      Message
    </mp-message>`

  const wrapper = mount({
    components: {
      [VarMessage.name]: VarMessage,
    },
    data() {
      return {
        visible: false,
      }
    },
    methods: {
      onOpen,
      onOpened,
      onClose,
      onClosed,
    },
    template,
  })

  await delay(0)
  await wrapper.setData({ visible: true })
  await delay(200)
  await wrapper.setData({ visible: false })
  await delay(200)

  expect(onOpen).toHaveBeenCalledTimes(1)
  expect(onOpened).toHaveBeenCalledTimes(1)
  expect(onClose).toHaveBeenCalledTimes(1)
  expect(onClosed).toHaveBeenCalledTimes(1)

  mockRestore()
  wrapper.unmount()
})
