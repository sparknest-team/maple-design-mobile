<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ClipboardDemo from './demos/clipboard.vue'
import CustomSurfaceDemo from './demos/custom-surface.vue'
import DialogUploadDemo from './demos/dialog-upload.vue'
import DirectoryDemo from './demos/directory.vue'
import DraggablePictureDemo from './demos/draggable-picture.vue'
import ClipboardDemoEn from './demos/en-US/clipboard.vue'
import CustomSurfaceDemoEn from './demos/en-US/custom-surface.vue'
import DialogUploadDemoEn from './demos/en-US/dialog-upload.vue'
import DirectoryDemoEn from './demos/en-US/directory.vue'
import DraggablePictureDemoEn from './demos/en-US/draggable-picture.vue'
import ExternalStateDemoEn from './demos/en-US/external-state.vue'
import ExternalTriggerDemoEn from './demos/en-US/external-trigger.vue'
import ListTypeDemoEn from './demos/en-US/list-type.vue'
import ManualUploadDemoEn from './demos/en-US/manual-upload.vue'
import PictureLimitsDemoEn from './demos/en-US/picture-limits.vue'
import PreviewDemoEn from './demos/en-US/preview.vue'
import ReadOnlyDemoEn from './demos/en-US/read-only.vue'
import RemoveConfirmDemoEn from './demos/en-US/remove-confirm.vue'
import ReplacementDemoEn from './demos/en-US/replacement.vue'
import StatesDemoEn from './demos/en-US/states.vue'
import TriggerPositionDemoEn from './demos/en-US/trigger-position.vue'
import ExternalStateDemo from './demos/external-state.vue'
import ExternalTriggerDemo from './demos/external-trigger.vue'
import ListTypeDemo from './demos/list-type.vue'
import ManualUploadDemo from './demos/manual-upload.vue'
import PictureLimitsDemo from './demos/picture-limits.vue'
import PreviewDemo from './demos/preview.vue'
import ReadOnlyDemo from './demos/read-only.vue'
import RemoveConfirmDemo from './demos/remove-confirm.vue'
import ReplacementDemo from './demos/replacement.vue'
import StatesDemo from './demos/states.vue'
import TriggerPositionDemo from './demos/trigger-position.vue'

const route = useRoute()
const english = computed(() => route.query.language === 'en-US' || route.path.startsWith('/en-US/'))
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="upload">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="read-only">
    <h3>{{ english ? 'Basic usage' : '基础用法' }}</h3>
    <component :is="english ? ReadOnlyDemoEn : ReadOnlyDemo" />
  </section>

  <section data-demo="list-type">
    <h3>{{ english ? 'List types' : '列表展示方式' }}</h3>
    <component :is="english ? ListTypeDemoEn : ListTypeDemo" />
  </section>

  <section data-demo="trigger-position">
    <h3>{{ english ? 'Upload trigger position' : '上传入口位置' }}</h3>
    <component :is="english ? TriggerPositionDemoEn : TriggerPositionDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="selection-and-validation">
    <span lang="zh-CN">选择与校验</span>
    <span lang="en-US">Selection and validation</span>
  </h2>

  <section data-demo="draggable-picture">
    <h3>{{ english ? 'Drag and drop' : '拖拽上传' }}</h3>
    <component :is="english ? DraggablePictureDemoEn : DraggablePictureDemo" />
  </section>

  <section data-demo="picture-limits">
    <h3>{{ english ? 'File validation' : '文件类型、数量与大小' }}</h3>
    <component :is="english ? PictureLimitsDemoEn : PictureLimitsDemo" />
  </section>

  <section data-demo="replacement">
    <h3>{{ english ? 'Single file and replacement' : '单文件与替换' }}</h3>
    <component :is="english ? ReplacementDemoEn : ReplacementDemo" />
  </section>

  <section data-demo="directory">
    <h3>{{ english ? 'Select a directory' : '选择文件夹' }}</h3>
    <component :is="english ? DirectoryDemoEn : DirectoryDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="preview-and-states">
    <span lang="zh-CN">预览与状态</span>
    <span lang="en-US">Preview and states</span>
  </h2>

  <section data-demo="preview">
    <h3>{{ english ? 'Image and video preview' : '图片与视频预览' }}</h3>
    <component :is="english ? PreviewDemoEn : PreviewDemo" />
  </section>

  <section data-demo="states">
    <h3>{{ english ? 'Readonly, disabled and reading mode' : '只读、禁用与纯阅读' }}</h3>
    <component :is="english ? StatesDemoEn : StatesDemo" />
  </section>

  <section data-demo="custom-surface">
    <h3>{{ english ? 'Custom trigger and preview' : '自定义入口与预览' }}</h3>
    <component :is="english ? CustomSurfaceDemoEn : CustomSurfaceDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="upload-workflow">
    <span lang="zh-CN">上传流程</span>
    <span lang="en-US">Upload workflow</span>
  </h2>

  <section data-demo="manual-upload">
    <h3>{{ english ? 'Manual upload, progress and retry' : '手动上传、进度与重试' }}</h3>
    <component :is="english ? ManualUploadDemoEn : ManualUploadDemo" />
  </section>

  <section data-demo="remove-confirm">
    <h3>{{ english ? 'Confirm before removing' : '删除前确认' }}</h3>
    <component :is="english ? RemoveConfirmDemoEn : RemoveConfirmDemo" />
  </section>

  <section data-demo="external-state">
    <h3>{{ english ? 'Externally managed upload state' : '由业务管理上传状态' }}</h3>
    <component :is="english ? ExternalStateDemoEn : ExternalStateDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="composed-examples">
    <span lang="zh-CN">业务组合</span>
    <span lang="en-US">Composed examples</span>
  </h2>

  <section data-demo="external-trigger">
    <h3>{{ english ? 'External upload button' : '外置上传按钮' }}</h3>
    <component :is="english ? ExternalTriggerDemoEn : ExternalTriggerDemo" />
  </section>

  <section data-demo="dialog-upload">
    <h3>{{ english ? 'Upload in a Dialog' : 'Dialog 中上传' }}</h3>
    <component :is="english ? DialogUploadDemoEn : DialogUploadDemo" />
  </section>

  <section data-demo="clipboard">
    <h3>{{ english ? 'Paste clipboard images' : '接入剪贴板图片' }}</h3>
    <component :is="english ? ClipboardDemoEn : ClipboardDemo" />
  </section>
</template>
<style scoped>
section {
  padding: 16px;
  border-bottom: 1px solid var(--mp-sys-color-border-default);
}
h3 {
  margin: 0 0 12px;
  font-size: 14px;
}
</style>
