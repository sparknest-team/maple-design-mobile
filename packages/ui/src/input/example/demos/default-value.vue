<script setup lang="ts">
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const seed = ref('A: initial text')
const instanceKey = ref(0)
const lastUpdate = ref<string | null>(null)
const updateCount = ref(0)
const controlled = ref('')
function record(value: string) {
  lastUpdate.value = value
  updateCount.value += 1
}
function remount() {
  instanceKey.value += 1
  lastUpdate.value = null
  updateCount.value = 0
}
</script>

<template>
  <div>
    <p>
      {{
        english
          ? '1. Uncontrolled: defaultValue supplies the initial text. Typing updates the component itself; the seed below stays unchanged.'
          : '1. 非受控：defaultValue 提供初始文字。输入后由组件自己保存新值，下方的默认值变量不会随之变化。'
      }}
    </p>
    <mp-input
      :key="instanceKey"
      edit-mode="direct"
      :default-value="seed"
      aria-label="Uncontrolled input"
      @update:model-value="record"
    />
    <p>
      defaultValue = <code>{{ seed }}</code>
    </p>
    <p role="status">
      update:modelValue × {{ updateCount }}; {{ english ? 'last emitted value' : '最近一次用户更新' }} =
      <code>{{ lastUpdate === null ? (english ? '(none)' : '（尚未触发）') : JSON.stringify(lastUpdate) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="seed = seed.startsWith('A:') ? 'B: new default' : 'A: initial text'">{{
        english ? 'Change defaultValue only' : '仅修改 defaultValue'
      }}</mp-button>
      <mp-button @click="remount">{{ english ? 'Remount input' : '重新挂载输入框' }}</mp-button>
    </mp-space>
    <p>
      {{
        english
          ? 'Try typing, then change defaultValue: the current text stays. Remount to read the latest defaultValue. Initialization never emits update:modelValue.'
          : '操作顺序：先输入，再修改 defaultValue，当前文字不会被覆盖；点击重新挂载后，才读取最新的默认值。初始化不会触发 update:modelValue。'
      }}
    </p>
    <p>
      {{
        english
          ? '2. Controlled: v-model is the source of truth. Its initial empty string takes precedence over defaultValue.'
          : '2. 受控：v-model 是数据来源。这里初始值为空字符串，仍优先于 defaultValue，不会自动填入默认文字。'
      }}
    </p>
    <mp-input
      v-model="controlled"
      edit-mode="direct"
      default-value="This default is ignored"
      aria-label="Controlled input"
    />
    <p role="status">
      v-model = <code>{{ JSON.stringify(controlled) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="controlled = 'Parent supplied text'">{{
        english ? 'Update parent value' : '从父级设置值'
      }}</mp-button>
      <mp-button @click="controlled = ''">{{ english ? 'Clear parent value' : '清空父级值' }}</mp-button>
    </mp-space>
    <p>
      {{
        english
          ? 'For a form, initialize the bound field in the parent. defaultValue does not write an initial value into the parent form.'
          : '表单需要初始值时，请初始化父级绑定字段。defaultValue 不会把初始值写入父级表单。'
      }}
    </p>
  </div>
</template>
