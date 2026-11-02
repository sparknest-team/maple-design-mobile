<!-- Source: src/field-decorator/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/field-decorator -->

# FieldDecorator 字段装饰器

FieldDecorator 是 Input、Textarea、Select 与日期时间控件的展示外壳，负责边框、尺寸、浮动提示、前后缀和清除按钮；不管理输入值、表单校验或弹层开合。

## 两端同源约定

Cedar 完成实现后独立复制到 Maple，替换命名空间与导入路径；两端不引用另一端的运行时代码。主体、几何测量、插槽、事件及样式规则一致。

- 三种变体：`outline`（默认）、`filled`、`standard`。消费者可以显式选择自己的默认变体。
- 五种尺寸：`xs / sm / md / lg / xl`，默认 `md`；具体高度使用各端 token。
- `hint` 默认 Cedar 为 `false`，Maple 为 `true`。其他行为一致；Input 在 FormItem 已有外部标签时关闭浮动提示。
- 有内容且可编辑时才渲染清除按钮；`0` 算非空，`[]` 算空。Cedar 在 hover/focus 时显示，Maple 常驻；触屏媒体条件下 Cedar 也常驻。
- 默认按钮通过各端全局语言系统读取无障碍文案，不维护组件私有词典。
- 内容列尺寸使用 ResizeObserver 观察，支持前缀变化及隐藏容器重新显示；卸载时清理监听。

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

Example source: src/field-decorator/example/demos/control-sizes.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
const disabled = ref(false)
const readonly = ref(false)
const error = ref(false)
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('outline')
const options = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'shanghai', label: 'Shanghai' },
]
const cascaderOptions = [{ value: 'china', label: 'China', children: options }]

const inputValue = ref('Beijing')
const textareaValue = ref('Textarea value')
const selectValue = ref('beijing')
const cascaderValue = ref('beijing')
const selectMultiple = ref(['beijing', 'shanghai'])
const cascaderMultiple = ref(['beijing', 'shanghai'])
const selectOverflow = ref(['long', 'beijing', 'shanghai'])
const cascaderOverflow = ref(['long', 'beijing', 'shanghai'])
const selectedOptions = [
  ...options,
  {
    value: 'long',
    label:
      'A very long selected option label for overflow comparison — full text preview keeps the selected value unchanged.',
  },
]
const selectedCascaderOptions = [{ value: 'china', label: 'China', children: selectedOptions }]
function resetSelections() {
  inputValue.value = 'Beijing'
  selectValue.value = 'beijing'
  cascaderValue.value = 'beijing'
  selectMultiple.value = ['beijing', 'shanghai']
  cascaderMultiple.value = ['beijing', 'shanghai']
  selectOverflow.value = ['long', 'beijing', 'shanghai']
  cascaderOverflow.value = ['long', 'beijing', 'shanghai']
}
</script>
<template>
  <section aria-label="Form control size comparison" class="control-size-comparison">
    <mp-space wrap :size="12">
      <mp-radio-group v-model="size" presentation="inline" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" presentation="inline" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" presentation="inline">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" presentation="inline">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          presentation="inline"
          :size="size"
          :variant="variant"
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          placeholder="Textarea"
          :rows="2"
        />
      </div>
      <div data-control="Button">
        <p>Button</p>
        <mp-button :size="size" variant="outline">Button</mp-button>
      </div>
      <div data-control="Select">
        <p>Select</p>
        <mp-select
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="Select"
        />
      </div>
      <div data-control="Date">
        <p>Date</p>
        <mp-date
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Date"
        />
      </div>
      <div data-control="Time">
        <p>Time</p>
        <mp-time
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Time"
        />
      </div>
      <div data-control="InputNumber">
        <p>InputNumber</p>
        <mp-input-number
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Number"
        />
      </div>
      <div data-control="AutoComplete">
        <p>AutoComplete</p>
        <mp-auto-complete
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="AutoComplete"
        />
      </div>
      <div data-control="Cascader">
        <p>Cascader</p>
        <mp-cascader
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          :options="cascaderOptions"
          placeholder="Cascader"
        />
      </div>
      <div data-control="DateRange">
        <p>DateRange</p>
        <mp-date-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
      <div data-control="TimeRange">
        <p>TimeRange</p>
        <mp-time-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
    </div>

    <section aria-label="Selected control size comparison" class="control-size-comparison__states">
      <mp-space wrap align="center" :size="12">
        <span>Selected / Clearable / Multiple — 有值、可清空与多选不换行</span>
        <span
          >Hover or focus truncated text; tap on touch screens /
          悬停或聚焦省略正文查看全文；触屏点按查看，点外部关闭</span
        >
        <mp-button size="sm" variant="outline" @click="resetSelections">Reset / 恢复选中值</mp-button>
      </mp-space>
      <div class="control-size-comparison__grid">
        <div data-control="InputValue">
          <p>Input · clearable</p>
          <mp-input
            v-model="inputValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            clearable
            placeholder="Input value"
          />
        </div>
        <div data-control="ButtonReference">
          <p>Button · reference</p>
          <mp-button :size="size" variant="outline">Button</mp-button>
        </div>
        <div data-control="SelectValue">
          <p>Select · clearable</p>
          <mp-select
            v-model="selectValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            clearable
            placeholder="Select value"
          />
        </div>
        <div data-control="CascaderValue">
          <p>Cascader · clearable</p>
          <mp-cascader
            v-model="cascaderValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            clearable
            placeholder="Cascader value"
          />
        </div>
        <div data-control="SelectMultiple">
          <p>Select · multiple / nowrap</p>
          <mp-select
            v-model="selectMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select multiple"
          />
        </div>
        <div data-control="CascaderMultiple">
          <p>Cascader · multiple / nowrap</p>
          <mp-cascader
            v-model="cascaderMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader multiple"
          />
        </div>
        <div data-control="SelectOverflow">
          <p>Select · long values / nowrap</p>
          <mp-select
            v-model="selectOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select long values"
          />
        </div>
        <div data-control="CascaderOverflow">
          <p>Cascader · long values / nowrap</p>
          <mp-cascader
            v-model="cascaderOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            presentation="inline"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader long values"
          />
        </div>
      </div>
    </section>
  </section>
