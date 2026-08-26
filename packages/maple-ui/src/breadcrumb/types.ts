export interface BreadcrumbRoute {
  /**
   * 面包屑名称
   */
  label: string
  /**
   * 跳转路径（`a` 的 `href`）
   */
  path: string
  /**
   * 下拉菜单展示项（预留，需配合菜单组件使用）
   */
  children?: BreadcrumbRoute[]
}

export interface BreadcrumbMoreIconSlotData {
  omittedItems: BreadcrumbRoute[]
  count: number
  start: number
  end: number
}
