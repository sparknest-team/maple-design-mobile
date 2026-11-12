<!-- Source: src/number-keyboard/docs/en-US.md; locale: en-US; page: /en-US/number-keyboard -->

# NumberKeyboard

### Intro

A bottom popup virtual keyboard for numeric or password input flows.

The default completion-button text uses the nearest LocaleProvider and falls back to the global locale; an explicit `close-button-text` takes precedence.

## Basic examples

### Basic Usage

Example source: src/number-keyboard/example/demos/basic.vue

```vue
<template>
  <div class="number-keyboard-example">
    <mp-input v-model="value" edit-mode="direct" readonly placeholder="点击输入" @click="open = true" />
    <mp-number-keyboard v-model="value" v-model:open="open" :max-length="11" title="安全键盘" />

    <mp-input
      v-model="customValue"
      edit-mode="direct"
      readonly
      placeholder="自定义主题"
      style="margin-top: 16px"
      @click="showCustom = true"
    />
    <mp-number-keyboard v-model="customValue" v-model:open="showCustom" theme="custom" extra-key="." />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const open = ref(false)
const customValue = ref('')
const showCustom = ref(false)
</script>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Header and actions inherit reading direction. The numeric keypad retains LTR digit order; RTL does not reverse digits or entered values. Safe areas still use physical device edges.

Keys are native buttons supporting Tab, Enter and Space. The icon-only delete button has a localized name. The visible `title` names the dialog by default; component `aria-label` or `aria-labelledby` can provide an explicit dialog name.

Within FormItem, the dialog merges the caller’s `aria-describedby` with the current form error; clearing the error preserves the caller’s description.

Input and visibility use local passive state and emit updates; parents should accept and synchronize them, since refusing an update alone does not guarantee that the panel remains open. `hide-on-click-outside` controls backdrop closing, not arbitrary outside mouse clicks.

`max-length` uses JavaScript UTF-16 length. Finite values are floored and clamped to zero; `Infinity` or the exact string `"Infinity"` is unlimited. Extra keys may contain multiple characters: an addition that exceeds the limit is rejected in full and emits no `input`. Delete removes one UTF-16 code unit. There are no public business methods or slots; ordinary event promises do not control input or visibility.

## API

`open/defaultOpen` control current/initial uncontrolled panel visibility. Use `v-model:open` for two-way binding. defaultOpen is read once without initialization writeback.

### Value and default value

Use ordinary `v-model`. `modelValue` is input text; `defaultValue` initializes uncontrolled state once without later resets. Explicit binding wins; initialization emits no `update:modelValue`.

The keyboard panel uses an independent `open/defaultOpen` model with `update:open`. Text and panel opening are separate states.

### NumberKeyboard Props

| Prop | Description | Type | Default |
| ----------------------- | -------------------------- | --------------------------- | ---------- |
| `default-value` | Initial uncontrolled input value, read once | `string` | `''` |
| `default-open` | Initial uncontrolled visibility, read once | `boolean` | `false` |
| `v-model` | Current value | `string` | `''` |
| `v-model:open` | Whether keyboard is visible | `boolean` | `false` |
| `title` | Keyboard title | `string` | `-` |
| `theme` | Keyboard layout | `default \| custom` | `default` |
| `max-length` | Max input length | `number \| string` | `Infinity` |
| `extra-key` | Extra bottom-left key(s) | `string \| string[]` | `''` |
| `close-button-text` | Done button text in custom theme | `string` | `完成` |
| `delete-button-text` | Delete key text; icon when empty | `string` | `-` |
| `show-delete-key` | Show delete key | `boolean` | `true` |
| `random-key-order` | Shuffle 1-9 keys | `boolean` | `false` |
| `hide-on-click-outside` | Close when overlay is clicked | `boolean` | `true` |
| `overlay` | Show overlay | `boolean` | `true` |
| `overlay-class` | Overlay class | `string` | `-` |
| `overlay-style` | Overlay style | `object` | `-` |
| `overlay-closable` | Allow backdrop close, subject to hide-on-click-outside | `boolean` | `true` |
| `lock-scroll` | Lock background scroll | `boolean` | `true` |
| `esc-to-close` | Close on Escape | `boolean` | `true` |
| `popup-container` | Teleport target | `string \| HTMLElement \| false` | `body` |
| `safe-area` | Whether to enable the bottom, left and right safe areas | `boolean` | `true` |

### NumberKeyboard Events

| Event | Description | Arguments |
| ------------ | ---------------------- | ------------- |
| `update:modelValue` | Input value update | `value: string` |
| `update:open` | Visibility update | `open: boolean` |
| `input` | Emitted on key press | `key: string` |
| `delete` | Emitted on delete | `-` |
| `close` | Emitted on close | `-` |
| `blur` | Emitted on close | `-` |
| `open` | Emitted on open | `-` |
| `opened` | Emitted after open transition | `-` |
| `closed` | Emitted after close transition | `-` |
| `key-escape` | Emitted on Escape | `-` |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-number-keyboard-background` | `var(--mp-color-bg-1)` | `background` |
| `--mp-number-keyboard-close-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-number-keyboard-close-font-size` | `var(--mp-font-size-lg, 16px)` | `font-size` |
| `--mp-number-keyboard-delete-icon-size` | `22px` | `font-size` |
| `--mp-number-keyboard-header-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-number-keyboard-header-font-size` | `var(--mp-font-size-md, 14px)` | `font-size` |
| `--mp-number-keyboard-header-height` | `34px` | `height` |
| `--mp-number-keyboard-key-active-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-number-keyboard-key-background` | `var(--mp-color-fill-3)` | `background` |
| `--mp-number-keyboard-key-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-number-keyboard-key-font-size` | `22px` | `font-size` |
| `--mp-number-keyboard-key-gap` | `6px` | `gap` |
| `--mp-number-keyboard-key-height` | `48px` | `height`, `min-height` |
| `--mp-number-keyboard-padding` | `6px` | `padding` |
| `--mp-number-keyboard-sidebar-width` | `25%` | `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-number-keyboard-background: var(--mp-color-bg-1);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
