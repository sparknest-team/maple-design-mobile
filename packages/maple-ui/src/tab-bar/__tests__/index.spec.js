import { createApp, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import TabBar from '..'
import VarTabBarItem from '../../tab-bar/TabBarItem'
import { delay, trigger } from '../../utils/test'
import VarTabBar from '../TabBar'
import TabBarItem from '../TabBarItem.vue'

const Wrapper = {
  components: {
    [VarTabBar.name]: VarTabBar,
    [VarTabBarItem.name]: VarTabBarItem,
  },
  data: () => ({
    active: 0,
  }),
  template: `
    <mp-tab-bar v-model:active="active">
      <template #fab>
        <span>home</span>
      </template>
      <mp-tab-bar-item label="tag 1" icon="home-fill" name="home-fill" :badge="{ dot: true, content: 10 }" />
      <mp-tab-bar-item label="tag 2" icon="search" />
      <mp-tab-bar-item label="tag 3" icon="heart-fill" />
      <mp-tab-bar-item label="tag 4" icon="user-circle-fill" />
    </mp-tab-bar>
  `,
}

test('tab-bar plugin', () => {
  const app = createApp({}).use(TabBar)
  expect(app.component(TabBar.name)).toBeTruthy()
  expect(app.component(TabBarItem.name)).toBeTruthy()
})

describe('test tab-bar events', () => {
  test('tab-bar change event', async () => {
    let dummy
    const handleChange = vi.fn((active) => {
      dummy = active
    })
    const wrapper = mount({
      components: {
        [VarTabBar.name]: VarTabBar,
        [VarTabBarItem.name]: VarTabBarItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleChange,
      },
      template: `
        <mp-tab-bar v-model:active="active" @change="handleChange">
          <mp-tab-bar-item label="tag 1" icon="home-fill" />
          <mp-tab-bar-item label="tag 2" icon="search" />
        </mp-tab-bar>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-tab-bar-item')[1], 'click')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)

    await trigger(wrapper.findAll('.mp-tab-bar-item')[1], 'click')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    wrapper.unmount()
  })

  test('tab-bar click event', async () => {
    let dummy
    const handleClick = vi.fn((active) => {
      dummy = active
    })
    const wrapper = mount({
      components: {
        [VarTabBar.name]: VarTabBar,
        [VarTabBarItem.name]: VarTabBarItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleClick,
      },
      template: `
        <mp-tab-bar v-model:active="active">
          <mp-tab-bar-item label="tag 1" icon="home-fill" />
          <mp-tab-bar-item label="tag 2" icon="search" @click="handleClick" />
        </mp-tab-bar>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-tab-bar-item')[1], 'click')
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    wrapper.unmount()
  })

  test('tab-bar before-change event', async () => {
    const handleBeforeChange = vi.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 200)
        }),
    )
    const wrapper = mount({
      components: {
        [VarTabBar.name]: VarTabBar,
        [VarTabBarItem.name]: VarTabBarItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleBeforeChange,
      },
      template: `
        <mp-tab-bar v-model:active="active" :before-change="handleBeforeChange">
          <mp-tab-bar-item label="tag 1" icon="home-fill" />
          <mp-tab-bar-item label="tag 2" icon="search" />
        </mp-tab-bar>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-tab-bar-item')[1], 'click')
    expect(handleBeforeChange).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.active).toBe(0)
    await delay(200)
    expect(wrapper.vm.active).toBe(1)

    await trigger(wrapper.findAll('.mp-tab-bar-item')[1], 'click')
    expect(handleBeforeChange).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.active).toBe(1)
    await delay(200)
    expect(wrapper.vm.active).toBe(1)

    wrapper.unmount()
  })

  test('tab-bar fab-click event', async () => {
    const handleFabClick = vi.fn()
    const wrapper = mount({
      components: {
        [VarTabBar.name]: VarTabBar,
        [VarTabBarItem.name]: VarTabBarItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleFabClick,
      },
      template: `
        <mp-tab-bar v-model:active="active" @fab-click="handleFabClick">
          <template #fab>
            <span>home</span>
          </template>
          <mp-tab-bar-item label="tag 1" icon="home-fill" />
          <mp-tab-bar-item label="tag 2" icon="search" />
        </mp-tab-bar>
      `,
    })

    await delay(16)
    await trigger(wrapper.find('.mp-button'), 'click')
    expect(handleFabClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('test tab-bar component props', () => {
  test('tab-bar fixed', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        fixed: true,
      },
    })

    expect(wrapper.find('.mp-tab-bar--fixed').exists()).toBe(true)
    await wrapper.setProps({ fixed: false })
    expect(wrapper.find('.mp-tab-bar--fixed').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tab-bar border', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        border: true,
      },
    })

    expect(wrapper.find('.mp-tab-bar--border').exists()).toBe(true)
    await wrapper.setProps({ border: false })
    expect(wrapper.find('.mp-tab-bar--border').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tab-bar safe-area', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        safeArea: true,
      },
    })

    expect(wrapper.find('.mp-tab-bar--safe-area').exists()).toBe(true)
    await wrapper.setProps({ safeArea: false })
    expect(wrapper.find('.mp-tab-bar--safe-area').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tab-bar z-index', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        zIndex: 2,
      },
    })

    expect(wrapper.find('.mp-tab-bar').attributes('style')).toContain('z-index: 2;')
    await wrapper.setProps({ zIndex: '3' })
    expect(wrapper.find('.mp-tab-bar').attributes('style')).toContain('z-index: 3;')
    wrapper.unmount()
  })

  test('tab-bar active-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        activeColor: 'red',
      },
    })

    await wrapper.setData({ active: 'home-fill' })
    await delay(16)
    expect(wrapper.find('.mp-tab-bar-item--active').attributes('style')).toContain('color: red;')
    await wrapper.setProps({ activeColor: '#ffffff' })
    expect(wrapper.find('.mp-tab-bar-item--active').attributes('style')).toContain('color: rgb(255, 255, 255);')
    wrapper.unmount()
  })

  test('tab-bar inactive-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        inactiveColor: 'red',
      },
    })

    wrapper.findAll('.mp-tab-bar-item').forEach((item) => {
      expect(item.attributes('style')).toContain('color: red;')
    })
    await wrapper.setProps({ inactiveColor: '#ffffff' })
    wrapper.findAll('.mp-tab-bar-item').forEach((item) => {
      expect(item.attributes('style')).toContain('color: rgb(255, 255, 255);')
    })
    wrapper.unmount()
  })

  test('tab-bar placeholder', async () => {
    const wrapper = mount(VarTabBar, {
      props: {
        placeholder: true,
        fixed: true,
      },
    })

    expect(wrapper.find('.mp-tab-bar__placeholder').exists()).toBe(true)
    await wrapper.setProps({ placeholder: false, fixed: false })
    expect(wrapper.find('.mp-tab-bar__placeholder').exists()).toBe(false)
    await wrapper.setProps({ placeholder: true, fixed: false })
    expect(wrapper.find('.mp-tab-bar__placeholder').exists()).toBe(false)

    wrapper.unmount()
  })

  test('tab-bar fab-props', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        fabProps: { size: 'xs', status: 'danger' },
      },
    })

    expect(wrapper.find('.mp-button').classes()).toContain('mp-button--size-xs')
    expect(wrapper.find('.mp-button').classes()).toContain('mp-button--status-danger')
    await wrapper.setProps({ fabProps: { size: 'lg', status: 'success' } })
    expect(wrapper.find('.mp-button').classes()).toContain('mp-button--size-lg')
    expect(wrapper.find('.mp-button').classes()).toContain('mp-button--status-success')
    wrapper.unmount()
  })

  test('variant mode', async () => {
    const wrapper = mount({
      components: {
        [VarTabBar.name]: VarTabBar,
        [VarTabBarItem.name]: VarTabBarItem,
      },
      data: () => ({
        variant: false,
      }),
      template: `
<mp-tab-bar :variant="variant">
  <mp-tab-bar-item label="tag 1" icon="home-fill" name="home-fill" :badge="{ dot: true, content: 10 }" />
  <mp-tab-bar-item label="tag 2" icon="search" />
  <mp-tab-bar-item label="tag 3" icon="heart-fill" />
  <mp-tab-bar-item label="tag 4" icon="user-circle-fill" />
</mp-tab-bar>
      `,
    })

    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ variant: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})

test('fab reserves space when tabs change and restores it when removed', async () => {
  const wrapper = mount({
    components: { MpTabBar: VarTabBar, MpTabBarItem: VarTabBarItem },
    data: () => ({ count: 4, showFab: true, active: 0 }),
    template: `
      <mp-tab-bar v-model:active="active">
        <mp-tab-bar-item v-for="i in count" :key="i" :label="String(i)" />
        <template v-if="showFab" #fab><span>Create post</span></template>
      </mp-tab-bar>
    `,
  })
  await delay(16)
  let items = wrapper.findAll('.mp-tab-bar-item')
  expect(items[1].classes()).toContain('mp-tab-bar-item--right-half-space')
  expect(items[2].classes()).toContain('mp-tab-bar-item--left-half-space')
  expect(wrapper.find('.mp-tab-bar--fab-center').exists()).toBe(true)
  await wrapper.find('.mp-tab-bar__fab').trigger('click')
  expect(wrapper.vm.active).toBe(0)
  await wrapper.setData({ count: 5 })
  await delay(16)
  items = wrapper.findAll('.mp-tab-bar-item')
  expect(items[4].classes()).toContain('mp-tab-bar-item--right-space')
  expect(wrapper.find('.mp-tab-bar--fab-right').exists()).toBe(true)
  expect(wrapper.find('.mp-tab-bar-item--right-half-space').exists()).toBe(false)
  expect(wrapper.find('.mp-tab-bar-item--left-half-space').exists()).toBe(false)
  await wrapper.setData({ showFab: false })
  expect(wrapper.find('.mp-tab-bar__fab').exists()).toBe(false)
  expect(wrapper.find('.mp-tab-bar-item--right-space').exists()).toBe(false)
  wrapper.unmount()
})

const makeTabBar = (props = {}, names = [undefined, undefined, undefined]) =>
  mount(VarTabBar, {
    props,
    slots: { default: () => names.map((name, i) => h(TabBarItem, { name, label: String(i) })) },
  })
const selectedText = (wrapper) => wrapper.find('.mp-tab-bar-item--active').text()
const deferred = () => {
  let resolve, reject
  const promise = new Promise((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}

test('default-active initializes once and supports uncontrolled clicks', async () => {
  const wrapper = makeTabBar({ defaultActive: 1 })
  await flushPromises()
  expect(selectedText(wrapper)).toBe('1')
  await wrapper.setProps({ defaultActive: 2 })
  expect(selectedText(wrapper)).toBe('1')
  await wrapper.findAll('button')[2].trigger('click')
  expect(selectedText(wrapper)).toBe('2')
  expect(wrapper.emitted('change')).toEqual([[2]])
  wrapper.unmount()
})

test('controlled active wins and releasing control retains its last value', async () => {
  const wrapper = makeTabBar({ active: 0, defaultActive: 2 })
  await flushPromises()
  await wrapper.findAll('button')[1].trigger('click')
  expect(selectedText(wrapper)).toBe('0')
  expect(wrapper.emitted('update:active')).toEqual([[1]])
  await wrapper.setProps({ active: 1 })
  expect(selectedText(wrapper)).toBe('1')
  await wrapper.setProps({ active: undefined })
  expect(selectedText(wrapper)).toBe('1')
  await wrapper.findAll('button')[2].trigger('click')
  expect(selectedText(wrapper)).toBe('2')
  wrapper.unmount()
})

test('explicit numeric names take precedence over unnamed indices', async () => {
  const wrapper = makeTabBar({ active: 0 }, [undefined, 0, 10])
  await flushPromises()
  expect(wrapper.findAll('.mp-tab-bar-item--active')).toHaveLength(1)
  expect(selectedText(wrapper)).toBe('1')
  await wrapper.setProps({ active: 2 })
  expect(wrapper.findAll('.mp-tab-bar-item--active')).toHaveLength(0)
  await wrapper.setProps({ active: 10 })
  expect(selectedText(wrapper)).toBe('2')
  wrapper.unmount()
})

test('default slot active follows the committed selection', async () => {
  const wrapper = mount(VarTabBar, {
    slots: {
      default: () => [0, 1].map((name) => h(TabBarItem, { name }, { default: ({ active }) => `${name}:${active}` })),
    },
  })
  await flushPromises()
  expect(wrapper.text()).toContain('0:true')
  await wrapper.findAll('button')[1].trigger('click')
  expect(wrapper.text()).toContain('0:false')
  expect(wrapper.text()).toContain('1:true')
  wrapper.unmount()
})

test('only the latest async guard can commit', async () => {
  const slow = deferred(),
    fast = deferred()
  const wrapper = makeTabBar({ beforeChange: (value) => (value === 1 ? slow.promise : fast.promise) })
  await flushPromises()
  await wrapper.findAll('button')[1].trigger('click')
  await wrapper.findAll('button')[2].trigger('click')
  fast.resolve(true)
  await flushPromises()
  expect(selectedText(wrapper)).toBe('2')
  slow.resolve(true)
  await flushPromises()
  expect(wrapper.emitted('change')).toEqual([[2]])
  wrapper.unmount()
})

test('clicking current tab or changing controlled active cancels pending guards', async () => {
  const pending = deferred()
  const wrapper = makeTabBar({ beforeChange: () => pending.promise })
  await flushPromises()
  await wrapper.findAll('button')[1].trigger('click')
  await wrapper.findAll('button')[0].trigger('click')
  pending.resolve(true)
  await flushPromises()
  expect(wrapper.emitted('change')).toBeUndefined()
  const second = deferred()
  await wrapper.setProps({ active: 0, beforeChange: () => second.promise })
  await wrapper.findAll('button')[1].trigger('click')
  await wrapper.setProps({ active: 2 })
  second.resolve(true)
  await flushPromises()
  expect(selectedText(wrapper)).toBe('2')
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})

test.each(['false', 'throw', 'reject'])('guard %s cancels safely', async (mode) => {
  const wrapper = makeTabBar({
    beforeChange: () => {
      if (mode === 'throw') {
        throw Error('blocked')
      }
      if (mode === 'reject') {
        return Promise.reject(Error('blocked'))
      }
      return false
    },
  })
  await flushPromises()
  await wrapper.findAll('button')[1].trigger('click')
  await flushPromises()
  expect(selectedText(wrapper)).toBe('0')
  expect(wrapper.emitted('change')).toBeUndefined()
  wrapper.unmount()
})

test('unmount invalidates pending guards', async () => {
  const pending = deferred()
  const wrapper = makeTabBar({ beforeChange: () => pending.promise })
  await flushPromises()
  await wrapper.findAll('button')[1].trigger('click')
  wrapper.unmount()
  pending.resolve(true)
  await flushPromises()
  expect(wrapper.emitted('change')).toBeUndefined()
})

test('named selection survives keyed reorder and pending removal cancels', async () => {
  const pending = deferred()
  const wrapper = mount({
    components: { VarTabBar, TabBarItem },
    data: () => ({ names: [0, 10, 20], guard: () => pending.promise }),
    template:
      '<var-tab-bar :default-active="0" :before-change="guard"><tab-bar-item v-for="name in names" :key="name" :name="name" :label="String(name)" /></var-tab-bar>',
  })
  await flushPromises()
  await wrapper.setData({ names: [20, 10, 0] })
  expect(selectedText(wrapper)).toBe('0')
  await wrapper.findAll('button')[0].trigger('click')
  await wrapper.setData({ names: [10, 0] })
  await flushPromises()
  pending.resolve(true)
  await flushPromises()
  expect(selectedText(wrapper)).toBe('0')
  expect(wrapper.findComponent(VarTabBar).emitted('change')).toBeUndefined()
  wrapper.unmount()
})

test('placeholder follows variant height changes', async () => {
  const wrapper = makeTabBar({ fixed: true, placeholder: true })
  await flushPromises()
  wrapper.find('.mp-tab-bar').element.getBoundingClientRect = () => ({ height: 66 })
  await wrapper.setProps({ variant: true })
  await flushPromises()
  expect(wrapper.find('.mp-tab-bar__placeholder').attributes('style')).toContain('height: 66px')
  wrapper.unmount()
})
