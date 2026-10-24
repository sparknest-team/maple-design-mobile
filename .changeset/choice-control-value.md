---
"@maple-design/ui": major
---

Align standalone Checkbox/Radio value controllers as independent source copies. Replace defaultChecked with defaultValue. Checkbox uses boolean/array models; Radio uses an option value or null and selects without toggling off. Replace Radio.toggle with select; expose focus/blur and unify Checkbox.toggle(checked?). indeterminate is presentation-only and no longer emits update:indeterminate. Change carries an optional native event. Bind Enter/Space handling to the control with blur/KeepAlive cleanup. Migrate demos, docs, tests and Tree callback types without aliases.
