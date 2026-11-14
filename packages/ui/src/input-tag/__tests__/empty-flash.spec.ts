import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import InputTag from '..'

test('closing after an automatic commit never displays the empty state', async () => {
  let finish!: (items: { value: string; label: string }[]) => void
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: {
      editMode: 'direct',
      options: () =>
        new Promise<{ value: string; label: string }[]>((resolve) => {
          finish = resolve
        }),
      minSearchLength: 2,
      searchDelay: 0,
      autoCommitSingle: true,
    },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ab')
  await flushPromises()
  const empties: string[] = []
  const observer = new MutationObserver(() => {
    for (const el of document.querySelectorAll('[class$="select-dropdown-empty"]')) {
      empties.push(el.textContent ?? '')
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
  finish([{ value: 'ab', label: 'Result' }])
  await flushPromises()
  expect(owner.text()).toContain('Result')
  expect(empties).toEqual([])
  observer.disconnect()
  owner.unmount()
})

test('a completed search with no results still shows the empty state', async () => {
  const owner = mount(InputTag, {
    attachTo: document.body,
    props: { editMode: 'direct', options: async () => [], minSearchLength: 2, searchDelay: 0 },
  })
  const input = owner.get('input')
  input.element.focus()
  await input.setValue('ab')
  await flushPromises()
  expect(document.querySelector('[class$="select-dropdown-empty"]')).toBeTruthy()
  owner.unmount()
})
