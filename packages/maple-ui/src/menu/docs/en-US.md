# Menu

### Intro

Menu with selector function. The popup layer is based on [Popover](#/en-US/popover), and some functions are used in the same way.

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #options>
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

  function handleSelect(value) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button type="primary">Please Select</mp-button>

    <template #options>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Button Dropdown

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleClick() {
    Message('Publish')
  }

  function handleSelect(value) {
    Message(`Action: ${value}`)
  }
</script>

<template>
  <mp-space :size="[10, 10]">
    <mp-menu position="br" @select="handleSelect">
      <mp-button-group status="primary">
        <mp-button @click.stop="handleClick">Publish</mp-button>
        <mp-button style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="Save now" />
        <mp-menu-option label="Save and Publish" />
      </template>
    </mp-menu>

    <mp-menu disabled position="br">
      <mp-button-group status="primary">
        <mp-button disabled>Disabled</mp-button>
        <mp-button disabled style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="Save now" />
        <mp-menu-option label="Save and Publish" />
      </template>
    </mp-menu>

    <mp-menu position="br" @select="handleSelect">
      <mp-button-group status="primary">
        <mp-button @click.stop="handleClick">Publish</mp-button>
        <mp-button style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="Save now" />
        <mp-menu-option label="Save and Publish" />
      </template>
    </mp-menu>
  </mp-space>
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
      <mp-button type="primary"> {{ valueNormal ? valueNormal : 'Normal Size' }} </mp-button>

      <template #options>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="small" v-model="valueSmall">
      <mp-button type="primary"> {{ valueSmall ? valueSmall : 'Small Size' }} </mp-button>

      <template #options>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="mini" v-model="valueMini">
      <mp-button type="primary"> {{ valueMini ? valueMini : 'Mini Size' }} </mp-button>

      <template #options>
        <mp-menu-option label="Eat" />
        <mp-menu-option label="Sleep" />
        <mp-menu-option label="Play game" />
      </template>
    </mp-menu>

    <mp-menu size="large" v-model="valueLarge">
      <mp-button type="primary"> {{ valueLarge ? valueLarge : 'Large Size' }} </mp-button>

      <template #options>
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
    <mp-button type="primary">{{ value ? `value: ${value}` : 'Please Select' }}</mp-button>

    <template #options>
      <mp-menu-option label="Eat" :value="1" />
      <mp-menu-option label="Sleep" :value="2" />
      <mp-menu-option label="Play game" :value="3" />
    </template>
  </mp-menu>
</template>
```

### Scrollable

Make the menu scrollable by turning on `scrollable`.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
</script>

<template>
  <mp-menu scrollable v-model="value">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #options>
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
  <mp-menu scrollable v-model="value">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #options>
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
    <mp-button type="primary">{{ value.length ? value : 'Please Select' }}</mp-button>

    <template #options>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
      <mp-menu-option label="Coding" />
      <mp-menu-option label="Rest" />
    </template>
  </mp-menu>
</template>
```

### Disable Close On Select

Close `close-on-select` disables closing the menu when selecting an option. The default behavior is to close the menu when selecting an option, which is not allowed in multi-select mode.

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu :close-on-select="false" v-model="value">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>

    <template #options>
      <mp-menu-option label="Eat" />
      <mp-menu-option label="Sleep" />
      <mp-menu-option label="Play game" />
    </template>
  </mp-menu>
</template>
```

### Options API

You can pass the options as an array to the `options` property.

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
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Cascade

An array of options may be passed to the `children` attribute of options to achieve a cascading effect.

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
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Multiple Cascade

Cascading multiple selections can be achieved by setting the `multiple` attribute on the basis of cascading single selections.

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
  <mp-menu multiple v-model="value" :options="options">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

### Options API With Customized Key

You can pass the options as an array of objects to the `options` property. Use the `label-key` and `value-key` properties to specify the fields for the label and value within the options array.

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
  <mp-menu v-model="value" :options="options" label-key="name" value-key="id">
    <mp-button type="primary">{{ value ? value : 'Please Select' }}</mp-button>
  </mp-menu>
</template>
```

## API

### Props

#### Menu Props

| Prop                       | Description                                                                                                                                                                    | Type                             | Default           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ----------------- |
| `v-model`                  | The value of the binding                                                                                                                                                       | _any \| any[]_                   | `-`               |
| `v-model:popup-visible`    | Whether the menu is visible, aligned with Cedar Menu                                                                                                                           | _boolean_                        | `-`               |
| `default-popup-visible`    | Initial visibility in uncontrolled mode                                                                                                                                        | _boolean_                        | `false`           |
| `size`                     | Menu size, optional values `normal` `mini` `small` `large`                                                                                                                     | _string_                         | `normal`          |
| `multiple`                 | Whether to select multiple                                                                                                                                                     | _boolean_                        | `false`           |
| `scrollable`               | Whether to enable scrolling                                                                                                                                                    | _boolean_                        | `false`           |
| `close-on-select`          | Whether to close the menu when a menu item is selected (the menu never closes from selection in multi-select mode)                                                            | _boolean_                        | `true`            |
| `hide-on-select`           | Whether to hide after a menu item is selected (takes precedence over `close-on-select`)                                                                                        | _boolean_                        | `-`               |
| `position`                 | Cedar-style position: `top` `tl` `tr` `bottom` `bl` `br`                                                                                                                       | _string_                         | `-`               |
| `placement`                | Menu popup placement                                                                                                                                                           | _Placement_                      | `cover-top-start` |
| `strategy`                 | Menu position strategy, optional value is `absolute` `fixed`                                                                                                                   | _string_                         | `absolute`        |
| `offset-x`                 | The x-axis offset, relative to the menu-aligned position                                                                                                                       | _number \| string_               | `0`               |
| `offset-y`                 | The y-axis offset, relative to the menu-aligned position                                                                                                                       | _number \| string_               | `0`               |
| `teleport`                 | The location of the menu mount                                                                                                                                                 | _TeleportProps['to'] \| false_   | `body`            |
| `popup-container`          | Popup mount container (takes precedence over `teleport`)                                                                                                                       | _string \| HTMLElement \| false_ | `-`               |
| `disabled`                 | Whether to disable the menu                                                                                                                                                    | _boolean_                        | `false`           |
| `trigger`                  | Menu trigger method, optional value is `click` `hover` `manual`                                                                                                                | _string_                         | `click`           |
| `reference`                | The trigger element associated with the menu, the `string` type is the descendant element selector of the menu component, the `HTMLElement` type is any specified element node | _string \| HTMLElement_          | `-`               |
| `elevation`                | Elevation level, options `true` `false` and level of `0-24`                                                                                                                    | _string \| number \| boolean_    | `true`            |
| `same-width`               | Whether to same width as trigger element                                                                                                                                       | _boolean_                        | `false`           |
| `popover-class`            | Class of the popover                                                                                                                                                           | _string_                         | `-`               |
| `close-on-click-reference` | Whether to close the menu when clicking the reference element                                                                                                                  | _boolean_                        | `false`           |
| `options` _**3.3.7**_      | Specifies options                                                                                                                                                              | _MenuOption[]_                   | `[]`              |
| `label-key` _**3.3.7**_    | As the key that uniquely identifies label                                                                                                                                      | _string_                         | `label`           |
| `value-key` _**3.3.7**_    | As the key that uniquely identifies value                                                                                                                                      | _string_                         | `value`           |
| `children-key` _**3.8.0**_ | As the key that uniquely identifies children                                                                                                                                   | _string_                         | `children`        |

#### MenuOption

| Prop                   | Description                    | Type                                                                       | Default |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------- | ------- |
| `label`                | The text of option             | _string \| VNode \| (option: MenuOption, selected: boolean) => VNodeChild_ | `-`     |
| `value`                | The value of option            | _any_                                                                      | `-`     |
| `children` _**3.8.0**_ | The children options of option | _MenuOption[]_                                                             | `-`     |
| `disabled`             | Whether to disable option      | _boolean_                                                                  | `-`     |
| `ripple`               | Whether to enable ripple       | _boolean_                                                                  | `true`  |

#### MenuOption Props

| Prop                 | Description                       | Type      | Default |
| -------------------- | --------------------------------- | --------- | ------- |
| `label`              | The text that the option displays | _any_     | `-`     |
| `value`              | The value of the option binding   | _any_     | `-`     |
| `disabled`           | Whether to disable                | _boolean_ | `false` |
| `ripple` _**3.3.0**_ | Whether to enable ripple          | _boolean_ | `true`  |

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
| `right-start`        | Top right position                      |
| `right-end`          | Bottom right position                   |
| `left`               | Left center position                    |
| `left-start`         | Top left position                       |
| `left-end`           | Bottom left position                    |
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

| Method                     | Description                                                                                                    | Arguments                                                             | Return |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ |
| `open`                     | Open Menu                                                                                                      | `-`                                                                   | `-`    |
| `close`                    | Close Menu                                                                                                     | `-`                                                                   | `-`    |
| `resize`                   | This method can be called to redraw when the default slot element of Menu select changes its position and size | `-`                                                                   | `-`    |
| `setReference` _**3.7.2**_ | Set the trigger element associated with the menu                                                               | `reference: consistent with the reference of the component attribute` | `-`    |

### Events

#### Menu Events

| Event                  | Description                                    | Arguments                        |
| ---------------------- | ---------------------------------------------- | -------------------------------- |
| `open`                 | Triggered when the menu is opened              | `-`                              |
| `opened`               | Triggered when the open menu animation ends    | `-`                              |
| `close`                | Triggered when the menu is closed              | `-`                              |
| `closed`               | Triggered when the closing menu animation ends | `-`                              |
| `click-outside`        | Triggered when clicking outside the menu       | `event: Event`                   |
| `select` _**3.8.0**_   | Triggered when the user selects a menu item. In controlled mode, whether the selected state changes depends on whether `v-model` is updated. | `value: any, option: MenuOption` |
| `popup-visible-change` | Triggered when popup visibility changes        | `visible: boolean`               |

### Slots

#### Menu Slots

| Name      | Description                           | SlotProps |
| --------- | ------------------------------------- | --------- |
| `default` | Menu select trigger element           | `-`       |
| `content` | Menu options, aligned with Cedar Menu | `-`       |
| `options` | Menu options (legacy alias)           | `-`       |

#### MenuOption Slots

| Name      | Description                    | SlotProps |
| --------- | ------------------------------ | --------- |
| `default` | Options to display the content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Menu Variables

| Variable                       | Default                               |
| ------------------------------ | ------------------------------------- |
| `--menu-menu-max-height`       | `278px`                               |
| `--menu-menu-padding`          | `0`                                   |
| `--menu-menu-border-radius`    | `2px`                                 |
| `--menu-menu-background-color` | `var(--color-surface-container-high)` |

#### MenuOption Variables

| Variable                            | Default                      |
| ----------------------------------- | ---------------------------- |
| `--menu-option-normal-height`       | `38px`                       |
| `--menu-option-small-height`        | `30px`                       |
| `--menu-option-mini-height`         | `24px`                       |
| `--menu-option-large-height`        | `46px`                       |
| `--menu-option-padding`             | `0 12px`                     |
| `--menu-option-normal-font-size`    | `var(--font-size-md)`        |
| `--menu-option-small-font-size`     | `var(--font-size-sm)`        |
| `--menu-option-mini-font-size`      | `var(--font-size-xs)`        |
| `--menu-option-large-font-size`     | `var(--font-size-lg)`        |
| `--menu-option-selected-background` | `var(--color-primary)`       |
| `--menu-option-text-color`          | `#555`                       |
| `--menu-option-disabled-color`      | `var(--color-text-disabled)` |
