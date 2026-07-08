import { type IContext } from '@maplejs/maple-ui'

export interface SiteContext extends IContext {
  showPlayground: boolean
  playgroundURL: string
}
