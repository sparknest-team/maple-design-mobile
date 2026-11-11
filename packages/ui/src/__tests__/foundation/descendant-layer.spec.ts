import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { usePopupLayer } from '../../utils/popup-layer'

test('an opt-in parent yields to its nested layer without bypassing independent layers', () => {
  const childOpen = ref(true),
    siblingOpen = ref(true)
  let parent: ReturnType<typeof usePopupLayer>,
    child: ReturnType<typeof usePopupLayer>,
    sibling: ReturnType<typeof usePopupLayer>
  const Child = defineComponent({
    setup() {
      child = usePopupLayer(() => childOpen.value, ref(1))
      return () => h('div')
    },
  })
  const Parent = defineComponent({
    setup() {
      parent = usePopupLayer(() => true, ref(2000), undefined, true)
      return () => h(Child)
    },
  })
  const Sibling = defineComponent({
    setup() {
      sibling = usePopupLayer(() => siblingOpen.value, ref(3000))
      return () => h('div')
    },
  })
  const wrapper = mount({ render: () => h('div', [h(Parent), h(Sibling)]) })
  try {
    expect(sibling!.onStackTop()).toBe(true)
    expect(child!.onStackTop()).toBe(false)
    expect(parent!.onStackTop()).toBe(false)
    siblingOpen.value = false
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    expect(child!.onStackTop(event)).toBe(true)
    childOpen.value = false
    expect(parent!.onStackTop(event)).toBe(false)
    expect(parent!.onStackTop(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('layers retain z-index ordering unless the parent opts in', () => {
  let parent: ReturnType<typeof usePopupLayer>, child: ReturnType<typeof usePopupLayer>
  const Child = defineComponent({
    setup() {
      child = usePopupLayer(() => true, ref(1))
      return () => h('div')
    },
  })
  const Parent = defineComponent({
    setup() {
      parent = usePopupLayer(() => true, ref(2000))
      return () => h(Child)
    },
  })
  const wrapper = mount(Parent)
  try {
    expect(parent!.onStackTop()).toBe(true)
    expect(child!.onStackTop()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
