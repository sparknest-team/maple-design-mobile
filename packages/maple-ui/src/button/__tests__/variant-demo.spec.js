import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Button from '..'
import { MenuOption } from '../../dropdown-menu'
import Radio, { RadioGroup } from '../../radio'
import SplitButton from '../../split-button'
import SplitDemo from '../../split-button/example/variants.vue'
import Switch from '../../switch'
import ButtonDemo from '../example/demos/variants.vue'

vi.mock('@maplejs/maple-ui', () => ({ Message: { info: vi.fn() } }))
// Documentation bootstrap needs @config in the site; component tests isolate that shell.
vi.mock('@maplejs/maple-cli/client', () => ({ watchLang: vi.fn(), onThemeChange: vi.fn() }))
vi.mock('../../split-button/example/locale', () => ({ t: (key) => key }))

const components = {
  MpButton: Button,
  MpSplitButton: SplitButton,
  MpRadio: Radio,
  MpRadioGroup: RadioGroup,
  MpSwitch: Switch,
  MpMenuOption: MenuOption,
}

test.each([
  [ButtonDemo, 1, 3],
  [SplitDemo, 0, 1],
])(
  'variant demo starts neutral and radio controls update both appearance roles',
  async (demo, variantIndex, statusIndex) => {
    const wrapper = mount(demo, { global: { components } })
    try {
      const buttons = () => wrapper.findAllComponents(Button)
      for (const button of buttons()) {
        expect(button.props('status')).toBe(demo === SplitDemo ? undefined : 'default')
        expect(button.classes()).toContain('mp-button--status-default')
        expect(button.classes()).toContain('mp-button--variant-default')
      }
      const groups = wrapper.findAllComponents(RadioGroup)
      groups[variantIndex].vm.$emit('update:modelValue', 'outline')
      groups[statusIndex].vm.$emit('update:modelValue', 'danger')
      await nextTick()
      for (const button of buttons()) {
        expect(button.classes()).toContain('mp-button--variant-outline')
        expect(button.classes()).toContain('mp-button--status-danger')
      }
    } finally {
      wrapper.unmount()
    }
  },
)
