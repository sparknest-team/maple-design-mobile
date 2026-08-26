import { createApp, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Row from '..'
import Col from '../../col'
import VarCol from '../../col/Col'
import { delay } from '../../utils/test'
import VarRow from '../Row'

test('row and col use', () => {
  const app = createApp({}).use(Row).use(Col)
  expect(app.component(Row.name)).toBeTruthy()
  expect(app.component(Col.name)).toBeTruthy()
})

describe('test row and col component props', () => {
  test('row and col gutter', () => {
    const wrapper = mount(VarRow, {
      props: {
        gutter: 20,
      },
      slots: {
        default: () => [12, 12].map((span) => h(VarCol, { span })),
      },
    })

    const style = wrapper.find('.mp-row').attributes('style') || ''
    expect(style.includes('margin-left: -10px') || style.includes('margin: 0px -10px')).toBeTruthy()
    wrapper.unmount()
  })

  test('row and col gutter array', () => {
    const wrapper = mount(VarRow, {
      props: {
        gutter: [20, 20],
      },
      slots: {
        default: () => [12, 12].map((span) => h(VarCol, { span })),
      },
    })

    const style = wrapper.find('.mp-row').attributes('style') || ''
    expect(style.includes('-10px')).toBeTruthy()
    wrapper.unmount()
  })

  test('row and col gutter computed', async () => {
    const wrapper = mount(VarRow, {
      props: {
        gutter: [20, 20],
      },
      slots: {
        default: () => [12, 12].map((span) => h(VarCol, { span })),
      },
    })

    await delay(0)
    expect(wrapper.html()).toMatchSnapshot()
    await wrapper.setProps({ gutter: 40 })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })

  test('row and col justify', () => {
    ;['start', 'end', 'center', 'space-between', 'space-around'].forEach((justify) => {
      const wrapper = mount(VarRow, {
        props: {
          justify,
        },
        slots: {
          default: () => [12, 12].map((span) => h(VarCol, { span })),
        },
      })

      expect(wrapper.find('.mp-row').classes()).toContain(`mp-row--justify-${justify}`)
      wrapper.unmount()
    })
  })

  test('row and col align', () => {
    ;['start', 'end', 'center', 'stretch'].forEach((align) => {
      const wrapper = mount(VarRow, {
        props: {
          align,
        },
        slots: {
          default: () => [12, 12].map((span) => h(VarCol, { span })),
        },
      })

      expect(wrapper.find('.mp-row').classes()).toContain(`mp-row--align-${align}`)
      wrapper.unmount()
    })
  })

  test('row and col span', () => {
    const wrapper = mount(VarRow, {
      slots: {
        default: () => [6, 6, 6, 6].map((span) => h(VarCol, { span })),
      },
    })

    wrapper.findAll('.mp-col').forEach((col) => {
      expect(col.classes()).toContain('mp-col--span-6')
    })
    wrapper.unmount()
  })

  test('col order', () => {
    const wrapper = mount(VarRow, {
      slots: {
        default: () => h(VarCol, { span: 6, order: 2 }),
      },
    })

    expect(wrapper.find('.mp-col').classes()).toContain('mp-col--order-2')
    wrapper.unmount()
  })

  test('col flex', () => {
    const wrapper = mount(VarRow, {
      slots: {
        default: () => h(VarCol, { flex: 'auto' }),
      },
    })

    expect(wrapper.find('.mp-col').attributes('style')).toMatch(/flex:\s*(auto|1 1 auto)/)
    wrapper.unmount()
  })

  test('row wrap false', () => {
    const wrapper = mount(VarRow, {
      props: { wrap: false },
      slots: {
        default: () => h(VarCol, { span: 12 }),
      },
    })

    expect(wrapper.find('.mp-row').classes()).toContain('mp-row--nowrap')
    wrapper.unmount()
  })
})
