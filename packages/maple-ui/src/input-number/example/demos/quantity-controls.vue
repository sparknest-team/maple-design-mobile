<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'

const props = defineProps<{ english?: boolean }>()
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
  status.value = props.english ? `Waiting to commit ${next ?? 'empty'}` : `等待提交 ${next ?? '空值'}`
  return new Promise<void | false>((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener('abort', cancel)
      pending.value = false
      decision.value = undefined
      fail.value = undefined
    }
    const cancel = () => {
      cleanup()
      status.value = props.english ? 'Cancelled; old result ignored' : '已取消，旧结果不再生效'
      resolve(false)
    }
    signal.addEventListener('abort', cancel, { once: true })
    decision.value = (allowed) => {
      cleanup()
      status.value = allowed ? (props.english ? 'Approved' : '已允许') : props.english ? 'Rejected' : '已拒绝'
      resolve(allowed ? undefined : false)
    }
    fail.value = () => {
      cleanup()
      status.value = props.english ? 'Request failed; value preserved' : '请求失败，保留原值'
      reject(new Error(props.english ? 'Quantity request failed' : '数量提交失败'))
    }
  })
}
onBeforeUnmount(() => decision.value?.(false))
</script>

<template>
  <div class="quantity-controls-demo">
    <h4>{{ english ? 'Quantity controls and step direction' : '数量控制与步进方向' }}</h4>
    <mp-space wrap>
      <mp-checkbox v-model="disableInput" edit-mode="direct">{{ english ? 'Buttons only' : '禁止手输' }}</mp-checkbox>
      <mp-checkbox v-model="disableIncrement" edit-mode="direct">{{
        english ? 'Disable increase' : '禁用增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="disableDecrement" edit-mode="direct">{{
        english ? 'Disable decrease' : '禁用减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="incrementButton" edit-mode="direct">{{
        english ? 'Show increase' : '显示增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="decrementButton" edit-mode="direct">{{
        english ? 'Show decrease' : '显示减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="press" edit-mode="direct">{{ english ? 'Long press' : '开启长按' }}</mp-checkbox>
    </mp-space>
    <mp-input-number
      v-model="value"
      edit-mode="direct"
      mode="button"
      aria-label="数量控制示例"
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
    <p role="status">{{ english ? 'Accepted step' : '已接受的步进' }}：{{ lastStep }}</p>
    <h4>{{ english ? 'Approve, reject or cancel an asynchronous commit' : '异步允许、拒绝与取消提交' }}</h4>
    <p>
      {{
        english
          ? 'Step, type or clear the value, then choose an approval result below. Pending operations cannot overlap. External updates and disabling cancel the old request.'
          : '加减、输入或清空后，在下方手动选择审批结果。等待时不能重复提交；外部回填或禁用会取消旧请求。'
      }}
    </p>
    <mp-input-number
      v-model="approved"
      edit-mode="direct"
      mode="button"
      clearable
      aria-label="异步数量示例"
      :before-commit="beforeCommit"
      loading-mode="line"
      :disabled="blocked"
    />
    <mp-space wrap>
      <mp-button :disabled="!pending" @click="decision?.(true)">{{ english ? 'Approve' : '允许本次变更' }}</mp-button>
      <mp-button :disabled="!pending" @click="decision?.(false)">{{ english ? 'Reject' : '拒绝本次变更' }}</mp-button>
      <mp-button :disabled="!pending" @click="fail?.()">{{ english ? 'Simulate failure' : '模拟失败' }}</mp-button>
      <mp-button @click="approved = 10">{{ english ? 'Set external value to 10' : '外部回填 10' }}</mp-button>
      <mp-button @click="blocked = !blocked">{{
        blocked ? (english ? 'Enable' : '恢复可用') : english ? 'Disable' : '禁用控件'
      }}</mp-button>
    </mp-space>
    <p role="status">{{ status }}；{{ english ? 'Committed value' : '已提交值' }}：{{ approved ?? '—' }}</p>
  </div>
</template>
