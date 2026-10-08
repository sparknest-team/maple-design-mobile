<template>
  <div :class="n()">
    <Input ref="inputRef" v-bind="inputBindings" :type="mergedVisible ? 'text' : 'password'">
      <template v-for="slotName in forwardedSlots" #[slotName]="scope"
        ><slot :name="slotName" v-bind="scope"
      /></template>
      <template v-if="visibilityToggle || $slots.suffix" #suffix>
        <button
          v-if="visibilityToggle"
          type="button"
          :class="n('toggle')"
          :disabled="mergedDisabled"
          :aria-label="t(mergedVisible ? 'common.hidePassword' : 'common.showPassword')"
          :aria-pressed="mergedVisible"
          @mousedown.prevent
          @click="toggleVisibility"
        >
          <IconEyeInvisible v-if="mergedVisible" aria-hidden="true" />
          <IconEye v-else aria-hidden="true" />
        </button>
        <slot name="suffix" />
      </template>
    </Input>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import { IconEye, IconEyeInvisible } from '@maplejs/icons-vue'
import { useFieldLocale } from '../field-decorator/use-field-locale'
import { createNamespace } from '../utils/components'
import Input from './Input.vue'
import { inputPasswordProps, inputProps } from './props'
import { useInputForm } from './use-input-form'

defineOptions({ name: createNamespace('input-password').name, inheritAttrs: false })
const props = defineProps(inputPasswordProps)
const emit = defineEmits<{ 'visibility-change': [visible: boolean]; 'update:visibility': [visible: boolean] }>()
const { n } = createNamespace('input-password')
const { t } = useFieldLocale()
const attrs = useAttrs()
const slots = useSlots()
const inputRef = ref<InstanceType<typeof Input>>()
const localVisibility = ref(props.defaultVisibility)
const mergedVisible = computed(() => props.visibility ?? localVisibility.value)
const { mergedDisabled } = useInputForm(props)
const forwardedSlots = computed(() => Object.keys(slots).filter((name) => name !== 'suffix'))
const inputBindings = computed(() => {
  const fields: Record<string, unknown> = {}
  for (const key of Object.keys(inputProps) as (keyof typeof inputProps)[]) {
    fields[key] = props[key]
  }
  return { ...fields, ...attrs }
})

function toggleVisibility() {
  if (mergedDisabled.value) {
    return
  }
  const nextValue = !mergedVisible.value
  localVisibility.value = nextValue
  emit('visibility-change', nextValue)
  emit('update:visibility', nextValue)
}
function focus(options?: FocusOptions) {
  inputRef.value?.focus(options)
}
function blur() {
  inputRef.value?.blur()
}
function select() {
  inputRef.value?.select()
}
defineExpose({ inputRef, focus, blur, select })
</script>
