<!-- Source: src/picker/docs/en-US.md; locale: en-US; page: /en-US/picker -->

# Picker

Final Picker30tests/4files pass,including10new targeted cases;combined Maple affected532tests/95files,root read-only lint,types and shared29tests pass. Runtime-candidate classification is not native touch/OS/whole-component acceptance.

## 案例

### Intro

Two calling methods, function and component, are provided. It also supports cascade mode and can handle multi-level linkage.

### Disabled picker

While disabled, clicks, touch and keyboard input cannot change the selection. Enabling it resumes from the current model value.

Example source: src/picker/example/demos/disabled.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const disabled = ref(true)
const value = ref<(string | number)[]>(['A'])
const columns = [[{ text: 'A' }, { text: 'B' }, { text: 'C' }]]
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((next) => {
  language.value = next
})
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="disabled" presentation="inline">{{ english ? 'Disable picker' : '禁用选择器' }}</mp-checkbox>
    <mp-picker v-model="value" :columns="columns" :disabled="disabled" :toolbar="false" />
    <output aria-label="Picker value">{{ value[0] }}</output>
  </mp-space>
</template>
```

### function call

Example source: src/picker/example/demos/function-call.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'
import area from '../../../../json/area.json'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns2 = ref([
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
])
const columns3 = ref([
  {
    text: '四川省',
    children: [
      {
        text: '成都市',
        children: [
          {
            text: '温江区',
          },
          {
            text: '青羊区',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    children: [
      {
        text: '无锡市',
        children: [
          {
            text: '新吴区',
          },
          {
            text: '滨湖区',
          },
        ],
      },
    ],
  },
])
const columns4 = ref(area)
const columns5 = ref([
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker2() {
  await Picker({
    columns: columns2.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker3() {
  await Picker({
    cascade: true,
    columns: columns3.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker4() {
  await Picker({
    columns: columns4.value,
    cascade: true,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker5() {
  await Picker({
    columns: columns5.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
async function picker6() {
  await Picker({
    columns: columns4,
    cascade: true,
    columnsCount: 2,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
</script>

<template>
  <mp-space direction="column" :size="['3vmin', '4vmin']">
    <mp-button status="primary" block @click="picker">单列选择</mp-button>
    <mp-button status="primary" block @click="picker2">多列选择</mp-button>
    <mp-button status="primary" block @click="picker3">级联选择</mp-button>
    <mp-button status="primary" block @click="picker4">地区选择</mp-button>
    <mp-button status="primary" block @click="picker6">列数量</mp-button>
    <mp-button status="primary" block @click="picker5">值映射</mp-button>
  </mp-space>
</template>
```

### single picker

Example source: src/picker/example/demos/single-picker.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### multiple picker

