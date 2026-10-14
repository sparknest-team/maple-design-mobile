import { defineComponent, h, KeepAlive, nextTick, reactive } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Col from '../../col'
import Input from '../../input'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'
import { useFormItemLayout } from '../use-form-item-layout'
import { useFormLabelWidths } from '../use-form-label-width'

const originalResizeObserver = globalThis.ResizeObserver

afterEach(() => {
  vi.restoreAllMocks()
  vi.stubGlobal('ResizeObserver', originalResizeObserver)
})

describe('Form layout contract', () => {
  it('resolves overrides, numeric zero flex and auto width without mutating Col options', () => {
    const parent = reactive({
      layout: 'horizontal' as const,
      autoLabelWidth: true,
      maxLabelWidth: 90,
      labelColProps: { span: 6, md: 8 },
      wrapperColProps: { span: 18 },
      labelColStyle: { color: 'red' },
      labelAlign: 'left' as const,
    })
    const item = reactive<{ labelColFlex?: number; layout?: 'vertical'; hideLabel?: boolean }>({})
    const layout = useFormItemLayout(
      () => item,
      () => parent,
    )
    expect(layout.labelCol.value).toEqual({ span: 6, md: 8, flex: '90px' })
    expect(layout.wrapperCol.value.flex).toBe('auto')
    expect(layout.measureLabel.value).toBe(true)
    item.labelColFlex = 0
    expect(layout.labelCol.value.flex).toBe(0)
    expect(layout.measureLabel.value).toBe(false)
    item.layout = 'vertical'
    expect(layout.autoLabelWidth.value).toBe(false)
    expect(layout.labelCol.value.flex).toBeUndefined()
    item.hideLabel = true
    expect(layout.wrapperCol.value).toEqual({ flex: 'auto' })
    expect(parent.labelColProps).toEqual({ span: 6, md: 8 })
  })

  it('has finite empty widths and supports zero keys, updates and independent forms', () => {
    const first = useFormLabelWidths()
    const second = useFormLabelWidths()
    expect(first.maxLabelWidth.value).toBe(0)
    first.setLabelWidth(70, 0)
    first.setLabelWidth(120, 1)
    second.setLabelWidth(40, 0)
    first.removeLabelWidth(1)
    expect(first.maxLabelWidth.value).toBe(70)
    expect(second.maxLabelWidth.value).toBe(40)
    first.setLabelWidth(NaN, 0)
    first.setLabelWidth(-1, 0)
    expect(first.maxLabelWidth.value).toBe(70)
    first.removeLabelWidth(0)
    expect(first.maxLabelWidth.value).toBe(0)
  })

  it('renders responsive Col options and supports reactive item/style overrides', async () => {
    const item = reactive({
      labelColProps: undefined as any,
      layout: undefined as any,
      labelColStyle: undefined as any,
      labelColFlex: undefined as any,
    })
    const wrapper = mount(Form, {
      props: {
        layout: 'horizontal',
        labelColProps: { span: 6, xs: 24, md: 8 },
        wrapperColProps: { span: 18, xs: 24, md: 16 },
        labelAlign: 'left',
        labelColStyle: { color: 'red' },
      },
      slots: { default: () => h(FormItem, { label: 'Name', ...item }, () => h('input')) },
    })
    const cols = () => wrapper.findAllComponents(Col)
    expect(cols()[0].props('span')).toBe(6)
    expect(
      cols()[0]
        .classes()
        .some((name) => name.endsWith('--span-xs-24')),
    ).toBe(true)
    expect(cols()[1].props('md')).toBe(16)
    expect(cols()[0].element.style.color).toBe('red')
    item.labelColProps = { span: 7 }
    item.labelColStyle = { color: 'blue' }
    item.labelColFlex = '6rem'
    await nextTick()
    expect(cols()[0].props('span')).toBe(7)
    expect(cols()[0].props('flex')).toBe('6rem')
    expect(cols()[1].props('flex')).toBe('auto')
    expect(cols()[0].element.style.color).toBe('blue')
    item.layout = 'vertical'
    await nextTick()
    expect(
      cols()[0]
        .classes()
        .some((name) => name.includes('--span-')),
    ).toBe(false)
    expect(cols()[0].element.style.flex).toBe('')
    wrapper.unmount()
  })

  it('aligns natural labels, shrinks after removal and releases observers on layout change/unmount', async () => {
    const observers: { target?: Element; callback: () => void; disconnected: boolean }[] = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        record: (typeof observers)[number]
        constructor(callback: () => void) {
          this.record = { callback, disconnected: false }
          observers.push(this.record)
        }
        observe(target: Element) {
          this.record.target = target
        }
        disconnect() {
          this.record.disconnected = true
        }
      },
    )
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
      return this.textContent?.includes('Long') ? 120 : 40
    })
    const state = reactive({ showLong: true, layout: 'horizontal', label: 'Long label' })
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(
            Form,
            { layout: state.layout as any, autoLabelWidth: true },
            {
              default: () => [
                h(FormItem, { key: 'short', label: 'Name' }, () => h('input')),
                state.showLong ? h(FormItem, { key: 'long', label: state.label }, () => h('input')) : null,
              ],
            },
          ),
      }),
    )
    await nextTick()
    await nextTick()
    const cols = () => wrapper.findAllComponents(Col)
    expect(cols()[0].props('flex')).toBe('120px')
    expect(cols()[2].props('flex')).toBe('120px')
    state.label = 'Short'
    await nextTick()
    observers.filter((record) => !record.disconnected).forEach((record) => record.callback())
    await nextTick()
    expect(cols()[0].props('flex')).toBe('40px')
    state.showLong = false
    await nextTick()
    await nextTick()
    expect(cols()).toHaveLength(2)
    expect(cols()[0].props('flex')).toBe('40px')
    state.layout = 'vertical'
    await nextTick()
    expect(observers.every((record) => record.disconnected)).toBe(true)
    state.layout = 'horizontal'
    await nextTick()
    await nextTick()
    expect(cols()[0].props('flex')).toBe('40px')
    wrapper.unmount()
    expect(observers.every((record) => record.disconnected)).toBe(true)
  })

  it('removes cached labels on deactivation and reconnects on activation', async () => {
    const observers: { disconnected: boolean }[] = []
    vi.stubGlobal(
      'ResizeObserver',
      class {
        record = { disconnected: false }
        constructor() {
          observers.push(this.record)
        }
        observe() {}
        disconnect() {
          this.record.disconnected = true
        }
      },
    )
    const state = reactive({ show: true })
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(
            KeepAlive,
            {},
            {
              default: () =>
                state.show
                  ? h(
                      Form,
                      { layout: 'horizontal', autoLabelWidth: true },
                      {
                        default: () => h(FormItem, { label: 'Name' }, () => h('input')),
                      },
                    )
                  : null,
            },
          ),
      }),
    )
    await nextTick()
    state.show = false
    await nextTick()
    expect(observers.every((record) => record.disconnected)).toBe(true)
    state.show = true
    await nextTick()
    expect(observers.some((record) => !record.disconnected)).toBe(true)
    wrapper.unmount()
    expect(observers.every((record) => record.disconnected)).toBe(true)
  })

  it('uses the resolved item layout when a vertical form contains a horizontal override', async () => {
    vi.stubGlobal('ResizeObserver', undefined)
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(80)
    const wrapper = mount(Form, {
      props: { layout: 'vertical', autoLabelWidth: true },
      slots: { default: () => h(FormItem, { label: 'Name', layout: 'horizontal' }, () => h('input')) },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAllComponents(Col)[0].props('flex')).toBe('80px')
    wrapper.unmount()
  })

  it('uses a resize fallback when ResizeObserver is unavailable and removes it', async () => {
    vi.stubGlobal('ResizeObserver', undefined)
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const wrapper = mount(Form, {
      props: { layout: 'horizontal', autoLabelWidth: true },
      slots: { default: () => h(FormItem, { label: 'Name' }, () => h('input')) },
    })
    await nextTick()
    expect(add.mock.calls.some(([event]) => event === 'resize')).toBe(true)
    wrapper.unmount()
    expect(remove.mock.calls.some(([event]) => event === 'resize')).toBe(true)
  })

  it('lets item control size override the form size', () => {
    const wrapper = mount(Form, {
      props: { layout: 'horizontal', size: 'sm' },
      slots: { default: () => h(FormItem, { label: 'Name', size: 'lg' }, () => h(Input)) },
    })
    expect(
      wrapper
        .findAll('[class*="field-decorator"]')[0]
        .classes()
        .some((name) => name.endsWith('--size-lg')),
    ).toBe(true)
    wrapper.unmount()
  })

  it('prefixes nested field containers when an explicit form id is provided', () => {
    const wrapper = mount(Form, {
      props: { id: 'profile', layout: 'horizontal' },
      slots: { default: () => h(FormItem, { field: 'users[0].name', label: 'Name' }, () => h('input')) },
    })
    expect(wrapper.get('form').attributes('id')).toBe('profile')
    expect(wrapper.findAllComponents(Col)[1].attributes('id')).toBe('profile-users_0_name')
    wrapper.unmount()
  })

  it('renders auto-width forms safely on the server', async () => {
    const html = await renderToString(
      h(
        Form,
        { layout: 'horizontal', autoLabelWidth: true },
        {
          default: () => h(FormItem, { label: 'Name' }, () => h('input')),
        },
      ),
    )
    expect(html).toContain('Name')
    expect(html).not.toContain('Infinity')
    expect(html).not.toContain('NaN')
  })
})
