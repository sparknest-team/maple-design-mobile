import { h, render, type AppContext, type VNode } from 'vue'

// Vue creates the message refs and slots while rendering in the caller's app context.
const MessageScope = ({ renderVNode }: { renderVNode: () => VNode }) => renderVNode()

export default function renderMessageRoot(key: symbol, appContext: AppContext | null, renderVNode: () => VNode) {
  function sync(host: VNode) {
    const vnode = h(MessageScope, { renderVNode })
    vnode.appContext = appContext
    render(vnode, host.el as HTMLElement)
  }
  return h('div', {
    key,
    style: { display: 'contents' },
    onVnodeMounted: sync,
    onVnodeUpdated: sync,
    onVnodeBeforeUnmount: (host: VNode) => render(null, host.el as HTMLElement),
  })
}
