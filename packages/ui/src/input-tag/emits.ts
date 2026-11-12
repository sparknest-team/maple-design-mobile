import type { InputTagValue } from './types'

export const inputTagEmits = {
  'update:modelValue': (value: InputTagValue) => true,
  'update:inputValue': (inputValue: string) => true,
  /**
   * @zh 值发生改变时触发
   * @en Triggered when the value changes
   * @param {InputTagValue} value
   * @param {Event | undefined} ev
   */
  change: (value: InputTagValue, ev?: Event) => true,
  /**
   * @zh 输入值发生改变时触发
   * @en Trigger when the input value changes
   * @param {string} inputValue
   * @param {Event} ev
   */
  'input-value-change': (inputValue: string, ev: Event) => true,
  /**
   * @zh 按下回车键时触发
   * @en Triggered when the enter key is pressed
   * @param {string} inputValue
   * @param {KeyboardEvent} ev
   */
  'press-enter': (inputValue: string, ev: KeyboardEvent) => true,
  /**
   * @zh 点击标签的删除按钮时触发
   * @en Triggered when the delete button of the label is clicked
   * @param {string | number} removed
   * @param {Event} ev
   */
  remove: (removed: string | number, ev: Event) => true,
  /**
   * @zh 点击清除按钮时触发
   * @en Triggered when the clear button is clicked
   * @param {Event} ev
   */
  clear: (ev: Event) => true,
  /**
   * @zh 输入框获取焦点时触发
   * @en Triggered when the input box gets focus
   * @param {FocusEvent} ev
   */
  focus: (ev: FocusEvent) => true,
  /**
   * @zh 输入框失去焦点时触发
   * @en Triggered when the input box loses focus
   * @param {FocusEvent} ev
   */
  blur: (ev: FocusEvent) => true,
  'update:open': (open: boolean) => typeof open === 'boolean',
  'open-change': (open: boolean) => typeof open === 'boolean',
}
