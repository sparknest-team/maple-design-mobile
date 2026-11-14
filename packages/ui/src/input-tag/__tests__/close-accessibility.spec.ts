import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import InputTag from '..'

test('each close button identifies its displayed tag and honors an explicit name', async () => {
  const owner = mount(InputTag, {
    props: {
      modelValue: [
        'alice',
        'bob',
        { value: 'carol', label: 'Carol', closable: true, tagProps: { closeButtonAriaLabel: 'Remove Carol' } },
      ],
      fallbackOption: (value) => ({ value, label: value === 'alice' ? '小明' : '李四' }),
    },
  })
  try {
    const buttons = () => owner.findAll('.mp-input-tag__tag [role=button]')
    expect(buttons().map((button) => button.attributes('aria-label'))).toEqual([
      '关闭 小明',
      '关闭 李四',
      'Remove Carol',
    ])
    await buttons()[0].trigger('keydown', { key: 'Enter' })
    expect(owner.emitted('update:modelValue')?.[0]?.[0]).toEqual([
      'bob',
      { value: 'carol', label: 'Carol', closable: true, tagProps: { closeButtonAriaLabel: 'Remove Carol' } },
    ])
    await owner.setProps({ modelValue: ['bob'] })
    expect(buttons()[0].attributes('aria-label')).toBe('关闭 李四')
  } finally {
    owner.unmount()
  }
})

test('a formatted label supplies the close name', () => {
  const owner = mount(InputTag, { props: { defaultValue: ['a'], formatLabel: () => '显示名称' } })
  try {
    expect(owner.get('.mp-input-tag__tag [role=button]').attributes('aria-label')).toBe('关闭 显示名称')
  } finally {
    owner.unmount()
  }
})
