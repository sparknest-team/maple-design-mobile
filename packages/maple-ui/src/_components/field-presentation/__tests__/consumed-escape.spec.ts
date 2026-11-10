import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Input from '../../../input'
import EditorPanel from '../EditorPanel.vue'
import FieldPresentation from '../FieldPresentation.vue'

test.each(['prevent', 'stop'] as const)('a child can %s Escape before the editor cancels', async (handling) => {
  const onEscape = vi.fn((event: KeyboardEvent) => {
    if (event.key !== 'Escape') {
      return
    }
    if (handling === 'prevent') {
      event.preventDefault()
    } else {
      event.stopPropagation()
    }
  })
  const owner = mount(Input, {
    attachTo: document.body,
    props: { editMode: 'popup', popupContainer: false },
    slots: { suffix: () => h('button', { type: 'button', 'data-test': 'custom', onKeydown: onEscape }, 'Custom') },
  })
  try {
    await owner.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    const panel = owner.getComponent(EditorPanel)
    await panel.get('[data-test=custom]').trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(onEscape).toHaveBeenCalledTimes(1)
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
    await panel.get('input').trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
  } finally {
    owner.unmount()
  }
})
