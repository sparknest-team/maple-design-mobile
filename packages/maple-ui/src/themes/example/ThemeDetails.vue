<script setup>
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import FormStates from './FormStates.vue'
</script>

<template>
  <section class="theme-details" aria-label="更多主题对照">
    <mp-collapse>
      <mp-collapse-item title="字段变体、尺寸与状态 / Field variants, sizes and states" name="fields">
        <p>比较描边、填充、下划线与不同尺寸；切换禁用、只读和错误状态。</p>
        <ControlSizes />
      </mp-collapse-item>
      <mp-collapse-item title="选择、开关与上传 / Selection, switches and uploads" name="selection">
        <p>按需检查选择高亮、加载态和附件列表；上传仅在本地模拟。</p>
        <FormStates />
      </mp-collapse-item>
    </mp-collapse>
  </section>
</template>
