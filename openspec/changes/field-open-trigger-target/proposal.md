## Why
Editable picker fields need independent control over editing/copying text and opening their panel.
## Changes
Add open-trigger-target="field | icon" (default field) to Date, DateRange, Time, TimeRange, Select, Cascader and desktop TreeSelect. Input editability remains independent. In icon mode, pointer interaction and query changes do not open a closed panel; the suffix button, explicit keyboard opening and controlled open remain available. Copying in icon mode does not open a panel; clearing and tag removal remain independent actions.
## Non-goals
No changes to standalone panels, ordinary Input or AutoComplete suggestion semantics.

Field references keep their original DOM sizing. An internal per-event signal blocks only field-originated popup requests, preserving ordinary Trigger .stop/.prevent behavior. Generated IDE hints support component-prefixed and case-varied API headings.
