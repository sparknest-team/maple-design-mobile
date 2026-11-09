## MODIFIED Requirements
### Requirement: Bounded rating item allocation
count SHALL be finite, greater than zero and at most 1000; valid fractions floor with minimum one. Invalid or oversized values SHALL receive development validation and render five items. grading SHALL retain its fixed five symbols.
#### Scenario: Extreme count
- WHEN count is 1000000000
- THEN render five items, diagnose in development and retain a matching aria-valuemax.
### Requirement: Explicit public slot and confirmation contracts
RateSlots and RateReadScope SHALL be exported from root and component entries. character.active SHALL mean fully selected, while wrapper half state represents a partial symbol. read SHALL retain nullable models. beforeCommit SHALL use payload, done, context while ordinary events only notify.
#### Scenario: Nullable custom read
- WHEN a null model uses a custom read slot
- THEN the slot receives null and formatted empty text rather than an empty-text replacement.
