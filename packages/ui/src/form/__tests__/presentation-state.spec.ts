import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import Cascader from '../../cascader'
import CascaderEditor from '../../cascader/CascaderEditor.vue'
import Input from '../../input/Input.vue'
import Select from '../../select/select'
import SelectMenu from '../../select/SelectMenu'
import { getKeyFromValue } from '../../select/utils'
import Textarea from '../../textarea'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const options = [
  { value: 'old', label: '原值' },
  { value: 'new', label: '新值' },
  { value: 'fixed', label: '修正值' },
]
const fields = [
  ['Input', Input],
  ['Textarea', Textarea],
  ['Select', Select],
  ['Cascader', Cascader],
] as const
const presentations = ['popup'] as const
function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => {
    resolve = done
  })
  return { promise, resolve }
}
const rulesFor = (validate: (value: unknown) => Promise<boolean | string>) => [validate]
function fixture(Field: any, editMode: string, extra: Record<string, any> = {}, rules?: any) {
  const model = reactive({ value: 'old' })
  const state = reactive({
    disabled: undefined as boolean | undefined,
    readonly: undefined as boolean | undefined,
    editMode,
    readPretty: false,
  })
  const wrapper = mount(Form, {
    props: { model },
    slots: {
      default: () =>
        h(
          FormItem,
          {
            field: 'value',
            label: '字段',
            rules,
            disabled: state.disabled,
            readonly: state.readonly,
            readPretty: state.readPretty,
            editMode: state.editMode as any,
          },
          () =>
            h(Field, {
              modelValue: model.value,
              options,
              filterable: true,
              ...(Field === Select || Field === Cascader ? { needConfirm: true } : {}),
              ...extra,
              'onUpdate:modelValue': (value: string) => {
                model.value = value
              },
            }),
        ),
    },
  })
  const open = async () => {
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
  }
  const panel = () => wrapper.getComponent(EditorPanel)
  const change = async (value = 'new') => {
    if (Field === Select) {
      panel().getComponent(SelectMenu).props('controller').handleSelect(getKeyFromValue(value), new Event('click'))
    } else if (Field === Cascader) {
      panel().getComponent(CascaderEditor).vm.$emit('update:modelValue', value)
    } else {
      await panel().get('input, textarea').setValue(value)
    }
    await nextTick()
  }
  const action = async (confirm: boolean) => {
    await panel()
      .findAll('button')
      .find((button) => (confirm ? ['确认', '确定'].includes(button.text()) : button.text() === '×'))!
      .trigger('click')
    await flushPromises()
  }
  return { wrapper, model, state, open, panel, change, action }
}
describe('presentation state and validation transactions', () => {
  for (const [name, Field] of fields) {
    for (const editMode of presentations) {
      test(`${name} ${editMode} locks editors during async confirmation and retains a rejected draft`, async () => {
        const save = deferred<void | false>()
        const beforeCommit = vi.fn((_value: unknown) => save.promise)
        const f = fixture(Field, editMode, { beforeCommit })
        try {
          await f.open()
          await f.change()
          await f.action(true)
          expect(beforeCommit).toHaveBeenCalledTimes(1)
          expect(f.model.value).toBe('old')
          expect(f.panel().attributes('aria-busy')).toBe('true')
          expect(f.panel().find('[inert]').exists()).toBe(true)
          for (const input of f.panel().findAll('input, textarea')) {
            expect(input.attributes('disabled')).toBeDefined()
          }
          if (Field === Cascader) {
            expect(f.panel().getComponent(CascaderEditor).props('options').disabled).toBe(true)
          }
          await f.action(false)
          f.panel().vm.$emit('confirm')
          await flushPromises()
          expect(beforeCommit).toHaveBeenCalledTimes(1)
          save.resolve(false)
          await flushPromises()
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
          expect(f.panel().find('[inert]').exists()).toBe(false)
          expect(f.model.value).toBe('old')
          beforeCommit.mockResolvedValueOnce(undefined)
          await f.action(true)
          expect(beforeCommit.mock.calls[1][0]).toEqual({ value: 'new', previousValue: 'old' })
          expect(f.model.value).toBe('new')
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
        } finally {
          f.wrapper.unmount()
        }
      })
      test(`${name} ${editMode} preserves the draft on validation failure and retries with the corrected value`, async () => {
        const validate = vi.fn(async (value: unknown) => (value === 'new' ? '候选校验失败' : true))
        const beforeCommit = vi.fn(() => true)
        const f = fixture(Field, editMode, { beforeCommit }, rulesFor(validate))
        try {
          await f.open()
          await f.change()
          await f.action(true)
          expect(f.model.value).toBe('old')
          expect(beforeCommit).not.toHaveBeenCalled()
          expect(f.panel().get('[role=alert]').text()).toContain('候选校验失败')
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
          await f.change('fixed')
          await f.action(true)
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
          expect(f.model.value).toBe('fixed')
          expect(beforeCommit).toHaveBeenCalledTimes(1)
          expect(validate).toHaveBeenCalledTimes(2)
        } finally {
          f.wrapper.unmount()
        }
      })
      for (const stage of ['validation', 'save', 'native-reset']) {
        test(`${name} ${editMode} reset during ${stage} closes the editor and discards late completion`, async () => {
          const task = deferred<any>()
          let signal: AbortSignal | undefined
          const beforeCommit = vi.fn((_payload, _done, context) => {
            signal = context.signal
            return stage !== 'validation' ? task.promise : undefined
          })
          const f = fixture(
            Field,
            editMode,
            { beforeCommit },
            stage === 'validation' ? rulesFor(() => task.promise) : undefined,
          )
          try {
            await f.open()
            await f.change()
            await f.action(true)
            f.wrapper.vm.resetFields('other')
            await flushPromises()
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
            if (stage === 'native-reset') {
              await f.wrapper.trigger('reset')
            } else {
              f.wrapper.vm.resetFields(stage === 'validation' ? 'value' : undefined)
            }
            await flushPromises()
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
            if (stage !== 'validation') {
              expect(signal?.aborted).toBe(true)
            }
            task.resolve(true)
            await flushPromises()
            expect(f.model.value).toBe('old')
            if (stage === 'validation') {
              expect(beforeCommit).not.toHaveBeenCalled()
            }
            await f.open()
            if (Field === Input || Field === Textarea) {
              expect((f.panel().get('input, textarea').element as HTMLInputElement).value).toBe('old')
            }
          } finally {
            task.resolve(true)
            f.wrapper.unmount()
          }
        })
      }
    }
    for (const restriction of ['disabled', 'readonly'] as const) {
      test(`${name} inherits Form ${restriction} and supports an explicit false field override`, async () => {
        const inherited = fixture(Field, 'popup')
        const override = fixture(Field, 'popup', { [restriction]: false })
        try {
          await inherited.wrapper.setProps({ [restriction]: true })
          await inherited.open()
          expect(inherited.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
          await override.wrapper.setProps({ [restriction]: true })
          await override.open()
          expect(override.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
        } finally {
          inherited.wrapper.unmount()
          override.wrapper.unmount()
        }
      })
    }
    for (const restriction of ['disabled', 'readonly', 'read'] as const) {
      test(`${name} becoming ${restriction} aborts pending save and cannot reopen an old draft`, async () => {
        const task = deferred<void>()
        let signal!: AbortSignal
        const f = fixture(Field, 'popup', {
          beforeCommit: (_payload: unknown, _done: unknown, context: { signal: AbortSignal }) => {
            signal = context.signal
            return task.promise
          },
        })
        try {
          await f.open()
          await f.change()
          await f.action(true)
          if (restriction === 'read') {
            f.state.readPretty = true
          } else {
            f.state[restriction] = true
          }
          await flushPromises()
          expect(signal.aborted).toBe(true)
          if (restriction === 'read') {
            expect(f.wrapper.find('[aria-haspopup=dialog]').exists()).toBe(false)
          } else {
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
          }
          task.resolve()
          await flushPromises()
          expect(f.model.value).toBe('old')
          f.state.disabled = false
          f.state.readonly = false
          f.state.readPretty = false
          f.state.editMode = 'popup'
          await flushPromises()
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
        } finally {
          task.resolve()
          f.wrapper.unmount()
        }
      })
    }
  }
})
