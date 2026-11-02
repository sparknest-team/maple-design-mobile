<!-- Source: docs/showcaseThemes.zh-CN.md; locale: zh-CN; page: /zh-CN/showcaseThemes -->

# 主题与品牌

比较品牌表单和局部主题覆盖，再从站点主题菜单切换亮暗。

Example source: src/themes/example/BrandForm.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const model = reactive({ name: '', city: 'shanghai', notice: true, service: 'test-drive', note: '' })
const result = ref('')
const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' },
]
</script>

<template>
  <section class="theme-form-preview" aria-label="主题表单预览">
    <h2>预约试驾</h2>
    <p>切换主题，比较按钮、输入框、选择控件和文字的外观。</p>
    <mp-form :model="model" layout="vertical" @submit-success="result = '预约信息校验通过（本地演示）'">
      <mp-form-item field="name" label="联系人" required>
        <mp-input v-model="model.name" aria-label="联系人" placeholder="请输入姓名" clearable />
      </mp-form-item>
      <mp-form-item field="city" label="体验城市">
        <mp-select v-model="model.city" :options="cities" aria-label="体验城市" />
      </mp-form-item>
      <mp-form-item field="service" label="体验项目">
        <mp-radio-group v-model="model.service">
          <mp-radio value="test-drive">试驾</mp-radio>
          <mp-radio value="visit">到店体验</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="note" label="备注">
        <mp-textarea v-model="model.note" aria-label="备注" placeholder="其他体验需求" />
      </mp-form-item>
      <mp-form-item field="notice" label="预约提醒">
        <mp-switch v-model="model.notice" aria-label="预约提醒" />
      </mp-form-item>
      <mp-button status="primary" block html-type="submit">提交预约</mp-button>
      <p v-if="result" role="status">{{ result }}</p>
    </mp-form>
  </section>
</template>

<style scoped>
.theme-form-preview {
  min-width: 0;
  color: var(--mp-sys-color-content-primary);
  background: var(--mp-sys-color-surface-page);
}
</style>
```

Example source: src/themes/example/LocalTheme.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const color = ref('#6750a4')
const styleVars = computed(() => ({
  '--mp-button-primary-color': color.value,
  '--mp-button-primary-foreground-color': '#ffffff',
  '--mp-button-border-radius': '16px',
}))
</script>

<template>
  <section class="local-theme-demo" aria-label="局部主题覆盖">
    <mp-radio-group v-model="color" direction="row">
      <mp-radio value="#6750a4">紫色 / Purple</mp-radio>
      <mp-radio value="#006b5f">青色 / Teal</mp-radio>
      <mp-radio value="#2456a6">蓝色 / Blue</mp-radio>
    </mp-radio-group>
    <div class="local-theme-demo__compare">
      <div>
        <p>跟随页面 / Page theme</p>
        <mp-button status="primary">默认按钮 / Default</mp-button>
      </div>
      <mp-style-provider :style-vars="styleVars">
        <p>局部覆盖 / Local override</p>
        <mp-button status="primary">定制按钮 / Custom</mp-button>
      </mp-style-provider>
    </div>
  </section>
</template>

<style scoped>
.local-theme-demo__compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
```
