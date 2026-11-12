import { h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each([
  [false, false],
  [false, true],
  [true, false],
  [true, true],
])(
  'reset preserves the original value with initial noStyle %s and switch %s',
  async (initialNoStyle, switchAncestor) => {
    const noStyle = ref(initialNoStyle)
    const model = reactive({ value: 'original' })
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model },
      slots: {
        default: () =>
          h(FormItem, { label: 'Outer' }, () =>
            h(FormItem, { noStyle: noStyle.value, label: 'Middle' }, () =>
              h(FormItem, { field: 'value', noStyle: true }, () => h(Input)),
            ),
          ),
      },
    })
    try {
      model.value = 'edited'
      await nextTick()
      if (switchAncestor) {
        noStyle.value = !initialNoStyle
      }
      await nextTick()
      ;(wrapper.vm as any).resetFields()
      await nextTick()
      expect(model.value).toBe('original')
    } finally {
      wrapper.unmount()
    }
  },
)
