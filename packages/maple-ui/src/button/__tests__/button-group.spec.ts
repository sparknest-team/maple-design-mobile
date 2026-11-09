import { h, isReadonly } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Button, { ButtonGroup, buttonGroupProps } from '..'

describe('ButtonGroup composition contract', () => {
  test('defaults to group semantics while forwarding author labels and role overrides', () => {
    const w = mount(ButtonGroup, {
      attrs: { 'aria-label': 'Document actions' },
      slots: { default: () => h(Button, {}, () => 'Save') },
    })
    const override = mount(ButtonGroup, { attrs: { role: 'presentation', 'aria-labelledby': 'actions-heading' } })
    try {
      expect(w.attributes('role')).toBe('group')
      expect(w.attributes('aria-label')).toBe('Document actions')
      expect(w.attributes('tabindex')).toBeUndefined()
      expect(override.attributes('role')).toBe('presentation')
      expect(override.attributes('aria-labelledby')).toBe('actions-heading')
      expect((ButtonGroup as any).emits).toBeUndefined()
    } finally {
      w.unmount()
      override.unmount()
    }
  })
  test.each(['status', 'variant', 'size'] as const)('warns on invalid %s using the Button value contract', (key) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = mount(ButtonGroup, { props: { [key]: 'not-a-valid-value' } })
    try {
      expect(
        warn.mock.calls.some((call) => String(call[0]).includes(`custom validator check failed for prop "${key}"`)),
      ).toBe(true)
    } finally {
      w.unmount()
      warn.mockRestore()
    }
  })
  test('accepts valid enum values without validator warnings', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const w = mount(ButtonGroup, { props: { status: 'tertiary', size: 'xl', variant: 'tonal' } })
    try {
      expect(warn).not.toHaveBeenCalled()
    } finally {
      w.unmount()
      warn.mockRestore()
    }
  })
  test('preserves disabled exceptions, reactive inheritance and group-owned elevation', async () => {
    const blocked = vi.fn(),
      enabled = vi.fn()
    const w = mount(ButtonGroup, {
      props: { disabled: true, size: 'lg', elevation: 8 },
      slots: {
        default: () => [
          h(Button, { onClick: blocked }, () => 'Inherited'),
          h(Button, { disabled: false, elevation: 24, onClick: enabled }, () => 'Exception'),
        ],
      },
    })
    try {
      const [first, second] = w.findAll('button')
      await first.trigger('click')
      await second.trigger('click')
      expect(blocked).not.toHaveBeenCalled()
      expect(enabled).toHaveBeenCalledTimes(1)
      expect(second.classes().some((c) => c.includes('elevation'))).toBe(false)
      const native = first.element
      await w.setProps({ disabled: false, size: 'sm' })
      expect(w.findAll('button')[0].element).toBe(native)
      expect(first.classes()).toContain('mp-button--size-sm')
      expect(w.classes()).toContain('mp-elevation--8')
      await first.trigger('click')
      expect(blocked).toHaveBeenCalledTimes(1)
      await w.setProps({ size: undefined })
      expect(first.classes()).toContain('mp-button--size-md')
      expect(isReadonly(w.vm.buttonGroupProvider.elevation)).toBe(true)
      expect(w.vm.buttonGroupProvider.elevation.value).toBe(8)
    } finally {
      w.unmount()
    }
  })
  test('a wrapper still inherits configuration but is outside the direct-child joining contract', () => {
    const w = mount(ButtonGroup, {
      props: { disabled: true },
      slots: { default: () => h('div', {}, [h(Button, {}, () => 'Wrapped')]) },
    })
    try {
      expect(w.element.firstElementChild?.tagName).toBe('DIV')
      expect(w.get('button').attributes('disabled')).toBeDefined()
    } finally {
      w.unmount()
    }
  })
  test('keeps individual loading local and does not introduce group task or model props', async () => {
    const action = vi.fn()
    const w = mount(ButtonGroup, {
      slots: {
        default: () => [h(Button, { loading: true }, () => 'Saving'), h(Button, { onClick: action }, () => 'Cancel')],
      },
    })
    try {
      await w.findAll('button')[1].trigger('click')
      expect(action).toHaveBeenCalledTimes(1)
      for (const key of ['loading', 'beforeChange', 'modelValue']) {
        expect(Object.keys(buttonGroupProps)).not.toContain(key)
      }
    } finally {
      w.unmount()
    }
  })
})
