<script setup>
import { computed, ref } from 'vue'
import { watchLang, watchTheme } from '@maple-design/cli/client'
import { Themes } from '@maple-design/ui'

const english = ref(false)
watchLang((value) => {
  english.value = value === 'en-US'
})
const mode = ref('light')
const background = ref('light')
watchTheme((theme) => {
  mode.value = theme.toLowerCase().includes('dark') ? 'dark' : 'light'
  background.value = mode.value === 'dark' ? 'navy' : 'light'
})
const variants = ['default', 'text', 'outline', 'tonal']
const roles = [
  { status: 'primary', label: '黄色主行动', labelEn: 'Yellow primary action' },
  { status: 'secondary', label: '中性次级操作', labelEn: 'Neutral secondary action' },
  { status: 'tertiary', label: '紫色辅助品牌', labelEn: 'Violet auxiliary brand' },
]
const backgrounds = [
  { label: 'Navy / 深蓝', value: 'navy', color: '#17224B', text: '#FFFFFF' },
  { label: 'White / 白色', value: 'light', color: '#FFFFFF', text: '#17224B' },
  { label: 'Light gray / 浅灰', value: 'muted', color: '#F5F5F5', text: '#17224B' },
  { label: 'Dark gray / 深灰', value: 'dark', color: '#252525', text: '#FFFFFF' },
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
  <section class="firefly-button-scenes" :aria-label="english ? 'Firefly brand roles' : '萤火虫品牌角色'">
    <p>
      {{
        english
          ? 'Primary is yellow, secondary is neutral, and tertiary is violet. Switch the card background to compare transparent text and outline buttons; yellow text belongs on dark surfaces.'
          : 'primary 为黄色主行动，secondary 为中性次级，tertiary 为紫色辅助。切换整张卡片背景对照文字与描边按钮；黄色文字适合深色背景。'
      }}
    </p>
    <mp-form-item layout="vertical" size="sm" :label="english ? 'Card background' : '卡片背景'">
      <mp-radio-group
        v-model="background"
        :aria-label="english ? 'Card background' : '卡片背景'"
        :options="backgrounds"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-theme-provider :style-vars="cardVars" class="firefly-button-scenes__panel" :data-surface="background">
      <div v-for="role in roles" :key="role.status" class="firefly-button-scenes__family">
        <p>{{ english ? role.labelEn : role.label }} / {{ role.status }}</p>
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
      <h3>{{ english ? 'Violet selection and focus' : '紫色选择与焦点反馈' }}</h3>
      <mp-space direction="column" block align="stretch" :size="16">
        <mp-radio-group v-model="service" :aria-label="english ? 'Service selection' : '体验项目选择'">
          <mp-radio value="drive">{{ english ? 'Test drive' : '预约试驾' }}</mp-radio>
          <mp-radio value="visit">{{ english ? 'Visit' : '到店体验' }}</mp-radio>
        </mp-radio-group>
        <mp-checkbox v-model="agreement">{{ english ? 'Receive service updates' : '接收服务信息' }}</mp-checkbox>
        <mp-switch v-model="reminder" :aria-label="english ? 'Service reminder' : '体验提醒'" />
        <mp-slider v-model="level" :aria-label="english ? 'Preference level' : '偏好程度'" />
        <mp-input
          v-model="contact"
          :aria-label="english ? 'Firefly focus example' : '萤火虫焦点示例'"
          :placeholder="english ? 'Focus to see the violet border' : '点击输入，查看紫色焦点边框'"
        />
        <mp-link status="primary">{{ english ? 'View service details' : '查看服务详情' }}</mp-link>
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