Example source: src/picker/example/demos/multiple-picker.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns2 = ref([
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns2" @change="handleChange" />
</template>
```

### cascade picker

Example source: src/picker/example/demos/cascade-picker.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns3 = ref([
  {
    text: '四川省',
    children: [
      {
        text: '成都市',
        children: [
          {
            text: '温江区',
          },
          {
            text: '青羊区',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    children: [
      {
        text: '无锡市',
        children: [
          {
            text: '新吴区',
          },
          {
            text: '滨湖区',
          },
        ],
      },
    ],
  },
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns3" cascade @change="handleChange" />
</template>
```

### area picker

Example source: src/picker/example/demos/area-picker.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'
import area from '../../../../json/area.json'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns4 = ref(area)
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns4" cascade @change="handleChange" />
</template>
```

### columns count

Example source: src/picker/example/demos/columns-count.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'
import area from '../../../../json/area.json'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns4 = ref(area)
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns4" cascade :columns-count="2" @change="handleChange" />
</template>
```

### value mapping

Example source: src/picker/example/demos/value-mapping.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns5 = ref([
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
  [
    { text: 'A', value: 1 },
    { text: 'B', value: 2 },
    { text: 'C', value: 3 },
    { text: 'D', value: 4 },
  ],
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-picker :columns="columns5" @change="handleChange" />
</template>
```

### two way binding

Example source: src/picker/example/demos/two-way-binding.vue

```vue
<script setup>
import { ref } from 'vue'
import { Message, Picker } from '@maple-design/ui'

const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])
const columns2 = ref([
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
])
const values = ref(['A', 'B', 'C'])
async function picker() {
  await Picker({
    columns: columns.value,
    onChange(values, indexes) {
      Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
    },
  })
}
function handleChange(values, indexes) {
  Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
}
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="values = ['A', 'B', 'C']">values: {{ values }} 点击重置</mp-button>
    <mp-picker v-model="values" :columns="columns2" @change="handleChange" />
  </mp-space>
</template>
```

## Function call

### Single Column Picker

The function will return the information selected by the user and the user's last action `state`. `state` may be `confirm`, `cancel`, `close`.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Single Column Picker</mp-button>
</template>
```

### Multiple Column Picker

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
        [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Multiple Column Picker</mp-button>
</template>
```

### Cascade Column Picker

Set the `cascade` property to enable cascading scrolling.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns: [
        {
          text: '四川省',
          children: [
            {
              text: '成都市',
              children: [
                {
                  text: '温江区',
                },
                {
                  text: '青羊区',
                },
              ],
            },
          ],
        },
        {
          text: '江苏省',
          children: [
            {
              text: '无锡市',
              children: [
                {
                  text: '新吴区',
                },
                {
                  text: '滨湖区',
                },
              ],
            },
          ],
        },
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Cascade Column Picker</mp-button>
</template>
```

### Area Picker

The component library provides cascade data of Chinese provinces and cities, which can be used directly.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'
  import columns from '@maple-design/ui/json/area.json'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns,
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Area Picker</mp-button>
</template>
```

### Columns Count

The maximum number of displayed columns can be set via `columnsCount`, which is very useful in cascading mode.

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'
  import columns from '@maple-design/ui/json/area.json'

  async function picker() {
    const { state, texts, indexes } = await Picker({
      cascade: true,
      columns,
      columnsCount: 2,
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Columns Count</mp-button>
</template>
```

### Value Mapping

```html
<script setup>
  import { Message, Picker } from '@maple-design/ui'

  async function picker() {
    const { state, values, indexes, options } = await Picker({
      columns: [
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
        [
          { text: 'A', value: 1 },
          { text: 'B', value: 2 },
          { text: 'C', value: 3 },
          { text: 'D', value: 4 },
        ],
      ],
      onChange(values, indexes) {
        Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
      },
    })
  }
</script>

<template>
  <mp-button status="primary" block @click="picker">Value Mapping</mp-button>
</template>
```

## Component Call

### Single Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([[{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }]])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Multiple Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Cascade Column Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    {
      text: '四川省',
      children: [
        {
          text: '成都市',
          children: [
            {
              text: '温江区',
            },
            {
              text: '青羊区',
            },
          ],
        },
      ],
    },
    {
      text: '江苏省',
      children: [
        {
          text: '无锡市',
          children: [
            {
              text: '新吴区',
            },
            {
              text: '滨湖区',
            },
          ],
        },
      ],
    },
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" @change="handleChange" />
</template>
```

### Area Picker

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'
  import area from '@maple-design/ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" @change="handleChange" />
</template>
```

### Columns Count

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'
  import area from '@maple-design/ui/json/area.json'

  const columns = ref(area)

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker cascade :columns="columns" :columns-count="2" @change="handleChange" />
</template>
```

### Value Mapping

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const columns = ref([
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
    [
      { text: 'A', value: 1 },
      { text: 'B', value: 2 },
      { text: 'C', value: 3 },
      { text: 'D', value: 4 },
    ],
  ])

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-picker :columns="columns" @change="handleChange" />
</template>
```

### Two-way binding

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maple-design/ui'

  const values = ref(['A', 'B', 'C'])
  const columns = ref([
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
    [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }, { text: 'E' }],
  ])

  function resetValues() {
    values.value = ['A', 'B', 'C']
  }

  function handleChange(values, indexes) {
    Message(`values: ${values.toString()}, indexes: ${indexes.toString()}`)
  }
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" @click="resetValues">values: {{ values }} Click Reset</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## API

### Model and default value

Use ordinary `v-model`. `modelValue` is the selected column values array. `defaultValue` initializes uncontrolled state only at creation; changing it later does not reset the current state. A supplied model takes precedence. Initialization emits no `update:modelValue`.

### Props

| Prop                         | Description                                                        | Type                                             | Default   |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ | --------- |
| `v-model`                    | Selected values                                                    | _(string \| number)[]_                           | `[]`      |
| `columns`                    | Column content                                                     | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]`      |
| `title`                      | Title                                                              | _string_                                         | `Pick it` |
| `field-names`                | Custom column field mapping (`label` maps to text, default `text`) | _{ label?, value?, children? }_                  | `-`       |
| `toolbar`                    | Whether to display the upper toolbar                               | _boolean_                                        | `true`    |
| `disabled`                   | Block option clicks, touch, keyboard selection, and confirmation    | _boolean_                                        | `false`   |
| `selected-values`            | Selected option values; shows a check mark on the right            | _(string \| number)[]_                           | `[]`      |
| `cascade`                    | Whether to enable cascade mode                                     | _boolean_                                        | `true`    |
| `option-height`              | The height of the option                                           | _string \| number_                               | `44`      |
| `option-count`               | Number of visible columns                                          | _string \| number_                               | `6`       |
| `columns-count` _**3.3.11**_ | Number of visible columns                                          | _string \| number_                               | `-`       |
| `confirm-button-text`        | Confirm button text                                                | _string_                                         | `Confirm` |
| `cancel-button-text`         | Cancel button text                                                 | _string_                                         | `Cancel`  |
| `confirm-button-text-color`  | Confirm button text color                                          | _string_                                         | `-`       |
| `cancel-button-text-color`   | Cancel button text color                                           | _string_                                         | `-`       |
| `esc-to-close`               | Whether to support keyboard ESC to close the picker                | _boolean_                                        | `true`    |

### Picker Options

| Prop                        | Description                                                        | Type                                                                                       | Default      |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------ |
| `columns`                   | Column content                                                     | _PickerColumnOption[] \| PickerColumnOption[][]_                                           | `[]`         |
| `title`                     | Column content                                                     | _string_                                                                                   | `Pick it`    |
| `fieldNames`                | Custom column field mapping (`label` maps to text, default `text`) | _{ label?, value?, children? }_                                                            | `-`          |
| `toolbar`                   | Whether to display the upper toolbar                               | _boolean_                                                                                  | `true`       |
| `disabled`                  | Block option clicks, touch, keyboard selection, and confirmation    | _boolean_                                                                                  | `false`      |
| `selectedValues`            | Selected option values; shows a check mark on the right            | _(string \| number)[]_                                                                     | `[]`         |
| `cascade`                   | Whether to enable cascade mode                                     | _boolean_                                                                                  | `true`       |
| `optionHeight`              | The height of the option                                           | _string \| number_                                                                         | `44`         |
| `optionCount`               | Number of visible options                                          | _string \| number_                                                                         | `6`          |
| `columnsCount` _**3.3.11**_ | Number of visible columns(defaults to display total columns)       | _string \| number_                                                                         | `-`          |
| `confirmButtonText`         | Confirm button text                                                | _string_                                                                                   | `Confirm`    |
| `cancelButtonText`          | Cancel button text                                                 | _string_                                                                                   | `Cancel`     |
| `confirmButtonTextColor`    | Confirm button text color                                          | _string_                                                                                   | `-`          |
| `cancelButtonTextColor`     | Cancel button text color                                           | _string_                                                                                   | `-`          |
| `overlayClosable`           | Whether to click the overlay to close the picker                   | _boolean_                                                                                  | `true`       |
| `escToClose`                | Whether to support keyboard ESC to close the picker                | _boolean_                                                                                  | `true`       |
| `safeArea`                  | Whether to enable bottom safety zone adaptation                    | _boolean_                                                                                  | `false`      |
| `onClickOverlay`            | Click overlay callback                                             | _(event: MouseEvent) => void_                                                              | `-`          |
| `onOpen`                    | Popup open callback                                                | _() => void_                                                                               | `-`          |
| `onOpened`                  | Popup open-animation ends callback                                 | _() => void_                                                                               | `-`          |
| `onClose`                   | Popup close callback                                               | _() => void_                                                                               | `-`          |
| `onClosed`                  | Close pop-up layer callback when animation ends                    | _() => void_                                                                               | `() => void` |
| `onChange`                  | Pick callbacks when content changes                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onConfirm`                 | Pick callbacks when confirm                                        | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onCancel`                  | Pick callbacks when cancel                                         | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onKeyEscape`               | Triggered when click keyboard ESC                                  | _() => void_                                                                               | `-`          |

