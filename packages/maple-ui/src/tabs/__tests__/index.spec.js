import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Tabs from '..'
import Tab from '../../tab'
import TabItem from '../../tab-item'
import TabsItems from '../../tabs-items'
import { delay, mockOffset, mockScrollTo } from '../../utils/test'

mockScrollTo()
mockOffset()

const Wrapper = {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [TabsItems.name]: TabsItems,
    [TabItem.name]: TabItem,
  },
  props: [
    'onClick',
    'onChange',
    'vertical',
    'itemVertical',
    'fixedBottom',
    'color',
    'activeColor',
    'inactiveColor',
    'disabledColor',
    'indicatorColor',
    'indicatorSize',
    'elevation',
    'safeArea',
    'scrollable',
    'indicatorPosition',
  ],
  data: () => ({
    active: 2,
  }),
  template: `
    <mp-tabs v-model:active="active" v-bind="$props">
    <mp-tab style="width: 100px">tab 1</mp-tab>
    <mp-tab disabled style="width: 100px">tab 2</mp-tab>
    <mp-tab style="width: 100px">tab 3</mp-tab>
    </mp-tabs>
    <mp-tabs-items>
    <mp-tab-item>tab item 1</mp-tab-item>
    <mp-tab-item>tab item 2</mp-tab-item>
    <mp-tab-item>tab item 3</mp-tab-item>
    </mp-tabs-items>
  `,
}

test('tabs & tab & tabsItems & tabItem plugin', () => {
  const app = createApp({}).use(Tabs).use(Tab).use(TabsItems).use(TabItem)
  expect(app.component(Tabs.name)).toBeTruthy()
  expect(app.component(Tab.name)).toBeTruthy()
  expect(app.component(TabsItems.name)).toBeTruthy()
  expect(app.component(TabItem.name)).toBeTruthy()
})

test('tabs event', async () => {
  const onClick = vi.fn()
  const onChange = vi.fn()
  const wrapper = mount(Wrapper, {
    props: {
      onClick,
      onChange,
    },
  })

  await delay(100)
  await wrapper.find('.mp-tab').trigger('click')
  expect(onClick).toHaveBeenLastCalledWith(0)
  expect(onChange).toHaveBeenLastCalledWith(0)
  wrapper.unmount()
})

describe('test tabs component props', () => {
  test('tabs vertical', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        vertical: 'horizontal',
      },
    })

    expect(wrapper.find('.mp-tabs--layout-horizontal').exists()).toBe(true)
    await wrapper.setProps({ vertical: 'vertical' })
    expect(wrapper.find('.mp-tabs--layout-vertical').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tabs item-vertical', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        itemVertical: 'horizontal',
      },
    })

    expect(wrapper.find('.mp-tabs--item-horizontal').exists()).toBe(true)
    await wrapper.setProps({ itemVertical: 'vertical' })
    expect(wrapper.find('.mp-tabs--item-vertical').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tabs fixed-bottom', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        fixedBottom: true,
      },
    })

    expect(wrapper.find('.mp-tabs--fixed-bottom').exists()).toBe(true)
    await wrapper.setProps({ fixedBottom: false })
    expect(wrapper.find('.mp-tabs--fixed-bottom').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tabs color', () => {
    const wrapper = mount(Wrapper, {
      props: {
        color: 'red',
      },
    })

    expect(wrapper.find('.mp-tabs').attributes('style')).toContain('background: red;')
    wrapper.unmount()
  })

  test('tabs active-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        activeColor: 'red',
      },
    })

    await delay(100)
    expect(wrapper.find('.mp-tab--active').attributes('style')).toContain('color: red;')
    wrapper.unmount()
  })

  test('tabs inactive-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        inactiveColor: 'red',
      },
    })

    await delay(100)
    expect(wrapper.find('.mp-tab--inactive').attributes('style')).toContain('color: red;')
    wrapper.unmount()
  })

  test('tabs disabled-color', () => {
    const wrapper = mount(Wrapper, {
      props: {
        disabledColor: 'red',
      },
    })

    expect(wrapper.find('.mp-tab--disabled').attributes('style')).toContain('color: red;')
    wrapper.unmount()
  })

  test('tabs indicator-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        indicatorColor: 'red',
      },
    })

    await delay(100)
    expect(wrapper.find('.mp-tabs--layout-horizontal-indicator-inner').attributes('style')).toContain(
      'background: red;',
    )
    wrapper.unmount()
  })

  test('tabs indicator-size', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        indicatorSize: '10px',
      },
    })

    expect(wrapper.find('.mp-tabs--layout-horizontal-indicator').attributes('style')).toContain('height: 10px;')
    await wrapper.setProps({ indicatorSize: 4 })
    expect(wrapper.find('.mp-tabs--layout-horizontal-indicator').attributes('style')).toContain('height: 4px;')
    wrapper.unmount()
  })

  test('tabs elevation', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        elevation: true,
      },
    })

    expect(wrapper.find('.mp-elevation--4').exists()).toBe(true)
    await wrapper.setProps({ elevation: false })
    expect(wrapper.find('.mp-elevation--4').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tabs safe-area', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        safeArea: true,
      },
    })

    expect(wrapper.find('.mp-tabs--safe-area').exists()).toBe(true)
    await wrapper.setProps({ safeArea: false })
    expect(wrapper.find('.mp-tabs--safe-area').exists()).toBe(false)
    wrapper.unmount()
  })

  test('tabs scrollable', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        scrollable: 'auto',
      },
    })
    await delay(100)
    expect(wrapper.find('.mp-tabs--layout-horizontal-scrollable').exists()).toBe(false)
    wrapper.setProps({ scrollable: 'always' })
    await delay(100)
    expect(wrapper.find('.mp-tabs--layout-horizontal-scrollable').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tabs indicator-position', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        indicatorPosition: 'reverse',
      },
    })

    expect(wrapper.find('.mp-tabs--layout-horizontal-reverse-indicator').exists()).toBe(true)
    await wrapper.setProps({ indicatorPosition: 'normal' })
    expect(wrapper.find('.mp-tabs--layout-horizontal-indicator').exists()).toBe(true)
    wrapper.unmount()
  })
})

test('tabs items getCarousel method', async () => {
  const onUpdateActive = vi.fn((active) => {
    wrapper.setProps({ active })
  })

  const wrapper = mount(TabsItems, {
    props: {
      active: 0,
      'onUpdate:active': onUpdateActive,
    },
    slots: {
      default: () => [
        h(TabItem, { slots: { default: () => 'hello' } }),
        h(TabItem, { slots: { default: () => 'hello' } }),
      ],
    },
  })

  await delay(0)
  expect(wrapper.vm.getCarousel()).toBeTruthy()
  wrapper.vm.getCarousel().next()
  expect(onUpdateActive).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})
