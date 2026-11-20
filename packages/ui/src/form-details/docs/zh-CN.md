

# FormDetails

表单辅助信息，用于展示错误反馈与补充说明。

错误文字使用 `role="alert"`；附加说明保持普通文本。FormItem 内的文本、数字、选择、日期时间、勾选、开关、滑块、评分、验证码和上传字段会将错误关联到对应控件或控件组，并保留调用方提供的 `aria-describedby`。自定义控件可使用 `useFormErrorDescription()` 将错误关联到实际交互元素。

同时提供 `help` 和 `extra` 时，错误状态下的输入框关联到当前错误文字或帮助文字，额外说明单独显示。

## 阅读方向

继承来源 dir；错误信息按阅读起点对齐，附加信息按阅读终点对齐，间距随方向切换。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 自定义与插槽

### 自定义辅助信息

```demo
../example/demos/extra-slot.vue
```

## API

### FormDetails Props

| 参数              | 说明      | 类型 | 默认值 | 
| ----------------- | --------- | --- | --- | 
| `error-message` | 错误信息    | _string_ | `-` |
| `extra-message` | 附加信息 | _string_ | `-` |

### FormDetails Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `extra-message` | 附加信息 | `-` |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-form-details-error-message-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-form-details-extra-message-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-form-details-font-size` | `12px` | `font-size` |
| `--mp-form-details-margin-top` | `6px` | `margin-top` |
| `--mp-form-details-message-margin-right` | `4px` | `margin-inline-end` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-form-details-error-message-color: var(--mp-sys-color-content-danger);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
