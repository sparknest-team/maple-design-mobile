// Based on ant-design responsiveObserve; each library owns its subscriptions.
export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Partial<Record<Breakpoint, string>>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>

/** 断点响应式数值配置，与 Cedar PC 对齐 */
export interface ResponsiveValue {
  /** >= 1600px */
  xxl?: number
  /** >= 1200px */
  xl?: number
  /** >= 992px */
  lg?: number
  /** >= 768px */
  md?: number
  /** >= 576px */
  sm?: number
  /** < 576px */
  xs?: number
}

export const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

type SubscribeFunc = (screens: ScreenMap, breakpointChecked: Breakpoint) => void

type MediaQueryResult = { matches: boolean }

type MediaQueryListener = (matches: MediaQueryResult) => void

let subscribers: Array<{
  token: string
  func: SubscribeFunc
}> = []
let subUid = -1
let screens: ScreenMap = {}

const responsiveObserve: {
  matchHandlers: {
    [key: string]: {
      mql: MediaQueryList
      listener: MediaQueryListener
    }
  }
  dispatch(pointMap: ScreenMap, breakpointChecked: Breakpoint): boolean
  subscribe(func: SubscribeFunc): string
  unsubscribe(token: string): void
  unregister(): void
  register(): void
} = {
  matchHandlers: {},
  dispatch(pointMap: ScreenMap, breakpointChecked: Breakpoint) {
    screens = pointMap
    if (subscribers.length < 1) {
      return false
    }

    subscribers.forEach((item) => {
      item.func(screens, breakpointChecked)
    })

    return true
  },
  subscribe(func: SubscribeFunc) {
    if (subscribers.length === 0) {
      this.register()
    }
    const token = (++subUid).toString()
    subscribers.push({
      token,
      func,
    })
    func(screens, null as unknown as Breakpoint)
    return token
  },
  unsubscribe(token: string) {
    subscribers = subscribers.filter((item) => item.token !== token)
    if (subscribers.length === 0) {
      this.unregister()
    }
  },
  unregister() {
    ;(Object.keys(responsiveMap) as Breakpoint[]).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen]
      if (!matchMediaQuery) {
        return
      }
      const handler = this.matchHandlers[matchMediaQuery]
      if (handler && handler.mql && handler.listener) {
        if (handler.mql.removeEventListener) {
          handler.mql.removeEventListener('change', handler.listener)
        } else {
          ;(handler.mql as MediaQueryList & { removeListener: (listener: MediaQueryListener) => void }).removeListener(
            handler.listener,
          )
        }
      }
    })
    this.matchHandlers = {}
    screens = {}
  },
  register() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }
    ;(Object.keys(responsiveMap) as Breakpoint[]).forEach((screen: Breakpoint) => {
      const matchMediaQuery = responsiveMap[screen]
      if (!matchMediaQuery) {
        return
      }
      const listener = ({ matches }: MediaQueryResult) => {
        this.dispatch(
          {
            ...screens,
            [screen]: matches,
          },
          screen,
        )
      }
      if (this.matchHandlers[matchMediaQuery]) {
        return
      }
      const mql = window.matchMedia(matchMediaQuery)
      if (mql.addEventListener) {
        mql.addEventListener('change', listener)
      } else {
        ;(mql as MediaQueryList & { addListener: (listener: MediaQueryListener) => void }).addListener(listener)
      }

      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      }

      listener(mql)
    })
  },
}

export default responsiveObserve
