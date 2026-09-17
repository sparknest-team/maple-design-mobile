# VerificationCode

### Intro

Multi-box short code input for SMS / email verification. Public API aligns with Cedar `VerificationCode`. `v-model` is always a full string.

### Basic Usage

```demo
../example/demos/basic.vue
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Bound value | _string_ | `-` |
| `default-value` | Default value (uncontrolled) | _string_ | `''` |
| `length` | Number of cells | _number_ | `6` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `type` | `digit` `text` `alphanumeric` (Maple) | _string_ | `digit` |
| `variant` | `standard` `outline` (Maple) | _string_ | `outline` |
| `masked` | Mask mode | _boolean_ | `false` |
| `mask-symbol` | Mask character (Maple) | _string_ | `•` |
| `disabled` | Disabled | _boolean_ | `false` |
| `readonly` | Readonly | _boolean_ | `false` |
| `error` | Error state | _boolean_ | `false` |
| `autofocus` | Autofocus (Maple) | _boolean_ | `false` |
| `gutter` | Cell gutter (Maple) | _string \| number_ | `8` |
| `align` | `start` `center` `end` (Maple) | _string_ | `center` |
| `allow-paste` | Allow paste (Maple) | _boolean_ | `true` |
| `paste-transform` | Paste transformer (Maple) | _(value: string) => string_ | `-` |
| `separator` | Separator renderer | _(index: number, character: string) => VNode \| string \| null_ | `-` |
| `formatter` | Input formatter | _(inputValue: string, index: number, value: string) => string \| boolean_ | `-` |
| `aria-label` | Aria label | _string_ | `-` |
| `text-color` | Text color (Maple) | _string_ | `-` |
| `focus-color` | Focus color (Maple) | _string_ | `-` |
| `blur-color` | Blur color (Maple) | _string_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Value changed | `value: string` |
| `finish` | All cells filled | `value: string` |
| `input` | Cell input | `inputValue: string`, `index: number`, `ev: Event` |
| `click` | Root click (Maple) | `event: Event` |
| `paste` | Paste (Maple) | `value: string`, `event: ClipboardEvent` |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `focus` | Focus first empty or given index | `index?: number` |
| `blur` | Blur all cells | `-` |
| `reset` | Clear value | `-` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `separator` | Custom separator | `index: number`, `character: string` |

### CSS Variables

| Variable | Default |
| --- | --- |
| `--mp-verification-code-gutter` | `8px` |
| `--mp-verification-code-cell-height` | `48px` |
| `--mp-verification-code-cell-max-width` | `48px` |
| `--mp-verification-code-input-font-size` | `20px` |
