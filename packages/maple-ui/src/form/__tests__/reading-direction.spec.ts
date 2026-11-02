import { reactive } from 'vue'
import { expect, test } from 'vitest'
import { formLayoutProps, type FormContentAlign, type FormLabelAlign } from '../layout-props'
import { useFormItemLayout } from '../use-form-item-layout'

test('omitted form alignment uses logical start and end without changing LTR placement', () => {
  expect(formLayoutProps.contentAlign.default).toBe('start')
  expect(formLayoutProps.labelAlign.default).toBe('end')
  const layout = useFormItemLayout(() => ({}))
  expect(layout.contentAlign.value).toBe('start')
  expect(layout.contentJustify.value).toBe('flex-start')
  expect(layout.labelStyle.value).toMatchObject({ justifyContent: 'flex-end' })
})
test('physical left/right and logical start/end are distinct alignment contracts', () => {
  const parent = reactive<{ contentAlign?: FormContentAlign; labelAlign?: FormLabelAlign }>({})
  const layout = useFormItemLayout(
    () => ({}),
    () => parent,
  )
  for (const [align, justify] of [
    ['left', 'left'],
    ['right', 'right'],
    ['start', 'flex-start'],
    ['end', 'flex-end'],
    ['center', 'center'],
  ] as const) {
    parent.contentAlign = align
    expect(layout.contentJustify.value).toBe(justify)
    if (align !== 'center') {
      parent.labelAlign = align
      expect(layout.labelStyle.value.justifyContent).toBe(justify)
    }
  }
})
test('item overrides and explicit label styles retain precedence through alignment changes', () => {
  const parent = reactive({ contentAlign: 'end' as FormContentAlign, labelAlign: 'start' as FormLabelAlign })
  const item = reactive({
    contentAlign: 'left' as FormContentAlign | undefined,
    labelColStyle: { justifyContent: 'center' },
  })
  const layout = useFormItemLayout(
    () => item,
    () => parent,
  )
  expect(layout.contentAlign.value).toBe('left')
  expect(layout.labelStyle.value.justifyContent).toBe('center')
  item.contentAlign = undefined
  expect(layout.contentAlign.value).toBe('end')
  parent.contentAlign = 'start'
  expect(layout.contentAlign.value).toBe('start')
})
