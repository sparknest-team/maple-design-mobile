# 菜单选择器

### 介绍

具有选择器功能的菜单，弹出层基于无视觉样式的 [Trigger](#/zh-CN/trigger) 实现。

定位枚举沿用 Popper（含 `cover-*`），默认 `bottom`。同宽、高度限制分别使用 `auto-fit-popup-width`、`popup-max-height`。支持 `trigger="contextMenu"` 配合 `align-point` 做右键菜单。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #content>
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

  function handleSelect(value, option, ev) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button status="primary">请选择</mp-button>

    <template #content>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 悬浮触发

```html
<template>
  <mp-menu trigger="hover" @select="handleSelect">
    <mp-button status="primary">Hover 悬浮触发</mp-button>

    <template #content>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 弹出位置

Maple 使用 Popper 枚举。与 Cedar `bl / bottom / br / tl / top / tr` 对应的是 `bottom-start / bottom / bottom-end / top-start / top / top-end`。

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

### 右键菜单

需要同时设置 `trigger="contextMenu"` 和 `align-point`。

```html
<template>
  <mp-menu trigger="contextMenu" align-point>
    <div
      style="display: flex; align-items: center; justify-content: center; height: 200px; background: var(--color-fill-2)"
    >
      右键点击
    </div>
    <template #content>
      <mp-menu-option label="Option 1" />
      <mp-menu-option label="Option 2" />
      <mp-menu-option label="Option 3" />
    </template>
  </mp-menu>
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
      <mp-button status="primary"> {{ valueNormal ? valueNormal : '常规尺寸' }} </mp-button>

      <template #content>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="sm" v-model="valueSmall">
      <mp-button status="primary"> {{ valueSmall ? valueSmall : '小型尺寸' }} </mp-button>

      <template #content>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="xs" v-model="valueMini">
      <mp-button status="primary"> {{ valueMini ? valueMini : '迷你尺寸' }} </mp-button>

      <template #content>
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
        <mp-menu-option label="打游戏" />
      </template>
    </mp-menu>

    <mp-menu size="lg" v-model="valueLarge">
      <mp-button status="primary"> {{ valueLarge ? valueLarge : '大型尺寸' }} </mp-button>

      <template #content>
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
    <mp-button status="primary">{{ value ? `value: ${value}` : '请选择' }}</mp-button>

    <template #content>
      <mp-menu-option label="吃饭" :value="1" />
      <mp-menu-option label="睡觉" :value="2" />
      <mp-menu-option label="打游戏" :value="3" />
    </template>
  </mp-menu>
</template>
```

### 限制弹出高度

`popup-max-height` 默认为 `true`，超出默认最大高度后可滚动。传入数字表示像素高度，传入 `false` 则不限制。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
  const options = ref(Array.from({ length: 30 }, (_, index) => ({ label: `Option ${index + 1}`, value: index })))
</script>

<template>
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #content>
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
  <mp-menu v-model="value">
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #content>
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
    <mp-button status="primary">{{ value.length ? value : '请选择' }}</mp-button>

    <template #content>
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

关闭 `hide-on-select` 可以在选择选项时禁止关闭菜单。默认行为是在选择选项时关闭菜单，多选模式下始终不关闭菜单。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref()
</script>

<template>
  <mp-menu :hide-on-select="false" v-model="value">
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>

    <template #content>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
      <mp-menu-option label="打游戏" />
    </template>
  </mp-menu>
</template>
```

### 选项分组

```html
<script setup>
  import { Message } from '@maplejs/maple-ui'

  function handleSelect(value) {
    Message(`Select: ${value}`)
  }
</script>

<template>
  <mp-menu @select="handleSelect">
    <mp-button status="primary">选项分组</mp-button>

    <template #content>
      <mp-menu-group title="用餐">
        <mp-menu-option label="吃饭" />
        <mp-menu-option label="睡觉" />
      </mp-menu-group>
      <mp-menu-group title="工作">
        <mp-menu-option label="写代码" />
        <mp-menu-option label="摸鱼" />
      </mp-menu-group>
    </template>
  </mp-menu>
</template>
```

### 插入图标

```html
<template>
  <mp-menu>
    <mp-button status="primary">插入图标</mp-button>

    <template #content>
      <mp-menu-option label="吃饭">
        <template #icon>
          <m-icon-star-fill :size="18" />
        </template>
      </mp-menu-option>
      <mp-menu-option label="睡觉">
        <template #icon>
          <m-icon-star-fill :size="18" />
        </template>
      </mp-menu-option>
    </template>
  </mp-menu>
</template>
```

### 页脚

```html
<template>
  <mp-menu>
    <mp-button status="primary">页脚</mp-button>

    <template #content>
      <mp-menu-option label="吃饭" />
      <mp-menu-option label="睡觉" />
    </template>
    <template #footer>
      <div style="padding: 8px 12px">自定义页脚</div>
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
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>
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
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

### 级联多选

在级联单选的基础上设置 `multiple` 属性即可实现级联多选。

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
    <mp-button status="primary">{{ value.length ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

### 选项式 API（自定义字段）

可以将选项以数组形式传给 `options` 属性，同时通过 `field-names` 属性指定选项数组内文本和值的字段。级联选择同样走这套字段映射。

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
  <mp-menu v-model="value" :options="options" :field-names="{ label: 'name', value: 'id' }">
    <mp-button status="primary">{{ value ? value : '请选择' }}</mp-button>
  </mp-menu>
</template>
```

## API

### 属性

#### Menu Props

| 参数                       | 说明                                                                                                 | 类型                                       | 默认值     |
| -------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| `v-model`                  | 绑定的值                                                                                             | _any \| any[]_                             | `-`        |
| `v-model:open`             | 是否显示菜单                                                                                         | _boolean_                                  | `-`        |
| `default-open`             | 非受控模式下默认是否显示菜单                                                                         | _boolean_                                  | `false`    |
| `size`                     | 菜单尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                            | _string_                                   | `md`       |
| `multiple`                 | 是否多选                                                                                             | _boolean_                                  | `false`    |
| `popup-max-height`         | 弹出层最大高度。`true` 使用默认高度，`false` 不限制，传入 `number` 为像素值                          | _boolean \| number_                        | `true`     |
| `auto-fit-popup-width`     | 是否与触发元素同宽                                                                                   | _boolean_                                  | `false`    |
| `hide-on-select`           | 选择菜单项时是否关闭菜单（多选模式下始终不关闭菜单）                                                 | _boolean_                                  | `true`     |
| `placement`                | 菜单弹出位置                                                                                         | _Placement_                                | `bottom`   |
| `strategy`                 | 菜单定位方式，可选值为 `absolute` `fixed`                                                            | _string_                                   | `absolute` |
| `offset-x`                 | x 轴偏移量，相对于菜单对齐后的位置                                                                   | _number \| string_                         | `0`        |
| `offset-y`                 | y 轴偏移量，相对于菜单对齐后的位置                                                                   | _number \| string_                         | `0`        |
| `popup-container`          | 菜单挂载的位置                                                                                       | _TeleportProps['to'] \| false_             | `body`     |
| `disabled`                 | 是否禁用菜单                                                                                         | _boolean_                                  | `false`    |
| `trigger`                  | 菜单触发方式，可选值为 `click` `hover` `manual` `contextMenu`                                        | _string_                                   | `click`    |
| `align-point`              | 弹出层是否跟随鼠标（配合 `contextMenu`）                                                             | _boolean_                                  | `false`    |
| `reference`                | 菜单关联的触发元素，`string` 类型为菜单组件的子孙元素选择器， `HTMLElement` 类型为任意指定的元素节点 | _string \| HTMLElement_                    | `-`        |
| `elevation`                | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级                                                   | _number \| boolean_              | `true`     |
| `popup-class`              | 弹出层的 class                                                                                       | _ClassName_                                | `-`        |
| `close-on-click-reference` | 是否在点击菜单触发元素后关闭菜单                                                                     | _boolean_                                  | `false`    |
| `options`                  | 指定可选项                                                                                           | _MenuOption[]_                             | `[]`       |
| `field-names`              | 自定义 `options` 字段映射                                                                            | _{ label?, value?, children?, disabled? }_ | `-`        |

#### MenuOption 数据字段

用于 `options` 数组项。

| 参数       | 说明             | 类型                                                                       | 默认值 |
| ---------- | ---------------- | -------------------------------------------------------------------------- | ------ |
| `label`    | 选项的标签       | _string \| VNode \| (option: MenuOption, selected: boolean) => VNodeChild_ | `-`    |
| `value`    | 选项的值         | _any_                                                                      | `-`    |
| `children` | 选项的子选项     | _MenuOption[]_                                                             | `-`    |
| `disabled` | 是否禁用         | _boolean_                                                                  | `-`    |
| `ripple`   | 是否启用水波效果 | _boolean_                                                                  | `true` |

#### MenuOption Props

| 参数       | 说明             | 类型      | 默认值  |
| ---------- | ---------------- | --------- | ------- |
| `label`    | 选项显示的文本   | _any_     | `-`     |
| `value`    | 选项绑定的值     | _any_     | `-`     |
| `disabled` | 是否禁用         | _boolean_ | `false` |
| `ripple`   | 是否启用水波效果 | _boolean_ | `true`  |

#### MenuGroup Props

| 参数    | 说明     | 类型     | 默认值 |
| ------- | -------- | -------- | ------ |
| `title` | 分组标题 | _string_ | `-`    |

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

### 方法

#### Menu Methods

| 方法名         | 说明                                                      | 参数                                     | 返回值 |
| -------------- | --------------------------------------------------------- | ---------------------------------------- | ------ |
| `open`         | 打开 Menu                                                 | `-`                                      | `-`    |
| `close`        | 关闭 Menu                                                 | `-`                                      | `-`    |
| `resize`       | Menu 默认插槽元素产生位置大小变化时可以调用此方法进行重绘 | `-`                                      | `-`    |
| `setReference` | 设置 Menu 关联的触发元素                                  | `reference: 与组件属性的 reference 一致` | `-`    |

### 事件

#### Menu Events

| 事件名          | 说明                                                                    | 参数                                         |
| --------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| `open`          | 打开菜单时触发                                                          | `-`                                          |
| `opened`        | 打开菜单动画结束时触发                                                  | `-`                                          |
| `close`         | 关闭菜单时触发                                                          | `-`                                          |
| `closed`        | 关闭菜单动画结束时触发                                                  | `-`                                          |
| `click-outside` | 点击菜单外部时触发                                                      | `event: Event`                               |
| `select`        | 用户选择菜单项时触发；受控模式下是否产生选中态取决于 `v-model` 是否更新 | `value: any, option: MenuOption, ev?: Event` |
| `open-change`   | 菜单打开状态变化时触发                                                  | `open: boolean`                              |
| `key-escape`    | 按下 Escape 关闭菜单时触发                                              | `-`                                          |

### 插槽

#### Menu Slots

| 插槽名    | 说明               | 参数 |
| --------- | ------------------ | ---- |
| `default` | 菜单关联的触发元素 | `-`  |
| `content` | 菜单选项内容       | `-`  |
| `footer`  | 菜单页脚           | `-`  |

#### MenuOption Slots

| 插槽名    | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 选项显示的内容 | `-`  |
| `icon`    | 选项图标       | `-`  |

#### MenuGroup Slots

| 插槽名    | 说明     | 参数 |
| --------- | -------- | ---- |
| `title`   | 分组标题 | `-`  |
| `default` | 分组内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Menu Variables

| 变量名                    | 默认值                |
| ------------------------- | --------------------- |
| `--menu-max-height`       | `278px`               |
| `--menu-padding`          | `4px 0`               |
| `--menu-border-radius`    | `2px`                 |
| `--menu-border-color`     | `var(--color-fill-3)` |
| `--menu-background-color` | `var(--color-fill-2)` |

#### MenuOption Variables

| 变量名                              | 默认值                       |
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

| 变量名                          | 默认值                |
| ------------------------------- | --------------------- |
| `--menu-group-title-height`     | `24px`                |
| `--menu-group-title-padding`    | `8px 12px 4px`        |
| `--menu-group-title-font-size`  | `var(--font-size-sm)` |
| `--menu-group-title-text-color` | `var(--color-text-3)` |

## API

### 属性

| 参数       | 说明             | 类型      | 默认值  |
| ---------- | ---------------- | --------- | ------- |
| `label`    | 选项显示的文本   | _any_     | `-`     |
| `value`    | 选项绑定的值     | _any_     | `-`     |
| `disabled` | 是否禁用         | _boolean_ | `false` |
| `ripple`   | 是否启用水波效果 | _boolean_ | `true`  |

### 插槽

| 插槽名    | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 选项显示的内容 | `-`  |
| `icon`    | 选项图标       | `-`  |

## API

### 属性

| 参数    | 说明     | 类型     | 默认值 |
| ------- | -------- | -------- | ------ |
| `title` | 分组标题 | _string_ | `-`    |

### 插槽

| 插槽名    | 说明     | 参数 |
| --------- | -------- | ---- |
| `title`   | 分组标题 | `-`  |
| `default` | 分组内容 | `-`  |

覆盖触发元素使用 `cover`，placement 仅使用标准十二方位。迁移：旧 cover-top → bottom + cover；cover-bottom → top + cover；cover-left → right + cover；cover-right → left + cover；start/end 后缀保留。默认 cover=false。

## 基础交互迁移

底层 Trigger 已统一状态、节点和弹层事件处理。本组件保留原有触发默认与零悬停延迟，trigger 也可使用数组组合 hover/focus/click/manual/contextMenu。mouseEnterDelay、mouseLeaveDelay 可显式设置；完整底层契约见 Trigger 文档。

### 选择与键盘契约

`options` 与 content 插槽接入同一选择控制器。`multiple` 时 modelValue 缺省按空数组处理；选择分支按完整选项树联动未禁用后代，不依赖子菜单是否展开。部分选中分支再次点击取消选择，禁用分支及后代不参与联动。异步 options 暂时未包含的已选值会保留。

先派发 `update:modelValue`（多选返回数组），再派发 `select(value, option, event)`；select 的 value 始终是本次操作的单个选项值，option 保留 options 原对象。父组件不更新 modelValue 时，行和复选框均维持原选中态。单选且 hideOnSelect=true 才请求关闭，父级接受关闭后才恢复焦点。

上下键、Home/End 在当前菜单层跳过禁用项并循环导航；关闭时在触发元素按上下键可打开菜单。右键进入子菜单，左键或 Escape 返回，Escape 一次只关闭一层。输入框保留 Home/End 的原生光标行为。

迁移提示：不再依赖 Menu 内部导入 Select 的 provider，也不应依赖“select 先于 update:modelValue”或本地复选框提前改变的旧行为。对外组件名、插槽、options/fieldNames、多选返回值及选中事件参数维持兼容。


## 同源主体与子菜单

Menu、MenuOption、MenuGroup、MenuSubmenu 和内部面板使用对应的同源主体，各库独立发布；保留本库的原生样式及交互默认值。`options` 递归与 `content` 插槽可混用，子菜单共享选择上下文和同层关闭逻辑。

| 新增/对齐 API | 说明 | 默认值 |
| --- | --- | --- |
| `Menu.Submenu` / `MenuSubmenu` | 公开子菜单；`default` 为触发项，`content` 为子项，支持 icon/suffix/footer 插槽 | — |
| `unmount-on-close` | Menu 与 MenuSubmenu 关闭后卸载内容 | `false` |
| 子菜单 `trigger` | 支持 click/hover/focus/contextMenu，与根菜单相同的触发类型 | `hover` |
| `close-on-click-reference` | 根菜单打开时再次点击参考元素是否关闭 | `false` |
| `setReference(reference?)` | 根菜单设置外部参考元素；不传恢复默认参考元素 | — |

根菜单提供 open/close/resize/setReference 方法；子菜单提供 open/close/allowClose 方法。导出 MenuOptionProps、MenuGroupProps、MenuSubmenuProps、MenuSubmenuInstance。根菜单统一分发 open/opened/close/closed、click-outside 和 key-escape；`update:open` 与 `open-change` 仍是请求，父级拒绝更新时不修改受控状态。

ArrowRight 展开并聚焦子项，ArrowLeft/Escape 关闭当前层并恢复焦点；空格键松开时选择一次。函数 label 接收原始 option 和 checked，无 label/value 的插槽选项回退到文本。原有 select(value, option, event) 与 MenuOption click 事件保持兼容。
