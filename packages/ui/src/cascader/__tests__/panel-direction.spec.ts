import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Panel from '../CascaderPanel.vue'
import type { CascaderOptionInfo } from '../types'

for (const dir of ['ltr', 'rtl']) {
  test(`${dir}: standalone panel navigates enabled children and parents using logical direction`, async () => {
    const host = document.createElement('div')
    host.dir = dir
    document.body.append(host)
    const owner = mount(Panel, {
      attachTo: host,
      props: {
        pathMode: true,
        options: [
          {
            value: 'root',
            label: 'Root',
            children: [
              { value: 'disabled', label: 'Disabled', disabled: true },
              { value: 'leaf', label: 'Leaf' },
            ],
          },
        ],
      },
    })
    try {
      await flushPromises()
      const vm = owner.vm as unknown as { activeKey: string; optionInfos: CascaderOptionInfo[] }
      const root = vm.optionInfos[0]!,
        leaf = root.children![1]!
      await owner.trigger('keydown', { key: 'ArrowDown' })
      expect(vm.activeKey).toBe(root.key)
      await owner.trigger('keydown', { key: dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight' })
      expect(vm.activeKey).toBe(leaf.key)
      await owner.trigger('keydown', { key: dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft' })
      expect(vm.activeKey).toBe(root.key)
      host.dir = dir === 'rtl' ? 'ltr' : 'rtl'
      await owner.trigger('keydown', { key: host.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight' })
      expect(vm.activeKey).toBe(leaf.key)
      expect(owner.emitted('update:modelValue')).toBeUndefined()
      await owner.trigger('keydown', { key: 'Enter' })
      expect(owner.emitted('update:modelValue')?.at(-1)?.[0]).toEqual(['root', 'leaf'])
    } finally {
      owner.unmount()
      host.remove()
    }
  })
}
