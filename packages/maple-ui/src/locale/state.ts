import { ref, type Ref } from 'vue'
import { hasOwn } from '@maple-design/shared'
import type { Message } from './index'

type ValueOf<T> = T[keyof T]

export function useLocale<T = Message>() {
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

export const { messages, currentMessage, add, use, merge, t } = useLocale()

export const defaultLocaleReady = ref(false)
