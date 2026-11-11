import { defineComponent, h, provide, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import {
  defaultSelectionPresentation,
  fieldEditorBoundary,
  provideFormPresentation,
  provideItemPresentation,
  useFieldPresentation,
  type FieldEditMode,
} from '../../_components/field-presentation/context'

const overlay = (defaultSelectionPresentation === 'direct' ? 'click' : defaultSelectionPresentation) as FieldEditMode

function fixture(boundary = false) {
  const state = reactive({
    form: undefined as FieldEditMode | undefined,
    item: undefined as FieldEditMode | undefined,
    field: undefined as FieldEditMode | undefined,
  })
  const Control = defineComponent({
    setup() {
      const { editMode } = useFieldPresentation(() => state.field, undefined, overlay)
      return () => h('output', editMode.value)
    },
  })
  const Item = defineComponent({
    setup() {
      provideItemPresentation({ editMode: () => state.item })
      return () => h(Control)
    },
  })
  const Boundary = defineComponent({
    setup() {
      if (boundary) {
        provide(fieldEditorBoundary, true)
      }
      return () => h(Item)
    },
  })
  const Root = defineComponent({
    setup() {
      provideFormPresentation(() => state.form)
      return () => h(Boundary)
    },
  })
  return { state, wrapper: mount(Root) }
}

describe('field presentation platform defaults', () => {
  test('unspecified Form and FormItem preserve the adapter fallback', () => {
    const { wrapper } = fixture()
    try {
      expect(wrapper.get('output').text()).toBe(overlay)
    } finally {
      wrapper.unmount()
    }
  })

  test('reactive priority is field > FormItem > Form > adapter', async () => {
    const { state, wrapper } = fixture()
    try {
      state.form = 'direct'
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe('direct')
      state.item = overlay
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe(overlay)
      state.field = 'direct'
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe('direct')
      state.field = undefined
      state.item = undefined
      state.form = undefined
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe(overlay)
    } finally {
      wrapper.unmount()
    }
  })

  test('nested editor boundary does not inherit or reopen the adapter overlay', async () => {
    const { state, wrapper } = fixture(true)
    try {
      state.form = overlay
      state.item = overlay
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe('direct')
      state.field = 'direct'
      await wrapper.vm.$nextTick()
      expect(wrapper.get('output').text()).toBe('direct')
    } finally {
      wrapper.unmount()
    }
  })
})
