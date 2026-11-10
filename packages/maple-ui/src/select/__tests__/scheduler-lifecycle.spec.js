import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { useSelect } from '../hooks/use-select'
import { getKeyFromValue } from '../utils'

const ticks = []
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    nextTick: (callback) => {
      if (callback) {
        ticks.push(callback)
        return Promise.resolve()
      }
      return actual.nextTick()
    },
  }
})
const owners = []
const nodes = []
const flush = async () => {
  await nextTick()
  await nextTick()
}
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  nodes.splice(0).forEach((node) => node.remove())
  ticks.length = 0
  vi.restoreAllMocks()
})
function fixture() {
  const open = ref(false)
  const options = ref(['a', 'b'])
  const active = ref(true)
  const valueKeys = ref([])
  const virtualScroll = vi.fn()
  const virtualListRef = ref({ scrollTo: virtualScroll })
  const wrapper = document.createElement('div')
  const option = document.createElement('div')
  document.body.appendChild(wrapper)
  wrapper.appendChild(option)
  nodes.push(wrapper)
  Object.defineProperties(wrapper, { scrollHeight: { value: 200 }, offsetHeight: { value: 100 } })
  vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
    top: 100,
    bottom: 200,
    left: 0,
    right: 100,
    width: 100,
    height: 100,
  })
  vi.spyOn(option, 'getBoundingClientRect').mockReturnValue({
    top: 50,
    bottom: 60,
    left: 0,
    right: 100,
    width: 100,
    height: 10,
  })
  const domScroll = vi.fn()
  Object.defineProperty(wrapper, 'scrollTo', { configurable: true, value: domScroll })
  const dropdownRef = ref({ wrapperRef: wrapper })
  const a = getKeyFromValue('a'),
    b = getKeyFromValue('b')
  const optionRefs = ref({ [a]: option, [b]: option })
  const select = vi.fn()
  const change = vi.fn()
  let api
  const Child = defineComponent({
    setup() {
      api = useSelect({
        options,
        open,
        valueKeys,
        virtualListRef,
        dropdownRef,
        optionRefs,
        onSelect: select,
        onOpenChange: change,
      })
      return () => h('div')
    },
  })
  const owner = mount(
    defineComponent({ setup: () => () => h(KeepAlive, null, () => (active.value ? h(Child) : null)) }),
  )
  owners.push(owner)
  const key = (name) => api.handleKeyDown(new KeyboardEvent('keydown', { key: name, cancelable: true }))
  return {
    options,
    valueKeys,
    api,
    open,
    active,
    owner,
    key,
    virtualScroll,
    domScroll,
    select,
    change,
    a,
    b,
    dropdownRef,
    virtualListRef,
  }
}
describe('Select interaction scheduling ownership', () => {
  test('closing during native geometry measurement prevents stale scrolling', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    const wrapper = f.dropdownRef.value.wrapperRef
    vi.mocked(wrapper.getBoundingClientRect).mockImplementation(() => {
      f.open.value = false
      return { top: 100, bottom: 200, left: 0, right: 100, width: 100, height: 100 }
    })
    f.api.scrollIntoView(f.a)
    expect(f.domScroll).not.toHaveBeenCalled()
  })

  test('current open delivers once after render and preserves native/delegated route', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    expect(f.virtualScroll).not.toHaveBeenCalled()
    ticks[0]()
    expect(f.virtualScroll).toHaveBeenCalledWith({ key: f.a })
    expect(f.domScroll).toHaveBeenCalledTimes(1)
  })
  test('close invalidates queued open scroll', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.open.value = false
    await flush()
    ticks[0]()
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test('old open cannot act after close and reopen', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    const old = ticks[0]
    f.open.value = false
    await flush()
    f.open.value = true
    await flush()
    old()
    expect(f.virtualScroll).not.toHaveBeenCalled()
    ticks[1]()
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
  })
  test('consumed open callback cannot replay', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    ticks[0]()
    ticks[0]()
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
  })
  test('unmount invalidates queued scroll despite retained refs', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.owner.unmount()
    ticks[0]()
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test('deactivation invalidates queued scroll and retained commands', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.active.value = false
    await flush()
    ticks[0]()
    f.api.scrollIntoView(f.a)
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test('inactive keyboard handler does not select', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.active.value = false
    await flush()
    f.key('Enter')
    expect(f.select).not.toHaveBeenCalled()
  })
  test('disposed keyboard handler does not request close', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.owner.unmount()
    f.key('Escape')
    expect(f.change).not.toHaveBeenCalled()
  })
  test('active arrow navigation keeps synchronous scroll', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.key('ArrowDown')
    expect(f.virtualScroll).toHaveBeenCalledWith({ key: f.b })
  })
  test('arrow command supersedes queued open scroll', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.key('ArrowDown')
    ticks[0]()
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
  })
  test('virtual scroll reentrant close prevents subsequent DOM write', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    f.virtualScroll.mockImplementation(() => {
      f.open.value = false
    })
    f.api.scrollIntoView(f.a)
    expect(f.domScroll).not.toHaveBeenCalled()
  })
  test('activation allows fresh keyboard command without replaying old open', async () => {
    const f = fixture()
    f.open.value = true
    await flush()
    const old = ticks[0]
    f.active.value = false
    await flush()
    f.active.value = true
    await flush()
    old()
    expect(f.virtualScroll).not.toHaveBeenCalled()
    f.key('ArrowDown')
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
  })
  test('late dropdown registration still receives current open scroll', async () => {
    const f = fixture()
    const dropdown = f.dropdownRef.value
    f.dropdownRef.value = undefined
    f.open.value = true
    await flush()
    f.dropdownRef.value = dropdown
    ticks[0]()
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
    expect(f.domScroll).toHaveBeenCalledTimes(1)
  })
  test('initial selection is positioned when its option arrives', async () => {
    const f = fixture()
    f.options.value = []
    f.valueKeys.value = [f.b]
    await flush()
    f.open.value = true
    await flush()
    ticks[0]()
    f.options.value = ['a', 'b']
    await flush()
    ticks[ticks.length - 1]()
    ticks[ticks.length - 1]()
    expect(f.api.activeKey.value).toBe(f.b)
    expect(f.virtualScroll).toHaveBeenCalledWith({ key: f.b })
    expect(f.virtualScroll).toHaveBeenCalledTimes(1)
  })
  test.each(['keyboard', 'scroll', 'close'])('%s cancels deferred initial selection', async (interaction) => {
    const f = fixture()
    f.options.value = ['a']
    f.valueKeys.value = [f.b]
    await flush()
    f.open.value = true
    await flush()
    ticks[0]()
    f.virtualScroll.mockClear()
    if (interaction === 'keyboard') {
      f.key('ArrowDown')
    }
    if (interaction === 'scroll') {
      f.api.cancelPendingInitialScroll()
    }
    if (interaction === 'close') {
      f.open.value = false
    }
    f.virtualScroll.mockClear()
    f.options.value = ['a', 'b']
    await flush()
    ticks.slice(1).forEach((tick) => tick())
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test.each(['keyboard', 'scroll', 'close'])('%s cancels a queued deferred selection', async (interaction) => {
    const f = fixture()
    f.options.value = []
    f.valueKeys.value = [f.b]
    await flush()
    f.open.value = true
    await flush()
    ticks[0]()
    f.options.value = ['a', 'b']
    await flush()
    const queued = ticks[ticks.length - 1]
    if (interaction === 'keyboard') {
      f.key('ArrowDown')
    }
    if (interaction === 'scroll') {
      f.api.cancelPendingInitialScroll()
    }
    if (interaction === 'close') {
      f.open.value = false
    }
    f.virtualScroll.mockClear()
    queued()
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test.each(['complete', 'keyboard', 'scroll', 'close', 'deactivate'])('group correction: %s', async (interaction) => {
    const f = fixture()
    f.options.value = [{ isGroup: true, label: 'Group', options: ['a', 'b'] }]
    f.valueKeys.value = [f.b]
    const viewport = f.dropdownRef.value.wrapperRef
    Object.defineProperty(viewport, 'clientHeight', { configurable: true, value: 100 })
    Object.assign(f.virtualListRef.value, { containerRef: viewport })
    await flush()
    f.open.value = true
    await flush()
    ticks[0]()
    ticks[ticks.length - 1]()
    expect(f.virtualScroll).toHaveBeenCalledWith({ index: 0 })
    const correction = ticks[ticks.length - 1]
    if (interaction === 'keyboard') {
      f.key('ArrowDown')
    }
    if (interaction === 'scroll') {
      f.api.cancelPendingInitialScroll()
    }
    if (interaction === 'close') {
      f.open.value = false
    }
    if (interaction === 'deactivate') {
      f.active.value = false
      await flush()
    }
    f.virtualScroll.mockClear()
    correction()
    if (interaction === 'complete') {
      expect(f.virtualScroll).toHaveBeenCalledWith(-50)
    } else {
      expect(f.virtualScroll).not.toHaveBeenCalled()
    }
  })
  test.each(['keyboard', 'scroll', 'close'])('%s cancels a queued group scroll', async (interaction) => {
    const f = fixture()
    f.options.value = [{ isGroup: true, label: 'Group', options: ['a', 'b'] }]
    f.valueKeys.value = [f.b]
    await flush()
    f.open.value = true
    await flush()
    ticks[0]()
    const queued = ticks[ticks.length - 1]
    if (interaction === 'keyboard') {
      f.key('ArrowDown')
    }
    if (interaction === 'scroll') {
      f.api.cancelPendingInitialScroll()
    }
    if (interaction === 'close') {
      f.open.value = false
    }
    f.virtualScroll.mockClear()
    queued()
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
  test('custom virtual keys scroll the selected option by its data position', async () => {
    const f = fixture()
    Object.assign(f.virtualListRef.value, { itemKey: () => 'custom', data: [{ key: f.a }, { key: f.b }] })
    f.valueKeys.value = [f.b]
    f.open.value = true
    await flush()
    ticks[0]()
    expect(f.virtualScroll).toHaveBeenCalledWith({ index: 1 })
  })
  test('empty open callback is consumed even before options arrive', async () => {
    const f = fixture()
    f.options.value = []
    await flush()
    f.open.value = true
    await flush()
    const old = ticks[0]
    old()
    f.options.value = ['a']
    await flush()
    old()
    expect(f.virtualScroll).not.toHaveBeenCalled()
  })
})
