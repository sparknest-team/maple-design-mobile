import {
  Comment,
  createApp,
  defineComponent,
  Fragment,
  h,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  ref,
  type App,
  type Component,
  type ComponentPublicInstance,
  type ExtractPropTypes,
  type Plugin,
  type PropType,
  type Ref,
  type VNode,
} from 'vue'
import { createNamespaceFn, hasOwn, isFunction, isPlainObject, isString, normalizeToArray } from '@maple-design/shared'
import { useEventListener } from '@maple-design/use'
import type { SafeParseReturnType, ZodType } from 'zod'
import { createRequestGuard } from './async-request'

export type NamespaceClass = string | null | undefined
export interface ComponentNamespace {
  name: string
  n(suffix?: string): string
  classes(...names: (NamespaceClass | [unknown, NamespaceClass, NamespaceClass?])[]): NamespaceClass[]
}

export const createNamespace: (name: string) => ComponentNamespace = /* #__PURE__ */ createNamespaceFn('mp')

export type ListenerProp<F> = F | F[]

export interface MountInstance {
  instance: ComponentPublicInstance
  unmount: () => void
}

export type ExtractPublicPropTypes<P> = Partial<ExtractPropTypes<P>>

export function pickProps<T, U extends keyof T>(props: T, propsKey: U): T[U]
export function pickProps<T, U extends keyof T>(props: T, propsKey: U[]): Pick<T, U>
export function pickProps(props: any, propsKey: any): any {
  return Array.isArray(propsKey)
    ? propsKey.reduce((pickedProps: any, key) => {
        pickedProps[key] = props[key]
        return pickedProps
      }, {})
    : props[propsKey]
}

export type ComponentWithInstall<T> = T &
  Plugin & {
    setPropsDefaults: (defaults: Record<string, any>) => void
  }

export function withPropsDefaultsSetter<T>(
  target: T,
  props: Record<string, any>,
): T & {
  setPropsDefaults: (defaults: Record<string, any>) => void
} {
  ;(target as any).setPropsDefaults = (defaults: Record<string, any>) => {
    Object.entries(defaults).forEach(([key, value]) => {
      const prop = props[key]

      if (prop == null) {
        return
      }

      const descriptor = isPlainObject(prop) ? prop : { type: prop }
      const type = descriptor.type
      const types = Array.isArray(type) ? type : [type]
      const defaultValue =
        types.includes(Object) && (value === null || isPlainObject(value))
          ? () => (value === null ? null : { ...value })
          : types.includes(Array) && (value === null || Array.isArray(value))
            ? () => (value === null ? null : [...value])
            : value

      props[key] = {
        ...descriptor,
        default: defaultValue,
      }
    })
  }

  return target as T & { setPropsDefaults: (defaults: Record<string, any>) => void }
}

export interface WithInstallOptions<InstallOptions = unknown> {
  components?: Component[]
  resolveName?: (component: Component, options?: InstallOptions) => string | undefined
  setup?: (app: App, options?: InstallOptions) => void
}

export function withInstall<T extends Component, InstallOptions = unknown>(
  component: T,
  target?: undefined,
  options?: WithInstallOptions<InstallOptions>,
): ComponentWithInstall<T>
export function withInstall<T, InstallOptions = unknown>(
  component: Component,
  target: T,
  options?: WithInstallOptions<InstallOptions>,
): ComponentWithInstall<T>
export function withInstall<T = Component, InstallOptions = unknown>(
  component: Component,
  target?: T,
  options: WithInstallOptions<InstallOptions> = {},
): ComponentWithInstall<T> {
  const componentWithInstall = target ?? component
  const components = options.components ?? [component]

  withPropsDefaultsSetter(componentWithInstall, (component as any).props ?? {})
  for (const item of components) {
    if (item !== componentWithInstall) {
      withPropsDefaultsSetter(item, (item as any).props ?? {})
    }
  }

  ;(componentWithInstall as ComponentWithInstall<T>).install = (app: App, installOptions?: InstallOptions) => {
    for (const item of components) {
      const name = options.resolveName?.(item, installOptions) ?? item.name
      if (name) {
        app.component(name, item)
      }
    }
    options.setup?.(app, installOptions)
  }

  return componentWithInstall as ComponentWithInstall<T>
}

