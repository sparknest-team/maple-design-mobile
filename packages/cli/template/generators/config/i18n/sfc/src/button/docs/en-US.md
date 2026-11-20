# Button

### Basic Use
```html
<va-button>start</va-button>
```

```vue
import BasicUse from '../example/en-US/BasicUse'
```

### Theme Color Button
```html
<va-button color="#009688">start</va-button>
```

```vue
import ModifyColor from '../example/en-US/ModifyColor'
```

## API

### Button Props

| Prop  | Description | Type | Default |
| --- | --- | --- | --- | 
| `color` | Button background color | _string_ | `default` |

### Button Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when the button is clicked | `event: Event` |

### Button Slots

| Slot      | Description | Arguments |
|-----------| --- | --- |
| `default` | Button content | `-` |