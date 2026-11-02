<!-- Source: src/verification-code/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/verification-code -->

# VerificationCode 验证码

独立维护的跨端同源验证码输入，支持短信自动填充、格式化和表单继承。

## 案例

### 基础输入

Example source: src/verification-code/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const code = ref('')
</script>
<template>
  <div class="verification-demo">
    <mp-verification-code v-model="code" aria-label="验证码" />
    <p>当前值：{{ code || '未输入' }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
```

### 粘贴、格式化和分隔符

Example source: src/verification-code/example/demos/formatting.vue

```vue
<script setup>
import { ref } from 'vue'

const code = ref('')
const transform = (value) => value.replace(/[-\s]/g, '').toUpperCase()
</script>
<template>
  <div class="verification-demo">
    <p>可粘贴 ab-12-cd；从当前格开始写入。</p>
    <mp-verification-code
      v-model="code"
      type="alphanumeric"
      :paste-transform="transform"
      :formatter="(char) => char.toUpperCase()"
      aria-label="字母数字验证码"
      ><template #separator="{ index }"><span v-if="index === 2">−</span></template></mp-verification-code
    >
    <p>{{ code }}</p>
  </div>
</template>
<style scoped>
.verification-demo {
  max-width: 420px;
}
</style>
```

### 变体与掩码

Example source: src/verification-code/example/demos/appearance.vue

```vue
<template>
  <div class="verification-demo">
    <mp-verification-code
      default-value="1234"
      :length="4"
      masked
      mask-symbol="*"
      aria-label="掩码验证码"
    /><mp-verification-code
      default-value="1234"
      :length="4"
      variant="filled"
      size="lg"
      align="start"
      :gutter="12"
      aria-label="填充验证码"
    /><mp-verification-code
      default-value="12"
      :length="4"
      variant="standard"
      focus-color="#6750a4"
      aria-label="线条验证码"
    />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
```

### 只读、禁用和错误

Example source: src/verification-code/example/demos/states.vue

```vue
<template>
  <div class="verification-demo">
    <mp-verification-code default-value="123456" readonly aria-label="只读验证码" /><mp-verification-code
      default-value="123456"
      disabled
      aria-label="禁用验证码"
    /><mp-verification-code default-value="12" error aria-label="错误验证码" />
  </div>
</template>
<style scoped>
.verification-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 420px;
}
</style>
```

### 外观组合

适用于分格验证码输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/verification-code/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('123456')
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-verification-code v-model="value" :length="6" v-bind="__demoAppearance"></mp-verification-code>
  </mp-space>
</template>
```

### 交互状态切换

适用于分格验证码输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/verification-code/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('123456')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-verification-code v-model="value" :length="6" v-bind="__demoState"></mp-verification-code>
  </mp-space>
