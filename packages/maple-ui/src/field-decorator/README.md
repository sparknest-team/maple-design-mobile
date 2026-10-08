# FieldDecorator

表单触发器外壳（与 Cedar `FieldDecorator` **同名同职责骨架**）。

## 职责

- variant / size / floating hint / line / clear / prefix / suffix
- outline/filled 的 fieldset 边框，standard 下划线

## 消费者

Input、Textarea、Select、Cascader、Date、Time、DateRange、TimeRange 等。  
内容放入 default slot；不要在消费者里再实现边框 / 浮动标签。

## 与 Cedar 的对齐 / 平台差

| 项                       | Maple                  | Cedar                         | 说明                                     |
| ------------------------ | ---------------------- | ----------------------------- | ---------------------------------------- |
| 组件名                   | `FieldDecorator`       | `FieldDecorator`              | 对齐                                     |
| variant                  | 默认 **standard**      | 默认 **filled**               | 默认值平台差                             |
| size                     | 壳 `small` \| `normal` | `xs`–`xl`                     | 映射：`small↔sm`，`normal↔md`            |
| 浮动 hint / line / clear | 壳内置                 | Cedar 无 hint；clear 在消费者 | 平台差                                   |
| Token                    | `--mp-field-*`         | `--c-field-*`                 | 共享语义键对齐；hint 几何 token 仅 Maple |

## Size 映射（文档约定）

| Maple FD | Cedar FD |
| -------- | -------- |
| `small`  | `sm`     |
| `normal` | `md`     |

上层若用 `xs|sm|md|lg`（如 InputNumber），再映射到 FD：`xs/sm → small`，其余 → `normal`。

## 错误与禁用边框变量

以下后缀分别加上 `--c-field-` / `--mp-field-`：`variant-outline-border-color-error` 控制 outline 错误边框；`variant-standard-line-color-error` 控制 standard 错误底线；`variant-standard-line-color-disabled` 控制 standard 禁用底线，默认引用 system border-subtle。禁用优先于错误、hover 和 focus。三个入口均支持局部覆盖；错误提示文字仍由 `field-error-color` 管理。内部变量不是业务 API，已确认无消费的遗留内部声明直接删除，不提供别名。
