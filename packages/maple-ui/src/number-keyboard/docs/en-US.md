# NumberKeyboard

## Examples

### Intro

A bottom popup virtual keyboard for numeric or password input flows.

### Basic Usage

```demo
../example/demos/basic.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

Use `v-model:open` for the panel state; `defaultOpen` initializes uncontrolled opening once, without emitting an initialization update.

### Model and default value

Use ordinary `v-model`. `modelValue` is the entered text. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

The keyboard panel uses an independent `open/defaultOpen` model with `update:open`. Text and panel opening are separate states.

### Props

| Prop                    | Description                      | Type                        | Default    |
| ----------------------- | -------------------------------- | --------------------------- | ---------- |
| `v-model`               | Current value                    | `string`                    | `''`       |
| `v-model:open`          | Whether keyboard is visible      | `boolean`                   | `false`    |
| `title`                 | Keyboard title                   | `string`                    | `-`        |
| `theme`                 | Keyboard layout                  | `default \| custom`         | `default`  |
| `max-length`             | Max input length                 | `number \| string`          | `Infinity` |
| `extra-key`             | Extra bottom-left key(s)         | `string \| string[]`        | `''`       |
| `close-button-text`     | Done button text in custom theme | `string`                    | `Done`     |
| `delete-button-text`    | Delete key text; icon when empty | `string`                    | `-`        |
| `show-delete-key`       | Show delete key                  | `boolean`                   | `true`     |
| `random-key-order`      | Shuffle 1-9 keys                 | `boolean`                   | `false`    |
| `hide-on-click-outside` | Close when overlay is clicked    | `boolean`                   | `true`     |
| `overlay`               | Show overlay                     | `boolean`                   | `true`     |
| `overlay-class`         | Overlay class                    | `string`                    | `-`        |
| `overlay-style`         | Overlay style                    | `object`                    | `-`        |
| `lock-scroll`           | Lock background scroll           | `boolean`                   | `true`     |
| `esc-to-close`          | Close on Escape                  | `boolean`                   | `true`     |
| `popup-container`        | Teleport target                  | `string \| HTMLElement \| false` | `body`     |
| `safe-area`             | Enable bottom safe area          | `boolean`                   | `true`     |

### Events

| Event        | Description                    | Arguments     |
| ------------ | ------------------------------ | ------------- |
| `input`      | Emitted on key press           | `key: string` |
| `delete`     | Emitted on delete              | `-`           |
| `close`      | Emitted on close               | `-`           |
| `blur`       | Emitted on close               | `-`           |
| `open`       | Emitted on open                | `-`           |
| `opened`     | Emitted after open transition  | `-`           |
| `closed`     | Emitted after close transition | `-`           |
| `key-escape` | Emitted on Escape              | `-`           |
