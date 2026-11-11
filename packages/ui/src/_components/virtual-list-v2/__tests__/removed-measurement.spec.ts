import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { useSize } from '../hooks/use-size'

test('discard removed item measurements and ignore late measurements for removed keys', async () => {
  const keys = ref(['a', 'b'])
  let size: ReturnType<typeof useSize>
  const owner = mount(
    defineComponent({
      setup() {
        size = useSize({
          dataKeys: keys,
          contentRef: ref(),
          fixedSize: ref(false),
          estimatedSize: ref(40),
          buffer: ref(1),
        })
        return () => h('div')
      },
    }),
  )
  try {
    size!.setItemSize('a', 70)
    size!.setItemSize('b', 50)
    keys.value = ['b', 'c']
    await nextTick()
    expect(size!.hasItemSize('a')).toBe(false)
    expect(size!.hasItemSize('b')).toBe(true)
    size!.setItemSize('a', 90)
    keys.value = ['a', 'b', 'c']
    await nextTick()
    expect(size!.hasItemSize('a')).toBe(false)
    expect(size!.getScrollOffset(1)).toBe(40)
  } finally {
    owner.unmount()
  }
})
