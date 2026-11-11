import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { FormColProps, FormContentAlign, FormLabelAlign, FormLabelFlex, FormLayout } from './layout-props'

export interface FormLayoutOptions {
  contentAlign?: FormContentAlign
  layout?: FormLayout
  labelAlign?: FormLabelAlign
  labelColProps?: FormColProps
  wrapperColProps?: FormColProps
  labelColStyle?: CSSProperties
  wrapperColStyle?: CSSProperties
  labelColFlex?: FormLabelFlex
  autoLabelWidth?: boolean
  maxLabelWidth?: number
  hideLabel?: boolean
  noStyle?: boolean
}

/** Layout resolution only; validation and markup remain owned by the local FormItem. */
export function useFormItemLayout(
  item: () => FormLayoutOptions,
  form: () => FormLayoutOptions = () => ({}),
  defaultLayout: FormLayout = 'horizontal',
) {
  const layout = computed(() => item().layout ?? form().layout ?? defaultLayout)
  const contentAlign = computed(() => item().contentAlign ?? form().contentAlign ?? 'start')
  const contentJustify = computed(
    () =>
      ({ start: 'flex-start', end: 'flex-end', left: 'left', center: 'center', right: 'right' })[contentAlign.value],
  )
  const labelAlign = computed(() => item().labelAlign ?? form().labelAlign ?? 'end')
  const labelColFlex = computed(() => item().labelColFlex ?? form().labelColFlex)
  const autoLabelWidth = computed(() => layout.value === 'horizontal' && !!form().autoLabelWidth)
  const measureLabel = computed(
    () => autoLabelWidth.value && labelColFlex.value === undefined && !item().hideLabel && !item().noStyle,
  )
  const fixedLabel = computed(
    () => layout.value === 'horizontal' && (labelColFlex.value !== undefined || autoLabelWidth.value),
  )
  const labelCol = computed<FormColProps>(() => {
    const col = { ...(item().labelColProps ?? form().labelColProps ?? { span: 5 }) }
    if (layout.value === 'horizontal') {
      if (labelColFlex.value !== undefined) {
        col.flex = labelColFlex.value
      } else if (autoLabelWidth.value) {
        const width = form().maxLabelWidth ?? 0
        col.flex = width > 0 ? `${width}px` : 'none'
      }
    }
    return col
  })
  const wrapperCol = computed<FormColProps>(() => {
    if (item().hideLabel) {
      return { flex: 'auto' }
    }
    const col = { ...(item().wrapperColProps ?? form().wrapperColProps ?? { span: 19 }) }
    if (fixedLabel.value) {
      col.flex = 'auto'
    }
    return col
  })
  return {
    layout,
    contentAlign,
    contentJustify,
    labelAlign,
    labelColFlex,
    autoLabelWidth,
    measureLabel,
    fixedLabel,
    labelCol,
    wrapperCol,
    wrap: computed(() => !fixedLabel.value),
    labelStyle: computed(
      () =>
        ({
          ...(layout.value === 'horizontal'
            ? {
                justifyContent: { start: 'flex-start', end: 'flex-end', left: 'left', right: 'right' }[
                  labelAlign.value
                ],
              }
            : {}),
          ...(item().labelColStyle ?? form().labelColStyle),
        }) as CSSProperties,
    ),
    wrapperStyle: computed(() => item().wrapperColStyle ?? form().wrapperColStyle),
  }
}