</template>
<style scoped>
.control-size-comparison,
.control-size-comparison__states {
  display: grid;
  gap: 24px;
}
.control-size-comparison__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: start;
  gap: 24px 16px;
}
.control-size-comparison__grid > div {
  min-width: 0;
}
.control-size-comparison__grid p {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 20px;
}
.control-size-comparison__grid :deep(.mp-input-number),
.control-size-comparison__grid :deep(.mp-auto-complete) {
  width: 100%;
}
</style>
```

## Props

描边缺口通过 `fieldset / legend` 实现，不使用背景色遮罩。缺口起点与内容列对齐，左右各预留 `hint-space`；`padding-inline-start` 中的 CSS `max()/calc()` 必须使用 Less 原样输出，避免不同 Less 版本将其提前计算为 `0px`。`check:input` 同时检查源码一致性和两端 Less 编译产物。

| 属性 | 类型 | 默认值 / 含义 |
| --- | --- | --- |
| `tag` | `'div' \| 'span'` | `div`，外壳标签 |
| `value` | `unknown` | 仅判断内容是否为空 |
| `id` | `string` | 浮动标签关联的原生控件 id |
| `title` | `string` | 原生标题提示 |
| `size` | `ComponentSize` | `md`，实现全部五档尺寸 |
| `variant` | `'outline' \| 'filled' \| 'standard'` | `outline` |
| `placeholder` | `string` | 浮动标签文本 |
| `hint` | `boolean` | Cedar false / Maple true |
| `hint-center` | `boolean` | `true`；多行控件设为 false |
| `line` | `boolean` | `true`，是否显示边框或底线 |
| `focused` | `boolean` | 消费者传入焦点状态 |
| `composing` | `boolean` | 输入法组合期间保持标签浮起 |
| `disabled` / `readonly` / `error` | `boolean` | 消费者合并 Form / Group 后传入 |
| `clearable` | `boolean` | `false`，是否允许清除 |
| `text-color` / `focus-color` / `blur-color` | `string` | 自定义文字、焦点和非焦点颜色 |
| `cursor` | `string` | 自定义光标 |

## 插槽与事件

`default` 放原生输入框、标签或展示内容；`prefix` / `suffix` 放附加内容；`clear-icon` 接收 `clear(event?)`，自定义按钮应调用它，清除不会冒泡打开选择面板。

`clear(event)` 通知消费者更新值；`mousedown(event)` 供消费者管理焦点。外壳不自行修改模型。

样式语义统一使用 `--c-field-*` / `--mp-field-*`；声明集中在各自 `style/token.less`，实现不跨库共享。不要在消费者中重复绘制边框。

## 错误与禁用边框变量

以下后缀分别加上 `--c-field-` / `--mp-field-`：`variant-outline-border-color-error` 控制 outline 错误边框；`variant-standard-line-color-error` 控制 standard 错误底线；`variant-standard-line-color-disabled` 控制 standard 禁用底线，默认引用 system border-subtle。禁用优先于错误、hover 和 focus。三个入口均支持局部覆盖；错误提示文字仍由 `field-error-color` 管理。内部变量不是业务 API，已确认无消费的遗留内部声明直接删除，不提供别名。
## 键盘焦点

当前 FieldDecorator 不额外绘制外圈 outline；outline 通过 border-state 边框、filled 通过背景、standard 通过底线响应 `--focus` 或 `:focus-within`。内部清除、密码切换和数字步进按钮保留自身键盘焦点指示。只读保留聚焦，禁用和错误的颜色优先级不变；不据此宣称错误态焦点可辨识性或原生可访问性已验收。

Input、Textarea、InputNumber 的实际原生控件使用 `caret-color: currentColor`，不再由 field-focus-color／field-error-color 染色。field-focus-color、field-error-color 和 field-border-width 仍有提示、边框或按钮 outline 消费，不能因移除 caret／外偏移路径而删除 Token。实例 focus-color 控制现有支持的变体／提示通道，不承诺改变 caret；没有新变量、默认值或业务 API 变更。

`--mp-field-caret-color` 默认 `currentColor`，统一控制 Input、InputNumber 与 Textarea 的光标颜色；不改变文字色。
