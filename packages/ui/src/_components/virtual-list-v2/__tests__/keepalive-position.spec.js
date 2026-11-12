import { defineComponent, h, KeepAlive, nextTick, onActivated, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import VirtualList from '../VirtualList.vue'

async function fixture(newCommand = null, threshold = 0) {
  const show = ref(true),
    data = ref(Array.from({ length: 100 }, (_, key) => ({ key })))
  let activated = 0
  const Child = defineComponent({
    setup() {
      const list = ref()
      onActivated(() => {
        if (++activated > 1 && newCommand !== null) {
          list.value?.scrollTo(newCommand)
        }
      })
      return () =>
        h(
          VirtualList,
          { ref: list, data: data.value, height: 100, fixedSize: true, estimatedSize: 20, buffer: 2, threshold },
          { item: ({ item }) => h('div', String(item.key)) },
        )
    },
  })
  const root = mount(defineComponent({ setup: () => () => h(KeepAlive, null, () => (show.value ? h(Child) : null)) }), {
    attachTo: document.body,
  })
  await nextTick()
  const virtual = root.findComponent(VirtualList)
  const refList = virtual.vm
  const element = virtual.element
  let position = 0
  Object.defineProperties(element, {
    scrollTop: {
      configurable: true,
      get: () => position,
      set: (value) => {
        position = Math.max(0, Math.min(value, Math.max(0, data.value.length * 20 - 100)))
      },
    },
    clientHeight: { configurable: true, value: 100 },
    offsetHeight: { configurable: true, value: 100 },
    scrollHeight: { configurable: true, get: () => data.value.length * 20 },
  })
  refList.scrollTo(700)
  return { root, show, data, element, refList }
}

test('restores saved offset after deactivation', async () => {
  const f = await fixture()
  try {
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(700)
  } finally {
    f.root.unmount()
  }
})
test('does not override a new activation command', async () => {
  const f = await fixture(300)
  try {
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(300)
  } finally {
    f.root.unmount()
  }
})
test('does not restore beyond reduced content', async () => {
  const f = await fixture()
  try {
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.data.value = f.data.value.slice(0, 5)
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(0)
  } finally {
    f.root.unmount()
  }
})

test('a new activation command to zero cancels restoration', async () => {
  const f = await fixture(0)
  try {
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(0)
  } finally {
    f.root.unmount()
  }
})

test('retains an immediate numeric command when virtualization is disabled', async () => {
  const f = await fixture(null, 100)
  try {
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(700)
  } finally {
    f.root.unmount()
  }
})
