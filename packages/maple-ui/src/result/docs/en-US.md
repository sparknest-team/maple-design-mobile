# Result

### Intro

It is used to show the results to users.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Status

Result status, optional values are `info`, `success`, `warning`, `danger`, `question`, `empty`.

```demo
../example/demos/type.vue
```

### Note When Modifying The Background Color

Please try not to modify the background color to be transparent or translucent, which may affect the animation effect of the success type.

## API

### Props

| Prop          | Description                                                              | Type     | Default   |
|---------------|--------------------------------------------------------------------------|----------|-----------|
| `status` | info / success / warning / danger / question / empty / 403 / 404 / 500 | _ResultStatus_ | `info` |
| `title`       | The title of Result                                                      | _string_ | `-`       |
| `subtitle` | The description of Result                                                | _string_ | `-`       |
| `image-size`  | Image Size                                                               | _string \| number_   | `-`  |
| `animation`    | Whether to enable animation, valid for `success` type only               | _boolean_ | `true`    |

### Slots

| Name                | Description      | SlotProps |
|--------------------|---------| ---- |
| `image`            | Custom image   | `-`  |
| `title`            |  Custom title   | `-`  |
| `subtitle`      |  Custom description   | `-`  |
| `footer`           | Custom bottom content | `-`  |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                           | Default                    |
|------------------------------------|----------------------------|
| `--result-background`              | `#fff`                     |
| `--result-info-color`              | `var(--color-info)`        |
| `--result-info-border-color`       | `rgba(0, 175, 239, 0.3)`   |
| `--result-success-color`           | `var(--color-success)`     |
| `--result-success-border-color`    | `rgba(0, 196, 143, 0.3)`   |
| `--result-danger-color`             | `var(--color-danger)`      |
| `--result-danger-border-color`      | `rgba(244, 67, 54, 0.3)`   |
| `--result-warning-color`           | `var(--color-warning)`     |
| `--result-warning-border-color`    | `rgba(255, 159, 0, 0.3)`   |
| `--result-question-color`          | `#607d8b`                  |
| `--result-question-border-color`   | `rgba(96, 125, 139, 0.3)`  |
| `--result-empty-color`             | `#9e9e9e`                  |
| `--result-empty-border-color`      | `rgba(158, 158, 158, 0.3)` |
| `--result-padding`                 | `24px`                     |
| `--result-border-radius`           | `3px`                      |
| `--result-title-color`             | `#444`                     |
| `--result-title-font-size`         | `32px`                     |
| `--result-title-margin`            | `15px 0 0 0`               |
| `--result-image-size`              | `80px`                     |
| `--result-title-font-weight`       | `500`                      |
| `--result-subtitle-margin`      | `10px 0 0 0`               |
| `--result-subtitle-font-size`   | `14px`                     |
| `--result-subtitle-color`       | `rgba(0, 0, 0, 0.6)`       |
| `--result-subtitle-line-height` | `1.6`                      |
