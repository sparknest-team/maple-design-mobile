<script setup>
import { computed, ref, watch } from 'vue'
import { Themes } from '@maple-design/ui-vue'

const props = defineProps({ dark: Boolean })
const mode = computed(() => (props.dark ? 'dark' : 'light'))
const background = ref('light')
watch(
  mode,
  () => {
    background.value = mode.value === 'dark' ? 'navy' : 'light'
  },
  { immediate: true },
)
const variants = ['default', 'text', 'outline', 'tonal']
const roles = [
  { status: 'primary', label: '黄色主行动' },
  { status: 'secondary', label: '中性次级操作' },
  { status: 'tertiary', label: '紫色辅助品牌' },
]
const backgrounds = [
  { label: '深蓝', value: 'navy', color: '#17224B', text: '#FFFFFF' },
  { label: '白色', value: 'light', color: '#FFFFFF', text: '#17224B' },
  { label: '浅灰', value: 'muted', color: '#F5F5F5', text: '#17224B' },
  { label: '深灰', value: 'dark', color: '#252525', text: '#FFFFFF' },
]
// Read the actual preset so this example cannot silently redefine secondary as violet.
const palette = computed(() => Themes.firefly[mode.value])
const cardVars = computed(() => {
  const surface = backgrounds.find((item) => item.value === background.value)
  return {
    ...palette.value,
    '--mp-sys-color-surface-page': surface.color,
    '--mp-sys-color-content-primary': surface.text,
    '--mp-button-state-layer-color': surface.color,
  }
})
const interactionVars = computed(() => ({
  ...palette.value,
  // Public aliases inherited from the document must also be set for a local preset.
  '--mp-link-text-color': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-primary': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-hover': palette.value['--mp-link-primary-color'],
  '--mp-link-text-color-active': palette.value['--mp-link-primary-color'],
}))
const service = ref('drive')
const agreement = ref(true)
const reminder = ref(true)
const level = ref(60)
const contact = ref('')
</script>

<template>
  <section class="firefly-button-scenes" aria-label="萤火虫品牌角色">
    <p>
      primary 为黄色主行动，secondary 为中性次级，tertiary
      为紫色辅助。切换整张卡片背景对照文字与描边按钮；黄色文字适合深色背景。
    </p>
    <mp-form-item layout="vertical" size="sm" label="卡片背景">
      <mp-radio-group v-model="background" aria-label="卡片背景" :options="backgrounds" variant="button" size="sm" />
    </mp-form-item>
    <mp-theme-provider :style-vars="cardVars" class="firefly-button-scenes__panel" :data-surface="background">
      <div v-for="role in roles" :key="role.status" class="firefly-button-scenes__family">
        <p>{{ role.label }} / {{ role.status }}</p>
        <mp-space wrap>
          <mp-button
            v-for="variant in variants"
            :key="variant"
            :status="role.status"
            :variant="variant"
            :data-brand-status="role.status"
            :data-brand-variant="variant"
            :elevation="false"
            >{{ variant }}</mp-button
          >
        </mp-space>
      </div>
    </mp-theme-provider>
    <mp-theme-provider :style-vars="interactionVars" class="firefly-interactions">
      <h3>紫色选择与焦点反馈</h3>
      <mp-space direction="column" block align="stretch" :size="16">
        <mp-radio-group v-model="service" aria-label="体验项目选择">
          <mp-radio value="drive">预约试驾</mp-radio>
          <mp-radio value="visit">到店体验</mp-radio>
        </mp-radio-group>
        <mp-checkbox v-model="agreement">接收服务信息</mp-checkbox>
        <mp-switch v-model="reminder" aria-label="体验提醒" />
        <mp-slider v-model="level" aria-label="偏好程度" />
        <mp-input v-model="contact" aria-label="萤火虫焦点示例" placeholder="点击输入，查看紫色焦点边框" />
        <mp-link status="primary">查看服务详情</mp-link>
      </mp-space>
    </mp-theme-provider>
  </section>
</template>

<style scoped>
.firefly-button-scenes__panel,
.firefly-interactions {
  margin-top: 16px;
  padding: 20px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 16px;
  background: var(--mp-sys-color-surface-page);
  color: var(--mp-sys-color-content-primary);
}
.firefly-button-scenes__family + .firefly-button-scenes__family {
  margin-top: 20px;
}
.firefly-button-scenes__family p,
.firefly-interactions h3 {
  margin: 0 0 12px;
  color: inherit;
  background: transparent;
}
</style>
