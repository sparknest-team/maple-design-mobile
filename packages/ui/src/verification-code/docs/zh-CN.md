# VerificationCode 验证码

验证码输入，支持整码分配、格式化和表单继承。

## 基础示例

### 基础输入

```demo
../example/demos/basic.vue
```

## 外观与状态

### 变体与掩码

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                            | 相关示例                     |
| --------------- | ------------------------------- | ---------------------------- |
| `default-value` | `非受控初值`                    | 变体与掩码、只读、禁用和错误 |
| `length`        | `正整数格数（按 Unicode 码点）` | 变体与掩码、外观组合         |
| `aria-label`    | `组名和每格的序号名称`          | 变体与掩码、只读、禁用和错误 |
| `masked`        | `仅视觉隐藏字符，不是加密`      | 变体与掩码                   |
| `mask-symbol`   | `取首个 Unicode 码点`           | 变体与掩码                   |
| `variant`       | `输入外观`                      | 变体与掩码                   |

<!-- demo-config-notes:end -->

```demo
../example/demos/appearance.vue
```

### 外观组合

适用于分格验证码输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 只读、禁用和错误

```demo
../example/demos/states.vue
```

## 数据与选项

### 粘贴、格式化和分隔符

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                                                                      | 相关示例             |
| ----------------- | ------------------------------------------------------------------------- | -------------------- |
| `type`            | `字符集合`                                                                | 粘贴、格式化和分隔符 |
| `paste-transform` | `粘贴预处理，先于 type 与 formatter`                                      | 粘贴、格式化和分隔符 |
| `formatter`       | `逐字符格式化，false 拒绝，true/undefined 保持；返回字符串取首个合法码点` | 粘贴、格式化和分隔符 |
| `aria-label`      | `组名和每格的序号名称`                                                    | 粘贴、格式化和分隔符 |

<!-- demo-config-notes:end -->

```demo
../example/demos/formatting.vue
```

## 交互与控制

### 交互状态切换

适用于分格验证码输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。验证码是 LTR 内容区域，按原字符串顺序展示、粘贴和移动焦点；外围 align 的 start/end 仍随阅读方向。RTL 不会将验证码字符倒序，数字与文字验证码使用相同的顺序契约。

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
### 配置说明

initial 表示未指定公开覆盖，实际 CSS 在组件元素处读取尺寸 fallback；可直接在组件 style 或主题中覆盖。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

显式 null 是受控空码，不回退到 default-value；默认值仅用于未提供 model-value 的初始状态。reset() 仍提议空字符串；展示层清空可通过 empty-value=null 提交 null，不会让 finish 收到 null。未设置 model-value 时仍为非受控整码。

延迟模式的 input / paste 仍表示编辑过程；finish 表示最终接受的完整值，取消、拒绝、只读、禁用、外部替换及卸载会丢弃未接受的完成通知。普通 finish 监听返回的 Promise 不参与确认等待。before-commit 同步返回 undefined 时等待 done。type / align 非法值诊断后分别按 digit / center 处理；gutter=0 和 0px 均有效。

### VerificationCode Props

| 属性                                    | 说明                                                                      | 类型                                            | 默认值           |
| --------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- | ---------------- |
| `model-value`                           | `受控整码`                                                                | `string \| null`                                        | `undefined`      |
| `default-value`                         | `非受控初值`                                                              | `string`                                        | `''`             |
| `length`                                | `正整数格数（按 Unicode 码点）`                                           | `number`                                        | `6`              |
| `type`                                  | `字符集合`                                                                | `digit / text / alphanumeric`                   | `digit`          |
| `size`                                  | `五档外壳尺寸`                                                            | `xs / sm / md / lg / xl`                        | `继承 / md`      |
| `variant`                               | `输入外观`                                                                | `filled / outline / standard`                   | `继承 / outline` |
| `disabled / readonly / error`           | `状态，显式值优先于 Form`                                                 | `boolean`                                       | `undefined`      |
| `masked`                                | `仅视觉隐藏字符，不是加密`                                                | `boolean`                                       | `false`          |
| `mask-symbol`                           | `取首个 Unicode 码点`                                                     | `string`                                        | `•`              |
| `autofocus`                             | `挂载后聚焦首个空格`                                                      | `boolean`                                       | `false`          |
| `gutter`                                | `格间距，number 为 px`                                                    | `number / string`                               | `组件 token`     |
| `align`                                 | `水平对齐`                                                                | `start / center / end`                          | `center`         |
| `allow-paste`                           | `是否允许粘贴，false 阻止原生粘贴`                                        | `boolean`                                       | `true`           |
| `paste-transform`                       | `粘贴预处理，先于 type 与 formatter`                                      | `(text: string) => string`                      | `undefined`      |
| `formatter`                             | `逐字符格式化，false 拒绝，true/undefined 保持；返回字符串取首个合法码点` | `(character, index, value) => string / boolean` | `undefined`      |
| `separator`                             | `非最后格后面的分隔内容`                                                  | `(index, character) => VNodeChild`              | `undefined`      |
| `aria-label`                            | `组名和每格的序号名称`                                                    | `string`                                        | `undefined`      |
| `text-color / focus-color / blur-color` | `逐实例动态颜色，静态主题优先 token`                                      | `string`                                        | `undefined`      |

