import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import { z } from 'zod'
import Form, { FormItem } from '..'
import { isFormRuleList, isFormRules } from '../rule-validation'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
})
test('field errors expose actual rich data through aggregate results and callback', async () => {
  const owner = mount(Form, {
    props: { model: { name: 'invalid' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'name', label: 'Name', validateTrigger: [], rules: [() => 'Invalid name'] }, () =>
          h('span', 'Control'),
        ),
    },
  })
  owners.push(owner)
  let callback: unknown
  const errors = await owner.vm.validate((result: unknown) => {
    callback = result
  })
  expect(errors).toEqual({
    name: {
      field: 'name',
      label: 'Name',
      value: 'invalid',
      type: 'validator',
      isRequiredError: false,
      message: 'Invalid name',
    },
  })
  expect(callback).toEqual(errors)
})
test('public validation waits for a rule Promise and then reports success without collecting event returns', async () => {
  let finish!: () => void,
    settled = false
  const rule = async () => {
    await new Promise<void>((resolve) => {
      finish = resolve
    })
    return true
  }
  const owner = mount(Form, {
    props: { model: { name: 'value' } },
    slots: {
      default: () => h(FormItem, { field: 'name', validateTrigger: [], rules: rule }, () => h('span', 'Control')),
    },
  })
  owners.push(owner)
  const pending = owner.vm.validate().then((result: unknown) => {
    settled = true
    return result
  })
  await nextTick()
  expect(settled).toBe(false)
  finish()
  expect(await pending).toBeUndefined()
  expect(settled).toBe(true)
})

test('Maple rule boundary accepts function/Zod lists and diagnoses unsupported object rules', () => {
  expect(isFormRules({ name: [() => true, z.string()] })).toBe(true)
  expect(isFormRules({ name: { required: true } })).toBe(false)
  expect(isFormRuleList([{ match: /x/ }])).toBe(false)
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  try {
    const owner = mount(FormItem, { props: { label: 'Name', rules: { required: true } as never } })
    owners.push(owner)
    expect(
      warn.mock.calls.some((args) => args.join(' ').includes('custom validator check failed for prop "rules"')),
    ).toBe(true)
    expect(owner.find('strong').exists()).toBe(false)
  } finally {
    warn.mockRestore()
  }
})
