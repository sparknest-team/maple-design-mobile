import { createApp, createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { beforeEach, expect, test, vi } from 'vitest'
import InfiniteScroll from '..'
import Tabs, { TabNav, TabsNavs } from '../../tabs'
import TabItem from '../../tabs/TabItem.vue'
import TabsItems from '../../tabs/TabsItems.vue'
import { delay } from '../../utils/test'
import _InfiniteScroll from '../InfiniteScroll.vue'

beforeEach(() => {
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 100 })
})

function setDetectorBottom(wrapper, bottom) {
  vi.spyOn(wrapper.find('.mp-infinite-scroll__detector').element, 'getBoundingClientRect').mockReturnValue({
    bottom,
  })
}

test('installs InfiniteScroll', () => {
  const app = createApp({}).use(InfiniteScroll)
  expect(app.component(InfiniteScroll.name)).toBeTruthy()
})

test('check updates status before load and synchronously locks duplicate checks', async () => {
  const events = []
  const wrapper = mount(_InfiniteScroll, {
    props: {
      immediate: false,
      'onUpdate:status': (status) => events.push(`status:${status}`),
      onLoad: () => events.push('load'),
    },
  })
  setDetectorBottom(wrapper, 100)

  await Promise.all([wrapper.vm.check(), wrapper.vm.check(), wrapper.vm.check()])

  expect(events).toEqual(['status:loading', 'load'])
})

test('retry emits retry without load', async () => {
  const onLoad = vi.fn()
  const onRetry = vi.fn()
  const onUpdateStatus = vi.fn()
  const wrapper = mount(_InfiniteScroll, {
    props: {
      status: 'error',
      immediate: false,
      onLoad,
      onRetry,
      'onUpdate:status': onUpdateStatus,
    },
  })

  await wrapper.find('.mp-infinite-scroll__retry').trigger('click')

  expect(onUpdateStatus).toHaveBeenCalledWith('loading')
  expect(onRetry).toHaveBeenCalledTimes(1)
  expect(onLoad).not.toHaveBeenCalled()
})

test('custom error slot receives retry', async () => {
  const onRetry = vi.fn()
  const wrapper = mount(_InfiniteScroll, {
    props: { status: 'error', immediate: false, onRetry },
    slots: {
      error: ({ retry }) => h('button', { class: 'custom-retry', onClick: retry }, 'retry'),
    },
  })

  await wrapper.find('.custom-retry').trigger('click')
  expect(onRetry).toHaveBeenCalledTimes(1)
})

test('finished and disabled prevent loading', async () => {
  const onLoad = vi.fn()
  const finished = mount(_InfiniteScroll, {
    props: { status: 'finished', immediate: false, onLoad },
  })
  setDetectorBottom(finished, 0)
  await finished.vm.check()

  const disabled = mount(_InfiniteScroll, {
    props: { disabled: true, immediate: false, onLoad },
  })
  setDetectorBottom(disabled, 0)
  await disabled.vm.check()

  expect(onLoad).not.toHaveBeenCalled()
})

test.each(['2rem', '3em', '10vh', '10vw', 'calc(1rem + 8px)'])(
  'converts the CSS length %s without dropping its unit',
  async (bottomOffset) => {
    const onLoad = vi.fn()
    const wrapper = mount(_InfiniteScroll, {
      props: { bottomOffset, immediate: false, onLoad },
    })
    setDetectorBottom(wrapper, 132)
    vi.spyOn(wrapper.element.lastElementChild, 'getBoundingClientRect').mockReturnValue({ width: 32 })

    await wrapper.vm.check()
    expect(onLoad).toHaveBeenCalledTimes(1)
  },
)

test('treats numeric bottomOffset as pixels and invalid CSS as zero', async () => {
  const onLoad = vi.fn()
  const numeric = mount(_InfiniteScroll, {
    props: { bottomOffset: 24, immediate: false, onLoad },
  })
  setDetectorBottom(numeric, 124)
  await numeric.vm.check()

  const invalid = mount(_InfiniteScroll, {
    props: { bottomOffset: 'not-a-length', immediate: false, onLoad },
  })
  setDetectorBottom(invalid, 101)
  await invalid.vm.check()

  expect(onLoad).toHaveBeenCalledTimes(1)
})