export function mount(component: Component): MountInstance {
  const app = createApp(component)
  const host = document.createElement('div')
  document.body.appendChild(host)

  return {
    instance: app.mount(host),
    unmount() {
      app.unmount()
      if (host.parentNode) {
        document.body.removeChild(host)
      }
    },
  }
}

export function mountInstance(
  component: any,
  props: Record<string, any> = {},
  eventListener: Record<string, any> = {},
): {
  unmountInstance: () => void
} {
  const Host = {
    setup() {
      return () =>
        h(component, {
          ...props,
          ...eventListener,
        })
    },
  }

  const { unmount } = mount(Host)
  return { unmountInstance: unmount }
}

export function flatFragment(vNodes: any) {
  const result: VNode[] = []

  vNodes.forEach((vNode: any) => {
    if (vNode.type === Comment) {
      return
    }

    if (vNode.type === Fragment && Array.isArray(vNode.children)) {
      vNode.children.forEach((item: VNode) => {
        result.push(item)
      })
      return
    }

    result.push(vNode)
  })

  return result
}

export function isZodRule(rule: unknown): rule is ZodType {
  return isPlainObject(rule) && isFunction(rule.safeParseAsync)
}

export function isZodResult(result: unknown): result is SafeParseReturnType<any, any> {
  return isPlainObject(result) && hasOwn(result, 'success')
}

export function useValidation() {
  const validation = createRequestGuard()
  onBeforeUnmount(() => validation.invalidate())
  const errorMessage: Ref<string> = ref('')

  const validate = async (ruleOrRules: any | any[], value: any, apis?: any): Promise<boolean> => {
    const isCurrent = validation.begin()
    const rules = normalizeToArray(ruleOrRules).filter((rule) => isZodRule(rule) || isFunction(rule))

    const results = await Promise.all(
      rules.map((rule) => (isZodRule(rule) ? rule.safeParseAsync(value) : rule(value, apis))),
    )

    let message = ''
    const valid = !results.some((result) => {
      if (isZodResult(result)) {
        if (result.success === false) {
          message = result.error.issues[0].message
          return true
        }
      } else if (result !== true) {
        message = String(result)
        return true
      }

      return false
    })
    if (isCurrent()) {
      errorMessage.value = message
    }
    return valid
  }

  const resetValidation = () => {
    validation.invalidate()
    errorMessage.value = ''
  }

  const validateWithTrigger = async <T>(validateTrigger: T[], trigger: T, rules: any, value: any, apis?: any) => {
    if (validateTrigger.includes(trigger)) {
      await validate(rules, value, apis)
    }
  }

  return {
    errorMessage,
    validate,
    resetValidation,
    validateWithTrigger,
  }
}

export function useRouteListener(listener: () => void) {
  useEventListener(() => window, 'hashchange', listener)
  useEventListener(() => window, 'popstate', listener)
}

export function useTeleport() {
  const disabled: Ref<boolean> = ref(false)

  onActivated(() => {
    disabled.value = false
  })

  onDeactivated(() => {
    disabled.value = true
  })

  return {
    disabled,
  }
}

export const getPrefixCls = (componentName?: string) => (componentName ? `mp-${componentName}` : 'mp')

export function defineListenerProp<F>(fallback?: any) {
  return {
    type: [Function, Array] as PropType<F | F[]>,
    default: fallback,
  }
}

export function formatElevation(elevation: number | boolean | string | undefined, defaultLevel?: number) {
  if (elevation === false || elevation == null) {
    return null
  }

  const level = elevation === true ? (defaultLevel ?? 0) : Number(elevation)
  const normalized = Number.isFinite(level) ? Math.min(24, Math.max(0, Math.round(level))) : (defaultLevel ?? 0)
  return `mp-elevation--${normalized}`
}

export const MaybeVNode = /* #__PURE__ */ defineComponent({
  props: {
    is: {
      type: [String, Object] as PropType<string | VNode>,
    },

    tag: {
      type: String,
      default: 'span',
    },
  },
  setup(props) {
    return () => (isString(props.is) ? h(props.tag, props.is) : props.is)
  },
})
