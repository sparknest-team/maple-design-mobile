import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from 'vitest'
import { radioGroupProps, radioProps } from '../../radio/props'
import { checkboxGroupProps, checkboxProps } from '../props'

for (const [name, props, folder, slots, events] of [
  [
    'Checkbox',
    checkboxProps,
    'checkbox',
    ['default', 'checkbox', 'checked-icon', 'unchecked-icon', 'indeterminate-icon', 'read'],
    ['update:modelValue', 'change', 'click', 'focus', 'blur', 'update:open', 'open-change'],
  ],
  [
    'CheckboxGroup',
    checkboxGroupProps,
    'checkbox',
    ['default', 'checkbox', 'label', 'read'],
    ['update:modelValue', 'change', 'load-error', 'update:open', 'open-change'],
  ],
  [
    'Radio',
    radioProps,
    'radio',
    ['default', 'radio', 'checked-icon', 'unchecked-icon', 'read'],
    ['update:modelValue', 'change', 'click', 'focus', 'blur', 'update:open', 'open-change'],
  ],
  [
    'RadioGroup',
    radioGroupProps,
    'radio',
    ['default', 'radio', 'label', 'read'],
    ['update:modelValue', 'change', 'load-error', 'update:open', 'open-change'],
  ],
] as const) {
  test(`${name} API lists every public Prop, event and slot`, () => {
    const desktop = resolve(process.cwd(), 'src', folder, 'README.md')
    const docs = readFileSync(
      existsSync(desktop) ? desktop : resolve(process.cwd(), 'src', folder, 'docs/zh-CN.md'),
      'utf8',
    )
    const table = (section: string) =>
      docs.match(
        new RegExp('^#{3,4} ' + name + ' ' + section + '\\n([\\s\\S]*?)(?=^#{1,4} |(?![\\s\\S]))', 'm'),
      )?.[1] ?? ''
    const keys = table('Props')
      .split('\n')
      .filter((line) => line.startsWith('|'))
      .flatMap((line) =>
        (line.split('|')[1] ?? '')
          .replace(/`|\*|\(v-model\)/g, '')
          .trim()
          .split(/\s*\/\s*/),
      )
    for (const key of Object.keys(props)) {
      expect(keys).toContain(key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase()))
    }
    for (const key of events) {
      expect(table('Events')).toContain('| ' + key)
    }
    for (const key of slots) {
      expect(table('Slots')).toMatch(new RegExp('\\|\\s*' + key + '\\s*\\|'))
    }
  })
}
