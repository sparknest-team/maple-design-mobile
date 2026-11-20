import { createVNode } from 'vue'
import type { HTMLAttributes, VNode, VNodeChild } from 'vue'
import { getColumnLayoutKey } from '../extra-column'

/** Shared DOM only. Features supply content and interaction; no desktop imports. */
export function renderCellElement(
  tag: 'th' | 'td',
  custom: VNode | undefined,
  column: { dataIndex?: string },
  attributes: Record<string, unknown>,
  children: () => VNodeChild,
) {
  return createVNode(custom ?? tag, {
    ...attributes,
    'data-column-key': column.dataIndex,
    'data-column-layout-key': getColumnLayoutKey(column) !== column.dataIndex ? getColumnLayoutKey(column) : undefined,
  }, { default: () => { const value = children(); return Array.isArray(value) ? value : [value] } })
}

export function renderHeaderContent(prefix: string, options: {
  class: HTMLAttributes['class']
  interaction?: Record<string, unknown>
  title: () => VNodeChild
  sorter?: () => VNodeChild
  inlineFilter?: () => VNodeChild
  actions?: () => VNodeChild
}) {
  return <span class={options.class} {...options.interaction}>
    <span class={`${prefix}-th-main`}>
      {options.title()}
      {options.sorter?.()}
      {options.inlineFilter?.()}
    </span>
    {options.actions && <span class={`${prefix}-th-actions`} role="presentation" onClick={(event: Event) => event.stopPropagation()}>
      {options.actions()}
    </span>}
  </span>
}

export function renderTextContent(prefix: string, content: VNodeChild, ellipsis?: boolean) {
  return <span class={[`${prefix}-td-content`, { [`${prefix}-text-ellipsis`]: ellipsis }]}>{content}</span>
}

export function renderBodyContent(prefix: string, options: {
  align?: string
  fixedExpand?: boolean
  hasExpand?: boolean
  style?: Record<string, string>
  indent?: number
  expand?: () => VNodeChild
  onExpand?: (event: Event) => unknown
  content: () => VNodeChild
}) {
  return <span class={[
    `${prefix}-cell`, `${prefix}-cell-align-${options.align ?? 'start'}`,
    { [`${prefix}-cell-fixed-expand`]: options.fixedExpand, [`${prefix}-cell-expand-icon`]: options.hasExpand },
  ]} style={options.style}>
    {(options.indent ?? 0) > 0 && <span style={{ paddingInlineStart: `${options.indent}px` }} />}
    {options.hasExpand && <span class={`${prefix}-cell-inline-icon`} onClick={options.onExpand}>{options.expand?.()}</span>}
    {options.content()}
  </span>
}
