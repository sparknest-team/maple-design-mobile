export const selectEmits = {
  focus: (event: FocusEvent) => true,
  blur: (event: FocusEvent) => true,
  'update:modelValue': (
    value: string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[],
  ) => true,
  'update:inputValue': (inputValue: string) => true,
  'update:open': (visible: boolean) => true,
  /**
   * @zh 值发生改变时触发
   * @en Triggered when the value changes
   * @param { string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[] } value
   */
  change: (
    value: string | number | boolean | Record<string, any> | (string | number | boolean | Record<string, any>)[],
  ) => true,
  /**
   * @zh 输入框的值发生改变时触发
   * @en Triggered when the value of the input changes
   * @param {string} inputValue
   */
  'input-value-change': (inputValue: string) => true,
  /**
   * @zh 下拉框的显示状态改变时触发
   * @en Triggered when the display state of the drop-down box changes
   * @param {boolean} visible
   */
  'open-change': (visible: boolean) => true,
  /**
   * @zh 点击清除按钮时触发
   * @en Triggered when the clear button is clicked
   */
  clear: (ev: Event) => true,
  /**
   * @zh 点击标签的删除按钮时触发
   * @en Triggered when the delete button of the label is clicked
   * @param {string | number | boolean | Record<string, any> | undefined} removed
   */
  remove: (removed: string | number | boolean | Record<string, any> | undefined) => true,
  /**
   * @zh 用户搜索时触发
   * @en Triggered when the user searches
   * @param {string} inputValue
   */
  search: (inputValue: string) => true,
  /**
   * @zh 下拉菜单发生滚动时触发
   * @en Triggered when the drop-down scrolls
   */
  'dropdown-scroll': (ev: Event) => true,
  /**
   * @zh 下拉菜单滚动到底部时触发
   * @en Triggered when the drop-down menu is scrolled to the bottom
   */
  'dropdown-reach-bottom': (ev: Event) => true,
  /**
   * @zh 多选超出限制时触发
   * @en Triggered when multiple selection exceeds the limit
   * @param {string | number | boolean | Record<string, any> | undefined} value
   * @param {Event} ev
   * @version 2.18.0
   */
  'exceed-limit': (value: string | number | boolean | Record<string, any> | undefined, ev: Event) => true,
}
