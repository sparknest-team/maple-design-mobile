<!-- Source: src/verification-code/docs/en-US.md; locale: en-US; page: /en-US/verification-code -->

# VerificationCode

Verification-code input supporting whole-code distribution, formatting and form inheritance.

## Basic examples

### basic

Example source: src/verification-code/example/demos/en-US/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const code = ref('')
</script>
<template>
  <div class="verification-demo">
    <mp-verification-code v-model="code" aria-label="verification code" />
    <p>Value: {{ code || 'empty' }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
```

## Appearance and states

### appearance

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ------------------------------- | ---------------------------- |
| `default-value` | Uncontrolled initial value | appearance, states |
| `length` | Positive integer cell count, measured in Unicode code points | appearance, Appearance combinations |
| `aria-label` | Group name and numbered cell labels | appearance, states |
| `masked` | Visual character masking only, not encryption | appearance |
| `mask-symbol` | Use the first Unicode code point | appearance |
| `variant` | Input variant | appearance |

<!-- demo-config-notes:end -->


Example source: src/verification-code/example/demos/en-US/appearance.vue

```vue
<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="1234"
      :length="4"
      masked
      mask-symbol="*"
      aria-label="Masked verification code"
    /><mp-verification-code
      default-value="1234"
      :length="4"
      variant="filled"
      size="lg"
      align="start"
      :gutter="12"
      aria-label="Filled verification code"
    /><mp-verification-code
      default-value="12"
      :length="4"
      variant="standard"
      focus-color="#6750a4"
      aria-label="Standard verification code"
    />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
```

### Appearance combinations

Use this example for segmented verification-code input. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/verification-code/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('123456')
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['filled', 'outline', 'standard'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-verification-code
          v-model="value"
          :length="6"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        ></mp-verification-code>
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

### states

Example source: src/verification-code/example/demos/en-US/states.vue

```vue
<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="123456"
      readonly
      aria-label="Readonly verification code"
    /><mp-verification-code
      default-value="123456"
      disabled
      aria-label="Disabled verification code"
    /><mp-verification-code default-value="12" error aria-label="Error verification code" />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
```

## Data and options

### formatting

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | ------------------------------------------------------------------------- | -------------------- |
| `type` | Character set | formatting |
| `paste-transform` | Paste preprocessing, before type/formatter | formatting |
| `formatter` | Per-character formatting: false rejects; true/undefined retains. A returned string contributes its first valid code point | formatting |
| `aria-label` | Group name and numbered cell labels | formatting |

<!-- demo-config-notes:end -->


Example source: src/verification-code/example/demos/en-US/formatting.vue

```vue
<script setup>
import { ref } from 'vue'

const code = ref('')
const transform = (value) => value.replace(/[-\s]/g, '').toUpperCase()
</script>
<template>
  <div class="verification-demo">
    <p>Paste ab-12-cd; insertion starts at the current cell.</p>
    <mp-verification-code
      v-model="code"
      type="alphanumeric"
      :paste-transform="transform"
      :formatter="(char) => char.toUpperCase()"
      aria-label="Alphanumeric verification code"
      ><template #separator="{ index }"><span v-if="index === 2">−</span></template></mp-verification-code
    >
    <p>{{ code }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
```

## Interaction and control

### Interaction states

Use this example for segmented verification-code input. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/verification-code/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('123456')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-verification-code v-model="value" :length="6" v-bind="__demoState"></mp-verification-code>
  </mp-space>
</template>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Verification codes are LTR content: rendering, pasting and focus movement use the original string order, while outer align start/end follows reading direction. RTL does not reverse code characters. Numeric and text codes share this order contract.

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(payload, done, context)` can guard saving the editor. FormItem validates the candidate first; invalid candidates keep the editor open. `open / default-open / update:open` control the editor. `#read="{ value, text }"` customizes read content. See the unified field presentation examples in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.
### Configuration

initial means no public override. CSS reads size fallbacks at the component element. Override through component style or theme.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

Explicit null is a controlled empty code and never falls back to default-value, which applies only when model-value is absent. reset() still proposes an empty string. Presentation clearing can submit null through empty-value=null; finish never receives null. An omitted model-value remains uncontrolled.

In deferred mode input / paste describe editing, while finish describes the finally accepted complete value. Canceling, rejection, readonly, disabled, external replacement or unmount retires unaccepted completion notifications. Ordinary finish listener Promises do not hold confirmation. A synchronous undefined before-commit return waits for done. Invalid type / align values diagnose and fall back to digit / center; gutter=0 and 0px remain valid.

### VerificationCode Props

| Prop | Description | Type | Default |
| --------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- | ---------------- |
| `model-value` | Controlled complete code | `string \| null` | `undefined` |
| `default-value` | Uncontrolled initial value | `string` | `''` |
| `length` | Positive integer cell count, measured in Unicode code points | `number` | `6` |
| `type` | Character set | `digit / text / alphanumeric` | `digit` |
| `size` | Five wrapper sizes | `xs / sm / md / lg / xl` | Inherited / md |
| `variant` | Input variant | `filled / outline / standard` | Inherited / outline |
| `disabled / readonly / error` | State; explicit values override Form | `boolean` | `undefined` |
| `masked` | Visual character masking only, not encryption | `boolean` | `false` |
| `mask-symbol` | Use the first Unicode code point | `string` | `•` |
| `autofocus` | Focus the first empty cell after mounting | `boolean` | `false` |
| `gutter` | Cell gap; numbers are px | `number / string` | Component token |
| `align` | Horizontal alignment | `start / center / end` | `center` |
| `allow-paste` | Allow pasting; false prevents native paste | `boolean` | `true` |
| `paste-transform` | Paste preprocessing, before type/formatter | `(text: string) => string` | `undefined` |
| `formatter` | Per-character formatting: false rejects; true/undefined retains. A returned string contributes its first valid code point | `(character, index, value) => string / boolean` | `undefined` |
| `separator` | Separator after each nonfinal cell | `(index, character) => VNodeChild` | `undefined` |
| `aria-label` | Group name and numbered cell labels | `string` | `undefined` |
| `text-color / focus-color / blur-color` | Dynamic instance colors; prefer tokens for static themes | `string` | `undefined` |

| `empty-value` | Presentation clear output; defaults to an empty string and accepts explicit null | `string \| null \| (() => string \| null)` | `''` |
| `clearable` | Deferred editor clearing; does not change individual input cells | `boolean` | `false` |
| `empty-values` | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| `empty-text` | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| `edit-mode` | Editing mode, inherited from FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| `read-pretty` | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| `before-commit` | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| `open` | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| `default-open` | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| `popup-container` | Editor mount container | `string \| HTMLElement \| false` | `-` |

### VerificationCode Events

| Event | Arguments | Semantics |
| ------------------ | ----------------------- | ---------------------------------------------------------------------- |
| input | character, index, event | Starting character and zero-based index of each valid native input proposal |
| update:modelValue | value: string \| null | Complete-code proposal |
| change | value: string \| null | Complete-code proposal for each valid edit, not necessarily accepted by a controlled parent |
| finish | value: string | Direct mode notifies after the parent accepts the complete code in the current render; deferred mode waits for confirmation guards and parent acceptance, never draft completion |
| update:open | open: boolean | Controlled editor visibility update |
| open-change | open: boolean | Actual editor visibility change |
| paste | text, event | Pasted text after paste-transform/type processing |
| focus / blur | FocusEvent | Focus enters/leaves the whole component; moving between cells does not duplicate notifications |
| click | MouseEvent | Non-disabled click |

Valid input order: input → update:modelValue → change. finish waits until the parent accepts the complete value in that render. Rejected controlled values restore native inputs; later asynchronous parent assignments do not add finish. reset() proposes empty and emits update:modelValue/change without simulating native input. Disabled, readonly or composing state prevents reset from changing values.

Paste overwrites from the current cell; root-level paste starts at cell 1. Input beyond the first empty cell moves to that first empty cell. A whole-code native input distributes across subsequent cells. SMS suggestions depend on the platform and browser: Cedar hints one-time-code on the first cell, while Maple retains autocomplete=off for all cells. Typing one character in a filled cell replaces that cell even when the caret follows its old character. Composition prefers the current compositionend text, including multiple code points, and falls back to the native value only when event data is missing. Processing is type filtering, formatter, then length clipping; rejected characters consume no cell. Text counts Unicode code points rather than grapheme clusters. External values affect display without an automatic formatted model update.

### VerificationCode Slots

| Slot | Prop | Description |
| --------- | -------------------- | ----------------------------------------- |
| separator | { index, character } | Overrides separator; not rendered after the last cell |
| read | { value: string \| null, text: string } | Custom read content, taking precedence over empty-text |

### VerificationCode Methods

- focus(index?): zero-based index; defaults to the first empty cell or the last cell when full. Direct readonly fields can receive focus. Deferred mode opens an editable panel first; disabled, readonly, or reading fields do not open.
- blur(): blur the current editor without reopening the panel.
- reset(): in direct mode, propose an empty value while respecting controlled ownership, disabled/readonly state, and composition. In deferred mode, open an empty draft; model and change notifications wait for final confirmation and before-commit approval. Cancellation preserves the original value.

Public methods remain callable from initial component mount. Stored methods resolve the current editor on every call and never use an old input after closure, reopening, or mode changes. Native input references are undefined while no editor is mounted.

### Keyboard and Form

Left/Right move cells. Backspace removes the current character, or the previous one when empty. Delete removes the current character; following characters shift forward. IME composition does not trim/delete/move focus. Each native input has an SSR-stable id, and all cells use autocomplete=off. Provide aria-label.

Caller-provided `aria-invalid` is forwarded to every input. A component or form error marks the inputs invalid, and clearing the error restores the caller value. The group preserves explicitly provided attributes without adding an automatic invalid state.

InputGroup/Form state is inherited, with explicit disabled/readonly/error/size taking precedence. Internal cell Inputs do not duplicate Form notifications; the complete control notifies input/change once per edit. Both platforms implement three variants/five sizes using local FieldDecorator tokens.

## Types

VerificationCodeProps、VerificationCodeType、VerificationCodeAlign、VerificationCodeVariant、VerificationCodeFormatter、VerificationCodeSeparator、VerificationCodeEmits、VerificationCodeSlots、VerificationCodeExpose、VerificationCodeInstance。

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-verification-code-cell-height` | `initial` | `height` |
| `--mp-verification-code-cell-max-width` | `initial` | `flex` |
| `--mp-verification-code-gutter` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-verification-code-input-font-size` | `initial` | `font-size` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-verification-code-input-font-size: initial;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
