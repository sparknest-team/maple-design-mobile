<template>
  <span :class="n()">
    <img
      v-if="showAvatar && person.avatar"
      :key="person.avatar"
      :src="person.avatar"
      :class="n('avatar')"
      alt=""
      @error="hideBrokenAvatar"
    />
    <span :class="n('name')">{{ person.label }}</span>
    <span v-if="$slots.default || showPhone || showChat" :class="n('actions')" @click.stop @pointerdown.stop>
      <slot>
        <Button
          v-if="showPhone"
          size="xs"
          variant="text"
          :disabled="disabled || !call"
          :aria-label="texts.call"
          :loading="pending.call"
          @click="run('call')"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
        <Button
          v-if="showChat"
          size="xs"
          variant="text"
          :disabled="disabled || !chat"
          :aria-label="texts.chat"
          :loading="pending.chat"
          @click="run('chat')"
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 3h16v13H9l-5 5V3Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <path d="M8 8h8M8 12h5" stroke="currentColor" stroke-width="1.8" />
          </svg>
        </Button>
      </slot>
    </span>
  </span>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import Button from '../button/base'
import { createNamespace } from '../utils/components'
import type { PeopleSelectAction, PeopleSelectOption } from './types'
import { usePeopleTexts } from './use-people-texts'

defineOptions({ name: createNamespace('person').name })
const props = defineProps<{
  person: PeopleSelectOption
  showAvatar?: boolean
  showPhone?: boolean
  showChat?: boolean
  disabled?: boolean
  call?: PeopleSelectAction
  chat?: PeopleSelectAction
}>()
const emit = defineEmits<{ actionError: [error: unknown, action: 'call' | 'chat'] }>()
const texts = reactive(usePeopleTexts())
const pending = reactive({ call: false, chat: false })
async function run(action: 'call' | 'chat') {
  if (props.disabled || pending[action] || !props[action]) {
    return
  }
  pending[action] = true
  try {
    await props[action]?.(props.person)
  } catch (error) {
    emit('actionError', error, action)
  } finally {
    pending[action] = false
  }
}
const { n } = createNamespace('people-select-person')
function hideBrokenAvatar(event: Event) {
  ;(event.target as HTMLImageElement).hidden = true
}
</script>
