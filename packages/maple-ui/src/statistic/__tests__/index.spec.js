import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Statistic from '..'
import VarStatistic from '../Statistic'

test('statistic plugin', () => {
  const app = createApp({}).use(Statistic)
  expect(app.component(Statistic.name)).toBeTruthy()
})

test('statistic snapshot', () => {
  const wrapper = mount(VarStatistic, {
    props: {
      title: 'Downloads',
      value: 125670,
    },
  })
  expect(wrapper.html()).toMatchSnapshot()
  wrapper.unmount()
})

describe('test statistic component props', () => {
  test('statistic title and value', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        title: 'Downloads',
        value: 125670,
      },
    })

    expect(wrapper.find('.mp-statistic__title').text()).toBe('Downloads')
    expect(wrapper.find('.mp-statistic__value-integer').text()).toBe('125670')
    wrapper.unmount()
  })

  test('statistic group separator and custom separator', async () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 125670,
        showGroupSeparator: true,
      },
    })

    expect(wrapper.find('.mp-statistic__value-integer').text()).toBe('125,670')
    await wrapper.setProps({ separator: ' ' })
    expect(wrapper.find('.mp-statistic__value-integer').text()).toBe('125 670')
    wrapper.unmount()
  })

  test('statistic precision', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 40509.126,
        precision: 2,
      },
    })

    expect(wrapper.find('.mp-statistic__value-integer').text()).toBe('40509')
    expect(wrapper.find('.mp-statistic__value-decimal').text()).toBe('.13')
    wrapper.unmount()
  })

  test('statistic prefix and suffix props', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 12.8,
        precision: 1,
        prefix: '$',
        suffix: '%',
      },
    })

    expect(wrapper.find('.mp-statistic__prefix').text()).toBe('$')
    expect(wrapper.find('.mp-statistic__suffix').text()).toBe('%')
    wrapper.unmount()
  })

  test('statistic prefix and suffix slots', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 100,
      },
      slots: {
        prefix: () => h('span', { class: 'custom-prefix' }, 'up'),
        suffix: () => 'units',
      },
    })

    expect(wrapper.find('.custom-prefix').text()).toBe('up')
    expect(wrapper.find('.mp-statistic__suffix').text()).toBe('units')
    wrapper.unmount()
  })

  test('statistic string value', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: '1.28k',
      },
    })

    expect(wrapper.find('.mp-statistic__value').text()).toBe('1.28k')
    wrapper.unmount()
  })

  test('statistic default slot when value is empty', () => {
    const wrapper = mount(VarStatistic, {
      slots: {
        default: () => h('span', { class: 'custom-value' }, 'custom'),
      },
    })

    expect(wrapper.find('.custom-value').text()).toBe('custom')
    wrapper.unmount()
  })

  test('statistic value prop takes precedence over default slot', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 88,
      },
      slots: {
        default: () => 'ignored',
      },
    })

    expect(wrapper.find('.mp-statistic__value-integer').text()).toBe('88')
    expect(wrapper.text()).not.toContain('ignored')
    wrapper.unmount()
  })

  test('statistic tabular nums class', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 88,
        tabularNums: true,
      },
    })

    expect(wrapper.find('.mp-statistic__value').classes()).toContain('mp-statistic__value--tabular-nums')
    wrapper.unmount()
  })

  test('statistic placeholder', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        placeholder: '暂无数据',
      },
    })

    expect(wrapper.find('.mp-statistic__value').text()).toBe('暂无数据')
    wrapper.unmount()
  })

  test('statistic extra', () => {
    const wrapper = mount(VarStatistic, {
      props: {
        value: 10,
        extra: 'compared to yesterday',
      },
    })

    expect(wrapper.find('.mp-statistic__extra').text()).toBe('compared to yesterday')
    wrapper.unmount()
  })
})
