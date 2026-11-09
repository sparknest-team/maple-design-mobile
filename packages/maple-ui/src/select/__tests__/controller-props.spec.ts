import { defineComponent, h, reactive, toRaw } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { selectEmits } from '../emits'
import { selectProps } from '../props'
import { useSelectController } from '../use-select-controller'

test('controller transport preserves the original shallow props and option identity', async () => {
  let original: unknown, transported: ReturnType<typeof reactive<ReturnType<typeof useSelectController>>> | undefined
  const Host = defineComponent({
    props: selectProps,
    emits: selectEmits,
    setup(props, context) {
      original = props
      transported = reactive(useSelectController(props, context))
      return () => h('div')
    },
  })
  const options = [{ value: 'a', label: 'Alpha' }]
  const w = mount(Host, { props: { options } })
  expect(transported?.props).toBe(original)
  expect(toRaw(transported?.props.options)).toBe(options)
  const replacement = [{ value: 'b', label: 'Beta' }]
  await w.setProps({ options: replacement })
  expect(transported?.props).toBe(original)
  expect(toRaw(transported?.props.options)).toBe(replacement)
  w.unmount()
})
