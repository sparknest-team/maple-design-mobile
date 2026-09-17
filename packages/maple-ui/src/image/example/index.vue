<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoCaption from './demos/caption.vue'
import DemoComponentPreviewGroup from './demos/component-preview-group.vue'
import DemoComponentPreview from './demos/component-preview.vue'
import DemoDisablePreview from './demos/disable-preview.vue'
import DemoError from './demos/error.vue'
import DemoExtra from './demos/extra.vue'
import DemoFitMode from './demos/fit-mode.vue'
import DemoHideFooterNever from './demos/hide-footer-never.vue'
import DemoImperativePreview from './demos/imperative-preview.vue'
import DemoLazy from './demos/lazy.vue'
import DemoLoader from './demos/loader.vue'
import DemoOverlayClosable from './demos/overlay-closable.vue'
import DemoPresentation from './demos/presentation.vue'
import DemoPreviewEntry from './demos/preview-entry.vue'
import DemoPreviewFeatures from './demos/preview-features.vue'
import DemoPreviewGroup from './demos/preview-group.vue'
import DemoPreviewPopupContainer from './demos/preview-popup-container.vue'
import DemoRipple from './demos/ripple.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="fit-mode">
    <app-type>{{ english ? 'Fit mode' : '填充模式' }}</app-type>
    <DemoFitMode />
  </section>
  <section data-demo="presentation">
    <app-type>{{ english ? 'Size, radius and position' : '尺寸、圆角与位置' }}</app-type>
    <DemoPresentation />
  </section>
  <section data-demo="caption">
    <app-type>{{ english ? 'Caption' : '标题与描述' }}</app-type>
    <DemoCaption />
  </section>
  <section data-demo="extra">
    <app-type>{{ english ? 'Extra footer' : '底部额外内容' }}</app-type>
    <DemoExtra />
  </section>
  <section data-demo="error">
    <app-type>{{ english ? 'Error state' : '错误状态' }}</app-type>
    <DemoError />
  </section>
  <section data-demo="hide-footer-never">
    <app-type>{{ english ? 'Keep footer on error' : '错误时仍显示 Footer' }}</app-type>
    <DemoHideFooterNever />
  </section>
  <section data-demo="loader">
    <app-type>{{ english ? 'Loading' : '加载状态' }}</app-type>
    <DemoLoader />
  </section>
  <section data-demo="lazy">
    <app-type>{{ english ? 'Lazy load and fallback' : '懒加载与回退' }}</app-type>
    <DemoLazy />
  </section>
  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple and inline' : '水波与行内' }}</app-type>
    <DemoRipple />
  </section>
  <section data-demo="disable-preview">
    <app-type>{{ english ? 'Disable preview' : '禁用预览' }}</app-type>
    <DemoDisablePreview />
  </section>
  <section data-demo="preview-entry">
    <app-type>{{ english ? 'Preview entry' : '预览入口与受控' }}</app-type>
    <DemoPreviewEntry />
  </section>
  <section data-demo="overlay-closable">
    <app-type>{{ english ? 'Close on overlay' : '点击背景层关闭' }}</app-type>
    <DemoOverlayClosable />
  </section>
  <section data-demo="preview-popup-container">
    <app-type>{{ english ? 'Popup container' : '指定挂载容器' }}</app-type>
    <DemoPreviewPopupContainer />
  </section>
  <section data-demo="preview-group">
    <app-type>{{ english ? 'Preview group' : '图片预览组' }}</app-type>
    <DemoPreviewGroup />
  </section>
  <section data-demo="component-preview-group">
    <app-type>{{ english ? 'Data-driven group' : '数据驱动预览组' }}</app-type>
    <DemoComponentPreviewGroup />
  </section>
  <section data-demo="component-preview">
    <app-type>{{ english ? 'Single preview' : '单图 Preview' }}</app-type>
    <DemoComponentPreview />
  </section>
  <section data-demo="preview-features">
    <app-type>{{ english ? 'Custom preview' : '自定义预览内容' }}</app-type>
    <DemoPreviewFeatures />
  </section>
  <section data-demo="imperative-preview">
    <app-type>{{ english ? 'Imperative preview' : '命令式预览' }}</app-type>
    <DemoImperativePreview />
  </section>
</template>
