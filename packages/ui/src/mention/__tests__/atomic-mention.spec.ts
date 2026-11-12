import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Mention from '..'

const owners: ReturnType<typeof mount>[] = []
const originalScroll = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')
beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() })
})
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  if (originalScroll) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScroll)
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo')
  }
})

for (const type of ['input', 'textarea'] as const) {
  test(`${type}: initializes from the ID, reacts to fallback and deletes the whole mention`, async () => {
    const value = ref('Hi @[shuai.meng]!')
    const labels = reactive({ 'shuai.meng': '孟帅' })
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          type,
          atomic: true,
          modelValue: value.value,
          options: [],
          fallbackOption: (id: string | number | boolean) => ({
            value: id,
            label: labels[String(id) as keyof typeof labels] ?? String(id),
          }),
          'onUpdate:modelValue': (next: string | null) => {
            value.value = next ?? ''
          },
        }),
    )
    const owner = mount(Host, { attachTo: document.body })
    owners.push(owner)
    const input = owner.get(type)
    const element = input.element as HTMLInputElement | HTMLTextAreaElement
    expect(element.value).toBe('Hi @孟帅!')
    labels['shuai.meng'] = '新名称'
    await nextTick()
    expect(element.value).toBe('Hi @新名称!')
    expect(value.value).toBe('Hi @[shuai.meng]!')
    element.focus()
    element.setSelectionRange(7, 7)
    await input.trigger('keydown', { key: 'Backspace' })
    await flushPromises()
    expect(value.value).toBe('Hi !')
    expect(element.value).toBe('Hi !')
    await input.trigger('keydown', { key: 'z', ctrlKey: true })
    await flushPromises()
    expect(value.value).toBe('Hi @[shuai.meng]!')
    expect(element.value).toBe('Hi @新名称!')
    await input.trigger('keydown', { key: 'z', ctrlKey: true, shiftKey: true })
    await flushPromises()
    expect(value.value).toBe('Hi !')
  })

  test(`${type}: selecting an option inserts its encoded ID and displays the label`, async () => {
    const value = ref('')
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          type,
          atomic: true,
          modelValue: value.value,
          options: [{ value: 'shuai.meng', label: '孟帅' }],
          'onUpdate:modelValue': (next: string | null) => {
            value.value = next ?? ''
          },
        }),
    )
    const owner = mount(Host, { attachTo: document.body })
    owners.push(owner)
    const input = owner.get(type)
    const element = input.element as HTMLInputElement | HTMLTextAreaElement
    element.focus()
    element.value = '@孟'
    element.setSelectionRange(2, 2)
    await input.trigger('input')
    await flushPromises()
    const option = document.querySelector<HTMLElement>('[role="option"]')!
    expect(option.textContent).toContain('孟帅')
    option.click()
    await flushPromises()
    expect(value.value).toBe('@[shuai.meng] ')
    expect(element.value).toBe('@孟帅 ')
  })
}

test('copy and paste retain entity identity inside a Cedar mention editor', async () => {
  const value = ref('@[shuai.meng]')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '孟帅' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(0, element.value.length)
  const data: Record<string, string> = {}
  await input.trigger('copy', {
    clipboardData: {
      setData: (type: string, text: string) => {
        data[type] = text
      },
    },
  })
  expect(data['text/plain']).toBe('@孟帅')
  expect(data['application/x-cedar-mention']).toBe('@[shuai.meng]')
  element.setSelectionRange(element.value.length, element.value.length)
  await input.trigger('paste', { clipboardData: { getData: (type: string) => data[type] ?? '' } })
  await flushPromises()
  expect(value.value).toBe('@[shuai.meng]@[shuai.meng]')
  expect(element.value).toBe('@孟帅@孟帅')
})

