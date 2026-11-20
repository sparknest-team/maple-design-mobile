import VirtualList from '../../_components/virtual-list-v2'
import { createApp, createSSRApp, h, nextTick } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { InputGroup } from '../../input'
import { formHost } from '../../input-number/__tests__/form-host'
import { AutoComplete } from '../index'
import type { AutoCompleteInstance, AutoCompleteOptionInfo } from '../index'

// Public interaction coverage is copied independently into Cedar.

const wrappers: any[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

const mountAutoComplete = (mountOptions: Record<string, any> = {}) => {
  const wrapper = mount(AutoComplete, {
    attachTo: document.body,
    ...mountOptions,
    props: { editMode: 'direct', shouldOpen: () => true, ...(mountOptions.props ?? {}) },
  } as any)
  wrappers.push(wrapper)
  return wrapper
}

const getOptions = (input: { attributes: (key: string) => string | undefined }) => {
  const listbox = document.getElementById(input.attributes('aria-controls') ?? '')
  return Array.from(listbox?.querySelectorAll('[role="option"]') ?? []).map((element) => new DOMWrapper(element))
}

const options = [
  { value: 1, label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

describe('AutoComplete', () => {
  test('keeps inline suggestions below their input and reanchors when the page scrolls', async () => {
    let top = 700
    const original = HTMLElement.prototype.getBoundingClientRect
    const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.matches('.mp-auto-complete')) {
        return { x: 40, y: top, top, bottom: top + 48, left: 40, right: 320, width: 280, height: 48, toJSON() {} }
      }
      if (this.matches('.mp-trigger__popup')) {
        return { x: 0, y: 0, top: 0, bottom: 200, left: 0, right: 280, width: 280, height: 200, toJSON() {} }
      }
      return original.call(this)
    })
    const wrapper = mountAutoComplete({ props: { options } })
    try {
      await wrapper.get('input').trigger('focus')
      await flushPromises()
      const popup = document.querySelector('.mp-auto-complete__dropdown')!.closest('.mp-trigger__popup') as HTMLElement
      expect(popup.style.top).toBe('752px')
      expect(popup.style.left).toBe('40px')
      expect(popup.style.width).toBe('280px')
      top = 300
      window.dispatchEvent(new Event('scroll'))
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))
      await nextTick()
      expect(popup.style.top).toBe('352px')
      expect(wrapper.get('input').attributes('aria-expanded')).toBe('true')
    } finally {
      wrapper.unmount()
      geometry.mockRestore()
    }
  })

  test('trimmed input update still produces one normalized search', async () => {
    const wrapper = mountAutoComplete({ attrs: { modelModifiers: { trim: true } }, props: { options: ['Alpha'] } })
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await input.setValue(' Alpha ')
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe(' Alpha ')
    expect(wrapper.emitted('update:modelValue')).toEqual([['Alpha']])
    expect(wrapper.emitted('search')?.map((args: any[]) => args[0])).toEqual(['Alpha'])
  })
  test('external controlled update while focused resets commit baseline', async () => {
    const wrapper = mountAutoComplete({ props: { modelValue: 'Alpha', options: ['Alpha'], filterOption: false } })
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await wrapper.setProps({ modelValue: 'Beta' })
    await getOptions(input)[0].trigger('click')
    expect(wrapper.emitted('change')?.map((args: any[]) => args[0])).toEqual(['Alpha'])
  })

  test('rejected controlled clear remains a new request each time', async () => {
    const wrapper = mountAutoComplete({ props: { modelValue: 'Alpha', clearable: true, options: ['Alpha'] } })
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    await wrapper.get('.mp-field-decorator__clear-btn').trigger('click')
    expect(wrapper.emitted('change')?.map((args: any[]) => args[0])).toEqual(['', ''])
    expect(wrapper.emitted('update:modelValue')).toEqual([[''], ['']])
    expect((input.element as HTMLInputElement).value).toBe('Alpha')
    expect(wrapper.emitted('search')).toBeUndefined()
  })
  test('keyboard-focused clear button does not reopen dropdown when input regains focus', async () => {
    const wrapper = mountAutoComplete({
      props: { defaultValue: 'Alpha', clearable: true, options: ['Alpha', 'Beta'], filterOption: false },
    })
    const input = wrapper.get('input.mp-input__inner')
    const clear = wrapper.get('.mp-field-decorator__clear-btn')
    ;(clear.element as HTMLButtonElement).focus()
    await clear.trigger('click')
    await nextTick()
    expect(document.activeElement).toBe(input.element)
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(wrapper.emitted('search')).toBeUndefined()
  })
  test('rejected repeated selection still emits each change proposal', async () => {
    const wrapper = mountAutoComplete({ props: { modelValue: 'Alpha', options: ['Beta'], filterOption: false } })
    const input = wrapper.get('input.mp-input__inner')
    for (let attempt = 0; attempt < 2; attempt++) {
      await input.trigger('focus')
      await nextTick()
      await getOptions(input)[0].trigger('click')
    }
    expect(wrapper.emitted('change')?.map((args: any[]) => args[0])).toEqual(['Beta', 'Beta'])
    expect(wrapper.emitted('update:modelValue')).toEqual([['Beta'], ['Beta']])
    expect((input.element as HTMLInputElement).value).toBe('Alpha')
  })
  test('Enter option selection notifies Form once without committing stale query', async () => {
    const changes: Event[] = []
    const wrapper = mount(
      formHost({}, { onChange: (event: Event) => changes.push(event) }, () =>
        h(AutoComplete, { editMode: 'direct', options: ['Alpha'], shouldOpen: () => true }),
      ),
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await input.setValue('Al')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    expect(changes).toHaveLength(1)
    expect(
      wrapper
        .findComponent(AutoComplete)
        .emitted('change')
        ?.map((args: any[]) => args[0]),
    ).toEqual(['Alpha'])
  })

  test('base markup snapshot', () => {
    expect(mountAutoComplete().html()).toMatchSnapshot()
  })
  test('renders shared defaults and editable combobox semantics', () => {
    const wrapper = mountAutoComplete({
      props: { options, inputAttrs: { 'aria-label': 'City' } },
    })
    const input = wrapper.get('input.mp-input__inner')

    expect(wrapper.find('.mp-field-decorator--variant-outline').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    expect(input.attributes()).toMatchObject({
      role: 'combobox',
      'aria-label': 'City',
      'aria-autocomplete': 'list',
      'aria-expanded': 'false',
      autocomplete: 'off',
    })
    expect(input.attributes('aria-controls')).toBeUndefined()
  })

  test('only references the listbox while suggestions are expanded', async () => {
    const wrapper = mountAutoComplete({ props: { options, filterOption: false } })
    const input = wrapper.get('input.mp-input__inner')
    expect(input.attributes('aria-controls')).toBeUndefined()
    await input.trigger('focus')
    await flushPromises()
    const id = input.attributes('aria-controls')
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(id).toBeTruthy()
    expect(document.getElementById(id!)?.getAttribute('role')).toBe('listbox')
    await input.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-controls')).toBeUndefined()
  })

  test('clears the active option reference while loading and restores it afterward', async () => {
    const wrapper = mountAutoComplete({ props: { options, filterOption: false } })
    const input = wrapper.get('input.mp-input__inner')
    await input.trigger('focus')
    await flushPromises()
    expect(document.getElementById(input.attributes('aria-activedescendant')!)).toBeTruthy()
    await wrapper.setProps({ loading: true })
    await flushPromises()
    expect(input.attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.setProps({ loading: false })
    await flushPromises()
    expect(document.getElementById(input.attributes('aria-activedescendant')!)).toBeTruthy()
  })

  test('separates live input and search from committed change', async () => {
    const order: string[] = []
    const wrapper = mountAutoComplete({
      props: {
        defaultValue: 'draft',
        options,
        'onUpdate:modelValue': () => order.push('update'),
        onInput: () => order.push('input'),
        onSearch: () => order.push('search'),
        onChange: () => order.push('change'),
      },
    })
    const input = wrapper.get('input.mp-input__inner')

    await input.trigger('focus')
    await input.setValue('Alpha')
    expect(order).toEqual(['input', 'update', 'search'])

    await input.trigger('blur')
    expect(order).toEqual(['input', 'update', 'search', 'change'])
    await input.trigger('blur')
    expect(order).toEqual(['input', 'update', 'search', 'change'])
  })

  test('opens on empty focus and applies built-in filtering', async () => {
    const wrapper = mountAutoComplete({ props: { options } })
    const input = wrapper.get('input.mp-input__inner')

    await input.trigger('focus')
    await nextTick()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(getOptions(input)).toHaveLength(3)

    await input.setValue('ALP')
    await nextTick()
    expect(getOptions(input)).toHaveLength(1)
    expect(getOptions(input)[0].text()).toContain('Alpha')
  })

  test('supports case-sensitive, disabled, and custom filtering', async () => {
    const wrapper = mountAutoComplete({
      props: { options, caseSensitive: true },
    })
    const input = wrapper.get('input.mp-input__inner')

    await input.trigger('focus')
    await input.setValue('ALP')
    await nextTick()
    expect(input.attributes('aria-expanded')).toBe('false')

    await wrapper.setProps({
      filterOption: (_value, option) => option.value === 'beta',
    })
    await nextTick()
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(getOptions(input)[0].text()).toContain('Beta')

    await wrapper.setProps({ filterOption: false })
    await nextTick()
    expect(getOptions(input)).toHaveLength(3)
  })

  test('selects a normalized value in canonical order without input side effects', async () => {
    const order: string[] = []
    const wrapper = mountAutoComplete({
      props: {
        options,
        'onUpdate:modelValue': () => order.push('update'),
        onSelect: () => order.push('select'),
        onChange: () => order.push('change'),
        onInput: () => order.push('input'),
        onSearch: () => order.push('search'),
      },
      attachTo: document.body,
    })
    const input = wrapper.get('input.mp-input__inner')
    ;(input.element as HTMLInputElement).focus()
    await nextTick()

    await getOptions(input)[0].trigger('click')
    await nextTick()

    expect(order).toEqual(['update', 'select', 'change'])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    expect(wrapper.emitted('select')?.[0]?.[0]).toBe('1')
    expect(wrapper.emitted('select')?.[0]?.[1]).toMatchObject({
      value: '1',
      label: 'Alpha',
      disabled: false,
    })
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  test('emits select for the same value without duplicate update or change', async () => {
    const wrapper = mountAutoComplete({
      props: { defaultValue: 'beta', options },
    })
    const input = wrapper.get('input.mp-input__inner')

    await input.trigger('focus')
    await nextTick()
    await getOptions(input)[0].trigger('click')

    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  test('clears through one input/update/change cycle without search or select', async () => {
    const wrapper = mountAutoComplete({
      props: { defaultValue: 'Alpha', options, clearable: true },
      attachTo: document.body,
    })
    const input = wrapper.get('input.mp-input__inner')
    ;(input.element as HTMLInputElement).focus()
    await nextTick()
    const clear = wrapper.get('.mp-field-decorator__clear-btn')

    await clear.trigger('mousedown')
    await clear.trigger('click')
    await nextTick()

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')?.[0]?.[0]).toBeInstanceOf(Event)
    expect(wrapper.emitted('input')).toHaveLength(1)
    expect(wrapper.emitted('input')?.[0]?.[0]).toBe('')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('search')).toBeUndefined()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  test('navigates options with input focus and keeps native Tab behavior', async () => {
    const wrapper = mountAutoComplete({
      props: { options },
      attachTo: document.body,
    })
    const input = wrapper.get('input.mp-input__inner')
    ;(input.element as HTMLInputElement).focus()
    await nextTick()

    await input.trigger('keydown', { key: 'ArrowDown' })
    const activeId = input.attributes('aria-activedescendant')
    expect(activeId).toBeTruthy()
    const activeOption = getOptions(input).find((option) => option.attributes('id') === activeId)
    expect(activeOption?.attributes('aria-selected')).toBe('true')

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    input.element.dispatchEvent(tabEvent)
    await nextTick()
    expect(tabEvent.defaultPrevented).toBe(false)
    expect(input.attributes('aria-expanded')).toBe('false')

    await input.trigger('blur')
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'Escape' })
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(input.element)
    wrapper.unmount()
  })

  test('blocks popup and editing actions while readonly', async () => {
    const onSearch = vi.fn()
    const wrapper = mountAutoComplete({
      props: {
        defaultValue: 'Alpha',
        options,
        readonly: true,
        clearable: true,
        onSearch,
      },
    })
    const input = wrapper.get('input.mp-input__inner')

    expect(input.attributes('readonly')).toBeDefined()
    expect(wrapper.find('.mp-field-decorator__clear-btn').exists()).toBe(false)
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(onSearch).not.toHaveBeenCalled()
  })

  test('provides normalized option data and footer slots', async () => {
    const wrapper = mountAutoComplete({
      props: { options },
      slots: {
        option: ({ data }: { data: AutoCompleteOptionInfo }) => `${data.label}:${data.value}`,
        footer: () => 'Footer',
      },
    })

    await wrapper.get('input.mp-input__inner').trigger('focus')
    await nextTick()
    expect(getOptions(wrapper.get('input.mp-input__inner'))[0].text()).toContain('Alpha:1')
    expect(document.body.textContent).toContain('Footer')
  })

  test('exposes focus and blur methods', async () => {
    const wrapper = mountAutoComplete({ attachTo: document.body })
    const input = wrapper.get('input.mp-input__inner')

    ;(wrapper.vm as unknown as AutoCompleteInstance).focus()
    await nextTick()
    expect(document.activeElement).toBe(input.element)

    ;(wrapper.vm as unknown as AutoCompleteInstance).blur()
    await nextTick()
    expect(document.activeElement).not.toBe(input.element)
    wrapper.unmount()
  })
})

describe('aligned autocomplete boundaries', () => {
  test('installs with public aliases', () => {
    expect(createApp({}).use(AutoComplete).component(AutoComplete.name!)).toBeTruthy()
  })
  test('opening and filtering stay independent after prop changes', async () => {
    const wrapper = mountAutoComplete({ props: { options, defaultValue: 'a', shouldOpen: () => false } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(input.attributes('aria-expanded')).toBe('false')
    await wrapper.setProps({ shouldOpen: () => true, filterOption: () => false })
    expect(input.attributes('aria-expanded')).toBe('false')
    await wrapper.setProps({ filterOption: false })
    expect(input.attributes('aria-expanded')).toBe('true')
    expect(getOptions(input)).toHaveLength(3)
  })
  test('renders groups and uses mapped labels for case-sensitive filtering', async () => {
    const wrapper = mountAutoComplete({
      props: {
        options: [
          {
            isGroup: true,
            label: 'Devices',
            options: [
              { id: 1, title: 'Alpha' },
              { id: 2, title: 'alpha' },
            ],
          },
        ],
        fieldNames: { value: 'id', label: 'title' },
        caseSensitive: true,
        defaultValue: 'A',
      },
    })
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(getOptions(input)).toHaveLength(1)
    expect(getOptions(input)[0].text()).toBe('Alpha')
    await getOptions(input)[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['1'])
  })
  test('selection uses Input length normalization and retains raw option metadata', async () => {
    const wrapper = mountAutoComplete({ props: { options: ['abcdef'], maxLength: 3 } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await getOptions(input)[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['abc'])
    expect(wrapper.emitted('select')?.at(-1)?.[1]).toMatchObject({ value: 'abcdef' })
  })
  test('custom wordSlice applies to selected suggestions', async () => {
    const wrapper = mountAutoComplete({
      props: {
        options: ['abcdef'],
        maxLength: 2,
        wordSlice: (text: string, length: number) => text.slice(-length),
      },
    })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await getOptions(input)[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['ef'])
  })
  test('async options update the open list without overwriting free text', async () => {
    const wrapper = mountAutoComplete({ props: { defaultValue: 'a', options: [] } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await wrapper.setProps({ options })
    expect(getOptions(input)).toHaveLength(3)
    expect(input.element.value).toBe('a')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
  test('trigger props cannot bypass readonly or opening policy', async () => {
    const wrapper = mountAutoComplete({
      props: { options, readonly: true, triggerProps: { open: true, disabled: false } },
    })
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(getOptions(input)).toHaveLength(0)
  })
  test('updates root class and input attrs reactively', async () => {
    const wrapper = mountAutoComplete({ attrs: { class: 'first' } })
    await wrapper.setProps({ class: 'second', inputAttrs: { 'aria-label': 'Changed' } })
    expect(wrapper.find('.second').exists()).toBe(true)
    expect(wrapper.get('input').attributes('aria-label')).toBe('Changed')
  })
  test('inherits group state while explicit false overrides it', async () => {
    const wrapper = mount(InputGroup, {
      props: { editMode: 'direct', readonly: true, size: 'lg', variant: 'standard' },
      slots: {
        default: () => h(AutoComplete, { editMode: 'direct', options, shouldOpen: () => true }),
      },
    })
    wrappers.push(wrapper)
    expect(wrapper.get('input').attributes('readonly')).toBeDefined()
    expect(wrapper.find('.mp-field-decorator--size-lg').exists()).toBe(true)
    expect(wrapper.find('.mp-field-decorator--variant-standard').exists()).toBe(true)
    await wrapper.get('input').trigger('focus')
    expect(wrapper.get('input').attributes('aria-expanded')).toBe('false')
  })
  test.each(['xs', 'sm', 'md', 'lg', 'xl'])('supports size %s', (size) => {
    expect(
      mountAutoComplete({ props: { size } })
        .find('.mp-field-decorator--size-' + size)
        .exists(),
    ).toBe(true)
  })
  test.each(['filled', 'outline', 'standard'])('supports variant %s', (variant) => {
    expect(
      mountAutoComplete({ props: { variant } })
        .find('.mp-field-decorator--variant-' + variant)
        .exists(),
    ).toBe(true)
  })
  test('forwards hint, border, keyboard and color settings', () => {
    const wrapper = mountAutoComplete({
      props: {
        hint: true,
        line: false,
        placeholder: 'Device',
        enterkeyhint: 'search',
        textColor: 'red',
        focusColor: 'blue',
        blurColor: 'green',
      },
    })
    expect(wrapper.get('input').attributes('enterkeyhint')).toBe('search')
    expect(wrapper.html()).toContain('Device')
    expect(wrapper.html()).toContain('red')
    expect(wrapper.html()).toContain('blue')
    expect(wrapper.html()).toContain('green')
  })
  test('SSR uses deterministic per-app IDs', async () => {
    const render = () =>
      renderToString(
        createSSRApp({ render: () => h(AutoComplete, { editMode: 'direct', defaultValue: 'a', options }) }),
      )
    expect(await render()).toBe(await render())
  })
  test('SSR does not require browser globals', async () => {
    const originalWindow = window
    const originalDocument = document
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('document', undefined)
    try {
      const html = await renderToString(
        createSSRApp({ render: () => h(AutoComplete, { editMode: 'direct', defaultValue: 'server' }) }),
      )
      expect(html).toContain('server')
      expect(html).toContain('combobox')
    } finally {
      vi.stubGlobal('window', originalWindow)
      vi.stubGlobal('document', originalDocument)
    }
  })
})

describe('input boundaries', () => {
  test('does not publish intermediate composition text', async () => {
    const wrapper = mountAutoComplete()
    const input = wrapper.get('input')
    await input.trigger('compositionstart')
    await input.setValue('拼')
    expect(wrapper.emitted('search')).toBeUndefined()
    await input.trigger('compositionend')
    expect(wrapper.emitted('search')).toHaveLength(1)
  })
  test('controlled updates replace displayed text without publishing', async () => {
    const wrapper = mountAutoComplete({ props: { modelValue: 'first' } })
    await wrapper.setProps({ modelValue: 'second' })
    expect(wrapper.get('input').element.value).toBe('second')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
  test('explicit false overrides inherited readonly', () => {
    const wrapper = mount(InputGroup, {
      props: { editMode: 'direct', readonly: true },
      slots: {
        default: () => h(AutoComplete, { editMode: 'direct', readonly: false }),
      },
    })
    wrappers.push(wrapper)
    expect(wrapper.get('input').attributes('readonly')).toBeUndefined()
  })
  test('disabled suggestions cannot select or change', async () => {
    const wrapper = mountAutoComplete({ props: { options, filterOption: false } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await getOptions(input)[2].trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })
  test('renders rich candidate content through render', async () => {
    const wrapper = mountAutoComplete({
      props: { options: [{ value: 'rich', label: 'Rich', render: () => h('strong', 'Rich candidate') }] },
    })
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(getOptions(input)[0].text()).toBe('Rich candidate')
  })
  test.each([false, true])('forwards scroll events at the visible bottom with virtual=%s', async (virtual) => {
    const wrapper = mountAutoComplete({ props: { options, virtualListProps: virtual ? { height: 180 } : undefined } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await nextTick()
    const viewport = virtual
      ? wrapper.getComponent(VirtualList).element
      : getOptions(input)[0].element.closest('ul')!.parentElement!
    Object.defineProperties(viewport, {
      scrollHeight: { configurable: true, value: 200 },
      clientHeight: { configurable: true, value: 100 },
      offsetHeight: { configurable: true, value: 110 },
    })
    viewport.scrollTop = 90
    const near = new Event('scroll')
    viewport.dispatchEvent(near)
    expect(wrapper.emitted('dropdown-scroll')).toEqual([[near]])
    expect(wrapper.emitted('dropdown-reach-bottom')).toBeUndefined()
    viewport.scrollTop = 100
    const bottom = new Event('scroll')
    viewport.dispatchEvent(bottom)
    expect(wrapper.emitted('dropdown-scroll')).toEqual([[near], [bottom]])
    expect(wrapper.emitted('dropdown-reach-bottom')).toEqual([[bottom]])
  })
  test('virtual suggestions remain selectable', async () => {
    const wrapper = mountAutoComplete({ props: { options, virtualListProps: { height: 180 } } })
    const input = wrapper.get('input')
    await input.trigger('focus')
    await nextTick()
    expect(getOptions(input).length).toBeGreaterThan(0)
    await getOptions(input)[0].trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
  })
})

test('uses caseSensitive with no strict compatibility prop', () => {
  expect('caseSensitive' in AutoComplete.props).toBe(true)
  expect('strict' in AutoComplete.props).toBe(false)
})

test('AutoComplete searchFields matches value or label using standard configuration', async () => {
  const wrapper = mountAutoComplete({
    props: { options: [{ value: 'USER_A', label: 'Apple' }], searchFields: ['value', 'label'] },
  })
  const input = wrapper.get('input.mp-input__inner')
  await input.trigger('focus')
  await input.setValue('user')
  await nextTick()
  expect(getOptions(input).map((option) => option.text())).toEqual(['Apple'])
  await input.setValue('apple')
  await nextTick()
  expect(getOptions(input).map((option) => option.text())).toEqual(['Apple'])
})