test('unlocks after an accepted loading state completes', async () => {
  const onLoad = vi.fn()
  const wrapper = mount(_InfiniteScroll, {
    props: { immediate: false, onLoad },
  })
  setDetectorBottom(wrapper, 100)

  await wrapper.vm.check()
  await wrapper.setProps({ status: 'loading' })
  await wrapper.setProps({ status: 'idle' })
  await delay(100)

  expect(onLoad).toHaveBeenCalledTimes(2)
})

test('uses scroll metrics when target is a descendant scroller', async () => {
  const onLoad = vi.fn()
  const wrapper = mount(_InfiniteScroll, {
    props: { bottomOffset: 10, immediate: false, onLoad },
    slots: { default: () => h('div', { class: 'inner-scroller' }) },
  })
  const target = wrapper.find('.inner-scroller').element
  Object.defineProperties(target, {
    scrollHeight: { configurable: true, value: 200 },
    clientHeight: { configurable: true, value: 100 },
    scrollTop: { configurable: true, writable: true, value: 89 },
  })
  await wrapper.setProps({ target })
  setDetectorBottom(wrapper, 0)

  await wrapper.vm.check()
  expect(onLoad).not.toHaveBeenCalled()

  target.scrollTop = 90
  await wrapper.vm.check()
  expect(onLoad).toHaveBeenCalledTimes(1)
})

test('rebinds when target changes and removes the old listener', async () => {
  const first = document.createElement('div')
  const second = document.createElement('div')
  document.body.append(first, second)
  const firstAdd = vi.spyOn(first, 'addEventListener')
  const firstRemove = vi.spyOn(first, 'removeEventListener')
  const secondAdd = vi.spyOn(second, 'addEventListener')
  const secondRemove = vi.spyOn(second, 'removeEventListener')
  const wrapper = mount(_InfiniteScroll, {
    props: { target: first, immediate: false },
  })

  expect(firstAdd).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  await wrapper.setProps({ target: second })
  expect(firstRemove).toHaveBeenCalledWith('scroll', expect.any(Function))
  expect(secondAdd).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })

  wrapper.unmount()
  expect(secondRemove).toHaveBeenCalledWith('scroll', expect.any(Function))
  first.remove()
  second.remove()
})

test('does not load in a hidden tab and checks when activated', async () => {
  const loadFirst = vi.fn()
  const loadSecond = vi.fn()
  const wrapper = mount(
    {
      components: {
        [InfiniteScroll.name]: InfiniteScroll,
        [TabsItems.name]: TabsItems,
        [Tabs.name]: Tabs,
        [TabsNavs.name]: TabsNavs,
        [TabNav.name]: TabNav,
        [TabItem.name]: TabItem,
      },
      data: () => ({ active: 0, first: 'idle', second: 'idle' }),
      methods: { loadFirst, loadSecond },
      template: `
      <mp-tabs v-model:active="active">
      <mp-tabs-navs><mp-tab-nav :key="0" title="First" /><mp-tab-nav :key="1" title="Second" /></mp-tabs-navs>
      <mp-tabs-items>
        <mp-tab-item :key="0">
          <mp-infinite-scroll v-model:status="first" @load="loadFirst" />
        </mp-tab-item>
        <mp-tab-item :key="1">
          <mp-infinite-scroll v-model:status="second" @load="loadSecond" />
        </mp-tab-item>
      </mp-tabs-items></mp-tabs>
    `,
    },
    { attachTo: document.body },
  )

  await delay(100)
  expect(loadFirst).toHaveBeenCalledTimes(1)
  expect(loadSecond).not.toHaveBeenCalled()

  await wrapper.setData({ active: 1 })
  await delay(100)
  expect(wrapper.findAll('[role="tabpanel"]')[1].attributes('hidden')).toBeUndefined()
  expect(loadSecond).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

test('rechecks after PullRefresh-style disabling ends', async () => {
  const onLoad = vi.fn()
  const wrapper = mount(_InfiniteScroll, {
    props: { disabled: true, immediate: false, onLoad },
  })
  setDetectorBottom(wrapper, 0)

  await wrapper.setProps({ disabled: false })
  await delay(40)
  expect(onLoad).toHaveBeenCalledTimes(1)
})

test('renders safely during SSR', async () => {
  const html = await renderToString(createSSRApp(_InfiniteScroll, { target: '#scroller' }))
  expect(html).toContain('mp-infinite-scroll')
})
