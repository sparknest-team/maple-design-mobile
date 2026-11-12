import { defineComponent, h, KeepAlive, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Mention from '../mention'

const ticks: (() => void)[] = []
vi.mock('vue', async () => {
  const actual = await vi.importActual<any>('vue')
  return {
    ...actual,
    nextTick: (callback?: () => void) => {
      if (callback) {
        ticks.push(callback)
        return Promise.resolve()
      }
      return actual.nextTick()
    },
  }
})
vi.mock('../../select/hooks/use-select', async () => {
  const { computed, ref } = await vi.importActual<any>('vue')
  return {
    useSelect: (options: any) => ({
      validOptions: computed(() => []),
      optionInfoMap: new Map(),
      activeKey: ref(undefined),
      validOptionInfos: computed(() => options.options.value),
      handleKeyDown: vi.fn(),
    }),
  }
})
const Textarea = defineComponent({
  props: ['modelValue'],
  emits: ['input', 'clear', 'focus', 'blur'],
  setup(_, { expose }) {
    const textareaRef = ref<HTMLTextAreaElement>()
    const focus = vi.fn(),
      blur = vi.fn()
    expose({ textareaRef, focus, blur })
    return () => h('textarea', { ref: textareaRef })
  },
})
const Observer = defineComponent({
  emits: ['resize'],
  setup:
    (_, { slots }) =>
    () =>
      slots.default?.(),
})
const Trigger = defineComponent({
  inheritAttrs: false,
  setup:
    (_, { slots }) =>
    () =>
      slots.default?.(),
})
const owners: ReturnType<typeof mount>[] = []
const restores: (() => void)[] = []
function patch(object: object, key: string, value: PropertyDescriptor) {
  const old = Object.getOwnPropertyDescriptor(object, key)
  Object.defineProperty(object, key, { configurable: true, ...value })
  restores.push(() => {
    if (old) {
      Object.defineProperty(object, key, old)
    } else {
      Reflect.deleteProperty(object, key)
    }
  })
}
const flush = async () => {
  await nextTick()
  await nextTick()
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  restores
    .splice(0)
    .reverse()
    .forEach((restore) => restore())
  ticks.length = 0
  vi.restoreAllMocks()
})
async function fixture() {
  const active = ref(true)
  const props = reactive({ type: 'textarea' as 'input' | 'textarea', options: ['alice'], disabled: false })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Mention, props) : null)) }),
    {
      global: { stubs: { MpTextarea: Textarea, MpInput: true, MpResizeObserver: Observer, MpTrigger: Trigger } },
    },
  )
  owners.push(owner)
  await flush()
  const mention = owner.findComponent(Mention)
  const textarea = () => mention.findComponent(Textarea)
  const input = (value = '@al') => {
    const el = textarea().get('textarea').element as HTMLTextAreaElement
    el.value = value
    el.selectionStart = value.length
    textarea().vm.$emit('input', value, { target: el })
  }
  input()
  await flush()
  const mirror = mention.get('.mp-mention-measure').element as HTMLElement
  const scroll = vi.fn()
  patch(mirror, 'scrollTo', { value: scroll })
  const el = textarea().get('textarea').element as HTMLTextAreaElement
  el.scrollTop = 40
  const callback = ticks.splice(0).at(-1)!
  expect(callback).toBeTypeOf('function')
  return { owner, mention, active, props, el, mirror, scroll, callback, input, textarea }
}

