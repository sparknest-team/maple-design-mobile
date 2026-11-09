<script setup lang="ts">
import Textarea from '../src/textarea'
import type { TextareaEmits } from '../src/textarea'

const format = (value: string | null, text: string) => text + (value ?? '')
const receive = (open: boolean) => open
const event: TextareaEmits['open-change'] = [true]
// @ts-expect-error The open-change payload is boolean.
const invalid: TextareaEmits['open-change'] = ['yes']
void [event, invalid]
</script>
<template>
  <Textarea :model-value="null" read-pretty @open-change="(open) => receive(open)">
    <template #read="{ value, text }"
      ><span>{{ format(value, text) }}</span></template
    >
  </Textarea>
</template>
