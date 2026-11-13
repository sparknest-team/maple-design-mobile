import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { useSize } from '../hooks/use-size'

test('retains zero-height items at the exact viewport end until they can be measured again', async () => {
  let size
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: ref([0, 1, 2, 3]),
          contentRef: ref(),
          fixedSize: ref(false),
          estimatedSize: ref(20),
          buffer: ref(0),
          viewportHeight: ref(20),
          scrollOffset: ref(0),
        })
        return () => h('div')
      },
    }),
  )
  try {
    size.setItemSize(1, 0, true)
    size.setItemSize(2, 0, true)
    await nextTick()
    expect(size.end.value).toBe(3)
    size.setItemSize(1, 10)
    await nextTick()
    expect(size.end.value).toBe(1)
  } finally {
    owner.unmount()
  }
})
