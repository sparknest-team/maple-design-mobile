# Button

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 八种主题色

```html
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="status in statuses" :key="status" :status="status">{{ status }}</mp-button>
  </div>
</template>
```

### 四种变体

```html
<script setup lang="ts">
import { ref } from 'vue'
const variants = ['default', 'text', 'outline', 'tonal'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const variant = ref<typeof variants[number]>('default')
const component = ref<'button' | 'a'>('button')
const disabled = ref(false)
const loading = ref(false)
const clicks = ref(0)
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control"><span class="demo-label">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Variant</span><mp-radio-group v-model="variant"><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Tag</span><mp-radio-group v-model="component"><mp-radio value="button">button</mp-radio><mp-radio value="a">a</mp-radio></mp-radio-group></div>
      <div class="demo-toggles"><span class="demo-toggle"><mp-switch v-model="disabled" aria-label="Disabled" />Disabled</span><span class="demo-toggle"><mp-switch v-model="loading" aria-label="Loading" />Loading</span></div>
    </div>
    <div class="demo-preview" data-button-preview>
      <mp-button v-for="status in statuses" :key="status" :variant="variant" :status="status" :size="size" :component="component" :disabled="disabled" :loading="loading" @click="clicks++">{{ status }}</mp-button>
    </div>
    <div aria-live="polite">Clicks: {{ clicks }}</div>
  </div>
</template>

<style scoped>
.demo-panel { display: grid; gap: 20px; }
.demo-controls { display: grid; gap: 16px; }
.demo-control { display: grid; gap: 8px; }
.demo-label { font-size: 13px; opacity: .7; }
.demo-toggles, .demo-preview { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.demo-toggle { display: inline-flex; align-items: center; gap: 8px; }
.demo-preview { min-height: 64px; padding-block: 8px; }
</style>
```

### 五档尺寸

```html
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px">
    <mp-button v-for="size in sizes" :key="size" :size="size">{{ size }}</mp-button>
  </div>
</template>
```

### 禁用与链接拦截

```html
<script setup lang="ts">
import { ref } from 'vue'
const clicks = ref(0)
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button disabled @click="clicks++">Disabled button</mp-button>
    <mp-button component="a" href="#blocked-button-link" disabled @click="clicks++">Disabled link</mp-button>
    <mp-button component="a" href="#blocked-button-link" loading @click="clicks++">Loading link</mp-button>
  </div>
  <p aria-live="polite">Blocked clicks: {{ clicks }}</p>
</template>
```

### 加载布局与动画

```html
<script setup lang="ts">
import { ref } from 'vue'
const modes = ['default', 'fill', 'line'] as const
const types = ['circle', 'wave', 'cube', 'rect', 'disappear'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 20] as const
const size = ref<typeof sizes[number]>('sm')
const mode = ref<typeof modes[number]>('default')
const variant = ref<typeof variants[number]>('default')
</script>
<template>
  <div class="demo-panel">
    <div class="demo-controls">
      <div class="demo-control"><span class="demo-label">Loading size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ typeof value === 'number' ? `${value}px` : value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Loading mode</span><mp-radio-group v-model="mode"><mp-radio v-for="value in modes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
      <div class="demo-control"><span class="demo-label">Variant</span><mp-radio-group v-model="variant"><mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
    </div>
    <div class="demo-preview" :data-loading-size="size">
      <mp-button v-for="type in types" :key="type" loading :size="size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : 'md'" :loading-type="type" :loading-size="size" :loading-mode="mode" :variant="variant" status="primary">{{ type }}</mp-button>
    </div>
    <div class="demo-control"><span class="demo-label">Custom color / radius</span><div><mp-button loading loading-color="#e05279" :loading-radius="8">Custom spinner</mp-button></div></div>
  </div>
</template>

<style scoped>
.demo-panel { display: grid; gap: 20px; }
.demo-controls { display: grid; gap: 16px; }
.demo-control { display: grid; gap: 8px; }
.demo-label { font-size: 13px; opacity: .7; }
.demo-toggles, .demo-preview { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.demo-toggle { display: inline-flex; align-items: center; gap: 8px; }
.demo-preview { min-height: 64px; padding-block: 8px; }
</style>
```

### 同步、异步与失败恢复

```html
<script setup lang="ts">
import { ref } from 'vue'
const message = ref('Ready')
function sync() { message.value = 'Synchronous: no loading' }
async function run(fail = false) {
  message.value = 'Pending: duplicate clicks are blocked'
  await new Promise(resolve => setTimeout(resolve, 800))
  message.value = fail ? 'Rejected: loading released' : 'Resolved: loading released'
  if (fail) throw new Error('Demo rejection')
}
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button auto-loading @click="sync">Sync</mp-button>
    <mp-button auto-loading @click="() => run()">Resolve</mp-button>
    <mp-button auto-loading @click="() => run(true)">Reject</mp-button>
  </div>
  <p aria-live="polite">{{ message }}</p>
</template>
```

