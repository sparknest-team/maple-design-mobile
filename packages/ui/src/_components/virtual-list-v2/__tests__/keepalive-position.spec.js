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

test.each([0, 200])(
  'retains the delivered scroll offset when the listener deactivates immediately (threshold %s)',
  async (threshold) => {
    const show = ref(true)
    const rows = Array.from({ length: 100 }, (_, key) => ({ key }))
    const root = mount(
      defineComponent({
        setup: () => () =>
          h(KeepAlive, null, () =>
            show.value
              ? h(
                  VirtualList,
                  {
                    data: rows,
                    height: 100,
                    fixedSize: true,
                    estimatedSize: 20,
                    threshold,
                    onScroll: () => {
                      show.value = false
                    },
                  },
                  { item: ({ item }) => h('div', String(item.key)) },
                )
              : null,
          ),
      }),
      { attachTo: document.body },
    )
    try {
      await nextTick()
      const element = root.findComponent(VirtualList).element
      Object.defineProperties(element, {
        clientHeight: { configurable: true, value: 100 },
        offsetHeight: { configurable: true, value: 100 },
        scrollHeight: { configurable: true, value: 2000 },
      })
      element.scrollTop = 350
      element.dispatchEvent(new Event('scroll'))
      await nextTick()
      expect(show.value).toBe(false)
      element.scrollTop = 0 // Browsers may reset scroll position when a node is detached.
      show.value = true
      await nextTick()
      await nextTick()
      expect(root.findComponent(VirtualList).element).toBe(element)
      expect(element.scrollTop).toBe(350)
    } finally {
      root.unmount()
    }
  },
)

test.each([0, 200])('retains the clamped position across another cache cycle (threshold %s)', async (threshold) => {
  const f = await fixture(null, threshold)
  try {
    const original = f.data.value
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.data.value = original.slice(0, 20)
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(300)
    // Deactivate before the browser delivers an asynchronous scroll event.
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.data.value = original
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(300)
  } finally {
    f.root.unmount()
  }
})

test.each([
  ['ltr', 0],
  ['ltr', 200],
  ['rtl', 0],
  ['rtl', 200],
])(
  'retains a clamped horizontal position after another cache cycle (%s, threshold %s)',
  async (direction, threshold) => {
    const f = await fixture(null, threshold)
    let width = 300
    let left = 0
    try {
      f.element.dir = direction
      Object.defineProperties(f.element, {
        clientWidth: { configurable: true, value: 100 },
        scrollWidth: { configurable: true, get: () => width },
        scrollLeft: {
          configurable: true,
          get: () => left,
          set: (value) => {
            const logical = direction === 'rtl' ? -value : value
            const clamped = Math.max(0, Math.min(width - 100, logical))
            left = direction === 'rtl' ? -clamped : clamped
          },
        },
      })
      f.element.scrollLeft = direction === 'rtl' ? -180 : 180
      f.element.dispatchEvent(new Event('scroll'))
      f.show.value = false
      await nextTick()
      f.element.scrollLeft = 0
      width = 150
      f.show.value = true
      await nextTick()
      await nextTick()
      expect(f.element.scrollLeft).toBe(direction === 'rtl' ? -50 : 50)
      f.show.value = false
      await nextTick()
      f.element.scrollLeft = 0
      width = 300
      f.show.value = true
      await nextTick()
      await nextTick()
      expect(f.element.scrollLeft).toBe(direction === 'rtl' ? -50 : 50)
    } finally {
      f.root.unmount()
    }
  },
)

test.each([0, 200])('records a nonzero position already preserved by the browser (threshold %s)', async (threshold) => {
  const f = await fixture(null, threshold)
  try {
    const original = f.data.value
    f.show.value = false
    await nextTick()
    f.data.value = original.slice(0, 20)
    f.element.scrollTop = 300
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(300)
    f.show.value = false
    await nextTick()
    f.element.scrollTop = 0
    f.data.value = original
    f.show.value = true
    await nextTick()
    await nextTick()
    expect(f.element.scrollTop).toBe(300)
  } finally {
    f.root.unmount()
  }
})

test.each(['ltr', 'rtl'])(
  'records a nonzero horizontal position already preserved by the browser (%s)',
  async (direction) => {
    const f = await fixture()
    let width = 300
    let left = 0
    try {
      f.element.dir = direction
      Object.defineProperties(f.element, {
        clientWidth: { configurable: true, value: 100 },
        scrollWidth: { configurable: true, get: () => width },
        scrollLeft: {
          configurable: true,
          get: () => left,
          set: (value) => {
            const logical = direction === 'rtl' ? -value : value
            const clamped = Math.max(0, Math.min(width - 100, logical))
            left = direction === 'rtl' ? -clamped : clamped
          },
        },
      })
      const sign = direction === 'rtl' ? -1 : 1
      f.element.scrollLeft = 180 * sign
      f.element.dispatchEvent(new Event('scroll'))
      f.show.value = false
      await nextTick()
      width = 150
      f.element.scrollLeft = 50 * sign
      f.show.value = true
      await nextTick()
      await nextTick()
      expect(f.element.scrollLeft).toBe(50 * sign)
      f.show.value = false
      await nextTick()
      f.element.scrollLeft = 0
      width = 300
      f.show.value = true
      await nextTick()
      await nextTick()
      expect(f.element.scrollLeft).toBe(50 * sign)
    } finally {
      f.root.unmount()
    }
  },
)
