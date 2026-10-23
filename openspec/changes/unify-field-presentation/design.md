# Ownership

Form owns model and submission. FormItem owns rules and labels. Internal field presentation owns the editor container, draft and commit. Read does not mount editing controls or fire search. Input and Select retain native model listeners; FormItem does not clone slots. Candidate validation must not mutate the model.

## Extension

Ordinary value fields delegate their existing inline renderer through a private adapter. The editor host owns the only deferred commit; pure temporal/choice/color panels render inside it with their own confirmation toolbar suppressed. Standalone pickers retain their APIs. Mobile field content selection moves to panelType. Editor children receive inherited state but no committed-model validation callbacks. Closing unmounts editor content and retires late updates/search. Upload confirmation commits the attachment relation, not remote side effects.

editTrigger is orthogonal to presentation and inherits through field, FormItem, Form. Select has no public needConfirm override: inline is immediate, overlays confirm.
