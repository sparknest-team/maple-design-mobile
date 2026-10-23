# Steps

## Examples

### Intro

Steps is a navigation bar that guides users through the steps of a task. Progress is controlled by `current`, counted from **1** (aligned with Pagination / PC).

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Error Status

```demo
../example/demos/error-status.vue
```

### Changeable

```demo
../example/demos/changeable.vue
```

### Vertical Mode

```demo
../example/demos/vertical.vue
```

### Appearance combinations

Use this example for the current state of a multi-step flow. Adjust status, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

#### Steps Props

| Prop                | Description                                | Type                                            | Default      |
| ------------------- | ------------------------------------------ | ----------------------------------------------- | ------------ |
| `current`           | Current step (controlled, 1-based)         | _number_                                        | `-`          |
| `default-current`   | Default current step (uncontrolled)        | _number_                                        | `1`          |
| `type`              | Display type                               | _'default' \| 'arrow' \| 'dot' \| 'navigation'_ | `default`    |
| `orientation`       | Layout orientation                         | _'horizontal' \| 'vertical'_                    | `horizontal` |
| `content-placement` | Content position relative to the indicator | _'right' \| 'bottom'_                           | `right`      |
| `status`            | Status of the current step                 | _'wait' \| 'process' \| 'finish' \| 'error'_    | `process`    |
| `size`              | Steps size                                 | _'sm' \| 'md'_                                  | `md`         |
| `show-line`         | Whether to show connectors                 | _boolean_                                       | `true`       |
| `changeable`        | Whether steps can be switched by click     | _boolean_                                       | `false`      |

#### Step Props

