import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Mention, { mentionProps } from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
for (const type of ['input', 'textarea'] as const) {
  test(`${type} supports the clear-icon action with the existing nullable output`, async () => {
    const owner = mount(Mention, {
      props: { type, editMode: 'direct', defaultValue: 'text', clearable: true, emptyValue: null },
      slots: { 'clear-icon': ({ clear }) => h('button', { 'data-custom-clear': '', onClick: clear }, 'clear') },
    })
    owners.push(owner)
    expect(owner.find('[data-custom-clear]').exists()).toBe(true)
    await owner.get('button').trigger('click')
    expect(owner.emitted('change')).toEqual([[null]])
    expect(owner.emitted('clear')).toHaveLength(1)
  })
}
test('existing refresh retries closed-field data after one failure without opening or awaiting error listeners', async () => {
  const attempts: { resolve: (value: string[]) => void; reject: (error: Error) => void }[] = []
  const listener = vi.fn(() => new Promise(() => {}))
  const owner = mount(Mention, {
    props: {
      editMode: 'popup',
      options: () => new Promise<string[]>((resolve, reject) => attempts.push({ resolve, reject })),
      onLoadError: listener,
    },
  })
  owners.push(owner)
  await flushPromises()
  expect(attempts).toHaveLength(1)
  const cause = new Error('expected failure')
  attempts[0].reject(cause)
  await flushPromises()
  expect(listener).toHaveBeenCalledWith(cause)
  expect(owner.emitted('load-error')).toEqual([[cause]])
  const retry = (owner.vm as unknown as { refresh(): Promise<void> }).refresh()
  await flushPromises()
  expect(attempts).toHaveLength(2)
  attempts[1].resolve(['alice'])
  await retry
  expect(owner.find('input,textarea').exists()).toBe(false)
  expect(owner.emitted('update:open')).toBeUndefined()
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})
test('API lists every declared Prop and all public notifications', () => {
  const root = resolve(process.cwd(), 'src/mention'),
    file = resolve(root, 'docs/zh-CN.md')
  expect(existsSync(file)).toBe(true)
  const docs = readFileSync(file, 'utf8')
  const section = (name: string) =>
    docs.match(
      new RegExp('^### (?:(?:`<mention>`|Mention) )?' + name + '\\n([\\s\\S]*?)(?=^#{1,3} |(?![\\s\\S]))', 'm'),
    )?.[1] ?? ''
  const keys = (body: string) =>
    body
      .split('\n')
      .filter((line) => line.startsWith('|'))
      .flatMap((line) =>
        (line.split('|')[1] ?? '')
          .replace(/`|\*|\(v-model\)/g, '')
          .trim()
          .split(/\s*\/\s*/),
      )
  for (const key of Object.keys(mentionProps)) {
    expect(keys(section('Props'))).toContain(key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase()))
  }
  for (const key of [
    'load-error',
    'update:modelValue',
    'change',
    'search',
    'select',
    'clear',
    'focus',
    'blur',
    'update:open',
    'open-change',
  ]) {
    expect(keys(section('Events'))).toContain(key)
  }
  expect(keys(section('Methods'))).toContain('refresh')
})
