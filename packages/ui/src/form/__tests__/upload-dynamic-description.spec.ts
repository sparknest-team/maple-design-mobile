import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Upload from '../../upload'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each([false, true])('upload updates descriptions while an error is present (custom=%s)', async (custom) => {
  const description = ref('first-help')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'File' }, () =>
          h(
            Upload,
            { editMode: 'direct', 'aria-describedby': description.value },
            custom
              ? {
                  trigger: ({ describedBy }: { describedBy?: string }) =>
                    h('button', { type: 'button', 'aria-describedby': describedBy }, 'Choose'),
                }
              : {},
          ),
        ),
    },
  })
  try {
    await flushPromises()
    const trigger = () => wrapper.get(custom ? '[role=group]' : '[role=button]')
    const described = () => trigger().attributes('aria-describedby')?.split(/\s+/) ?? []
    expect(described()).toEqual(['first-help'])
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid file' } })
    await nextTick()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    expect(described()).toEqual(['first-help', errorId])
    description.value = 'second-help'
    await nextTick()
    expect(described()).toEqual(['second-help', errorId])
    if (custom) {
      expect(trigger().get('button').attributes('aria-describedby')?.split(/\s+/)).toEqual(['second-help', errorId])
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(described()).toEqual(['second-help'])
    if (custom) {
      expect(trigger().get('button').attributes('aria-describedby')).toBe('second-help')
    }
  } finally {
    wrapper.unmount()
  }
})
