# Form error descriptions

Visible errors receive a stable per-item id. Text, numeric, selection, temporal, choice, switch, slider and rate controls append the id to existing aria-describedby values; clearing errors removes only the library-owned reference. Choice groups describe the group without duplicating its error on every option, while separately nested fields keep their own errors. Slider thumb descriptions retain both caller references and the matching tooltip. Nested no-style items inherit the parent error and readPretty does not reference hidden errors. Standalone and nested custom FormDetails must not reuse the owning FormItem error id. Other controls and custom fields retain their existing behavior.

VerificationCode associates the error with its group instead of repeating it on every digit. Upload associates it with the default trigger or the group around an interactive custom trigger, without taking keyboard ownership from that trigger.