### 块级按钮

```html
<template>
  <mp-button block status="primary">Full width</mp-button>
</template>
```

### 颜色、水波与阴影

```html
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button color="#6750a4" text-color="white" :elevation="6">Custom filled</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white">Gradient</mp-button>
    <mp-button color="#6750a4" variant="text">Custom text</mp-button>
    <mp-button color="#6750a4" variant="outline">Custom outline</mp-button>
    <mp-button color="#6750a4" variant="tonal">Custom tonal</mp-button>
    <mp-button :ripple="false" :elevation="false">No ripple or shadow</mp-button>
  </div>
</template>
```

### 图标插槽与圆形按钮

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const items = [{'status': 'default', 'path': 'M12 5v14M5 12h14', 'label': 'Add'}, {'status': 'primary', 'path': 'm4 12 7-7v4h9v6h-9v4z', 'label': 'Reply'}, {'status': 'info', 'path': 'M12 11v6M12 7v1', 'label': 'Info'}, {'status': 'success', 'path': 'm5 12 4 4L19 6', 'label': 'Confirm'}, {'status': 'warning', 'path': 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13', 'label': 'Delete'}, {'status': 'danger', 'path': 'M6 6l12 12M6 18 18 6', 'label': 'Close'}] as const
</script>
<template>
  <div style="display: grid; gap: 8px; margin-bottom: 20px"><span style="font-size: 13px; opacity: .7">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="item in items" :key="item.label" :status="item.status" :size="size" round icon-container :aria-label="item.label"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="item.path" /></svg></template></mp-button>
  </div>
</template>
```

### 图标文字堆叠

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const size = ref<typeof sizes[number]>('md')
const items = [{'status': 'default', 'path': 'M12 5v14M5 12h14', 'label': 'Add'}, {'status': 'primary', 'path': 'm4 12 7-7v4h9v6h-9v4z', 'label': 'Reply'}, {'status': 'info', 'path': 'M12 11v6M12 7v1', 'label': 'Info'}, {'status': 'success', 'path': 'm5 12 4 4L19 6', 'label': 'Confirm'}, {'status': 'warning', 'path': 'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13', 'label': 'Delete'}, {'status': 'danger', 'path': 'M6 6l12 12M6 18 18 6', 'label': 'Close'}] as const
</script>
<template>
  <div style="display: grid; gap: 8px; margin-bottom: 20px"><span style="font-size: 13px; opacity: .7">Size</span><mp-radio-group v-model="size"><mp-radio v-for="value in sizes" :key="value" :value="value">{{ value }}</mp-radio></mp-radio-group></div>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="item in items" :key="item.label" :status="item.status" :size="size" stacked :aria-label="item.label"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="item.path" /></svg></template>{{ item.label }}</mp-button>
  </div>
</template>
```

### 按钮组继承与覆盖

```html
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
const variants = ['default', 'tonal', 'outline', 'text'] as const
const action = ref('Ready')
const pending = ref(false)
async function save() { action.value = 'Saving'; await new Promise(resolve => setTimeout(resolve, 800)); action.value = 'Saved' }
</script>
<template>
  <p>Sizes</p>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="size in sizes" :key="size" :size="size" status="primary"><mp-button>{{ size }}</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Themes</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group v-for="status in statuses" :key="status" :status="status"><mp-button>{{ status }}</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Horizontal / vertical variants</p>
  <div v-for="vertical in [false, true]" :key="String(vertical)" style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px; margin-bottom: 16px">
    <mp-button-group v-for="variant in variants" :key="variant" :variant="variant" :vertical="vertical" status="primary"><mp-button>{{ variant }}</mp-button><mp-button>Next</mp-button><mp-button>Last</mp-button></mp-button-group>
  </div>
  <p>Inheritance / individual overrides</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group status="primary"><mp-button>Default</mp-button><mp-button status="success">Success</mp-button><mp-button variant="outline">Outline</mp-button><mp-button disabled>Off</mp-button></mp-button-group>
    <mp-button-group disabled><mp-button>Disabled</mp-button><mp-button :disabled="false">Enabled override</mp-button></mp-button-group>
  </div>
  <p>Custom colors / gradient</p>
  <div style="display: flex; flex-wrap: wrap; gap: 16px">
    <mp-button-group color="#6750a4" text-color="white"><mp-button>Custom</mp-button><mp-button>Next</mp-button></mp-button-group>
    <mp-button-group color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white"><mp-button>Gradient</mp-button><mp-button>Next</mp-button></mp-button-group>
    <mp-button-group variant="outline" text-color="#6750a4"><mp-button>Outline</mp-button><mp-button>Next</mp-button></mp-button-group>
  </div>
  <p>Icons / stacked / independent loading</p>
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px"><mp-switch v-model="pending" aria-label="Group loading" />Loading preview</div>
  <div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 16px">
    <mp-button-group v-for="stacked in [false, true]" :key="String(stacked)" :stacked="stacked" status="primary">
      <mp-button :loading="pending" auto-loading @click="save"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></template>Save</mp-button>
      <mp-button @click="action = 'Edited'"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m4 16 12-12 4 4L8 20H4z" /></svg></template>Edit</mp-button>
    </mp-button-group>
    <mp-button-group><mp-button v-for="status in ['warning', 'info', 'success'] as const" :key="status" icon-container :status="status" :aria-label="status"><template #icon><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg></template></mp-button></mp-button-group>
  </div>
  <p aria-live="polite">{{ action }}</p>
</template>
```

### 原生表单、焦点与触摸事件

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('Editable')
const submissions = ref(0)
const event = ref('Use Tab, Enter or touch')
</script>
<template>
  <form @submit.prevent="submissions++" @reset.prevent="value = 'Editable'" style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-input v-model="value" aria-label="Example field" placeholder="Example field" style="width: 100%; max-width: 280px" />
    <mp-button html-type="submit">Submit</mp-button>
    <mp-button html-type="reset">Reset</mp-button>
    <mp-button :focusable="false">Skip Tab</mp-button>
    <mp-button @touchstart="event = 'touchstart'" @focus="event = 'focus'" @blur="event = 'blur'" @click="event = 'click'">Event target</mp-button>
  </form>
  <p aria-live="polite">Submissions: {{ submissions }}; {{ event }}</p>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 主题色；省略时继承按钮组，否则 default | `SemanticStatus` | `undefined` |
| variant | 外观；省略时继承按钮组，否则 default | `default / text / outline / tonal` | `undefined` |
| size | 尺寸；省略时继承按钮组，否则 md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | 原生按钮类型 | `button / submit / reset` | `button` |
| component | 根标签，链接属性通过 attrs 传入 | `button / a` | `button` |
| round | 圆形按钮 | `boolean` | `false` |
| block | 占满可用宽度 | `boolean` | `false` |
| loading | 加载状态，禁止点击和链接跳转 | `boolean` | `false` |
| loading-type | 加载动画；与 Loading 的 type 相同 | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | 行内、覆盖或底部进度线 | `default / fill / line` | `default` |
| loading-size | 加载动画尺寸；省略时使用按钮尺寸，行内图标替换使用 xs | `ComponentSize / number` | `undefined` |
| loading-color | 加载指示器颜色 | `string` | `currentColor` |
| loading-radius | circle 动画半径 | `string / number` | `undefined` |
| auto-loading | 等待 click/touchstart 返回的 Promise；同步回调不闪 loading | `boolean` | `false` |
| icon-container | 图标容器外观 | `boolean` | `false` |
| disabled | 禁用；省略时继承按钮组，显式 false 可覆盖 | `boolean` | `undefined` |
| ripple | 点击水波 | `boolean` | `true` |
| focusable | 允许 Tab 顺序聚焦；不影响通过代码聚焦 | `boolean` | `true` |
| autofocus | 原生自动聚焦 | `boolean` | `false` |
| text-color | 自定义文字色 | `string` | `undefined` |
| color | 自定义背景／变体基色 | `string` | `undefined` |
| elevation | default 变体阴影；true 为 2，false 关闭，数字四舍五入并限制 0～24；组内由组控制 | `boolean / number` | `true` |
| stacked | 图标文字纵向排列；省略时继承按钮组 | `boolean` | `undefined` |

### Events

| 事件 | 参数与行为 |
| --- | --- |
| click | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

事件处理函数可返回 Promise，也支持多个监听器。auto-loading 会等待全部监听器完成，即使某个提前拒绝也不会提前解除禁用。卸载或 KeepAlive 停用会使旧异步结果失效。内部直接读取监听器返回值，不再二次 emit。原生 focus/blur 等事件透传。禁用／加载中的 click 会阻止跳转与冒泡。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 按钮内容；加载时保留 | — |
| icon | 前置图标；stacked 时位于文字上方 | — |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

## ButtonGroup

属性：size=md、status=default、variant=default、color/text-color=undefined、disabled/stacked/vertical=false、elevation=true。使用 default 插槽，公开 buttonGroupProvider（响应式组配置），没有自定义事件。子按钮按字段覆盖组配置；阴影由组整体控制。

## 迁移

Cedar 原 loading-type=default/fill/line 改为 loading-mode=default/fill/line；loading-type 现在选择加载动画。Maple 如需原覆盖式布局，设置 loading-mode=fill。两端 ripple、focusable 默认均为 true。样式变量采用统一 Button token 名称（--c-/--mp- 前缀），完整变量见 style/token.less。

## 类型

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。
