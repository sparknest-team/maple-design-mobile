# Button

### Basic Use
```html
<va-button>start</va-button>
```

<demo src="../example/en-US/BasicUse.vue"></demo>

### Theme Color Button
```html
<va-button color="#009688">start</va-button>
```

<demo src="../example/en-US/ModifyColor.vue"></demo>

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