</template>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` | `受控整码` | `string` | `undefined` |
| `default-value` | `非受控初值` | `string` | `''` |
| `length` | `正整数格数（按 Unicode 码点）` | `number` | `6` |
| `type` | `字符集合` | `digit / text / alphanumeric` | `digit` |
| `size` | `五档外壳尺寸` | `xs / sm / md / lg / xl` | `继承 / md` |
| `variant` | `输入外观` | `filled / outline / standard` | `继承 / outline` |
| `disabled / readonly / error` | `状态，显式值优先于 Form` | `boolean` | `undefined` |
| `masked` | `仅视觉隐藏字符，不是加密` | `boolean` | `false` |
| `mask-symbol` | `取首个 Unicode 码点` | `string` | `•` |
| `autofocus` | `挂载后聚焦首个空格` | `boolean` | `false` |
| `gutter` | `格间距，number 为 px` | `number / string` | `组件 token` |
| `align` | `水平对齐` | `start / center / end` | `center` |
| `allow-paste` | `是否允许粘贴，false 阻止原生粘贴` | `boolean` | `true` |
| `paste-transform` | `粘贴预处理，先于 type 与 formatter` | `(text: string) => string` | `undefined` |
| `formatter` | `逐字符格式化，false 拒绝，true/undefined 保持；返回字符串取首个合法码点` | `(character, index, value) => string / boolean` | `undefined` |
| `separator` | `非最后格后面的分隔内容` | `(index, character) => VNodeChild` | `undefined` |
| `aria-label` | `组名和每格的序号名称` | `string` | `undefined` |
| `text-color / focus-color / blur-color` | `逐实例动态颜色，静态主题优先 token` | `string` | `undefined` |

### Events

| 事件 | 参数 | 语义 |
| --- | --- | --- |
| input | character, index, event | 每次有效原生输入提议的起始字符与零基索引 |
| update:model-value | value | 整码提议 |
| change | value | 每次有效编辑的整码提议，不等同于受控父级接受 |
| finish | value | 修改后的整码被接受且填满；已满后再次修改并接受也触发，不由外部赋值触发 |
| paste | text, event | 经 paste-transform 与 type 处理的粘贴文本 |
| focus / blur | FocusEvent | 进入/离开整个组件，格间切换不重复通知 |
| click | MouseEvent | 非禁用点击 |

有效输入顺序是 input → update:modelValue → change，父级在本轮渲染接受完整值后才发 finish。拒绝的受控值会恢复原生输入；若父级异步接受，后续单独的模型赋值不会补发 finish。reset() 提议空值，发 update:modelValue / change，不模拟原生 input。禁用、只读及组合输入时 reset 不修改值。

粘贴从当前格开始覆盖，根元素的粘贴从第 1 格开始；超出首个空格的输入会归到首个空格。短信自动填充一次输入整码也会分配到后续格。已填格中单字符键入总是替换当前格，即使光标位于旧字符末尾；输入法优先使用本次 compositionend 提交文本（支持多码点分配），事件缺失提交文本时才回退原生值。type 过滤 → formatter → 长度裁剪，拒绝字符不占格。text 按 Unicode 码点（不是字素簇）计数。修改外部值只影响显示，不自动格式化写回。

### Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| separator | { index, character } | 优先于 separator Prop；不在最后一格后渲染 |

### Expose

- focus(index?)：零基索引；省略时定位首个空格，满码定位末格。disabled 时不聚焦，readonly 可聚焦复制。
- blur()：移出焦点。
- reset()：提议清空，仍遵守受控模型及禁用/只读状态。

### 键盘与表单

左右方向键切换格；Backspace 删除当前字符，空格时删除前一个；Delete 删除当前字符；删除后后续字符前移。IME 组合期间不裁剪、不删除、不跳焦。每个原生 input 有独立 SSR 稳定 id，所有输入格统一使用 autocomplete=off。请提供 aria-label。

继承 InputGroup/Form 状态，显式 disabled/readonly/error/size 优先；内部每格 Input 不重复通知 Form，整体每次编辑仅通知一次 input/change。三种 variant 和五档 size 两端均实现；尺寸来自本库 FieldDecorator token。

## 类型定义

VerificationCodeProps、VerificationCodeType、VerificationCodeAlign、VerificationCodeVariant、VerificationCodeFormatter、VerificationCodeSeparator、VerificationCodeEmits、VerificationCodeSlots、VerificationCodeExpose、VerificationCodeInstance。

## 样式变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| --mp-verification-code-gutter | var(--mp-sys-space-2) | 格间距 |
| --mp-verification-code-cell-height | initial | 未覆盖时随 size 的 field-size-*-height |
| --mp-verification-code-cell-max-width | initial | 未覆盖时随 size 的 field-size-*-height |
| --mp-verification-code-input-font-size | initial | 未覆盖时随 size 的 field-size-*-font-size |

initial 表示未指定公开覆盖，实际 CSS 在组件元素处读取尺寸 fallback；可直接在组件 style 或主题中覆盖。删除旧 Cedar column-gap，使用 gutter。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
