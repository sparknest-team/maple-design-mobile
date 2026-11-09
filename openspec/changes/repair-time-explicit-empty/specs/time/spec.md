## MODIFIED Requirements
### Requirement: Explicit clearing survives editor presentation
Deferred Time and TimeRange clear SHALL retain the configured empty value until confirmation or new user selection. Mobile wheels MAY stage an initial visible candidate for a new empty panel; subsequent empty drafts SHALL not trigger initialization again in that lifetime. Confirmation SHALL preserve null instead of committing midnight.
#### Scenario: Clear an existing time and confirm
- WHEN a nonempty deferred field is cleared to null and confirmed
- THEN publish null once, close the editor and leave no midnight model; reopening and cancelling SHALL not publish another value.
#### Scenario: Empty standalone panel initialization
- WHEN a new mobile panel starts empty
- THEN it MAY notify draft-initialize once without update:modelValue/change, while later external clear remains empty even if rules change.
