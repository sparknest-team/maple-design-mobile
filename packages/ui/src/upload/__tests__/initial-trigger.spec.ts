import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { expect, it } from 'vitest'
import Upload from '..'

it.each([
  ['button', true, false],
  ['button', false, true],
  ['span', false, true],
  ['', true, true],
] as const)('assigns the initial keyboard entry for slot %s and hint %s', async (tag, hint, outerButton) => {
  const root = document.createElement('div')
  root.innerHTML = await renderToString(createSSRApp({
    render: () => h(Upload, { editMode: 'direct', initialTriggerInteractive: hint },
      tag ? { trigger: () => h(tag, 'Choose') } : undefined),
  }))
  const wrapper = root.querySelector('[class*="upload__trigger"]')!
  expect(wrapper.getAttribute('role')).toBe(outerButton ? 'button' : null)
  expect(wrapper.getAttribute('tabindex')).toBe(outerButton ? '0' : null)
  if (tag) expect(wrapper.querySelector(tag)?.textContent).toBe('Choose')
})
