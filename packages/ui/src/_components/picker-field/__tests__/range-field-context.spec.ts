import { computed, defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { provideRangeField, useRangeFieldIndex } from '../range-field-context'

const Panel = defineComponent({
  setup() {
    const index = useRangeFieldIndex()
    return () =>
      h(
        'button',
        {
          onClick: () => {
            index.value = index.value ^ 1
          },
        },
        index.value,
      )
  },
})
const Owner = defineComponent({
  setup() {
    provideRangeField()
    return () => h('section', [h(Panel), h(Panel)])
  },
})

describe('range field context', () => {
  test('panels within one owner synchronize without leaking to other instances', async () => {
    const wrapper = mount(defineComponent({ render: () => h('main', [h(Owner), h(Owner)]) }))
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.findAll('button').map((item) => item.text())).toEqual(['1', '1', '0', '0'])
    wrapper.unmount()
  })
  test('standalone panels remain independently usable', async () => {
    const wrapper = mount(defineComponent({ render: () => h('main', [h(Panel), h(Panel)]) }))
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.findAll('button').map((item) => item.text())).toEqual(['1', '0'])
    wrapper.unmount()
  })
  test('disabled endpoints are skipped and invalid indices are rejected', async () => {
    const disabled = ref([true, false])
    const Test = defineComponent({
      setup() {
        const index = useRangeFieldIndex(() => disabled.value)
        const label = computed(() => String(index.value))
        return () =>
          h(
            'button',
            {
              onClick: () => {
                index.value = 8
              },
            },
            label.value,
          )
      },
    })
    const wrapper = mount(Test)
    expect(wrapper.text()).toBe('1')
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toBe('1')
    disabled.value = [false, true]
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toBe('0')
    wrapper.unmount()
  })
})
