import * as Icons from '@maple-design/icons-vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Maple from '../maple-vue'
import StepTypes from '../steps/example/demos/types.vue'

vi.mock('@maple-design/cli-vue/client', async () => {
  const { defineComponent, h } = await import('vue')
  return {
    onThemeChange() {},
    watchLang(callback) {
      callback('zh-CN')
    },
    watchDarkMode() {},
    AppType: defineComponent({
      setup(_, { slots }) {
        return () => h('h4', slots.default?.())
      },
    }),
  }
})
const modules = import.meta.glob('../*/example/demos/*comparison.vue', { eager: true })

describe('authored configuration comparisons', () => {
  for (const [file, load] of Object.entries(modules).filter(([file]) => !file.includes('/watermark/'))) {
    test(`renders comparison scenes in ${file}`, async () => {
      const module = load
      const owner = mount(module.default, {
        attachTo: document.body,
        global: {
          plugins: [Maple],
          components: Object.fromEntries(
            Object.entries(Icons)
              .filter(([name]) => name.startsWith('Icon'))
              .map(([name, component]) => ['M' + name, component]),
          ),
          config: {
            warnHandler(message) {
              if (/was accessed during render but is not defined|Failed to resolve component/.test(message)) {
                throw new Error(message)
              }
            },
          },
        },
      })
      try {
        await flushPromises()
        expect(
          owner.findAll('[data-comparison-scene]').length || owner.findAll('[data-config-comparison]').length * 2,
        ).toBeGreaterThanOrEqual(2)
        expect(owner.findAll('[data-comparison-scene]').length).toBeLessThanOrEqual(3)
      } finally {
        owner.unmount()
      }
    }, 15000)
  }
})

const appearanceModules = import.meta.glob('../*/example/demos/appearance-lab.vue', { eager: true })
const stateModules = import.meta.glob('../*/example/demos/state-lab.vue', { eager: true })
const targetModules = import.meta.glob('../*/index.ts', { eager: true })

describe('live configuration models', () => {
  for (const [file, load] of Object.entries(appearanceModules)) {
    test(
      file + ' compares a complete axis',
      async () => {
        const module = load
        const owner = mount(module.default, {
          global: {
            plugins: [Maple],
            components: Object.fromEntries(
              Object.entries(Icons)
                .filter(([name]) => name.startsWith('Icon'))
                .map(([name, component]) => ['M' + name, component]),
            ),
          },
          attachTo: document.body,
        })
        try {
          await flushPromises()
          if (!file.includes('/message/')) {
            expect(owner.findAll('.demo-config-comparison > section').length).toBeGreaterThan(1)
          }
          const axis = owner.findAllComponents({ name: 'MpRadioGroup' }).at(-1)
          const choices = axis.props('options')
          if (choices.length > 1) {
            axis.vm.$emit('update:modelValue', choices[1].value)
            await flushPromises()
            expect(owner.text()).toContain(choices[1].value + '=')
          }
          if (/\/(input|textarea)\//.test(file)) {
            const family = file.split('/')[1]
            const target = targetModules['../' + family + '/index.ts']
            const controls = owner.findAllComponents(target.default)
            expect(controls.length).toBeGreaterThan(1)
            controls[0].vm.$emit('update:modelValue', 'Shared comparison value')
            await flushPromises()
            expect(controls.every((control) => control.props('modelValue') === 'Shared comparison value')).toBe(true)
          }
        } finally {
          owner.unmount()
        }
      },
      15000,
    )
  }
  for (const [file, load] of Object.entries(stateModules)) {
    test(
      file + ' recovers after disabling the target',
      async () => {
        const module = load
        const family = file.split('/')[1]
        const target = targetModules['../' + family + '/index.ts']
        const owner = mount(module.default, {
          global: {
            plugins: [Maple],
            components: Object.fromEntries(
              Object.entries(Icons)
                .filter(([name]) => name.startsWith('Icon'))
                .map(([name, component]) => ['M' + name, component]),
            ),
          },
          attachTo: document.body,
        })
        try {
          await flushPromises()
          const controls = owner.findAllComponents({ name: 'MpCheckbox' })
          const first = controls[0]
          const specimen = owner.findAllComponents(target.default).at(-1)
          const disabled = first.text().includes('disabled')
          const key = disabled ? 'disabled' : 'readonly'
          await first.get('input').setValue(true)
          await flushPromises()
          expect(specimen.props(key)).toBe(true)
          expect(first.get('input').element.disabled).toBe(false)
          await first.get('input').setValue(false)
          await flushPromises()
          expect(specimen.props(key)).toBe(false)
        } finally {
          owner.unmount()
        }
      },
      15000,
    )
  }
})

