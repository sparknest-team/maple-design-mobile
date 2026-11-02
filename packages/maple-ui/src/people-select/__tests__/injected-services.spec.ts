import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import PeopleSelect, { peopleSelectProps } from '..'
import Select from '../../select'

const original = { ...peopleSelectProps }
const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  Object.assign(peopleSelectProps, original)
})
const people = [{ value: 'a', label: 'Alice', avatar: '/alice.png' }]
function setup(props: Record<string, unknown> = {}, defaults: Record<string, unknown> = {}) {
  PeopleSelect.setPropsDefaults(defaults)
  const owner = mount(PeopleSelect, { props: { editMode: 'direct', ...props } })
  owners.push(owner)
  return owner
}
test('global default functions load arrays and explicit options bypass loading', async () => {
  const request = vi.fn(async () => people)
  const owner = setup({}, { options: request })
  await flushPromises()
  expect(request).toHaveBeenCalledTimes(1)
  expect(owner.getComponent(Select).props('options')).toEqual(people)
  const explicit = setup({ options: [] })
  await flushPromises()
  expect(request).toHaveBeenCalledTimes(1)
  expect(explicit.getComponent(Select).props('options')).toEqual([])
})
test('search aborts previous requests and isolates late results', async () => {
  let release!: (value: typeof people) => void
  let oldSignal!: AbortSignal
  const request = vi.fn((query: string, { signal }: { signal: AbortSignal }) => {
    if (query === 'old') {
      oldSignal = signal
      return new Promise<typeof people>((resolve) => {
        release = resolve
      })
    }
    return Promise.resolve(query ? [{ value: query, label: query }] : [])
  })
  const owner = setup({ options: request })
  await flushPromises()
  owner.getComponent(Select).vm.$emit('search', 'old')
  await nextTick()
  owner.getComponent(Select).vm.$emit('search', 'new')
  await flushPromises()
  expect(oldSignal.aborted).toBe(true)
  release(people)
  await flushPromises()
  expect(owner.getComponent(Select).props('options')).toEqual([{ value: 'new', label: 'new' }])
})
test('business-rendered actions do not mutate selection or open the editor', async () => {
  const businessClick = vi.fn()
  const owner = setup(
    { modelValue: 'a', readPretty: true },
    {
      fallbackOption: () => people[0],
      renderActions: ({ person, disabled }: any) =>
        h('button', { disabled, onClick: () => businessClick(person.value) }, 'Message'),
    },
  )
  await flushPromises()
  expect(owner.get('img').attributes('src')).toBe('/alice.png')
  await owner.get('button').trigger('click')
  expect(businessClick).toHaveBeenCalledWith('a')
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  expect(owner.emitted('update:open')).toBeUndefined()
  expect('chat' in peopleSelectProps).toBe(true)
})
test('local request overrides defaults and exposes failures for retry', async () => {
  const globalRequest = vi.fn(async () => [])
  const request = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(people)
  const owner = setup({ options: request }, { request: globalRequest })
  await flushPromises()
  expect(owner.emitted('load-error')).toHaveLength(1)
  await (owner.vm as any).refresh()
  await flushPromises()
  expect(globalRequest).not.toHaveBeenCalled()
  expect(owner.getComponent(Select).props('options')).toEqual(people)
})
test('local renderActions overrides global rendering and receives disabled state', async () => {
  const globalRender = vi.fn(() => 'Global')
  const localRender = vi.fn(({ disabled }: any) => h('button', { disabled }, 'Local'))
  const owner = setup(
    { modelValue: 'a', isLabel: true, disabled: true, renderActions: localRender },
    { renderActions: globalRender },
  )
  await flushPromises()
  expect(owner.get('button').attributes('disabled')).toBeDefined()
  expect(globalRender).not.toHaveBeenCalled()
  expect(localRender.mock.calls.at(-1)?.[0].disabled).toBe(true)
})
test('the actions slot takes priority over the render function', async () => {
  const renderActions = vi.fn(() => 'Default')
  const owner = mount(PeopleSelect, {
    props: { modelValue: 'a', options: people, isLabel: true, renderActions },
    slots: { actions: ({ person }: any) => h('button', {}, person.label) },
  })
  owners.push(owner)
  await flushPromises()
  expect(owner.get('button').text()).toBe('Alice')
  expect(renderActions).not.toHaveBeenCalled()
})

test('an explicitly empty action renderer hides defaults without leaving an action wrapper', async () => {
  const owner = setup({ modelValue: 'a', isLabel: true, renderActions: () => null })
  await flushPromises()
  expect(owner.find('[class$="__actions"]').exists()).toBe(false)
})

test('built-in call/chat icons use global callbacks, local overrides and Promise loading without opening the field', async () => {
  let release!: () => void
  const globalChat = vi.fn()
  const chat = vi.fn(
    () =>
      new Promise<void>((resolve) => {
        release = resolve
      }),
  )
  const call = vi.fn()
  const owner = setup(
    { modelValue: 'a', options: people, readPretty: true, chat },
    { showPhone: true, showChat: true, call, chat: globalChat },
  )
  await flushPromises()
  await owner.get('button[aria-label="Call"]').trigger('click')
  await flushPromises()
  expect(call).toHaveBeenCalledWith(people[0])
  await owner.get('button[aria-label="Chat"]').trigger('click')
  expect(chat).toHaveBeenCalledTimes(1)
  expect(globalChat).not.toHaveBeenCalled()
  expect(owner.get('button[aria-label="Chat"]').attributes('aria-busy')).toBe('true')
  release()
  await flushPromises()
  expect(owner.emitted('update:open')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
  await owner.setProps({ showChat: false })
  expect(owner.find('button[aria-label="Chat"]').exists()).toBe(false)
})

test('reactive fallback updates read and edit labels/avatars without inserting candidates or changing the model', async () => {
  const { ref } = await import('vue')
  const displayed = ref<Record<string, (typeof people)[number]>>({})
  const fallbackOption = (id: string) => displayed.value[id] ?? { value: id, label: id }
  const reader = setup({ modelValue: 'a', readPretty: true, options: [], fallbackOption })
  expect(reader.text()).toContain('a')
  displayed.value.a = people[0]
  await flushPromises()
  expect(reader.text()).toContain('Alice')
  expect(reader.get('img').attributes('src')).toBe('/alice.png')
  const editor = setup({ modelValue: 'a', options: [], fallbackOption })
  await flushPromises()
  expect(editor.text()).toContain('Alice')
  expect(editor.getComponent(Select).props('options')).toEqual([])
  displayed.value.a = { ...people[0], label: 'Updated', avatar: '/new.png' }
  await flushPromises()
  expect(reader.text()).toContain('Updated')
  expect(editor.text()).toContain('Updated')
  expect(reader.get('img').attributes('src')).toBe('/new.png')
  expect(reader.emitted('update:modelValue')).toBeUndefined()
  expect(editor.emitted('update:modelValue')).toBeUndefined()
  expect('resolve' in peopleSelectProps).toBe(false)
})
