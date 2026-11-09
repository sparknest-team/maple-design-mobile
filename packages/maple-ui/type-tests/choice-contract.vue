<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxGroup, Radio, RadioGroup } from '@maple-design/ui'
import type { RadioModel } from '@maple-design/ui'

const checked = ref<boolean | null>(null),
  selected = ref<(string | number | boolean)[] | null>(null),
  radio = ref<RadioModel>(null)
function failed(error: unknown) {
  void error
}
function opened(value: boolean) {
  void value
}
</script>
<template>
  <Checkbox v-model="checked" @open-change="opened"
    ><template #default="{ checked }">{{ checked ? 'On' : 'Off' }}</template
    ><template #read="{ value, text }">{{ value }} {{ text }}</template></Checkbox
  >
  <CheckboxGroup v-model="selected" :max="0"
    ><template #read="{ value, text }">{{ value?.length }} {{ text }}</template></CheckboxGroup
  >
  <Radio v-model="radio" value="a"
    ><template #radio="{ checked, disabled }">{{ checked }} {{ disabled }}</template
    ><template #read="{ value, text }">{{ value }} {{ text }}</template></Radio
  >
  <RadioGroup v-model="radio" @load-error="failed"
    ><template #label="{ data, checked }">{{ data.value }} {{ checked }}</template
    ><template #read="{ value, text }">{{ value }} {{ text }}</template></RadioGroup
  >
</template>