### PickerColumnOption

| Prop            | Description      | Type                   | Default |
| --------------- | ---------------- | ---------------------- | ------- |
| `text`          | Text             | _string \| number_     | `-`     |
| `value`         | Value            | _string \| number_     | `-`     |
| `disabled`      | Whether disabled | _boolean_              | `false` |
| `children`      | Children list    | _PickerColumnOption[]_ | `-`     |
| `className`     | Class name       | _string_               | `-`     |
| `textClassName` | Text Class Name  | _string_               | `-`     |

### Methods

| Method    | Description                                                | Arguments | Return |
| --------- | ---------------------------------------------------------- | --------- | ------ |
| `confirm` | Immediately stop scrolling and trigger the `confirm` event | `-`       | `-`    |
| `cancel`  | Immediately stop scrolling and trigger the `cancel` event  | `-`       | `-`    |

### Events

| Event        | Description                                 | Arguments                                                                                                                                      |
| ------------ | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`     | Triggered when the pick content changes     | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `cancel`     | Triggered when you click the cancel button  | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `confirm`    | Triggered when you click the confirm button | `values: (string \| number)[]` Selected Values <br> `indexes: number[]` Selected indexes <br> `options: PickerColumnOption[]` Selected options |
| `key-escape` | Triggered when pressing ESC                 | `KeyboardEvent`                                                                                                                                |

### Slots

| Name      | Description            | SlotProps |
| --------- | ---------------------- | --------- |
| `title`   | Title content          | `-`       |
| `cancel`  | Cancel button content  | `-`       |
| `confirm` | Confirm button content | `-`       |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                              | Default                                                                                                                                         |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mp-picker-background`                 | `var(--mp-color-body)`                                                                                                                                          |
| `--mp-picker-toolbar-height`             | `44px`                                                                                                                                          |
| `--mp-picker-picked-border`              | `1px solid var(--mp-color-border-2)`                                                                                                               |
| `--mp-picker-title-font-size`            | `var(--mp-font-size-lg)`                                                                                                                           |
| `--mp-picker-title-text-color`           | `var(--mp-color-text-1)`                                                                                                                                          |
| `--mp-picker-option-font-size`           | `var(--mp-font-size-lg)`                                                                                                                           |
| `--mp-picker-option-disabled-text-color` | `var(--mp-color-text-disabled)`                                                                                                           |
| `--mp-picker-option-check-color`         | `var(--mp-sys-color-content-brand)`                                                                                                                          |
| `--mp-picker-option-text-color`          | `var(--mp-color-text-1)`                                                                                                                                          |
| `--mp-picker-toolbar-padding`            | `0 4px`                                                                                                                                         |
| `--mp-picker-mask-background-image`      | `linear-gradient(180deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent)), linear-gradient(0deg, color-mix(in srgb, var(--mp-picker-background) 90%, transparent), color-mix(in srgb, var(--mp-picker-background) 40%, transparent))` |

### Keyboard and reduced motion

Each enabled column is a tabbable listbox. ArrowUp/Down and Home/End move among enabled options. aria-selected identifies the current wheel option; selected-values is an additional checkmark decoration. Empty and all-disabled columns are not tab stops.

Reduced motion commits selections without transitionend. Dynamic preference changes settle pending scrolling, and unmount removes the preference listener.

### Brand appearance tokens

| CSS variable | Default |
| --- | --- |
| `--mp-picker-option-padding-horizontal` | `28px` |
| `--mp-picker-option-check-right` | `12px` |
| `--mp-picker-option-check-size` | `18px` |
| `--mp-picker-option-disabled-opacity` | `0.5` |
| `--mp-picker-transition-duration` | `250ms` |
| `--mp-picker-scroll-easing` | `cubic-bezier(0.23, 1, 0.68, 1)` |
