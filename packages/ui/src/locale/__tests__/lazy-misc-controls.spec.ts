import { expect, test } from 'vitest'

test('misc controls preserve their text when the public locale loads later', async () => {
  await Promise.all([
    import('../../action-sheet/ActionSheet.vue'),
    import('../../fab/Fab'),
    import('../../notice-bar/NoticeBar.vue'),
    import('../../number-keyboard/NumberKeyboard.vue'),
    import('../../tabs/use-tabs-configuration'),
  ])
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const { miscText } = await import('../misc-text')
  expect(miscText('actionSheetTitle')).toBe('请选择')
  expect(miscText('fab.actions')).toBe('操作')
  expect(miscText('common.close')).toBe('关闭')
  expect(miscText('numberKeyboard.label')).toBe('数字键盘')
  expect(miscText('numberKeyboard.delete')).toBe('删除')
  expect(miscText('numberKeyboard.done')).toBe('完成')
  expect(miscText('cascaderPickerDoneButtonText')).toBe('完成')
  expect(miscText('tabs.add')).toBe('新增标签')
  expect(miscText('toString')).toBeUndefined()
  const locale = await import('../index')
  locale.add('en-US', locale.enUS)
  locale.use('en-US')
  expect(miscText('fab.actions')).toBe(locale.enUS['fab.actions'])
  expect(miscText('numberKeyboard.label')).toBe(locale.enUS['numberKeyboard.label'])
  locale.add('misc-partial', {})
  locale.use('misc-partial')
  expect(miscText('actionSheetTitle')).toBeUndefined()
  locale.merge('misc-partial', { 'tabs.add': '', 'common.close': 'Custom close' })
  expect(miscText('tabs.add')).toBe('')
  expect(miscText('common.close')).toBe('Custom close')
  locale.use('zh-CN')
  expect(miscText('actionSheetTitle')).toBe('请选择')
}, 20000)
