import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Input from '../../../input'
import EditorPanel from '../EditorPanel.vue'
import FieldPresentation from '../FieldPresentation.vue'

test('Enter can be consumed before the editor saves', async () => {
  let consume = true
  const onKeydown = vi.fn((event: KeyboardEvent) => {
    if (event.key === 'Enter' && consume) {
      event.preventDefault()
    }
  })
  const onPressEnter = vi.fn()
  const onUpdate = vi.fn()
  const owner = mount(Input, {
    attachTo: document.body,
    props: {
      editMode: 'popup',
      popupContainer: false,
      modelValue: 'old',
      onKeydown,
      onPressEnter,
      'onUpdate:modelValue': onUpdate,
    },
  })
  try {
    await owner.get('[aria-haspopup="dialog"]').trigger('click')
    await flushPromises()
    const panel = owner.getComponent(EditorPanel)
    const input = panel.get('input')
    await input.setValue('new')
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(onKeydown).toHaveBeenCalledTimes(1)
    expect(onPressEnter).not.toHaveBeenCalled()
    expect(onUpdate).not.toHaveBeenCalled()
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(true)
    consume = false
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    await panel.get('.mp-field-presentation__footer .mp-button--status-primary').trigger('click')
    await flushPromises()
    expect(onKeydown).toHaveBeenCalledTimes(2)
    expect(onPressEnter).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith('new')
    expect(owner.getComponent(FieldPresentation).props('open')).toBe(false)
  } finally {
    owner.unmount()
  }
})
