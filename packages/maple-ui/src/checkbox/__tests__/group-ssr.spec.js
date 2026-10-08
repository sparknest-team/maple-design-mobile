// @vitest-environment node
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { expect, it, vi } from 'vitest'
import Radio, { RadioGroup } from '../../radio'
import Checkbox, { CheckboxGroup } from '../index'

it('renders grouped defaults on the server without reverse model writes', async () => {
  const changed = vi.fn()
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h('div', [
          h(CheckboxGroup, { defaultValue: ['a'], 'onUpdate:modelValue': changed }, () =>
            h(Checkbox, { value: 'a' }, () => 'checkbox-a'),
          ),
          h(RadioGroup, { defaultValue: 'b', 'onUpdate:modelValue': changed }, () =>
            h(Radio, { value: 'b' }, () => 'radio-b'),
          ),
        ]),
    }),
  )
  expect(html).toContain('checkbox-a')
  expect(html).toContain('radio-b')
  expect(changed).not.toHaveBeenCalled()
})

it('renders standalone initial selections without notifications', async () => {
  const changed = vi.fn()
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h('div', [
          h(Checkbox, { defaultValue: true, 'onUpdate:modelValue': changed }),
          h(Radio, { defaultValue: false, value: false, 'onUpdate:modelValue': changed }),
        ]),
    }),
  )
  expect(html).toMatch(/checkbox(?:--|-)checked/)
  expect(html).toMatch(/radio(?:--|-)checked/)
  expect(changed).not.toHaveBeenCalled()
})

it('renders mapped label functions and readonly options on the server', async () => {
  const changed = vi.fn()
  const html = await renderToString(
    createSSRApp({
      render: () =>
        h(
          'div',
          [CheckboxGroup, RadioGroup].map((Group) =>
            h(Group, {
              options: [{ id: false, name: (_data, checked) => h('b', 'mapped:' + checked), locked: true }],
              fieldNames: { value: 'id', label: 'name', readonly: 'locked' },
              'onUpdate:modelValue': changed,
            }),
          ),
        ),
    }),
  )
  expect(html.match(/mapped:false/g)).toHaveLength(2)
  expect(changed).not.toHaveBeenCalled()
})

it('renders one tab entry when the selected radio is not the first option', async () => {
  const html = await renderToString(
    createSSRApp({
      render: () => h(RadioGroup, { defaultValue: false, options: [0, false], ariaLabel: 'channel' }),
    }),
  )
  expect(html.match(/tabindex="0"/g)).toHaveLength(1)
  expect(html).toContain('tabindex="-1"')
  expect(html).toContain('aria-label="channel"')
})
