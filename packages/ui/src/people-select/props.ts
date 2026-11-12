import type { PropType } from 'vue'
import { fieldPresentationProps } from '../_components/field-presentation/props'
import { fieldLoadingProps } from '../field-decorator/props'
import { selectProps } from '../select/props'
import { emptyValueProp } from '../utils/empty-value'
import type {
  PeopleSelectAction,
  PeopleSelectFallbackOption,
  PeopleSelectOption,
  PeopleSelectOptionsLoader,
  PeopleSelectRenderActions,
  PeopleSelectValue,
} from './types'

export const peopleSelectProps = {
  ...fieldLoadingProps,
  /** 弹出编辑是否需要确认；未设置时单选即提交，多选保留确认。 */
  needConfirm: { type: Boolean, default: undefined },
  ...fieldPresentationProps,
  emptyValue: emptyValueProp<string | string[]>(),
  /** Reactive display data for a selected value absent from options. */
  fallbackOption: {
    type: [Boolean, Function] as PropType<PeopleSelectFallbackOption>,
    default: true,
  },
  renderActions: Function as PropType<PeopleSelectRenderActions>,
  /** 阅读态显示电话图标；拨号行为交给 call。 */
  showPhone: Boolean,
  /** 阅读态显示聊天图标；聊天行为交给 chat。 */
  showChat: Boolean,
  /** 消费 Promise 管理等待态，不实现业务 SDK 或跳转。 */
  call: Function as PropType<PeopleSelectAction>,
  chat: Function as PropType<PeopleSelectAction>,
  showAvatar: { type: Boolean, default: true },
  /** 禁用；未设置时继承 Form / FormItem。 */
  disabled: { type: Boolean, default: undefined },
  /** 只读；允许回显，不允许打开编辑、选择或清空。 */
  readonly: { type: Boolean, default: undefined },
  /** Candidate data; requests and response mapping belong to the caller. */
  options: {
    type: [Array, Function] as PropType<readonly PeopleSelectOption[] | PeopleSelectOptionsLoader>,
    default: undefined,
  },
  filterable: { type: Boolean, default: true },
  filterOption: { ...selectProps.filterOption, default: undefined },
  caseSensitive: selectProps.caseSensitive,
  searchFields: selectProps.searchFields,
  searchDelay: selectProps.searchDelay,
  name: {
    type: String,
  },
  defaultText: {
    type: String,
    default: '-',
  },
  multiple: selectProps.multiple,
  modelValue: { type: [String, Array] as PropType<PeopleSelectValue>, default: undefined },
  /** 非受控初始选中人员 ID 或 ID 数组，仅创建时读取。 */
  defaultValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: (props: { multiple?: boolean }) => (props.multiple ? [] : ''),
  },
  isLabel: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
  },
}

export type PeopleSelectProps = import('vue').ExtractPublicPropTypes<typeof peopleSelectProps>
