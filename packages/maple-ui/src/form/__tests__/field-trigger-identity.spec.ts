import { defineComponent, h, inject, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form, { FormItem } from '..'
import { FORM_ITEM_BIND_CONTROL_KEY } from '../item-provide'

test('queued validation from the previous field cannot start against the new identity', async () => {
  const field = ref('a')
  const tasks: (() => void)[] = []
  const rules = [() => new Promise<boolean>((resolve) => tasks.push(() => resolve(true)))]
  let change = () => {}
  const Control = defineComponent({
    setup() {
      const context = inject(FORM_ITEM_BIND_CONTROL_KEY) as any
      change = () => context.eventHandlers.value.onChange()
      return () => h('span', 'Control')
    },
  })
  const owner = mount({
    setup: () => () =>
      h(Form, { model: { a: 'A', b: 'B' } }, () =>
        h(FormItem, { field: field.value, rules, validateTrigger: ['change'] }, () => h(Control)),
      ),
  })
  try {
    field.value = 'b'
    change()
    await flushPromises()
    expect(tasks).toHaveLength(0)
  } finally {
    owner.unmount()
    tasks.splice(0).forEach((finish) => finish())
    await flushPromises()
  }
})
