export const cascaderEmits = {
  'load-error': (error: unknown) => true,
  'update:modelValue': (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | null
      | undefined,
  ) => true,
  'update:open': (visible: boolean) => true,
  /**
   * @zh 选中值改变时触发
   * @en Triggered when the selected value changes
   * @property {string | number | (string | number | (string | number)[])[] | undefined} value
   */
  change: (
    value:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any> | (string | number | Record<string, any>)[])[]
      | null
      | undefined,
  ) => true,
  /**
   * @zh 输入值改变时触发
   * @en Triggered when the input value changes
   * @property {string} value
   */
  'update:inputValue': (value: string) => true,
  'input-value-change': (value: string) => true,
  /**
   * @zh 点击清除按钮时触发
   * @en Triggered when the clear button is clicked
   */
  clear: (event: Event) => true,
  /**
   * @zh 用户搜索时触发
   * @en Triggered when the user searches
   * @property {string} value
   */
  search: (value: string) => true,
  /**
   * @zh 下拉框的显示状态改变时触发
   * @en Triggered when the display state of the dropdown changes
   * @property {boolean} visible
   */
  'open-change': (visible: boolean) => true,
  /**
   * @zh 获得焦点时触发
   * @en Triggered when focus
   * @param {FocusEvent} ev
   */
  focus: (ev: FocusEvent) => true,
  /**
   * @zh 失去焦点时触发
   * @en Triggered when blur
   * @param {FocusEvent} ev
   */
  blur: (ev: FocusEvent) => true,
}
