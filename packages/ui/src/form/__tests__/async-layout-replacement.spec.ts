import { defineComponent, h, nextTick, reactive, ref, Suspense } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

test.each([false, true])('keeps the live async field after keyed replacement from noStyle=%s', async (initial) => {
  const bare = ref(initial)
  const generation = ref(0)
  const prepend = ref(false)
  const model = reactive({ account: 'initial' })
  const resolvers = new Map<number, () => void>()
  const Field = defineComponent({
    props: { generation: { type: Number, required: true } },
    async setup(props) {
      const id = props.generation
      await new Promise<void>((resolve) => {
        resolvers.set(id, resolve)
      })
      return () => h(FormItem, { field: 'account' }, () => h('input', { 'data-generation': id }))
    },
  })
  const owner = mount(Form, {
    props: { model },
    slots: {
      default: () =>
        h('section', [
          ...(prepend.value ? [h('button', { key: 'before' }, 'Before')] : []),
          h(FormItem, { key: generation.value, noStyle: bare.value }, () =>
            h(Suspense, null, {
              default: () => h(Field, { generation: generation.value }),
              fallback: () => h('span', 'Pending'),
            }),
          ),
        ]),
    },
  })
  try {
    expect(owner.get('section').text()).toBe('Pending')
    generation.value++
    bare.value = !initial
    await nextTick()
    model.account = 'replacement'
    resolvers.get(1)!()
    await flushPromises()
    const live = owner.get('input[data-generation="1"]').element
    model.account = 'edited'
    prepend.value = true
    resolvers.get(0)!()
    await flushPromises()
    expect(owner.get('section').element.firstElementChild?.tagName).toBe('BUTTON')
    expect(owner.findAll('input')).toHaveLength(1)
    expect(owner.get('input').element).toBe(live)
    owner.vm.setFields({ account: { message: 'Current error' } })
    await nextTick()
    expect(owner.get('[role="alert"]').text()).toBe('Current error')
    owner.vm.resetFields()
    await nextTick()
    expect(model.account).toBe('replacement')
    expect(owner.find('[role="alert"]').exists()).toBe(false)
  } finally {
    owner.unmount()
  }
})
