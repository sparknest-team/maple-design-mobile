import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Input from '..'
import InputNumber from '../../input-number'
import Textarea from '../../textarea'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
const cases = [
  {
    name: 'Input',
    component: Input,
    selector: 'input',
    plain: 'a',
    draft: '中文组合',
    initial: 'initial',
    external: 'server',
    final: '中文',
  },
  {
    name: 'Textarea',
    component: Textarea,
    selector: 'textarea',
    plain: 'a',
    draft: '中文组合',
    initial: 'initial',
    external: 'server',
    final: '中文',
  },
  {
    name: 'InputNumber',
    component: InputNumber,
    selector: 'input',
    plain: '1',
    draft: '12',
    initial: 5,
    external: 7,
    final: '12',
  },
]
function event(element: HTMLInputElement | HTMLTextAreaElement, name: string, value?: string) {
  if (value !== undefined) {
    element.value = value
  }
  element.dispatchEvent(
    name.startsWith('composition')
      ? new CompositionEvent(name, { bubbles: true, data: value })
      : new InputEvent(name, { bubbles: true }),
  )
}
for (const item of cases) {
  test(`${item.name}: a queued plain-input restore cannot overwrite a newly started composition`, async () => {
    const owner = mount(item.component as any, {
      props: { ...(item.name === 'InputNumber' ? { modelEvent: 'input' } : {}), editMode: 'direct' },
    })
    owners.push(owner)
    const element = owner.get(item.selector).element as HTMLInputElement
    event(element, 'input', item.plain)
    event(element, 'compositionstart')
    event(element, 'input', item.draft)
    await nextTick()
    expect(element.value).toBe(item.draft)
  })
  test(`${item.name}: a second composition invalidates the previous composition-end restore`, async () => {
    const owner = mount(item.component as any, {
      props: { ...(item.name === 'InputNumber' ? { modelEvent: 'input' } : {}), editMode: 'direct' },
    })
    owners.push(owner)
    const element = owner.get(item.selector).element as HTMLInputElement
    event(element, 'compositionstart')
    event(element, 'input', item.plain)
    event(element, 'compositionend')
    event(element, 'compositionstart')
    event(element, 'input', item.draft)
    await nextTick()
    expect(element.value).toBe(item.draft)
  })
  test(`${item.name}: external accepted updates do not replace an active native composition buffer`, async () => {
    const value = ref<string | number>(item.initial)
    const owner = mount({
      setup: () => () =>
        h(item.component as any, {
          ...(item.name === 'InputNumber' ? { modelEvent: 'input' } : {}),
          editMode: 'direct',
          modelValue: value.value,
          'onUpdate:modelValue': (next: string | number) => (value.value = next),
        }),
    })
    owners.push(owner)
    const element = owner.get(item.selector).element as HTMLInputElement
    event(element, 'compositionstart')
    event(element, 'input', item.draft)
    value.value = item.external
    await nextTick()
    expect(element.value).toBe(item.draft)
    event(element, 'compositionend', item.final)
    event(element, 'input', item.final)
    await flushPromises()
    expect(element.value).toBe(item.final)
    expect(value.value).toBe(item.name === 'InputNumber' ? Number(item.final) : item.final)
  })
  test(`${item.name}: a controlled owner can refuse the final proposal after composing finishes`, async () => {
    const owner = mount(item.component as any, {
      props: {
        ...(item.name === 'InputNumber' ? { modelEvent: 'input' } : {}),
        editMode: 'direct',
        modelValue: item.initial,
      },
    })
    owners.push(owner)
    const element = owner.get(item.selector).element as HTMLInputElement
    event(element, 'input', item.plain)
    event(element, 'compositionstart')
    event(element, 'input', item.draft)
    await nextTick()
    expect(element.value).toBe(item.draft)
    event(element, 'compositionend', item.final)
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }))
    await flushPromises()
    expect(element.value).toBe(String(item.initial))
  })
}
