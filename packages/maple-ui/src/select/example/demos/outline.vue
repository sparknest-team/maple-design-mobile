<script setup>
import { computed, ref } from 'vue'

const outlineValue = ref()
const outlineValue2 = ref()
const outlineValue3 = ref()
const outlineValue4 = ref()
const outlineValue5 = ref()
const outlineValue6 = ref()
const outlineValue7 = ref()
const outlineValue8 = ref()
const outlineValue9 = ref([])
const outlineValue10 = ref([])
const outlineValue13 = ref()
const outlineValue14 = ref()
const outlineValue15 = ref([])
const outlineValue16 = ref()
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
const keyOptions = computed(() => [
  {
    name: '吃饭',
    id: 1,
  },
  {
    name: '睡觉',
    id: 2,
  },
  {
    name: '打游戏',
    id: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="['6vmin', 0]">
    <mp-select v-model="outlineValue" variant="outline" placeholder="请选择一个选项">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue2" variant="outline" placeholder="文本关联值">
      <mp-option label="吃饭" :value="1" />
      <mp-option label="睡觉" :value="2" />
    </mp-select>
    <div class="relation">当前选择的是: {{ outlineValue2 }}</div>
    <mp-select v-model="outlineValue3" variant="outline" placeholder="只读" readonly>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue4" variant="outline" placeholder="禁用" disabled>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue5" variant="outline" placeholder="可清除" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue6" variant="outline" placeholder="使用插槽自定义清除图标" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>
    <mp-select v-model="outlineValue7" variant="outline" placeholder="自定义图标">
      <template #default>
        <mp-option label="吃饭">
          <m-icon-cake-variant class="selected-icon" />
          <span>吃饭</span>
        </mp-option>
        <mp-option label="睡觉">
          <m-icon-weather-night class="selected-icon" />
          <span>睡觉</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlineValue7 === '吃饭'" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ outlineValue7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="outlineValue8" variant="outline" placeholder="自定义图标尺寸">
      <template #default>
        <mp-option label="吃饭">
          <m-icon-cake-variant class="selected-icon" />
          <span>吃饭</span>
        </mp-option>
        <mp-option label="睡觉">
          <m-icon-weather-night class="selected-icon" />
          <span>睡觉</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlineValue8 === '吃饭'" class="selected-icon" size="8vmin" />
        <m-icon-weather-night v-else class="selected-icon" size="8vmin" />
        <span>{{ outlineValue8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="outlineValue9" variant="outline" placeholder="多选" multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
    <mp-select v-model="outlineValue10" variant="outline" placeholder="标签风格的多选" show-tags multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
    <mp-select v-model="outlineValue13" variant="outline" size="sm" placeholder="小尺寸">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue14" variant="outline" placeholder="选项式 API" :options="options" />
    <mp-select
      v-model="outlineValue15"
      variant="outline"
      placeholder="选项式 API（多选）"
      :options="options"
      multiple
    />
    <mp-select
      v-model="outlineValue16"
      variant="outline"
      placeholder="自定义字段"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>
</template>

<style lang="less" scoped>
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
