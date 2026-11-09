import { h, nextTick, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'
import DateField from '../../date'
import DateRange from '../../date-range'
import DatePanel from '../../date/DatePanel.vue'
import TimeField from '../../time'
import TimeRange from '../../time-range'
import TimeRangePicker from '../../time-range/TimeRangePicker.vue'
import TimePicker from '../../time/TimePicker.vue'
import Upload from '../../upload'
import RawUpload from '../../upload/Upload.vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

const file = (id: string) => ({ id, uid: id, name: id + '.txt', status: 'success' })
const cases: any[] = [
  ['Time', TimeField, TimePicker, '09:30', '10:30', '11:30', { format: 'HH:mm' }],
  [
    'Date',
    DateField,
    DatePanel,
    '2026-10-19',
    '2026-10-21',
    '2026-10-23',
    { valueFormat: 'YYYY-MM-DD', panelType: 'calendar' },
  ],
  [
    'DateRange',
    DateRange,
    DatePanel,
    ['2026-10-19', '2026-10-22'],
    ['2026-10-23', '2026-10-25'],
    ['2026-10-26', '2026-10-28'],
    { valueFormat: 'YYYY-MM-DD', panelType: 'calendar' },
  ],
  [
    'TimeRange',
    TimeRange,
    TimeRangePicker,
    ['09:30', '18:00'],
    ['10:30', '19:00'],
    ['11:30', '20:00'],
    { format: 'HH:mm' },
  ],
  [
    'Upload',
    Upload,
    RawUpload,
    [file('original'), file('receipt')],
    [file('original')],
    [file('original'), file('replacement')],
    { autoUpload: false },
  ],
]
const presentations = ['popup'] as const
const rulesFor = (validate: (value: any) => Promise<boolean | string>) => [validate]
const clone = (value: any) => JSON.parse(JSON.stringify(value))
function deferred() {
  let resolve!: (value?: any) => void
  let reject!: (cause: Error) => void
  const promise = new Promise<any>((done, fail) => {
    resolve = done
    reject = fail
  })
  return { promise, resolve, reject }
}
function fixture(entry: any[], editMode: string, beforeCommit?: any, rules?: any) {
  const [name, Field, Editor, initial, next, fixed, extra] = entry
  const model = reactive({ value: clone(initial) })
  const state = reactive({ disabled: false, readonly: false, readPretty: false, editMode })
  const wrapper = mount(Form, {
    props: { model },
    slots: {
      default: () =>
        h(
          FormItem,
          {
            field: 'value',
            label: name,
            rules,
            disabled: state.disabled,
            readonly: state.readonly,
            readPretty: state.readPretty,
            editMode: state.editMode as any,
          },
          () =>
            h(Field, {
              ...extra,
              modelValue: model.value,
              beforeCommit,
              'onUpdate:modelValue': (value: any) => {
                model.value = value
              },
            }),
        ),
    },
  })
  const panel = () => wrapper.getComponent(EditorPanel)
  const editor = () => panel().getComponent(name === 'Upload' ? (Field as any).__fieldControl : Editor)
  const open = async () => {
    await wrapper.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
  }
  const choose = async (value = next) => {
    editor().vm.$emit(name === 'Upload' ? 'update:modelValue' : 'select', clone(value))
    await nextTick()
  }
  const draft = () =>
    clone(name.startsWith('Date') ? editor().props('options').modelValue : editor().props('modelValue'))
  const blocked = () => (name.startsWith('Date') ? editor().props('options').disabled : editor().props('disabled'))
  const action = async (confirm = true) => {
    await panel()
      .findAll('button')
      .find((button) =>
        confirm ? ['确认', '确定'].includes(buttonLabelText(button)) : buttonLabelText(button) === '×',
      )!
      .trigger('click')
    await flushPromises()
  }
  const isOpen = () => wrapper.get('[aria-haspopup=dialog]').attributes('aria-expanded') === 'true'
  return { wrapper, model, state, panel, editor, open, choose, draft, blocked, action, isOpen, initial, next, fixed }
}
function buttonLabelText(button: { element: Element }) {
  // Decorative aria-hidden loading/icon content is not the action label.
  const clone = button.element.cloneNode(true) as Element
  clone.querySelectorAll('[aria-hidden="true"]').forEach((node) => node.remove())
  return clone.textContent?.trim() || button.element.textContent?.trim() || ''
}

describe('temporal and upload presentation transactions', () => {
  for (const entry of cases) {
    const [name] = entry
    for (const editMode of presentations) {
      test(`${name} ${editMode} freezes the editor during async confirmation and retains a refused draft`, async () => {
        const task = deferred()
        const save = vi.fn((_value: any) => task.promise)
        const f = fixture(entry, editMode, save)
        try {
          await f.open()
          await f.choose()
          await f.action()
          expect(save).toHaveBeenCalledTimes(1)
          expect(f.model.value).toEqual(f.initial)
          expect(f.blocked()).toBe(true)
          expect(f.panel().attributes('aria-busy')).toBe('true')
          expect(f.panel().find('[inert]').exists()).toBe(true)
          expect(
            f
              .panel()
              .findAll('button')
              .filter((button) => ['确认', '确定', '×'].includes(buttonLabelText(button))),
          ).toHaveLength(2)
          await f.choose(f.fixed)
          f.panel().vm.$emit('confirm')
          await f.action(false)
          expect(save).toHaveBeenCalledTimes(1)
          task.resolve(false)
          await flushPromises()
          expect(f.isOpen()).toBe(true)
          expect(f.blocked()).not.toBe(true)
          expect(f.draft()).toEqual(f.next)
          save.mockResolvedValueOnce(undefined)
          await f.action()
          expect(f.model.value).toEqual(f.next)
          expect(f.isOpen()).toBe(false)
        } finally {
          task.resolve()
          f.wrapper.unmount()
        }
      })
      test(`${name} ${editMode} keeps a failed validation candidate and can correct and retry it`, async () => {
        const validate = vi.fn(async (value: any) =>
          JSON.stringify(value) === JSON.stringify(entry[4]) ? '候选校验失败' : true,
        )
        const save = vi.fn(() => true)
        const f = fixture(entry, editMode, save, rulesFor(validate))
        try {
          await f.open()
          await f.choose()
          await f.action()
          expect(f.model.value).toEqual(f.initial)
          expect(f.draft()).toEqual(f.next)
          expect(f.isOpen()).toBe(true)
          expect(f.panel().get('[role=alert]').text()).toContain('候选校验失败')
          expect(save).not.toHaveBeenCalled()
          await f.choose(f.fixed)
          expect(f.draft()).toEqual(f.fixed)
          await f.action()
          expect(f.model.value).toEqual(f.fixed)
          expect(f.isOpen()).toBe(false)
          expect(validate).toHaveBeenCalledTimes(2)
          expect(save).toHaveBeenCalledTimes(1)
        } finally {
          f.wrapper.unmount()
        }
      })
      test(`${name} ${editMode} preserves the draft on a save error and retries without duplicate change`, async () => {
        const save = vi.fn().mockRejectedValueOnce(new Error('模拟保存失败')).mockResolvedValueOnce(undefined)
        const f = fixture(entry, editMode, save)
        try {
          await f.open()
          await f.choose()
          await f.action()
          expect(f.panel().get('[role=alert]').text()).toContain('模拟保存失败')
          expect(f.draft()).toEqual(f.next)
          expect(f.model.value).toEqual(f.initial)
          await f.action()
          expect(f.model.value).toEqual(f.next)
          expect(f.wrapper.findComponent(entry[1]).emitted('change')).toHaveLength(1)
        } finally {
          f.wrapper.unmount()
        }
      })
      for (const stage of ['validation', 'save', 'native-reset']) {
        test(`${name} ${editMode} reset during ${stage} closes the panel and rejects late completion`, async () => {
          const task = deferred()
          let signal: AbortSignal | undefined
          const save = vi.fn((_payload, _done, context) => {
            signal = context.signal
            return stage === 'validation' ? undefined : task.promise
          })
          const f = fixture(entry, editMode, save, stage === 'validation' ? rulesFor(() => task.promise) : undefined)
          try {
            await f.open()
            await f.choose()
            await f.action()
            expect(f.blocked()).toBe(true)
            f.wrapper.vm.resetFields('unrelated')
            await flushPromises()
            expect(f.isOpen()).toBe(true)
            if (stage === 'native-reset') {
              await f.wrapper.trigger('reset')
            } else {
              f.wrapper.vm.resetFields(stage === 'validation' ? 'value' : undefined)
            }
            await flushPromises()
            expect(f.isOpen()).toBe(false)
            if (signal) {
              expect(signal.aborted).toBe(true)
            }
            task.resolve(true)
            await flushPromises()
            expect(f.model.value).toEqual(f.initial)
            if (stage === 'validation') {
              expect(save).not.toHaveBeenCalled()
            }
            await f.open()
            expect(f.draft()).toEqual(f.initial)
          } finally {
            task.resolve()
            f.wrapper.unmount()
          }
        })
      }
      for (const restriction of ['disabled', 'readonly', 'read']) {
        test(`${name} ${editMode} ${restriction} invalidates pending confirmation`, async () => {
          const task = deferred()
          let signal!: AbortSignal
          const f = fixture(entry, editMode, (_payload: unknown, _done: unknown, context: { signal: AbortSignal }) => {
            signal = context.signal
            return task.promise
          })
          try {
            await f.open()
            await f.choose()
            await f.action()
            if (restriction === 'read') {
              f.state.readPretty = true
            } else {
              f.state[restriction as 'disabled' | 'readonly'] = true
            }
            await flushPromises()
            expect(signal.aborted).toBe(true)
            if (restriction === 'read') {
              expect(f.wrapper.find('[aria-haspopup=dialog]').exists()).toBe(false)
            } else {
              expect(f.isOpen()).toBe(false)
            }
            task.resolve()
            await flushPromises()
            expect(f.model.value).toEqual(f.initial)
            f.state.disabled = false
            f.state.readonly = false
            f.state.readPretty = false
            f.state.editMode = editMode
            await flushPromises()
            expect(f.isOpen()).toBe(false)
            await f.open()
            expect(f.draft()).toEqual(f.initial)
          } finally {
            task.resolve()
            f.wrapper.unmount()
          }
        })
      }
    }
  }
})
