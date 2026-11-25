declare module '@maple-design/ui-vue/trigger/server' {
  export function renderReference(
    node: import('vue').VNode,
    parent: import('vue').ComponentInternalInstance,
    attrs: Record<string, unknown>,
    marker: string,
  ): Promise<string>
}
