<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'

const value = ref<number | null | undefined>(2)
const disableInput = ref(true)
const disableIncrement = ref(false)
const disableDecrement = ref(false)
const incrementButton = ref(true)
const decrementButton = ref(true)
const press = ref(true)
const lastStep = ref('—')
function handleStep(next: number, direction: string) {
  lastStep.value = `${direction}: ${next}`
}
const approved = ref<number | null | undefined>(2)
const blocked = ref(false)
const pending = ref(false)
const status = ref('—')
const decision = shallowRef<((allowed: boolean) => void) | undefined>()
const fail = shallowRef<(() => void) | undefined>()
function beforeCommit(
  { value: next }: { value: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  pending.value = true
  status.value = `Waiting to commit ${next ?? 'empty'}`
  return new Promise<void | false>((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener('abort', cancel)
      pending.value = false
      decision.value = undefined
      fail.value = undefined
    }
    const cancel = () => {
      cleanup()
      status.value = 'Cancelled; old result ignored'
      resolve(false)
    }
    signal.addEventListener('abort', cancel, { once: true })
    decision.value = (allowed) => {
      cleanup()
      status.value = allowed ? 'Approved' : 'Rejected'
      resolve(allowed ? undefined : false)
    }
    fail.value = () => {
      cleanup()
      status.value = 'Request failed; value preserved'
      reject(new Error('Quantity request failed'))
    }
  })
}
onBeforeUnmount(() => decision.value?.(false))
</script>

<template>
  <div class="quantity-controls-demo">
    <h4>Quantity controls and step direction</h4>
    <mp-space wrap>
      <mp-checkbox v-model="disableInput" edit-mode="direct">Buttons only</mp-checkbox>
      <mp-checkbox v-model="disableIncrement" edit-mode="direct">Disable increase</mp-checkbox>
      <mp-checkbox v-model="disableDecrement" edit-mode="direct">Disable decrease</mp-checkbox>
      <mp-checkbox v-model="incrementButton" edit-mode="direct">Show increase</mp-checkbox>
      <mp-checkbox v-model="decrementButton" edit-mode="direct">Show decrease</mp-checkbox>
      <mp-checkbox v-model="press" edit-mode="direct">Long press</mp-checkbox>
    </mp-space>
    <mp-input-number
      v-model="value"
      edit-mode="direct"
      mode="button"
      aria-label="Quantity controls"
      :disable-input="disableInput"
      :disable-increment="disableIncrement"
      :disable-decrement="disableDecrement"
      :increment-button="incrementButton"
      :decrement-button="decrementButton"
      :press="press"
      :min="0"
      :max="10"
      @step="handleStep"
    />
    <p role="status">Accepted step：{{ lastStep }}</p>
    <h4>Approve, reject or cancel an asynchronous commit</h4>
    <p>
      Step, type or clear the value, then choose an approval result below. Pending operations cannot overlap. External
      updates and disabling cancel the old request.
    </p>
    <mp-input-number
      v-model="approved"
      edit-mode="direct"
      mode="button"
      clearable
      aria-label="Asynchronous quantity control"
      :before-commit="beforeCommit"
      loading-mode="line"
      :disabled="blocked"
    />
    <mp-space wrap>
      <mp-button :disabled="!pending" @click="decision?.(true)">Approve</mp-button>
      <mp-button :disabled="!pending" @click="decision?.(false)">Reject</mp-button>
      <mp-button :disabled="!pending" @click="fail?.()">Simulate failure</mp-button>
      <mp-button @click="approved = 10">Set external value to 10</mp-button>
      <mp-button @click="blocked = !blocked">{{ blocked ? 'Enable' : 'Disable' }}</mp-button>
    </mp-space>
    <p role="status">{{ status }}；Committed value：{{ approved ?? '—' }}</p>
  </div>
</template>
