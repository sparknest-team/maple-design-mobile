<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli/client'

onThemeChange()

const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
const onResize = () => {
  width.value = window.innerWidth
}
onMounted(() => {
  width.value = window.innerWidth
  window.addEventListener('resize', onResize)
})
onUnmounted(() => window.removeEventListener('resize', onResize))

const active = computed(() => {
  const w = width.value
  if (w >= 1920) {
    return 'xl'
  }
  if (w >= 1200) {
    return 'lg'
  }
  if (w >= 992) {
    return 'md'
  }
  if (w >= 768) {
    return 'sm'
  }
  return 'base'
})

const bgItems = [
  { cls: 'mp-bg-body', style: { background: 'var(--mp-color-body)', color: 'var(--mp-color-text-1)' } },
  { cls: 'mp-bg-primary', style: { background: 'var(--mp-color-primary)', color: '#fff' } },
  { cls: 'mp-bg-info', style: { background: 'var(--mp-color-info)', color: '#fff' } },
  { cls: 'mp-bg-success', style: { background: 'var(--mp-color-success)', color: '#fff' } },
  { cls: 'mp-bg-warning', style: { background: 'var(--mp-color-warning)', color: '#fff' } },
  { cls: 'mp-bg-danger', style: { background: 'var(--mp-color-danger)', color: '#fff' } },
]

const fonts = [
  { className: 'mp-text-xs', size: 'var(--mp-font-size-xs)' },
  { className: 'mp-text-sm', size: 'var(--mp-font-size-sm)' },
  { className: 'mp-text-md', size: 'var(--mp-font-size-md)' },
  { className: 'mp-text-lg', size: 'var(--mp-font-size-lg)' },
]
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="starter-card">
      <div class="starter-title">第一张原子化卡片</div>
      <div class="starter-description">组合小类完成布局，不需要另外写组件样式。</div>
      <div class="starter-row">
        <code>mp-flex mp-items-center mp-gap-8</code>
        <span class="starter-status">Success</span>
      </div>
      <mp-button :ripple="false" class="starter-button">mp-bg-primary · hover:mp-opacity-80</mp-button>
    </div>

    <div class="mp-text-3 mp-mb-4">Preset 颜色（等价预览）</div>
    <div class="swatches">
      <div v-for="item in bgItems" :key="item.cls" class="swatch" :style="item.style">
        {{ item.cls }}
      </div>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">Preset 字号</div>
    <div v-for="f in fonts" :key="f.className" class="font-line" :style="{ fontSize: f.size }">
      <code>{{ f.className }}</code>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">数值间距 · 1 = 1px</div>
    <div class="spacing-list">
      <div class="spacing-row">
        <code>mp-p-4 · 4px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-4">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-p-8 · 8px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-8">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-p-16 · 16px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-16">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-px-24 mp-py-8 · 24px / 8px</code>
        <div class="spacing-stage"><div class="spacing-box mp-px-24 mp-py-8">内容</div></div>
      </div>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">断点 · 当前 {{ active }}</div>
    <div class="banner">mp-bg-primary · sm:info · md:warning · lg:danger · xl:success</div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">组合</div>
    <div class="combo">
      <span class="text-primary">mp-text-primary</span>
      <div class="combo-box">mp-text-md + mp-bg-primary</div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';

.demo {
  font-size: 13px;
}

.starter-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;
  background: var(--mp-color-body);
}

.starter-title {
  color: var(--mp-sys-color-content-primary);
  font-size: var(--mp-font-size-lg);
  font-weight: 600;
}

.starter-description {
  color: var(--mp-color-text-3);
}

.starter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  background: var(--mp-color-fill-2);

  code {
    color: var(--mp-color-text-2);
    font-size: 11px;
  }
}

.starter-status {
  color: var(--mp-color-success);
}

.starter-button {
  padding: 8px 16px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: var(--mp-color-primary);
  transition: opacity 0.2s;

  &:active {
    opacity: 0.8;
  }
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.swatch {
  min-width: 96px;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-size: 11px;
  border: 1px solid var(--mp-color-border-2);
}

.font-line {
  color: var(--mp-color-text-1);
  margin-bottom: 4px;

  code {
    font-size: 11px;
    color: var(--mp-color-text-3);
  }
}

.spacing-list {
  display: grid;
  gap: 12px;
}

.spacing-row {
  display: grid;
  grid-template-columns: minmax(190px, 1fr) 2fr;
  align-items: center;
  gap: 12px;
}

.spacing-stage {
  background: var(--mp-color-fill-2);
  border-radius: 4px;
}

.spacing-box {
  width: fit-content;
  color: #fff;
  background: var(--mp-color-primary);
}

/* 文档站未接入 preset 时的等价预览，业务项目由 Uno / Tailwind 生成。 */
.mp-p-4 {
  padding: 4px;
}
.mp-p-8 {
  padding: 8px;
}
.mp-p-16 {
  padding: 16px;
}
.mp-px-24 {
  padding-right: 24px;
  padding-left: 24px;
}
.mp-py-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}

@media (max-width: 480px) {
  .spacing-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.banner {
  padding: 12px;
  border-radius: 4px;
  color: #fff;
  background: var(--mp-color-primary);

  @media (min-width: 768px) {
    background: var(--mp-color-info);
  }
  @media (min-width: 992px) {
    background: var(--mp-color-warning);
  }
  @media (min-width: 1200px) {
    background: var(--mp-color-danger);
  }
  @media (min-width: 1920px) {
    background: var(--mp-color-success);
  }
}

.combo {
  padding: 12px;
  border-radius: 8px;
  background: var(--mp-color-body);
  border: 1px solid var(--mp-color-border-2);
}

.text-primary {
  color: var(--mp-sys-color-content-primary);
}

.combo-box {
  margin-top: 8px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  background: var(--mp-color-primary);
  font-size: var(--mp-font-size-md);
}
</style>
