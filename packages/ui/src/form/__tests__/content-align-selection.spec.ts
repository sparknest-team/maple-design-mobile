import { h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

it('lets Select text-align override inherited alignment in inline and readPretty modes', async () => {
  const state = reactive<{ textAlign?: 'left' | 'center' | 'right'; readPretty: boolean }>({
    textAlign: undefined,
    readPretty: false,
  })
  const wrapper = mount(Form, {
    props: { contentAlign: 'right', editMode: 'direct' },
    slots: {
      default: () =>
        h(FormItem, { label: 'Team' }, () =>
          h(Select, {
            modelValue: 'design',
            options: [{ value: 'design', label: 'Design' }],
            ...state,
          }),
        ),
    },
  })
  try {
    const selection = () => wrapper.get('[class*="selection-field__content"]').element as HTMLElement
    expect(selection().style.getPropertyValue('--mp-internal-selection-text-align')).toBe('')
    state.textAlign = 'center'
    await nextTick()
    expect(selection().style.getPropertyValue('--mp-internal-selection-text-align')).toBe('center')
    state.readPretty = true
    await nextTick()
    const read = () => wrapper.get('[class*="field-presentation__read"]').element as HTMLElement
    expect(read().style.getPropertyValue('--mp-form-content-align')).toBe('center')
    expect(read().textContent).toBe('Design')
    state.textAlign = undefined
    await nextTick()
    expect(read().style.getPropertyValue('--mp-form-content-align')).toBe('')
  } finally {
    wrapper.unmount()
  }
})
