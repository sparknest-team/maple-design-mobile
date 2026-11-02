<!-- Source: src/verification-code/docs/en-US.md; locale: en-US; page: /en-US/verification-code -->

# VerificationCode

Independent cross-platform source copies built on Input.

## Examples

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

### formatting

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

### appearance

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

### Appearance combinations

Use this example for segmented verification-code input. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/verification-code/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('123456')
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-verification-code v-model="value" :length="6" v-bind="__demoAppearance"></mp-verification-code>
  </mp-space>
</template>
```

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

## API

| Prop | Type | Default / behavior |
| --- | --- | --- |
| model-value / default-value | string | controlled / initial uncontrolled code |
| length | number | 6, positive integer |
| type | digit / text / alphanumeric | digit |
| size | xs / sm / md / lg / xl | inherits Form, then md |
| variant | filled / outline / standard | inherits InputGroup, then outline |
| disabled / readonly / error | boolean | undefined; explicit values override Form |
| masked / mask-symbol | boolean / string | false / •; display only, not encryption |
| autofocus | boolean | false |
| gutter | number / string | token; numbers use px |
| align | start / center / end | center |
| allow-paste | boolean | true; false prevents native paste |
| paste-transform | (text: string) => string | before filtering and formatting |
| formatter | (character, index, value) => string / boolean | false rejects; strings use first valid Unicode code point |
| separator | (index, character) => VNodeChild | content between cells |
| aria-label | string | group and numbered cell names |
| text-color / focus-color / blur-color | string | dynamic instance colors |

### Events and model

input(character, index, event) → update:model-value(value) → change(value). change is a whole-code edit proposal; controlled parents may reject it. finish(value) fires only after a complete proposal is accepted in the current render cycle. Further accepted edits of a complete code fire finish again. External assignments, including delayed acceptance, never emit finish. paste(text, event) reports transformed and filtered text. focus/blur report entry/exit of the whole control; internal cell movement does not duplicate Form notifications. click reports enabled clicks.

Pasting starts at the target cell (root paste starts at zero). A complete SMS code received by one input is distributed across cells. Typing a single character replaces the current cell even when the caret is after the existing character; composition uses its committed data (including multiple code points), falling back to the native value only when committed data is missing or empty. Filtering runs before formatter; rejected characters do not consume cells. Text length counts Unicode code points, not grapheme clusters. External values are normalized for display without automatic writeback.

### Slots and methods

separator({ index, character }) overrides the separator prop; never shown after the last cell.

focus(index?) targets the first empty cell by default, or the last cell when full. Disabled controls cannot focus; readonly controls can focus for copying. blur() moves focus out. reset() proposes an empty code through update:model-value/change, without synthetic input; disabled, readonly and composition states block reset.

### Keyboard and accessibility

Left/right arrows move focus. Backspace removes the current character, or the previous one when empty. Delete removes the current character. Remaining characters shift left. IME composition never truncates or moves focus prematurely. Each native input has a unique SSR-stable id. All cells use autocomplete=off. Supply aria-label for numbered accessible names.

## Types

VerificationCodeProps, VerificationCodeType, VerificationCodeAlign, VerificationCodeVariant, VerificationCodeFormatter, VerificationCodeSeparator, VerificationCodeEmits, VerificationCodeSlots, VerificationCodeExpose, VerificationCodeInstance.

## Style variables

| Token | Default |
| --- | --- |
| --mp-verification-code-gutter | var(--mp-sys-space-2) |
| --mp-verification-code-cell-height | initial: size-derived field height fallback |
| --mp-verification-code-cell-max-width | initial: size-derived field height fallback |
| --mp-verification-code-input-font-size | initial: size-derived field font fallback |

Public overrides are optional; fallback variables resolve on the component element. All five sizes and all three variants are implemented.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
