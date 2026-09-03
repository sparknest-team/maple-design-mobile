import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import BottomNavigation from '..'
import VarBottomNavigationItem from '../../bottom-navigation/BottomNavigationItem'
import BottomNavigationItem from '../../bottom-navigation/BottomNavigationItem.vue'
import { delay, trigger } from '../../utils/test'
import VarBottomNavigation from '../BottomNavigation'

const Wrapper = {
  components: {
    [VarBottomNavigation.name]: VarBottomNavigation,
    [VarBottomNavigationItem.name]: VarBottomNavigationItem,
  },
  data: () => ({
    active: 0,
  }),
  template: `
    <mp-bottom-navigation v-model:active="active">
      <template #fab>
        <span>home</span>
      </template>
      <mp-bottom-navigation-item label="tag 1" icon="home" name="home" :badge="{ dot: true, value: 10 }" />
      <mp-bottom-navigation-item label="tag 2" icon="magnify" />
      <mp-bottom-navigation-item label="tag 3" icon="heart" />
      <mp-bottom-navigation-item label="tag 4" icon="account-circle" />
    </mp-bottom-navigation>
  `,
}

test('bottom-navigation plugin', () => {
  const app = createApp({}).use(BottomNavigation)
  expect(app.component(BottomNavigation.name)).toBeTruthy()
  expect(app.component(BottomNavigationItem.name)).toBeTruthy()
})

