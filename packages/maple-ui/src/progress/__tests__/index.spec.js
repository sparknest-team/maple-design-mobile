import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Progress from '..'
import VarProgress from '../Progress'

test('progress use', () => {
  const app = createApp({}).use(Progress)
  expect(app.component(Progress.name)).toBeTruthy()
})

describe('test progress component props', () => {
  test('progress mode', async () => {
    const wrapper = mount(VarProgress, {
      props: { mode: 'line' },
    })

    expect(wrapper.find('.mp-progress__line').exists()).toBe(true)
    await wrapper.setProps({ mode: 'circle' })
    expect(wrapper.find('.mp-progress__circle').exists()).toBe(true)
    wrapper.unmount()
  })

  test('progress percent', () => {
    const wrapper = mount(VarProgress, {
      props: {
        percent: 20,
      },
    })

    expect(wrapper.find('.mp-progress__line-certain').attributes('style')).toContain('width: 20%;')
    wrapper.unmount()
  })

  test('progress status', () => {
    ;['default', 'primary', 'info', 'success', 'warning', 'danger'].forEach((status) => {
      const wrapper = mount(VarProgress, {
        props: { status, mode: 'line' },
      })

      expect(wrapper.find(`.mp-progress__line--${status}`).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('progress stroke-width', () => {
    const wrapper = mount(VarProgress, {
      props: {
        strokeWidth: 5,
      },
    })

    expect(wrapper.find('.mp-progress__line-block').attributes('style')).toContain('height: 5px;')
    wrapper.unmount()
  })

  test('line progress color', () => {
    const wrapper = mount(VarProgress, {
      props: {
        color: 'red',
      },
    })

    expect(wrapper.find('.mp-progress__line-certain').attributes('style')).toContain('background: red;')
    wrapper.unmount()
  })

  test('circle progress color', () => {
    const wrapper = mount(VarProgress, {
      props: {
        color: {
          '0%': '#3fecff',
          '100%': '#6149f6',
        },
        mode: 'circle',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('progress track-color', () => {
    const wrapper = mount(VarProgress, {
      props: {
        trackColor: 'red',
      },
    })

    expect(wrapper.find('.mp-progress__line-background').attributes('style')).toContain('background: red;')
    wrapper.unmount()
  })

  test('progress showText', async () => {
    const wrapper = mount(VarProgress, {
      props: {
        showText: true,
      },
    })

    expect(wrapper.find('.mp-progress__line-label').exists()).toBe(true)
    await wrapper.setProps({ showText: false })
    expect(wrapper.find('.mp-progress__line-label').exists()).toBe(false)
    wrapper.unmount()
  })

  test('progress track', async () => {
    const wrapper = mount(VarProgress, {
      props: {
        track: true,
      },
    })

    expect(wrapper.find('.mp-progress__line-background').exists()).toBe(true)
    await wrapper.setProps({ track: false })
    expect(wrapper.find('.mp-progress__line-background').exists()).toBe(false)
    wrapper.unmount()
  })

  test('progress size', () => {
    const wrapper = mount(VarProgress, {
      props: {
        size: 20,
        mode: 'circle',
      },
    })

    expect(wrapper.find('.mp-progress__circle').attributes('style')).toContain('width: 20px;')
    expect(wrapper.find('.mp-progress__circle').attributes('style')).toContain('aspect-ratio: 1;')
    wrapper.unmount()
  })

  test('progress rotate', () => {
    const wrapper = mount(VarProgress, {
      props: {
        rotate: 10,
        mode: 'circle',
      },
    })

    expect(wrapper.find('.mp-progress__circle-certain').attributes('style')).toContain('transform: rotateZ(10deg);')
    expect(wrapper.find('.mp-progress__circle-certain').attributes('style')).toContain('transform-origin: 50% 50%;')
    wrapper.unmount()
  })

  test('progress indeterminate', async () => {
    const wrapper = mount(VarProgress, {
      props: {
        mode: 'line',
        indeterminate: true,
      },
    })

    expect(wrapper.find('.mp-progress__line-indeterminate').exists()).toBe(true)
    await wrapper.setProps({ mode: 'circle' })
    expect(wrapper.find('.mp-progress__circle-indeterminate').exists()).toBe(true)
    expect(wrapper.find('.mp-progress__circle-overlay').exists()).toBe(true)
    wrapper.unmount()
  })
})

test('progress component default slots', () => {
  const wrapper = mount(VarProgress, {
    props: {
      showText: true,
    },
    slots: {
      default: () => 'This is default slots',
    },
  })

  expect(wrapper.find('.mp-progress__line-label').element.textContent).toBe('This is default slots')
  wrapper.unmount()
})

test('circle geometry retains fractional percentages', () => {
  const wrapper = mount(Progress, { props: { mode: 'circle', percent: 12.5 } })
  const path = wrapper.get('.mp-progress__circle-certain')
  expect(Number(path.attributes('stroke-dashoffset')) / Number(path.attributes('stroke-dasharray'))).toBeCloseTo(0.875)
  wrapper.unmount()
})
