import type {
  FormColProps,
  FormItemProps,
  FormLabelAlign,
  FormLabelFlex,
  FormLayout,
  FormProps,
} from '@maple-design/ui-vue'

const layout: FormLayout = 'horizontal'
const align: FormLabelAlign = 'left'
const columns: FormColProps = { span: 6, xs: 24, md: { span: 8, offset: 0 } }
const flex: FormLabelFlex = '6rem'
const form: FormProps = {
  id: 'profile',
  layout,
  labelAlign: align,
  labelColProps: columns,
  labelColFlex: flex,
  wrapperColProps: { span: 18 },
  autoLabelWidth: true,
  labelColStyle: { color: 'red' },
}
const item: FormItemProps = {
  size: 'lg',
  layout: 'vertical',
  labelAlign: 'right',
  labelColFlex: 0,
  wrapperColStyle: { minWidth: '0' },
}
// @ts-expect-error Label alignment follows the two-position public contract.
const badAlign: FormProps = { labelAlign: 'center' }
// @ts-expect-error Col span is numeric.
const badCol: FormProps = { labelColProps: { span: '6' } }
// @ts-expect-error Auto width is boolean.
const badAuto: FormProps = { autoLabelWidth: 'true' }
// @ts-expect-error FormItem has the same typed Col contract.
const badItem: FormItemProps = { labelColProps: { span: '6' } }
// @ts-expect-error FormItem accepts only the shared layout enum.
const badItemLayout: FormItemProps = { layout: 'grid' }
// @ts-expect-error Removed unused pre-release alias; inheritance is automatic.
const oldMerge: FormItemProps = { mergeProps: true }
void [form, item, badAlign, badCol, badAuto, badItem, badItemLayout, oldMerge]

const decoration: FormItemProps = {
  contentFlex: false,
  contentClass: ['layout'],
  showColon: true,
  tooltip: 'Hint',
  labelComponent: 'label',
  labelAttrs: { for: 'field' },
  asteriskPosition: 'end',
  validateStatus: 'warning',
}
// @ts-expect-error Asterisk position is a closed enum.
const badAsterisk: FormItemProps = { asteriskPosition: 'left' }
// @ts-expect-error Validation status is not a theme status.
const badStatus: FormItemProps = { validateStatus: 'primary' }
// @ts-expect-error Content flex is boolean.
const badContent: FormItemProps = { contentFlex: 'false' }
void [decoration, badAsterisk, badStatus, badContent]

const contentAlignment: FormProps = { contentAlign: 'right' }
const itemContentAlignment: FormItemProps = { contentAlign: 'center' }
// @ts-expect-error Content alignment is a closed enum.
const invalidContentAlignment: FormItemProps = { contentAlign: 'stretch' }
void [contentAlignment, itemContentAlignment, invalidContentAlignment]

const contentAlignType: import('@maple-design/ui-vue').FormContentAlign = 'center'
void contentAlignType

const directForm: FormProps = { editMode: 'direct', readPretty: false }
const overlayItem: FormItemProps = { editMode: 'popup', readPretty: true }
const editingType: import('@maple-design/ui-vue').FieldEditMode = 'direct'
// @ts-expect-error New edit-mode calls the direct mode direct, not inline.
const invalidEditMode: FormProps = { editMode: 'inline' }
void [directForm, overlayItem, editingType, invalidEditMode]

// @ts-expect-error Legacy editing prop has been removed.
const legacyEditing: FormProps = { presentation: 'popup' }
// @ts-expect-error Legacy editing type has been removed.
type LegacyEditing = import('@maple-design/ui-vue').FieldPresentation
void legacyEditing
