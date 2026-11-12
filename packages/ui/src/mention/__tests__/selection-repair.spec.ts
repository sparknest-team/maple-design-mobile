import { h, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import Mention from '..'
import Form from '../../form'

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
async function type(owner: ReturnType<typeof mount>, kind: string, text: string, caret = text.length) {
  const node = owner.get(kind)
  const element = node.element as HTMLInputElement
  element.value = text
  element.setSelectionRange(caret, caret)
  await node.trigger('input')
  await flushPromises()
}
const options = () => Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'))
for (const kind of ['input', 'textarea'] as const) {
  for (const [prefix, text, caret, result] of [
    ['@', 'Note @al', 8, 'Note @alice '],
    ['##', 'Note ##al', 9, 'Note ##alice '],
    [['@', '##'], 'Note ##al suffix', 9, 'Note ##alice suffix'],
  ] as const) {
    test(`${kind} replaces the complete ${JSON.stringify(prefix)} prefix/search range`, async () => {
      const owner = mount(Mention, {
        attachTo: document.body,
        props: {
          editMode: 'direct',
          type: kind,
          prefix: typeof prefix === 'string' ? prefix : [...prefix],
          options: ['alice'],
        },
      })
      owners.push(owner)
      await type(owner, kind, text, caret)
      expect(options().map((option) => option.textContent?.trim())).toEqual(['alice'])
      options()[0].click()
      await flushPromises()
      expect((owner.get(kind).element as HTMLInputElement).value).toBe(result)
      expect(owner.emitted('select')).toEqual([['alice']])
      expect(owner.emitted('change')?.at(-1)).toEqual([result])
    })
  }
  test(`${kind} renders nested groups as nonselectable titles and selects only their leaves`, async () => {
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        type: kind,
        options: [
          {
            isGroup: true,
            label: 'Team',
            options: [
              {
                isGroup: true,
                label: 'Nested',
                options: [
                  { value: 'alice', label: 'Alice' },
                  { value: 'blocked', label: 'Blocked', disabled: true },
                ],
              },
            ],
          },
        ],
      },
    })
    owners.push(owner)
    await type(owner, kind, '@')
    expect(options().map((option) => option.textContent?.trim())).toEqual(['Alice', 'Blocked'])
    const title = document.querySelector<HTMLElement>('.mp-select-group-title')!
    expect(title).toBeTruthy()
    title.click()
    await flushPromises()
    expect(owner.emitted('select')).toBeUndefined()
    options()[1].click()
    await flushPromises()
    expect(owner.emitted('select')).toBeUndefined()
    options()[0].click()
    await flushPromises()
    expect(owner.emitted('select')).toEqual([['alice']])
    expect((owner.get(kind).element as HTMLInputElement).value).toBe('@alice ')
  })
  test(`${kind} custom option receives zero and empty-string identities`, async () => {
    const renderOption = vi.fn(({ data }) => h('b', 'custom:' + String(data.value)))
    const owner = mount(Mention, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        type: kind,
        options: [
          { value: 0, label: 'Zero' },
          { value: '', label: 'Empty' },
        ],
      },
      slots: { option: renderOption },
    })
    owners.push(owner)
    await type(owner, kind, '@')
    expect(options().map((option) => option.textContent?.trim())).toEqual(['custom:0', 'custom:'])
    expect(renderOption.mock.calls.map(([scope]) => scope.data.value)).toContain(0)
    options()[0].click()
    await flushPromises()
    expect(owner.emitted('select')).toEqual([[0]])
    expect((owner.get(kind).element as HTMLInputElement).value).toBe('@0 ')
  })
  test(`${kind} inherits Form disabled and only explicit false overrides it`, async () => {
    const disabled = ref(true),
      override = ref<boolean | undefined>(undefined),
      source = vi.fn(() => ['alice'])
    const owner = mount(
      {
        render: () =>
          h(Form, { disabled: disabled.value }, () =>
            h(Mention, { editMode: 'direct', type: kind, disabled: override.value, options: source }),
          ),
      },
      { attachTo: document.body },
    )
    owners.push(owner)
    await flushPromises()
    expect((owner.get(kind).element as HTMLInputElement).disabled).toBe(true)
    expect(source).not.toHaveBeenCalled()
    override.value = false
    await flushPromises()
    expect((owner.get(kind).element as HTMLInputElement).disabled).toBe(false)
    expect(source).toHaveBeenCalledTimes(1)
    override.value = undefined
    await flushPromises()
    expect((owner.get(kind).element as HTMLInputElement).disabled).toBe(true)
    disabled.value = false
    await flushPromises()
    expect((owner.get(kind).element as HTMLInputElement).disabled).toBe(false)
  })
}