test('form sizing switches preserve one live model and dynamic fields', async () => {
  const owner = mount(modules['../form/example/demos/label-width-comparison.vue'].default, {
    global: { plugins: [Maple] },
    attachTo: document.body,
  })
  try {
    const form = owner.findComponent({ name: 'MpForm' })
    const input = form.findAll('input')[0]
    await input.setValue('Shared form value')
    const mode = owner.findComponent({ name: 'MpRadioGroup' })
    for (const value of ['columns', 'fixed', 'auto']) {
      mode.vm.$emit('update:modelValue', value)
      await flushPromises()
      expect(form.props('model').name).toBe('Shared form value')
      expect(form.props('autoLabelWidth')).toBe(value === 'auto')
      if (value === 'fixed') {
        expect(form.props('labelColFlex')).toBe('6rem')
      }
      if (value === 'columns') {
        expect(form.props('labelColProps')).toEqual({ span: 6, xs: 24, sm: 6 })
      }
    }
    await owner.findComponent({ name: 'MpCheckbox' }).get('input').setValue(false)
    expect(form.findAllComponents({ name: 'MpFormItem' })).toHaveLength(2)
    await owner.findComponent({ name: 'MpCheckbox' }).get('input').setValue(true)
    expect(form.findAllComponents({ name: 'MpFormItem' })).toHaveLength(3)
    expect(form.get('input').element.value).toBe('Shared form value')
  } finally {
    owner.unmount()
  }
})

test('carousel indicator comparisons share the active slide', async () => {
  const owner = mount(modules['../carousel/example/demos/indicator-comparison.vue'].default, {
    global: { plugins: [Maple] },
    attachTo: document.body,
  })
  try {
    const carousels = owner.findAllComponents({ name: 'MpCarousel' })
    expect(carousels.length).toBeGreaterThan(3)
    carousels[0].vm.$emit('update:modelValue', 2)
    await flushPromises()
    expect(carousels.every((carousel) => carousel.props('modelValue') === 2)).toBe(true)
    expect(owner.get('[role=status]').text()).toContain('2')
  } finally {
    owner.unmount()
  }
})

test('message presets open the visible specimen and can reopen it', async () => {
  const owner = mount(appearanceModules['../message/example/demos/appearance-lab.vue'].default, {
    global: { plugins: [Maple] },
    attachTo: document.body,
  })
  try {
    const message = owner.findComponent({ name: 'MpMessage' })
    const preset = owner.findAll('button').find((button) => button.text().includes('variant='))
    expect(message.props('open')).toBe(false)
    await preset.trigger('click')
    expect(message.props('open')).toBe(true)
    message.vm.$emit('update:open', false)
    await flushPromises()
    expect(message.props('open')).toBe(false)
    await preset.trigger('click')
    expect(message.props('open')).toBe(true)
  } finally {
    owner.unmount()
  }
})

test('step type comparisons share progress and status', async () => {
  const owner = mount(StepTypes, { global: { plugins: [Maple] }, attachTo: document.body })
  try {
    const steps = owner.findAllComponents({ name: 'MpSteps' })
    expect(steps).toHaveLength(4)
    steps[0].vm.$emit('update:modelValue', 3)
    await flushPromises()
    expect(steps.every((step) => step.props('modelValue') === 3)).toBe(true)
    const status = owner.findAllComponents({ name: 'MpRadioGroup' }).at(-1)
    status.vm.$emit('update:modelValue', 'error')
    await flushPromises()
    expect(steps.every((step) => step.props('status') === 'error')).toBe(true)
  } finally {
    owner.unmount()
  }
})
