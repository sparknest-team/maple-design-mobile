# Divider

### Intro
Used to separate parts of a list or layout.

### Basic Usage
```html
<template>
  <mp-divider />
</template>
```

### Dashed Divider
```html
<template>
  <mp-divider dashed />
</template>
```

### Inset Divider
```html
<template>
  <mp-divider inset />
  <mp-divider :inset="36" margin="36px 0" />
  <mp-divider inset="-36px" />
</template>
```

### Vertical Divider
```html
<template>
  <div class="divider-example-vertical-container">
    <span>text</span>
    <mp-divider vertical />
    <span>text</span>
    <mp-divider vertical />
    <span>text</span>
  </div>
</template>

<style>
.divider-example-vertical-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.divider-example-vertical-container span {
  font-size: 14px;
  color: #888;
}
</style>
```

### Description Text
```html
<template>
  <mp-divider description="Description" />
</template>
```

### Custom Description
```html
<template>
  <mp-divider>
    <mp-icon name="heart-outline" style="margin: 0 16px; color: var(--color-danger);" />
  </mp-divider>
</template>
```

### 0.5px Divider
```html
<template>
  <mp-divider hairline />
</template>
```

## API

### Props

| Prop | Description | Type | Default | 
| --- | --- | --- | --- | 
| `inset` | Set the indentation distance, and the number plus or minus sign controls the direction of indentation. The default indentation is `72px` when `true` is passed (horizontal mode only) | _boolean \| number \| string_ | `false` |
| `vertical` | Whether to set divider to display vertically | _boolean_ | `false` |
| `dashed` | Whether divider is dashed | _boolean_ | `false` |
| `hairline` | Whether divider is `0.5px` | _boolean_ | `false` |
| `description` | The text description of divider (horizontal mode only) | _string_ | `-` |
| `margin` | Set `margin` of divider | _string_ | `-` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Custom content of divider (horizontal mode only) | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--divider-color` | `var(--color-outline)` |
| `--divider-text-color` | `#888`|
| `--divider-text-margin` | `8px 0`|
| `--divider-text-padding` | `0 8px`|
| `--divider-inset` |  `72px`|