import { type IContext } from '@nio-pow/maple-ui'

export interface SiteContext extends IContext {
  showPlayground: boolean
  playgroundURL: string
}