| Prop          | Description                             | Type                                         | Default |
| ------------- | --------------------------------------- | -------------------------------------------- | ------- |
| `title`       | Step title                              | _string_                                     | `-`     |
| `description` | Step description                        | _string_                                     | `-`     |
| `status`      | Step status (overrides auto derivation) | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-`     |
| `disabled`    | Whether disabled                        | _boolean_                                    | `false` |

### Events

#### Steps Events

| Event            | Description                                         | Arguments                                      |
| ---------------- | --------------------------------------------------- | ---------------------------------------------- |
| `change`         | Triggered when step changes (`changeable` required) | `current: number, previous: number, ev: Event` |
| `update:current` | `v-model:current` sync                              | `step: number`                                 |

### Slots

#### Steps Slots

| Name          | Description          | Arguments |
| ------------- | -------------------- | --------- |
| `default`     | Steps content        | `-`       |
| `finish-icon` | Finished status icon | `-`       |
| `error-icon`  | Error status icon    | `-`       |

#### Step Slots

| Name          | Description                                | Arguments                               |
| ------------- | ------------------------------------------ | --------------------------------------- |
| `default`     | Step title (takes precedence over `title`) | `index`, `status`, `active`, `disabled` |
| `title`       | Step title                                 | `index`, `status`, `active`, `disabled` |
| `node`        | Full indicator node                        | `index`, `status`, `active`, `disabled` |
| `icon`        | Custom node icon                           | `index`, `status`, `active`, `disabled` |
| `description` | Step description                           | `index`, `status`, `active`, `disabled` |

### CSS Variables

All variables can be overridden through StyleProvider or CSS.

| Variable                                                   | Default                                                                                                                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mp-steps-size-md`                                       | `28px`                                                                                                                                               |
| `--mp-steps-size-sm`                                       | `24px`                                                                                                                                               |
| `--mp-steps-size-md-arrow`                                 | `72px`                                                                                                                                               |
| `--mp-steps-size-sm-arrow`                                 | `40px`                                                                                                                                               |
| `--mp-steps-size-md-icon-font-size`                        | `16px`                                                                                                                                               |
| `--mp-steps-size-md-title-font-size`                       | `var(~'--mp-font-size-lg')`                                                                                                                          |
| `--mp-steps-size-md-description-font-size`                 | `var(~'--mp-font-size-sm')`                                                                                                                          |
| `--mp-steps-size-sm-icon-font-size`                        | `var(--mp-sys-font-size-md)`                                                                                                                         |
| `--mp-steps-size-sm-title-font-size`                       | `var(--mp-sys-font-size-md)`                                                                                                                         |
| `--mp-steps-size-sm-description-font-size`                 | `var(~'--mp-font-size-sm')`                                                                                                                          |
| `--mp-steps-label-vertical-content-width`                  | `100%`                                                                                                                                               |
| `--mp-steps-direction-horizontal-description-width`        | `140px`                                                                                                                                              |
| `--mp-steps-circle-item-tail-size`                         | `1px`                                                                                                                                                |
| `--mp-steps-circle-item-icon-gap`                          | `12px`                                                                                                                                               |
| `--mp-steps-circle-item-title-font-weight-active`          | `500`                                                                                                                                                |
| `--mp-steps-circle-item-icon-border-radius`                | `50%`                                                                                                                                                |
| `--mp-steps-circle-horizontal-item-description-margin-top` | `2px`                                                                                                                                                |
| `--mp-steps-circle-vertical-item-description-margin-top`   | `2px`                                                                                                                                                |
| `--mp-steps-circle-item-bg-wait`                           | `var(--mp-sys-color-surface-muted)` |
| `--mp-steps-circle-item-border-color-wait`                 | `transparent` |
| `--mp-steps-circle-item-icon-text-color-wait`              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-tail-color-wait`                   | `var(--mp-sys-color-border-default)` |
| `--mp-steps-circle-item-title-color-wait`                  | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-description-color-wait`            | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-process`                        | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-border-color-process`              | `transparent` |
| `--mp-steps-circle-item-icon-text-color-process`           | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-circle-item-tail-color-process`                | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-title-color-process`               | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-process`         | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-finish`                         | `var(--mp-sys-color-state-selected)` |
| `--mp-steps-circle-item-border-color-finish`               | `transparent` |
| `--mp-steps-circle-item-icon-text-color-finish`            | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-circle-item-title-color-finish`                | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-finish`          | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-circle-item-bg-error`                          | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-circle-item-border-color-error`                | `transparent` |
| `--mp-steps-circle-item-icon-text-color-error`             | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-circle-item-tail-color-error`                  | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-circle-item-title-color-error`                 | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-circle-item-description-color-error`           | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-size-md-item-icon-margin-left`                 | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-md')) / 2)`                                                           |
| `--mp-steps-size-sm-item-icon-margin-left`                 | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-size-sm')) / 2)`                                                           |
| `--mp-steps-dot-horizontal-item-title-margin-top`          | `4px`                                                                                                                                                |
| `--mp-steps-dot-horizontal-item-description-margin-top`    | `4px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-description-margin-top`      | `4px`                                                                                                                                                |
| `--mp-steps-dot-item-icon-size`                            | `8px`                                                                                                                                                |
| `--mp-steps-dot-item-icon-size-active`                     | `10px`                                                                                                                                               |
| `--mp-steps-dot-item-icon-gap`                             | `4px`                                                                                                                                                |
| `--mp-steps-dot-item-tail-size`                            | `1px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-icon-margin-right`           | `16px`                                                                                                                                               |
| `--mp-steps-dot-item-title-font-weight-active`             | `500`                                                                                                                                                |
| `--mp-steps-dot-item-icon-border-radius`                   | `50%`                                                                                                                                                |
| `--mp-steps-dot-item-bg-wait`                              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-border-color-wait`                    | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-tail-color-wait`                      | `var(--mp-sys-color-border-default)` |
| `--mp-steps-dot-item-title-color-wait`                     | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-description-color-wait`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-process`                           | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-border-color-process`                 | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-tail-color-process`                   | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-title-color-process`                  | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-process`            | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-finish`                            | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-border-color-finish`                  | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-dot-item-title-color-finish`                   | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-finish`             | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-bg-error`                             | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-border-color-error`                   | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-tail-color-error`                     | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-dot-item-title-color-error`                    | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-dot-item-description-color-error`              | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-dot-item-icon-margin-left`                     | `calc((var(~'--mp-steps-label-vertical-content-width') - var(~'--mp-steps-dot-item-icon-size')) / 2)`                                                |
| `--mp-steps-dot-vertical-item-dot-margin-top`              | `8px`                                                                                                                                                |
| `--mp-steps-dot-vertical-item-dot-margin-top-active`       | `calc(var(~'--mp-steps-dot-vertical-item-dot-margin-top') - (var(~'--mp-steps-dot-item-icon-size-active') - var(~'--mp-steps-dot-item-icon-size')))` |
| `--mp-steps-arrow-item-gap`                                | `4px`                                                                                                                                                |
| `--mp-steps-arrow-size-md-title-padding-left`              | `16px`                                                                                                                                               |
| `--mp-steps-arrow-size-sm-title-padding-left`              | `20px`                                                                                                                                               |
| `--mp-steps-arrow-item-description-margin-top`             | `0`                                                                                                                                                  |
| `--mp-steps-arrow-item-title-font-weight-active`           | `500`                                                                                                                                                |
| `--mp-steps-arrow-item-bg-wait`                            | `var(--mp-sys-color-surface-muted)` |
| `--mp-steps-arrow-item-title-color-wait`                   | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-description-color-wait`             | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-bg-process`                         | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-arrow-item-title-color-process`                | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-description-color-process`          | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-bg-finish`                          | `var(--mp-sys-color-state-selected)` |
| `--mp-steps-arrow-item-title-color-finish`                 | `var(--mp-sys-color-content-primary)` |
| `--mp-steps-arrow-item-description-color-finish`           | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-arrow-item-bg-error`                           | `var(--mp-sys-color-content-danger)` |
| `--mp-steps-arrow-item-title-color-error`                  | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-arrow-item-description-color-error`            | `var(--mp-sys-color-surface-default)` |
| `--mp-steps-navigation-arrow-color`                        | `var(--mp-sys-color-content-secondary)` |
| `--mp-steps-navigation-arrow-size`                         | `6px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-line-width`                   | `2px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-top`                          | `10px`                                                                                                                                               |
| `--mp-steps-navigation-padding-left`                       | `20px`                                                                                                                                               |
| `--mp-steps-navigation-margin-right`                       | `32px`                                                                                                                                               |
| `--mp-steps-navigation-arrow-spacing-right`                | `10px`                                                                                                                                               |
| `--mp-steps-navigation-ink-spacing-left`                   | `0`                                                                                                                                                  |
| `--mp-steps-navigation-ink-spacing-right`                  | `30px`                                                                                                                                               |
| `--mp-steps-navigation-ink-bg`                             | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-changeable-hover-text-color`                   | `var(--mp-sys-color-content-brand)` |
| `--mp-steps-node-font-weight`                              | `500`                                                                                                                                                |
| `--mp-steps-transition-duration-1`                         | `0.1s`                                                                                                                                               |
| `--mp-steps-transition-timing-function-linear`             | `cubic-bezier(0, 0, 1, 1)`                                                                                                                           |
| `--mp-steps-vertical-item-min-height`                      | `90px`                                                                                                                                               |
| `--mp-steps-circle-tail-hack-width`                        | `5000px`                                                                                                                                             |
| `--mp-steps-circle-vertical-tail-padding-extra`            | `6px`                                                                                                                                                |
| `--mp-steps-dot-vertical-tail-padding-top-extra`           | `4px`                                                                                                                                                |
| `--mp-steps-dot-vertical-tail-padding-bottom`              | `2px`                                                                                                                                                |
| `--mp-steps-navigation-content-margin-bottom`              | `20px`                                                                                                                                               |
| `--mp-steps-navigation-description-padding-right`          | `20px`                                                                                                                                               |
| `--mp-steps-navigation-ink-height`                         | `2px`                                                                                                                                                |
| `--mp-steps-navigation-arrow-right`                        | `30px`                                                                                                                                               |
