import { defineComponent, h, KeepAlive, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Basic from '../example/demos/basic.vue'
import Custom from '../example/demos/custom-status.vue'
import ErrorDemo from '../example/demos/error.vue'

vi.mock('@maple-design/cli/client', () => ({ watchLang: (callback) => callback('zh-CN') }))

// A loader stub isolates demo request cleanup; it is not a real scroll interaction.
const Loader = defineComponent({
  props: ['status', 'target'],
  emits: ['load', 'retry', 'update:status'],
  setup: (props) => () => h('div', props.status),
})
const wrappers = []
afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
  vi.useRealTimers()
})
function create(Demo) {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const wrapper = mount(Demo, {
    global: {
      components: { MpInfiniteScroll: Loader },
      stubs: { MpList: true, MpListItem: true, MpCell: true, MpSpace: true, MpLoading: true, MpButton: true },
    },
  })
  wrappers.push(wrapper)
  return wrapper
}
async function start(wrapper) {
  const loader = wrapper.findComponent(Loader)
  loader.vm.$emit('update:status', 'loading')
  loader.vm.$emit('load')
  await flushPromises()
  expect(vi.getTimerCount()).toBe(1)
}
for (const [name, Demo] of [
  ['basic', Basic],
  ['custom', Custom],
  ['error', ErrorDemo],
]) {
  test(name + ' demo clears its pending request on unmount', async () => {
    const wrapper = create(Demo)
    await start(wrapper)
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
  test(name + ' demo cancels on deactivation and can load again', async () => {
    const enabled = ref(true)
    const Host = { setup: () => () => h(KeepAlive, null, { default: () => (enabled.value ? h(Demo) : null) }) }
    const wrapper = create(Host)
    await start(wrapper)
    enabled.value = false
    await flushPromises()
    expect(vi.getTimerCount()).toBe(0)
    vi.advanceTimersByTime(800)
    enabled.value = true
    await flushPromises()
    expect(wrapper.findComponent(Loader).props('status')).toBe('idle')
    await start(wrapper)
    vi.advanceTimersByTime(650)
    await flushPromises()
    expect(wrapper.findComponent(Loader).props('status')).toBe('idle')
    expect(vi.getTimerCount()).toBe(0)
  })
}
