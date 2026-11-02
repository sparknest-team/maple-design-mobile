import { createApp } from 'vue'
import { Lazy, type LazyContext, type LazyHTMLElement, type LazyOptions, type LazyState } from '@maple-design/ui'
import type { LazyOptions as SubpathOptions } from '@maple-design/ui/lazy'

const options: LazyOptions = {
  attempt: 3,
  filter(context: LazyContext) {
    context.src = context.src.replace('http:', 'https:')
  },
}
const subpath: SubpathOptions = options
createApp({}).use(Lazy, subpath)
const state: LazyState = 'pending'
const element = null as unknown as LazyHTMLElement
const context: LazyContext = element._lazy
void [state, context]
// @ts-expect-error only known terminal and pending states are accepted
const invalidState: LazyState = 'finished'
// @ts-expect-error attempt is numeric in plugin options
const invalidOptions: LazyOptions = { attempt: '3' }
void [invalidState, invalidOptions]
