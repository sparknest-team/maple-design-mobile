import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import {
  provideRangeDisabledParts,
  useRangeDisabledParts,
  useRangeFieldIndex,
} from '../../_components/picker-field/mobile-range-field-context'
import DatePanelContent from '../presentation/DatePanelContent.vue'
import { provideRangeRenderer } from '../range-renderer'

test('mobile presentation provides reactive merged locks to itself and local renderers', async () => {
  const own = ref([true, false])
  const inherited = ref([false, false])
  const Consumer = defineComponent({
    inheritAttrs: false,
    props: ['readonly'],
    setup(props) {
      const parts = useRangeDisabledParts()
      const index = useRangeFieldIndex()
      return () => h('output', JSON.stringify({ parts: parts(), index: index.value, readonly: props.readonly }))
    },
  })
  const Host = defineComponent({
    setup() {
      provideRangeDisabledParts(() => inherited.value)
      provideRangeRenderer(Consumer)
      return () =>
        h(DatePanelContent, {
          options: { disabled: own.value, type: 'date' },
          range: true,
          canConfirm: true,
          value: ['2026-09-10', '2026-09-15'],
        })
    },
  })
  const wrapper = mount(Host)
  const state = () => JSON.parse(wrapper.get('output').text())
  try {
    expect(state()).toEqual({ parts: [true, false], index: 1, readonly: false })
    own.value = [false, true]
    await wrapper.vm.$nextTick()
    expect(state()).toEqual({ parts: [false, true], index: 0, readonly: false })
    inherited.value = [true, false]
    await wrapper.vm.$nextTick()
    expect(state().parts).toEqual([true, true])
    inherited.value = [false, false]
    own.value = [false, false]
    await wrapper.vm.$nextTick()
    expect(state()).toEqual({ parts: [false, false], index: 0, readonly: false })
  } finally {
    wrapper.unmount()
  }
})
