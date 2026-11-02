# Form controls and browser autofill

Editable native Input, InputNumber, Textarea, selection/picker search, date/time and VerificationCode inputs render autocomplete=off, after native attribute spreads. This includes password and wrapped Search inputs. Native attribute bags cannot enable browser autofill. AutoComplete data suggestions and aria-autocomplete semantics are preserved. Browser/password-manager overrides remain outside the component contract.

The theme page exposes normal, disabled, readonly and error states, all field variants and inline/popup editors for single/multiple Select/Cascader, date/time and ranges. It also exposes Checkbox indeterminate, Radio/button variants, circle/round/line/tonal Switch with checked/unchecked/loading states and text/picture/picture-card Upload with success/uploading/error items. Upload demo files stay local.

Enabled text targets contrast 4.5:1, essential glyphs 3:1. Radio button labels use content roles, active Switch text uses a contrasting on-bright role, Cascader checkmarks use primary content and brand calendar selections use contrasting text. Upload card captions and duration badges use dark legible layers; disabled upload lists are visibly muted without applying opacity twice to their actions. Brand date/time panel corners use theme radius and clip internal backgrounds.
