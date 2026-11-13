import type { PropType } from 'vue'
import type { Data } from '../_utils/types'
import type { CascaderFieldNames, CascaderOption } from './types'

export const cascaderPanelProps = {
  /**
   * @zh 绑定值是否为路径
   * @en Whether the value is a path
   */
  pathMode: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 是否为多选状态（多选模式默认开启搜索）
   * @en Whether it is a multi-selection state (The search is turned on by default in the multi-select mode)
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 绑定值
   * @en Value
   */
  modelValue: {
    type: [String, Number, Object, Array] as PropType<
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | undefined
    >,
  },
  /**
   * @zh 默认值（非受控状态）
   * @en Default value (uncontrolled state)
   * @default-value '' \| undefined \| []
   */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | undefined
    >,
    default: (props: Data) => (props.multiple ? [] : props.pathMode ? undefined : ''),
  },
  /**
   * @zh 级联选择器的选项
   * @en Options for cascader
   */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  /**
   * @zh 展开下一级的触发方式
   * @en Expand the trigger method of the next level
   */
  expandTrigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * @zh 是否开启严格选择模式
   * @en Whether to enable strict selection mode
   */
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  /**
   * @zh 数据懒加载函数，传入时开启懒加载功能
   * @en Data lazy loading function, open the lazy loading function when it is passed in
   */
  loadMore: {
    type: Function as PropType<(option: CascaderOption, done: (children?: CascaderOption[]) => void) => void>,
  },
  /**
   * @zh 自定义 `CascaderOption` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性
   * @en Customize fields in `CascaderOption`; when option value is an object, `value` is also used as the key property
   */
  fieldNames: {
    type: Object as PropType<CascaderFieldNames>,
  },
  /**
   * @zh 是否展开子菜单
   * @en whether to expand the submenu
   */
  expandChild: {
    type: Boolean,
    default: false,
  },
}