test('read presentation uses the same fallback without changing the model', async () => {
  const labels = reactive({ name: '孟帅' })
  const owner = mount(Mention, {
    props: {
      atomic: true,
      readPretty: true,
      modelValue: '联系 @[shuai.meng]',
      options: [],
      fallbackOption: (id: string | number | boolean) => ({ value: id, label: labels.name }),
    },
  })
  owners.push(owner)
  expect(owner.text()).toContain('联系 @孟帅')
  labels.name = '新名称'
  await nextTick()
  expect(owner.text()).toContain('联系 @新名称')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('editing any character of a mention replaces the entire entity', async () => {
  const value = ref('前 @[id] 后')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '姓名' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.value = '前 @姓 后'
  element.setSelectionRange(4, 4)
  await input.trigger('input')
  await flushPromises()
  expect(value.value).toBe('前  后')
  expect(element.value).toBe('前  后')
})

test('replacing part of a mention restores the caret after the inserted text', async () => {
  const value = ref('前 @[id] 后')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '姓名' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.value = '前 @X名 后'
  element.setSelectionRange(4, 4)
  await input.trigger('input')
  await flushPromises()
  expect(value.value).toBe('前 X 后')
  expect(element.selectionStart).toBe(3)
})

test('composition beside a mention preserves the existing identity', async () => {
  const value = ref('@[id] ')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '姓名' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(element.value.length, element.value.length)
  await input.trigger('compositionstart')
  element.value = '@姓名 中'
  element.setSelectionRange(element.value.length, element.value.length)
  await input.trigger('input', { isComposing: true })
  expect(value.value).toBe('@[id] ')
  await input.trigger('compositionend', { data: '中' })
  await flushPromises()
  expect(value.value).toBe('@[id] 中')
  expect(element.value).toBe('@姓名 中')
})

test('a fallback label update during composition does not corrupt the mention', async () => {
  const value = ref('@[id] ')
  const names = reactive({ name: '姓名' })
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: names.name }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(element.value.length, element.value.length)
  await input.trigger('compositionstart')
  names.name = '新名字'
  await nextTick()
  element.value = '@姓名 中'
  element.setSelectionRange(element.value.length, element.value.length)
  await input.trigger('input', { isComposing: true })
  await input.trigger('compositionend', { data: '中' })
  await flushPromises()
  expect(value.value).toBe('@[id] 中')
  expect(element.value).toBe('@新名字 中')
  expect(element.selectionStart).toBe(element.value.length)
})

test('label-only updates retain the logical caret position', async () => {
  const names = reactive({ name: '孟帅' })
  const owner = mount(Mention, {
    attachTo: document.body,
    props: {
      atomic: true,
      modelValue: 'Hi @[id] end',
      options: [],
      fallbackOption: (id: string | number | boolean) => ({ value: id, label: names.name }),
    },
  })
  owners.push(owner)
  const element = owner.get('input').element as HTMLInputElement
  element.focus()
  element.setSelectionRange(8, 8)
  names.name = '新姓名更长'
  await flushPromises()
  expect(element.value).toBe('Hi @新姓名更长 end')
  expect(element.selectionStart).toBe(11)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('arrow keys move across an entire mention', async () => {
  const owner = mount(Mention, {
    attachTo: document.body,
    props: {
      atomic: true,
      modelValue: 'A@[id]B',
      options: [],
      fallbackOption: (id: string | number | boolean) => ({ value: id, label: '姓名' }),
    },
  })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(4, 4)
  await input.trigger('keydown', { key: 'ArrowLeft' })
  expect(element.selectionStart).toBe(1)
  await input.trigger('keydown', { key: 'ArrowRight' })
  expect(element.selectionStart).toBe(4)
})

test('numeric and string identities remain distinct during fallback', () => {
  const fallback = vi.fn((value: string | number | boolean) => ({ value, label: `${typeof value}:${String(value)}` }))
  const owner = mount(Mention, {
    props: {
      atomic: true,
      modelValue: '@[!n:0] @[0] @[!b:0]',
      options: [],
      fallbackOption: fallback,
    },
  })
  owners.push(owner)
  expect((owner.get('input').element as HTMLInputElement).value).toBe('@number:0 @string:0 @boolean:false')
  expect(fallback).toHaveBeenCalledWith(0)
  expect(fallback).toHaveBeenCalledWith('0')
  expect(fallback).toHaveBeenCalledWith(false)
})

test('custom prefix is preserved in the serialized identity and its display', async () => {
  const value = ref('')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        prefix: '##',
        modelValue: value.value,
        options: [{ value: 'topic', label: '主题' }],
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.value = '##主'
  element.setSelectionRange(3, 3)
  await input.trigger('input')
  await flushPromises()
  document.querySelector<HTMLElement>('[role="option"]')!.click()
  await flushPromises()
  expect(value.value).toBe('@[%23%23|topic] ')
  expect(element.value).toBe('##主题 ')
})

test('clear participates in atomic undo history and keeps the configured empty value', async () => {
  const value = ref<string | null>('@[id]')
  const Host = defineComponent(
    () => () =>
      h(
        Mention,
        {
          atomic: true,
          clearable: true,
          emptyValue: null,
          modelValue: value.value,
          options: [],
          fallbackOption: (id: string | number | boolean) => ({ value: id, label: '姓名' }),
          'onUpdate:modelValue': (next: string | null) => {
            value.value = next
          },
        },
        { 'clear-icon': ({ clear }: { clear: (event: Event) => void }) => h('button', { onClick: clear }, 'clear') },
      ),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  ;(input.element as HTMLInputElement).focus()
  await owner.get('button').trigger('click')
  expect(value.value).toBeNull()
  await input.trigger('keydown', { key: 'z', ctrlKey: true })
  await flushPromises()
  expect(value.value).toBe('@[id]')
  expect((input.element as HTMLInputElement).value).toBe('@姓名')
})

test('beforeinput replaces the selected identity when adjacent mentions have the same label', async () => {
  const value = ref('@[first]@[second]')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '同名' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(1, 2)
  await input.trigger('beforeinput', { inputType: 'insertText', data: 'X' })
  await flushPromises()
  expect(value.value).toBe('X@[second]')
  expect(element.value).toBe('X@同名')
})

test('composition replaces the selected identity even with identical labels', async () => {
  const value = ref('@[first]@[second]')
  const Host = defineComponent(
    () => () =>
      h(Mention, {
        atomic: true,
        modelValue: value.value,
        options: [],
        fallbackOption: (id: string | number | boolean) => ({ value: id, label: '同名' }),
        'onUpdate:modelValue': (next: string | null) => {
          value.value = next ?? ''
        },
      }),
  )
  const owner = mount(Host, { attachTo: document.body })
  owners.push(owner)
  const input = owner.get('input')
  const element = input.element as HTMLInputElement
  element.focus()
  element.setSelectionRange(1, 2)
  await input.trigger('compositionstart')
  element.value = '@中名@同名'
  element.setSelectionRange(2, 2)
  await input.trigger('input', { isComposing: true })
  await input.trigger('compositionend', { data: '中' })
  await flushPromises()
  expect(value.value).toBe('中@[second]')
  expect(element.value).toBe('中@同名')
})

test('atomic overlay observes field resizing and disconnects on unmount', async () => {
  const previous = Object.getOwnPropertyDescriptor(window, 'ResizeObserver')
  const observe = vi.fn(),
    disconnect = vi.fn()
  Object.defineProperty(window, 'ResizeObserver', {
    configurable: true,
    value: class {
      observe = observe
      disconnect = disconnect
      unobserve = vi.fn()
    },
  })
  try {
    const owner = mount(Mention, { props: { atomic: true, modelValue: '@[id]', options: [] } })
    await nextTick()
    expect(observe).toHaveBeenCalled()
    owner.unmount()
    expect(disconnect).toHaveBeenCalled()
  } finally {
    if (previous) {
      Object.defineProperty(window, 'ResizeObserver', previous)
    } else {
      Reflect.deleteProperty(window, 'ResizeObserver')
    }
  }
})
