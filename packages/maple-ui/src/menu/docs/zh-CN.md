# 菜单选择器

### 介绍

具有选择器功能的菜单，弹出层基于 [气泡卡片](#/zh-CN/popover) 实现，部分功能的使用方式一致。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 选择事件

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleSelect(value) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button type="primary">请选择</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 按钮下拉框

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleClick() {
    Message('发布')
  }

  function handleSelect(value) {
    Message(`操作: ${value}`)
  }
</script>

<template>
  <mp-space :size="[10, 10]">
    <mp-menu position="br" @select="handleSelect">
      <mp-button-group status="primary">
        <mp-button @click.stop="handleClick">发布</mp-button>
        <mp-button style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="立即保存" />
        <mp-menu-option label="保存并发布" />
      </template>
    </mp-menu>

    <mp-menu disabled position="br">
      <mp-button-group status="primary">
        <mp-button disabled>禁用</mp-button>
        <mp-button disabled style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="立即保存" />
        <mp-menu-option label="保存并发布" />
      </template>
    </mp-menu>

    <mp-menu position="br" @select="handleSelect">
      <mp-button-group status="primary">
        <mp-button @click.stop="handleClick">发布</mp-button>
        <mp-button style="padding: 0 6px">
          <mp-icon name="menu-down" :size="24" />
        </mp-button>
      </mp-button-group>

      <template #content>
        <mp-menu-option label="立即保存" />
        <mp-menu-option label="保存并发布" />
      </template>
    </mp-menu>
  </mp-space>
</template>
```

### 尺寸

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
      <mp-button type="primary"> {{ valueNormal ? valueNormal : '常规尺寸' }} </mp-button>

      <template #options>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="small" v-model="valueSmall">
      <mp-button type="primary"> {{ valueSmall ? valueSmall : '小型尺寸' }} </mp-button>

      <template #options>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="mini" v-model="valueMini">
      <mp-button type="primary"> {{ valueMini ? valueMini : '迷你尺寸' }} </mp-button>

      <template #options>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="large" v-model="valueLarge">
      <mp-button type="primary"> {{ valueLarge ? valueLarge : '大型尺寸' }} </mp-button>

      <template #options>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>
  </mp-space>
</template>
```

### 值映射

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button type="primary">{{ value ? `value: ${value}` : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" :value="1" />
      <mp-menu-option label="睡觉" :value="2" />
      <mp-menu-option label="打游戏" :value="3" />
    </template>
  </mp-menu>
</template>
```

### 可滚动

通过开启 `scrollable` 使菜单可以局部滚动。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
</script>

<template>
  <mp-menu scrollable v-model="value">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option v-for="option in options" :key="option.value" :label="option.label" />
    </template>
  </mp-menu>
</template>
```

### 选项禁用

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu scrollable v-model="value">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" disabled />
    </template>
  </mp-menu>
</template>
```

### 多选

```html
<script setup>
  import { ref } from 'vue'

  const value = ref([])
</script>

<template>
  <mp-menu multiple v-model="value">
    <mp-button type="primary">{{ value.length ? value : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
      <mp-menu-option label="写代码" />
      <mp-menu-option label="摸鱼" />
    </template>
  </mp-menu>
</template>
```

### 选择选项时禁止关闭菜单

关闭 `close-on-select` 可以在选择选项时禁止关闭菜单。默认行为是在选择选项时关闭菜单，多选模式下不允许关闭此选项。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu :close-on-select="false" v-model="value">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #options>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 选项式 API

可以将选项以数组形式传给 `options` 属性。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref([
    {
      label: '吃饭',
      value: 1,
    },
    {
      label: '睡觉',
      value: 2,
    },
    {
      label: '打游戏',
      value: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-menu v-model="value" :options="options">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

### 级联单选

可以将选项数组传递给选项的 `children` 属性以实现级联效果。

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
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

### 级联多选

在级联单选的基础上设置 `multiple` 属性即可实现级联多选。

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
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

### 选项式 API（自定义字段）

可以将选项以数组形式传给 `options` 属性，同时通过 `label-key` 和 `value-key` 属性指定选项数组内文本和值的字段。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref([
    {
      name: '吃饭',
      id: 1,
    },
    {
      name: '睡觉',
      id: 2,
    },
    {
      name: '打游戏',
      id: 3,
      disabled: true,
    },
  ])
</script>

<template>
  <mp-menu v-model="value" :options="options" label-key="name" value-key="id">
    <mp-button type="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

## API

### 属性

#### Menu Props

| 参数                       | 说明                                                                                                 | 类型                             | 默认值            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------- |
| `v-model`                  | 绑定的值                                                                                             | _any \| any[]_                   | `-`               |
| `v-model:popup-visible`    | 是否显示菜单，与 Cedar Menu 对齐                                                                     | _boolean_                        | `-`               |
| `default-popup-visible`    | 非受控模式下菜单默认是否显示                                                                         | _boolean_                        | `false`           |
| `size`                     | 菜单尺寸，可选值 `normal` `mini` `small` `large`                                                     | _string_                         | `normal`          |
| `multiple`                 | 是否多选                                                                                             | _boolean_                        | `false`           |
| `scrollable`               | 是否可滚动                                                                                           | _boolean_                        | `false`           |
| `close-on-select`          | 选择菜单项时是否关闭菜单（多选模式下始终不关闭菜单）                                                 | _boolean_                        | `true`            |
| `hide-on-select`           | 选择菜单项时是否关闭菜单（优先于 `close-on-select`）                                                 | _boolean_                        | `-`               |
| `position`                 | Cedar 风格弹出位置：`top` `tl` `tr` `bottom` `bl` `br`                                               | _string_                         | `-`               |
| `placement`                | 菜单弹出位置                                                                                         | _Placement_                      | `cover-top-start` |
| `strategy`                 | 菜单定位方式，可选值为 `absolute` `fixed`                                                            | _string_                         | `absolute`        |
| `offset-x`                 | x 轴偏移量， 相对于菜单对齐后的位置                                                                  | _number \| string_               | `0`               |
| `offset-y`                 | y 轴偏移量， 相对于菜单对齐后的位置                                                                  | _number \| string_               | `0`               |
| `teleport`                 | 菜单挂载的位置                                                                                       | _TeleportProps['to'] \| false_   | `body`            |
| `popup-container`          | 菜单挂载容器（优先于 `teleport`）                                                                    | _string \| HTMLElement \| false_ | `-`               |
| `disabled`                 | 是否禁用菜单                                                                                         | _boolean_                        | `false`           |
| `trigger`                  | 菜单触发方式，可选值为 `click` `hover` `manual`                                                      | _string_                         | `click`           |
| `reference`                | 菜单关联的触发元素，`string` 类型为菜单组件的子孙元素选择器， `HTMLElement` 类型为任意指定的元素节点 | _string \| HTMLElement_          | `-`               |
| `elevation`                | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级                                                   | _string \| number \| boolean_    | `true`            |
| `same-width`               | 是否与触发元素同宽                                                                                   | _boolean_                        | `false`           |
| `popover-class`            | 弹出层的 class                                                                                       | _string_                         | `-`               |
| `close-on-click-reference` | 是否在点击菜单触发元素后关闭菜单                                                                     | _boolean_                        | `false`           |
| `options` _**3.3.7**_      | 指定可选项                                                                                           | _MenuOption[]_                   | `[]`              |
| `label-key` _**3.3.7**_    | 作为 label 唯一标识的键名                                                                            | _string_                         | `label`           |
| `value-key` _**3.3.7**_    | 作为 value 唯一标识的键名                                                                            | _string_                         | `value`           |
| `children-key` _**3.8.0**_ | 作为 children 唯一标识的键名                                                                         | _string_                         | `children`        |

#### MenuOption

| 参数                   | 说明             | 类型                                                                       | 默认值 |
| ---------------------- | ---------------- | -------------------------------------------------------------------------- | ------ |
| `label`                | 选项的标签       | _string \| VNode \| (option: MenuOption, selected: boolean) => VNodeChild_ | `-`    |
| `value`                | 选项的值         | _any_                                                                      | `-`    |
| `children` _**3.8.0**_ | 选项的子选项     | _MenuOption[]_                                                             | `-`    |
| `disabled`             | 是否禁用         | _boolean_                                                                  | `-`    |
| `ripple`               | 是否启用水波效果 | _boolean_                                                                  | `true` |

#### MenuOption Props

| 参数                 | 说明             | 类型      | 默认值  |
| -------------------- | ---------------- | --------- | ------- |
| `label`              | 选项显示的文本   | _any_     | `-`     |
| `value`              | 选项绑定的值     | _any_     | `-`     |
| `disabled`           | 是否禁用         | _boolean_ | `false` |
| `ripple` _**3.3.0**_ | 是否启用水波效果 | _boolean_ | `true`  |

### Placement

| 参数                 | 说明                     |
| -------------------- | ------------------------ |
| `top`                | 顶部中心位置             |
| `top-start`          | 顶部左侧位置             |
| `top-end`            | 顶部右侧位置             |
| `bottom`             | 底部中心位置             |
| `bottom-start`       | 底部左侧位置             |
| `bottom-end`         | 底部右侧位置             |
| `right`              | 右侧中心位置             |
| `right-start`        | 右侧上方位置             |
| `right-end`          | 右侧下方位置             |
| `left`               | 左侧中心位置             |
| `left-start`         | 左侧上方位置             |
| `left-end`           | 左侧下方位置             |
| `cover-top`          | 顶部中心位置, 覆盖触发器 |
| `cover-top-start`    | 顶部左侧位置, 覆盖触发器 |
| `cover-top-end`      | 顶部右侧位置, 覆盖触发器 |
| `cover-bottom`       | 底部中心位置, 覆盖触发器 |
| `cover-bottom-start` | 底部左侧位置, 覆盖触发器 |
| `cover-bottom-end`   | 底部右侧位置, 覆盖触发器 |
| `cover-left`         | 左侧位置, 覆盖触发器     |
| `cover-right`        | 右侧位置, 覆盖触发器     |

### 方法

#### Menu Methods

| 方法名                     | 说明                                                      | 参数                                     | 返回值 |
| -------------------------- | --------------------------------------------------------- | ---------------------------------------- | ------ |
| `open`                     | 打开 Menu                                                 | `-`                                      | `-`    |
| `close`                    | 关闭 Menu                                                 | `-`                                      | `-`    |
| `resize`                   | Menu 默认插槽元素产生位置大小变化时可以调用此方法进行重绘 | `-`                                      | `-`    |
| `setReference` _**3.7.2**_ | 设置 Menu 关联的触发元素                                  | `reference: 与组件属性的 reference 一致` | `-`    |

### 事件

#### Menu Events

| 事件名                 | 说明                   | 参数                             |
| ---------------------- | ---------------------- | -------------------------------- |
| `open`                 | 打开菜单时触发         | `-`                              |
| `opened`               | 打开菜单动画结束时触发 | `-`                              |
| `close`                | 关闭菜单时触发         | `-`                              |
| `closed`               | 关闭菜单动画结束时触发 | `-`                              |
| `click-outside`        | 点击菜单外部时触发     | `event: Event`                   |
| `select` _**3.8.0**_   | 用户选择菜单项时触发；受控模式下是否产生选中态取决于 `v-model` 是否更新 | `value: any, option: MenuOption` |
| `popup-visible-change` | 菜单显示状态变化时触发 | `visible: boolean`               |

### 插槽

#### Menu Slots

| 插槽名    | 说明                             | 参数 |
| --------- | -------------------------------- | ---- |
| `default` | 菜单关联的触发元素               | `-`  |
| `content` | 菜单选项内容，与 Cedar Menu 对齐 | `-`  |
| `options` | 菜单选项内容（兼容旧插槽）       | `-`  |

#### MenuOption Slots

| 插槽名    | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 选项显示的内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Menu Variables

| 变量名                         | 默认值                                |
| ------------------------------ | ------------------------------------- |
| `--menu-menu-max-height`       | `278px`                               |
| `--menu-menu-padding`          | `0`                                   |
| `--menu-menu-border-radius`    | `2px`                                 |
| `--menu-menu-background-color` | `var(--color-surface-container-high)` |

#### MenuOption Variables

| 变量名                              | 默认值                       |
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