describe('test bottom-navigation events', () => {
  test('bottom-navigation change event', async () => {
    let dummy
    const handleChange = vi.fn((active) => {
      dummy = active
    })
    const wrapper = mount({
      components: {
        [VarBottomNavigation.name]: VarBottomNavigation,
        [VarBottomNavigationItem.name]: VarBottomNavigationItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleChange,
      },
      template: `
        <mp-bottom-navigation v-model:active="active" @change="handleChange">
          <mp-bottom-navigation-item label="tag 1" icon="home" />
          <mp-bottom-navigation-item label="tag 2" icon="magnify" />
        </mp-bottom-navigation>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-bottom-navigation-item')[1], 'click')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)

    await trigger(wrapper.findAll('.mp-bottom-navigation-item')[1], 'click')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    wrapper.unmount()
  })

  test('bottom-navigation click event', async () => {
    let dummy
    const handleClick = vi.fn((active) => {
      dummy = active
    })
    const wrapper = mount({
      components: {
        [VarBottomNavigation.name]: VarBottomNavigation,
        [VarBottomNavigationItem.name]: VarBottomNavigationItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleClick,
      },
      template: `
        <mp-bottom-navigation v-model:active="active">
          <mp-bottom-navigation-item label="tag 1" icon="home" />
          <mp-bottom-navigation-item label="tag 2" icon="magnify" @click="handleClick" />
        </mp-bottom-navigation>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-bottom-navigation-item')[1], 'click')
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    wrapper.unmount()
  })

  test('bottom-navigation before-change event', async () => {
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
        [VarBottomNavigation.name]: VarBottomNavigation,
        [VarBottomNavigationItem.name]: VarBottomNavigationItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleBeforeChange,
      },
      template: `
        <mp-bottom-navigation v-model:active="active" :before-change="handleBeforeChange">
          <mp-bottom-navigation-item label="tag 1" icon="home" />
          <mp-bottom-navigation-item label="tag 2" icon="magnify" />
        </mp-bottom-navigation>
      `,
    })

    await delay(16)
    await trigger(wrapper.findAll('.mp-bottom-navigation-item')[1], 'click')
    expect(handleBeforeChange).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.active).toBe(0)
    await delay(200)
    expect(wrapper.vm.active).toBe(1)

    await trigger(wrapper.findAll('.mp-bottom-navigation-item')[1], 'click')
    expect(handleBeforeChange).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.active).toBe(1)
    await delay(200)
    expect(wrapper.vm.active).toBe(1)

    wrapper.unmount()
  })

  test('bottom-navigation fab-click event', async () => {
    const handleFabClick = vi.fn()
    const wrapper = mount({
      components: {
        [VarBottomNavigation.name]: VarBottomNavigation,
        [VarBottomNavigationItem.name]: VarBottomNavigationItem,
      },
      data: () => ({
        active: 0,
      }),
      methods: {
        handleFabClick,
      },
      template: `
        <mp-bottom-navigation v-model:active="active" @fab-click="handleFabClick">
          <template #fab>
            <span>home</span>
          </template>
          <mp-bottom-navigation-item label="tag 1" icon="home" />
          <mp-bottom-navigation-item label="tag 2" icon="magnify" />
        </mp-bottom-navigation>
      `,
    })

    await delay(16)
    await trigger(wrapper.find('.mp-button'), 'click')
    expect(handleFabClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('test bottom-navigation component props', () => {
  test('bottom-navigation fixed', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        fixed: true,
      },
    })

    expect(wrapper.find('.mp-bottom-navigation--fixed').exists()).toBe(true)
    await wrapper.setProps({ fixed: false })
    expect(wrapper.find('.mp-bottom-navigation--fixed').exists()).toBe(false)
    wrapper.unmount()
  })

  test('bottom-navigation border', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        border: true,
      },
    })

    expect(wrapper.find('.mp-bottom-navigation--border').exists()).toBe(true)
    await wrapper.setProps({ border: false })
    expect(wrapper.find('.mp-bottom-navigation--border').exists()).toBe(false)
    wrapper.unmount()
  })

  test('bottom-navigation safe-area', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        safeArea: true,
      },
    })

    expect(wrapper.find('.mp-bottom-navigation--safe-area').exists()).toBe(true)
    await wrapper.setProps({ safeArea: false })
    expect(wrapper.find('.mp-bottom-navigation--safe-area').exists()).toBe(false)
    wrapper.unmount()
  })

  test('bottom-navigation z-index', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        zIndex: 2,
      },
    })

    expect(wrapper.find('.mp-bottom-navigation').attributes('style')).toContain('z-index: 2;')
    await wrapper.setProps({ zIndex: '3' })
    expect(wrapper.find('.mp-bottom-navigation').attributes('style')).toContain('z-index: 3;')
    wrapper.unmount()
  })

  test('bottom-navigation active-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        activeColor: 'red',
      },
    })

    await delay(16)
    expect(wrapper.find('.mp-bottom-navigation-item--active').attributes('style')).toContain('color: red;')
    await wrapper.setProps({ activeColor: '#ffffff' })
    expect(wrapper.find('.mp-bottom-navigation-item--active').attributes('style')).toContain(
      'color: rgb(255, 255, 255);',
    )
    wrapper.unmount()
  })

  test('bottom-navigation inactive-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        inactiveColor: 'red',
      },
    })

    wrapper.findAll('.mp-bottom-navigation-item').forEach((item) => {
      expect(item.attributes('style')).toContain('color: red;')
    })
    await wrapper.setProps({ inactiveColor: '#ffffff' })
    wrapper.findAll('.mp-bottom-navigation-item').forEach((item) => {
      expect(item.attributes('style')).toContain('color: rgb(255, 255, 255);')
    })
    wrapper.unmount()
  })

  test('bottom-navigation placeholder', async () => {
    const wrapper = mount(VarBottomNavigation, {
      props: {
        placeholder: true,
        fixed: true,
      },
    })

    expect(wrapper.find('.mp-bottom-navigation__placeholder').exists()).toBe(true)
    await wrapper.setProps({ placeholder: false, fixed: false })
    expect(wrapper.find('.mp-bottom-navigation__placeholder').exists()).toBe(false)
    await wrapper.setProps({ placeholder: true, fixed: false })
    expect(wrapper.find('.mp-bottom-navigation__placeholder').exists()).toBe(false)

    wrapper.unmount()
  })

  test('bottom-navigation fab-props', async () => {
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
        [VarBottomNavigation.name]: VarBottomNavigation,
        [VarBottomNavigationItem.name]: VarBottomNavigationItem,
      },
      data: () => ({
        variant: false,
      }),
      template: `
<mp-bottom-navigation :variant="variant">
  <mp-bottom-navigation-item label="tag 1" icon="home" name="home" :badge="{ dot: true, value: 10 }" />
  <mp-bottom-navigation-item label="tag 2" icon="magnify" />
  <mp-bottom-navigation-item label="tag 3" icon="heart" />
  <mp-bottom-navigation-item label="tag 4" icon="account-circle" />
</mp-bottom-navigation>
      `,
    })

    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setData({ variant: true })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
