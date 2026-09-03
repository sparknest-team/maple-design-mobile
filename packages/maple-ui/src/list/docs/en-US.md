# List

A presentational list. Compose it with `InfiniteScroll` for pagination.

## Basic Usage

```html
<mp-list :data="items" size="md" bordered>
  <template #header>Contacts</template>
  <template #item="{ item, index }">
    <mp-list-item>
      <template #prefix>{{ index + 1 }}</template>
      {{ item.name }}
      <template #suffix>{{ item.phone }}</template>
    </mp-list-item>
  </template>
  <template #empty>No contacts</template>
  <template #footer>{{ items.length }} items</template>
</mp-list>
```

You can also provide list content directly. When both the default slot and `data` are present, the default slot wins and `item` is not invoked.

```html
<mp-list :data="items">
  <mp-list-item>Default slot content</mp-list-item>
  <template #item="{ item }">{{ item }}</template>
</mp-list>
```

`loading` represents an initial full-list load or refresh, not next-page loading. An empty list does not render its empty state while loading.

## API

### Props

| Prop       | Description                             | Type                   | Default |
| ---------- | --------------------------------------- | ---------------------- | ------- |
| `data`     | Data passed to the `item` slot          | `unknown[]`            | `-`     |
| `size`     | List item size                          | `'sm' \| 'md' \| 'lg'` | `'md'`  |
| `bordered` | Show the outer border                   | `boolean`              | `true`  |
| `split`    | Show separators between list items      | `boolean`              | `true`  |
| `loading`  | Initial full-list loading or refreshing | `boolean`              | `false` |

### Slots

| Name      | Description                                | Props             |
| --------- | ------------------------------------------ | ----------------- |
| `default` | Manual content; takes priority over `data` | `-`               |
| `item`    | Data item content                          | `{ item, index }` |
| `header`  | Header                                     | `-`               |
| `footer`  | Footer                                     | `-`               |
| `empty`   | Empty content shown when not loading       | `-`               |

### ListItem

| Name      | Description    |
| --------- | -------------- |
| `prefix`  | Prefix content |
| `default` | Main content   |
| `suffix`  | Suffix content |

## Style Variables

| Variable                    | Default                    |
| --------------------------- | -------------------------- |
| `--mp-list-background`      | `var(--mp-color-bg-1)`     |
| `--mp-list-border-color`    | `var(--mp-color-border-2)` |
| `--mp-list-border-radius`   | `4px`                      |
| `--mp-list-header-padding`  | `12px 16px`                |
| `--mp-list-footer-padding`  | `12px 16px`                |
| `--mp-list-empty-padding`   | `24px 16px`                |
| `--mp-list-empty-color`     | `var(--mp-color-text-3)`   |
| `--mp-list-loading-padding` | `16px`                     |
| `--mp-list-item-padding-sm` | `8px 12px`                 |
| `--mp-list-item-padding-md` | `12px 16px`                |
| `--mp-list-item-padding-lg` | `16px 20px`                |
| `--mp-list-item-gap`        | `12px`                     |

# ListItem

A presentational item for `List`; it can also be used independently.

## API

### Slots

| Name      | Description    |
| --------- | -------------- |
| `prefix`  | Prefix content |
| `default` | Main content   |
| `suffix`  | Suffix content |

