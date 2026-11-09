import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Textarea from '..'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
})
for (const [label, rows] of [
  ['zero', 0],
  ['negative', -1],
  ['NaN', NaN],
  ['infinite', Infinity],
  ['fraction', 1.5],
  ['invalid string', 'rows'],
  ['fraction string', '2.5'],
  ['empty string', ''],
] as const) {
  test(`invalid native rows ${label} diagnoses and falls back to the native default`, () => {
    const warnings: string[] = []
    const owner = mount(Textarea, {
      props: { editMode: 'direct', rows },
      global: { config: { warnHandler: (message) => warnings.push(message) } },
    })
    owners.push(owner)
    expect(owner.get('textarea').element.rows).toBe(2)
    expect(owner.get('textarea').attributes('rows')).toBeUndefined()
    expect(warnings.some((message) => message.includes('rows') && message.includes('Invalid prop'))).toBe(true)
  })
}
for (const [label, autoSize] of [
  ['zero', { minRows: 0 }],
  ['negative', { maxRows: -1 }],
  ['NaN', { minRows: NaN }],
  ['infinite', { maxRows: Infinity }],
  ['string', { minRows: '2' }],
  ['inverted', { minRows: 4, maxRows: 2 }],
  ['array', []],
] as const) {
  test(`invalid auto-size ${label} diagnoses and disables the unsafe measurement policy`, () => {
    const warnings: string[] = []
    const owner = mount(Textarea, {
      props: { editMode: 'direct', autoSize: autoSize as any },
      global: { config: { warnHandler: (message) => warnings.push(message) } },
    })
    owners.push(owner)
    expect(owner.find('[class$="textarea__mirror"]').exists()).toBe(false)
    expect(warnings.some((message) => message.includes('autoSize') && message.includes('Invalid prop'))).toBe(true)
  })
}
test('native numeric-string rows and positive fractional auto row budgets remain supported', async () => {
  const owner = mount(Textarea, { props: { editMode: 'direct', rows: '3' } })
  owners.push(owner)
  expect(owner.get('textarea').element.rows).toBe(3)
  await owner.setProps({ autoSize: { minRows: 1.5, maxRows: 3.5 } })
  expect(owner.find('[class$="textarea__mirror"]').exists()).toBe(true)
})
test('switching an active auto-size policy to invalid releases its mirror and calculated styles', async () => {
  const owner = mount(Textarea, {
    props: { editMode: 'direct', autoSize: { minRows: 2, maxRows: 4 } },
    global: { config: { warnHandler: () => {} } },
  })
  owners.push(owner)
  await flushPromises()
  await owner.setProps({ autoSize: { minRows: 4, maxRows: 2 } })
  await flushPromises()
  expect(owner.find('[class$="textarea__mirror"]').exists()).toBe(false)
  expect(owner.get('textarea').element.style.height).toBe('')
})
test('reading slot receives the nullable value and formatted text, without an editor', () => {
  const scopes: unknown[] = []
  const owner = mount(Textarea, {
    props: { readPretty: true, modelValue: null },
    slots: {
      read: (scope) => {
        scopes.push(scope)
        return 'Reading'
      },
    },
  })
  owners.push(owner)
  expect(scopes[0]).toMatchObject({ value: null })
  expect(typeof (scopes[0] as any).text).toBe('string')
  expect(owner.find('textarea').exists()).toBe(false)
})
