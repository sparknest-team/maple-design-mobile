import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { FormColProps, FormLabelAlign, FormLabelFlex, FormLayout } from './layout-props'

export interface FormLayoutOptions {
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
  const labelAlign = computed(() => item().labelAlign ?? form().labelAlign ?? 'right')
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
    labelAlign,
    labelColFlex,
    autoLabelWidth,
    measureLabel,
    fixedLabel,
    labelCol,
    wrapperCol,
    wrap: computed(() => !fixedLabel.value),
    labelStyle: computed(() => item().labelColStyle ?? form().labelColStyle),
    wrapperStyle: computed(() => item().wrapperColStyle ?? form().wrapperColStyle),
  }
}
