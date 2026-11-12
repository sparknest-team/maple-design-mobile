import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
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

describe('atomic mention selected label cache', () => {
  test.each(['input', 'textarea'] as const)(
    '%s retains selected labels through remote searches and deletion',
    async (type) => {
      const value = ref('')
      let resolveSecond: ((items: Array<{ value: string; label: string }>) => void) | undefined
      const loader = vi.fn((query: string) =>
        query === 'other'
          ? new Promise<Array<{ value: string; label: string }>>((resolve) => {
              resolveSecond = resolve
            })
          : Promise.resolve([{ value: 'xiaoming', label: '小明' }]),
      )
      const Host = defineComponent(
        () => () =>
          h(Mention, {
            type,
            atomic: true,
            modelValue: value.value,
            options: loader,
            'onUpdate:modelValue': (next: string | null) => {
              value.value = next ?? ''
            },
          }),
      )
      const owner = mount(Host, { attachTo: document.body })
      owners.push(owner)
      await flushPromises()
      const input = owner.get(type)
      const element = input.element as HTMLInputElement | HTMLTextAreaElement
      element.focus()
      element.value = '@xiaoming'
      element.setSelectionRange(element.value.length, element.value.length)
      await input.trigger('input')
      await flushPromises()
      document.querySelector<HTMLElement>('[role="option"]')!.click()
      await flushPromises()
      expect(value.value).toBe('@[xiaoming] ')
      expect(element.value).toBe('@小明 ')
      element.value += '@other'
      element.setSelectionRange(element.value.length, element.value.length)
      await input.trigger('input')
      await nextTick()
      expect(element.value).toBe('@小明 @other')
      resolveSecond!([{ value: 'other', label: '其他人' }])
      await flushPromises()
      expect(element.value).toBe('@小明 @other')
      expect(value.value).toBe('@[xiaoming] @other')
      element.setSelectionRange(3, 3)
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()
      expect(value.value).toBe(' @other')
      await input.trigger('keydown', { key: 'z', ctrlKey: true })
      await flushPromises()
      expect(value.value).toBe('@[xiaoming] @other')
      expect(element.value).toBe('@小明 @other')
      await input.trigger('keydown', { key: 'z', ctrlKey: true, shiftKey: true })
      await flushPromises()
      expect(value.value).toBe(' @other')
      value.value = '@[xiaoming]'
      await nextTick()
      expect(element.value).toBe('@xiaoming')
    },
  )

  test('initial values cache real options, while fallback overrides cache and stays reactive', async () => {
    const options = ref([{ value: 'alice', label: '候选名称' }])
    const name = reactive<{ label?: string }>({})
    const model = ref('@[alice]')
    const updates = vi.fn((next: string | null) => {
      model.value = next ?? ''
    })
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: model.value,
          options: options.value,
          fallbackOption: (value: string | number | boolean) => (name.label ? { value, label: name.label } : undefined),
          'onUpdate:modelValue': updates,
        }),
    )
    const owner = mount(Host)
    owners.push(owner)
    const element = owner.get('input').element as HTMLInputElement
    expect(element.value).toBe('@候选名称')
    options.value = []
    await nextTick()
    expect(element.value).toBe('@候选名称')
    name.label = '回退名称'
    await nextTick()
    expect(element.value).toBe('@回退名称')
    name.label = '更新名称'
    await nextTick()
    expect(element.value).toBe('@更新名称')
    options.value = [{ value: 'alice', label: '最新候选' }]
    await nextTick()
    expect(element.value).toBe('@最新候选')
    options.value[0].label = '直接更新候选'
    await nextTick()
    expect(element.value).toBe('@直接更新候选')
    options.value = []
    name.label = undefined
    await nextTick()
    expect(element.value).toBe('@直接更新候选')
    expect(model.value).toBe('@[alice]')
    expect(updates).not.toHaveBeenCalled()
  })

  test('cache keeps equal-looking string, number and boolean identities distinct', async () => {
    const owner = mount(Mention, {
      props: {
        atomic: true,
        modelValue: '@[0] @[!n:0] @[!b:0]',
        options: [
          { value: '0', label: '字符串' },
          { value: 0, label: '数字' },
          { value: false, label: '布尔' },
        ],
      },
    })
    owners.push(owner)
    const element = owner.get('input').element as HTMLInputElement
    await owner.setProps({ options: [] })
    expect(element.value).toBe('@字符串 @数字 @布尔')
  })

  test('a mention created from fallback retains its label if fallback later disappears', async () => {
    const available = ref(true)
    const value = ref('')
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: value.value,
          options: [],
          fallbackOption: (id: string | number | boolean) =>
            available.value ? { value: id, label: '小明' } : undefined,
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
    element.value = '@xiaoming'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input')
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    available.value = false
    await nextTick()
    expect(value.value).toBe('@[xiaoming] ')
    expect(element.value).toBe('@小明 ')
  })
})
