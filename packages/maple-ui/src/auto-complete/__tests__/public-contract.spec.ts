import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import AutoComplete, { autoCompleteProps } from '..'
import { autoCompleteEmits } from '../emits'

test('API tables cover the actual public props and all base/editor notifications', () => {
  const root = resolve(process.cwd(), 'src/auto-complete'),
    desktop = resolve(root, 'README.md')
  const text = readFileSync(existsSync(desktop) ? desktop : resolve(root, 'docs/zh-CN.md'), 'utf8')
  const section = (name: string) =>
    text.match(new RegExp('^### (?:AutoComplete )?' + name + '\\n([\\s\\S]*?)(?=^#{1,3} |(?![\\s\\S]))', 'm'))?.[1] ??
    ''
  const keys = (body: string) =>
    body
      .split('\n')
      .filter((line) => line.startsWith('|'))
      .flatMap((line) =>
        (line.split('|')[1] ?? '')
          .replace(/`/g, '')
          .trim()
          .split(/\s*\/\s*/),
      )
  for (const key of Object.keys(autoCompleteProps)) {
    expect(keys(section('Props'))).toContain(key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase()))
  }
  for (const key of [...Object.keys(autoCompleteEmits), 'update:open', 'open-change']) {
    expect(keys(section('Events'))).toContain(key)
  }
  expect(keys(section('Slots'))).not.toContain('default')
  expect(keys(section('Slots'))).toContain('empty')
  expect(keys(section('Methods'))).toContain('refresh')
})
test('read slot preserves the raw null model without exposing an input', () => {
  const read = vi.fn(({ value, text }) => String(value) + ':' + text)
  const owner = mount(AutoComplete, { props: { modelValue: null, readPretty: true }, slots: { read } })
  try {
    expect(read).toHaveBeenCalledWith(expect.objectContaining({ value: null, text: expect.any(String) }))
    expect(owner.find('input').exists()).toBe(false)
  } finally {
    owner.unmount()
  }
})
test('default slot does not replace the component-owned input', () => {
  const content = vi.fn(() => 'unrendered')
  const owner = mount(AutoComplete, { props: { editMode: 'direct' }, slots: { default: content } })
  try {
    expect(content).not.toHaveBeenCalled()
    expect(owner.find('input').exists()).toBe(true)
  } finally {
    owner.unmount()
  }
})
