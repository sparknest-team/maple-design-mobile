import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Button from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import { MenuOption } from '../../menu'
import Select from '../../select'
import Space from '../../space'
import SplitButton from '../../split-button'
import SplitDemo from '../../split-button/example/variants.vue'
import ButtonDemo from '../example/demos/variants.vue'

useDemoControls()

vi.mock('@maplejs/maple-ui', () => ({ Message: { info: vi.fn() } }))
// Documentation bootstrap needs @config in the site; component tests isolate that shell.
vi.mock('@maplejs/maple-cli/client', () => ({ watchLang: vi.fn(), onThemeChange: vi.fn() }))
vi.mock('../../split-button/example/locale', () => ({ t: (key) => key }))

const components = {
  MpButton: Button,
  MpSplitButton: SplitButton,
  MpMenuOption: MenuOption,
  MpSpace: Space,
}

test('button catalog controls update variant and size while preserving every semantic status', async () => {
  const wrapper = mount(ButtonDemo, { global: { components } })
  try {
    const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']
    const buttons = () => wrapper.findAllComponents(Button)
    expect(buttons()).toHaveLength(statuses.length)
    expect(buttons().map((button) => button.props('status'))).toEqual(statuses)
    for (const button of buttons()) {
      expect(button.classes()).toContain('mp-button--variant-default')
      expect(button.props('size')).toBe('md')
    }
    const controls = wrapper.findAllComponents(Select)
    expect(controls).toHaveLength(2)
    controls[0].vm.$emit('update:modelValue', 'outline')
    controls[1].vm.$emit('update:modelValue', 'lg')
    await nextTick()
    for (const [index, button] of buttons().entries()) {
      expect(button.classes()).toContain('mp-button--variant-outline')
      expect(button.classes()).toContain(`mp-button--status-${statuses[index]}`)
      expect(button.props('size')).toBe('lg')
    }
  } finally {
    wrapper.unmount()
  }
})

test('split button variant demo keeps both neutral segments matched across all four appearances', () => {
  const wrapper = mount(SplitDemo, { global: { components } })
  try {
    const variants = ['default', 'outline', 'tonal', 'text']
    const examples = wrapper.findAllComponents(SplitButton)
    expect(examples).toHaveLength(variants.length)
    for (const [index, example] of examples.entries()) {
      expect(example.props('variant')).toBe(variants[index])
      const segments = example.findAllComponents(Button)
      expect(segments).toHaveLength(2)
      for (const button of segments) {
        expect(button.props('status')).toBeUndefined()
        expect(button.classes()).toContain('mp-button--status-default')
        expect(button.classes()).toContain(`mp-button--variant-${variants[index]}`)
      }
    }
  } finally {
    wrapper.unmount()
  }
})
