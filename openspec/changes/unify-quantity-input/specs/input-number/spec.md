# Quantity input

InputNumber is the sole Maple quantity editor. Counter is removed without aliases, including registrations, styles, themes, examples, documentation and generated consumer assets.

InputNumber supports disableInput, disableIncrement/disableDecrement, incrementButton/decrementButton and press. Direction visibility and disabling apply equally to keyboard and button operations. Step events publish only accepted changes as (value, plus|minus, event).

beforeCommit uses the existing field guard contract in both inline and popup. Pending inline commits expose aria-busy, reject overlapping operations and cancel on external value/configuration changes, blocking, deactivation and disposal. Rejected or failed changes restore the committed value. Clear passes through the guard; live model input waits for approval. Popup confirmation owns its guard, without guarding each inner draft twice. Errors are observable via commit-error inline and the existing panel feedback in popup. Guarded steps do not auto-repeat while asynchronous approval is needed.

Existing field geometry and theme roles are retained. No capsule background, shadow or ripple API is added.