describe('Mention mirror scheduler ownership', () => {
  test('current textarea relocation copies the scroll offset', async () => {
    const f = await fixture()
    f.callback()
    expect(f.scroll).toHaveBeenCalledWith(0, 40)
  })
  test('relocation callback consumes once', async () => {
    const f = await fixture()
    f.callback()
    f.callback()
    expect(f.scroll).toHaveBeenCalledTimes(1)
  })
  test('close cancels an old pending relocation', async () => {
    const f = await fixture()
    const trigger = f.mention.findComponent(Trigger)
    ;(trigger.vm.$.vnode.props!['onUpdate:open'] as (v: boolean) => void)(false)
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('deactivation rejects old relocation', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('old callback cannot cross activation', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('unmount rejects a pending relocation', async () => {
    const f = await fixture()
    f.owner.unmount()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('disable cancels pending relocation', async () => {
    const f = await fixture()
    f.props.disabled = true
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('replacement text rejects old work even while still open', async () => {
    const f = await fixture()
    f.input('@ali')
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('an open mirror follows subsequent text changes including zero origin', async () => {
    const f = await fixture()
    f.callback()
    f.scroll.mockClear()
    f.el.scrollTop = 0
    f.input('@ali')
    await flush()
    const callbacks = ticks.splice(0)
    expect(callbacks.length).toBeGreaterThan(0)
    callbacks.forEach((callback) => callback())
    expect(f.scroll).toHaveBeenCalledWith(0, 0)
  })
  test('retained input while inactive does not reopen or notify', async () => {
    const f = await fixture()
    const input = f.textarea().vm.$.vnode.props!.onInput as (v: string, e: Event) => void
    f.active.value = false
    await flush()
    const before = f.mention.emitted('search')?.length
    input('@ali', { target: f.el } as unknown as Event)
    await flush()
    expect(f.mention.emitted('search')?.length).toBe(before)
    expect(ticks).toHaveLength(0)
  })
  test('retained public focus and blur are inert while inactive', async () => {
    const f = await fixture()
    const focus = f.mention.vm.focus,
      blur = f.mention.vm.blur
    const childFocus = f.textarea().vm.$.exposed!.focus,
      childBlur = f.textarea().vm.$.exposed!.blur
    f.active.value = false
    await flush()
    focus()
    blur()
    expect(childFocus).not.toHaveBeenCalled()
    expect(childBlur).not.toHaveBeenCalled()
  })
  test('scroll getter disposal cannot commit native scroll', async () => {
    const f = await fixture()
    patch(f.el, 'scrollTop', {
      get: () => {
        f.owner.unmount()
        return 40
      },
    })
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('old observer after activation cannot read style', async () => {
    const f = await fixture()
    const resize = f.mention.findComponent(Observer).vm.$.vnode.props!.onResize as () => void
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const style = vi.spyOn(CSSStyleDeclaration.prototype, 'getPropertyValue')
    resize()
    expect(style).not.toHaveBeenCalled()
  })
  test('empty options cancel pending relocation', async () => {
    const f = await fixture()
    f.props.options = []
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('input mode cancels a previous textarea task', async () => {
    const f = await fixture()
    f.props.type = 'input'
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('clear supersedes the pending content task', async () => {
    const f = await fixture()
    f.textarea().vm.$emit('clear', new Event('click'))
    await flush()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('activation schedules fresh relocation without reviving old work', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const fresh = ticks.splice(0)
    expect(fresh.length).toBeGreaterThan(0)
    fresh.forEach((callback) => callback())
    expect(f.scroll).toHaveBeenCalledWith(0, 40)
    f.scroll.mockClear()
    f.callback()
    expect(f.scroll).not.toHaveBeenCalled()
  })
  test('inactive and disposed observer cannot read computed style', async () => {
    const f = await fixture()
    const resize = f.mention.findComponent(Observer).vm.$.vnode.props!.onResize as () => void
    f.active.value = false
    await flush()
    const style = vi.spyOn(f.el.ownerDocument.defaultView!, 'getComputedStyle')
    resize()
    f.owner.unmount()
    resize()
    expect(style).not.toHaveBeenCalled()
  })
  test('style read disposal prevents property enumeration and commit', async () => {
    const f = await fixture()
    const resize = f.mention.findComponent(Observer).vm.$.vnode.props!.onResize as () => void
    const read = vi.fn(() => '10px')
    vi.spyOn(f.el.ownerDocument.defaultView!, 'getComputedStyle').mockImplementation(() => {
      f.owner.unmount()
      return { getPropertyValue: read } as unknown as CSSStyleDeclaration
    })
    resize()
    expect(read).not.toHaveBeenCalled()
  })
  test('fresh observer after activation reads current styles', async () => {
    const f = await fixture()
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    const style = vi
      .spyOn(f.el.ownerDocument.defaultView!, 'getComputedStyle')
      .mockReturnValue({ getPropertyValue: () => '123px' } as unknown as CSSStyleDeclaration)
    ;(f.mention.findComponent(Observer).vm.$.vnode.props!.onResize as () => void)()
    await flush()
    expect(style).toHaveBeenCalled()
    expect(f.mirror.style.width).toBe('123px')
  })
  test('disposed public focus and blur remain inert', async () => {
    const f = await fixture()
    const focus = f.mention.vm.focus,
      blur = f.mention.vm.blur
    const childFocus = f.textarea().vm.$.exposed!.focus,
      childBlur = f.textarea().vm.$.exposed!.blur
    f.owner.unmount()
    focus()
    blur()
    expect(childFocus).not.toHaveBeenCalled()
    expect(childBlur).not.toHaveBeenCalled()
  })
})
