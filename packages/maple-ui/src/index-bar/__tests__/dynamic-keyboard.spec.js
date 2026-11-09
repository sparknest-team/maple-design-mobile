import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import IndexAnchor from '../IndexAnchor.vue'
import IndexBar from '../IndexBar.vue'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((owner) => owner.unmount())
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})
const settle = () => new Promise((resolve) => setTimeout(resolve, 100))
async function setup() {
  const items = ref([
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ])
  const owner = mount(
    defineComponent({
      setup: () => () =>
        h('div', { style: 'height:100px;overflow:auto' }, [
          h(IndexBar, { sticky: false }, () =>
            items.value.map((item) => h(IndexAnchor, { key: item.id, index: item.name }, () => item.name)),
          ),
        ]),
    }),
    { attachTo: document.body },
  )
  owners.push(owner)
  Object.defineProperty(owner.element, 'scrollTo', { configurable: true, value: vi.fn() })
  await settle()
  return { owner, items, buttons: () => owner.findAll('.mp-index-bar__anchor-item button') }
}

test('renames and reorders existing anchors and preserves the active anchor identity', async () => {
  const { owner, items, buttons } = await setup()
  await buttons()[0].trigger('click')
  expect(buttons()[0].attributes('aria-current')).toBe('location')
  items.value = [
    { id: 2, name: 'B' },
    { id: 1, name: 'X' },
  ]
  await nextTick()
  await settle()
  expect(buttons().map((button) => button.text())).toEqual(['B', 'X'])
  expect(buttons()[1].attributes('aria-current')).toBe('location')
  expect(owner.find('nav').attributes('aria-label')).toBeTruthy()
})

test('buttons are native keyboard controls with accessible current state', async () => {
  const { owner, buttons } = await setup()
  expect(buttons().map((button) => button.attributes('type'))).toEqual(['button', 'button'])
  await buttons()[1].trigger('click')
  expect(owner.findComponent(IndexBar).emitted('click')).toEqual([['B']])
  expect(buttons()[1].attributes('aria-current')).toBe('location')
})

test('duplicate and empty names render without duplicate vnode keys', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const { items, buttons } = await setup()
  items.value = [
    { id: 1, name: '' },
    { id: 2, name: '' },
  ]
  await nextTick()
  await settle()
  expect(buttons()).toHaveLength(2)
  expect(warn.mock.calls.flat().join(' ')).not.toContain('Duplicate keys')
})

test('renaming a pending target cancels the old scroll before it writes', async () => {
  const { owner, items } = await setup()
  const scroll = owner.element.scrollTo
  owner.findComponent(IndexBar).vm.scrollTo('A')
  items.value = [
    { id: 1, name: 'X' },
    { id: 2, name: 'B' },
  ]
  await nextTick()
  await settle()
  expect(scroll).not.toHaveBeenCalled()
})
