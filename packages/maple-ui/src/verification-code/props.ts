import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { inputProps } from '../input/props'
import { emptyValueProp } from '../utils/empty-value'

export type VerificationCodeType = 'digit' | 'text' | 'alphanumeric'
export type VerificationCodeAlign = 'start' | 'center' | 'end'
export type VerificationCodeSeparator = (index: number, character: string) => VNodeChild
export type VerificationCodeFormatter = (inputValue: string, index: number, value: string) => string | boolean
export type VerificationCodeVariant = import('../input/props').InputVariant
export const verificationCodeProps = {
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string>(),
  /** 受控整码；null 显示为空 */ modelValue: { type: String as PropType<string | null> },
  /** 非受控初值 */ defaultValue: { type: String, default: '' },
  /** 字符数量 */ length: { type: Number, default: 6, validator: (v: number) => Number.isInteger(v) && v > 0 },
  /** 字符集合 */ type: {
    type: String as PropType<VerificationCodeType>,
    default: 'digit',
    validator: (value: string) => ['digit', 'text', 'alphanumeric'].includes(value),
  },
  /** 输入外观 */ variant: inputProps.variant,
  /** 五档尺寸，继承表单 */ size: inputProps.size,
  /** 禁用，继承表单 */ disabled: inputProps.disabled,
  /** 只读，继承表单 */ readonly: inputProps.readonly,
  /** 错误，继承表单 */ error: inputProps.error,
  /** 显示掩码 */ masked: Boolean,
  /** 掩码首个 Unicode 字符 */ maskSymbol: { type: String, default: '•' },
  /** 挂载时聚焦 */ autofocus: Boolean,
  /** 单元格间距，数值为 px */ gutter: [String, Number],
  /** 水平对齐 */ align: {
    type: String as PropType<VerificationCodeAlign>,
    default: 'center',
    validator: (value: string) => ['start', 'center', 'end'].includes(value),
  },
  /** 允许粘贴 */ allowPaste: { type: Boolean, default: true },
  /** 粘贴预处理 */ pasteTransform: Function as PropType<(value: string) => string>,
  /** 格间分隔符 */ separator: Function as PropType<VerificationCodeSeparator>,
  /** 字符格式化，false 拒绝 */ formatter: Function as PropType<VerificationCodeFormatter>,
  /** 无障碍组名 */ ariaLabel: String,
  /** 实例文字颜色 */ textColor: inputProps.textColor,
  /** 实例聚焦颜色 */ focusColor: inputProps.focusColor,
  /** 实例失焦颜色 */ blurColor: inputProps.blurColor,
}
export type VerificationCodeProps = ExtractPublicPropTypes<typeof verificationCodeProps>
