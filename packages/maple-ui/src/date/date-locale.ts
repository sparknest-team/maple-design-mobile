import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/ja'
import 'dayjs/locale/fa'
import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { createNamespace } from '../utils/components'

/** 内部实例上下文，不是组件 locale Prop 或覆盖字典。 */
export const dateLocaleScopeKey: unique symbol = Symbol('date-locale-scope')
export interface DateLocaleScope {
  language: string
  weekStart: number
}
export interface DateLocaleOptions {
  [dateLocaleScopeKey]?: Readonly<DateLocaleScope>
}
const dateLocaleKey: InjectionKey<ComputedRef<DateLocaleOptions>> = Symbol('date-locale-options')
const localePrefix = createNamespace('date-locale').n()

export function scopeDateOptions<T extends object>(options: T, language: string, weekStart = 0): T & DateLocaleOptions {
  return { ...options, [dateLocaleScopeKey]: { language, weekStart } }
}

export function dateLocaleName(options: DateLocaleOptions = {}): string {
  const scope = options[dateLocaleScopeKey]
  if (!scope) {
    return dayjs.locale()
  }
  const language = scope.language.toLowerCase().replace('_', '-')
  const base = dayjs.Ls[language] ?? dayjs.Ls[language.split('-')[0]] ?? dayjs.Ls.en
  const name = `${localePrefix}-${base.name}-${scope.weekStart}`
  if (!dayjs.Ls[name]) {
    // isLocal=true 只注册本库元数据，不修改宿主默认语言或覆盖基础语言。
    dayjs.locale({ ...base, name, weekStart: scope.weekStart }, undefined, true)
  }
  return name
}

export function scopedDate(value: ConfigType, options: DateLocaleOptions = {}) {
  return dayjs(value).locale(dateLocaleName(options))
}
export function provideDateLocale(options: () => DateLocaleOptions) {
  provide(dateLocaleKey, computed(options))
}
export function useScopedDate() {
  const options = inject(dateLocaleKey, undefined)
  return (value: ConfigType) => scopedDate(value, options?.value)
}

/** 模型协议使用稳定英文日期数据，界面切换不改变模型解析。 */
export function dateModelLocaleName(options: DateLocaleOptions = {}) {
  const scope = options[dateLocaleScopeKey]
  return scope ? dateLocaleName(scopeDateOptions({}, 'en', scope.weekStart)) : 'en'
}
