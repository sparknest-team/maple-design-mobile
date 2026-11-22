import { createCommentVNode, type ComponentInternalInstance, type VNode } from 'vue'
import { ssrRenderVNode } from 'vue/server-renderer'

type Push = Parameters<typeof ssrRenderVNode>[0]
type Chunk = Parameters<Push>[0]
export type ServerRender = (ctx: unknown, push: Push, parent: ComponentInternalInstance) => void

async function resolveChunk(chunk: Chunk): Promise<string> {
  const value = await chunk
  return typeof value === 'string' ? value : (await Promise.all(value.map(resolveChunk))).join('')
}

// Child components can register panels after async setup. Resolve the complete bar
// subtree before rendering the overlay, retaining the original item as the panel's owner.
//
// The import must stay static: a dynamic `import('vue/server-renderer')` makes the
// bundler wrap it in its module-preload helper, which ships
// `es/_virtual/preload-helper.mjs` into the published package and then collides
// with the helper rolldown injects when a consumer builds with vite 8
// (`Identifier __vitePreload has already been declared`). Browser builds swap this
// module for `ssr-browser.mjs` via the package `browser` field, so CSR bundles
// never see the real server renderer.
export async function renderSubtree(vnode: VNode | null, parent: ComponentInternalInstance) {
  const chunks: Chunk[] = []
  ssrRenderVNode((chunk) => chunks.push(chunk), vnode ?? createCommentVNode(), parent)
  return resolveChunk(chunks)
}
