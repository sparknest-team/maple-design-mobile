import { nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Cascader from '../Cascader.vue'

test('fallback resolves an unmatched value without changing its model', async () => {
  const labels = reactive<Record<string, string>>({})
  const update = vi.fn()
  const owner = mount(Cascader, {
    props: {
      modelValue: 'missing',
      options: [],
      editMode: 'direct',
      fallbackOption: (value: any) => ({ value, label: labels[String(value)] ?? String(value) }),
      'onUpdate:modelValue': update,
    },
  })
  expect(owner.text()).toContain('missing')
  labels.missing = 'Resolved'
  await nextTick()
  expect(owner.text()).toContain('Resolved')
  expect(update).not.toHaveBeenCalled()
  owner.unmount()
})
