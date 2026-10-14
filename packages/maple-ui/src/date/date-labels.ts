/** 日历月份网格标签；标题、星期与滚轮文本不受此开关影响。 */
export const dateLabelProps = {
  /** 是否使用月份缩写，默认 true。 */
  abbreviation: { type: Boolean, default: true },
}

export function dateMonthLabel(abbreviation: boolean | undefined, shortName: string, fullName: string): string {
  return abbreviation === false ? fullName : shortName
}
