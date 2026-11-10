import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

test('shared field text keeps defaults and tracks a later public locale', async () => {
  const Input = (await import('../../input/index')).default
  const InputNumber = (await import('../../input-number/index')).default
  const EditorPanel = (await import('../../_components/field-presentation/EditorPanel.vue')).default
  const FieldReference = (await import('../../_components/field-presentation/FieldReference.vue')).default
  const { useFieldTexts } = await import('../../_components/field-presentation/texts')
  const { useFieldLocale } = await import('../../field-decorator/use-field-locale')
  const state = await import('../state')
  expect(state.defaultLocaleReady.value).toBe(false)
  const Inspector = defineComponent({
    setup() {
      const fields = useFieldTexts(),
        { t } = useFieldLocale()
      return () =>
        h(
          'output',
          JSON.stringify({
            input: fields.input.value,
            select: fields.select.value,
            close: fields.close.value,
            clear: fields.clear.value,
            count: fields.selectionCount.value,
            increase: t('common.increase'),
            unknown: t('not-a-key'),
            inherited: t('toString'),
          }),
        )
    },
  })
  const wrapper = mount({
    render: () =>
      h('main', [
        h(Input, { clearable: true, defaultValue: 'abc' }),
        h(InputNumber),
        h(FieldReference, { openTriggerTarget: 'icon' }),
        h(EditorPanel, { needConfirm: true, clearable: true, intent: 'input' }),
        h(Inspector),
      ]),
  })
  const labels = () => JSON.parse(wrapper.get('output').text())
  try {
    expect(labels()).toEqual({
      input: '请输入',
      select: '请选择',
      close: '关闭',
      clear: '清空',
      count: '已选 {count} 个',
      increase: '增加数值',
      unknown: 'not-a-key',
      inherited: 'toString',
    })
    expect(wrapper.find('[aria-label="清空"]').exists()).toBe(true)
    expect(wrapper.getComponent(FieldReference).get('button').attributes('aria-label')).toBe('请选择')
    expect(wrapper.getComponent(EditorPanel).text()).toContain('确认')
    const locale = await import('../index')
    locale.add('en-US', locale.enUS)
    locale.use('en-US')
    await nextTick()
    expect(wrapper.getComponent(FieldReference).get('button').attributes('aria-label')).toBe(locale.enUS.pickerTitle)
    expect(wrapper.getComponent(EditorPanel).text()).toContain(locale.enUS.pickerConfirmButtonText)
    expect(labels()).toMatchObject({
      input: locale.enUS['fieldPresentation.input'],
      select: locale.enUS.pickerTitle,
      close: locale.enUS['fieldPresentation.close'],
      increase: locale.enUS['common.increase'],
    })
    locale.add('fields-partial', {})
    locale.use('fields-partial')
    await nextTick()
    expect(labels()).toEqual({ increase: 'common.increase', unknown: 'not-a-key', inherited: 'toString' })
    locale.merge('fields-partial', {
      'common.clear': '',
      'common.increase': 'Custom',
      'fieldPresentation.edit': 'Edit custom',
    })
    await nextTick()
    expect(labels()).toMatchObject({ clear: '', increase: 'Custom' })
    locale.use('zh-CN')
    await nextTick()
    expect(labels().clear).toBe('清空')
    const Provider = (await import('../../locale-provider/LocaleProvider.vue')).default
    const scoped = mount({
      render: () =>
        h(
          Provider,
          { locale: 'local', messages: { local: { 'common.increase': 'Scoped', 'fieldPresentation.close': '' } } },
          { default: () => h(Inspector) },
        ),
    })
    try {
      expect(JSON.parse(scoped.get('output').text())).toMatchObject({ increase: 'Scoped', close: '' })
    } finally {
      scoped.unmount()
    }
  } finally {
    wrapper.unmount()
  }
}, 60000)
