<script lang="ts">
import { computed, defineComponent, h, inject } from 'vue'
import { call, hasOwn } from '@maple-design/shared-vue'
import { provideDirection, readingDirectionKey } from '@maple-design/use-vue'
import { t as globalTranslate, type Message } from '../locale'
import { createNamespace } from '../utils/components'
import { props } from './props'
import { injectLocaleProvider, provideLocaleProvider } from './provide'

const { name, n } = createNamespace('locale-provider')

export default defineComponent({
  name,
  props,
  setup(props, { slots }) {
    const parentLocale = injectLocaleProvider()
    const parentDirection = inject(readingDirectionKey, undefined)
    const direction = computed(() => props.dir ?? parentDirection?.value)
    provideDirection(direction)
    const messages = computed(() =>
      Object.entries(props.messages ?? {}).reduce(
        (messages, [key, value]) => {
          messages[key] = {
            ...value,
            lang: key,
          }
          return messages
        },
        {} as Record<string, Partial<Message>>,
      ),
    )
    provideLocaleProvider({
      t,
    })

    function t(id: string) {
      if (hasOwn(messages.value, props.locale) && hasOwn(messages.value[props.locale], id)) {
        const value = messages.value[props.locale][id]
        if (value != null) {
          return value
        }
      }
      return parentLocale.t?.(id) ?? globalTranslate(id)
    }

    return () =>
      h(
        props.tag,
        {
          class: n(),
          dir: props.dir,
        },
        call(slots.default),
      )
  },
})
</script>
