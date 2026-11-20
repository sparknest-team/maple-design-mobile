import { h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Trigger from '..'

it('coordinates Trigger instances and preserves dynamic business descriptions', async () => {
  const first = ref<any>(),
    second = ref<any>(),
    show = ref(true)
  const external = document.createElement('button')
  external.setAttribute('aria-describedby', 'caller')
  document.body.append(external)
  const wrapper = mount(
    {
      render: () =>
        h('div', [
          show.value
            ? h(
                Trigger,
                { ref: first, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'one' } },
                { default: () => h('button', 'First'), content: () => h('span', 'First panel') },
              )
            : null,
          h(
            Trigger,
            { ref: second, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'two' } },
            { default: () => h('button', 'Second'), content: () => h('span', 'Second panel') },
          ),
        ]),
    },
    { attachTo: document.body },
  )
  const settle = async () => {
    await nextTick()
    await nextTick()
    await nextTick()
  }
  try {
    await settle()
    first.value.setReference(external)
    second.value.setReference(external)
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('caller one two')
    external.setAttribute('aria-describedby', 'business')
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('business one two')
    show.value = false
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('business two')
    wrapper.unmount()
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('business')
  } finally {
    wrapper.unmount()
    external.remove()
  }
})

it('keeps ownership when an external reference moves to a different document', async () => {
  const first = ref<any>(),
    second = ref<any>(),
    show = ref(true)
  const external = document.createElement('button')
  external.setAttribute('aria-describedby', 'caller')
  document.body.append(external)
  const wrapper = mount(
    {
      render: () =>
        h('div', [
          show.value
            ? h(
                Trigger,
                { ref: first, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'one' } },
                { default: () => h('button', 'First'), content: () => h('span', 'First panel') },
              )
            : null,
          h(
            Trigger,
            { ref: second, open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'two' } },
            { default: () => h('button', 'Second'), content: () => h('span', 'Second panel') },
          ),
        ]),
    },
    { attachTo: document.body },
  )
  const settle = async () => {
    await nextTick()
    await nextTick()
    await nextTick()
  }
  try {
    await settle()
    first.value.setReference(external)
    await settle()
    const other = document.implementation.createHTMLDocument('other')
    other.body.append(other.adoptNode(external))
    second.value.setReference(external)
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('caller one two')
    show.value = false
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('caller two')
    wrapper.unmount()
    await settle()
    expect(external.getAttribute('aria-describedby')).toBe('caller')
  } finally {
    wrapper.unmount()
    external.remove()
  }
})

it('retains a same-value description explicitly claimed by the caller', async () => {
  const target = document.createElement('button')
  target.setAttribute('aria-describedby', 'caller')
  document.body.append(target)
  const wrapper = mount(Trigger, {
    props: { open: true, popupContainer: false, referenceAttrs: { 'aria-describedby': 'auto' } },
    slots: { default: () => h('button', 'Anchor'), content: () => 'Details' },
  })
  try {
    wrapper.vm.setReference(target)
    await nextTick()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller auto')
    target.setAttribute('aria-describedby', 'caller auto')
    await nextTick()
    await nextTick()
    wrapper.unmount()
    await nextTick()
    expect(target.getAttribute('aria-describedby')).toBe('caller auto')
  } finally {
    wrapper.unmount()
    target.remove()
  }
})
