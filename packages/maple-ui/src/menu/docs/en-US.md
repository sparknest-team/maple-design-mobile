# Menu

### Intro

Menu with selector function. Its floating layer is based on the style-agnostic [Trigger](#/en-US/trigger).

Placement stays on the Popper set (including `cover-*`), default `bottom`. Use `auto-fit-popup-width` and `popup-max-height` for same width and max height. Use `trigger="contextMenu"` with `align-point` for a context menu.

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Select Event

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleSelect(value, option, ev) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button status="primary">Please Select</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Hover Trigger

```html
<template>
  <mp-menu trigger="hover" @select="handleSelect">
    <mp-button status="primary">Hover</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Placement

Maple uses the Popper enum. The Cedar values `bl / bottom / br / tl / top / tr` map to `bottom-start / bottom / bottom-end / top-start / top / top-end`.

```html
<template>
  <mp-space>
    <mp-menu placement="bottom-start">
      <mp-button status="primary">Bottom Start</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
    <mp-menu placement="bottom">
      <mp-button status="primary">Bottom</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
    <mp-menu placement="bottom-end">
      <mp-button status="primary">Bottom End</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
    <mp-menu placement="top-start">
      <mp-button status="primary">Top Start</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
    <mp-menu placement="top">
      <mp-button status="primary">Top</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
    <mp-menu placement="top-end">
      <mp-button status="primary">Top End</mp-button>
      <template #content>
        <mp-menu-option label="Option 1" />
        <mp-menu-option label="Option 2" />
        <mp-menu-option label="Option 3" />
      </template>
    </mp-menu>
  </mp-space>
</template>
```

### Context Menu

Set both `trigger="contextMenu"` and `align-point`.

```html
<template>
  <mp-menu trigger="contextMenu" align-point>
    <div
      style="display: flex; align-items: center; justify-content: center; height: 200px; background: var(--color-fill-2)"
    >
      Right click
    </div>
    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
      <mp-menu-option label="Option 3" />
    </template>
  </mp-menu>
</template>
```

### Size

```html
<script setup>
  import { ref } from 'vue'

  const valueNormal = ref()
  const valueSmall = ref()
  const valueMini = ref()
  const valueLarge = ref()
</script>

<template>
  <mp-space>
    <mp-menu v-model="valueNormal">
      <mp-button status="primary"> {{ valueNormal ? valueNormal : 'Normal Size' }} </mp-button>

      <template #content>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="sm" v-model="valueSmall">
      <mp-button status="primary"> {{ valueSmall ? valueSmall : 'Small Size' }} </mp-button>

      <template #content>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="xs" v-model="valueMini">
      <mp-button status="primary"> {{ valueMini ? valueMini : 'Mini Size' }} </mp-button>

      <template #content>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="lg" v-model="valueLarge">
      <mp-button status="primary"> {{ valueLarge ? valueLarge : 'Large Size' }} </mp-button>

      <template #content>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>
  </mp-space>
</template>
```

### Value Mapping

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? `value: ${value}` : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option label="Eat" :value="1" />
      <mp-menu-option label="Sleep" :value="2" />
      <mp-menu-option label="Play game" :value="3" />
    </template>
  </mp-menu>
</template>
```

### Popup Max Height

`popup-max-height` defaults to `true`. Options overflow the default max height will scroll. Pass a number for a pixel height, or `false` to disable the limit.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option v-for="option in options" :key="option.value" :label="option.label" />
    </template>
  </mp-menu>
</template>
```

### Option Disabled

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" disabled />
    </template>
  </mp-menu>
</template>
```

### Multiple

```html
<script setup>
  import { ref } from 'vue'

  const value = ref([])
</script>

<template>
  <mp-menu multiple v-model="value">
    <mp-button status="primary">{{ value.length ? value : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
      <mp-menu-option label="Coding" />
      <mp-menu-option label="Rest" />
    </template>
  </mp-menu>
</template>
```

### Keep Open On Select

Set `hide-on-select` to `false` to keep the menu open after selecting. By default the menu closes on select. In multiple mode the menu never closes from selection.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu :hide-on-select="false" v-model="value">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Option Group

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleSelect(value) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button status="primary">Option Group</mp-button>

    <template #content>
      <mp-menu-group title="Daily">
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
      </mp-menu-group>
      <mp-menu-group title="Work">
        <mp-menu-option label="Coding" />
        <mp-menu-option label="Rest" />
      </mp-menu-group>
    </template>
  </mp-menu>
</template>
```

### Icon

```html
<template>
  <mp-menu>
    <mp-button status="primary">Icon</mp-button>

    <template #content>
      <mp-menu-option label="Eat">
        <template #icon>
          <m-icon-star-fill :size="18" />
        </template>
      </mp-menu-option>
      <mp-menu-option label="Sleep">
        <template #icon>
          <m-icon-star-fill :size="18" />
        </template>
      </mp-menu-option>
    </template>
  </mp-menu>
</template>
```

### Footer

```html
<template>
  <mp-menu>
    <mp-button status="primary">Footer</mp-button>

    <template #content>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
    </template>
    <template #footer>
      <div style="padding: 8px 12px">Custom footer</div>
    </template>
  </mp-menu>
</template>
```

### Options API

Pass options as an array to the `options` prop.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref([
    {
      label: 'Eat',
      value: 1,
    },
    {
      label: 'Sleep',
      value: 2,
    },
    {
      label: 'Play game',
      value: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-menu v-model="value" :options="options">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Cascade

Pass a `children` array on an option to enable cascade.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref([
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
      children: [
        {
          label: '2-1',
          value: 21,
          children: [
            {
              label: '2-1-1',
              value: 211,
            },
            {
              label: '2-1-2',
              value: 212,
            },
          ],
        },
        {
          label: '2-2',
          value: 22,
        },
      ],
    },
    {
      label: '3',
      value: 3,
    },
  ])
</script>

<template>
  <mp-menu v-model="value" :options="options">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Multiple Cascade

Add `multiple` on top of cascade.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref([])
  const options = ref([
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
      children: [
        {
          label: '2-1',
          value: 21,
          children: [
            {
              label: '2-1-1',
              value: 211,
            },
            {
              label: '2-1-2',
              value: 212,
            },
          ],
        },
        {
          label: '2-2',
          value: 22,
        },
      ],
    },
    {
      label: '3',
      value: 3,
    },
  ])
</script>

<template>
  <mp-menu multiple v-model="value" :options="options">
    <mp-button status="primary">{{ value.length ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Options API (With Customized Key)

Pass options as an array and map fields with `field-names`. Cascade selection uses the same mapping.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref([
    {
      name: 'Eat',
      id: 1,
    },
    {
      name: 'Sleep',
      id: 2,
    },
    {
      name: 'Play game',
      id: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-menu v-model="value" :options="options" :field-names="{ label: 'name', value: 'id' }">
    <mp-button status="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

## API

### Props

#### Menu Props

| Prop                       | Description                                                                                                                                                                    | Type                                       | Default    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------- |
| `v-model`                  | The value of the binding                                                                                                                                                       | _any \| any[]_                             | `-`        |
| `v-model:open`             | Whether the menu is open                                                                                                                                                       | _boolean_                                  | `-`        |
| `default-open`             | Whether the menu is open by default in uncontrolled mode                                                                                                                       | _boolean_                                  | `false`    |
| `size`                     | Menu size, optional values `xs` `sm` `md` `lg` `xl`                                                                                                                            | _string_                                   | `md`       |
| `multiple`                 | Whether to select multiple                                                                                                                                                     | _boolean_                                  | `false`    |
| `popup-max-height`         | Maximum popup height. `true` uses the default height, `false` disables the limit, a `number` is a pixel value                                                                  | _boolean \| number_                        | `true`     |
| `auto-fit-popup-width`     | Whether to same width as trigger element                                                                                                                                       | _boolean_                                  | `false`    |
| `hide-on-select`           | Whether to hide the menu after a menu item is selected (the menu never closes from selection in multi-select mode)                                                             | _boolean_                                  | `true`     |
| `placement`                | Menu popup placement                                                                                                                                                           | _Placement_                                | `bottom`   |
| `strategy`                 | Menu position strategy, optional value is `absolute` `fixed`                                                                                                                   | _string_                                   | `absolute` |
| `offset-x`                 | The x-axis offset, relative to the menu-aligned position                                                                                                                       | _number \| string_                         | `0`        |
| `offset-y`                 | The y-axis offset, relative to the menu-aligned position                                                                                                                       | _number \| string_                         | `0`        |
| `popup-container`          | The location of the menu mount                                                                                                                                                 | _TeleportProps['to'] \| false_             | `body`     |
| `disabled`                 | Whether to disable the menu                                                                                                                                                    | _boolean_                                  | `false`    |
| `trigger`                  | Menu trigger method, optional value is `click` `hover` `manual` `contextMenu`                                                                                                  | _string_                                   | `click`    |
| `align-point`              | Whether the popup follows the mouse (used with `contextMenu`)                                                                                                                  | _boolean_                                  | `false`    |
| `reference`                | The trigger element associated with the menu, the `string` type is the descendant element selector of the menu component, the `HTMLElement` type is any specified element node | _string \| HTMLElement_                    | `-`        |
| `elevation`                | Elevation level, options `true` `false` and level of `0-24`                                                                                                                    | _string \| number \| boolean_              | `true`     |
| `popup-class`              | Class of the floating layer                                                                                                                                                    | _ClassName_                                | `-`        |
| `close-on-click-reference` | Whether to close the menu when clicking the reference element                                                                                                                  | _boolean_                                  | `false`    |
| `options`                  | Specifies options                                                                                                                                                              | _MenuOption[]_                             | `[]`       |
| `field-names`              | Custom field mapping for `options`                                                                                                                                             | _{ label?, value?, children?, disabled? }_ | `-`        |

#### MenuOption Data Fields

Used by items in the `options` array.

| Prop       | Description                    | Type                                                                       | Default |
| ---------- | ------------------------------ | -------------------------------------------------------------------------- | ------- |
| `label`    | The text of option             | _string \| VNode \| (option: MenuOption, selected: boolean) => VNodeChild_ | `-`     |
| `value`    | The value of option            | _any_                                                                      | `-`     |
| `children` | The children options of option | _MenuOption[]_                                                             | `-`     |
| `disabled` | Whether to disable option      | _boolean_                                                                  | `-`     |
| `ripple`   | Whether to enable ripple       | _boolean_                                                                  | `true`  |

#### MenuOption Props

| Prop       | Description                       | Type      | Default |
| ---------- | --------------------------------- | --------- | ------- |
| `label`    | The text that the option displays | _any_     | `-`     |
| `value`    | The value of the option binding   | _any_     | `-`     |
| `disabled` | Whether to disable                | _boolean_ | `false` |
| `ripple`   | Whether to enable ripple          | _boolean_ | `true`  |

#### MenuGroup Props

| Prop    | Description | Type     | Default |
| ------- | ----------- | -------- | ------- |
| `title` | Group title | _string_ | `-`     |

### Placement

| Prop                 | Description                             |
| -------------------- | --------------------------------------- |
| `top`                | Top center position                     |
| `top-start`          | Top left position                       |
| `top-end`            | Top right position                      |
| `bottom`             | Bottom center position                  |
| `bottom-start`       | Bottom left position                    |
| `bottom-end`         | Bottom right position                   |
| `right`              | Right center position                   |
| `right-start`        | Right top position                      |
| `right-end`          | Right bottom position                   |
| `left`               | Left center position                    |
| `left-start`         | Left top position                       |
| `left-end`           | Left bottom position                    |
| `cover-top`          | Top center position, overlay trigger    |
| `cover-top-start`    | Top left position, overlay trigger      |
| `cover-top-end`      | Top right position, overlay trigger     |
| `cover-bottom`       | Bottom center position, overlay trigger |
| `cover-bottom-start` | Bottom left position, overlay trigger   |
| `cover-bottom-end`   | Bottom right position, overlay trigger  |
| `cover-left`         | Left center position, overlay trigger   |
| `cover-right`        | Right center position, overlay trigger  |

### Methods

#### Menu Methods

| Method         | Description                                                                                                    | Arguments                                                             | Return |
| -------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ |
| `open`         | Open Menu                                                                                                      | `-`                                                                   | `-`    |
| `close`        | Close Menu                                                                                                     | `-`                                                                   | `-`    |
| `resize`       | This method can be called to redraw when the default slot element of Menu select changes its position and size | `-`                                                                   | `-`    |
| `setReference` | Set the trigger element associated with the menu                                                               | `reference: consistent with the reference of the component attribute` | `-`    |

### Events

#### Menu Events

| Event           | Description                                                                                                                                  | Arguments                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `open`          | Triggered when the menu is opened                                                                                                            | `-`                                          |
| `opened`        | Triggered when the open menu animation ends                                                                                                  | `-`                                          |
| `close`         | Triggered when the menu is closed                                                                                                            | `-`                                          |
| `closed`        | Triggered when the closing menu animation ends                                                                                               | `-`                                          |
| `click-outside` | Triggered when clicking outside the menu                                                                                                     | `event: Event`                               |
| `select`        | Triggered when the user selects a menu item. In controlled mode, whether the selected state changes depends on whether `v-model` is updated. | `value: any, option: MenuOption, ev?: Event` |
| `open-change`   | Triggered when open state changes                                                                                                            | `open: boolean`                              |
| `key-escape`    | Triggered when Escape closes the menu                                                                                                        | `-`                                          |

### Slots

#### Menu Slots

| Name      | Description                 | SlotProps |
| --------- | --------------------------- | --------- |
| `default` | Menu select trigger element | `-`       |
| `content` | Menu options                | `-`       |
| `footer`  | Menu footer                 | `-`       |

#### MenuOption Slots

| Name      | Description                    | SlotProps |
| --------- | ------------------------------ | --------- |
| `default` | Options to display the content | `-`       |
| `icon`    | Option icon                    | `-`       |

#### MenuGroup Slots

| Name      | Description   | SlotProps |
| --------- | ------------- | --------- |
| `title`   | Group title   | `-`       |
| `default` | Group content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Menu Variables

| Variable                  | Default               |
| ------------------------- | --------------------- |
| `--menu-max-height`       | `278px`               |
| `--menu-padding`          | `4px 0`               |
| `--menu-border-radius`    | `2px`                 |
| `--menu-border-color`     | `var(--color-fill-3)` |
| `--menu-background-color` | `var(--color-fill-2)` |

#### MenuOption Variables

| Variable                            | Default                      |
| ----------------------------------- | ---------------------------- |
| `--menu-option-md-height`           | `38px`                       |
| `--menu-option-sm-height`           | `30px`                       |
| `--menu-option-xs-height`           | `24px`                       |
| `--menu-option-lg-height`           | `46px`                       |
| `--menu-option-xl-height`           | `54px`                       |
| `--menu-option-padding`             | `0 12px`                     |
| `--menu-option-md-font-size`        | `var(--font-size-md)`        |
| `--menu-option-sm-font-size`        | `var(--font-size-sm)`        |
| `--menu-option-xs-font-size`        | `var(--font-size-xs)`        |
| `--menu-option-lg-font-size`        | `var(--font-size-lg)`        |
| `--menu-option-xl-font-size`        | `var(--font-size-lg)`        |
| `--menu-option-selected-background` | `var(--color-primary)`       |
| `--menu-option-selected-text-color` | `var(--color-primary)`       |
| `--menu-option-bg-hover`            | `var(--color-fill-3)`        |
| `--menu-option-text-color`          | `var(--color-text-1)`        |
| `--menu-option-disabled-color`      | `var(--color-text-disabled)` |
| `--menu-option-arrow-padding`       | `0 6px 0 8px`                |
| `--menu-option-arrow-icon-size`     | `18px`                       |
| `--menu-option-icon-margin-right`   | `8px`                        |

#### MenuGroup Variables

| Variable                        | Default               |
| ------------------------------- | --------------------- |
| `--menu-group-title-height`     | `24px`                |
| `--menu-group-title-padding`    | `8px 12px 4px`        |
| `--menu-group-title-font-size`  | `var(--font-size-sm)` |
| `--menu-group-title-text-color` | `var(--color-text-3)` |

## API

### Props

| Prop       | Description                       | Type      | Default |
| ---------- | --------------------------------- | --------- | ------- |
| `label`    | The text that the option displays | _any_     | `-`     |
| `value`    | The value of the option binding   | _any_     | `-`     |
| `disabled` | Whether to disable                | _boolean_ | `false` |
| `ripple`   | Whether to enable ripple          | _boolean_ | `true`  |

### Slots

| Name      | Description                    | SlotProps |
| --------- | ------------------------------ | --------- |
| `default` | Options to display the content | `-`       |
| `icon`    | Option icon                    | `-`       |

## API

### Props

| Prop    | Description | Type     | Default |
| ------- | ----------- | -------- | ------- |
| `title` | Group title | _string_ | `-`     |

### Slots

| Name      | Description   | SlotProps |
| --------- | ------------- | --------- |
| `title`   | Group title   | `-`       |
| `default` | Group content | `-`       |
