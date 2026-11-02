<!-- Source: src/themes/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/themes -->

# 主题定制

使用内置主题统一页面外观，再按需要覆盖少量 CSS 变量。主题控制配色、圆角和字体；设备边缘留白请使用 [SafeArea](#/zh-CN/safe-area)。

## 如何选择

| 需求                     | 推荐方式                                            |
| ------------------------ | --------------------------------------------------- |
| 整个应用使用一种品牌风格 | `StyleProvider.setStyleVars(Themes.maple.light)` 等 |
| 只修改一个区域或组件     | `<mp-style-provider :style-vars="…">`               |
| 查找可覆盖的变量         | 本页变量说明及各组件文档的样式变量表                |

## 案例

### 内置主题预览

在页面主题菜单中切换品牌和亮暗模式，比较同一份预约表单。输入、选择、开关和校验提示均可操作，提交仅在本地演示。

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

### 局部定制

选择一种颜色，“定制按钮”随之变化，“默认按钮”继续使用页面主题。这个例子只覆盖按钮的颜色和圆角，不修改站点全局主题。

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

### 萤火虫按钮使用场景

比较浅色页面与深色品牌区域：浅黄、浅紫文字均保留原始颜色，浅色页面使用深色按钮承托底，深色区域可直接使用透明背景。

Example source: src/themes/example/FireflyScenes.vue

```vue
<script setup>
import { ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const english = ref(false)
watchLang((value) => {
  english.value = value === 'en-US'
})

const variants = ['default', 'text', 'outline', 'tonal']
const statuses = ['primary', 'secondary']
const shared = {
  '--mp-button-primary-color': '#EAFF68',
  '--mp-button-secondary-color': '#CFC7FF',
  '--mp-button-solid-text-color': '#17224B',
  '--mp-button-primary-state-layer-color': '#CFDF26',
  '--mp-button-border-radius': '99999px',
  '--mp-button-primary-foreground-color': '#EAFF68',
  '--mp-button-primary-tonal-color': '#30391F',
  '--mp-button-primary-plain-background-color': '#17224B',
  '--mp-button-secondary-foreground-color': '#CFC7FF',
  '--mp-button-secondary-tonal-color': '#322D49',
  '--mp-button-secondary-plain-background-color': '#17224B',
}
const scenes = [
  {
    name: 'light',
    styleVars: {
      ...shared,
      '--mp-sys-color-surface-page': '#FFFFFF',
      '--mp-sys-color-content-primary': '#17224B',
      '--mp-button-focus-color': '#6754B5',
      '--mp-button-state-layer-color': '#FFFFFF',
    },
  },
  {
    name: 'dark',
    styleVars: {
      ...shared,
      '--mp-sys-color-surface-page': '#17224B',
      '--mp-sys-color-content-primary': '#FFFFFF',
      '--mp-button-focus-color': '#CFC7FF',
      '--mp-button-state-layer-color': '#17224B',
      '--mp-button-primary-plain-background-color': 'transparent',
      '--mp-button-secondary-plain-background-color': 'transparent',
    },
  },
]
</script>

<template>
  <section class="firefly-button-scenes" :aria-label="english ? 'Firefly button surfaces' : '萤火虫按钮使用场景'">
    <p>
      {{
        english
          ? 'Original yellow and lavender text stays unchanged on both page surfaces. Dark button backings provide readable contrast.'
          : '浅黄、浅紫文字在两种页面背景下都保持原始颜色；通过按钮后方的深色承托底保证可读性。'
      }}
    </p>
    <div class="firefly-button-scenes__grid">
      <mp-style-provider
        v-for="scene in scenes"
        :key="scene.name"
        :style-vars="scene.styleVars"
        class="firefly-button-scenes__panel"
        :data-surface="scene.name"
      >
        <h3>
          {{
            scene.name === 'dark'
              ? english
                ? 'Dark brand surface · original colors'
                : '深色品牌区 · 原始浅色文字'
              : english
                ? 'Light content surface · dark button backings'
                : '浅色内容区 · 按钮深色承托底'
          }}
        </h3>
        <div v-for="status in statuses" :key="status" class="firefly-button-scenes__family">
          <p>{{ status === 'primary' ? (english ? 'Yellow' : '黄色') : english ? 'Violet' : '紫色' }}</p>
          <mp-space wrap>
            <mp-button
              v-for="variant in variants"
              :key="variant"
              :status="status"
              :variant="variant"
              :data-brand-status="status"
              :data-brand-variant="variant"
              :elevation="false"
              >{{ variant }}</mp-button
            >
          </mp-space>
        </div>
      </mp-style-provider>
    </div>
  </section>
</template>

<style scoped>
.firefly-button-scenes__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 16px;
}
.firefly-button-scenes__panel {
  padding: 20px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 16px;
  background: var(--mp-sys-color-surface-page);
  color: var(--mp-sys-color-content-primary);
}
.firefly-button-scenes__panel h3 {
  margin: 0 0 20px;
  color: inherit;
  font-size: 16px;
}
.firefly-button-scenes__family + .firefly-button-scenes__family {
  margin-top: 20px;
}
.firefly-button-scenes__family p {
  margin: 0 0 12px;
  color: inherit;
  background: transparent;
}
</style>
```

### 更多组件状态

需要检查主题在不同尺寸、字段变体、禁用、只读、错误和上传状态下的表现时，再展开对应分组。控制项和恢复入口始终可用。

Example source: src/themes/example/ThemeDetails.vue

```vue
<script setup>
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import FormStates from './FormStates.vue'
</script>

<template>
  <section class="theme-details" aria-label="更多主题对照">
    <details>
      <summary>字段变体、尺寸与状态 / Field variants, sizes and states</summary>
      <p>比较描边、填充、下划线与不同尺寸；切换禁用、只读和错误状态。</p>
      <ControlSizes />
    </details>
    <details>
      <summary>选择、开关与上传 / Selection, switches and uploads</summary>
      <p>按需检查选择高亮、加载态和附件列表；上传仅在本地模拟。</p>
      <FormStates />
    </details>
  </section>
</template>

<style scoped>
.theme-details details {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: var(--mp-sys-radius-md);
}
.theme-details summary {
  cursor: pointer;
  font-weight: 600;
  line-height: 1.6;
}
</style>
```

## 在应用中使用

### 1. 选择内置主题

| 主题    | 亮色                   | 暗色                  | 风格                           |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| 默认    | `Themes.default.light` | `Themes.default.dark` | 青绿色                         |
| 枫叶    | `Themes.maple.light`   | `Themes.maple.dark`   | 红橙色                         |
| Alps    | `Themes.alps.light`    | `Themes.alps.dark`    | 深色主按钮、橙色选择控件       |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | 黄绿主按钮、深蓝文字、圆角字段 |

Alps / Firefly 亮色基于品牌样式，暗色为 Maple 适配版。品牌字体文件由业务自行加载；未加载时使用系统字体回退。

Firefly 的两组品牌按钮保留原始颜色：`primary` 为浅黄 `#EAFF68`，`secondary` 为浅紫 `#CFC7FF`。实心使用原色背景配深蓝文字；文字和描边变体使用原色文字与深蓝承托底，tonal 使用深色调背景。通过背景提供对比度，不把黄色文字改成棕色。在已有深色品牌区域内，可局部将 plain-background-color 设为 transparent，让文字与描边融入区域。选择与聚焦保持紫色，成功、警告和错误保留语义色。

```ts
import { StyleProvider, Themes } from '@maple-design/ui'

// 在应用挂载前设置，也可以在用户切换主题时再次调用。
StyleProvider.setStyleVars(Themes.maple.light)
StyleProvider.setStyleVars(Themes.maple.dark)
```

亮色对象移除 `html[maple-theme="dark"]`，暗色对象设置该属性。**每次调用替换上次注入的变量，不会累计合并。**

#### 按背景保留原始浅色文字

浅黄与浅紫文字在两种页面背景下都使用原始颜色。浅色页面由按钮自身的深色承托底保证可读；深色横幅或品牌区域可通过局部 `StyleProvider` 将承托底设为透明。悬停与按下态继续使用深色调背景，保持文字清晰。主题示例提供两种场景预览。

```vue
<script setup>
const onBrandSurface = {
  '--mp-button-primary-foreground-color': '#EAFF68',
  '--mp-button-secondary-foreground-color': '#CFC7FF',
  '--mp-button-primary-plain-background-color': 'transparent',
  '--mp-button-secondary-plain-background-color': 'transparent',
  '--mp-button-primary-tonal-color': '#30391F',
  '--mp-button-secondary-tonal-color': '#322D49',
  '--mp-button-state-layer-color': '#17224B',
  '--mp-button-focus-color': '#CFC7FF',
}
</script>

<template>
  <mp-style-provider :style-vars="onBrandSurface" style="background: #17224b; padding: 20px">
    <mp-button status="primary" variant="text">Yellow</mp-button>
    <mp-button status="secondary" variant="outline">Violet</mp-button>
  </mp-style-provider>
</template>
```

### 2. 设置页面背景和文字

组件主题与业务页面背景需要一起设置。将以下样式加入应用的全局样式：

```css
body {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. 在主题上覆盖变量

基于现有主题扩展，切换亮暗模式时分别使用对应基础对象。下面只调整按钮圆角：

```ts
StyleProvider.setStyleVars({
  ...Themes.maple.light,
  '--mp-button-border-radius': '16px',
})
```

局部定制优先覆盖实际组件变量。仅在局部修改色阶变量，不会重新计算从根节点继承的组件别名；完整规则见 [StyleProvider](#/zh-CN/style-provider)。传送到 body 的弹层需在实际挂载宿主上配置变量。

## 变量怎么找

| 层级     | 示例                                                            | 适合用途                        |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| 品牌色阶 | `--mp-primary-1` … `--mp-primary-10`                            | 构建整套品牌色板，值为 RGB 通道 |
| 语义角色 | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | 业务文字、页面背景等通用角色    |
| 组件变量 | `--mp-button-primary-color`、`--mp-button-border-radius`        | 定向调整某个组件                |

RGB 通道通过 `rgb(var(--mp-primary-6))` 使用；颜色成品值和尺寸按组件变量表填写。字体入口为 `--mp-sys-font-family`，字体文件由应用自行提供。

更多变量见 [Design Token 分层](#/zh-CN/design-tokens) 和各组件文档底部的样式变量表；表单交互见 [Form](#/zh-CN/form)。
