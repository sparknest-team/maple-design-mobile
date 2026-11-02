

# FormDetails

Form helper messages for errors and additional guidance.

## Reading direction

Inherits source dir. Errors align to inline start, extra information to inline end, and their spacing follows reading direction.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Customization and slots

### Custom helper content

```demo
../example/demos/extra-slot.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| ----------------- | --------- | --- | --- |
| `error-message` | Error message | _string_ | `-` |
| `extra-message` | Extra message | _string_ | `-` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `extra-message` | Extra message | `-` |
