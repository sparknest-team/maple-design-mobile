import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Mention from '..'
import EditorPanel from '../../_components/field-presentation/EditorPanel.vue'

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

describe('mention presentation cache', () => {
  test.each(['input', 'textarea'] as const)(
    '%s retains multiple async selections across presentation changes and deletion',
    async (type) => {
      type Person = { value: string; label: string }
      const value = ref('请联系 @[shuai.meng]')
      const pretty = ref(false)
      const pending = new Map<string, (people: Person[]) => void>()
      const requested = new Set<string>()
      const loader = vi.fn((query: string) => {
        if ((query === 'xiaoming' || query === 'lisi') && !requested.has(query)) {
          requested.add(query)
          return new Promise<Person[]>((resolve) => pending.set(query, resolve))
        }
        return Promise.resolve([])
      })
      const updates = vi.fn((next: string | null) => {
        value.value = next ?? ''
      })
      const Host = defineComponent(
        () => () =>
          h(Mention, {
            atomic: true,
            type,
            modelValue: value.value,
            readPretty: pretty.value,
            options: loader,
            fallbackOption: (id: string | number | boolean) =>
              id === 'shuai.meng' ? { value: id, label: '孟帅' } : undefined,
            'onUpdate:modelValue': updates,
          }),
      )
      const owner = mount(Host, { attachTo: document.body })
      owners.push(owner)
      await flushPromises()

      const searchAndSelect = async (query: string, person: Person) => {
        const input = owner.get(type)
        const element = input.element as HTMLInputElement | HTMLTextAreaElement
        element.focus()
        element.value += `${element.value.endsWith(' ') ? '' : ' '}@${query}`
        element.setSelectionRange(element.value.length, element.value.length)
        await input.trigger('input')
        await nextTick()
        expect(pending.has(query)).toBe(true)
        pending.get(query)!([person])
        await flushPromises()
        const option = Array.from(document.querySelectorAll<HTMLElement>('[role="option"]')).find(
          (item) => item.textContent?.trim() === person.label,
        )
        expect(option).toBeTruthy()
        option!.click()
        await flushPromises()
      }

      expect((owner.get(type).element as HTMLInputElement).value).toBe('请联系 @孟帅')
      await searchAndSelect('xiaoming', { value: 'xiaoming', label: '小明' })
      await searchAndSelect('lisi', { value: 'lisi', label: '李四' })
      const expectedModel = '请联系 @[shuai.meng] @[xiaoming] @[lisi] '
      expect(value.value).toBe(expectedModel)
      expect((owner.get(type).element as HTMLInputElement).value).toBe('请联系 @孟帅 @小明 @李四 ')

      const countBeforeToggle = updates.mock.calls.length
      pretty.value = true
      await flushPromises()
      expect(owner.find(type).exists()).toBe(false)
      expect(owner.text()).toContain('请联系 @孟帅 @小明 @李四')
      expect(value.value).toBe(expectedModel)
      pretty.value = false
      await flushPromises()
      const input = owner.get(type)
      const element = input.element as HTMLInputElement | HTMLTextAreaElement
      expect(element.value).toBe('请联系 @孟帅 @小明 @李四 ')
      expect(value.value).toBe(expectedModel)
      expect(updates).toHaveBeenCalledTimes(countBeforeToggle)

      element.focus()
      const endOfXiaoming = element.value.indexOf('@小明') + '@小明'.length
      element.setSelectionRange(endOfXiaoming, endOfXiaoming)
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()
      const expectedAfterDeletion = '请联系 @[shuai.meng]  @[lisi] '
      expect(element.value).toBe('请联系 @孟帅  @李四 ')
      expect(value.value).toBe(expectedAfterDeletion)
      const countAfterDeletion = updates.mock.calls.length
      pretty.value = true
      await flushPromises()
      expect(owner.text()).toContain('@李四')
      expect(owner.text()).not.toContain('@小明')
      expect(value.value).toBe(expectedAfterDeletion)
      pretty.value = false
      await flushPromises()
      expect((owner.get(type).element as HTMLInputElement).value).toBe('请联系 @孟帅  @李四 ')
      expect(value.value).toBe(expectedAfterDeletion)
      expect(updates).toHaveBeenCalledTimes(countAfterDeletion)
    },
  )

  test.each(['input', 'textarea'] as const)(
    '%s preserves async selected labels across reading and editing',
    async (type) => {
      const value = ref('')
      const pretty = ref(false)
      const names = reactive<{ fallback?: string }>({})
      const loader = vi.fn(async (query: string) =>
        query === 'other' ? [{ value: 'other', label: '其他' }] : [{ value: 'xiaoming', label: '小明' }],
      )
      const updates = vi.fn((next: string | null) => {
        value.value = next ?? ''
      })
      const Host = defineComponent(
        () => () =>
          h(Mention, {
            atomic: true,
            type,
            modelValue: value.value,
            readPretty: pretty.value,
            options: loader,
            fallbackOption: (id: string | number | boolean) =>
              names.fallback ? { value: id, label: names.fallback } : undefined,
            'onUpdate:modelValue': updates,
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
      element.value += '@other'
      element.setSelectionRange(element.value.length, element.value.length)
      await input.trigger('input')
      await flushPromises()
      expect(element.value).toBe('@小明 @other')
      const count = updates.mock.calls.length
      pretty.value = true
      await flushPromises()
      expect(owner.find(type).exists()).toBe(false)
      expect(owner.text()).toContain('@小明 @other')
      names.fallback = '小明新名'
      await nextTick()
      expect(owner.text()).toContain('@小明新名 @other')
      names.fallback = undefined
      await nextTick()
      expect(owner.text()).toContain('@小明 @other')
      pretty.value = false
      await flushPromises()
      expect((owner.get(type).element as HTMLInputElement).value).toBe('@小明 @other')
      expect(updates).toHaveBeenCalledTimes(count)
      expect(value.value).toBe('@[xiaoming] @other')
    },
  )

  test('reading resolves initial and updated options, prunes removed values, and never emits model changes', async () => {
    const owner = mount(Mention, {
      props: {
        atomic: true,
        readPretty: true,
        modelValue: '@[alice]',
        options: [{ value: 'alice', label: '艾丽丝' }],
      },
    })
    owners.push(owner)
    expect(owner.text()).toContain('@艾丽丝')
    await owner.setProps({ options: [] })
    expect(owner.text()).toContain('@艾丽丝')
    await owner.setProps({ readPretty: false })
    expect((owner.get('input').element as HTMLInputElement).value).toBe('@艾丽丝')
    await owner.setProps({ readPretty: true, modelValue: '' })
    await owner.setProps({ modelValue: '@[alice]' })
    expect(owner.text()).toContain('@alice')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
  })

  test('isolates cached names between component instances', async () => {
    const first = mount(Mention, {
      props: { atomic: true, modelValue: '@[id]', options: [{ value: 'id', label: '姓名' }] },
    })
    owners.push(first)
    const second = mount(Mention, { props: { atomic: true, readPretty: true, modelValue: '@[id]', options: [] } })
    owners.push(second)
    await first.setProps({ options: [], readPretty: true })
    expect(first.text()).toContain('@姓名')
    expect(second.text()).toContain('@id')
  })

  test('cancelled popup edits keep the committed mention label', async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        atomic: true,
        editMode: 'popup',
        modelValue: '@[alice]',
        options: [{ value: 'alice', label: '艾丽丝' }],
      },
    })
    owners.push(owner)
    await owner.setProps({ options: [] })
    expect(owner.text()).toContain('@艾丽丝')
    await owner.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = owner.getComponent(EditorPanel)
    const input = panel.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('keydown', { key: 'Backspace' })
    await flushPromises()
    expect(element.value).toBe('')
    await panel.get('[aria-label=关闭]').trigger('click')
    await flushPromises()
    expect(owner.text()).toContain('@艾丽丝')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  })

  test('committing a popup selection retains its label after its options disappear', async () => {
    const value = ref('')
    const options = ref([{ value: 'alice', label: '艾丽丝' }])
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          editMode: 'popup',
          modelValue: value.value,
          options: options.value,
          'onUpdate:modelValue': (next: string | null) => {
            value.value = next ?? ''
          },
        }),
    )
    const owner = mount(Host, { attachTo: document.body })
    owners.push(owner)
    await owner.get('[aria-haspopup=dialog]').trigger('click')
    await flushPromises()
    const panel = owner.getComponent(EditorPanel)
    const input = panel.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.value = '@alice'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input')
    await flushPromises()
    document.querySelector<HTMLElement>('[role="option"]')!.click()
    await flushPromises()
    options.value = []
    await flushPromises()
    expect(element.value).toBe('@艾丽丝 ')
    panel.vm.$emit('confirm')
    await flushPromises()
    expect(value.value).toBe('@[alice] ')
    expect(owner.text()).toContain('@艾丽丝')
  })
})
