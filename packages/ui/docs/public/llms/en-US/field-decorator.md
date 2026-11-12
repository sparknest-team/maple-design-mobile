<!-- Source: src/field-decorator/docs/en-US.md; locale: en-US; page: /en-US/field-decorator -->

# FieldDecorator

See the [Chinese documentation](#/en-US/field-decorator) for the full API.

## Basic examples

### Basic usage

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
      <mp-radio-group v-model="size" edit-mode="direct" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" edit-mode="direct" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" edit-mode="direct">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
          edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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
            edit-mode="direct"
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

## Loading and waiting

### Shared field loading

Example source: src/field-decorator/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const mode = ref<'default' | 'line'>('line')
const text = ref('加载时仍可编辑')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space><mp-switch v-model="busy" />加载状态</mp-space>
    <mp-radio-group v-model="mode" :options="['default', 'line']" variant="button" aria-label="字段加载布局" />
    <mp-form layout="vertical">
      <mp-form-item label="文本"><mp-input v-model="text" :loading="busy" :loading-mode="mode" /></mp-form-item>
      <mp-form-item label="多行文本"><mp-textarea v-model="text" :loading="busy" :loading-mode="mode" /></mp-form-item>
      <mp-form-item label="选择"
        ><mp-select edit-mode="direct" :options="[{ label: '选项', value: 'a' }]" :loading="busy" :loading-mode="mode"
      /></mp-form-item>
      <mp-form-item label="日期"><mp-date edit-mode="direct" :loading="busy" :loading-mode="mode" /></mp-form-item>
    </mp-form>
    <p>加载展示由同一个 FieldDecorator 实现，不隐式禁用输入；需要禁止操作时单独设置 disabled 或 readonly。</p>
  </mp-space>
</template>
```

## Usage notes

### Loading

Changing `tag` rebinds size observation to the current root and content nodes. KeepAlive deactivation releases observation and queued measurements; a frame from an earlier activation cannot change current layout.

## API

### FieldDecorator Props

The floating hint leaves a gap in the outline, aligned with the content column. Adjust the space on either side through `hint-space`.

| Prop | Type | Default / meaning |
| --- | --- | --- |
| `loading` | `boolean` | `false`; show loading without changing disabled or readonly |
| `loading-mode` | `'default' \| 'line'` | `default`; indicator or bottom progress line |
| `tag` | `'div' \| 'span'` | `div`; wrapper element |
| `value` | `unknown` | Checks only whether content is empty |
| `id` | `string` | Native control id associated with the floating label |
| `title` | `string` | Native title tooltip |
| `size` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`; implements all five sizes |
| `variant` | `'outline' \| 'filled' \| 'standard'` | `outline` |
| `placeholder` | `string` | Floating label text |
| `hint` | `boolean` | `true` |
| `hint-center` | `boolean` | `true`; use false for multiline controls |
| `line` | `boolean` | `true`; whether to show a border or underline |
| `focused` | `boolean` | Consumer-supplied focus state |
| `composing` | `boolean` | Keep the label floated during IME composition |
| `disabled` | `boolean` | Consumer-supplied disabled state after merging Form / Group state |
| `readonly` | `boolean` | Consumer-supplied read-only state after merging Form / Group state |
| `error` | `boolean` | Consumer-supplied error state after merging Form / Group state |
| `clearable` | `boolean` | `false`; whether clearing is allowed |
| `text-color` | `string` | Custom per-instance text color; prefer tokens for static themes |
| `focus-color` | `string` | Custom per-instance focused color; prefer tokens for static themes |
| `blur-color` | `string` | Custom per-instance unfocused color; prefer tokens for static themes |
| `cursor` | `string` | Custom caret |

### FieldDecorator Slots / Events

`default` contains a native input, tags or display content. `prefix` / `suffix` contain adornments. `clear-icon` receives `clear(event?)`; a custom button should call it. Clearing does not bubble to open the selection panel.

`loading-icon` replaces the indicator icon only when `loading=true` and `loading-mode=default`; `line` mode renders no icon. `fieldLoadingProps` contains `loading` and `loadingMode`; `fieldLoadingModes`, `FieldLoadingMode`, and `FieldLoadingProps` are exported from the component and root entry points.

`clear(event)` asks the consumer to update the value; `mousedown(event)` lets the consumer manage focus. The wrapper does not mutate the model itself.

Style semantics use `--c-field-*` / `--mp-field-*`, declared in each library's `style/token.less`. Implementations are not shared across libraries. Consumers must not draw a second border.

## Keyboard focus

The outline variant indicates focus through its border, filled through its background, and standard through its underline. Clear, password-toggle and stepper buttons retain keyboard focus indicators. Readonly remains focusable; disabled and error colors have higher priority.

Use `--mp-field-caret-color` for input caret color, defaulting to `currentColor`. Input, Textarea and InputNumber also support their own caret-color overrides. Focus and error colors apply to hints or borders.

`--mp-field-caret-color` defaults to `currentColor` and controls Input/InputNumber/Textarea carets without changing text.

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom `line`); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-field-blur-color` | `var(--mp-sys-color-content-tertiary)` | `border-bottom`, `color` |
| `--mp-field-border-radius` | `var(--mp-sys-radius-md)` | `border-end-end-radius`, `border-end-start-radius`, `border-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-field-border-width` | `1px` | `border`, `border-bottom`, `margin-inline-start`, `min-height`, `outline`, `outline-offset`, `padding-inline-start` |
| `--mp-field-caret-color` | `currentColor` | `caret-color` |
| `--mp-field-clear-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-clear-icon-size` | `var(--mp-field-icon-size)` | `font-size` |
| `--mp-field-clear-padding` | `4px` | `padding` |
| `--mp-field-clear-radius` | `50%` | `border-radius` |
| `--mp-field-clear-visibility` | `visible` | `visibility` |
| `--mp-field-content-gap` | `8px` | `gap`, `padding-inline-end`, `padding-inline-start` |
| `--mp-field-content-padding-vertical` | `8px` | `top` |
| `--mp-field-control-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-field-control-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `-webkit-text-fill-color`, `color` |
| `--mp-field-error-color` | `var(--mp-sys-color-status-danger)` | `border-bottom-color`, `border-color`, `color` |
| `--mp-field-focus-color` | `var(--mp-sys-color-action-primary)` | `border-bottom-color`, `color`, `outline` |
| `--mp-field-hint-duration` | `0.2s` | `transition` |
| `--mp-field-hint-scale` | `0.75` | `font-size`, `top`, `transform` |
| `--mp-field-hint-space` | `4px` | `padding`, `padding-inline-start` |
| `--mp-field-icon-size` | `20px` | `font-size` |
| `--mp-field-line-height` | `1.5` | `line-height`, `top` |
| `--mp-field-loading-color` | `var(--mp-field-focus-color)` | `color` |
| `--mp-field-loading-duration` | `1s` | `animation` |
| `--mp-field-loading-line-size` | `2px` | `height` |
| `--mp-field-padding-horizontal` | `16px` | `inset-inline-start`, `margin-inline-end`, `margin-inline-start`, `max-width`, `padding`, `padding-inline-start` |
| `--mp-field-placeholder-text-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-field-prefix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-size-lg-font-size` | `16px` | `font-size` |
| `--mp-field-size-lg-height` | `56px` | `flex`, `height`, `min-height` |
| `--mp-field-size-md-font-size` | `16px` | `font-size` |
| `--mp-field-size-md-height` | `48px` | `flex`, `height`, `min-height` |
| `--mp-field-size-sm-font-size` | `14px` | `font-size` |
| `--mp-field-size-sm-height` | `40px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xl-font-size` | `18px` | `font-size` |
| `--mp-field-size-xl-height` | `64px` | `flex`, `height`, `min-height` |
| `--mp-field-size-xs-font-size` | `12px` | `font-size` |
| `--mp-field-size-xs-height` | `32px` | `flex`, `height`, `min-height` |
| `--mp-field-suffix-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-field-variant-filled-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-field-variant-filled-background-disabled` | `var(--mp-color-fill-2)` | `background` |
| `--mp-field-variant-filled-background-error` | `var(--mp-color-danger-light-1)` | `background` |
| `--mp-field-variant-filled-background-focus` | `var(--mp-color-fill-3)` | `background` |
| `--mp-field-variant-filled-background-hover` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-field-variant-outline-background` | `transparent` | `background` |
| `--mp-field-variant-outline-border-color` | `var(--mp-sys-color-border-default)` | `border`, `border-color` |
| `--mp-field-variant-outline-border-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-color` |
| `--mp-field-variant-outline-border-color-error` | `var(--mp-sys-color-status-danger)` | `border-color` |
| `--mp-field-variant-outline-border-color-focus` | `var(--mp-sys-color-action-primary)` | `border-color` |
| `--mp-field-variant-outline-border-color-hover` | `var(--mp-sys-color-border-strong)` | `border-color` |
| `--mp-field-variant-standard-line-color` | `var(--mp-field-blur-color)` | `border-bottom` |
| `--mp-field-variant-standard-line-color-disabled` | `var(--mp-sys-color-border-subtle)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-error` | `var(--mp-field-error-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-color-focus` | `var(--mp-field-focus-color)` | `border-bottom-color` |
| `--mp-field-variant-standard-line-size` | `1px` | `border-bottom` |
| `--mp-field-variant-standard-line-size-focus` | `2px` | `border-bottom-width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-field-blur-color: var(--mp-sys-color-content-tertiary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Error and disabled borders

Prefix these suffixes with `--c-field-` / `--mp-field-`: `variant-outline-border-color-error` controls outline error borders; `variant-standard-line-color-error` controls standard error underlines; `variant-standard-line-color-disabled` controls standard disabled underlines and defaults to system border-subtle. Disabled overrides error, hover and focus. All three support local overrides. `field-error-color` still controls error text.
