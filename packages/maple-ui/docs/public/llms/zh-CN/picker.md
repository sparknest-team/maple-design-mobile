<!-- Source: src/picker/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/picker -->

# 多列选择器

## 案例

### 介绍

提供了函数和组件两种调用方式。同时支持级联模式，可以处理多级联动。

### 禁用选择器

勾选时无法通过点击、触摸或键盘改变选择；解除禁用后继续使用原模型值。

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

## 函数调用

### 单列选择

函数会返回用户选择的信息和用户最后的动作 `state`。 `state` 可能是 `confirm`, `cancel`, `close`。

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
  <mp-button status="primary" block @click="picker">单列选择</mp-button>
</template>
```

### 多列选择

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
  <mp-button status="primary" block @click="picker">多列选择</mp-button>
</template>
```

### 级联选择

设置 `cascade` 属性开启级联滚动。

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
  <mp-button status="primary" block @click="picker">级联选择</mp-button>
</template>
```

### 地区选择

组件库提供了中国省市区的级联数据，可以直接使用。

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
  <mp-button status="primary" block @click="picker">地区选择</mp-button>
</template>
```

### 列数量

通过 `columnsCount` 设置最大显示列的数量，在级联模式下十分有用。

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
  <mp-button status="primary" block @click="picker">配置显示列</mp-button>
</template>
```

### 值映射

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
  <mp-button status="primary" block @click="picker">值映射</mp-button>
</template>
```

## 组件调用

### 单列选择

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

### 多列选择

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

### 级联选择

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

### 地区选择

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

### 列数量

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

### 值的映射

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

### 双向绑定

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
    <mp-button status="primary" @click="resetValues">values: {{ values }} 点击重置</mp-button>
    <mp-picker :columns="columns" v-model="values" @change="handleChange" />
  </mp-space>
