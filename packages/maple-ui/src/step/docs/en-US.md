## API

### Props

| Prop | Description | Type | Default |
| ----- | -------------- | -------- | ---------- |
| `title` | Step title | _string_ | `-` |
| `description` | Step description | _string_ | `-` |
| `status` | Step status (overrides auto derivation) | _'wait' \| 'process' \| 'finish' \| 'error'_ | `-` |
| `disabled` | Whether disabled | _boolean_ | `false` |

### Slots

| Name | Description | Arguments |
| ----- | -------------- | -------- |
| `default` | Step title (takes precedence over `title`) | `-` |
| `icon` | Custom node icon | `{ step: number, status: string }` |
| `description` | Step description | `-` |
