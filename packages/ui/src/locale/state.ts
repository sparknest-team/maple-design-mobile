import { ref, type Ref } from 'vue'
import { hasOwn } from '@maple-design/shared-vue'
import type { Message } from './index'

type ValueOf<T> = T[keyof T]

type LocaleState<T> = {
  messages: Ref<Record<string, Partial<T>>>
  currentMessage: Ref<Partial<T>>
  add: (lang: string, message: Partial<T> & { lang?: string }) => void
  use: (lang: string) => {} | undefined
  merge: (lang: string, message: Partial<T>) => void
  t: (id: string) => ValueOf<T> | undefined
}

export function useLocale<T = Message>(): LocaleState<T> {
  const messages = ref<Record<string, Partial<T>>>({})
  const currentMessage: Ref<Partial<T>> = ref({})

  const add = (lang: string, message: Partial<T> & { lang?: string }) => {
    message.lang = lang
    messages.value[lang] = message
  }

  const use = (lang: string) => {
    if (!messages.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`)
      return {}
    }

    currentMessage.value = messages.value[lang]
  }

  const merge = (lang: string, message: Partial<T>) => {
    if (!messages.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`)
      return
    }

    messages.value[lang] = { ...messages.value[lang], ...message }

    use(lang)
  }

  const t = (id: string): ValueOf<T> | undefined => {
    if (hasOwn(currentMessage.value, id)) {
      return currentMessage.value[id]
    }
  }

  return {
    messages,
    currentMessage,
    add,
    use,
    merge,
    t,
  }
}

const defaultLocale = useLocale()
export const messages: LocaleState<Message>['messages'] = defaultLocale.messages
export const currentMessage: LocaleState<Message>['currentMessage'] = defaultLocale.currentMessage
export const add: LocaleState<Message>['add'] = defaultLocale.add
export const use: LocaleState<Message>['use'] = defaultLocale.use
export const merge: LocaleState<Message>['merge'] = defaultLocale.merge
export const t: LocaleState<Message>['t'] = defaultLocale.t

export const defaultLocaleReady: Ref<boolean> = ref(false)
