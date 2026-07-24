import { createApp, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Steps from '..'
import Step from '../../step'
import VarStep from '../../step/Step'
import { delay } from '../../utils/test'
import VarSteps from '../Steps'

test('steps and step use', () => {
  const app = createApp({}).use(Steps).use(Step)

  expect(app.component(Steps.name)).toBeTruthy()
  expect(app.component(Step.name)).toBeTruthy()
})

describe('test steps and step components props', () => {
  test('steps current status derivation', async () => {
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      template: `
        <mp-steps :current="2">
          <mp-step>step 1</mp-step>
          <mp-step>step 2</mp-step>
          <mp-step>step 3</mp-step>
        </mp-steps>
      `,
    })

    await delay(50)
    const tags = wrapper.findAll('.mp-step__horizontal-tag')
    expect(tags[0].classes()).toContain('mp-step__horizontal-tag--active')
    expect(tags[0].find('.mp-icon-check').exists()).toBe(true)
    expect(tags[1].classes()).toContain('mp-step__horizontal-tag--active')
    expect(tags[1].text()).toBe('2')
    expect(tags[2].classes()).not.toContain('mp-step__horizontal-tag--active')
    expect(tags[2].text()).toBe('3')
    wrapper.unmount()
  })

  test('steps direction', async () => {
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      template: `
        <mp-steps direction="vertical" :current="1">
          <mp-step>step 1</mp-step>
          <mp-step>step 2</mp-step>
        </mp-steps>
      `,
    })

    expect(wrapper.find('.mp-steps').attributes('style')).toContain('flex-direction: column;')
    await wrapper.setProps({})
    wrapper.unmount()
  })

  test('steps status error', async () => {
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      template: `
        <mp-steps :current="2" status="error">
          <mp-step>step 1</mp-step>
          <mp-step>step 2</mp-step>
        </mp-steps>
      `,
    })

    await delay(50)
    expect(wrapper.findAll('.mp-step__horizontal-tag')[1].classes()).toContain('mp-step__horizontal-tag--error')
    wrapper.unmount()
  })

  test('steps changeable triggers onChange', async () => {
    const onChange = vi.fn()
    const current = ref(1)
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      setup() {
        return { current, onChange }
      },
      template: `
        <mp-steps :current="current" changeable @change="onChange" @update:current="(v) => (current = v)">
          <mp-step>step 1</mp-step>
          <mp-step>step 2</mp-step>
        </mp-steps>
      `,
    })

    await delay(50)
    await wrapper.findAll('.mp-step__horizontal-tag')[1].trigger('click')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0]).toBe(2)
    wrapper.unmount()
  })

  test('steps not changeable does not emit change', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      setup() {
        return { onChange }
      },
      template: `
        <mp-steps :current="1" @change="onChange">
          <mp-step>step 1</mp-step>
          <mp-step>step 2</mp-step>
        </mp-steps>
      `,
    })

    await delay(50)
    await wrapper.findAll('.mp-step__horizontal-tag')[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  test('step disabled', async () => {
    const onChange = vi.fn()
    const wrapper = mount({
      components: {
        [VarSteps.name]: VarSteps,
        [VarStep.name]: VarStep,
      },
      setup() {
        return { onChange }
      },
      template: `
        <mp-steps :current="1" changeable @change="onChange">
          <mp-step>step 1</mp-step>
          <mp-step disabled>step 2</mp-step>
        </mp-steps>
      `,
    })

    await delay(50)
    expect(wrapper.findAll('.mp-step')[1].classes()).toContain('mp-step--disabled')
    await wrapper.findAll('.mp-step__horizontal-tag')[1].trigger('click')
    expect(onChange).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
