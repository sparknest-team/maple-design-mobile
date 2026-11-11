import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Trigger from '..'
import { provideTriggerInteractionScope } from '../interaction'

const tick = async () => {
  await nextTick()
  await nextTick()
}
function fixture(controlled = false) {
  let interaction
  const showChild = ref(true)
  const wrapper = mount(
    defineComponent({
      setup() {
        const root = ref()
        interaction = provideTriggerInteractionScope(ref(true), (event) => {
          const target = event instanceof Node ? event : event.target
          return target instanceof Node && Boolean(root.value?.contains(target))
        })
        return () =>
          h('section', { ref: root }, [
            h('button', { 'data-editor': '' }, 'editor'),
            showChild.value &&
              h(Trigger, controlled ? { open: true } : { defaultOpen: true }, {
                default: () => h('button', { 'data-outer-reference': '' }, 'outer'),
                content: () =>
                  h('div', [
                    h('button', { 'data-outer-panel': '' }, 'outer panel'),
                    h(
                      Trigger,
                      { defaultOpen: true },
                      {
                        default: () => h('button', { 'data-inner-reference': '' }, 'inner'),
                        content: () => h('button', { 'data-inner-panel': '' }, 'inner panel'),
                      },
                    ),
                  ]),
              }),
          ])
      },
    }),
    { attachTo: document.body },
  )
  return { wrapper, showChild, interaction }
}

describe('Trigger editor interaction scope', () => {
  it('includes teleported descendants and closes the deepest popup first on Escape', async () => {
    const { wrapper, interaction } = fixture()
    try {
      await tick()
      const [outer, inner] = wrapper.findAllComponents(Trigger)
      expect(inner).toBeTruthy()
      const panel = document.querySelector('[data-inner-panel]')
      expect(panel).toBeTruthy()
      expect(wrapper.element.contains(panel)).toBe(false)
      expect(interaction.contains(panel)).toBe(true)
      expect(interaction.contains(wrapper.get('[data-editor]').element)).toBe(true)
      expect(interaction.contains(document.body)).toBe(false)
      expect(interaction.hasOpenPopup()).toBe(true)
      expect(interaction.escapePopup(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(true)
      await tick()
      expect(inner.emitted('update:open')).toEqual([[false]])
      expect(outer.emitted('update:open')).toBeUndefined()
      expect(interaction.hasOpenPopup()).toBe(true)
      expect(interaction.escapePopup(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(true)
      await tick()
      expect(outer.emitted('update:open')).toEqual([[false]])
      expect(interaction.hasOpenPopup()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  it('dismisses nested popups when their editor requests closure', async () => {
    const { wrapper, interaction } = fixture()
    try {
      await tick()
      const triggers = wrapper.findAllComponents(Trigger)
      interaction.dismissPopups()
      await tick()
      expect(triggers).toHaveLength(2)
      for (const trigger of triggers) {
        expect(trigger.emitted('update:open')).toEqual([[false]])
      }
      expect(interaction.hasOpenPopup()).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
  it('keeps rejected controlled popups open and unregisters removed descendants', async () => {
    const { wrapper, showChild, interaction } = fixture(true)
    try {
      await tick()
      const [outer] = wrapper.findAllComponents(Trigger)
      interaction.dismissPopups()
      await tick()
      expect(outer.emitted('update:open')).toEqual([[false]])
      expect(interaction.hasOpenPopup()).toBe(true)
      showChild.value = false
      await tick()
      expect(interaction.hasOpenPopup()).toBe(false)
      expect(interaction.escapePopup(new KeyboardEvent('keydown', { key: 'Escape' }))).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })
})
