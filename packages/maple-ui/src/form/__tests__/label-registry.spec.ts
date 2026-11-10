import { computed, defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createFormLabelRegistry, provideFormLabelRegistry, useFormLabelControl } from '../label-registry'

test('moves the visible label between a sole control and the group as controls change', () => {
  const id = ref<string | undefined>('label-a')
  const registry = createFormLabelRegistry(computed(() => id.value))
  const first = registry.register()
  expect(first.label.value).toBe('label-a')
  expect(registry.groupLabel.value).toBeUndefined()
  const second = registry.register()
  expect(first.label.value).toBeUndefined()
  expect(second.label.value).toBeUndefined()
  expect(registry.groupLabel.value).toBe('label-a')
  id.value = 'label-b'
  expect(registry.groupLabel.value).toBe('label-b')
  second.unregister()
  second.unregister()
  expect(first.label.value).toBe('label-b')
  expect(second.label.value).toBeUndefined()
  id.value = undefined
  expect(first.label.value).toBeUndefined()
  first.unregister()
  expect(registry.count.value).toBe(0)
})

test('scoped registration follows component lifetime and isolates nested providers', async () => {
  const showSecond = ref(true)
  const Control = defineComponent({
    setup() {
      const label = useFormLabelControl()
      return () => h('span', { 'data-label': label?.value })
    },
  })
  const Nested = defineComponent({
    setup() {
      provideFormLabelRegistry(computed(() => 'inner'))
      return () => h('div', { id: 'nested' }, [h(Control)])
    },
  })
  const Root = defineComponent({
    setup() {
      const registry = provideFormLabelRegistry(computed(() => 'outer'))
      return () =>
        h('section', { 'data-group': registry.groupLabel.value }, [
          h(Control, { key: 'first' }),
          showSecond.value ? h(Control, { key: 'second' }) : null,
          h(Nested),
        ])
    },
  })
  const wrapper = mount(Root)
  try {
    await nextTick()
    expect(wrapper.attributes('data-group')).toBe('outer')
    expect(wrapper.get('#nested span').attributes('data-label')).toBe('inner')
    showSecond.value = false
    await nextTick()
    await nextTick()
    expect(wrapper.attributes('data-group')).toBeUndefined()
    expect(wrapper.findAll('span')[0].attributes('data-label')).toBe('outer')
  } finally {
    wrapper.unmount()
  }
})

test('defers label ownership until all initially rendered controls can register', () => {
  const ready = ref(false)
  const registry = createFormLabelRegistry(
    computed(() => 'label'),
    ready,
  )
  const first = registry.register()
  expect(first.label.value).toBeUndefined()
  const second = registry.register()
  expect(registry.groupLabel.value).toBeUndefined()
  ready.value = true
  expect(first.label.value).toBeUndefined()
  expect(second.label.value).toBeUndefined()
  expect(registry.groupLabel.value).toBe('label')
  second.unregister()
  expect(first.label.value).toBe('label')
})

test('a deactivated cached control releases its label ownership until reactivated', async () => {
  const visible = ref(true)
  const Control = defineComponent({
    setup() {
      const label = useFormLabelControl()
      return () => h('input', { 'data-label': label?.value })
    },
  })
  const Root = defineComponent({
    setup() {
      const registry = provideFormLabelRegistry(computed(() => 'shared-label'))
      return () =>
        h('section', { 'data-group': registry.groupLabel.value }, [
          h(Control, { key: 'always' }),
          h(KeepAlive, null, { default: () => (visible.value ? h(Control, { key: 'cached' }) : null) }),
        ])
    },
  })
  const wrapper = mount(Root)
  try {
    await nextTick()
    expect(wrapper.attributes('data-group')).toBe('shared-label')
    visible.value = false
    await nextTick()
    expect(wrapper.attributes('data-group')).toBeUndefined()
    expect(wrapper.get('input').attributes('data-label')).toBe('shared-label')
    visible.value = true
    await nextTick()
    expect(wrapper.attributes('data-group')).toBe('shared-label')
    expect(wrapper.findAll('input').every((input) => input.attributes('data-label') === undefined)).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
