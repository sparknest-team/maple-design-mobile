// @vitest-environment jsdom
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { provideLocaleProvider } from '../../../locale-provider/provide'
import { currentMessage } from '../../../locale/state'
import { usePickerRangeLabels } from '../range-labels'

it('updates scoped endpoint labels and falls back to legacy range labels', async () => {
  const kind = ref<'date' | 'time'>('date')
  const messages = reactive<Record<string, string>>({
    'fieldPresentation.rangeStart': 'Start',
    'fieldPresentation.rangeEnd': 'End',
    timeRangeStart: 'From time',
    timeRangeEnd: 'To time',
  })
  const Child = defineComponent({
    setup() {
      const labels = usePickerRangeLabels(() => kind.value)
      return () => h('div', labels.value.join('|'))
    },
  })
  const wrapper = mount(
    defineComponent({
      setup() {
        provideLocaleProvider({ t: (key) => messages[key] })
        return () => h(Child)
      },
    }),
  )
  try {
    expect(wrapper.text()).toBe('Start|End')
    delete messages['fieldPresentation.rangeStart']
    delete messages['fieldPresentation.rangeEnd']
    kind.value = 'time'
    await nextTick()
    expect(wrapper.text()).toBe('From time|To time')
    messages.timeRangeStart = 'New start'
    await nextTick()
    expect(wrapper.text()).toBe('New start|To time')
  } finally {
    wrapper.unmount()
  }
})

it('uses default endpoint labels when scoped and global messages are missing', () => {
  const previous = currentMessage.value
  currentMessage.value = {}
  const Child = defineComponent({
    setup() {
      const labels = usePickerRangeLabels(() => 'date')
      return () => h('div', labels.value.join('|'))
    },
  })
  const wrapper = mount(
    defineComponent({
      setup() {
        provideLocaleProvider({ t: () => undefined })
        return () => h(Child)
      },
    }),
  )
  try {
    expect(wrapper.text()).toBe('开始|结束')
  } finally {
    wrapper.unmount()
    currentMessage.value = previous
  }
})
