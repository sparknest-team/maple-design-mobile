import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Cascader from '../Cascader.vue'
import Menu from '../CascaderMenu.vue'

const owners: ReturnType<typeof mount>[] = []
const hosts: HTMLElement[] = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  hosts.splice(0).forEach((host) => host.remove())
})
const options = [
  {
    value: 'root',
    label: 'Root',
    children: [
      { value: 'blocked', label: 'Disabled', disabled: true },
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ],
  },
]
async function fixture(dir: string, extra = {}) {
  const host = document.createElement('div')
  host.dir = dir
  document.body.append(host)
  hosts.push(host)
  const owner = mount(Cascader, {
    attachTo: host,
    props: { options, editMode: 'direct', defaultOpen: true, pathMode: true, ...extra },
  })
  owners.push(owner)
  await flushPromises()
  return { owner, host, input: owner.get('input'), controller: owner.getComponent(Menu).props('controller') as any }
}
for (const dir of ['ltr', 'rtl']) {
  test(`${dir}: child and parent navigation follows direction while retaining path order`, async () => {
    const { owner, host, input, controller } = await fixture(dir)
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(controller.optionMap.get(controller.activeKey)?.value).toBe('root')
    await input.trigger('keydown', { key: dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight' })
    expect(controller.optionMap.get(controller.activeKey)?.value).toBe('one')
    await input.trigger('keydown', { key: dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft' })
    expect(controller.optionMap.get(controller.activeKey)?.value).toBe('root')
    const next = dir === 'rtl' ? 'ltr' : 'rtl'
    host.dir = next
    await input.trigger('keydown', { key: next === 'rtl' ? 'ArrowLeft' : 'ArrowRight' })
    expect(controller.optionMap.get(controller.activeKey)?.value).toBe('one')
    await input.trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('update:modelValue')?.[0]?.[0]).toEqual(['root', 'one'])
  })
}
test('horizontal search editing and composition do not navigate levels or select values', async () => {
  const { owner, input, controller } = await fixture('rtl', { filterable: true })
  await input.setValue('One')
  await flushPromises()
  const key = controller.activeKey
  const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true })
  input.element.dispatchEvent(event)
  expect(event.defaultPrevented).toBe(false)
  await input.trigger('keydown', { key: 'Enter', isComposing: true })
  expect(controller.activeKey).toBe(key)
  expect(owner.emitted('update:modelValue')).toBeUndefined()
})

test('clearing a closed picker resets the old keyboard path before reopening', async () => {
  const { owner, input, controller } = await fixture('rtl', { defaultValue: ['root', 'one'] })
  await input.trigger('keydown', { key: 'Escape' })
  await input.trigger('keydown', { key: 'Enter' })
  await flushPromises()
  expect(controller.optionMap.get(controller.activeKey)?.value).toBe('one')
  await input.trigger('keydown', { key: 'Escape' })
  controller.clearSelection(new Event('clear'))
  await flushPromises()
  await input.trigger('keydown', { key: 'Enter' })
  await input.trigger('keydown', { key: 'ArrowDown' })
  expect(controller.optionMap.get(controller.activeKey)?.value).toBe('root')
  expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual('')
})
