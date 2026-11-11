import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Cascader from '../../cascader'
import DateField from '../../date'
import Select from '../../select'
import TimeField from '../../time'
import TimeRange from '../../time-range'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const cases = [
  ['date', DateField],
  ['time', TimeField],
  ['time range', TimeRange],
  ['select', Select],
  ['cascader', Cascader],
] as const

test.each(cases)(
  '%s preserves an explicit accessible name over the form label during deferred editing',
  async (_name, component) => {
    const name = ref<string | undefined>('Explicit field name')
    const wrapper = mount(Form, {
      props: { model: { value: null } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Form label' }, () =>
            h(component as any, { editMode: 'popup', 'aria-label': name.value }),
          ),
      },
    })
    try {
      const reference = () => wrapper.get('button.mp-field-presentation__reference')
      expect(reference().attributes('aria-label')).toBe('Explicit field name')
      name.value = 'Changed name'
      await nextTick()
      expect(reference().attributes('aria-label')).toBe('Changed name')
      name.value = undefined
      await nextTick()
      expect(reference().attributes('aria-label')).toBe('Form label')
    } finally {
      wrapper.unmount()
    }
  },
)
