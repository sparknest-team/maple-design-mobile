import { createCommentVNode, type ComponentInternalInstance, type VNode } from 'vue'
import type { ssrRenderVNode } from 'vue/server-renderer'

type Push = Parameters<typeof ssrRenderVNode>[0]
type Chunk = Parameters<Push>[0]
export type ServerRender = (ctx: unknown, push: Push, parent: ComponentInternalInstance) => void

async function resolveChunk(chunk: Chunk): Promise<string> {
  const value = await chunk
  return typeof value === 'string' ? value : (await Promise.all(value.map(resolveChunk))).join('')
}

// Child components can register panels after async setup. Resolve the complete bar
// subtree before rendering the overlay, retaining the original item as the panel's owner.
export async function renderSubtree(vnode: VNode | null, parent: ComponentInternalInstance) {
  const { ssrRenderVNode } = await import('vue/server-renderer')
  const chunks: Chunk[] = []
  ssrRenderVNode((chunk) => chunks.push(chunk), vnode ?? createCommentVNode(), parent)
  return resolveChunk(chunks)
}