| `empty-value` | 展示层清空输出，默认空字符串，可显式配置 null | `string \| null \| (() => string \| null)` | `''` |
| `clearable` | 延迟编辑层清空操作，不改变每格输入 | `boolean` | `false` |
| `empty-values` | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| `empty-text` | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| `edit-mode` | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| `read-pretty` | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| `before-commit` | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| `open` | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| `default-open` | 非受控编辑层初始开关 | `boolean` | `false` |
| `popup-container` | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### VerificationCode Events

| 事件               | 参数                    | 语义                                                                   |
| ------------------ | ----------------------- | ---------------------------------------------------------------------- |
| input              | character, index, event | 每次有效原生输入提议的起始字符与零基索引                               |
| update:modelValue | value: string \| null                   | 整码提议                                                               |
| change             | value: string \| null    | 每次有效编辑的整码提议，不等同于受控父级接受                           |
| finish | value: string | direct 在父级本轮接受完整值后通知；延迟模式在确认守卫通过且父级接受后通知，草稿满码不通知 |
| update:open | open: boolean | 编辑层受控开关更新 |
| open-change | open: boolean | 编辑层实际开关变化 |
| paste              | text, event             | 经 paste-transform 与 type 处理的粘贴文本                              |
| focus / blur       | FocusEvent              | 进入/离开整个组件，格间切换不重复通知                                  |
| click              | MouseEvent              | 非禁用点击                                                             |

有效输入顺序是 input → update:modelValue → change，父级在本轮渲染接受完整值后才发 finish。拒绝的受控值会恢复原生输入；若父级异步接受，后续单独的模型赋值不会补发 finish。reset() 提议空值，发 update:modelValue / change，不模拟原生 input。禁用、只读及组合输入时 reset 不修改值。

粘贴从当前格开始覆盖，根元素的粘贴从第 1 格开始；超出首个空格的输入会归到首个空格。收到一次整码原生输入时会分配到后续格；是否显示短信建议由平台和浏览器决定，Cedar 首格提供 one-time-code 提示，Maple 保留所有格 autocomplete=off 的既有策略。已填格中单字符键入总是替换当前格，即使光标位于旧字符末尾；输入法优先使用本次 compositionend 提交文本（支持多码点分配），事件缺失提交文本时才回退原生值。type 过滤 → formatter → 长度裁剪，拒绝字符不占格。text 按 Unicode 码点（不是字素簇）计数。修改外部值只影响显示，不自动格式化写回。

### VerificationCode Slots

| 插槽      | 参数                 | 说明                                      |
| --------- | -------------------- | ----------------------------------------- |
| separator | { index, character } | 优先于 separator Prop；不在最后一格后渲染 |
| read | { value: string \| null, text: string } | 自定义阅读内容，优先于 empty-text |

### VerificationCode Methods

- focus(index?)：零基索引；省略时定位首个空格，满码定位末格。direct 只读时可聚焦；延迟模式下先打开允许编辑的面板，禁用、只读或纯阅读时不打开。
- blur()：使当前编辑器失焦，不重新打开面板。
- reset()：direct 模式提议清空，遵守受控模型及禁用/只读/组合输入限制；延迟模式先打开并清空草稿，最终确认及 before-commit 通过前不发模型更新或 change，取消则保留原值。

公开方法从组件首次挂载起保持可调用；保存下来的方法每次查找当前编辑器，关闭、重开、切换模式后不会操作旧输入。尚未挂载或已经关闭的原生输入引用为 undefined。

### 键盘与表单

左右方向键切换格；Backspace 删除当前字符，空格时删除前一个；Delete 删除当前字符；删除后后续字符前移。IME 组合期间不裁剪、不删除、不跳焦。每个原生 input 有独立 SSR 稳定 id，所有输入格统一使用 autocomplete=off。请提供 aria-label。

调用方提供的 `aria-invalid` 会传给每个输入框；组件或表单错误优先标记输入框为无效，错误清除后恢复调用方的值。组元素保留调用方显式属性，不自动增加错误状态。

继承 InputGroup/Form 状态，显式 disabled/readonly/error/size 优先；内部每格 Input 不重复通知 Form，整体每次编辑仅通知一次 input/change。三种 variant 和五档 size 两端均实现；尺寸来自本库 FieldDecorator token。

## Types

VerificationCodeProps、VerificationCodeType、VerificationCodeAlign、VerificationCodeVariant、VerificationCodeFormatter、VerificationCodeSeparator、VerificationCodeEmits、VerificationCodeSlots、VerificationCodeExpose、VerificationCodeInstance。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-verification-code-cell-height` | `initial` | `height` |
| `--mp-verification-code-cell-max-width` | `initial` | `flex` |
| `--mp-verification-code-gutter` | `var(--mp-sys-space-2)` | `gap` |
| `--mp-verification-code-input-font-size` | `initial` | `font-size` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-verification-code-input-font-size: initial;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
