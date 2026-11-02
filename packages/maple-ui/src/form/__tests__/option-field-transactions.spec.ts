import { h, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import AutoComplete from '../../auto-complete'
import Cascader from '../../cascader'
import Select from '../../select'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const options = [
  { value: 'old', label: '原值' },
  { value: 'new', label: '新值' },
  { value: 'fixed', label: '修正值' },
]
const cases: [string, any, Record<string, any>][] = [
  ['AutoComplete', AutoComplete, { options: ['old', 'new', 'fixed'], shouldOpen: () => true }],
  ['Select', Select, { options, filterable: true }],
  ['Cascader', Cascader, { options, filterable: true }],
]
const deferred = () => {
  let resolve!: (value?: any) => void
  const promise = new Promise<any>((done) => (resolve = done))
  return { promise, resolve }
}
function fixture(
  name: string,
  Field: any,
  editMode: string,
  props: Record<string, any>,
  extra: Record<string, any> = {},
  reject = false,
) {
  const model = reactive({ value: 'old' })
  const state = reactive({
    disabled: false,
    readonly: false,
    fieldDisabled: undefined as boolean | undefined,
    fieldReadonly: undefined as boolean | undefined,
  })
  const wrapper = mount(Form, {
    props: { model },
    slots: {
      default: () =>
        h(
          FormItem,
          {
            field: 'value',
            label: '选项字段',
            rules: reject ? [(value: unknown) => (value === 'new' ? '候选校验失败' : true)] : undefined,
          },
          () =>
            h(Field, {
              ...props,
              ...extra,
              editMode,
              disabled: state.fieldDisabled,
              readonly: state.fieldReadonly,
              modelValue: model.value,
              'onUpdate:modelValue': (value: string) => (model.value = value),
            }),
        ),
    },
  })
  const panel = () => wrapper.getComponent(EditorPanel)
  const open = async () => {
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
  }
  const change = async (value = 'new') => {
    if (name === 'AutoComplete') {
      await panel().get('input').setValue(value)
    } else {
      const option = panel()
        .findAll('[role=option], [role=menuitem]')
        .find((item) => item.text().includes(options.find((item) => item.value === value)!.label))
      await option!.trigger('click')
    }
    await flushPromises()
  }
  const confirm = async () => {
    await panel().get('footer button').trigger('click')
    await flushPromises()
  }
  return { wrapper, model, state, panel, open, change, confirm }
}
for (const [name, Field, props] of cases) {
  for (const editMode of ['popup']) {
    describe(`${name} ${editMode} Form transactions`, () => {
      it('locks during asynchronous confirmation and preserves a rejected draft', async () => {
        const task = deferred()
        const commit = vi.fn((_value: unknown) => task.promise)
        const f = fixture(name, Field, editMode, props, { beforeCommit: commit })
        try {
          await f.open()
          await f.change()
          await f.confirm()
          expect(f.model.value).toBe('old')
          expect(f.panel().attributes('aria-busy')).toBe('true')
          expect(f.panel().find('[inert]').exists()).toBe(true)
          const input = f.panel().find('input:not([type=checkbox])')
          if (input.exists()) {
            await input.setValue('blocked')
          }
          for (const input of f.panel().findAll('input:not([type=checkbox])')) {
            expect(input.attributes('disabled')).toBeDefined()
          }
          await f.confirm()
          await f.panel().get('[aria-label="关闭"]').trigger('click')
          expect(commit).toHaveBeenCalledTimes(1)
          task.resolve(false)
          await flushPromises()
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
          commit.mockResolvedValueOnce(undefined)
          await f.confirm()
          expect(commit.mock.calls[1][0]).toEqual({ value: 'new', previousValue: 'old' })
          expect(f.model.value).toBe('new')
        } finally {
          task.resolve()
          f.wrapper.unmount()
        }
      })
      it('retains failed validation and lets a corrected candidate commit', async () => {
        const f = fixture(name, Field, editMode, props, {}, true)
        try {
          await f.open()
          await f.change()
          await f.confirm()
          expect(f.model.value).toBe('old')
          expect(f.panel().get('[role=alert]').text()).toContain('候选校验失败')
          if (name === 'AutoComplete') {
            expect((f.panel().get('input').element as HTMLInputElement).value).toBe('new')
          }
          await f.change('fixed')
          await f.confirm()
          expect(f.model.value).toBe('fixed')
        } finally {
          f.wrapper.unmount()
        }
      })
      it('reset aborts pending confirmation and discards late completion', async () => {
        const task = deferred()
        let signal: AbortSignal | undefined
        const f = fixture(name, Field, editMode, props, {
          beforeCommit: (_payload: unknown, _done: unknown, ctx: { signal: AbortSignal }) => {
            signal = ctx.signal
            return task.promise
          },
        })
        try {
          await f.open()
          await f.change()
          await f.confirm()
          f.wrapper.vm.resetFields('unrelated')
          await flushPromises()
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
          f.wrapper.vm.resetFields()
          await flushPromises()
          expect(signal?.aborted).toBe(true)
          expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
          task.resolve()
          await flushPromises()
          expect(f.model.value).toBe('old')
          await f.open()
          if (name === 'AutoComplete') {
            expect((f.panel().get('input').element as HTMLInputElement).value).toBe('old')
          }
        } finally {
          task.resolve()
          f.wrapper.unmount()
        }
      })
      for (const restriction of ['disabled', 'readonly'] as const) {
        it(`inherits ${restriction}, permits explicit false, and cancels a pending draft when blocked`, async () => {
          const task = deferred()
          const f = fixture(name, Field, editMode, props, { beforeCommit: () => task.promise })
          try {
            await f.wrapper.setProps({ [restriction]: true })
            await f.open()
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
            f.state[restriction === 'disabled' ? 'fieldDisabled' : 'fieldReadonly'] = false
            await flushPromises()
            await f.open()
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('true')
            await f.change()
            await f.confirm()
            f.state[restriction === 'disabled' ? 'fieldDisabled' : 'fieldReadonly'] = true
            await flushPromises()
            expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
            task.resolve()
            await flushPromises()
            expect(f.model.value).toBe('old')
          } finally {
            task.resolve()
            f.wrapper.unmount()
          }
        })
      }
    })
  }
}

for (const editMode of ['popup']) {
  it(`AutoComplete ${editMode} reset ignores a late search result and cannot reopen the editor`, async () => {
    const remote = reactive({ options: ['old'], filterOption: false, shouldOpen: () => true })
    const search = vi.fn()
    const f = fixture('AutoComplete', AutoComplete, editMode, remote, { onSearch: search })
    try {
      await f.open()
      await f.change('query')
      expect(search.mock.calls[0][0]).toBe('query')
      f.wrapper.vm.resetFields()
      await flushPromises()
      remote.options = ['late query result']
      await flushPromises()
      expect(f.wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded')).toBe('false')
      expect(f.model.value).toBe('old')
      await f.open()
      expect((f.panel().get('input').element as HTMLInputElement).value).toBe('old')
    } finally {
      f.wrapper.unmount()
    }
  })
}
