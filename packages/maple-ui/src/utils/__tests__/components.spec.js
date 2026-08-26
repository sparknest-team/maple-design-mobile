import { createApp, defineComponent } from 'vue'
import { expect, test, vi } from 'vitest'
import { withInstall, withPropsDefaultsSetter } from '../components'

test('withInstall registers root and child components and runs setup', () => {
  const Root = defineComponent({ name: 'MpRoot', render: () => null })
  const Child = defineComponent({ name: 'MpChild', render: () => null })
  const setup = vi.fn()
  const plugin = withInstall(Root, undefined, { components: [Root, Child], setup })
  const app = createApp({})

  app.use(plugin)

  expect(app.component('MpRoot')).toBe(Root)
  expect(app.component('MpChild')).toBe(Child)
  expect(setup).toHaveBeenCalledOnce()
})

test('withPropsDefaultsSetter', () => {
  const mock = {}
  const props = {
    name: String,
    age: [String, Number],
    gender: {
      type: String,
    },
  }

  withPropsDefaultsSetter(mock, props)

  mock.setPropsDefaults({
    name: 'default name',
    age: 'default age',
    gender: 'default gender',
  })

  expect(props).toStrictEqual({
    name: {
      type: String,
      default: 'default name',
    },
    age: {
      type: [String, Number],
      default: 'default age',
    },
    gender: {
      type: String,
      default: 'default gender',
    },
  })
})
