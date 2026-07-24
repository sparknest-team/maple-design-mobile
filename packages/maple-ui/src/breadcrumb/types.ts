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
  children?: {
    label: string
    path: string
  }[]
}
