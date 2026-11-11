import { h, nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Select from '../../select/select'
import SelectMenu from '../../select/SelectMenu'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

async function fixture() {
  const model = reactive({ device: 'a' })
  const queue: Array<() => void> = []
  const original = globalThis.setTimeout
  vi.spyOn(globalThis, 'setTimeout').mockImplementation(((callback: () => void, ms: number) => {
    if (ms === 83) {
      queue.push(callback)
    }
    return original(callback, ms)
  }) as typeof setTimeout)
  const owner = mount(Form, {
    props: { model, editMode: 'popup' },
    slots: {
      default: () =>
        h(FormItem, { field: 'device', label: 'Device' }, () =>
          h(Select, {
            modelValue: model.device,
            filterable: true,
            searchDelay: 83,
            options: [
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
            ],
            'onUpdate:modelValue': (value: unknown) => {
              model.device = String(value)
            },
          }),
        ),
    },
  })
  await owner.get('[aria-haspopup=dialog]').trigger('click')
  await nextTick()
  const select = owner.findComponent(Select)
  const controller = select.findComponent(SelectMenu).props('controller') as any
  return { owner, model, select, controller, queue }
}
test('matching Form reset retires the real Select search across reopening without committing its draft', async () => {
  vi.useFakeTimers()
  let f: Awaited<ReturnType<typeof fixture>> | undefined
  try {
    f = await fixture()
    f.controller.handleInputValueChange('A')
    expect(f.queue).toHaveLength(1)
    f.owner.vm.resetFields('device')
    await nextTick()
    expect(f.controller.computedOpen).toBe(false)
    f.controller.handleOpenChange(true)
    await nextTick()
    f.queue[0]()
    f.queue[0]()
    expect(f.select.emitted('search')).toBeUndefined()
    expect(f.model.device).toBe('a')
  } finally {
    f?.owner.unmount()
    vi.restoreAllMocks()
    vi.useRealTimers()
  }
})
test('unrelated reset preserves the editor and current search deadline', async () => {
  vi.useFakeTimers()
  let f: Awaited<ReturnType<typeof fixture>> | undefined
  try {
    f = await fixture()
    f.controller.handleInputValueChange('A')
    f.owner.vm.resetFields('other')
    await nextTick()
    expect(f.controller.computedOpen).toBe(true)
    vi.advanceTimersByTime(83)
    expect(f.select.emitted('search')).toEqual([['A']])
    expect(f.model.device).toBe('a')
  } finally {
    f?.owner.unmount()
    vi.restoreAllMocks()
    vi.useRealTimers()
  }
})
test('Form submit while the Select editor is active preserves editing failure semantics', async () => {
  vi.useFakeTimers()
  let f: Awaited<ReturnType<typeof fixture>> | undefined
  try {
    f = await fixture()
    await f.owner.trigger('submit')
    expect(f.owner.emitted('submit-failed')).toHaveLength(1)
    expect((f.owner.emitted('submit-failed')![0][0] as any).errors.editing.field).toBe('editing')
    expect(f.owner.emitted('submit-success')).toBeUndefined()
    expect(f.controller.computedOpen).toBe(true)
    expect(f.model.device).toBe('a')
  } finally {
    f?.owner.unmount()
    vi.restoreAllMocks()
    vi.useRealTimers()
  }
})