</template>
```

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示选中列值数组；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### 属性

| 参数                         | 说明                                              | 类型                                             | 默认值   |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------ | -------- |
| `v-model`                    | 绑定的值                                          | _(string \| number)[]_                           | `[]`     |
| `columns`                    | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_ | `[]`     |
| `title`                      | 标题                                              | _string_                                         | `请选择` |
| `field-names`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                  | `-`      |
| `toolbar`                    | 是否显示上方工具栏                                | _boolean_                                        | `true`   |
| `disabled`                   | 禁用选项点击、触摸、键盘选择及确认                | _boolean_                                        | `false`  |
| `selected-values`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                           | `[]`     |
| `cascade`                    | 是否开启级联模式                                  | _boolean_                                        | `true`   |
| `option-height`              | 选项的高度(px rem)                                | _string \| number_                               | `44`     |
| `option-count`               | 可见的选项个数                                    | _string \| number_                               | `6`      |
| `columns-count` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                               | `-`      |
| `confirm-button-text`        | 确认按钮文字                                      | _string_                                         | `确认`   |
| `cancel-button-text`         | 取消按钮文字                                      | _string_                                         | `取消`   |
| `confirm-button-text-color`  | 确认按钮文字颜色                                  | _string_                                         | `-`      |
| `cancel-button-text-color`   | 取消按钮文字颜色                                  | _string_                                         | `-`      |
| `esc-to-close`               | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                        | `true`   |

### Picker Options

| 参数                        | 说明                                              | 类型                                                                                       | 默认值       |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ |
| `columns`                   | 列内容                                            | _PickerColumnOption[] \| PickerColumnOption[][]_                                           | `[]`         |
| `title`                     | 标题                                              | _string_                                                                                   | `请选择`     |
| `fieldNames`                | 自定义列字段映射（`label` 对应文本，默认 `text`） | _{ label?, value?, children? }_                                                            | `-`          |
| `toolbar`                   | 是否显示上方工具栏                                | _boolean_                                                                                  | `true`       |
| `disabled`                  | 禁用选项点击、触摸、键盘选择及确认                | _boolean_                                                                                  | `false`      |
| `selectedValues`            | 已选中的选项值，选项右侧显示对号                  | _(string \| number)[]_                                                                     | `[]`         |
| `cascade`                   | 是否开启级联模式                                  | _boolean_                                                                                  | `true`       |
| `optionHeight`              | 选项的高度                                        | _string \| number_                                                                         | `44`         |
| `optionCount`               | 可见的选项个数                                    | _string \| number_                                                                         | `6`          |
| `columnsCount` _**3.3.11**_ | 最大显示列数                                      | _string \| number_                                                                         | `-`          |
| `confirmButtonText`         | 确认按钮文字                                      | _string_                                                                                   | `确认`       |
| `cancelButtonText`          | 取消按钮文字                                      | _string_                                                                                   | `取消`       |
| `confirmButtonTextColor`    | 确认按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `cancelButtonTextColor`     | 取消按钮文字颜色                                  | _string_                                                                                   | `-`          |
| `overlayClosable`           | 是否点击背景层关闭弹出层                          | _boolean_                                                                                  | `true`       |
| `escToClose`                | 是否支持键盘 ESC 关闭选择器                       | _boolean_                                                                                  | `true`       |
| `safeArea`                  | 是否开启底部安全区适配                            | _boolean_                                                                                  | `false`      |
| `onClickOverlay`            | 背景层点击回调                                    | _(event: MouseEvent) => void_                                                              | `-`          |
| `onOpen`                    | 弹出层开启回调                                    | _() => void_                                                                               | `-`          |
| `onOpened`                  | 弹出层开启动画结束回调                            | _() => void_                                                                               | `-`          |
| `onClose`                   | 弹出层关闭回调                                    | _() => void_                                                                               | `-`          |
| `onClosed`                  | 关闭弹出层动画结束时回调                          | _() => void_                                                                               | `() => void` |
| `onChange`                  | 选择内容变化时回调                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onConfirm`                 | 点击确认按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onCancel`                  | 点击取消按钮时触发                                | _(values: (string \| number)[], indexes: number[], options: PickerColumnOption[]) => void_ | `() => void` |
| `onKeyEscape`               | 点击键盘 ESC 时触发                               | _() => void_                                                                               | `-`          |

### PickerColumnOption

| 参数            | 说明           | 类型                   | 默认值  |
| --------------- | -------------- | ---------------------- | ------- |
| `text`          | 文本           | _string \| number_     | `-`     |
| `value`         | 值             | _string \| number_     | `-`     |
| `disabled`      | 是否禁用       | _boolean_              | `false` |
| `children`      | 子列表         | _PickerColumnOption[]_ | `-`     |
| `className`     | 附加的类名     | _string_               | `-`     |
| `textClassName` | 文本附加的类名 | _string_               | `-`     |

### 方法

| 方法名    | 说明                            | 参数 | 返回值 |
| --------- | ------------------------------- | ---- | ------ |
| `confirm` | 立刻停止滚动并触发 confirm 事件 | `-`  | `-`    |
| `cancel`  | 立刻停止滚动并触发 cancel 事件  | `-`  | `-`    |

### 事件

| 事件名       | 说明               | 参数                                                                                                                                        |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`     | 选择内容变化时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `cancel`     | 点击取消按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `confirm`    | 点击确认按钮时触发 | `values: (string \| number)[]` 选择的值列表 <br> `indexes: number[]` 选择的下标列表 <br> `options: PickerColumnOption[]` 选择的选项对象列表 |
| `key-escape` | 按下 ESC 时触发    | `KeyboardEvent`                                                                                                                             |

### 插槽

| 插槽名    | 说明         | 参数 |
| --------- | ------------ | ---- |
| `title`   | 标题内容     | `-`  |
| `cancel`  | 取消按钮内容 | `-`  |
| `confirm` | 确认按钮内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                | 默认值                                                                                                                                          |
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

### 键盘与减少动效

每个可操作列为一个 listbox，可用 Tab 聚焦；方向键上下移动，Home/End 到首尾可用项，跳过禁用项。aria-selected 表达当前滚轮项；selected-values 只表达额外勾选标记，两者职责不同。空列和全禁用列不进入 Tab 顺序。

减少动效偏好下，选择立即提交且不等待 transitionend；偏好动态切换时收束待提交滚动，卸载时移除监听。

### Brand appearance tokens

| CSS variable | Default |
| --- | --- |
| `--mp-picker-option-padding-horizontal` | `28px` |
| `--mp-picker-option-check-right` | `12px` |
| `--mp-picker-option-check-size` | `18px` |
| `--mp-picker-option-disabled-opacity` | `0.5` |
| `--mp-picker-transition-duration` | `250ms` |
| `--mp-picker-scroll-easing` | `cubic-bezier(0.23, 1, 0.68, 1)` |
