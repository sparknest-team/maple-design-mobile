import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import PullRefresh from '..'
import { delay, trigger } from '../../utils/test'
import MpPullRefresh from '../PullRefresh.vue'

function mountPullRefresh(props = {}) {
  return mount(MpPullRefresh, {
    props,
    slots: {
      default: () => h('div', { style: 'height: 200px; width: 100%' }),
    },
  })
}

test('pull-refresh plugin', () => {
  const app = createApp({}).use(PullRefresh)
  expect(app.component(PullRefresh.name)).toBeTruthy()
})

describe('pull-refresh', () => {
  test('color and bgColor', () => {
    const wrapper = mountPullRefresh({
      color: 'green',
      bgColor: 'blue',
    })
    const control = wrapper.find('.mp-pull-refresh__control')

    expect(control.attributes('style').includes('color: green')).toBe(true)
    expect(control.attributes('style').includes('background: blue')).toBe(true)

    wrapper.unmount()
  })

  test('animationDuration', async () => {
    const wrapper = mountPullRefresh({
      animationDuration: 200,
    })
    const el = wrapper.find('.mp-pull-refresh')
    const control = wrapper.find('.mp-pull-refresh__control')

    await trigger(el, 'touchstart', 0, 0)
    await trigger(el, 'touchmove', 0, 50)
    await trigger(el, 'touchend', 0, 50)

    expect(control.attributes('style').includes('transform 200ms')).toBe(true)

    wrapper.unmount()
  })

  test('disabled prevents pulling', async () => {
    const wrapper = mountPullRefresh({
      disabled: true,
    })
    const el = wrapper.find('.mp-pull-refresh')
    const control = wrapper.find('.mp-pull-refresh__control')

    await trigger(el, 'touchstart', 0, 0)
    await trigger(el, 'touchmove', 0, 50)

    expect(control.attributes('style').includes('translate3d(0px, -125%, 0px)')).toBe(true)

    wrapper.unmount()
  })

  test('success state', async () => {
    const refresh = vi.fn()
    const wrapper = mount({
      components: {
        [MpPullRefresh.name]: MpPullRefresh,
      },
      data() {
        return {
          isRefresh: false,
        }
      },
      methods: {
        onRefresh: refresh,
      },
      template: `
        <mp-pull-refresh
          v-model="isRefresh"
          success-color="green"
          success-bg-color="blue"
          :success-duration="300"
          :animation-duration="100"
          @refresh="onRefresh"
        >
          <div style="height: 200px; width: 100%"></div>
        </mp-pull-refresh>
      `,
    })

    const el = wrapper.find('.mp-pull-refresh')
    const control = wrapper.find('.mp-pull-refresh__control')

    await trigger(el, 'touchstart', 0, 0)
    await trigger(el, 'touchmove', 0, 200)
    await trigger(el, 'touchend', 0, 150)
    await delay(200)

    expect(wrapper.vm.isRefresh).toBe(true)
    expect(refresh).toHaveBeenCalledTimes(1)

    wrapper.vm.isRefresh = false
    await delay(200)

    expect(control.attributes('style').includes('color: green')).toBe(true)
    expect(control.attributes('style').includes('background: blue')).toBe(true)
    expect(wrapper.find('.mp-pull-refresh__control--success').exists()).toBe(true)

    await delay(300)

    expect(control.attributes('style').includes('translate3d(0px, 0px, 0px)')).toBe(true)

    wrapper.unmount()
  })
})
