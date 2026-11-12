import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Mention from '..'
import { resolveMentionLabel } from '../token-label'

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

describe('fallbackOption resolution', () => {
  test.each(['input', 'textarea'] as const)(
    '%s reinitializes saved mentions as async fallback data arrives',
    async (type) => {
      const saved = '联系 @[shuai.meng]、@[xiaoming]、@[lisi]'
      const initial = mount(Mention, {
        props: {
          atomic: true,
          type,
          modelValue: saved,
          options: [
            { value: 'shuai.meng', label: '旧孟帅' },
            { value: 'xiaoming', label: '旧小明' },
            { value: 'lisi', label: '旧李四' },
          ],
        },
      })
      expect((initial.get(type).element as HTMLInputElement).value).toBe('联系 @旧孟帅、@旧小明、@旧李四')
      initial.unmount()

      const value = ref(saved)
      const pretty = ref(false)
      const names = reactive<Record<string, string>>({})
      let resolveNames!: (result: Record<string, string>) => void
      let resolveLast!: (result: Record<string, string>) => void
      const request = new Promise<Record<string, string>>((resolve) => {
        resolveNames = resolve
      })
      const lastRequest = new Promise<Record<string, string>>((resolve) => {
        resolveLast = resolve
      })
      const loadNames = async (source: Promise<Record<string, string>>) => Object.assign(names, await source)
      const loading = loadNames(request)
      const loadingLast = loadNames(lastRequest)
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
            options: [],
            fallbackOption: (id: string | number | boolean) =>
              names[String(id)] ? { value: id, label: names[String(id)] } : undefined,
            'onUpdate:modelValue': updates,
          }),
      )
      const owner = mount(Host, { attachTo: document.body })
      owners.push(owner)
      expect((owner.get(type).element as HTMLInputElement).value).toBe('联系 @shuai.meng、@xiaoming、@lisi')
      pretty.value = true
      await nextTick()
      expect(owner.text()).toContain('联系 @shuai.meng、@xiaoming、@lisi')
      resolveNames({ 'shuai.meng': '孟帅', xiaoming: '小明' })
      await loading
      await flushPromises()
      expect(owner.text()).toContain('联系 @孟帅、@小明、@lisi')
      resolveLast({ lisi: '李四' })
      await loadingLast
      await flushPromises()
      expect(owner.text()).toContain('联系 @孟帅、@小明、@李四')
      expect(value.value).toBe(saved)
      expect(updates).not.toHaveBeenCalled()
      expect(owner.getComponent(Mention).emitted('change')).toBeUndefined()
      pretty.value = false
      await flushPromises()
      const input = owner.get(type)
      const element = input.element as HTMLInputElement | HTMLTextAreaElement
      expect(element.value).toBe('联系 @孟帅、@小明、@李四')
      element.focus()
      const end = element.value.indexOf('@小明') + '@小明'.length
      element.setSelectionRange(end, end)
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()
      expect(value.value).toBe('联系 @[shuai.meng]、、@[lisi]')
      names.xiaoming = '已删除'
      names.lisi = '李四更新'
      await nextTick()
      expect(element.value).toBe('联系 @孟帅、、@李四更新')
      expect(updates).toHaveBeenCalledTimes(1)
    },
  )

  for (const type of ['input', 'textarea'] as const) {
    test(`${type} updates labels without changing IDs across candidate changes and removal`, async () => {
      const value = ref('联系 @[alice] 和 @[bob]')
      const names = reactive<Record<string, string>>({ alice: '艾丽丝' })
      const options = ref<Array<{ value: string; label: string }>>([])
      const updates = vi.fn((next: string | null) => {
        value.value = next ?? ''
      })
      const fallback = vi.fn((id: string | number | boolean) => {
        const label = names[String(id)]
        return label === undefined ? undefined : { value: `different-${id}`, label }
      })
      const Host = defineComponent(
        () => () =>
          h(Mention, {
            type,
            atomic: true,
            modelValue: value.value,
            options: options.value,
            fallbackOption: fallback,
            'onUpdate:modelValue': updates,
          }),
      )
      const owner = mount(Host, { attachTo: document.body })
      owners.push(owner)
      const input = owner.get(type)
      const element = input.element as HTMLInputElement | HTMLTextAreaElement
      expect(element.value).toBe('联系 @艾丽丝 和 @bob')
      names.bob = '鲍勃'
      await nextTick()
      expect(element.value).toBe('联系 @艾丽丝 和 @鲍勃')
      options.value = [{ value: 'alice', label: '候选姓名' }]
      await nextTick()
      expect(element.value).toBe('联系 @候选姓名 和 @鲍勃')
      names.alice = '新名称'
      await nextTick()
      expect(element.value).toContain('@候选姓名')
      options.value = []
      await nextTick()
      expect(element.value).toBe('联系 @新名称 和 @鲍勃')
      expect(value.value).toBe('联系 @[alice] 和 @[bob]')
      expect(updates).not.toHaveBeenCalled()
      element.focus()
      const end = element.value.indexOf(' 和')
      element.setSelectionRange(end, end)
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()
      expect(value.value).toBe('联系  和 @[bob]')
      names.alice = '不应复活'
      await nextTick()
      expect(element.value).toBe('联系  和 @鲍勃')
    })
  }

  test('resolves nested options before fallback and preserves typed identity', () => {
    const fallback = vi.fn((value) => ({ value, label: `fallback:${typeof value}:${value}` }))
    const options = [{ isGroup: true as const, label: '分组', options: [{ value: 0, label: '数字零' }] }]
    expect(resolveMentionLabel(0, options, fallback)).toBe('数字零')
    expect(resolveMentionLabel('0', options, fallback)).toBe('fallback:string:0')
    expect(resolveMentionLabel(false, options, fallback)).toBe('fallback:boolean:false')
    expect(resolveMentionLabel('missing', [], () => null)).toBe('missing')
  })

  test('read-pretty uses fallback and reacts to asynchronous business data', async () => {
    const names = reactive<Record<string, string>>({})
    const owner = mount(Mention, {
      props: {
        atomic: true,
        readPretty: true,
        modelValue: '联系 @[alice]',
        options: [],
        fallbackOption: (value) => (names[String(value)] ? { value, label: names[String(value)] } : undefined),
      },
    })
    owners.push(owner)
    expect(owner.text()).toContain('联系 @alice')
    names.alice = '艾丽丝'
    await nextTick()
    expect(owner.text()).toContain('联系 @艾丽丝')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
  })

  test('plain-text mode does not interpret markup or invoke fallback', () => {
    const fallback = vi.fn((value) => ({ value, label: '姓名' }))
    const owner = mount(Mention, { props: { modelValue: 'literal @[alice]', options: [], fallbackOption: fallback } })
    owners.push(owner)
    expect((owner.get('input').element as HTMLInputElement).value).toBe('literal @[alice]')
    expect(fallback).not.toHaveBeenCalled()
  })

  test('external model replacement resolves the new ID without emitting an update', async () => {
    const fallback = vi.fn((value) => ({ value, label: value === 'a' ? '甲' : '乙' }))
    const owner = mount(Mention, { props: { atomic: true, modelValue: '@[a]', options: [], fallbackOption: fallback } })
    owners.push(owner)
    expect((owner.get('input').element as HTMLInputElement).value).toBe('@甲')
    await owner.setProps({ modelValue: '@[b]' })
    expect((owner.get('input').element as HTMLInputElement).value).toBe('@乙')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
    expect(owner.emitted('change')).toBeUndefined()
  })

  test.each(['disabled', 'readonly'] as const)('%s still resolves and updates fallback labels', async (state) => {
    const names = reactive({ name: '原姓名' })
    const owner = mount(Mention, {
      props: {
        atomic: true,
        modelValue: '@[alice]',
        options: [],
        [state]: true,
        fallbackOption: (value) => ({ value, label: names.name }),
      },
    })
    owners.push(owner)
    const element = owner.get('input').element as HTMLInputElement
    expect(element.value).toBe('@原姓名')
    names.name = '新姓名'
    await nextTick()
    expect(element.value).toBe('@新姓名')
    expect(owner.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('mention search', () => {
  test.each(['input', 'textarea'] as const)('%s filters local candidates by account or label', async (type) => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        type,
        options: [
          { value: 'xiaoming', label: '小明' },
          { value: 'lisi', label: '李四' },
        ],
      },
    })
    owners.push(owner)
    const input = owner.get(type)
    ;(input.element as HTMLInputElement | HTMLTextAreaElement).focus()
    await input.setValue('@xiao')
    await flushPromises()
    const list = () => document.getElementById(input.attributes('aria-controls')!)
    expect(list()?.textContent).toContain('小明')
    expect(list()?.textContent).not.toContain('李四')
    await input.setValue('@李')
    await flushPromises()
    expect(list()?.textContent).toContain('李四')
    expect(list()?.textContent).not.toContain('小明')
  })

  for (const type of ['input', 'textarea'] as const) {
    for (const query of ['xiaoming', 'XIAOMING', '小明']) {
      test(`${type} searches ${query} and preserves the account ID`, async () => {
        const value = ref('')
        const Host = defineComponent(
          () => () =>
            h(Mention, {
              type,
              atomic: true,
              modelValue: value.value,
              options: [{ value: 'xiaoming', label: '小明' }],
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
        element.value = `@${query}`
        element.setSelectionRange(element.value.length, element.value.length)
        await input.trigger('input')
        await flushPromises()
        const candidate = Array.from(document.querySelectorAll<HTMLElement>('[role="option"]')).find((el) =>
          el.textContent?.includes('小明'),
        )
        expect(candidate).toBeTruthy()
        candidate!.click()
        await flushPromises()
        expect(element.value).toBe('@小明 ')
        expect(value.value).toBe('@[xiaoming] ')
      })
    }
  }

  test('remote options are not filtered a second time by account or label', async () => {
    const loader = vi.fn(async (_query: string) => [{ value: 'remote-id', label: '远程结果' }])
    const owner = mount(Mention, { attachTo: document.body, props: { atomic: true, options: loader } })
    owners.push(owner)
    await flushPromises()
    const input = owner.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.value = '@alias'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input')
    await flushPromises()
    expect(loader.mock.calls.some(([query]) => query === 'alias')).toBe(true)
    expect(document.body.textContent).toContain('远程结果')
  })

  test('an account committed through IME composition opens its matching candidate', async () => {
    const value = ref('')
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: value.value,
          options: [
            { value: 'xiaoming2', label: '另一个人' },
            { value: 'xiaoming', label: '小明' },
          ],
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
    element.value = '@'
    element.setSelectionRange(1, 1)
    await input.trigger('input')
    await input.trigger('compositionstart')
    element.value = '@xiaoming'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input', { isComposing: true })
    expect(value.value).toBe('@')
    await input.trigger('compositionend', { data: 'xiaoming' })
    await flushPromises()
    const candidate = Array.from(document.querySelectorAll<HTMLElement>('[role="option"]')).find((el) =>
      el.textContent?.includes('小明'),
    )
    expect(candidate).toBeTruthy()
    candidate!.click()
    await flushPromises()
    expect(element.value).toBe('@小明 ')
    expect(value.value).toBe('@[xiaoming] ')
  })

  test('pressing Enter on an exact account query accepts the candidate', async () => {
    const value = ref('')
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: value.value,
          options: [
            { value: 'xiaoming2', label: '另一个人' },
            { value: 'xiaoming', label: '小明' },
          ],
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
    expect(element.value).toBe('@小明 ')
    expect(value.value).toBe('@[xiaoming] ')
  })

  test('an explicit keyboard selection takes priority over an exact account match', async () => {
    const value = ref('')
    const Host = defineComponent(
      () => () =>
        h(Mention, {
          atomic: true,
          modelValue: value.value,
          options: [
            { value: 'xiaoming2', label: '另一个人' },
            { value: 'xiaoming', label: '小明' },
          ],
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
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(element.value).toBe('@另一个人 ')
    expect(value.value).toBe('@[xiaoming2] ')
  })

  for (const type of ['input', 'textarea'] as const) {
    test(`${type} creates a mention from fallback when no candidate exists`, async () => {
      const value = ref('')
      const fallback = vi.fn((id: string | number | boolean) =>
        id === 'xiaoming' ? { value: 'different-value', label: '小明' } : undefined,
      )
      const Host = defineComponent(
        () => () =>
          h(Mention, {
            type,
            atomic: true,
            modelValue: value.value,
            options: [],
            fallbackOption: fallback,
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
      element.value = '@xiaoming'
      element.setSelectionRange(element.value.length, element.value.length)
      await input.trigger('input')
      await flushPromises()
      await input.trigger('keydown', { key: 'Enter' })
      await flushPromises()
      expect(element.value).toBe('@小明 ')
      expect(value.value).toBe('@[xiaoming] ')
      expect(fallback).toHaveBeenCalledWith('xiaoming')
    })
  }

  test('an unresolved fallback does not turn plain input into a mention', async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        atomic: true,
        options: [],
        fallbackOption: () => undefined,
      },
    })
    owners.push(owner)
    const input = owner.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.value = '@unknown'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input')
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('select')).toBeUndefined()
    expect(element.value).toBe('@unknown')
  })

  test('does not create a fallback mention while options are loading', async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        atomic: true,
        loading: true,
        options: [],
        fallbackOption: (value) => ({ value, label: '小明' }),
      },
    })
    owners.push(owner)
    const input = owner.get('input')
    const element = input.element as HTMLInputElement
    element.focus()
    element.value = '@xiaoming'
    element.setSelectionRange(element.value.length, element.value.length)
    await input.trigger('input')
    await flushPromises()
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('select')).toBeUndefined()
    expect(element.value).toBe('@xiaoming')
  })
})
