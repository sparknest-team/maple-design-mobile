import { nextTick } from 'vue'
import { IconCheck, IconClose, IconDelete, IconInfoCircle, IconPlus, IconReply } from '@maplejs/icons-vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Button from '..'
import { useDemoControls } from '../../../test-utils/demo-controls'
import Select from '../../select'
import Space from '../../space'
import IconsDemo from '../example/demos/icons.vue'

useDemoControls()

test('icon layouts share variant and size controls without hiding labels', async () => {
  const wrapper = mount(IconsDemo, {
    global: {
      components: {
        MIconPlus: IconPlus,
        MIconReply: IconReply,
        MIconInfoCircle: IconInfoCircle,
        MIconCheck: IconCheck,
        MIconDelete: IconDelete,
        MIconClose: IconClose,
        MpButton: Button,
        MpSelect: Select,
        MpSpace: Space,
      },
    },
  })
  try {
    const buttons = () => wrapper.findAllComponents(Button)
    for (const icon of [IconPlus, IconReply, IconInfoCircle, IconCheck, IconDelete, IconClose]) {
      expect(wrapper.findAllComponents(icon)).toHaveLength(3)
    }
    expect(buttons()).toHaveLength(18)
    expect(
      buttons()
        .slice(0, 6)
        .every((b) => b.classes().includes('mp-button--icon-only')),
    ).toBe(true)
    expect(
      buttons()
        .slice(6)
        .map((b) => b.text()),
    ).toEqual([
      'Add',
      'Reply',
      'Info',
      'Confirm',
      'Delete',
      'Close',
      'Add',
      'Reply',
      'Info',
      'Confirm',
      'Delete',
      'Close',
    ])
    expect(
      buttons()
        .slice(12)
        .every((b) => b.classes().includes('mp-button--stacked')),
    ).toBe(true)
    const controls = wrapper.findAllComponents(Select)
    for (const variant of ['default', 'text', 'outline', 'tonal']) {
      controls[0].vm.$emit('update:modelValue', variant)
      for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
        controls[1].vm.$emit('update:modelValue', size)
        await nextTick()
        expect(buttons().every((b) => b.props('variant') === variant && b.props('size') === size)).toBe(true)
        expect(
          buttons()
            .slice(6)
            .every((b) => b.text().length > 0),
        ).toBe(true)
      }
    }
  } finally {
    wrapper.unmount()
  }
})
