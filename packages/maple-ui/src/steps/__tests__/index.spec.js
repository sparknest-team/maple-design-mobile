import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Steps from '..'
import Step from '../../step'
import VarStep from '../../step/Step'
import { delay } from '../../utils/test'
import VarSteps from '../Steps'

const clickStep = vi.fn()
const Wrapper = {
  components: {
    [VarSteps.name]: VarSteps,
    [VarStep.name]: VarStep,
  },
  template: `
    <mp-steps @clickStep="clickStep">
      <mp-step>step 1</mp-step>
      <mp-step>step 2</mp-step>
      <mp-step active-icon="check-circle-outline" current-icon="radio-blank" inactive-icon="minus-circle-outline">step 3</mp-step>
      <mp-step>step 4</mp-step>
    </mp-steps>
  `,
  methods: {
    clickStep,
  },
}

test('steps and step use', () => {
  const app = createApp({}).use(Steps).use(Step)

  expect(app.component(Steps.name)).toBeTruthy()
  expect(app.component(Step.name)).toBeTruthy()
})

test('steps component event', async () => {
  const wrapper = mount(Wrapper)
  await wrapper.find('.mp-step__horizontal-tag').trigger('click')
  expect(clickStep).toHaveBeenCalledTimes(1)
  wrapper.unmount()
})

describe('test steps and step components props', () => {
  test('steps active', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        active: 1,
      },
    })

    await delay(50)
    wrapper.findAll('.mp-step__horizontal-main').forEach((item, index) => {
      expect(item.find('.mp-step__horizontal-tag--active').exists()).toBe(index < 2)
      expect(item.find('.mp-step__horizontal-content--active').exists()).toBe(index < 2)
    })
    wrapper.unmount()
  })

  test('steps direction', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        direction: 'vertical',
      },
    })

    expect(wrapper.find('.mp-steps').attributes('style')).toContain('flex-direction: column;')
    await wrapper.setProps({ direction: 'horizontal' })
    expect(wrapper.find('.mp-steps').attributes('style')).toContain('flex-direction: row;')
    wrapper.unmount()
  })

  test('steps active-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        activeColor: 'red',
      },
    })

    await delay(50)
    expect(wrapper.find('.mp-step__horizontal-tag--active').attributes('style')).toContain('background-color: red;')
    wrapper.unmount()
  })

  test('steps inactive-color', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        inactiveColor: 'red',
      },
    })

    await delay(50)
    wrapper.findAll('.mp-step__horizontal-tag').forEach((item, index) => {
      expect(item.attributes('style')).toContain(index > 0 ? 'background-color: red;' : '')
    })
    wrapper.unmount()
  })

  test('steps current-icon', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        active: 3,
      },
    })

    await delay(50)
    expect(wrapper.findAll('.mp-step')[2].find('.mp-icon-check-circle-outline').exists()).toBe(true)
    wrapper.unmount()
  })

  test('steps active-icon', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        active: 2,
      },
    })

    await delay(50)
    expect(wrapper.findAll('.mp-step')[2].find('.mp-icon-radio-blank').exists()).toBe(true)
    wrapper.unmount()
  })

  test('steps inactive-icon', async () => {
    const wrapper = mount(Wrapper, {
      props: {
        active: 1,
      },
    })

    await delay(50)
    expect(wrapper.findAll('.mp-step')[2].find('.mp-icon-minus-circle-outline').exists()).toBe(true)
    wrapper.unmount()
  })
})
