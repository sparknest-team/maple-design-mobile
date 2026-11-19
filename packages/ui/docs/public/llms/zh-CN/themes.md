<!-- Source: src/themes/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/themes -->

# 主题定制

使用内置主题统一页面外观，再按需要覆盖少量 CSS 变量。主题控制配色、圆角和字体；设备边缘留白请使用 [SafeArea](#/zh-CN/safe-area)。

统一管理主题与 CSS 变量。包裹整个应用时是应用全局主题，包裹子树时是局部主题；两者使用相同的继承规则，不修改 html，也不会影响其他应用根节点。

## 如何选择

| 需求                     | 推荐方式                                            |
| ------------------------ | --------------------------------------------------- |
| 整个应用使用一种品牌风格 | `<mp-theme-provider :theme="Themes.maple[mode]">` |
| 只修改一个区域或组件     | `<mp-theme-provider :style-vars="…">`               |
| 查找可覆盖的变量         | 本页变量说明及各组件文档的样式变量表                |

## 基础示例

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

## 局部主题与定制

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
    <mp-radio-group v-model="color" orientation="horizontal">
      <mp-radio value="#6750a4">紫色 / Purple</mp-radio>
      <mp-radio value="#006b5f">青色 / Teal</mp-radio>
      <mp-radio value="#2456a6">蓝色 / Blue</mp-radio>
    </mp-radio-group>
    <div class="local-theme-demo__compare">
      <div>
        <p>跟随页面 / Page theme</p>
        <mp-button status="primary">默认按钮 / Default</mp-button>
      </div>
      <mp-theme-provider :style-vars="styleVars">
        <p>局部覆盖 / Local override</p>
        <mp-button status="primary">定制按钮 / Custom</mp-button>
      </mp-theme-provider>
    </div>
  </section>
</template>

<style scoped>
.local-theme-demo__compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>
```

## 品牌与状态对照

### 萤火虫按钮使用场景

沿用现有 status × variant API：黄色 primary、中性 secondary、紫色 tertiary。切换卡片背景对照透明按钮，再操作单选、多选、开关、滑块、输入框和链接，查看紫色交互反馈。

Example source: src/themes/example/FireflyScenes.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { watchTheme } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import { Themes } from '@maple-design/ui-vue'

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
```

## ThemeProvider 示例

### 变量覆盖

Example source: src/theme-provider/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>

<template>
  <div>
    <mp-button variant="outline" @click="active = !active">切换局部变量 / Toggle local variables</mp-button>
    <mp-theme-provider tag="section" :style-vars="active ? { '--mp-demo-color': 'teal' } : null">
      <p style="color: var(--mp-demo-color, currentColor)">局部颜色 / Local color</p>
      <mp-theme-provider :style-vars="{ '--mp-demo-color': 'coral' }">
        <p style="color: var(--mp-demo-color)">嵌套覆盖 / Nested override</p>
      </mp-theme-provider>
    </mp-theme-provider>
    <p>外部不受影响 / Outside remains unchanged</p>
  </div>
</template>
```

### 根部与嵌套

Example source: src/theme-provider/example/demos/local-theme.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('dark')
</script>
<template>
  <div>
    <mp-button @click="theme = theme === 'dark' ? 'light' : 'dark'">切换局部主题 / Toggle local theme</mp-button>
    <mp-theme-provider :theme="theme" class="theme-region">
      <p>外层主题 / Outer: {{ theme }}</p>
      <mp-button status="primary">主题按钮 / Themed button</mp-button>
      <mp-select :options="[{ label: 'Body popup inherits theme', value: 1 }]" placeholder="打开弹层 / Open popup" />
      <mp-theme-provider theme="light" class="theme-region">
        <p>嵌套亮色 / Nested light</p>
        <mp-button variant="outline">亮色按钮 / Light button</mp-button>
      </mp-theme-provider>
    </mp-theme-provider>
    <p>外部保持原主题 / Outside is unchanged</p>
  </div>
</template>
<style scoped>
.theme-region {
  margin-top: 16px;
  padding: 16px;
  color: var(--mp-color-text-1);
  background: var(--mp-color-bg-2);
  border: 1px solid var(--mp-color-border-2);
}
</style>
```

```vue
<template>
  <mp-theme-provider :theme="mode">
    <App />
    <mp-theme-provider theme="light">
      <Preview />
    </mp-theme-provider>
  </mp-theme-provider>
</template>
```

`theme` 支持 light/dark 或 Themes 预设对象；省略时继承外层。显式主题替换继承的预设，style-vars 定制仍向内继承。`style-vars` 覆盖主题默认变量，内层同名变量优先，null 清除本层覆盖。显式主题边界会重新计算已加载组件的变量别名。Provider 保留真实包裹元素，可通过 tag 修改；放入已有 Flex/Grid 布局时，可选择合适容器或设置 display: contents。

库内声明式菜单、对话框和浮动内容通过 Vue 上下文继承所属 Provider，挂到 body、自定义 popup-container 或行内都适用。脱离 Provider 创建的命令式服务需要将 popup-container 指向主题区域；第三方 Teleport 需要自行放置主题宿主。跨文档目标需加载该库样式。

## 在应用中使用

### 1. 选择内置主题

| 主题    | 亮色                   | 暗色                  | 风格                           |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| 默认    | `Themes.default.light` | `Themes.default.dark` | 青绿色                         |
| 枫叶    | `Themes.maple.light`   | `Themes.maple.dark`   | 红橙色                         |
| Alps    | `Themes.alps.light`    | `Themes.alps.dark`    | 深色主按钮、橙色选择控件       |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | 黄绿主按钮、深蓝文字、圆角字段 |

Alps / Firefly 亮色基于品牌样式，暗色为 Maple 适配版。品牌字体文件由业务自行加载；未加载时使用系统字体回退。


#### Firefly 的颜色角色与现有 API

| 用途               | Maple 写法                            | Horo 对应角色   |
| ------------------ | ------------------------------------- | --------------- |
| 黄色实心主行动     | `status="primary" variant="default"`  | primary         |
| 中性次级操作       | `status="secondary"`                  | secondary       |
| 紫色辅助实心       | `status="tertiary" variant="default"` | tertiary，仅 FY |
| 紫色文字操作       | `status="tertiary" variant="text"`    | text            |
| 中性文字操作       | `status="default" variant="text"`     | text_secondary  |
| 深色区域的黄色文字 | `status="primary" variant="text"`     | text_bg         |

黄色主色保持 `#EAFF68`。辅助紫色填充使用 `#CFC7FF`，亮色文字使用 `#9A89EB`；secondary 是中性色，不代表紫色。text/outline 保持透明，不给按钮额外加承托底。示例通过整张卡片的背景切换比较场景；原始亮色文字不应视为在所有浅色背景上都满足对比度要求。

选择、焦点、滑块、日期范围与强调链接使用辅助紫色；正文和普通页面强调保留深色文字的可读性适配。tonal 和暗色是 Maple 在现有 API 上的扩展，不声称是 Horo 原始暗色样本。

### 2. 设置页面背景和文字

组件主题与业务页面背景需要一起设置。将以下样式应用于 ThemeProvider 内包裹页面的元素：

```css
.app-page {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. 在主题上覆盖变量

基于现有主题扩展，切换亮暗模式时分别使用对应基础对象。下面只调整按钮圆角：

```vue
<script setup>
import { ref } from 'vue'
import { Themes } from '@maple-design/ui-vue'
const mode = ref('dark')
</script>
<template>
  <mp-theme-provider :theme="Themes.maple[mode]" :style-vars="{ '--mp-button-border-radius': '12px' }">
    <App />
  </mp-theme-provider>
</template>
```

## 尺寸单位转换

`Themes.toRem(theme, { rootFontSize, unitPrecision })` 和 `Themes.toViewport(theme, { viewportWidth, viewportUnit, unitPrecision })` 返回新对象，默认分别以 16px 和 375px 为基准，精度为 6，视口单位为 `vmin`。基准必须是有限正数，精度必须是 0–100 的整数，视口单位必须是 CSS 视口单位；无效选项抛出 `RangeError`。

`Themes.convert(theme, converter)` 对值中的 `px` 数字进行文本替换，回调收到带符号的数字字符串，返回替换文本。它不是 CSS 解析器，字符串和 URL 中匹配的文本也会替换；请仅传入适合转换的尺寸变量。

## 变量怎么找

| 层级     | 示例                                                            | 适合用途                        |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| 品牌色阶 | `--mp-primary-1` … `--mp-primary-10`                            | 构建整套品牌色板，值为 RGB 通道 |
| 语义角色 | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | 业务文字、页面背景等通用角色    |
| 组件变量 | `--mp-button-primary-color`、`--mp-button-border-radius`        | 定向调整某个组件                |

RGB 通道通过 `rgb(var(--mp-primary-6))` 使用；颜色成品值和尺寸按组件变量表填写。字体入口为 `--mp-sys-font-family`，字体文件由应用自行提供。

更多变量见 [Design Token 分层](#/zh-CN/design-tokens) 和各组件文档底部的样式变量表；表单交互见 [Form](#/zh-CN/form)。

## 安装与默认值

```ts
import { ThemeProvider } from '@maple-design/ui-vue'
app.use(ThemeProvider)
ThemeProvider.setPropsDefaults({ theme: 'light', tag: 'section', styleVars: () => ({}) })
```

默认值用于之后创建的实例，显式 Props 优先。对象变量为每个实例复制；SSR 输出与客户端相同的主题边界，不持有跨请求的主题状态。

## API

### ThemeProvider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 亮暗模式或主题预设，省略时继承 | `ThemeProviderTheme` | — |
| style-vars | 本层 CSS 变量，null 清空覆盖 | `StyleVars \| null` | `{}` |
| tag | 包裹元素标签 | `string` | `'div'` |

默认插槽为组件内容，无事件。

## Types

导出 ThemeProvider、themeProviderProps、ThemeProviderProps、ThemeProviderInstance、ThemeProviderDefaults、ThemeProviderTheme、ThemeProviderMode、StyleVarName、StyleVars。变量支持完整 --mp- 名称及库前缀驼峰名称；值为 CSS 字符串，尺寸需要单位。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
